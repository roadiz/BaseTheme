<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Services;

use Pimple\Container;
use Pimple\ServiceProviderInterface;
use RZ\Roadiz\Core\AbstractEntities\TranslationInterface;
use RZ\Roadiz\Core\Bags\NodeTypes;
use RZ\Roadiz\CMS\Utils\NodeSourceApi;

/**
 * @package Themes\BaseTheme\Services
 */
class NodeServiceProvider implements ServiceProviderInterface
{
    protected ?TranslationInterface $translation;
    private NodeTypes $nodeTypes;
    private NodeSourceApi $nodeSourceApi;

    public function __construct(
        NodeTypes $nodeTypes,
        NodeSourceApi $nodeSourceApi,
        TranslationInterface $translation = null
    ) {
        $this->translation = $translation;
        $this->nodeTypes = $nodeTypes;
        $this->nodeSourceApi = $nodeSourceApi;
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
            return $this->nodeSourceApi
                ->getOneBy([
                    'node.nodeName' => 'main-menu',
                    'node.nodeType' => $this->nodeTypes->get('Neutral'),
                    'translation' => $this->translation,
                ]);
        };

        /*
         * Register legals page
         */
        $container['nodeSourceLegals'] = function () {
            return $this->nodeSourceApi
                ->getOneBy([
                    'node.nodeType' => $this->nodeTypes->get('Page'),
                    'node.nodeName' => 'legal',
                    'node.visible' => true,
                    'translation' => $this->translation,
                ]);
        };

        return $container;
    }
}
