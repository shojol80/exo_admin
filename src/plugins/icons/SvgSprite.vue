<template>
    <svg width="0" height="0" style="display: none;" v-html="svgSprite"/>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    name: 'SvgSprite',
    setup() {
        const svgSprite = ref('')

        onMounted(async () => {
            // Use Vite's import.meta.glob to load all SVG files
            const svgModules = import.meta.glob('@/plugins/icons/svg/**/*.svg', {
                query: '?raw',
                import: 'default'
            })

            const symbols = []

            for (const path in svgModules) {
                try {
                    // Load the SVG content
                    const content = await svgModules[path]()

                    // Extract icon id from path
                    const id = path.replace(/^.*\/([^/]+)\.svg$/, '$1')

                    // Convert SVG to symbol
                    if (content && typeof content === 'string') {
                        // Remove title tags and other unwanted attributes
                        let processedContent = content
                            .replace(/<title[^>]*>.*?<\/title>/gi, '') // remove title tags
                            .replace(/\s+fill="[^"]*"/gi, '') // remove fill attributes
                            .replace(/\s+xmlns="[^"]*"/gi, '') // remove xmlns
                            .replace(/\s+width="[^"]*"/gi, '') // remove width
                            .replace(/\s+height="[^"]*"/gi, '') // remove height

                        // Replace svg tags with symbol tags and add id
                        const symbol = processedContent
                            .replace('<svg', `<symbol id="${id}"`)
                            .replace('</svg>', '</symbol>')

                        symbols.push(symbol)
                    }
                } catch (error) {
                    console.warn(`Failed to load SVG: ${path}`, error)
                }
            }

            svgSprite.value = symbols.join('\n')
        })

        return {
            svgSprite
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

</style>
