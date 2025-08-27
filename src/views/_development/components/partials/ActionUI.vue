<template>
    <fragment>
        <action-toolbar>
            <action-group-separator></action-group-separator>
            <action-group>
                <action-back></action-back>
                <action-button
                    title="save"
                    :icon="$icons.save"
                ></action-button>
                <action-button
                    :disabled="true"
                    title="disabled"
                    icon="fas fa-redo-alt"
                ></action-button>
                <action-button
                    :active="true"
                    title="active"
                    icon="fas fa-redo-alt"
                ></action-button>
            </action-group>
            <action-group-separator></action-group-separator>
            <action-group>
                <action-button title="Text">
                    Text
                </action-button>
                <action-dropdown split icon="fas fa-info"
                                 @action="$awn.info('click')"
                                 title="Add items">
                    <template slot="dropdown">
                        <b-dropdown-item>Add new item
                        </b-dropdown-item>
                        <b-dropdown-item>Select existng item
                        </b-dropdown-item>
                    </template>
                </action-dropdown>
                <action-dropdown icon="fas fa-plus" title="Add items">
                    <template slot="dropdown">
                        <b-dropdown-item>Add new item
                        </b-dropdown-item>
                        <b-dropdown-item>Select existng item
                        </b-dropdown-item>
                    </template>
                </action-dropdown>
                <action-dropdown title="Add items">
                    <template slot="default">Dropdown</template>
                    <template slot="dropdown">
                        <b-dropdown-item>Add new item
                        </b-dropdown-item>
                        <b-dropdown-item>Select existng item
                        </b-dropdown-item>
                    </template>
                </action-dropdown>
            </action-group>
            <action-group-separator></action-group-separator>
            <action-group>
                <action-input v-model="textInput"></action-input>
            </action-group>
        </action-toolbar>
        <div class="m-2"></div>
        <action-toolbar>
            <action-group-separator></action-group-separator>
            <action-group>
                <action-back size="sm"></action-back>
                <action-button
                    size="sm"
                    title="save"
                    :icon="$icons.save"
                ></action-button>
                <action-button
                    size="sm"
                    :disabled="true"
                    title="disabled"
                    icon="fas fa-redo-alt"
                ></action-button>
                <action-button
                    size="sm"
                    :active="true"
                    title="active"
                    icon="fas fa-redo-alt"
                ></action-button>
            </action-group>
            <action-group-separator></action-group-separator>
            <action-group>
                <action-button
                    size="sm"
                    title="Text">
                    Text
                </action-button>
                <action-dropdown
                    size="sm"
                    split
                    icon="fas fa-info"
                    @action="$awn.info('click')"
                    title="Add items">
                    <template slot="dropdown">
                        <b-dropdown-item>Add new item
                        </b-dropdown-item>
                        <b-dropdown-item>Select existng item
                        </b-dropdown-item>
                    </template>
                </action-dropdown>
                <action-dropdown
                    size="sm"
                    icon="fas fa-plus" title="Add items">
                    <template slot="dropdown">
                        <b-dropdown-item>Add new item
                        </b-dropdown-item>
                        <b-dropdown-item>Select existng item
                        </b-dropdown-item>
                    </template>
                </action-dropdown>
                <action-dropdown
                    size="sm"
                    title="Add items">
                    <template slot="default">Dropdown</template>
                    <template slot="dropdown">
                        <b-dropdown-item>Add new item
                        </b-dropdown-item>
                        <b-dropdown-item>Select existng item
                        </b-dropdown-item>
                    </template>
                </action-dropdown>
            </action-group>
            <action-group-separator></action-group-separator>
            <action-group>
                <action-input size="sm" v-model="textInput"></action-input>
            </action-group>
        </action-toolbar>
    </fragment>

</template>

<script>
export default {
    data() {
        return {
            textInput: "Input text"
        }
    }
}
</script>

<style scoped>

</style>
