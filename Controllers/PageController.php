<?php
declare(strict_types=1);
/**
 * Copyright (c) 2017. Rezo Zero
 *
 * BaseTheme
 *
 * @file PageController.php
 * @author Ambroise Maupate <ambroise@rezo-zero.com>
 */
namespace Themes\BaseTheme\Controllers;

use RZ\Roadiz\Core\Entities\Node;
use RZ\Roadiz\Core\Entities\Translation;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class PageController
 * @package Themes\KlepierreTheme\Controllers
 */
class PageController extends AbstractBlockAwareController
{
    protected function getTemplatePath(): string
    {
        return 'pages/page.html.twig';
    }
}
