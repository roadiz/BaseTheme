import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = Vue
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

    interface Window {
        // Google Analytics
        ga: Function
        // Matomo
        _paq: Array<any>
    }
}
