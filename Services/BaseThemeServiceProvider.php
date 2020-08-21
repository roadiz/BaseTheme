<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Services;

use Doctrine\Common\Collections\ArrayCollection;
use Pimple\Container;
use Pimple\ServiceProviderInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Translation\Translator;
use Themes\BaseTheme\Event\LinkPathGeneratingEventListener;
use Themes\BaseTheme\Twig\ImageFormatsExtension;

class BaseThemeServiceProvider implements ServiceProviderInterface
{
    /**
     * @param Container $container
     * @return void
     */
    public function register(Container $container)
    {
        $container->extend('translator', function (Translator $translator) {
            $translator->addResource(
                'xlf',
                dirname(__DIR__) . '/Resources/translations/orejime.en.xlf',
                'en'
            );
            $translator->addResource(
                'xlf',
                dirname(__DIR__) . '/Resources/translations/orejime.fr.xlf',
                'fr'
            );
            return $translator;
        });

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
