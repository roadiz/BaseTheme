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
 * @file NodeServiceProvider.php
 * @author Ambroise Maupate
 */
namespace Themes\BaseTheme\Services;

use Pimple\Container;
use Pimple\ServiceProviderInterface;
use RZ\Roadiz\Core\Entities\Translation;

/**
 * Image formats.
 */
class NodeServiceProvider implements ServiceProviderInterface
{
    protected $translation;
    protected $coreServices;

    public function __construct(Container $coreServices, Translation $translation = null)
    {
        $this->coreServices = $coreServices;
        $this->translation = $translation;
    }

    /**
     * @param Container $container
     */
    public function register(Container $container)
    {
        $container['nodeMenu'] = function ($c) {
            if ($this->translation === null) {
                $this->translation = $this->coreServices['defaultTranslation'];
            }

            return $this->coreServices['em']
                        ->getRepository('RZ\Roadiz\Core\Entities\Node')
                        ->findHomeWithTranslation($this->translation);
        };

        /*
         * Register Main navigation
         * This is nodeSources !
         */
        $container['navigation'] = function ($c) {
            if ($c['nodeMenu'] !== null) {
                return $this->coreServices['nodeSourceApi']
                            ->getBy(
                                [
                                    'node.parent' => $c['nodeMenu'],
                                    'node.visible' => true,
                                    'translation' => $this->translation,
                                ],
                                ['node.position' => 'ASC']
                            );
            }

            return null;
        };

        return $container;
    }
}
