/**
 * Copyright © 2017, Rezo Zero
 *
 * @file contact-block.js
 * @author Maxime Bérard
 */
import $ from "jquery";
import TweenLite from "TweenLite";
import log from "loglevel";
import DefaultBlock from "./default-block";

export default class ContactBlock extends DefaultBlock {

    init() {
        super.init();

        this.$form = this.$cont.find('form');
        this.$formBtn = this.$form.find('button');
        this.$formMessage = this.$cont.find('.form-message');
        this.bindOnSubmit = this.formSubmit.bind(this);
    }

    initEvents() {
        super.initEvents();

        if(this.$form.length) this.$form.on('submit', this.bindOnSubmit);
    }

    destroyEvents() {
        super.destroyEvents();

        if(this.$form.length) this.$form.off('submit', this.bindOnSubmit);
    }

    formSubmit(e) {
        e.preventDefault();

        if (this.timeout) {
            clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => {
            TweenLite.to(this.$formMessage, 0.6, {height:0, paddingTop:0, paddingBottom: 0});
            const data = new FormData(this.$form[0]);

            $.ajax({
                url: e.currentTarget.action,
                data : data,
                processData : false,
                cache : false,
                contentType : false,
                type: 'post',
                dataType: 'json',
                success: (data) => {
                    log.debug(data.status);
                    if (data.status != 'success') {
                        this.$formMessage[0].className = 'form-message alert alert-'+data.status;
                        this.$formMessage[0].innerHTML = '<span>'+data.message+'</span>';
                    } else {
                        this.$formMessage[0].className = 'form-message form-message-hidden alert alert-'+data.status;
                        this.$formMessage[0].innerHTML = '<span>'+data.message+'</span>';
                    }

                    TweenLite.set(this.$formMessage, {height:48, paddingTop:15, paddingBottom: 15});
                    TweenLite.from(this.$formMessage, 0.6, {height:0, paddingTop:0, paddingBottom: 0});
                },
                error: (data) => {
                    data = data.responseJSON;
                    log.debug(data);
                    this.$formMessage[0].className = 'form-message form-message-hidden alert-danger alert-'+data.status;
                    this.$formMessage[0].innerHTML = '<span>'+data.errors+'</span>';

                    TweenLite.set(this.$formMessage, {height:48, paddingTop:15, paddingBottom: 15});
                    TweenLite.from(this.$formMessage, 0.6, {height:0, paddingTop:0, paddingBottom: 0});
                }
            });
        }, 400);

        return false;
    }
}
