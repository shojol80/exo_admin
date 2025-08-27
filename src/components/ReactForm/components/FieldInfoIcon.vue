<template>
    <info-icon class="field-info-icon" v-if="isDeveloper">
        <table>
            <tr>
                <th>fqt_name</th>
                <td>{{ fq.fqt_name }}</td>
            </tr>
            <tr>
                <th>fq_id</th>
                <td>{{ fq.fq_id }}</td>
            </tr>
            <tr>
                <th>fq_name</th>
                <td>{{ fq.fq_name }}</td>
            </tr>
            <tr>
                <th>fq_info</th>
                <td>{{ fq.fq_info }}</td>
            </tr>
        </table>
    </info-icon>
</template>

<script>
import authorization from '@/mixins/authorization'

export default {
    name: "FieldInfoIcon",
    mixins:[authorization],
    props: {
        fq: {type: Object}
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/vue-component";

.field-info-icon {
    color: #b5b5b5;
    pointer-events: all;
}
</style>
