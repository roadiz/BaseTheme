<?php
/*
 * Copyright REZO ZERO 2015
 *
 *
 * @file SitemapController.php
 * @copyright REZO ZERO 2015
 * @author Ambroise Maupate
 */
namespace Themes\BaseTheme\Controllers;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\BaseThemeApp;

/**
 * SitemapController class
 */
class SitemapController extends BaseThemeApp
{
    public function sitemapAction(
        Request $request,
        $_locale = 'fr'
    ) {

        $this->prepareThemeAssignation(null, $this->bindLocaleFromRoute($request, $_locale));

        //$this->assignation['home'] = $this->themeContainer['homeNode']->getNodeSources()->first();

        /*
         * Add your own nodes grouped by their type.
         */
        $this->assignation['pages'] = $this->getService('nodeSourceApi')
             ->getBy([
                 'node.nodeType' => $this->themeContainer['typePage'],
                 'node.visible' => true,
                 'translation' => $this->translation,
             ]);

        return new Response(
            $this->getTwig()->render('@' . static::getThemeDir() . '/sitemap.xml.twig', $this->assignation),
            Response::HTTP_OK,
            array('content-type' => 'application/xml')
        );
    }
}
