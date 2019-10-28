import Highway from '@dogstudio/highway'

const linkBlackList: string[] = ['footnote-backref', 'footnote-ref']

export default class Router extends Highway.Core {
    links: HTMLElement[]

    constructor (options) {
        super(options)
    }

    attach (links) {
        const filterLinks: HTMLElement[] = []

        // Remove FUCKING footnotes
        if (linkBlackList) {
            for (const link of links) {
                const elClass: string[] = link.className.split(' ')
                const intersectArray: string[] = elClass.filter(value => linkBlackList.includes(value))

                if (intersectArray.length === 0) {
                    filterLinks.push(link)
                }
            }
        }

        this.links = filterLinks
        super.attach(filterLinks)
    }

    async beforeFetch () {
        super.beforeFetch()
    }

    async afterFetch () {
        (window as any).lazySizesConfig.loadMode = 0
        super.afterFetch()
    }
}
