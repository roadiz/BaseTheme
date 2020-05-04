<?php
declare(strict_types=1);

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
        
        $container->extend('twig.extensions', function (ArrayCollection $extensions) {
            $extensions->add(new ImageFormatsExtension());
            return $extensions;
        });
    }
}
