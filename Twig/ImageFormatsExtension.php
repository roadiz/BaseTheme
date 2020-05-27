<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Twig;

use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;

class ImageFormatsExtension extends AbstractExtension implements GlobalsInterface
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
                    'picture' => true, // Only available in Roadiz 1.1+
                    'progressive' => true,
                    'class' => 'img-fluid',
                ],
                'columnedImage' => [
                    'width' => 720,
                    'picture' => true, // Only available in Roadiz 1.1+
                    'progressive' => true,
                    'class' => 'img-fluid',
                ],
                'thumbnail' => [
                    'fit' => '600x338',
                    'controls' => true,
                    'picture' => true, // Only available in Roadiz 1.1+
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
