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
    const VERSION = '0.7.0';

    protected static $themeName = 'RZ Base theme';
    protected static $themeAuthor = 'REZO ZERO';
    protected static $themeCopyright = 'REZO ZERO';
    protected static $themeDir = 'BaseTheme';
    protected static $backendTheme = false;
    protected static $specificNodesControllers = array(
        // Put here your nodes which need a specific controller
        // instead of a node-type controller
    );

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
        $home = $this->getService('em')
                     ->getRepository('RZ\Roadiz\Core\Entities\Node')
                     ->findHomeWithTranslation($translation);

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
            $this->getTwig()->render('404.html.twig', $this->assignation),
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

        $this->themeContainer['navigation'] = function ($c) {
            return $this->assignMainNavigation();
        };

        $this->themeContainer['grunt'] = function ($c) {
            return include dirname(__FILE__) . '/static/public/config/assets.config.php';
        };

        $this->themeContainer['node.home'] = function ($c) {
            return $this->getHome($this->translation);
        };

        $this->themeContainer['imageFormats'] = function ($c) {
            $array = array();

            /*
             * Common image format for pages headers
             */
            $array['headerImage'] = array(
                'width' => 1024,
                'crop' => '1024x200',
            );

            $array['thumbnail'] = array(
                "width" => 600,
                "crop" => "16x9",
                "controls" => true,
                "embed" => true,
            );

            return $array;
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

    /**
     * @return RZ\Roadiz\Core\Entities\Node
     */
    protected function assignMainNavigation()
    {
        if ($this->translation === null) {
            $this->translation = $this->getService('em')
                 ->getRepository('RZ\Roadiz\Core\Entities\Translation')
                 ->findDefault();
        }

        $parent = $this->themeContainer['node.home'];

        if ($parent !== null) {
            return $this->getService('nodeApi')
                        ->getBy(
                            [
                                // Get children nodes from Homepage
                    // use parent => $this->getRoot() to get root nodes instead
                    'parent' => $parent,
                                'translation' => $this->translation,
                            ],
                            ['position' => 'ASC']
                        );
        }

        return null;
    }
}
