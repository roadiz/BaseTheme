import '../../scss/blocks/text-block.scss'
import DefaultBlock from './DefaultBlock'

export default class TextBlock extends DefaultBlock {
    init () {
        super.init()

        this.$title = this.$cont.find('h3')

        window.setTimeout(() => (
            this.$title.append(`test`)
        ), 3000)
    }

    initEvents () {
        super.initEvents()
    }

    destroy () {
        super.destroy()
    }

    destroyEvents () {
        super.destroyEvents()
    }

    onResize () {
        super.onResize()
    }

    onLoad () {
        super.onLoad()
    }

    onPageReady () {
        this.$title.append(`<div><span>Lazyloaded</span></div>`)
    }
}
