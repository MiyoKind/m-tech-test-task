<template>
  <v-form ref="submit-form" v-on:submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col
          v-for="field in fields"
          :key="field.name"
          :cols="field.cols || 12"
        >
          <v-text-field
            v-if="field.type === 'text'"
            v-model="formData[field.name]"
            :label="field.label"
            :required="field.required"
            :rules="field.rules"
          >
          </v-text-field>
          <v-select
            v-if="field.type === 'select'"
            v-model="formData[field.name]"
            :items="field.options"
            :label="field.label"
            :required="field.required"
            :rules="field.rules"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-space-between">
          <v-btn @click="cancelForm">Отменить</v-btn>
          <v-btn type="submit" color="primary">Отправить</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    submitForm() {
      this.onSubmit(this.formData);
    },
    cancelForm() {
      this.onCancel();
    },
  },
};
</script>
