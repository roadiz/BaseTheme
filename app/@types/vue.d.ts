import Vue from 'vue'
import { ComponentOptions } from 'vue/types/options'

interface Translations {
    [key: string]: string
}

declare module 'vue/types/vue' {
    interface Vue extends ComponentOptions<Vue> {
        $resourcesUrl: string
        $translations: Translations
    }
}
