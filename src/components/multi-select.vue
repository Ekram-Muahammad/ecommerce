<template>
    <multiselect class="form-control" style="width:250px;" :model-value="selectedItem"
        @update:modelValue="$emit('update:selectedItem', $event)" :close-on-select="true" :searchable="true"
        :create-option="true" :options="options" />
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<script>
  import Multiselect from 'vue-multiselect'

export default {
    components: {
      Multiselect
    },
    props: {
        options: {
            type: Array,
            required: true
        },
        selectedItem: {
            type: [String, Object, null],
            default: null
        }
    },
    emits: ['update:selectedItem']
};
</script>