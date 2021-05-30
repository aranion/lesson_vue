<template>
  <div :class="$style.error">
    <h3>Error 404</h3>
    <p>Страница не найдена</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" module>
.error {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 150px);
}
</style>