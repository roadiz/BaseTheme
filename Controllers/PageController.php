<?php
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
     * @param Request $request
     * @param Node|null $node
     * @param Translation|null $translation
     * @return Response
     */
    public function indexAction(
        Request $request,
        Node $node = null,
        Translation $translation = null
    ) {
        $this->prepareThemeAssignation($node, $translation);

        $response = $this->render('pages/page.html.twig', $this->assignation);

        /*
         * Set http cache for current request
         * only if prod mode.
         *
         * Be careful! Do not use cache
         * if page contains form and user content!
         */
        // $kernel = $this->get('kernel');
        // if (!$kernel->isPreview() &&
        //     !$kernel->isDebug()) {
        //     $response->setPublic();
        //     $response->setMaxAge(60*60);
        // }

        return $response;
    }
}
