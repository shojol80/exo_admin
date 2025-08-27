<template>
    <Teleport to="body">
        <div
            v-if="isVisible"
            ref="menu"
            class="x-context-menu dropdown-menu"
            :style="menuStyle"
            @click="handleClick"
            @contextmenu.prevent>
            <slot />
        </div>
    </Teleport>
</template>
<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
    name: 'XContextMenu',
    setup(props, { emit }) {
        const menu = ref(null)
        const isVisible = ref(false)
        const menuStyle = reactive({
            position: 'fixed',
            top: '0px',
            left: '0px',
            zIndex: 1500
        })

        const open = (event, data = null) => {
            event.preventDefault()
            event.stopPropagation()

            // Position the menu
            menuStyle.top = `${event.clientY}px`
            menuStyle.left = `${event.clientX}px`

            isVisible.value = true

            // Emit open event with data
            emit('open', { event, data })

            // Adjust position if menu goes off screen
            setTimeout(() => {
                if (menu.value) {
                    const rect = menu.value.getBoundingClientRect()
                    const windowWidth = window.innerWidth
                    const windowHeight = window.innerHeight

                    if (rect.right > windowWidth) {
                        menuStyle.left = `${windowWidth - rect.width - 5}px`
                    }
                    if (rect.bottom > windowHeight) {
                        menuStyle.top = `${windowHeight - rect.height - 5}px`
                    }
                }
            }, 0)
        }

        const close = () => {
            isVisible.value = false
            emit('close')
        }

        const handleClick = (event) => {
            // Allow clicks on menu items to bubble up
            emit('click', event)
        }

        // Close menu when clicking outside
        onClickOutside(menu, close)

        // Close menu on escape key
        const handleKeydown = (event) => {
            if (event.key === 'Escape' && isVisible.value) {
                close()
            }
        }

        onMounted(() => {
            document.addEventListener('keydown', handleKeydown)
        })

        onUnmounted(() => {
            document.removeEventListener('keydown', handleKeydown)
        })

        return {
            menu,
            isVisible,
            menuStyle,
            open,
            close,
            handleClick
        }
    }
}
</script>
<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.x-context-menu {
    display: block;
    margin: 0;
    min-width: 10rem;
    z-index: 1500;
    position: fixed;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
    padding: 0.5rem 0;
}
</style>
