<template>
  <transition name="fade">
    <div :class="[$style.contextMenu]" v-if="targetId === idRow">
      <button :class="$style.button" @click.prevent="onEditPayment">
        <img
          src="https://avatanplus.com/files/resources/original/5ac7d62ef41c31629c9ca798.png"
          alt="карандаш"
          :class="$style.buttonImg"
        />
        Редактировать
      </button>
      <button :class="$style.button" @click.prevent="onDelPayment">
        <img
          src="https://cdn.icon-icons.com/icons2/1097/PNG/512/1485477104-basket_78591.png"
          alt="корзина"
          :class="$style.buttonImg"
        />
        Удалить
      </button>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      isToggleShow: true,
      targetId: -1,
    };
  },
  props: {
    idRow: Number,
  },
  methods: {
    ...mapMutations(["setPaymentListDel", "setPaymentListUpdate"]),
    
    onToggleShow({ event }) {
      if (this.isToggleShow) {
        this.targetId = +event.target.parentNode.children[0].innerText;
      } else {
        this.targetId = -1;
      }
      this.isToggleShow = !this.isToggleShow;
    },
    onEditPayment() {
      this.$root.$emit("editPaymentForm", this.targetId);
    },
    onDelPayment() {
      this.setPaymentListDel(this.targetId);
    },
  },
  computed: {
    ...mapGetters(["getPaymentsList"]),
  },
  mounted() {
    this.$menu.EventBus.$on("onToggleShow", this.onToggleShow);
  },
  beforeDestroy() {},
};
</script>

<style lang='scss' module>
.contextMenu {
  width: 150px;
  padding: 10px 0;
  margin-top: 15px;
  position: absolute;
  z-index: 1;
  right: -15px;
  top: 15px;
  background-color: #fff;
  border-radius: 3px;
  -webkit-box-shadow: 0px 0px 15px 10px rgba(159, 159, 159, 0.5);
  -moz-box-shadow: 0px 0px 15px 10px rgba(159, 159, 159, 0.5);
  box-shadow: 0px 0px 15px 10px rgba(159, 159, 159, 0.5);

  &:before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: -7px;
    right: 15px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #fff;
  }

  .button {
    width: 100%;
    border: none;
    background-color: #fff;
    cursor: pointer;
    min-height: 30px;
    text-align: left;
    display: flex;
    align-items: center;

    &:hover {
      background-color: rgba(34, 60, 80, 0.1);
      text-decoration: underline;
    }

    .buttonImg {
      width: 15px;
      padding-left: 10px;
      padding-right: 10px;
      opacity: 0.7;
    }
  }
}
</style>