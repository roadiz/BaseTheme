<?php
declare(strict_types=1);

namespace Themes\BaseTheme;

use RZ\Roadiz\CMS\Controllers\FrontendController;
use RZ\Roadiz\Core\Entities\NodesSources;
use RZ\Roadiz\Core\Entities\Translation;
use RZ\Roadiz\Core\Handlers\NodesSourcesHandler;
use RZ\TreeWalker\WalkerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use RZ\Roadiz\Core\Repositories\TranslationRepository;
use Themes\BaseTheme\Services;
use Themes\BaseTheme\TreeWalker\BlockNodeSourceWalker;
use Themes\BaseTheme\TreeWalker\NodeSourceWalker;
use Themes\BaseTheme\TreeWalker\NodeSourceWalkerContext;

/**
 * BaseThemeApp class
 */
class BaseThemeApp extends FrontendController
{
    const VERSION = '1.6.0';

    protected static string $themeName = 'Base theme';
    protected static string $themeAuthor = 'Rezo Zero';
    protected static string $themeCopyright = 'Rezo Zero';
    protected static string $themeDir = 'BaseTheme';
    protected static bool $backendTheme = false;
    public static int $priority = 10;

    protected ?WalkerInterface $navigationWalker = null;
    protected ?WalkerInterface $blockWalker = null;

    /**
     * @return array<string, string>
     */
    public static function getSubscribedServices()
    {
        if (is_callable('parent::getSubscribedServices')) {
            return array_merge(parent::getSubscribedServices(), [
                NodeSourceWalkerContext::class => NodeSourceWalkerContext::class,
            ]);
        }
        return [];
    }

    /**
     * @param Request $request
     * @param string|null $_locale
     * @return Response
     */
    public function homeAction(
        Request $request,
        $_locale = null
    ) {
        /*
         * Automatic http Accept-Language detection and redirection.
         * Force locale if we request with no locale in URL.
         *
         * You MUST enable force locale in URL setting to redirect users.
         */
//        if ($_locale === null) {
//            /** @var TranslationRepository $transRepository */
//            $transRepository = $this->get('em')->getRepository(Translation::class);
//            $redirectLocale = $request->getPreferredLanguage($transRepository->getAvailableLocales()) ?? 'en';
//            $translation = $transRepository->findOneByLocaleAndAvailable($redirectLocale);
//            if (null === $translation) {
//                $translation = $this->get('defaultTranslation');
//            }
//
//            $response = $this->redirect(
//                $this->generateUrl('homePageLocale', ['_locale' => $translation->getPreferredLocale()]),
//                Response::HTTP_MOVED_PERMANENTLY
//            );
//            $response->setPrivate();
//            return $response;
//        }
        /*
         * If you use a static route for Home page
         * we need to grab manually language.
         *
         * Get language from static route
         */
        $translation = $this->bindLocaleFromRoute($request, $_locale);
        $home = $this->getHome($translation);

        /*
         * Use home page node-type to render it.
         */
        return $this->handle($request, $home, $translation);
    }

    /**
     * Return a Response with default backend 404 error page.
     *
     * @param string $message Additional message to describe 404 error.
     *
     * @return Response
     */
    public function throw404($message = '')
    {
        /** @var Request $request */
        $request = $this->get('requestStack')->getCurrentRequest();
        $translation = $this->bindLocaleFromRoute(
            $request,
            $request->getLocale()
        );
        $this->prepareThemeAssignation(null, $translation);

        $this->assignation['nodeName'] = 'error-404';
        $this->assignation['nodeTypeName'] = 'error404';
        $this->assignation['errorMessage'] = $message;
        $this->assignation['title'] = $this->get('translator')->trans('error404.title');
        $this->assignation['content'] = $this->get('translator')->trans('error404.message');

        $this->get('stopwatch')->start('twigRender');
        return new Response(
            $this->renderView('@BaseTheme/pages/404.html.twig', $this->assignation),
            Response::HTTP_NOT_FOUND,
            ['content-type' => 'text/html']
        );
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function maintenanceAction(Request $request)
    {
        $translation = $this->bindLocaleFromRoute($request, $request->getLocale());
        $this->prepareThemeAssignation(null, $translation);

        $this->assignation['nodeName'] = 'maintenance' ;
        $this->assignation['nodeTypeName'] = 'maintenance';
        $this->assignation['title'] = $this->get('translator')->trans('website.is.under.maintenance');
        $this->assignation['content'] = $this->get('translator')->trans('website.is.under.maintenance.we.will.be.back.soon');

        $this->get('stopwatch')->start('twigRender');
        return new Response(
            $this->renderView('@BaseTheme/pages/maintenance.html.twig', $this->assignation),
            Response::HTTP_SERVICE_UNAVAILABLE,
            ['content-type' => 'text/html']
        );
    }

    /**
     * @return void
     */
    protected function extendAssignation()
    {
        parent::extendAssignation();

        /*
         * Register services
         */
        if (null !== $this->themeContainer) {
            $this->themeContainer->register(new Services\NodeServiceProvider(
                $this->get('nodeTypesBag'),
                $this->get('nodeSourceApi'),
                $this->translation
            ));
            $this->assignation['themeServices'] = $this->themeContainer;

            /*
             * BLOCKS
             */
            if (null !== $this->nodeSource) {
                $this->blockWalker = BlockNodeSourceWalker::build(
                    $this->nodeSource,
                    $this->get(NodeSourceWalkerContext::class),
                    4,
                    $this->get('nodesSourcesUrlCacheProvider')
                );
                $this->assignation['blockWalker'] = $this->blockWalker;
            }
            /*
             * NAVIGATION walker
             *
             * This is used for main navigation AND breadcrumbs as Walkers can go backwards.
             */
            $this->navigationWalker = NodeSourceWalker::build(
                $this->themeContainer['nodeSourceMenu'],
                $this->get(NodeSourceWalkerContext::class),
                2,
                $this->get('nodesSourcesUrlCacheProvider')
            );
            $this->assignation['navigationWalker'] = $this->navigationWalker;
        }

        $this->assignation['head']['themeName'] = static::$themeName;
        $this->assignation['head']['themeVersion'] = static::VERSION;

        /*
         * Get social networks url from Roadiz parameters.
         */
        $socials = ['Twitter', 'Facebook', 'Instagram', 'YouTube', 'LinkedIn', 'Flickr', 'Pinterest', 'WeChat'];
        $this->assignation['head']['socials'] = [];
        foreach ($socials as $social) {
            $setting = $this->get('settingsBag')->get(strtolower($social) . '_url');
            if ($setting) {
                $this->assignation['head']['socials'][strtolower($social)] = [
                    'name'  => $social,
                    'slug'  => strtolower($social),
                    'url'   => $setting,
                ];
            }
        }
    }
}
