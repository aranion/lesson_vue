<template>
  <div :class="[$style.wrapperContent]">
    <section :class="[$style.section]">
      <button @click="togglePaymentForm" :class="[$style.togglePaymentForm]">
        ADD NEW COST+
      </button>
      <PaymentForm
        v-show="isPaymentForm"
        :setIsPaymentForm="setIsPaymentForm"
      />
      <PaymentsList />
      <PaginationPayments />
    </section>
    <section :class="[$style.section]">
      <AnaliticBloc />
    </section>
  </div>
</template>

<script>
import PaymentsList from "../components/PaymentsList";
import PaymentForm from "../components/PaymentForm";
import PaginationPayments from "../components/PaginationPayments";
import AnaliticBloc from "../components/AnaliticBloc";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isPaymentForm: false,
    };
  },
  components: {
    PaymentsList,
    PaymentForm,
    PaginationPayments,
    AnaliticBloc,
  },
  methods: {
    ...mapActions(["fetchData", "fetchCategories"]),
    togglePaymentForm() {
      this.isPaymentForm = !this.isPaymentForm;
    },
    setNumberTargetPage(page) {
      this.targetPage = page.targetPage;
    },
    setIsPaymentForm(value) {
      this.isPaymentForm = value;
    },
  },
  mounted() {
    this.fetchData();
    this.fetchCategories();
  },
};
</script>

<style lang="scss" module>
$buttonColor: rgb(19, 201, 153);

.wrapperContent {
  display: flex;
}
.section {
  width: 50%;
  position: relative;
}
.togglePaymentForm {
  background-color: $buttonColor;
  border: none;
  cursor: pointer;
  min-width: 320px;
  padding: 10px 60px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #fff;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 4px 8px 0px rgba(116, 117, 118, 0.2);
  border: 1px solid rgba(116, 117, 118, 0.2);
}
.togglePaymentForm:hover {
  background-color: darken($buttonColor, 5%);
}
</style>