<template>
  <div :class="[$style.formAdd]">
    <div v-if="isAddCategory" :class="[$style.newCategory]">
      <span>New category:</span>
      <input
        :class="[$style.input, $style.inputAddCategiry]"
        type="text"
        v-model="newCategory"
      />
    </div>

    <div v-if="!isAddCategory" :class="[$style.wrapperInput]">
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
        name="amount"
        v-model.number="price"
      />
      <input
        :class="[$style.input]"
        placeholder="Payment date"
        type="date"
        name="date"
        v-model="date"
      />
    </div>

    <div :class="[$style.formBottomButton]">
      <button :class="[$style.addCategory]" color="teal accent-4" @click="toggleAddCategoryButton()">
        {{ !isAddCategory ? "Add category" : "Back" }}
      </button>
      <v-btn
        color="teal accent-4"
        dark
        :class="[$style.button]"
        @click="add"
        v-show="!isAddCategory && !isSaveButton"
      >
        ADD <span :class="[$style.spanAdd]">+</span>
      </v-btn>
      <v-btn
        color="teal accent-4"
        dark
        :class="[$style.button]"
        @click="updatePaymetnList"
        v-show="isSaveButton"
      >
        SAVE
      </v-btn>
      <v-btn
        color="teal accent-4"
        dark
        :class="[$style.button]"
        @click="addCategory"
        id="addCategory"
        v-show="isAddCategory"
      >
        Category <span>+</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  props: {
    setIsPaymentForm: Function,
  },
  data() {
    return {
      date: "2021-5-3",
      category: "Other",
      price: 0,
      newCategory: "",
      isAddCategory: false,
      isSaveButton: false,
      targetId: -1,
    };
  },
  computed: {
    ...mapGetters(["getCategories", "getMaxPage", "getPaymentsListActive"]),
  },
  methods: {
    ...mapMutations([
      "setPaymentListAdded",
      "setTargetPage",
      "setCategoriesUpdate",
      "setPaymentListUpdate",
      "setFullPriceUpdate",
    ]),
    ...mapActions(["fetchData", "fetchCategories", "fetchAnalytic"]),

    add() {
      const { date, category, price } = this;
      const maxPage = this.getMaxPage;

      this.setTargetPage(maxPage);

      new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.fetchData(maxPage));
        }, 0);
      }).then(() => {
        this.$root.$emit("toogleActivePage", maxPage);
        this.setPaymentListAdded({ date, category, price });
        this.setFullPriceUpdate(price);
        this.fetchAnalytic();
      });
    },
    addCategory() {
      if (this.checkDubleCategory(this.newCategory)) {
        this.setCategoriesUpdate(this.newCategory);
        this.fetchAnalytic();
        this.toggleAddCategoryButton();
        this.toggleSaveButton(false);

        this.category = this.newCategory;
        this.newCategory = "";
      }
    },
    checkDubleCategory(value) {
      const arr = this.getCategories;

      if (value) {
        if (isNaN(+value)) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].toLowerCase() === value.toLowerCase()) {
              alert("Категория уже создана!");
              return false;
            }
          }
          return true;
        } else {
          alert("Введите текст!");
          return false;
        }
      } else {
        alert("Заполните поле 'New category'.");
        return false;
      }
    },
    getNowDateFormat() {
      const date = new Date();
      const day = date.getDate().toString();
      const month = date.getMonth().toString();
      const year = date.getFullYear();

      return `${year}-${month.length === 1 ? "0" + (+month + 1) : +month + 1}-${
        day.length === 1 ? "0" + day : day
      }`;
    },
    addDataFromUrl() {
      const routArrUrl = this.$route.path.split("/");
      const category = routArrUrl[routArrUrl.length - 1];
      const price = this.$route.query.price;

      this.date = this.getNowDateFormat();
      this.category =
        category && routArrUrl[2] === "add" ? category : this.category;
      this.price = +price || +this.price;

      if (category && price) {
        this.add();
      } else if (routArrUrl.length > 2) {
        this.setIsPaymentForm(true);
      }
    },
    openEditPaymentListForm(targetId) {
      this.setIsPaymentForm(true);

      const { date, category, price } = this.getPaymentsListActive.find(
        (el) => el.id === targetId
      );

      this.price = price;
      this.date = date;
      this.category = category;
      this.targetId = targetId;

      this.toggleSaveButton(true);
      this.toggleAddCategoryButton(false);
    },
    toggleSaveButton(value) {
      if (value !== undefined) {
        // if (!value) {
        this.isSaveButton = value;
      } else {
        this.isSaveButton = !this.isSaveButton;
      }
    },
    toggleAddCategoryButton(value) {
      // if (!value) {
      if (value !== undefined) {
        this.isAddCategory = value;
      } else {
        this.isAddCategory = !this.isAddCategory;
        this.toggleSaveButton(false);
      }
    },
    updatePaymetnList() {
      const priceOld = this.getPaymentsListActive.find(
        (el) => el.id === this.targetId
      ).price;
      const objUpdate = {
        id: this.targetId,
        date: this.date,
        category: this.category,
        price: this.price,
      };

      this.setPaymentListUpdate(objUpdate);
      this.setFullPriceUpdate(this.price - priceOld);
      this.fetchAnalytic();
      this.toggleSaveButton();
      this.setIsPaymentForm(false);
    },
  },
  mounted() {
    this.date = this.getNowDateFormat();
    this.addDataFromUrl();
    this.fetchCategories();
    this.$root.$on("editPaymentForm", this.openEditPaymentListForm);
  },
  updated() {},
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
  width: 320px;
  min-height: 195px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  background-color: #fff;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid $buttonColor;
  box-sizing: border-box;
  @include shadow();
  z-index: 1;
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