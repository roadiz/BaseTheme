<?php
/**
 * Copyright (c) 2017. Rezo Zero
 *
 * BaseTheme
 *
 * @file SitemapController.php
 * @author Ambroise Maupate <ambroise@rezo-zero.com>
 */
namespace Themes\BaseTheme\Controllers\Blocks;

//use GeneratedNodeSources\NSContactBlock;
use RZ\Roadiz\Core\Entities\NodesSources;
use RZ\Roadiz\Core\Exceptions\ForceResponseException;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Themes\BaseTheme\BaseThemeApp;

/**
 * Class ContactBlockController
 * @package Themes\BaseTheme\Controllers\Blocks
 */
class ContactBlockController extends BaseThemeApp
{
    function blockAction(Request $request, NodesSources $source, $assignation)
    {
        $this->prepareNodeSourceAssignation($source, $source->getTranslation());
        $this->assignation = array_merge($this->assignation, $assignation);

        $this->assignation['session']['messages'] = $this->get('session')->getFlashBag()->all();

        /** @var FormInterface $form */
        $contactFormManager = $this->createContactFormManager()
                     ->withDefaultFields();

        /*
         * Define custom receiver.
         * If node-type declare one
         */
        /*if ($source instanceof NSContactBlock && $source->getContactAddress() !== '') {
            $contactFormManager->setReceiver($source->getContactAddress());
        }*/

        if (null !== $response = $contactFormManager->handle()) {
            /*
             * Force response to bubble through Twig rendering process.
             */
            throw new ForceResponseException($response);
        }

        $form = $contactFormManager->getForm();

        // Assignate your form view to display it in Twig.
        $this->assignation['contactForm'] = $form->createView();

        return $this->render('form-blocks/contactblock.html.twig', $this->assignation);
    }
}
