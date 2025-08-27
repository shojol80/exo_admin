<template>
  <action-table name="Forms"
                ref="table"
                skin="white"
                :hover-row="false"
                :columns="columns"
                :options="options"
                :data="forms"
                @update="updateForm"
                class="container-forms-table">
    <template #afterFilterWrapper>
    </template>
    <template #actions="props">
      <action-group>
        <action-button @action="add()"
                       title="Add form"
                       :icon="$icons.add">
        </action-button>
        <setup-form-filter-action/>
      </action-group>
    </template>
    <template #col-action="props">
      <action-group @click.stop="void 0">
        <action-button @action="remove(props.row)"
                       :icon="$icons.delete">
        </action-button>
      </action-group>
    </template>
    <template #form_name="{row, update}">
      {{ form(row.form_id).form_name }}
    </template>
    <template #form_permalink_id="{row, update}">
      <select-form-permalink
          :form_id="row.form_id"
          placeholder="Select form permalink"
          :show-default-form-permalink="false"
          :value="row.form_permalink_id"
          @input="updateForm({column:'form_permalink_id',newVal:$event,row})">
      </select-form-permalink>
    </template>
    <template #use_as_primary="{row, update}">
      <x-switch
          :value="row.use_as_primary"
          @change="updateForm({column:'use_as_primary',newVal:$event,row})">
      </x-switch>
    </template>
  </action-table>
</template>

<script>

import SelectFormDialog from '@/components/dialogs/SelectFormDialog'
import SetupFormFilterAction from "@/components/Controller/components/settings/SetupFormFilterAction";

export default {
  name: 'FormsTable',
  components: {SetupFormFilterAction},
  props: {},
  data() {
    return {
      columns: [
        'form_id',
        'form_name',
        'form_permalink_id',
        'use_as_primary',
        'col-action',
      ],
      options: {
        usePagination: false,
        filterable: false,
        sortable: [],
        uniqueKey: 'form_id',
        editableColumns: ['form_permalinks'],
        headings: {
          'form_id': 'ID',
          'form_name': 'NAME',
          'form_permalink_id': 'FORM PERMALINK',
          'use_as_primary': 'USE AS PRIMARY',
        },
      },
    }
  },
  computed: {
    forms() {
      return this.$store.getters['controller/settings/getForms']
    },
  },
  methods: {
    add() {
      this.$dialogs.show(SelectFormDialog, {
        forms: true,
        excludeForms: this.forms
      }).then(event => {
        if (event.trigger !== 'ok' || !event.value) return
        let form = event.value
        this.$store.commit('controller/settings/addForm', {
          form_id: form.form_id,
          form_permalink_id: null,
        })
      })
    },
    updateForm({column, newVal, row}) {
      this.$store.commit('controller/settings/updateForm', {column, newVal, row})
    },
    remove(form) {
      this.$store.commit('controller/settings/removeForm', form)
    },
    form(form_id) {
      return this.$store.getters['forms/getForm'](form_id)
    },
  }
}
</script>

<style lang="scss">
.container-forms-table {
  .sitemap-settings {
    display: flex;
    margin-top: 5px;
    align-items: center;

    &__switch {
      flex: none;
      margin-right: 1rem;
    }
  }

  .col-form_id {
    width: 100px;
  }

  .col-form_name {
    width: 10%;
  }

  .col-form_permalink_id {
    vertical-align: top !important;

    .select-form-permalink {
      max-width: 600px;
    }
  }

  .action-table__col-action {
    vertical-align: top !important;
    width: 80px;

    .action-group {
      top: 6px;
      bottom: auto;
    }
  }
}
</style>
