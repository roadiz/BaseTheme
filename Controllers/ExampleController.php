<?php
/*
 * Copyright REZO ZERO 2014
 *
 * Description
 *
 * @file ExampleController.php
 * @copyright REZO ZERO 2014
 * @author Ambroise Maupate
 */

namespace Themes\BaseTheme\Controllers;

use Themes\BaseTheme\BaseThemeApp;
use RZ\Roadiz\Core\Entities\Node;
use RZ\Roadiz\Core\Entities\Translation;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * ExampleController class
 */
class ExampleController extends BaseThemeApp
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
        return new Response(
            $this->getTwig()->render('types/example.html.twig', $this->assignation),
            Response::HTTP_OK,
            array('content-type' => 'text/html')
        );
    }
}
