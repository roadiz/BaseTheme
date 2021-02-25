<?php
declare(strict_types=1);

namespace Themes\BaseTheme\TreeWalker\Definition;

use Doctrine\ORM\Tools\Pagination\Paginator;
use RZ\Roadiz\Core\Entities\NodesSources;
use RZ\TreeWalker\Definition\ContextualDefinitionTrait;
use RZ\TreeWalker\WalkerContextInterface;
use Themes\BaseTheme\TreeWalker\NodeSourceWalkerContext;

final class SingleTypeChildrenDefinition
{
    use ContextualDefinitionTrait;

    /**
     * @var string
     */
    protected $singleType;

    public function __construct(WalkerContextInterface $context, string $singleType)
    {
        $this->singleType = $singleType;
        $this->context = $context;
    }

    /**
     * @param NodesSources $source
     * @return array|Paginator
     */
    public function __invoke(NodesSources $source)
    {
        if ($this->context instanceof NodeSourceWalkerContext) {
            $this->context->getStopwatch()->start(static::class);
            $children = $this->context->getNodeSourceApi()->getBy([
                'node.parent' => $source->getNode(),
                'node.visible' => true,
                'translation' => $source->getTranslation(),
                'node.nodeType' => $this->context->getNodeTypesBag()->get($this->singleType)
            ], [
                'node.position' => 'ASC',
            ]);
            $this->context->getStopwatch()->stop(static::class);

            return $children;
        }
        throw new \InvalidArgumentException('Context should be instance of ' . NodeSourceWalkerContext::class);
    }
}
