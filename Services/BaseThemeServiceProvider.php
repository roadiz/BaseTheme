<?php
declare(strict_types=1);
/**
 * Copyright (c) 2019. Ambroise Maupate and Julien Blanchet
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
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 */

namespace Themes\BaseTheme\Services;

use Doctrine\Common\Collections\ArrayCollection;
use Pimple\Container;
use Pimple\ServiceProviderInterface;
use RZ\Roadiz\Utils\Asset\Packages;
use Symfony\Component\Asset\Context\RequestStackContext;
use Symfony\Component\Asset\PathPackage;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Themes\BaseTheme\Event\LinkPathGeneratingEventListener;
use Themes\BaseTheme\Twig\ImageFormatsExtension;

class BaseThemeServiceProvider implements ServiceProviderInterface
{
    public function register(Container $container)
    {
        $container->extend('dispatcher', function (EventDispatcherInterface $dispatcher) {
            /*
             * Path generating subscriber to transform NSLink URL in their linked node Path
             * or manually defined URLs
             */
            $dispatcher->addSubscriber(new LinkPathGeneratingEventListener());
            return $dispatcher;
        });

        $container->extend('assetPackages', function (Packages $packages, Container $c) {
            $packages->addPackage('BaseTheme', new PathPackage(
                'themes/BaseTheme/static',
                $c['versionStrategy'],
                new RequestStackContext($c['requestStack'])
            ));
            return $packages;
        });

        $container->extend('twig.extensions', function (ArrayCollection $extensions) {
            $extensions->add(new ImageFormatsExtension());
            return $extensions;
        });
    }
}
