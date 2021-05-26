<template>
  <div :class="[$style.formAdd]">
    <!-- <input
      :class="[$style.input]"
      placeholder="Payment description"
      v-model="category"
    /> -->
    <div v-show="isAddCategory" :class="[$style.newCategory]">
      <span>New category:</span>
      <input
        :class="[$style.input, $style.inputAddCategiry]"
        type="text"
        v-model="newCategory"
      />
    </div>

    <div v-show="!isAddCategory">
      <select :class="[$style.input]" v-model="category">
        <option
          v-for="(item, index) in getCategories"
          :key="index"
          :value="item"
        >
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
    </div>

    <div :class="[$style.formBottomButton]">
      <button
        :class="[$style.addCategory]"
        @click="isAddCategory = !isAddCategory"
      >
        {{ !isAddCategory ? "Add category" : "Back" }}
      </button>
      <button :class="[$style.button]" @click="add" v-show="!isAddCategory">
        ADD <span :class="[$style.spanAdd]">+</span>
      </button>
      <button
        :class="[$style.button]"
        @click="addCategory"
        v-show="isAddCategory"
      >
        Category <span :class="[$style.spanAdd]">+</span>
      </button>
    </div>
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
      newCategory: "",
      isAddCategory: false,
    };
  },
  computed: {
    ...mapGetters(["getCategories", "getMaxPage"]),
  },
  methods: {
    ...mapMutations([
      "setPaymentListAdded",
      "setTargetPage",
      "setCategoriesAdded",
    ]),
    add() {
      const { date, category, price } = this;
      // this.$emit("add", { date, category, price });
      this.setPaymentListAdded({ date, category, price });
      this.setTargetPage(this.getMaxPage);
    },
    addCategory() {
      if (this.newCategory) {
        this.setCategoriesAdded(this.newCategory);
        this.isAddCategory = !this.isAddCategory;
      } else {
        alert("Заполните поле 'New category'.");
      }
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
@mixin shadow() {
  -webkit-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 4px 8px 0px rgba(116, 117, 118, 0.2);
}

.formAdd {
  width: 300px;
  min-height: 195px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  background-color: #fff;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  @include shadow();
}
.input {
  width: 100%;
  padding: 10px 20px;
  margin-top: 10px;
  box-sizing: border-box;
  @include shadow();
  border: 1px solid rgba(116, 117, 118, 0.2);
  border-radius: 3px;
}
.formBottomButton {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
  position: relative;
}
.newCategory {
  width: 100%;
  font-size: 13px;
  color: grey;
}
.inputAddCategiry {
}
.button {
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
  @include shadow();
  border: 1px solid rgba(116, 117, 118, 0.2);
}
.button:hover {
  background-color: darken($buttonColor, 5%);
}
.addCategory {
  border: none;
  background: none;
  cursor: pointer;
  color: $buttonColor;
}
.addCategory:hover {
  text-decoration: underline;
}
.spanAdd {
  position: absolute;
  right: 15px;
  font-size: 20px;
  line-height: 20px;
}
</style>