<?php
declare(strict_types=1);
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

/**
 * Class SitemapController
 * @package Themes\BaseTheme\Controllers
 */
class SitemapController extends AbstractSitemapController
{
    /**
     * @param Request $request
     * @param string  $_locale
     *
     * @return Response
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function sitemapAction(
        Request $request,
        $_locale = 'fr'
    ) {
        $this->prepareThemeAssignation(null, $this->bindLocaleFromRoute($request, $_locale));

        /*
         * Add your own nodes grouped by their type.
         */
        $this->assignation['pages'] = $this->getListableNodeSources();

        $response = new Response(
            trim($this->getTwig()->render('@BaseTheme/sitemap/sitemap.xml.twig', $this->assignation)),
            Response::HTTP_OK,
            ['content-type' => 'application/xml']
        );

        $this->makeResponseCachable($request, $response, 60);
        return $response;
    }
}
