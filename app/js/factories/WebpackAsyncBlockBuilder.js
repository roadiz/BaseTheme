import { AbstractBlockBuilder } from 'starting-blocks'

export default class WebpackAsyncBlockBuilder extends AbstractBlockBuilder {
    // Dynamic import
    async getBlockInstance (nodeTypeName) {
        try {
            const Block = await this.getModule(nodeTypeName)

            if (!this.hasService(nodeTypeName)) {
                this.container.$register({
                    $name: nodeTypeName,
                    $type: 'instanceFactory',
                    $value: c => {
                        return new Block(c)
                    }
                })
            }

            return this.getService(nodeTypeName).instance()
        } catch (e) {
            return null
        }
    }

    async getModule (nodeTypeName) {
        return import(`../blocks/${nodeTypeName}` /* webpackChunkName: "block-" */)
            .then(block => {
                return block.default
            })
    }
}
