<template>
  <div class="calc">
    <input
      type="number"
      v-model.number.trim="operand1"
      class="calc_input"
      ref="operand1"
    />
    <input
      type="number"
      v-model.number.trim="operand2"
      class="calc_input"
      ref="operand2"
    />
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
      <div class="">
        <input type="checkbox" id="checkbox" v-model="checked" @click="focusColorOpernd('');"/>
        <label for="checkbox"
          >{{ checked ? "Спрятать" : "Отобразить" }} экранную клавиатуру</label
        >
        <div v-show="checked">
          <div
            class="calc_number"
            v-show="checked"
            @click.stop="enterNumber($event)"
          >
            <button v-for="n in 10" :key="n">
              {{ n - 1 }}
            </button>
            <button @click.stop="deleteLastNumber()">&#8592;</button>
            <button @click.stop="clearOperands()">CE</button>
          </div>
          <div @click="toggleOperand($event)">
            <input type="radio" id="one" value="opr1" v-model="picked" />
            <label for="one">Операнд 1</label>
            <input type="radio" id="two" value="opr2" v-model="picked" />
            <label for="two">Операнд 2</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculate",
  data: () => {
    return {
      checked: "",
      picked: "opr1",
      operand1: 0,
      operand2: 0,
      result: "",
      targetOperation: "",
      focuseOperand: "operand1",
      buttonOperations: ["+", "-", "/", "*", "^", "%"],
      operations: {
        "+": (x, y) => x + y,
        "-": (x, y) => x - y,
        "/": (x, y) => (y !== 0 ? x / y : "Лучше не делить на 0!"),
        "*": (x, y) => x * y,
        "^": (x, y) => x ** y,
        "%": (x, y) => (y !== 0 ? (x - (x % y)) / y : "Лучше не делить на 0!"),
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
    enterNumber(e) {
      if (e.target.tagName === "BUTTON") {
        this[this.focuseOperand] = +(
          this[this.focuseOperand] + e.target.innerText
        );
      }
    },
    deleteLastNumber() {
      this[this.focuseOperand] = +String(this[this.focuseOperand]).slice(0, -1);
    },
    clearOperands() {
      this.operand1 = 0;
      this.operand2 = 0;
    },
    toggleOperand(e) {
      if (e.target.tagName === "INPUT") {
        if (e.target.id === "one") {
          this.focuseOperand = "operand1";
        } else {
          this.focuseOperand = "operand2";
        }
        this.focusColorOpernd(this.focuseOperand);
      }
    },
    focusColorOpernd(opr) {
      for (const key in this.$refs) {
        if (Object.hasOwnProperty.call(this.$refs, key)) {
          if (key === opr) {
            this.$refs[key].style.backgroundColor = "#CFF692";
          } else {
            this.$refs[key].style.backgroundColor = "white";
          }
        }
      }
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
.calc_number {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px 0;
}
.calc_number button {
  min-width: 33.333%;
  min-height: 30px;
}
</style>
