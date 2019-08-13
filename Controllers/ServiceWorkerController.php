<?php
/**
 * Copyright (c) 2019
 * 
 * BaseTheme
 *
 * @file SitemapController.php
 * @author Bilel Jegham <contact.bileljegham@gmail.com>
 */
namespace Themes\BaseTheme\Controllers;

use RZ\Roadiz\Core\Entities\NodeType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\BaseThemeApp;

/**
 * Class ServiceWorkerController
 * @package Themes\BaseTheme\Controllers
 */
class ServiceWorkerController extends BaseThemeApp
{
  /**
     * @param Request $request
     * @param string $_locale
     * @return Response
     */
    public function serviceWorkerAction(
        Request $request,
        $_locale = 'fr'
    ) {
        $this->prepareThemeAssignation(null, $this->bindLocaleFromRoute($request, $_locale));

        $nodeTypes = $this->get('em')->getRepository(NodeType::class)
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

        $response = new Response(
            trim($this->getTwig()->render('service-worker/sw.js.twig', $this->assignation)),
            Response::HTTP_OK,
            ['content-type' => 'application/javascript']
        );

        $this->makeResponseCachable($request, $response, 60);
        return $response;
    }
    
    /**
     * @param Request $request
     * @param string $_locale
     * @return Response
     */
    public function offlineAction(
        Request $request,
        $_locale = 'fr'
    ) {
        $this->prepareThemeAssignation(null, $this->bindLocaleFromRoute($request, $_locale));


        $response = $this->render('pages/offline.html.twig', $this->assignation);

        $this->makeResponseCachable($request, $response, 60);
        return $response;
    }

}
