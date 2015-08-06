<?php
/**
 * Copyright REZO ZERO 2014
 *
 *
 *
 * @file NodeServiceProvider.php
 * @copyright REZO ZERO 2014
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
     * @param Pimple\Container $container
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
