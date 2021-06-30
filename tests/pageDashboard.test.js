import PageDashboard from "../src/pages/PageDashboard.vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("Page Dashboard test", () => {
  let actions;
  let store;
  let getters;
  let mutations;
  let router;

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

  test("test button toggle payment form", () => {
    const Wrapper = mount(PageDashboard, { store, localVue, router });
    const btn = Wrapper.find(".togglePaymentForm");

    expect(Wrapper.vm.isPaymentForm).toBe(false);
    btn.trigger("click");
    // Wrapper.vm.togglePaymentForm();
    expect(Wrapper.vm.isPaymentForm).toBe(true);
  });
  test("test fn - setIsPaymentForm", () => {
    const Wrapper = mount(PageDashboard, { store, localVue, router });

    Wrapper.vm.setIsPaymentForm(true);
    expect(Wrapper.vm.isPaymentForm).toBe(true);
    Wrapper.vm.setIsPaymentForm(false);
    expect(Wrapper.vm.isPaymentForm).toBe(false);
  });
});
