<?php
/**
 * Copyright (c) 2016. Rezo Zero
 *
 * BaseTheme
 *
 * @file CssController.php
 * @author Ambroise Maupate <ambroise@rezo-zero.com>
 */
namespace Themes\BaseTheme\Controllers;

use RZ\Roadiz\Core\Entities\Node;
use RZ\Roadiz\Core\Entities\Translation;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\BaseThemeApp;

/**
 * Class CssController
 * @package Themes\BaseTheme\Controllers
 */
class CssController extends BaseThemeApp
{
    const CSS_CACHE_ID = "dynamic_styles";

    /**
     * @param Request $request
     * @param string|null $_locale
     * @return Response
     */
    public function stylesAction(
        Request $request,
        $_locale = null
    ) {
        /*
         * Use same cache as Doctrine
         */
        $cacheDriver = $this->getService('em')->getConfiguration()->getMetadataCacheImpl();

        if ($cacheDriver->contains(static::CSS_CACHE_ID)) {
            $response = $cacheDriver->fetch(static::CSS_CACHE_ID);
        } else {

            $response = new Response();

            $translation = $this->bindLocaleFromRoute($request, $_locale);
            $this->prepareThemeAssignation(null, $translation);

            // Pages
            $this->assignation['pages'] = $this->getPages();

            $response->setStatusCode(Response::HTTP_OK);
            $response->headers->set('Content-Type', 'text/css');
            $this->getService('stopwatch')->start('twigRender');

            $result = $this->getTwig()->render('@BaseTheme/css/dynamic-styles.css.twig', $this->assignation);

            $response->setContent($result);
            /*
             * Save response object
             */
            $cacheDriver->save(static::CSS_CACHE_ID, $response, 1800);
        }
        return $response;
    }

    /**
     * @return Node[]
     */
    protected function getPages()
    {
        $pages = $this->getService('nodeSourceApi')
            ->getBy(array(
                'node.nodeType' => $this->themeContainer['typePage'],
                'translation' => $this->translation
            ));

        return $pages;
    }
}
