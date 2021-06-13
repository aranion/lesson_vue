<template>
  <div :class="$style.rightBloc">
    <h2>Costs by categories</h2>
    <div :class="$style.getCategories">
      <div
        :class="$style.catigoriesList"
        v-for="(item, index) in getCategory"
        :key="index"
      >
        <div
          :class="[$style.barColor]"
          :style="'background-color:' + colorCategories[index]"
        ></div>
        {{ item + " (" + calcPercentOfTotal(item) + "%)" }}
      </div>

      <div :class="[$style.bar]">
        <div
          v-for="(item, index) in getCategory"
          :key="index"
          :class="[$style.barValue]"
          :style="
            'background-color:' +
            colorCategories[index] +
            '; width:' +
            calcPercentOfTotal(item) +
            '%'
          "
        ></div>
      </div>

      <span>{{ "Total price = " + getPaymentsListFullPrice + " p." }}</span>
    </div>
   </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {},
  data() {
    return {
      colorCategories: [
        "#703ddb",
        "#936a01",
        "#87c83a",
        "#c05650",
        "#10492f",
        "#b92495",
      ],
    };
  },
  computed: {
    ...mapGetters([
      "getCategories",
      "getPaymentsListFullPrice",
      "getAnalyticData",
    ]),

    getCategory() {
      return Object.keys(this.getAnalyticData);
    }
  },
  methods: {
    ...mapActions(["fetchAnalytic"]),

    calcPercentOfTotal(item) {
      return Math.round((this.getAnalyticData[item] / this.getPaymentsListFullPrice) * 100);
    },
    addColorCategories() {
      if (this.colorCategories.length < this.getCategories.length) {
        for (
          let i = 0;
          i < this.getCategories.length - this.colorCategories.length;
          i++
        ) {
          this.colorCategories.push(this.randomColor());
        }
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

        if (rnd >= 10) color = color + abc[rnd];
        else color = color + rnd;
      }

      return color;
    },
  },
  mounted() {
    this.fetchAnalytic();
  },
  updated() {
    this.addColorCategories();
  },
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