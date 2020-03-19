<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Controllers;

use RZ\Roadiz\Core\Entities\Node;
use RZ\Roadiz\Core\Entities\Translation;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class PageController
 * @package Themes\BaseTheme\Controllers
 */
class PageController extends AbstractBlockAwareController
{
    protected function getTemplatePath(): string
    {
        return 'pages/page.html.twig';
    }
}
