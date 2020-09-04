<?php
declare(strict_types=1);

namespace Themes\BaseTheme\TreeWalker;

use RZ\Roadiz\CMS\Utils\NodeSourceApi;
use RZ\Roadiz\Core\Bags\NodeTypes;
use RZ\TreeWalker\WalkerContextInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Stopwatch\Stopwatch;

class NodeSourceWalkerContext implements WalkerContextInterface
{
    /**
     * @var AuthorizationCheckerInterface
     */
    protected $authorizationChecker;
    /**
     * @var Stopwatch
     */
    private $stopwatch;

    /**
     * @var NodeTypes
     */
    private $nodeTypesBag;

    /**
     * @var NodeSourceApi
     */
    private $nodeSourceApi;

    /**
     * NodeSourceWalkerContext constructor.
     *
     * @param Stopwatch                     $stopwatch
     * @param NodeTypes                     $nodeTypesBag
     * @param NodeSourceApi                 $nodeSourceApi
     * @param AuthorizationCheckerInterface $authorizationChecker
     */
    public function __construct(
        Stopwatch $stopwatch,
        NodeTypes $nodeTypesBag,
        NodeSourceApi $nodeSourceApi,
        AuthorizationCheckerInterface $authorizationChecker
    ) {
        $this->stopwatch = $stopwatch;
        $this->nodeTypesBag = $nodeTypesBag;
        $this->nodeSourceApi = $nodeSourceApi;
        $this->authorizationChecker = $authorizationChecker;
    }

    /**
     * @return Stopwatch
     */
    public function getStopwatch(): Stopwatch
    {
        return $this->stopwatch;
    }

    /**
     * @return NodeTypes
     */
    public function getNodeTypesBag(): NodeTypes
    {
        return $this->nodeTypesBag;
    }

    /**
     * @return NodeSourceApi
     */
    public function getNodeSourceApi(): NodeSourceApi
    {
        return $this->nodeSourceApi;
    }

    /**
     * @return AuthorizationCheckerInterface
     */
    public function getAuthorizationChecker(): AuthorizationCheckerInterface
    {
        return $this->authorizationChecker;
    }
}
