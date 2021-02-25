<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Controllers;

use Doctrine\ORM\QueryBuilder;
use RZ\Roadiz\Core\AbstractEntities\TranslationInterface;
use RZ\Roadiz\Core\Entities\NodeType;
use Themes\BaseTheme\BaseThemeApp;

abstract class AbstractSitemapController extends BaseThemeApp
{
    /**
     * @param TranslationInterface|null $translation
     * @return \IteratorAggregate|array
     */
    protected function getListableNodeSources(?TranslationInterface $translation = null)
    {
        /** @var QueryBuilder $qb */
        $qb = $this->get('em')
            ->getRepository(NodeType::class)
            ->createQueryBuilder('nt');
        $qb->andWhere($qb->expr()->notIn('nt.name', $this->getIgnoredNodeTypes()))
            ->andWhere($qb->expr()->eq('nt.reachable', true));
        $nodeTypes = $qb->getQuery()->getResult();

        $criteria = [
            'node.nodeType' => $nodeTypes,
            'node.visible' => true,
        ];

        if (null !== $translation) {
            $criteria['translation'] = $translation;
        }

        /*
         * Add your own nodes grouped by their type.
         */
        return $this->get('nodeSourceApi')
            ->getBy($criteria);
    }

    protected function getIgnoredNodeTypes(): array
    {
        return ['Link'];
    }
}
