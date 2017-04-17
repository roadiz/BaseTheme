<?php
/**
 * Copyright (c) 2017. Rezo Zero
 *
 * BaseTheme
 *
 * @file BaseThemeApp.php
 * @author Ambroise Maupate <ambroise@rezo-zero.com>
 */
namespace Themes\BaseTheme;

use RZ\Roadiz\CMS\Controllers\FrontendController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\Services;

/**
 * BaseThemeApp class
 */
class BaseThemeApp extends FrontendController
{
    const VERSION = '0.18.5';

    protected static $themeName = 'Base theme';
    protected static $themeAuthor = 'REZO ZERO';
    protected static $themeCopyright = 'REZO ZERO';
    protected static $themeDir = 'BaseTheme';
    protected static $backendTheme = false;

    /**
     * @param Request $request
     * @param null $_locale
     * @return Response
     */
    public function homeAction(
        Request $request,
        $_locale = null
    ) {
        /*
         * Automatic http Accept-Language detection and redirection.
         * Force locale if we request with no locale in URL
         */
        // if ($_locale === null) {
        //     $transRepository = $this->get('em')->getRepository('RZ\Roadiz\Core\Entities\Translation');
        //     $redirectLocale = $request->getPreferredLanguage($transRepository->getAvailableLocales());
        //     $translation = $transRepository->findOneByLocaleAndAvailable($redirectLocale);

        //     return $this->redirect($this->generateUrl('homePageLocale', ['_locale'=>$translation->getPreferredLocale()]), 301);
        // }
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

        /*
         * Render Homepage manually
         */
        // $this->prepareThemeAssignation($home, $translation);
        // return $this->render('pages/home.html.twig', $this->assignation);
    }

    /**
     * Return a Response with default backend 404 error page.
     *
     * @param string $message Additionnal message to describe 404 error.
     *
     * @return Response
     */
    public function throw404($message = '')
    {
        $this->translation = $this->get('defaultTranslation');

        $this->prepareThemeAssignation(null, $this->translation);
        $this->get('logger')->error($message);

        $this->assignation['nodeName'] = 'error-404';
        $this->assignation['nodeTypeName'] = 'error404';
        $this->assignation['errorMessage'] = $message;
        $this->assignation['title'] = $this->get('translator')->trans('error404.title');
        $this->assignation['content'] = $this->get('translator')->trans('error404.message');


        $this->get('stopwatch')->start('twigRender');
        return new Response(
            $this->renderView('@BaseTheme/pages/404.html.twig', $this->assignation),
            Response::HTTP_NOT_FOUND,
            array('content-type' => 'text/html')
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
     * {@inheritdoc}
     */
    protected function extendAssignation()
    {
        parent::extendAssignation();

        /*
         * Register services
         */
        $this->themeContainer->register(new Services\NodeServiceProvider($this->getContainer(), $this->translation));
        $this->themeContainer->register(new Services\NodeTypeServiceProvider($this->get('nodeTypeApi')));
        $this->themeContainer->register(new Services\AssetsServiceProvider());

        $this->assignation['themeServices'] = $this->themeContainer;

        $this->assignation['head']['facebookUrl'] = $this->get('settingsBag')->get('facebook_url');
        $this->assignation['head']['pinterest_url'] = $this->get('settingsBag')->get('pinterest_url');
        $this->assignation['head']['facebookClientId'] = $this->get('settingsBag')->get('facebook_client_id');
        $this->assignation['head']['instagramUrl'] = $this->get('settingsBag')->get('instagram_url');
        $this->assignation['head']['twitterUrl'] = $this->get('settingsBag')->get('twitter_url');
        $this->assignation['head']['googleplusUrl'] = $this->get('settingsBag')->get('googleplus_url');
        $this->assignation['head']['googleClientId'] = $this->get('settingsBag')->get('google_client_id');
        $this->assignation['head']['twitterAccount'] = $this->get('settingsBag')->get('twitter_account');
        $this->assignation['head']['mapsStyle'] = $this->get('settingsBag')->get('maps_style');
        $this->assignation['head']['themeName'] = static::$themeName;
        $this->assignation['head']['themeVersion'] = static::VERSION;

        // Get session messages
        // Remove FlashBag assignation from here if you handle your forms
        // in sub-requests block renders.
        $this->assignation['session']['messages'] = $this->get('session')->getFlashBag()->all();
    }
}
