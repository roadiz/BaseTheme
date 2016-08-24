<?php
/**
 * Copyright (c) 2016. Rezo Zero
 *
 * BaseTheme
 *
 * @file SitemapController.php
 * @author Ambroise Maupate <ambroise@rezo-zero.com>
 */
namespace Themes\BaseTheme\Controllers;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\BaseThemeApp;

/**
 * Class SitemapController
 * @package Themes\BaseTheme\Controllers
 */
class SitemapController extends BaseThemeApp
{
    /**
     * @param Request $request
     * @param string $_locale
     * @return Response
     */
    public function sitemapAction(
        Request $request,
        $_locale = 'fr'
    ) {
        $this->prepareThemeAssignation(null, $this->bindLocaleFromRoute($request, $_locale));

        /*
         * Add your own nodes grouped by their type.
         */
        $this->assignation['pages'] = $this->getService('nodeSourceApi')
            ->getBy([
                'node.nodeType' => [
                    $this->themeContainer['typePage'],
                ],
                'node.visible' => true,
            ]);

        return new Response(
            trim($this->getTwig()->render('@' . static::getThemeDir() . '/sitemap/sitemap.xml.twig', $this->assignation)),
            Response::HTTP_OK,
            array('content-type' => 'application/xml')
        );
    }
}
