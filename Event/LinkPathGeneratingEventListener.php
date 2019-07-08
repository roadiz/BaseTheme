<?php
/**
 * Copyright (c) 2019. Ambroise Maupate and Julien Blanchet
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 */

namespace Themes\BaseTheme\Event;

use GeneratedNodeSources\NSLink;
use RZ\Roadiz\Core\Events\FilterNodeSourcePathEvent;
use RZ\Roadiz\Core\Events\NodesSourcesEvents;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class LinkPathGeneratingEventListener implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            NodesSourcesEvents::NODE_SOURCE_PATH_GENERATING => ['onPathGeneration']
        ];
    }

    /**
     * @param FilterNodeSourcePathEvent $event
     * @param string                    $eventName
     * @param EventDispatcherInterface  $dispatcher
     */
    public function onPathGeneration(FilterNodeSourcePathEvent $event, $eventName, EventDispatcherInterface $dispatcher)
    {
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
                /** @var FilterNodeSourcePathEvent $subEvent */
                $subEvent = clone $event;
                $subEvent->setNodeSource($nodeSource->getInternalLinkSources()[0]);
                /*
                 * Dispatch a path generation again for linked node-source.
                 */
                $dispatcher->dispatch(NodesSourcesEvents::NODE_SOURCE_PATH_GENERATING, $subEvent);
                /*
                 * Fill main event with sub-event data
                 */
                $event->setPath($subEvent->getPath());
                $event->setComplete($subEvent->isComplete());
                $event->setParameters($subEvent->getParameters());
                // Stop propagation AFTER sub-event was dispatched not to prevent it to perform.
                $event->stopPropagation();
            }
        }
    }
}
