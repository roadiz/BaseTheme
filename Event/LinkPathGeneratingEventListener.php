<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Event;

use GeneratedNodeSources\NSLink;
use RZ\Roadiz\Core\Entities\NodesSources;
use RZ\Roadiz\Core\Events\NodesSources\NodesSourcesPathGeneratingEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

final class LinkPathGeneratingEventListener implements EventSubscriberInterface
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
     * @return void
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
                $subEvent = clone $event;
                $needsAnchor = false;
                /** @var NodesSources $originalLinkedSource */
                $originalLinkedSource = $nodeSource->getInternalLinkSources()[0];
                $linkedSource = $originalLinkedSource;

                if (null !== $linkedSource->getNode() &&
                    null !== $linkedSource->getNode()->getNodeType()) {
                    /*
                     * if nodeSource is not reachable try its parent
                     */
                    if ($linkedSource->getNode()->getNodeType()->isReachable()) {
                        $subEvent->setNodeSource($linkedSource);
                    } else {
                        do {
                            if (null === $linkedSource) {
                                // we tested all ancestor without eligible nodeSource. Giving up…
                                return;
                            }
                            $linkedSource = $linkedSource->getParent();
                        } while (null === $linkedSource ||
                        (null !== $linkedSource->getNode() &&
                        null !== $linkedSource->getNode()->getNodeType() &&
                        !$linkedSource->getNode()->getNodeType()->isReachable()));

                        $needsAnchor = true;
                        $subEvent->setNodeSource($linkedSource);
                    }
                    /*
                     * Dispatch a path generation again for linked node-source.
                     */
                    $dispatcher->dispatch($subEvent);
                    /*
                     * Fill main event with sub-event data
                     */
                    if ($needsAnchor && null !== $originalLinkedSource->getNode()) {
                        $event->setPath($subEvent->getPath() . '#block-' . $originalLinkedSource->getNode()->getNodeName());
                    } else {
                        $event->setPath($subEvent->getPath());
                    }
                    $event->setComplete($subEvent->isComplete());
                    $event->setParameters($subEvent->getParameters());
                    $event->setContainsScheme($subEvent->containsScheme());
                    // Stop propagation AFTER sub-event was dispatched not to prevent it to perform.
                    $event->stopPropagation();
                }
            }
        }
    }
}
