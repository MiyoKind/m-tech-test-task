<template>
  <!-- Настраиваемый компонент формы для заполнения -->
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
    // Массив конфигураций полей формы
    fields: {
      type: Array,
      required: true,
    },
    // Колбэк-функция для отправки формы
    onSubmit: {
      type: Function,
      required: true,
    },
    // Колбэк-функция для отмены отправки формы
    onCancel: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      // Данные формы для хранения заполненных значений
      formData: {},
    };
  },
  methods: {
    // Метод, вызываемый при отправке формы
    submitForm() {
      // Вызов метода onSubmit() из родительского компонента с данными формы
      this.onSubmit(this.formData);
    },
    // Метод, вызываемый при отмене отправки формы
    cancelForm() {
      // Вызов метода onCancel() из родительского компонента
      this.onCancel();
    },
  },
};
</script>
