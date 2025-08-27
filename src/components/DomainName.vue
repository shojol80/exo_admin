<template>
    <div>
        <a :class="{ 'text-muted': domain.is_readonly==1 }" :href="'https://'+domain.domain_name" target="_blank"
           class="mr-2">{{domain.domain_name}}</a>
        <span v-if="domain.domain_ismain===1" class="badge badge-danger mr-2">main</span>
        <span v-if="domain.domain_isdefault===1" class="badge badge-secondary">default</span>
    </div>
</template>

<script>
export default {
    name: "DomainName",
    props: {
        domain: Object
    }
}
</script>
