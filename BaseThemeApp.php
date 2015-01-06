<?php
/*
 * Copyright REZO ZERO 2014
 *
 * Description
 *
 * @file BaseThemeApp.php
 * @copyright REZO ZERO 2014
 * @author Ambroise Maupate
 */

namespace Themes\BaseTheme;

use RZ\Roadiz\CMS\Controllers\FrontendController;
use RZ\Roadiz\Core\Entities\Node;
use RZ\Roadiz\Core\Entities\Translation;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use RZ\Roadiz\Core\Kernel;

/**
* BaseThemeApp class
*/
class BaseThemeApp extends FrontendController
{
    /**
     * {@inheritdoc}
     */
    protected static $themeName =      'RZ Base theme';
    /**
     * {@inheritdoc}
     */
    protected static $themeAuthor =    'REZO ZERO';
    /**
     * {@inheritdoc}
     */
    protected static $themeCopyright = 'REZO ZERO';
    /**
     * {@inheritdoc}
     */
    protected static $themeDir =       'BaseTheme';
    /**
     * {@inheritdoc}
     */
    protected static $backendTheme =    false;

    /**
     * {@inheritdoc}
     */
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
            return include(dirname(__FILE__).'/static/public/config/assets.config.php');
        };

        $this->themeContainer['node.home'] = function($c) {
            return $this->getService('em')
                 ->getRepository('RZ\Roadiz\Core\Entities\Node')
                 ->findHomeWithTranslation($this->translation);
        };

        $this->themeContainer['imageFormats'] = function ($c)
        {
            $array = array();

            /*
             * Common image format for pages headers
             */
            $array['headerImage'] = array(
                'width'=>1024,
                'crop'=>'1024x200'
            );

            $array['thumbnail'] = array(
                "width" => 600,
                "crop" => "16x9",
                "controls" => true,
                "embed" => true
            );

            return $array;
        };

        $this->assignation['themeServices'] = $this->themeContainer;
    }

    /**
     * @return RZ\Roadiz\Core\Entities\Node
     */
    protected function assignMainNavigation()
    {
        if ($this->translation === null) {
            $this->translation = $this->getService('em')
                ->getRepository('RZ\Roadiz\Core\Entities\Translation')
                ->findOneBy(
                    array('defaultTranslation'=>true)
                );
        }

        $parent = $this->themeContainer['node.home'];

        if ($parent !== null) {
            return $this->getService('nodeApi')
                        ->getBy(
                            array('parent' => $parent),
                            array('position'=>'ASC')
                        );
        }

        return null;
    }
}
