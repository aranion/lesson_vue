import ContextMenu from "../src/components/ContextMenu/ContextMenu.vue";
import Menu from "../src/plugins/ContextMenu";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(Menu);

describe("Page Dashboard test", () => {
  let actions;
  let store;
  let getters;
  let mutations;
  let router;
  let menu;

  beforeEach(() => {
    actions = {
      fetchData: jest.fn(),
      fetchCategories: jest.fn(),
      fetchAnalytic: jest.fn(),
    };
    getters = {
      getCategories: jest.fn(),
      getCategory: jest.fn(),
      getTargetPage: jest.fn(),
      getAnalyticData: jest.fn(),
      getPaymentsListFullPrice: jest.fn(),
      getMaxPage: jest.fn(),
      getPaymentsListActive: jest.fn(),
    };
    mutations = {
      setPaymentListAdded: jest.fn(),
      setTargetPage: jest.fn(),
      setCategoriesUpdate: jest.fn(),
      setPaymentListUpdate: jest.fn(),
      setFullPriceUpdate: jest.fn(),
    };

    router = new VueRouter();

    store = new Vuex.Store({
      actions,
      getters,
      mutations,
    });
  });

  test("test fn - onToggleShow", () => {
    const Wrapper = mount(ContextMenu, { store, localVue, router, Menu });
    const eventEmul = {
      event: { target: { parentNode: { children: [{ innerText: "2" }] } } },
    };

    expect(Wrapper.vm.isToggleShow).toBe(true);
    Wrapper.vm.onToggleShow(eventEmul);
    expect(Wrapper.vm.isToggleShow).toBe(false);
    Wrapper.vm.onToggleShow(eventEmul);
    expect(Wrapper.vm.isToggleShow).toBe(true);
  });
});
