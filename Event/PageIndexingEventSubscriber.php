<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Event;

//use GeneratedNodeSources\NSGroupBlocks;
use GeneratedNodeSources\NSPage;
use Pimple\Container;
use RZ\Roadiz\Core\ContainerAwareInterface;
use RZ\Roadiz\Core\ContainerAwareTrait;
use RZ\Roadiz\Core\Entities\NodesSources;
use RZ\Roadiz\Core\Events\NodesSources\NodesSourcesIndexingEvent;
use RZ\Roadiz\Core\SearchEngine\SolariumFactoryInterface;
use RZ\Roadiz\Core\SearchEngine\SolariumNodeSource;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

final class PageIndexingEventSubscriber implements EventSubscriberInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [
            NodesSourcesIndexingEvent::class => ['onIndexing'],
        ];
    }

    /**
     * @param NodesSourcesIndexingEvent $event
     * @throws \Exception
     * @return void
     */
    public function onIndexing(NodesSourcesIndexingEvent $event)
    {
        $nodeSource = $event->getNodeSource();
        if (null !== $this->container &&
            ($nodeSource instanceof NSPage/* || $nodeSource instanceof NSGroupBlocks*/)) {
            $assoc = $event->getAssociations();

            /*
             * Fetch every non-reachable blocks
             * to gather their text content in master page document
             */
            $children = $this->container['nodeSourceApi']->getBy([
                'node.nodeType.reachable' => false,
                'node.visible' => true,
                'translation' => $nodeSource->getTranslation(),
                'node.parent' => $nodeSource->getNode(),
            ]);

            /** @var NodesSources $child */
            foreach ($children as $child) {
                /** @var SolariumNodeSource $solarium */
                $solarium = $this->container[SolariumFactoryInterface::class]->createWithNodesSources($child);
                // Fetch all fields array association AS sub-resources (i.e. do not index their title)
                $childAssoc = $solarium->getFieldsAssoc(true);
                $assoc['collection_txt'] = array_merge(
                    $assoc['collection_txt'],
                    $childAssoc['collection_txt']
                );
            }

            $event->setAssociations($assoc);
        }
    }
}
