<?php
/**
 * Copyright (c) 2017. Rezo Zero
 *
 * BaseTheme
 *
 * @file AssetsServiceProvider.php
 * @author Ambroise Maupate <ambroise@rezo-zero.com>
 */
namespace Themes\BaseTheme\Services;

use Pimple\Container;
use Pimple\ServiceProviderInterface;

/**
 * Image formats.
 */
class AssetsServiceProvider implements ServiceProviderInterface
{
    /**
     * @param Container $container
     * @return Container
     */
    public function register(Container $container)
    {
        $container['imageFormats'] = function ($c) {

            $array = [];

            $array['headerImage'] = [
                'width' => 1440,
                'progressive' => true,
                'class' => 'img-responsive',
            ];

            $array['columnedImage'] = [
                'width' => 720,
                'progressive' => true,
                'class' => 'img-responsive',
            ];

            $array['thumbnail'] = [
                'fit' => '600x338',
                'controls' => true,
                'embed' => true,
                'progressive' => true
            ];

            $array['shareImage'] = [
                'fit' => '1200x630',
                'absolute' => true,
                'progressive' => true,
            ];
            return $array;
        };

        return $container;
    }
}
