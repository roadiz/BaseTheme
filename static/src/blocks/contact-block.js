/**
 * Copyright REZO ZERO 2016
 *
 * @file contact-block.js
 * @copyright REZO ZERO 2016
 * @author Maxime Bérard
 */
import $ from "jquery";
import TweenMax from "TweenMax";
import {AbstractBlock} from "abstract-block";

export class ContactBlock extends AbstractBlock {

    init() {
        super.init();

        this.$form = this.$cont.find('form');
        this.$formBtn = this.$form.find('button');
        this.$formMessage = this.$cont.find('.form-message');
    }

    initEvents() {
        super.initEvents();

        if(this.$form.length) this.$form.on('submit', $.proxy(this.formSubmit, this));
    }

    destroyEvents() {
        super.destroyEvents();

        if(this.$form.length) this.$form.off('submit', $.proxy(this.formSubmit, this));
    }

    formSubmit(e) {

        TweenLite.to(this.$formMessage, 0.4, {height:0});

        $.ajax({
            url: e.currentTarget.action,
            data : this.$form.serialize(),
            type: 'post',
            dataType: 'json',
            success: (data) => {
                // console.log('SUCCESS');
                // console.log(data.status);
                if (data.status != 'success') {
                    this.$formMessage[0].className = 'form-message form-message-'+data.status;
                    this.$formMessage[0].innerHTML = '<span>'+data.message+'</span>';

                } else {
                    this.$formMessage[0].className = 'form-message form-message-hidden form-message-'+data.status;
                    this.$formMessage[0].innerHTML = '<span>'+data.message+'</span>';
                }

                var height = this.$formMessage.find('span').actual('outerHeight');
                TweenLite.to(this.$formMessage, 0.6, {height:height, delay:0.2});

            },
            error: (data) => {
                // console.log('ERROR');
                data = data.responseJSON;
                // console.log(data);
                this.$formMessage[0].className = 'form-message form-message-hidden form-message-error form-message-'+data.status;
                this.$formMessage[0].innerHTML = '<span>'+data.errors+'</span>';

                var height = this.$formMessage.find('span').actual('outerHeight');
                TweenLite.to(this.$formMessage, 0.6, {height:height, delay:0.2});
            }
        });

        e.preventDefault();
    }

}

