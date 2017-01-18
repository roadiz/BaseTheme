/**
 * Copyright REZO ZERO 2016
 *
 * @file contact-block.js
 * @copyright REZO ZERO 2016
 * @author Maxime Bérard
 */
import $            from "jquery";
import TweenLite    from "TweenLite";
import CSSPlugin    from "gsap/src/uncompressed/plugins/CSSPlugin";
import log          from "loglevel/dist/loglevel";
import DefaultBlock from "./default-block";

export default class ContactBlock extends DefaultBlock {

    init() {
        super.init();

        this.$form = this.$cont.find('form');
        this.$formBtn = this.$form.find('button');
        this.$formMessage = this.$cont.find('.form-message');
    }

    initEvents() {
        super.initEvents();

        /*
         * Un-comment to handle contact form with AJAX
         */
        //if(this.$form.length) this.$form.on('submit', $.proxy(this.formSubmit, this));
    }

    destroyEvents() {
        super.destroyEvents();

        /*
         * Un-comment to handle contact form with AJAX
         */
        //if(this.$form.length) this.$form.off('submit', $.proxy(this.formSubmit, this));
    }

    formSubmit(e) {
        TweenLite.to(this.$formMessage, 0.4, {height:0});

        $.ajax({
            url: e.currentTarget.action,
            data : this.$form.serialize(),
            type: 'post',
            dataType: 'json',
            success: (data) => {
                log.debug('SUCCESS');
                log.debug(data.status);
                if (data.status != 'success') {
                    this.$formMessage[0].className = 'form-message form-message-'+data.status;
                    this.$formMessage[0].innerHTML = '<span>'+data.message+'</span>';

                } else {
                    this.$formMessage[0].className = 'form-message form-message-hidden form-message-'+data.status;
                    this.$formMessage[0].innerHTML = '<span>'+data.message+'</span>';
                }

                let height = this.$formMessage.find('span').actual('outerHeight');
                TweenLite.to(this.$formMessage, 0.6, {height:height, delay:0.2});

            },
            error: (data) => {
                log.debug('ERROR');
                data = data.responseJSON;
                log.debug(data);
                this.$formMessage[0].className = 'form-message form-message-hidden form-message-error form-message-'+data.status;
                this.$formMessage[0].innerHTML = '<span>'+data.errors+'</span>';

                let height = this.$formMessage.find('span').actual('outerHeight');
                TweenLite.to(this.$formMessage, 0.6, {height:height, delay:0.2});
            }
        });

        e.preventDefault();
    }
}

