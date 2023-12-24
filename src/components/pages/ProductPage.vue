<template>
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
        breadcrumbs: [
          { text: "Главная", disabled: false },
          { text: "Продукты", disabled: true },
        ],
        products: [],
        productHeaders: [
          { title: "Manager", value: "manager" },
          { title: "Product Name", value: "productName" },
          { title: "Jira Link", value: "jiraLink" },
          { title: "Domain", value: "domain" },
        ],
        productModal: false,
        currentFormConfig: null,
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
      };
    },
    methods: {
      openProductModal(fields) {
        this.currentFormConfig = { fields: this[fields] };
        this.productModal = true;
      },
      handleManagerSubmit(data) {
        const productData = {
          manager: data.manager,
          productName: data.productName,
          jiraLink: data.referenceInJira,
          domain: data.domain,
        };
        this.products.push(productData);
        this.productModal = false;
        this.resetForm();
      },
      handleCancel() {
        this.productModal = false;
        this.resetForm();
      },
      resetForm() {
        this.currentFormConfig = null
      },
    },
  };
  </script>
  