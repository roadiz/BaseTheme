<template>
    <div class="markdown" v-html="markdown" />
</template>
<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator'
    import showdown from 'showdown'

    const converter = new showdown.Converter()

    @Component
    export default class Markdown extends Vue {
        @Prop(String) text!: string
        @Prop(Boolean) strip!: boolean

        get markdown (): string {
            return converter.makeHtml(this.text)
        }
    }
</script>
<style>
    .markdown .katex {
        display: block;
        text-align: center;
    }

    .markdown .inline-katex .katex {
        display: inline;
        text-align: initial;
    }

    .markdown .footnotes {
        margin-bottom: 30px;
    }
</style>
