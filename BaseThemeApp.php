<?php
/*
 * Copyright REZO ZERO 2015
 *
 * BaseTheme main class.
 * Entry point for your theme logic and inheritance.
 *
 * @file BaseThemeApp.php
 * @copyright REZO ZERO 2015
 * @author Ambroise Maupate
 */
namespace Themes\BaseTheme;

use RZ\Roadiz\CMS\Controllers\FrontendController;
use RZ\Roadiz\Core\Bags\SettingsBag;
use RZ\Roadiz\Core\Entities\Node;
use RZ\Roadiz\Core\Entities\Translation;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\Services;

/**
 * BaseThemeApp class
 */
class BaseThemeApp extends FrontendController
{
    const VERSION = '0.8.0';

    protected static $themeName = 'Base theme';
    protected static $themeAuthor = 'REZO ZERO';
    protected static $themeCopyright = 'REZO ZERO';
    protected static $themeDir = 'BaseTheme';
    protected static $backendTheme = false;
    protected static $specificNodesControllers = [
        // Put here your nodes which need a specific controller
        // instead of a node-type controller
    ];

    /**
     * {@inheritdoc}
     */
    public function homeAction(
        Request $request,
        $_locale = null
    ) {
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
     * @return Symfony\Component\HttpFoundation\Response
     */
    public function throw404($message = '')
    {
        $this->translation = $this->getService('em')
                            ->getRepository('RZ\Roadiz\Core\Entities\Translation')
                            ->findDefault();

        $this->prepareThemeAssignation(null, $this->translation);
        $this->getService('logger')->error($message);
        $this->assignation['errorMessage'] = $message;

        $this->getService('stopwatch')->start('twigRender');
        return new Response(
            $this->getTwig()->render('@' . static::getThemeDir() . '/404.html.twig', $this->assignation),
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
        return new Response(
            $this->renderView('@BaseTheme/maintenance.html.twig', $this->assignation),
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

        $this->themeContainer['grunt'] = function ($c) {
            return include dirname(__FILE__) . '/static/public/config/assets.config.php';
        };

        $this->assignation['themeServices'] = $this->themeContainer;

        $this->assignation['head']['facebookUrl'] = SettingsBag::get('facebook_url');
        $this->assignation['head']['facebookClientId'] = SettingsBag::get('facebook_client_id');
        $this->assignation['head']['instagramUrl'] = SettingsBag::get('instagram_url');
        $this->assignation['head']['twitterUrl'] = SettingsBag::get('twitter_url');
        $this->assignation['head']['googleplusUrl'] = SettingsBag::get('googleplus_url');
        $this->assignation['head']['googleClientId'] = SettingsBag::get('google_client_id');
        $this->assignation['head']['maps_style'] = SettingsBag::get('maps_style');
        $this->assignation['head']['themeName'] = static::$themeName;
        $this->assignation['head']['themeVersion'] = static::VERSION;

        // Get session messages
        $this->assignation['session']['messages'] = $this->getService('session')->getFlashBag()->all();
    }
}
