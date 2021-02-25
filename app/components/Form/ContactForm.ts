import gsap from 'gsap'
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class ContactForm extends Vue {
    protected form!: HTMLFormElement | null
    protected submit!: HTMLButtonElement | null
    protected intersectionObserver!: IntersectionObserver
    protected recaptchaSiteKey?: string
    private allowed: boolean = true
    private message: string = ''

    @Watch('allowed')
    allowedUpdated (allowed: boolean): void {
        if (this.submit) {
            if (allowed) {
                this.submit.classList.remove('disabled')
            } else {
                this.submit.classList.add('disabled')
            }
        }
    }

    mounted (): void {
        this.form = this.$el.querySelector('form')
        this.submit = this.$el.querySelector('button[type=submit]')

        this.intersectionObserver = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                let ready = false

                entries.forEach(
                    (entry: IntersectionObserverEntry): void => {
                        if (entry.isIntersecting) {
                            ready = true
                        }
                    }
                )

                if (ready) {
                    this.setupRecaptcha()
                    this.attachEventsHandlers()
                }
            },
            { rootMargin: '50px' }
        )

        window.requestAnimationFrame(
            () => {
                this.intersectionObserver.observe(this.$el)
            }
        )
    }

    setupRecaptcha (): void {
        // Google Recaptcha v2
        // const recaptcha: HTMLElement | null = this.$el.querySelector('.g-recaptcha')
        // Google Recaptcha v3
        const recaptcha: HTMLElement | null = this.$el.querySelector('.g-recaptcha-v3')

        if (recaptcha) {
            this.recaptchaSiteKey = recaptcha.dataset.sitekey

            if (window.grecaptcha) {
                // Google Recaptcha v2
                // window.grecaptcha.render(recaptcha)
            } else {
                /*
                 * Google Recaptcha v3
                 */
                const grecaptchaScript: HTMLScriptElement = document.createElement('script')
                grecaptchaScript.src = 'https://www.google.com/recaptcha/api.js?render=' + this.recaptchaSiteKey
                grecaptchaScript.async = true
                grecaptchaScript.defer = true

                document.head.appendChild(grecaptchaScript)
            }
        }
    }

    attachEventsHandlers (): void {
        if (this.form instanceof HTMLFormElement) {
            const form = this.form
            const rgpdConsent: HTMLInputElement | null = document.querySelector('.form-consent input[type=checkbox]')

            form.addEventListener(
                'submit',
                (event: Event): void => {
                    event.preventDefault()
                    // Manual Recaptcha v3 challenge triggering
                    if (window.grecaptcha &&
                        this.recaptchaSiteKey !== null &&
                        (rgpdConsent === null || rgpdConsent.checked)
                    ) {
                        window.grecaptcha.ready(() => {
                            console.debug('Challenge user with Recaptcha v3')
                            window.grecaptcha.execute(this.recaptchaSiteKey, { action: 'submit' }).then((token: string) => {
                                this.submitForm(token)
                            })
                        })
                    } else if ((rgpdConsent === null || rgpdConsent.checked)) {
                        console.debug('No user challenge')
                        this.submitForm()
                    } else if (form.querySelector('.has-danger')) {
                        gsap.to(window, {
                            duration: 1,
                            ease: 'power4.out',
                            scrollTo: {
                                y: form.querySelector('.has-danger'),
                                offsetY: 140,
                                autoKill: false
                            }
                        })
                    }
                }
            )
        }
    }

    getHeaders (): Headers {
        const headers = new window.Headers()

        headers.set('Access-Control-Allow-Credentials', 'true')
        headers.set('Access-Control-Allow-Origin', '*')
        headers.set('Accept', 'application/json')
        headers.set('X-Requested-With', 'XMLHttpRequest')

        return headers
    }

    submitForm (token: string|null = null): void {
        const form = this.form

        if (form) {
            const uri = form.action
            const data = new FormData(form)

            if (token !== null) {
                // With Recaptcha v3, we need to append POST data ourselves
                data.append('g-recaptcha-response', token)
                // Checks that Recaptcha is working
                // data.append('g-recaptcha-response', 'test-fail')
            }

            this.allowed = false
            this.displayMessage('')

            window.fetch(
                uri,
                {
                    method: form.method.toUpperCase() || 'POST',
                    headers: this.getHeaders(),
                    cache: 'default',
                    redirect: 'follow',
                    referrer: window.location.origin + window.location.pathname,
                    body: data
                }
            ).then(
                async (response: Response): Promise<any> => {
                    const data = await response.json()
                    this.allowed = true
                    this.displayMessage(data.message)

                    // Only for Recaptcha v2
                    // if (window.grecaptcha) {
                    //     window.grecaptcha.reset()
                    // }

                    if (data.status === 'success') {
                        form.reset()
                    }
                },
                (error: Error): void => {
                    console.error('error', error.message)
                    this.allowed = true
                }
            )
        }
    }

    displayMessage (message: string): void {
        this.message = message
    }
}
