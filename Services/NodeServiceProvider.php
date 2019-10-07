<?php
declare(strict_types=1);
/**
 * Copyright (c) 2017. Rezo Zero
 *
 * BaseTheme
 *
 * @file NodeServiceProvider.php
 * @author Ambroise Maupate <ambroise@rezo-zero.com>
 */
namespace Themes\BaseTheme\Services;

use Pimple\Container;
use Pimple\ServiceProviderInterface;
use RZ\Roadiz\Core\Entities\Translation;

/**
 * Class NodeServiceProvider
 * @package Themes\BaseTheme\Services
 */
class NodeServiceProvider implements ServiceProviderInterface
{
    protected $translation;
    protected $coreServices;

    /**
     * NodeServiceProvider constructor.
     * @param Container $coreServices
     * @param Translation|null $translation
     */
    public function __construct(Container $coreServices, Translation $translation = null)
    {
        $this->coreServices = $coreServices;
        $this->translation = $translation;
    }

    /**
     * @param Container $container
     * @return Container
     */
    public function register(Container $container)
    {
        /*
         * Get main-menu root node
         * whatever its translation.
         */
        $container['nodeMenu'] = function () {
            return $this->coreServices['nodeApi']
                        ->getOneBy([
                            'nodeName' => 'main-menu',
                        ]);
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

        /*
         * Register legals page
         */
        $container['nodeSourceLegals'] = function () {
            return $this->coreServices['nodeSourceApi']
                ->getOneBy([
                    'node.nodeType' => $this->coreServices['nodeTypesBag']->get('Page'),
                    'node.nodeName' => 'legals',
                    'node.visible' => true,
                    'translation' => $this->translation,
                ]);
        };

        return $container;
    }
}
