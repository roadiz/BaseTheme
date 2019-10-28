import { Component, Host, h } from '@stencil/core'

@Component({
    tag: 'rz-nav'
})
export class RzNav {
    render () {
        return (
            <Host class="rz-nav">
                <slot />
            </Host>
        )
    }
}
