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
      :class="[$style.titleRow]"
      v-for="(item, index) in calcItemsPages"
      :key="index"
    >
      <div :class="[$style.textRow]" v-for="(content, i) in item" :key="i">
        {{ content }}
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  // props: ["items"],
  props: {
    // items: Array,
    items: {
      type: Array,
      default: () => [],
    },
    targetPage: { type: Number, default: 1 },
    itemsOnPage: { type: Number, default: 6 },
  },
  data() {
    return {
      titleHeader: ["#", "Date", "Category", "value"],
    };
  },
  methods: {},
  computed: {
    calcItemsPages() {
      return this.items.slice(
        this.itemsOnPage * (this.targetPage - 1),
        this.itemsOnPage * (this.targetPage - 1) + this.itemsOnPage
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
  font-family: Arial, Helvetica, sans-serif;
}
.titleRow {
  display: flex;
  min-width: 100%;
  text-align: center;
  padding: 15px 0;
}
.titleRow:not(:last-child) {
  border-bottom: 2px solid rgb(214, 214, 214);
}
.titleHeader {
  font-weight: bold;
}
.textRow {
}
.textRow:first-child {
  width: 10%;
}
.textRow:last-child {
  width: 20%;
}
.textRow:nth-child(2) {
  width: 35%;
}
.textRow:nth-child(3) {
  width: 35%;
}
</style>