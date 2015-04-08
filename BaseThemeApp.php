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

/**
 * BaseThemeApp class
 */
class BaseThemeApp extends FrontendController
{
    const VERSION = '0.7.1';

    protected static $themeName = 'RZ Base theme';
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

        $this->prepareThemeAssignation($home, $translation);
        /*
         * Use home page node-type to render it.
         */
        return $this->handle($request);

        /*
         * Render Homepage manually
         */
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
        $this->prepareThemeAssignation(null, null);

        $this->assignation['errorMessage'] = $message;

        $this->getService('stopwatch')->start('twigRender');
        return new Response(
            $this->getTwig()->render('@'.static::getThemeDir().'/404.html.twig', $this->assignation),
            Response::HTTP_NOT_FOUND,
            array('content-type' => 'text/html')
        );
    }

    /**
     * @param RZ\Roadiz\Core\Entities\Node        $node
     * @param RZ\Roadiz\Core\Entities\Translation $translation
     *
     * @return void
     */
    protected function prepareThemeAssignation(Node $node = null, Translation $translation = null)
    {
        parent::prepareThemeAssignation($node, $translation);

        /*
         * Register services
         */
        $this->themeContainer->register(new \Themes\BaseTheme\Services\NodeServiceProvider($this->getService(), $this->translation));
        $this->themeContainer->register(new \Themes\BaseTheme\Services\NodeTypeServiceProvider($this->getService('nodeTypeApi')));
        $this->themeContainer->register(new \Themes\BaseTheme\Services\SLIRServiceProvider());

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
