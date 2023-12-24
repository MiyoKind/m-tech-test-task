<template>
  <!-- Страница создания сотрудника -->
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
      // Breadcrumbs
      breadcrumbs: [
        { text: "Главная", disabled: false },
        { text: "Сотрудники", disabled: true },
      ],
      // Массив данных о сотрудниках
      employees: [],
      // Заголовки таблицы данных сотрудников
      employeeHeaders: [
        { title: "Employee", value: "selectedEmployee" },
        { title: "Supervisor", value: "selectedSupervisor" },
        { title: "Rate Type", value: "rateType" },
        { title: "Business Unit", value: "selectedBusinessUnit" },
        { title: "Capitalization Percentage", value: "capitalizationPercentage" },
        { title: "Position", value: "selectedPosition"}
      ],
      // Статус модального окна
      employeeModal: false,
      // Конфигурация формы создания сотрудников
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
          // Валидация поля процента капитализации
          rules: [(v) => /^\d+$/.test(v) && v >= 0 && v <= 100 || 'Введите корректное значение в % (0-100)']
        },
        { name: "position", type: "text", label: "Должность" },
      ],
    };
  },
  methods: {
    // Метод открытия модального окна
    openEmployeeModal(fields) {
      this.currentFormConfig = { fields: this[fields] };
      this.employeeModal = true;
    },
    
    // Метод обработки события отправки формы
    handleEmployeeSubmit(data) {
      // Форматирование данных для отображения в таблице
      const employeeData = {
        selectedEmployee: data.employee,
        selectedSupervisor: data.supervisor,
        rateType: data.rateType,
        businessUnit: data.businessUnit,
        capitalizationPercentage: data.capitalizationPercentage,
        selectedPosition: data.position
      };
      
      // Добавление новых данных в таблицу
      this.employees.push(employeeData);
      
      // Очистка формы
      this.employeeModal = false;
      this.resetForm();
    },
    
    // Метод обработки события отмены отправки формы
    handleCancel() {
      // Сброс формы
      this.employeeModal = false;
      this.resetForm();
    },
    
    // Метод для сброса данных формы
    resetForm() {
      this.currentFormConfig = null;
    },
  },
};
</script>
