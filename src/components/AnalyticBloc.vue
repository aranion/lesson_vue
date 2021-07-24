<template>
  <div :class="$style.rightBloc">
    <h2 class="mb-7">Costs by categories</h2>
    <div>
      <canvas ref="canvas"></canvas>
    </div>
    <h3 class="my-7">{{ "Total price = " + getPaymentsListFullPrice + " p." }}</h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Pie } from "vue-chartjs";

export default {
  props: {},
  extends: Pie,
  data() {
    return {
      colorCategory: [],
      nameArr: [],
      priceArr: [],
    };
  },
  computed: {
    ...mapGetters([
      "getCategories",
      "getPaymentsListFullPrice",
      "getAnalyticData",
    ]),
  },
  methods: {
    ...mapActions(["fetchAnalytic"]),

    random(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomColor() {
      let color = "rgba(";

      for (let i = 0; i < 3; i++) {
        color = color + this.random(220, 30) + ",";
      }
      color = color + "0." + this.random(6, 1) + ")";

      return color;
    },
    renderPei() {
      this.renderChart({
        labels: this.nameArr,
        datasets: [
          {
            label: "Costs by categories",
            data: this.priceArr,
            backgroundColor: this.colorCategory,
            borderColor: this.colorCategory,
            borderWidth: 1,
          },
        ],
      });
    },
  },
  mounted() {
    this.randomColor();

    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.fetchAnalytic());
      }, 0);
    }).then(() => {
      this.nameArr = Object.keys(this.getAnalyticData);
      this.priceArr = Object.values(this.getAnalyticData);
      this.nameArr.forEach(() => this.colorCategory.push(this.randomColor()));

      this.renderPei();
    });
  },
  updated() {
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