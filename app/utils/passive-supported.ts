const isPassiveSupported = ((): void => {
    // Test is passive is supported
    window.passiveSupported = false

    try {
        const options: any = Object.defineProperty({}, 'passive', {
            get: function (): void {
                window.passiveSupported = true
            }
        })

        window.addEventListener('test', options, options)
        window.removeEventListener('test', options, options)
    } catch (err) {
        window.passiveSupported = false
    }
})()

export default isPassiveSupported
