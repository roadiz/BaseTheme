<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Controllers;

use RZ\Roadiz\Core\Entities\Node;
use RZ\Roadiz\Core\Entities\Translation;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\BaseThemeApp;

abstract class AbstractBlockAwareController extends BaseThemeApp
{
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

        $this->assignation['blocks'] = $this->getBlocks();
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
        if ($node->getTtl() > 0) {
            $this->makeResponseCachable($request, $response, $node->getTtl());
        }

        return $response;
    }

    /**
     * @return array
     */
    protected function getBlocks(): array
    {
        return $this->get('nodeSourceApi')->getBy([
            'node.visible' => true,
            'node.parent' => $this->node,
            'translation' => $this->translation,
            'node.nodeType.reachable' => false,
        ], [
            'node.position' => 'ASC'
        ]);
    }

    abstract protected function getTemplatePath(): string;
}
