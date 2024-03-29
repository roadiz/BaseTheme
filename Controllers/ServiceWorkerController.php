<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Controllers;

use RZ\Roadiz\Core\Kernel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * @package Themes\BaseTheme\Controllers
 */
class ServiceWorkerController extends AbstractSitemapController
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
    public function serviceWorkerAction(
        Request $request,
        string $_locale = 'fr'
    ) {
        $this->prepareThemeAssignation(null, $this->bindLocaleFromRoute($request, $_locale));
        /*
         * Add your own nodes grouped by their type.
         */
        /** @var Kernel $kernel */
        $kernel = $this->get('kernel');
        if (!$kernel->isPreview()) {
            $this->assignation['pages'] = $this->getListableNodeSources($this->translation);
        } else {
            // do not preload nor cache previews
            $this->assignation['pages'] = [];
        }

        $response = new Response(
            trim($this->getTwig()->render('service-worker/sw.js.twig', $this->assignation)),
            Response::HTTP_OK,
            ['content-type' => 'application/javascript']
        );

        $this->makeResponseCachable($request, $response, 60);
        return $response;
    }

    protected function getIgnoredNodeTypes(): array
    {
        return [
            'Link',
            'BlogPost',
            // Ignore numerous and small pages
            // to avoid painful load at first website
            // visit.
        ];
    }

    /**
     * @param Request $request
     * @param string $_locale
     * @return Response
     */
    public function offlineAction(
        Request $request,
        string $_locale = 'fr'
    ) {
        $this->prepareThemeAssignation(null, $this->bindLocaleFromRoute($request, $_locale));

        $this->assignation['nodeName'] = 'offline-page';
        $this->assignation['nodeTypeName'] = 'offline';
        $this->assignation['title'] = $this->get('translator')->trans('offline.title');

        $response = $this->render('pages/offline.html.twig', $this->assignation);

        $this->makeResponseCachable($request, $response, 60);
        return $response;
    }
}
