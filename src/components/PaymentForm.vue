<template>
  <div :class="[$style.formAdd]">
    <!-- <input
      :class="[$style.input]"
      placeholder="Payment description"
      v-model="category"
    /> -->
    <select :class="[$style.input]" v-model="category">
      <option v-for="(item, index) in getCategories" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
    <input
      :class="[$style.input]"
      placeholder="Payment amount"
      type="number"
      v-model.number="price"
    />
    <input
      :class="[$style.input]"
      placeholder="Payment date"
      type="date"
      v-model="date"
    />
    <button :class="[$style.button]" @click="add">
      ADD <span :class="[$style.spanAdd]">+</span>
    </button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: {
    // categories: Array,
  },
  data() {
    return {
      date: "2021-05-30",
      category: "Other",
      price: "0",
    };
  },
  computed: {
    ...mapGetters(["getCategories", "getMaxPage"]),
  },
  methods: {
    ...mapMutations(["setPaymentListAdded", "setTargetPage"]),
    add() {
      const { date, category, price } = this;
      // this.$emit("add", { date, category, price });
      this.setPaymentListAdded({ date, category, price });
      this.setTargetPage(this.getMaxPage);
    },
  },
  mounted() {
    // console.log(this.getPaymentsList);
    // console.log(this.getCategories);
    // this.$store.commit("setPaymentsListData", ["s", "s"]);
    // console.log("paymentsList=", this.$store.state.paymentsList);
    // this.setPaymentsListData(["r", "r"]);
    // console.log("paymentsList==", this.$store.state.paymentsList);
    // this.setPaymentsListData(this.fetchData()); // this.$store.commit("setPaymentsListData", this.fetchData());
    // console.log(this.getPaymentsListFullPrice);
    // console.log(this.$store.getters.getPaymentsListFullPrice);
  },
};
</script>

<style lang="scss" module>
$buttonColor: rgb(19, 201, 153);

.formAdd {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  background-color: #fff;
  padding: 10px;
    -webkit-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 4px 8px 0px rgba(116, 117, 118, 0.2);
}
.input {
  width: 100%;
  padding: 10px 20px;
  margin-top: 10px;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 4px 8px 0px rgba(116, 117, 118, 0.2);
  border: 1px solid rgba(116, 117, 118, 0.2);
  border-radius: 3px;
}
.button {
  margin-top: 10px;
  background-color: $buttonColor;
  border: none;
  cursor: pointer;
  padding: 7px 30px;
  border-radius: 3px;
  color: #fff;
  width: 150px;
  position: relative;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 4px 8px 0px rgba(116, 117, 118, 0.2);
  border: 1px solid rgba(116, 117, 118, 0.2);
}
.button:hover {
  margin-top: 10px;
  background-color: darken($buttonColor, 5%);
}
.spanAdd {
  position: absolute;
  right: 15px;
  font-size: 20px;
  line-height: 20px;
}
</style>