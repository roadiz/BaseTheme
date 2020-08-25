<?php
declare(strict_types=1);

namespace Themes\BaseTheme\TreeWalker\Definition;

use RZ\Roadiz\Core\Entities\NodesSources;
use RZ\TreeWalker\Definition\ContextualDefinitionTrait;
use Themes\BaseTheme\TreeWalker\NodeSourceWalkerContext;

final class NonReachableNodeSourceBlockDefinition
{
    use ContextualDefinitionTrait;

    public function __invoke(NodesSources $source): array
    {
        if ($this->context instanceof NodeSourceWalkerContext) {
            $this->context->getStopwatch()->start(static::class);
            $children = $this->context->getNodeSourceApi()->getBy([
                'node.parent' => $source->getNode(),
                'node.visible' => true,
                'translation' => $source->getTranslation(),
                'node.nodeType.reachable' => false,
            ], [
                'node.position' => 'ASC',
            ]);
            $this->context->getStopwatch()->stop(static::class);

            return $children;
        }
        throw new \InvalidArgumentException('Context should be instance of ' . NodeSourceWalkerContext::class);
    }
}
