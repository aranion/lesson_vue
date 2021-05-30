<template>
  <div :class="[$style.paginationBox]">
    <span @click="onPageTarget($event)" :class="[$style.numberPage]">&lt;</span>
    <span
      :class="[$style.numberPage]"
      @click="onPageTarget($event)"
      v-for="(item, index) in getMaxPage || 1"
      :key="index"
      :ref="item"
      >{{ item }}</span
    >
    <span @click="onPageTarget($event)" :class="[$style.numberPage]">&gt;</span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    // lengthList: Number,
    // itemsOnPage: Number,
    // maxPages: Number,
  },
  data() {
    return {
      // targetPage: 1,
    };
  },
  methods: {
    ...mapMutations(["setTargetPage"]),

    onPageTarget(event) {
      let page = this.getTargetPage;

      switch (event.target.innerText) {
        case "<":
          if (page !== 1) --page;
          break;
        case ">":
          if (page !== this.getMaxPage) ++page;
          break;
        default:
          page = +event.target.innerText;
          break;
      }
      this.setTargetPage(page);
      // this.$emit("getNumberTargetPage", {
      //   targetPage: this.targetPage,
      // });
      this.toggleStyleActivPage();
    },
    toggleStyleActivPage() {
      const elems = this.$el.children;

      for (let i = 1; i < elems.length; i++) {
        elems[i].classList.remove(this.$style.targetPage);
        if (+elems[i].innerText === this.getTargetPage) {
          elems[i].classList.add(this.$style.targetPage);
        }
      }
    },
  },
  computed: {
    ...mapGetters(["getMaxPage", "getTargetPage"]),
  },
  mounted() {
  },
  updated() {
    this.toggleStyleActivPage();
    // console.log(this.$route.params.page);
  }
};
</script >

<style lang="scss" module>
$buttonColor: rgb(19, 201, 153);

.paginationBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 100px;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 4px 8px 0px rgba(116, 117, 118, 0.2);
  border: 1px solid rgba(116, 117, 118, 0.2);
  border-radius: 3px;
}
.numberPage {
  cursor: pointer;
}
.numberPage:hover {
  color: $buttonColor;
  font-weight: bold;
}
.targetPage {
  color: $buttonColor;
  font-weight: bold;
}
</style>