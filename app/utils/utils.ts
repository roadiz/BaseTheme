export interface ViewPortSize {
    width: number
    height: number
}

export function getViewportSize (): ViewPortSize {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
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

export function getPort (p?: string): number {
    const port = typeof p !== 'undefined' ? p : window.location.port
    const protocol = window.location.protocol

    if (port !== '') {
        return parseInt(port, 10)
    }

    if (protocol === 'http:') {
        return 80
    }

    // If https
    return 443
}
