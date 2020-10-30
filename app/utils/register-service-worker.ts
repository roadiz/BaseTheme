const registerServiceWorker = ((): void => {
    if (window.temp.swPath) {
        if ('serviceWorker' in navigator) {
            console.debug('Navigator support ServiceWorker')
            window.addEventListener('load', function (): void {
                navigator.serviceWorker.register(window.temp.swPath).then(function (registration) {
                    console.debug('ServiceWorker registration successful with scope: ', registration.scope)
                }, function (err) {
                    console.debug('ServiceWorker registration failed: ', err)
                })
            })
        } else if (!window.isSecureContext) {
            console.debug(
                'Navigator cannot init ServiceWorker, you should have a HTTPS secure context.',
                'Or force it unsafe chrome://flags/#unsafely-treat-insecure-origin-as-secure'
            )
        }
    }
})()

export default registerServiceWorker
