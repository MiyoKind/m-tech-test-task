<template>
  <!-- Страница создания продукта -->
  <div>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    
    <v-data-table :items="products" :headers="productHeaders"></v-data-table>
    
    <v-dialog v-model="productModal" persistent max-width="600">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" @click="openProductModal('managerFields')">
          +
        </v-btn>
      </template>
      
      <v-card>
        <v-card-title>Создать продукт</v-card-title>
        <v-card-text>
          <dynamic-form
            v-if="currentFormConfig"
            :fields="currentFormConfig.fields"
            :onSubmit="handleManagerSubmit"
            :onCancel="handleCancel"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DynamicForm from "@/components/DynamicForm.vue";

export default {
  components: {
    DynamicForm,
  },
  data() {
    return {
      // Breadcrumbs
      breadcrumbs: [
        { text: "Главная", disabled: false },
        { text: "Продукты", disabled: true },
      ],
      // Массив данных о продуктах
      products: [],
      // Заголовки таблиц с данными о продуктах
      productHeaders: [
        { title: "Manager", value: "manager" },
        { title: "Product Name", value: "productName" },
        { title: "Jira Link", value: "jiraLink" },
        { title: "Domain", value: "domain" },
      ],
      // Статус модального окна
      productModal: false,
      // Конфигурация формы создания продукта
      managerFields: [
        { name: "manager", type: "select", label: "Менеджер", options: ["Менеджер A", "Менеджер B"] },
        { name: "productName", type: "text", label: "Название продукта" },
        { name: "referenceInJira", type: "text", label: "Ссылка в Jira" },
        {
          name: "domain",
          type: "select",
          label: "Домен",
          options: ["Бэк-офис", "Тех-платформа", "Офис больших данных", "Цифровой опыт поставщика"],
        },
      ],
      // Текущая конфигурация
      currentFormConfig: null,
    };
  },
  methods: {
    // Метод открытия модального окна
    openProductModal(fields) {
      this.currentFormConfig = { fields: this[fields] };
      this.productModal = true;
    },
    
    // Метод обработки события отправки формы
    handleManagerSubmit(data) {
      // Форматирования данных для отображения в таблице
      const productData = {
        manager: data.manager,
        productName: data.productName,
        jiraLink: data.referenceInJira,
        domain: data.domain,
      };
      
      // Добавление данных о продуктах в таблицу
      this.products.push(productData);
      
      // Закрытие и сброс формы
      this.productModal = false;
      this.resetForm();
    },
    
    // Метод обработки события отмены отправки формы
    handleCancel() {
      // Закрытие и сброс данных
      this.productModal = false;
      this.resetForm();
    },
    
    // Метод сброса данных
    resetForm() {
      this.currentFormConfig = null;
    },
  },
};
</script>
