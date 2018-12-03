/**
 * Copyright © 2017, Rezo Zero
 *
 * @file ContactBlock.js
 * @author Maxime Bérard
 */

// import { TweenLite } from 'gsap'
import DefaultBlock from './DefaultBlock'

export default class ContactBlock extends DefaultBlock {
    constructor (container) {
        super(container, 'ContactBlock')

        this.form = this.rootElement.querySelector('form')
        this.formMessage = this.rootElement.querySelector('.form-message')
        this.bindOnSubmit = this.formSubmit.bind(this)
    }

    initEvents () {
        super.initEvents()

        if (this.form) {
            this.form.addEventListener('submit', this.bindOnSubmit)
        }
    }

    destroyEvents () {
        super.destroyEvents()

        if (this.form) {
            this.form.removeEventListener('submit', this.bindOnSubmit)
        }
    }

    formSubmit (e) {
        e.preventDefault()

        if (this.timeout) {
            window.clearTimeout(this.timeout)
        }

        this.timeout = window.setTimeout(() => {
            // TweenLite.to(this.formMessage, 0.6, {
            //     height: 0,
            //     paddingTop: 0,
            //     paddingBottom: 0
            // })

            // const data = new window.FormData(this.form)

            // $.ajax({
            //     url: e.currentTarget.action,
            //     data: data,
            //     processData: false,
            //     cache: false,
            //     contentType: false,
            //     type: 'post',
            //     dataType: 'json',
            //     success: (data) => {
            //         log.debug(data.status)
            //         if (data.status !== 'success') {
            //             this.$formMessage[0].className = 'form-message alert alert-' + data.status
            //             this.$formMessage[0].innerHTML = '<span>' + data.message + '</span>'
            //         } else {
            //             this.$formMessage[0].className = 'form-message form-message-hidden alert alert-' + data.status
            //             this.$formMessage[0].innerHTML = '<span>' + data.message + '</span>'
            //         }
            //
            //         TweenLite.set(this.$formMessage, { height: 48, paddingTop: 15, paddingBottom: 15 })
            //         TweenLite.from(this.$formMessage, 0.6, { height: 0, paddingTop: 0, paddingBottom: 0 })
            //     },
            //     error: (data) => {
            //         data = data.responseJSON
            //         log.debug(data)
            //         this.$formMessage[0].className = 'form-message form-message-hidden alert-danger alert-' + data.status
            //         this.$formMessage[0].innerHTML = '<span>' + data.errors + '</span>'
            //
            //         TweenLite.set(this.$formMessage, { height: 48, paddingTop: 15, paddingBottom: 15 })
            //         TweenLite.from(this.$formMessage, 0.6, { height: 0, paddingTop: 0, paddingBottom: 0 })
            //     }
            // })
        }, 400)

        return false
    }
}
