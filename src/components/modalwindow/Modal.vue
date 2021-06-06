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
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang='scss' module>
</style>