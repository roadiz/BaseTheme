<?php
declare(strict_types=1);

namespace Themes\BaseTheme\Controllers\Blocks;

use GeneratedNodeSources\NSContactBlock;
use RZ\Roadiz\Core\Entities\NodesSources;
use RZ\Roadiz\Core\Exceptions\ForceResponseException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\BaseThemeApp;

/**
 * @package Themes\BaseTheme\Controllers\Blocks
 */
class ContactBlockController extends BaseThemeApp
{
    /**
     * @param Request      $request
     * @param NodesSources $source
     * @param array        $assignation
     *
     * @return Response
     * @throws ForceResponseException
     * @throws \Twig\Error\RuntimeError
     */
    public function blockAction(Request $request, NodesSources $source, $assignation)
    {
        $this->prepareNodeSourceAssignation($source, $source->getTranslation());
        $this->assignation = array_merge($this->assignation, $assignation);

        $contactFormManager = $this->createContactFormManager();
        // Do not forget to disable CSRF if you are using Varnish or just dropping cookies
        $contactFormManager->disableCsrfProtection();
        if (null !== $source->getNode()) {
            // Scroll to contactForm block after submit succeeded or failed
            $contactFormManager->setOptions([
                'action' => '#block-' . $source->getNode()->getNodeName(),
            ]);
        }

        /*
         * Do not call form builder methods BEFORE defining options.
         */
        $contactFormManager
            ->withDefaultFields()
            ->withUserConsent()
            /*
             * DO NOT FORGET to set page TTL to 0,
             * reverse-proxy cache will break Google Recaptcha
             *
             * Works with Recaptcha v2 and v3: just adapt your frontend code.
             */
            ->withGoogleRecaptcha()
        ;

        /*
         * Define custom receiver.
         * If node-type declare one
         */
        if ($source instanceof NSContactBlock && !empty($source->getContactAddress())) {
            $contactFormManager->setReceiver($source->getContactAddress());
        }

        if (null !== $response = $contactFormManager->handle()) {
            /*
             * Force response to bubble through Twig rendering process.
             */
            throw new ForceResponseException($response);
        }

        $form = $contactFormManager->getForm();

        // Assign your form view to display it in Twig.
        $this->assignation['contactForm'] = $form->createView();

        return $this->render('form_blocks/contact_block.html.twig', $this->assignation);
    }
}
