<template>
  <PaymentForm :setIsPaymentForm="setIsPaymentForm" />
</template>

<script>
import PaymentForm from "../PaymentForm";

export default {
  components: {
    PaymentForm,
  },
  props: {
    setIsPaymentForm: Function,
  },
};
</script>

<style>
</style>