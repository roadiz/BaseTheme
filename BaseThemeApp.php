<?php
/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file BaseThemeApp.php
 * @author Ambroise Maupate
 */
namespace Themes\BaseTheme;

use RZ\Roadiz\CMS\Controllers\FrontendController;
use RZ\Roadiz\Core\Bags\SettingsBag;
use RZ\Roadiz\Core\Entities\Translation;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\Services;

/**
 * BaseThemeApp class
 */
class BaseThemeApp extends FrontendController
{
    const VERSION = '0.14.0';

    protected static $themeName = 'Base theme';
    protected static $themeAuthor = 'REZO ZERO';
    protected static $themeCopyright = 'REZO ZERO';
    protected static $themeDir = 'BaseTheme';
    protected static $backendTheme = false;

    /**
     * {@inheritdoc}
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
        //     $transRepository = $this->getService('em')->getRepository('RZ\Roadiz\Core\Entities\Translation');
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
        // return new Response(
        //     $this->getTwig()->render('home.html.twig', $this->assignation),
        //     Response::HTTP_OK,
        //     array('content-type' => 'text/html')
        // );
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
        $this->translation = $this->getService('defaultTranslation');

        $this->prepareThemeAssignation(null, $this->translation);
        $this->getService('logger')->error($message);
        $this->assignation['errorMessage'] = $message;

        $this->getService('stopwatch')->start('twigRender');
        return new Response(
            $this->renderView('@BaseTheme/pages/404.html.twig', $this->assignation),
            Response::HTTP_NOT_FOUND,
            array('content-type' => 'text/html')
        );
    }

    /**
     * {@inheritdoc}
     */
    public function maintenanceAction(Request $request)
    {
        $translation = $this->bindLocaleFromRoute($request, $request->getLocale());
        $this->prepareThemeAssignation(null, $translation);

        $this->getService('stopwatch')->start('twigRender');
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
        $this->themeContainer->register(new Services\NodeTypeServiceProvider($this->getService('nodeTypeApi')));
        $this->themeContainer->register(new Services\AssetsServiceProvider());

        $this->assignation['themeServices'] = $this->themeContainer;

        $this->assignation['head']['facebookUrl'] = SettingsBag::get('facebook_url');
        $this->assignation['head']['facebookClientId'] = SettingsBag::get('facebook_client_id');
        $this->assignation['head']['instagramUrl'] = SettingsBag::get('instagram_url');
        $this->assignation['head']['twitterUrl'] = SettingsBag::get('twitter_url');
        $this->assignation['head']['googleplusUrl'] = SettingsBag::get('googleplus_url');
        $this->assignation['head']['googleClientId'] = SettingsBag::get('google_client_id');
        $this->assignation['head']['twitterAccount'] = SettingsBag::get('twitter_account');
        $this->assignation['head']['mapsStyle'] = SettingsBag::get('maps_style');
        $this->assignation['head']['themeName'] = static::$themeName;
        $this->assignation['head']['themeVersion'] = static::VERSION;

        // Get session messages
        // Remove FlashBag assignation from here if you handle your forms
        // in sub-requests block renders.
        $this->assignation['session']['messages'] = $this->getService('session')->getFlashBag()->all();
    }
}
