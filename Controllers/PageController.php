<?php
declare(strict_types=1);
/**
 * Copyright (c) 2017. Rezo Zero
 *
 * BaseTheme
 *
 * @file PageController.php
 * @author Ambroise Maupate <ambroise@rezo-zero.com>
 */
namespace Themes\BaseTheme\Controllers;

use RZ\Roadiz\Core\Entities\Node;
use RZ\Roadiz\Core\Entities\Translation;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\BaseThemeApp;

/**
 * Class PageController
 * @package Themes\BaseTheme\Controllers
 */
class PageController extends BaseThemeApp
{
    /**
     * @param Request          $request
     * @param Node|null        $node
     * @param Translation|null $translation
     *
     * @return Response
     * @throws \Twig\Error\RuntimeError
     */
    public function indexAction(
        Request $request,
        Node $node = null,
        Translation $translation = null
    ) {
        $this->prepareThemeAssignation($node, $translation);

        $response = $this->render('pages/page.html.twig', $this->assignation);

        /*
         * Uncomment to make response public for caching
         * with reverse proxies like Varnish or Symfony.
         *
         * Be careful! Do not cache your response
         * if page contains form and/or user content!
         * Or make them stateless… (disabling CSRF and
         * using a different form action route).
         */
        if ($node->getTtl() > 0) {
            $this->makeResponseCachable($request, $response, $node->getTtl());
        }

        return $response;
    }
}
