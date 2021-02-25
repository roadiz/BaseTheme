<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Services;

use Pimple\Container;
use Pimple\ServiceProviderInterface;
use RZ\Roadiz\Core\AbstractEntities\TranslationInterface;

/**
 * @package Themes\BaseTheme\Services
 */
class NodeServiceProvider implements ServiceProviderInterface
{
    /**
     * @var TranslationInterface|null
     */
    protected $translation;
    /**
     * @var Container
     */
    protected $coreServices;

    /**
     * @param Container $coreServices
     * @param TranslationInterface|null $translation
     */
    public function __construct(Container $coreServices, TranslationInterface $translation = null)
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
        $container['nodeSourceMenu'] = function () {
            return $this->coreServices['nodeSourceApi']
                ->getOneBy([
                    'node.nodeName' => 'main-menu',
                    'node.nodeType' => $this->coreServices['nodeTypesBag']->get('Neutral'),
                    'translation' => $this->translation,
                ]);
        };

        /*
         * Register legals page
         */
        $container['nodeSourceLegals'] = function () {
            return $this->coreServices['nodeSourceApi']
                ->getOneBy([
                    'node.nodeType' => $this->coreServices['nodeTypesBag']->get('Page'),
                    'node.nodeName' => 'legal',
                    'node.visible' => true,
                    'translation' => $this->translation,
                ]);
        };

        return $container;
    }
}
