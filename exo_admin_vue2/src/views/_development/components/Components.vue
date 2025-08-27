<template>
    <app-screen class="animated fadeIn">
        <action-ui></action-ui>
        <c-card
            header="XMultiselect"
            class="mt-3">
            <div>
                <cmp-x-multiselect></cmp-x-multiselect>
            </div>
        </c-card>
        <cmp-select></cmp-select>
        <c-card
            header="XTree"
            class="mt-3">
            <div style="max-width:350px">
                <cmp-x-tree></cmp-x-tree>
            </div>
        </c-card>
        <c-card
            header="Info"
            class="mt-3">
            <div>
                <p>This is just some text
                    <info-icon>Show simple <b>info</b></info-icon>
                </p>
            </div>
        </c-card>
        <c-card
            header="XFormRoutes"
            class="mt-3">
            <div>
                <cmp-x-form-routes></cmp-x-form-routes>
            </div>
        </c-card>
    </app-screen>
</template>
<script>

import ActionUI from './partials/ActionUI'
import CmpXTree from './partials/CmpXTree'
import CmpXMultiselect from './partials/CmpXMultiselect'
import CmpSelect from './partials/CmpSelect'
import CCard from './CCard'
import CmpXFormRoutes from './partials/CmpXFormRoutes'

export default {
    components: {
        'action-ui': ActionUI,
        CmpXTree, CmpXMultiselect, CmpSelect,
        CCard,
        CmpXFormRoutes,
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss">
</style>
