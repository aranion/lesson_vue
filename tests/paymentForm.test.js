import PaymentForm from "../src/components/PaymentForm.vue";
import { mount, createLocalVue } from "@vue/test-utils";
import { beforeEach, expect, jest, test } from "@jest/globals";
import Vuex from "vuex";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("Test component - Payment Form", () => {
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

  // test("content of test component", () => {
  //   const Wrapper = mount(TestComponent, {
  //     propsData: {
  //       message: "Hello",
  //     },
  //   });
  //   expect(Wrapper.text()).toEqual("Message: Hello");
  // });

  // test("content2", () => {
  //   const Wrapper = mount(TestComponent, {
  //     propsData: {
  //       message: "test",
  //     },
  //   });
  //   expect(Wrapper.text()).toContain("test");
  // });

  test("Form button 'Add category/Back' test", () => {
    const Wrapper = mount(PaymentForm, { store, localVue, router });
    const btn = Wrapper.find(".addCategory");

    btn.trigger("click");
    expect(Wrapper.vm.isAddCategory).toBe(true);
    btn.trigger("click");
    expect(Wrapper.vm.isAddCategory).toBe(false);

    Wrapper.vm.toggleAddCategoryButton(true);
    expect(Wrapper.vm.isAddCategory).toBe(true);
  });

  test("test fn - toggleSaveButton", () => {
    const Wrapper = mount(PaymentForm, { store, localVue, router });

    Wrapper.vm.toggleSaveButton();
    expect(Wrapper.vm.isSaveButton).toBe(true);

    Wrapper.vm.toggleSaveButton(true);
    expect(Wrapper.vm.isSaveButton).toBe(true);

    Wrapper.vm.toggleSaveButton(false);
    expect(Wrapper.vm.isSaveButton).toBe(false);

    // const btn = Wrapper.find("#addCategory");
    // expect(Wrapper.vm.isAddCategory).toBe(true);
    // Wrapper.vm.toggleSaveButton(false);
    // expect(Wrapper.vm.isAddCategory).toBe(true);

    // const btn = Wrapper.find(".formBottomButton button:first-child");
    // const btn = Wrapper.find(".addCategory");
    // Wrapper.vm.toggleAddCategoryButton = jest.fn();
    // btn.trigger("click");
    // const btnAdd = Wrapper.find(".formBottomButton button:last-child");
    // expect(btnAdd.text()).toContain("ADD +");
    // btn.trigger("click");
    // expect(Wrapper.vm.isAddCategory).toBe(false);

    // const btn = Wrapper.find(".buttonAdd");
    // btn.trigger("click");
    // const div = Wrapper.find(".wrapperInput");
    // // input.setValue("Text");
    // expect(Wrapper.vm.toggleAddCategoryButton).toHaveBeenCalled();
  });
});
