<template>
  <div class="calc">
    <input type="number" v-model.number="operand1" class="calc_input" />
    <input type="number" v-model.number="operand2" class="calc_input" />
    <p>{{ resultCalc() }}</p>
    <div>
      <button
        @click="calculate(returnOperation($event))"
        v-for="item in buttonOperations"
        :key="item"
        class="calc_buttonOperation"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculate",
  data: () => {
    return {
      operand1: 0,
      operand2: 0,
      result: 0,
      targetOperation: "",
      buttonOperations: ["+", "-", "/", "*", "^", "%"],
      operations: {
        "+": (x, y) => x + y,
        "-": (x, y) => x - y,
        "/": (x, y) => (y !== 0 ? x / y : "Лучше не делить на 0!"),
        "*": (x, y) => x * y,
        "^": (x, y) => x ** y,
        "%": (x, y) => (x - (x % y)) / y, 
      },
    };
  },
  props: {},
  methods: {
    calculate(op) {
      this.result = this.operations[op](this.operand1, this.operand2);
    },
    returnOperation(event) {
      this.targetOperation = event.target.innerText;
      return event.target.innerText;
    },
    resultCalc() {
      if (this.operand1 === 0 && this.operand2 === 0) return " ";
      return `${this.operand1} ${this.targetOperation} ${this.operand2} = ${this.result}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.calc {
  border: 1px solid black;
  width: 400px;
  min-height: 400px;
  margin: 0 auto;
  padding: 5px;
  box-sizing: border-box;
  font-size: 20px;

}
.calc_buttonOperation {
  width: 97px;
  font-size: 20px;
}
.calc_input {
  width: 50%;
  box-sizing: border-box;
  min-height: 25px;
  font-size: 20px;

}
</style>
