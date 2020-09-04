<?php
declare(strict_types=1);

namespace Themes\BaseTheme\TreeWalker;

use GeneratedNodeSources\NSContentBlock;
use GeneratedNodeSources\NSLink;
use GeneratedNodeSources\NSNeutral;
use GeneratedNodeSources\NSPage;
use RZ\TreeWalker\AbstractWalker;
use RZ\TreeWalker\Definition\ZeroChildrenDefinition;
use Themes\BaseTheme\TreeWalker\Definition\NonReachableNodeSourceBlockDefinition;

class BlockNodeSourceWalker extends AbstractWalker
{
    protected function initializeDefinitions(): void
    {
        $zeroChildren = new ZeroChildrenDefinition($this->getContext());
        $nonReachableNodeSourceDefinition = new NonReachableNodeSourceBlockDefinition($this->getContext());

        $this->addDefinition(NSPage::class, $nonReachableNodeSourceDefinition);
        /*
         * Prevent useless DB queries on leaf blocks.
         */
        $this->addDefinition(NSContentBlock::class, $zeroChildren);
        $this->addDefinition(NSLink::class, $zeroChildren);

        /*
         * Do not trigger walk on containers and feed-blocks
         */

        $this->addDefinition(NSNeutral::class, $zeroChildren);
    }
}
