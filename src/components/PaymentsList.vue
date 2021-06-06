<template>
  <div :class="[$style.paymetntsList]">
    <div :class="[$style.titleRow]">
      <div
        :class="[$style.textRow, $style.titleHeader]"
        v-for="(item, index) in titleHeader"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <div
      :class="[$style.titleRow, $style.titleRowSelect]"
      v-for="(item, index) in calcItemsPages"
      :key="index"
    >
      <div :class="[$style.textRow]" v-for="(content, i) in item" :key="i">
        {{ content }}
      </div>

      <div :class="$style.contextMenu" @click.stop="onMenu($event)">
        <ContextMenu :idRow="item.id" />
      </div>
    </div>
  </div>
</template>
 
<script>
import { mapGetters } from "vuex";
// import ContextMenu from "./ContextMenu/ContextMenu";

export default {
  components: {
    ContextMenu: () => import("./ContextMenu/ContextMenu"),
  },
  // props: ["items"],
  props: {
    // items: Array,
    // items: {
    //   type: Array,
    //   default: () => [],
    // },
    // targetPage: { type: Number, default: 1 },
    // itemsOnPage: { type: Number, default: 6 },
  },
  data() {
    return {
      titleHeader: ["#", "Date", "Category", "value"],
    };
  },
  methods: {
    onMenu(event) {
      this.$menu.show(event);
    },
  },
  computed: {
    ...mapGetters(["getPaymentsList", "getTargetPage", "getItemsOnPage"]),
    calcItemsPages() {
      return this.getPaymentsList.slice(
        this.getItemsOnPage * (this.getTargetPage - 1),
        this.getItemsOnPage * (this.getTargetPage - 1) + this.getItemsOnPage
      );
    },
  },
  mounted() {},
};
</script>

<style lang="scss" module>
.paymetntsList {
  margin-top: 10px;
  width: 100%;
  min-height: 555px;
  font-family: Arial, Helvetica, sans-serif;
}
.titleRow {
  display: flex;
  align-items: center;
  min-width: 100%;
  text-align: center;
  padding: 15px 0;
}
.titleRowSelect:hover {
  background-color: rgba(137, 255, 198, 0.3);
}
.titleRow:not(:last-child) {
  border-bottom: 2px solid rgb(214, 214, 214);
}
.titleHeader {
  font-weight: bold;
}
.textRow:hover {
}
.textRow:first-child {
  width: 10%;
}
.textRow:nth-child(4) {
  width: 20%;
}
.textRow:nth-child(2) {
  width: 35%;
}
.textRow:nth-child(3) {
  width: 35%;
}
.contextMenu {
  position: absolute;
  right: 0;
  cursor: pointer;
}
.contextMenu:after {
  content: "\2807";
  color: rgb(84, 84, 84);
  font-size: 18px;
}
</style>