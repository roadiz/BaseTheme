import Vue from 'vue'
import { DateTime } from 'luxon'

Vue.filter('date', (date: string, format: string = 'dd-MM-yyyy') => {
    return DateTime.fromISO(date).setLocale(window.temp.locale).toFormat(format)
})
