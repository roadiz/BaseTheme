<?php
/**
 * Copyright (c) 2017. Rezo Zero
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

        $nodeTypes = $this->get('em')->getRepository('RZ\Roadiz\Core\Entities\NodeType')
            ->findBy([
                'reachable' => true
            ]);

        /*
         * Add your own nodes grouped by their type.
         */
        $this->assignation['pages'] = $this->get('nodeSourceApi')
            ->getBy([
                'node.nodeType' => $nodeTypes,
                'node.visible' => true,
            ]);

        return new Response(
            trim($this->getTwig()->render('@BaseTheme/sitemap/sitemap.xml.twig', $this->assignation)),
            Response::HTTP_OK,
            array('content-type' => 'application/xml')
        );
    }
}
