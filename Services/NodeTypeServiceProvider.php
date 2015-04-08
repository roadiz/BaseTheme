<?php
/**
 * Copyright REZO ZERO 2014
 *
 *
 *
 * @file NodeTypeServiceProvider.php
 * @copyright REZO ZERO 2014
 * @author Ambroise Maupate
 */
namespace Themes\BaseTheme\Services;

use Pimple\Container;
use Pimple\ServiceProviderInterface;
use RZ\Roadiz\CMS\Utils\NodeTypeApi;

/**
 * Node type
 */
class NodeTypeServiceProvider implements ServiceProviderInterface
{
    protected $api;

    public function __construct(NodeTypeApi $api)
    {
        $this->api = $api;
    }

    /**
     * @param Pimple\Container $container
     */
    public function register(Container $container)
    {

        $container['typePage'] = function ($c) {
            return $this->api
            ->getOneBy(['name' => 'Page']);
        };

        return $container;
    }
}
