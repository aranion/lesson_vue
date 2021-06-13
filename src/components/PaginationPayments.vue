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
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setTargetPage"]),
    ...mapActions(["fetchData"]),

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
      this.fetchData(page);
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
    this.fetchData(this.getTargetPage);
    this.toggleStyleActivPage();
    this.$root.$on('toogleActivePage', this.toggleStyleActivPage);  
  },
  updated() {
    this.toggleStyleActivPage();
  },
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