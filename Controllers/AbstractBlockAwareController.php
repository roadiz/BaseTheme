<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Controllers;

use GeneratedNodeSources\NSContactBlock;
use RZ\Roadiz\Core\Entities\Node;
use RZ\Roadiz\Core\Entities\NodesSources;
use RZ\Roadiz\Core\Entities\NodeType;
use RZ\Roadiz\Core\Entities\Translation;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\BaseThemeApp;

abstract class AbstractBlockAwareController extends BaseThemeApp
{
    /**
     * @var NodesSources[]|null
     */
    private $blocks;

    /**
     * @param Request          $request
     * @param Node|null        $node
     * @param Translation|null $translation
     *
     * @return Response
     * @throws \Twig\Error\RuntimeError
     */
    public function indexAction(
        Request $request,
        Node $node = null,
        Translation $translation = null
    ) {
        $this->prepareThemeAssignation($node, $translation);

        $this->assignation['page'] = (int) $request->get('page', 1);

        $response = $this->render($this->getTemplatePath(), $this->assignation);

        /*
         * Uncomment to make response public for caching
         * with reverse proxies like Varnish or Symfony.
         *
         * Be careful! Do not cache your response
         * if page contains form and/or user content!
         * Or make them stateless… (disabling CSRF and
         * using a different form action route).
         */
        $ttl = $this->getTtl();
        if ($ttl > 0) {
            $this->makeResponseCachable($request, $response, $ttl);
        }

        return $response;
    }

    protected function extendAssignation()
    {
        parent::extendAssignation();

        $this->assignation['blocks'] = $this->getBlocks();
    }

    /**
     * @return array
     */
    protected function getBlocks(): array
    {
        if (null === $this->blocks) {
            $this->get('stopwatch')->start('controllerBlocks');
            $criteria = [
                'node.visible' => true,
                'node.parent' => $this->node,
                'translation' => $this->translation,
                'node.nodeType.reachable' => false,
            ];
            $ignored = $this->getIgnoredBlockTypes();
            if (count($ignored) > 0) {
                $criteria['node.nodeType'] = ['NOT IN', $ignored];
            }
            $this->blocks = $this->get('nodeSourceApi')->getBy($criteria, [
                'node.position' => 'ASC'
            ]);
            $this->get('stopwatch')->stop('controllerBlocks');
        }
        return $this->blocks;
    }

    /**
     * @return int
     */
    protected function getTtl(): int
    {
        foreach ($this->getBlocks() as $block) {
            // For example do not cache pages containing any ContactBlock, which has forms.
            if ($block instanceof NSContactBlock) {
                return 0;
            }
        }
        if (null !== $this->node) {
            return $this->node->getTtl();
        }

        return 10;
    }
    /**
     * @return NodeType[]
     */
    protected function getIgnoredBlockTypes(): array
    {
        return [
            // Add here node-types to ignore even if they are blocks.
        ];
    }

    abstract protected function getTemplatePath(): string;
}
