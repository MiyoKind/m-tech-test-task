<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    <v-data-table :items="employees" :headers="employeeHeaders"></v-data-table>
    <v-dialog v-model="employeeModal" persistent max-width="600">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" @click="openEmployeeModal('employeeFields')">
          +
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Создать сотрудника</v-card-title>
        <v-card-text>
          <dynamic-form
            v-if="currentFormConfig"
            :fields="currentFormConfig.fields"
            :onSubmit="handleEmployeeSubmit"
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
        { text: "Сотрудники", disabled: true },
      ],
      employees: [],
      employeeHeaders: [
        { title: "Employee", value: "selectedEmployee" },
        { title: "Supervisor", value: "selectedSupervisor" },
        { title: "Rate Type", value: "rateType" },
        { title: "Business Unit", value: "selectedBusinessUnit" },
        { title: "Capitalization Percentage", value: "capitalizationPercentage" },
        { title: "position", value: "selectedPosition"}
      ],
      employeeModal: false,
      currentFormConfig: null,
      employeeFields: [
        {
          name: "employee",
          type: "select",
          label: "Сотрудник",
          options: ["Сотрудник A", "Сотрудник B"],
        },
        {
          name: "supervisor",
          type: "select",
          label: "Руководитель",
          options: ["Руководитель A", "Руководитель B"],
        },
        {
          name: "rateType",
          type: "select",
          label: "Тип ставки",
          options: ["opex", "capex"],
        },
        {
          name: "businessUnit",
          type: "select",
          label: "Бизнес единица",
          options: ["MVM", "MTech"],
        },
        {
          name: "capitalizationPercentage",
          type: "text",
          label: "Процент капитализации",
          rules: [(v) => /^\d+$/.test(v) && v >= 0 && v <= 100 || 'Введите корректное значение в % (0-100)']
        },
        { name: "position", type: "text", label: "Должность" },
      ],
    };
  },
  methods: {
    openEmployeeModal(fields) {
      this.currentFormConfig = { fields: this[fields] };
      this.employeeModal = true;
    },
    handleEmployeeSubmit(data) {
      const employeeData = {
        selectedEmployee: data.employee,
        selectedSupervisor: data.supervisor,
        rateType: data.rateType,
        businessUnit: data.businessUnit,
        capitalizationPercentage: data.capitalizationPercentage,
        selectedPosition: data.position
      };
      this.employees.push(employeeData);
      this.employeeModal = false;
      this.resetForm();
    },
    handleCancel() {
      this.employeeModal = false;
      this.resetForm();
    },
    resetForm() {
        this.currentFormConfig = null
      },
  },
};
</script>
