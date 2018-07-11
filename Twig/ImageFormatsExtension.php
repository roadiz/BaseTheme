<?php

namespace Themes\BaseTheme\Twig;


class ImageFormatsExtension extends \Twig_Extension implements \Twig_Extension_GlobalsInterface
{
    /**
     * @inheritDoc
     */
    public function getGlobals()
    {
        return [
            'imageFormats' => [
                'headerImage' => [
                    'fit' => '1920x300',
                    'quality' => 85,
                    'progressive' => true,
                    'class' => 'img-fluid',
                ],
                'columnedImage' => [
                    'width' => 720,
                    'progressive' => true,
                    'class' => 'img-fluid',
                ],
                'thumbnail' => [
                    'fit' => '600x338',
                    'controls' => true,
                    'embed' => true,
                    'progressive' => true
                ],
                'shareImage' => [
                    'fit' => '1200x630',
                    'absolute' => true,
                    'progressive' => true,
                ]
            ]
        ];
    }
}
