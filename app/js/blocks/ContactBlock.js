/**
 * Copyright © 2017, Rezo Zero
 *
 * @file ContactBlock.js
 * @author Maxime Bérard
 */

import { TweenLite } from 'gsap'
import DefaultBlock from './DefaultBlock'

export default class ContactBlock extends DefaultBlock {
    constructor (container) {
        super(container, 'ContactBlock')

        this.form = null
        this.formMessage = null

        this.formSubmit = this.formSubmit.bind(this)
    }

    init () {
        super.init()
        this.form = this.rootElement.querySelector('form')
        this.formMessage = this.rootElement.querySelector('.form-message')
    }

    initEvents () {
        super.initEvents()

        if (this.form) {
            this.form.addEventListener('submit', this.formSubmit)
        }
    }

    destroyEvents () {
        super.destroyEvents()

        if (this.form) {
            this.form.removeEventListener('submit', this.formSubmit)
        }
    }

    formSubmit (e) {
        e.preventDefault()

        if (this.timeout) {
            window.clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(async () => {
            TweenLite.to(this.formMessage, 0.6, { height: 0, paddingTop: 0, paddingBottom: 0 })
            try {
                const formData = new window.FormData(this.form)
                const fetchRequest = new window.Request(
                    this.form.action
                )
                const response = await window.fetch(fetchRequest, {
                    method: 'POST',
                    headers: new window.Headers({
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json',
                        'X-Allow-Partial': 'yes',
                        'X-Starting-Blocks': 'yes'
                    }),
                    mode: 'cors',
                    cache: 'default',
                    body: formData,
                    credentials: 'same-origin'
                })
                const data = await response.json()
                this.formMessage.className = 'form-message alert alert-' + data.status
                this.formMessage.innerHTML = '<span>' + data.message + '</span>'
                TweenLite.set(this.formMessage, { height: 48, paddingTop: 15, paddingBottom: 15 })
                TweenLite.from(this.formMessage, 0.6, { height: 0, paddingTop: 0, paddingBottom: 0 })
            } catch (err) {
                this.formMessage.className = 'form-message alert alert-danger'
                this.formMessage.innerHTML = '<span>' + err + '</span>'
                TweenLite.set(this.formMessage, { height: 48, paddingTop: 15, paddingBottom: 15 })
                TweenLite.from(this.formMessage, 0.6, { height: 0, paddingTop: 0, paddingBottom: 0 })
            }
        }, 400)

        return false
    }
}
