<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Controllers;

use GeneratedNodeSources\NSContactBlock;
use RZ\Roadiz\Core\AbstractEntities\TranslationInterface;
use RZ\Roadiz\Core\Entities\Node;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\BaseThemeApp;

abstract class AbstractBlockAwareController extends BaseThemeApp
{
    /**
     * @param Request          $request
     * @param Node|null        $node
     * @param TranslationInterface|null $translation
     *
     * @return Response
     * @throws \Twig\Error\RuntimeError
     */
    public function indexAction(
        Request $request,
        Node $node = null,
        TranslationInterface $translation = null
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

    /**
     * @return int
     */
    protected function getTtl(): int
    {
        $contactBlocks = $this->blockWalker->getWalkersOfType(NSContactBlock::class);
        if (count($contactBlocks) > 0) {
            return 0;
        }
        if (null !== $this->node) {
            return $this->node->getTtl();
        }

        return 10;
    }

    abstract protected function getTemplatePath(): string;
}
