<?php
declare(strict_types=1);

namespace Themes\BaseTheme\TreeWalker;

use GeneratedNodeSources\NSNeutral;
use GeneratedNodeSources\NSPage;
use RZ\TreeWalker\AbstractWalker;
use RZ\TreeWalker\Definition\ZeroChildrenDefinition;
use Themes\BaseTheme\TreeWalker\Definition\ReachableNodeSourceDefinition;

class NodeSourceWalker extends AbstractWalker
{
    protected function initializeDefinitions(): void
    {
        $zeroChildren = new ZeroChildrenDefinition($this->getContext());
        $reachableChildren = new ReachableNodeSourceDefinition($this->getContext());

        $this->addDefinition(NSPage::class, $reachableChildren);
        $this->addDefinition(NSNeutral::class, $reachableChildren);
    }
}
