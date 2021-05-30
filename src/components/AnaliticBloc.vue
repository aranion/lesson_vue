<template>
  <div :class="$style.rightBloc">
    <h2>Costs by categories</h2>
    <div :class="$style.getCategories">
      <div
        :class="$style.catigoriesList"
        v-for="(item, index) in getCategories"
        :key="index"
      >
        <div
          :class="[$style.barColor]"
          :style="'background-color:' + colorCategories[index]"
        ></div>
        {{
          item +
          " (" +
          Math.round(
            (sumPriceCategories[item] / getPaymentsListFullPrice) * 100
          ) +
          "%)"
        }}
      </div>

      <div :class="[$style.bar]">
        <div
          v-for="(item, index) in getCategories"
          :key="index"
          :class="[$style.barValue]"
          :style="
            'background-color:' +
            colorCategories[index] +
            '; width:' +
            (sumPriceCategories[item] / getPaymentsListFullPrice) * 100 +
            '%'
          "
        ></div>
      </div>

      <span>{{ "Total price = " + getPaymentsListFullPrice + " p." }}</span>
    </div>
    <div :class="$style.testLinks" ref="links">
      <h4>Test links auto add in form :</h4>
      <p>теги 'a' с перезагрузкой страницы</p>
      <a
        :class="$style.testLink"
        href="/dashboard/add/payment/Clothing?price=20"
      >
        /dashboard/add/payment/Clothing?price=20
      </a>
      <a :class="$style.testLink" href="/dashboard/add/payment/?price=20">
        /dashboard/add/payment/?price=20
      </a>
      <a :class="$style.testLink" href="/dashboard/add/payment/Housing">
        /dashboard/add/payment/Housing
      </a>
      <a :class="$style.testLink" href="/dashboard/add/payment/">
        /dashboard/add/payment/
      </a>

      <p :class="$style.tempP">router-link не работают...</p>
      <div>
        <router-link
          to="/dashboard/add/payment/Clothing?price=20"
          :class="[$style.testLink]"
        >
          /dashboard/add/payment/Clothing?price=20</router-link
        >
        <router-link
          to="/dashboard/add/payment/?price=20"
          :class="[$style.testLink]"
        >
          /dashboard/add/payment/?price=20</router-link
        >
        <router-link
          to="/dashboard/add/payment/Housing"
          :class="[$style.testLink]"
        >
          /dashboard/add/payment/Housing</router-link
        >
        <router-link to="/dashboard/add/payment/" :class="[$style.testLink]">
          /dashboard/add/payment/</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {},
  data() {
    return {
      colorCategories: [],
      categories: [],
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
      return objGroupPrice;
    },
  },
  methods: {
    addColorCategories() {
      for (let i = 0; i < this.getCategories.length; i++) {
        this.colorCategories.push(this.randomColor());
      }
    },
    random(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomColor() {
      let color = "#";
      const abc = { 10: "a", 11: "b", 12: "c", 13: "d", 14: "e", 15: "f" };

      for (let i = 0; i < 6; i++) {
        const rnd = this.random(15, 0);

        if (rnd >= 10) {
          color = color + abc[rnd];
        } else {
          color = color + rnd;
        }
      }
      return color;
    },
  },
  mounted() {
    this.addColorCategories();
    // this.$refs.links.querySelectorAll("a").forEach((link) => {
    //   link.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     history.pushState({},'', link.href);
    //   });
    // });
  },
  updated() {},
};
</script>

<style lang="scss" module>
$buttonColor: rgb(19, 201, 153);
.rightBloc {
  padding-left: 10%;
  font-family: Arial, Helvetica, sans-serif;
}
.categories {
}
.catigoriesList {
  display: flex;
  padding: 5px 0;
}
.bar {
  width: 100%;
  height: 20px;
  background-color: rgb(247, 247, 247);
  display: flex;
  margin: 10px 0;
  border: 1px solid $buttonColor;
}
.barColor {
  width: 20px;
  height: 20px;
  margin-right: 20px;
}
.barValue {
  height: 20px;
}
.testLinks {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
}
.testLink {
  margin: 5px 0;
}
.tempP {
  margin: 10px 0;
}
</style>