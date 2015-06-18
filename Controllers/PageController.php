<?php
/*
 * Copyright REZO ZERO 2014
 *
 * Page
 *
 * @file PageController.php
 * @copyright REZO ZERO 2015
 * @author Ambroise Maupate
 */

namespace Themes\BaseTheme\Controllers;

use RZ\Roadiz\Core\Entities\Node;
use RZ\Roadiz\Core\Entities\Translation;
use Symfony\Component\HttpFoundation\Request;
use Themes\BaseTheme\BaseThemeApp;

/**
 * PageController class
 */
class PageController extends BaseThemeApp
{
    /**
     * {@inheritdoc}
     */
    public function indexAction(
        Request $request,
        Node $node = null,
        Translation $translation = null
    ) {

        $this->prepareThemeAssignation($node, $translation);

        $this->getService('stopwatch')->start('twigRender');

        return $this->render('types/page.html.twig', $this->assignation);
    }
}
