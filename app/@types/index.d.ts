import Application from '../Application'
import Router from '~/Router'

export * from './vue'

declare global {
    interface Window {
        router: Router
        app: Application
        appInitiated: boolean
        passiveSupported: boolean
        translations: any
        referer?: string
        refererFixed: boolean
        grecaptcha: any
        temp: {
            searchUrl: string
            apiUrl: string
            apiKey: string
            devMode: string
            locale: string
            vatPercent: number
            resourcesUrl: string
            privacyPolicy: string
            hasTrackers: string
            swPath: string
        }
    }
}

export interface TweenOptions {
    duration?: number
}
