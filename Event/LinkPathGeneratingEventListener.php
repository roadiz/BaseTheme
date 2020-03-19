<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Event;

use GeneratedNodeSources\NSLink;
use RZ\Roadiz\Core\Events\NodesSources\NodesSourcesPathGeneratingEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class LinkPathGeneratingEventListener implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            NodesSourcesPathGeneratingEvent::class => ['onPathGeneration']
        ];
    }

    /**
     * @param NodesSourcesPathGeneratingEvent $event
     * @param string                          $eventName
     * @param EventDispatcherInterface        $dispatcher
     */
    public function onPathGeneration(
        NodesSourcesPathGeneratingEvent $event,
        $eventName,
        EventDispatcherInterface $dispatcher
    ) {
        $nodeSource = $event->getNodeSource();

        if ($nodeSource instanceof NSLink) {
            if (null !== $nodeSource->getExternalLink() &&
                $nodeSource->getExternalLink() !== '') {
                $event->setPath($nodeSource->getExternalLink());
                $event->setComplete(true);
                $event->setContainsScheme(true);
                // Stop propagation AFTER sub-event was dispatched not to prevent it to perform.
                $event->stopPropagation();
            } elseif (count($nodeSource->getInternalLinkSources()) > 0) {
                /*
                 * If editor linked to an internal page through a node reference
                 */
                /** @var NodesSourcesPathGeneratingEvent $subEvent */
                $subEvent = clone $event;
                $subEvent->setNodeSource($nodeSource->getInternalLinkSources()[0]);
                /*
                 * Dispatch a path generation again for linked node-source.
                 */
                $dispatcher->dispatch($subEvent);
                /*
                 * Fill main event with sub-event data
                 */
                $event->setPath($subEvent->getPath());
                $event->setComplete($subEvent->isComplete());
                $event->setParameters($subEvent->getParameters());
                $event->setContainsScheme($subEvent->containsScheme());
                // Stop propagation AFTER sub-event was dispatched not to prevent it to perform.
                $event->stopPropagation();
            }
        }
    }
}
