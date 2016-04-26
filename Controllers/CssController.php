<?php
/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file CssController.php
 * @author Ambroise Maupate
 */
namespace Themes\BaseTheme\Controllers;

use RZ\Roadiz\Core\Entities\Node;
use RZ\Roadiz\Core\Entities\Translation;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\BaseThemeApp;

/**
 * CssController class
 */
class CssController extends BaseThemeApp
{
    const CSS_CACHE_ID = "dynamic_styles";

    /**
     * @param Request     $request
     * @param Node        $node
     * @param Translation $translation
     *
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

    public function getPages()
    {
        $pages = $this->getService('nodeSourceApi')
            ->getBy(array(
                'node.nodeType' => $this->themeContainer['typePage'],
                'translation' => $this->translation
            ));

        return $pages;
    }
}
