<template functional>
    <b-dropdown-divider
        v-bind="props"
        v-on="listeners">
        <slot></slot>
    </b-dropdown-divider>
</template>
