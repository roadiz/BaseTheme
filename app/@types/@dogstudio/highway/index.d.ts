declare module '@dogstudio/highway' {
    export interface ListOfTransitions {
        [key: string]: Transition
    }

    export interface TransitionOptions {
        default?: Transition
        contextual?: ListOfTransitions
    }

    export interface CoreOptions {
        transitions?: TransitionOptions
        renderers?: any
    }

    export class Transition {
        constructor(wrap: string, name: string)
    }

    export class Core {
        public links: NodeList

        constructor (opts?: CoreOptions)

        on (key: string, methods: Function): void
        attach (links: Array<Element>|NodeList): void
        detach (links: Array<Element>|NodeList): void
        redirect (href: string, transition: Transition): void
    }
}
