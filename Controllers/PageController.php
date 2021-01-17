<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Controllers;

/**
 * @package Themes\BaseTheme\Controllers
 */
class PageController extends AbstractBlockAwareController
{
    protected function getTemplatePath(): string
    {
        return 'pages/page.html.twig';
    }
}
