/**
 * @param siteName
 * @param bgColor
 * @param creditsList
 * @param thanksList
 * @param textColor
 */
export function logCredits ({ siteName = '', bgColor = '#fff', creditsList = null, thanksList = null, textColor = null } = {}): void {
    let color = '#fff'
    if (typeof textColor !== 'undefined') color = textColor
    console.log('%c   ', 'font-size:3px;')
    console.log('%c' + siteName, 'background:' + bgColor + '; color: ' + color + '; font-size:14px; padding:5px 10px;')
    console.log('%c   ', 'font-size:3px;')

    if (creditsList !== null) {
        let creditsLength = creditsList.length

        if (creditsLength) {
            for (let indexCredit = 0; indexCredit < creditsLength; indexCredit++) {
                console.log(creditsList[indexCredit].name + ' - ' + creditsList[indexCredit].website)
            }
        }
    }

    if (thanksList !== null) {
        let thanksLength = thanksList.length

        if (thanksLength) {
            console.log('-')
            console.log('Thanks to')

            for (let indexThanks = 0; indexThanks < thanksLength; indexThanks++) {
                console.log(thanksList[indexThanks].name + ' (' + thanksList[indexThanks].website + ')')
            }
        }
    }

    console.log('-')
    console.log(' ')
}

export interface ViewPortSize {
    width?: number
    height?: string
}

/**
 * Match CSS media queries and JavaScript window width.
 *
 * @see http://stackoverflow.com/a/11310353
 * @return {Object}
 */
export function getViewportSize (): ViewPortSize {
    let e: HTMLElement | Window = window
    let a: string = 'inner'

    if (!('innerWidth' in window)) {
        a = 'client'
        e = document.documentElement || document.body
    }

    return { width: e[ a + 'Width' ], height: e[ a + 'Height' ] }
}

export function lerp (start: number, end: number, amt: number): number {
    return (1 - amt) * start + amt * end
}

export function range (num: number, inMin: number, inMax: number, outMin: number, outMax: number, limit: boolean): number {
    const newVal = (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
    if (!limit) {
        return newVal
    }
    return Math.min(Math.max(newVal, outMin), outMax)
}

export function getPort (p?: string) {
    const port = typeof p !== 'undefined' ? p : (window as any).location.port
    const protocol = (window as any).location.protocol

    if (port !== '') {
        return parseInt(port, 10)
    }

    if (protocol === 'http:') {
        return 80
    }

    if (protocol === 'https:') {
        return 443
    }
}
