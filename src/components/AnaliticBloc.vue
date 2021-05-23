<template>
  <div :class="$style.rightBloc">
    <h2>Costs by categories</h2>
    <div></div>
    <div :class="$style.categories">
      <div v-for="(item, index) in categories" :key="index"><span :data-color='colorCategories[index]'>{{colorCategories[index]}}</span>{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    categories: Array,
  },
  data() {
    return {
      colorCategories: [
        "#a53b3b",
        "#1c59d1",
        "#6e4190",
        "#2b947c",
        "#e97d61",
        "#a2a2a2",
      ],
    };
  },
  methods: {},
  mounted() {
  },
};
</script>

<style lang="scss" module>
.rightBloc {
  padding-left: 10%;
  font-family: Arial, Helvetica, sans-serif;
}
.categories {

}
</style>