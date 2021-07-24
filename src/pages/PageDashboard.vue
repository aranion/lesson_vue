<template>
  <v-row>
    <v-col>
      <h2 class="mb-7">My personal costs</h2>
      <v-btn :ripple="false" color="teal accent-4" dark :class="[$style.togglePaymentForm]" @click="togglePaymentForm" >
        ADD NEW COST
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <transition name="fade">
        <Modal v-show="isPaymentForm" :setIsPaymentForm="setIsPaymentForm" />
      </transition>
      <PaymentsList />
      <PaginationPayments />
    </v-col>
    <v-col>
      <AnalyticBloc />
    </v-col>
  </v-row>
</template>

<script>
import PaymentsList from "../components/PaymentsList";
import PaginationPayments from "../components/PaginationPayments";
import AnalyticBloc from "../components/AnalyticBloc";

export default {
  data() {
    return {
      isPaymentForm: false,
    };
  },
  components: {
    PaymentsList,
    PaginationPayments,
    AnalyticBloc,
    Modal: () => import("../components/modalwindow/Modal"),
  },
  methods: {
    togglePaymentForm() {
      this.isPaymentForm = !this.isPaymentForm;
    },
    setIsPaymentForm(value) {
      this.isPaymentForm = value;
    },
  },
  mounted() {},
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
  width: 320px;
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
:global(.fade-enter-active),
:global(.fade-leave-active) {
  transition: opacity 0.5s;
}
:global(.fade-enter),
:global(.fade-leave-to) {
  opacity: 0;
}
</style>