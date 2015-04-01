<?php
/**
 * Copyright REZO ZERO 2014
 *
 *
 *
 * @file SLIRServiceProvider.php
 * @copyright REZO ZERO 2014
 * @author Ambroise Maupate
 */
namespace Themes\BaseTheme\Services;

use Pimple\Container;
use Pimple\ServiceProviderInterface;

/**
 * Image formats.
 */
class SLIRServiceProvider implements ServiceProviderInterface
{

    /**
     * @param Pimple\Container $container
     */
    public function register(Container $container)
    {
        $container['imageFormats'] = function ($c) {

            $array = [];

            $array['headerImage'] = [
                'width' => 1024,
                'crop' => '1024x200',
            ];

            $array['thumbnail'] = [
                "width" => 600,
                "crop" => "16x9",
                "controls" => true,
                "embed" => true,
            ];

            $array['shareImage'] = [
                'crop' => '200x200',
                'width' => 200,
                'quality' => 90,
            ];
            return $array;
        };

        return $container;
    }
}
