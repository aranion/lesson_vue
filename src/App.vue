<template>
  <div id="app">
    <header :class="[$style.header]">
      <h1>My personal costs</h1>
    </header>
    <main :class="[$style.wrapperContent]">
      <section :class="[$style.section]">
        <button @click="togglePaymentForm" :class="[$style.togglePaymentForm]">
          ADD NEW COST+
        </button>
        <PaymentForm v-show="isPaymentForm" />
        <PaymentsList />
        <PaginationPayments />
      </section>
      <section :class="[$style.section]">
        <AnaliticBloc />
      </section>
    </main>
  </div>
</template>
<script>
import PaymentsList from "./components/PaymentsList";
import PaymentForm from "./components/PaymentForm";
import PaginationPayments from "./components/PaginationPayments";
import AnaliticBloc from "./components/AnaliticBloc";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    PaymentsList,
    PaymentForm,
    PaginationPayments,
    AnaliticBloc,
  },
  data() {
    return {
      isPaymentForm: false,
      itemsOnPage: 10,
      targetPage: 1,
      maxPages: 1,
      paymentsList: [
        { id: 1, date: "13.05.2021", category: "Transport", price: 20 },
        { id: 2, date: "13.05.2021", category: "Transport", price: 30 },
        { id: 3, date: "13.05.2021", category: "Transport", price: 40 },
        { id: 4, date: "13.05.2021", category: "Transport", price: 50 },
        { id: 5, date: "13.05.2021", category: "Transport", price: 60 },
        { id: 6, date: "13.05.2021", category: "Transport", price: 70 },
        { id: 7, date: "13.05.2021", category: "Transport", price: 80 },
        { id: 8, date: "13.05.2021", category: "Food", price: 90 },
        { id: 9, date: "13.05.2021", category: "Food", price: 100 },
        { id: 10, date: "13.05.2021", category: "Housing", price: 110 },
        { id: 11, date: "13.05.2021", category: "Housing", price: 120 },
        { id: 12, date: "13.05.2021", category: "Housing", price: 130 },
        { id: 13, date: "13.05.2021", category: "Housing", price: 140 },
        { id: 14, date: "13.05.2021", category: "Housing", price: 150 },
        { id: 15, date: "13.05.2021", category: "Housing", price: 160 },
        { id: 16, date: "13.05.2021", category: "Housing", price: 170 },
        { id: 17, date: "13.05.2021", category: "Housing", price: 180 },
        { id: 18, date: "13.05.2021", category: "Housing", price: 190 },
        { id: 19, date: "13.05.2021", category: "Housing", price: 200 },
        { id: 20, date: "13.05.2021", category: "Healthecare", price: 210 },
        { id: 21, date: "13.05.2021", category: "Healthecare", price: 220 },
        { id: 22, date: "13.05.2021", category: "Healthecare", price: 230 },
        { id: 23, date: "13.05.2021", category: "Healthecare", price: 240 },
        { id: 24, date: "13.05.2021", category: "Healthecare", price: 250 },
        { id: 25, date: "13.05.2021", category: "Healthecare", price: 260 },
        { id: 26, date: "13.05.2021", category: "Healthecare", price: 270 },
        { id: 27, date: "13.05.2021", category: "Healthecare", price: 280 },
        { id: 28, date: "13.05.2021", category: "Healthecare", price: 290 },
        { id: 29, date: "13.05.2021", category: "Clothing", price: 300 },
        { id: 30, date: "13.05.2021", category: "Clothing", price: 310 },
        { id: 31, date: "13.05.2021", category: "Clothing", price: 320 },
        { id: 32, date: "13.05.2021", category: "Clothing", price: 330 },
        { id: 33, date: "13.05.2021", category: "Clothing", price: 340 },
        { id: 34, date: "13.05.2021", category: "Clothing", price: 350 },
        { id: 35, date: "13.05.2021", category: "Clothing", price: 360 },
        { id: 36, date: "13.05.2021", category: "Clothing", price: 370 },
        { id: 37, date: "13.05.2021", category: "Clothing", price: 380 },
        { id: 38, date: "13.05.2021", category: "Clothing", price: 390 },
        { id: 39, date: "13.05.2021", category: "Clothing", price: 400 },
        { id: 40, date: "13.05.2021", category: "Clothing", price: 410 },
        { id: 41, date: "13.05.2021", category: "Clothing", price: 420 },
        { id: 42, date: "13.05.2021", category: "Clothing", price: 430 },
        { id: 43, date: "13.05.2021", category: "Clothing", price: 440 },
        { id: 44, date: "13.05.2021", category: "Clothing", price: 450 },
        { id: 45, date: "13.05.2021", category: "Clothing", price: 460 },
        { id: 46, date: "13.05.2021", category: "Clothing", price: 470 },
        { id: 47, date: "13.05.2021", category: "Clothing", price: 480 },
        { id: 48, date: "13.05.2021", category: "Clothing", price: 490 },
        { id: 49, date: "13.05.2021", category: "Clothing", price: 500 },
        { id: 50, date: "13.05.2021", category: "Clothing", price: 510 },
        { id: 51, date: "13.05.2021", category: "Other", price: 520 },
        { id: 52, date: "13.05.2021", category: "Other", price: 530 },
        { id: 53, date: "13.05.2021", category: "Other", price: 540 },
        { id: 54, date: "13.05.2021", category: "Other", price: 550 },
        { id: 55, date: "13.05.2021", category: "Other", price: 560 },
      ],
    };
  },
  methods: {
    ...mapActions(["fetchData", "fetchCategories"]),
    // onDataAdded(data) {
    //   this.paymentsList.push({
    //     id: this.paymentsList[this.paymentsList.length - 1].id + 1,
    //     ...data,
    //   });
    //   this.maxPages = this.caclMaxPage();
    // },
    togglePaymentForm() {
      this.isPaymentForm = !this.isPaymentForm;
    },
    setNumberTargetPage(page) {
      this.targetPage = page.targetPage;
    },
  },
  computed: {},
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
    // this.maxPages = this.caclMaxPage();
    this.fetchData();
    this.fetchCategories();
  },
  deforeUpdate() {
    console.log("deforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  deforeDestroy() {
    console.log("deforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
};
</script >

<style lang="scss" module>
$buttonColor: rgb(19, 201, 153);

.wrapperContent {
  display: flex;
}
.section {
  width: 50%;
}
.header {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
}
.togglePaymentForm {
  background-color: $buttonColor;
  border: none;
  cursor: pointer;
  padding: 10px 60px;
  border-radius: 3px;
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
