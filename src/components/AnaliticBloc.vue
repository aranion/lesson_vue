<template>
  <div :class="$style.rightBloc">
    <h2 @click="sumPriceCategories">Costs by categories</h2>
    <div></div>
    <div :class="$style.getCategories">
      <div v-for="(item, index) in getCategories" :key="index">
        <span :data-color="colorCategories[index]" :style="(color = 'red')"
          >/{{ colorCategories[index] }}/ </span
        >{{ item }}
      </div>
      <div v-for="(it, index) in sumPriceCategories" :key="index">
        {{ Math.round((it / getPaymentsListFullPrice) * 100) + "%" }}
      </div>
      <span>{{ "Full sumPrice = " + getPaymentsListFullPrice }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    // categories: Array,
  },
  data() {
    return {
      colorCategories: [
        "#a53b3b",
        "#1c59d1",
        "#6e4190",
        "#2b947c",
        "#e97d61",
        "#a2a2a2",
      ],
    };
  },
  computed: {
    ...mapGetters([
      "getCategories",
      "getPaymentsList",
      "getPaymentsListFullPrice",
    ]),
    sumPriceCategories() {
      const objGroupPrice = {};
      this.getCategories.forEach((el) => {
        let sumPrice = 0;
        this.getPaymentsList.forEach((item) => {
          if (el === item.category) {
            sumPrice = sumPrice + item.price;
          }
        });
        objGroupPrice[el] = sumPrice;
      });
      console.log(objGroupPrice);
      return objGroupPrice;
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" module>
.rightBloc {
  padding-left: 10%;
  font-family: Arial, Helvetica, sans-serif;
}
.categories {
}
</style>