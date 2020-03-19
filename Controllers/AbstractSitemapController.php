<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Controllers;

use Doctrine\ORM\QueryBuilder;
use RZ\Roadiz\Core\Entities\NodeType;
use Themes\BaseTheme\BaseThemeApp;

abstract class AbstractSitemapController extends BaseThemeApp
{
    /**
     * @return \IteratorAggregate|array
     */
    protected function getListableNodeSources()
    {
        /** @var QueryBuilder $qb */
        $qb = $this->get('em')
            ->getRepository(NodeType::class)
            ->createQueryBuilder('nt');
        $qb->andWhere($qb->expr()->notIn('nt.name', $this->getIgnoredNodeTypes()))
            ->andWhere($qb->expr()->eq('nt.reachable', true));
        $nodeTypes = $qb->getQuery()->getResult();

        /*
         * Add your own nodes grouped by their type.
         */
        return $this->get('nodeSourceApi')
            ->getBy([
                'node.nodeType' => $nodeTypes,
                'node.visible' => true,
            ]);
    }
    
    protected function getIgnoredNodeTypes(): array
    {
        return ['Link'];
    }
}
