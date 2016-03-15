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
 * @file SitemapController.php
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
