import Vue from "vue";
import Vuex from "vuex";
import localStorageAll from "../emulationServer";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemsOnPage: 10,
    targetPage: 1,
    paymentsList: {},
    paymentsListActive: [],
    paymentsListId: [],
    categories: [],
    maxPages: 1,
    fullPrice: 0,
    analyticData: {},
  },
  mutations: {
    //изменяет данные
    setPaymentsListData(state, payload) {
      if (state.paymentsList[`page${state.targetPage}`] === undefined) {
        state.paymentsList[`page${state.targetPage}`] = [];
      }

      state.paymentsList[`page${state.targetPage}`] = [...payload];
      state.paymentsListActive = state.paymentsList[`page${state.targetPage}`];
    },
    setPaymentListAdded(state, data) {
                                       localStorageAll.addPaymentList(data);

                                       const items = state.paymentsListActive;
                                       const idNext =
                                         items.length <= 0
                                           ? 1
                                           : items[items.length - 1].id + 1;
                                       state.targetPage = state.maxPages;

                                       // if (state.paymentsList[`page${state.targetPage}`] === undefined) {
                                       //   state.paymentsList[`page${state.targetPage}`] = [];
                                       // }

                                       if (
                                         state.paymentsList[
                                           `page${state.targetPage}`
                                         ].length >= state.itemsOnPage
                                       ) {
                                         state.maxPages = state.maxPages + 1;
                                         state.paymentsList[
                                           `page${state.maxPages}`
                                         ] = [];
                                         state.paymentsListActive =
                                           state.paymentsList[
                                             `page${state.maxPages}`
                                           ];
                                       }

                                       state.paymentsListActive.push({
                                         id: idNext,
                                         ...data,
                                       });
                                     },
    setPaymentListDel(state, id) {
      localStorageAll.delPaymentItem(id);

      state.paymentsListActive = state.paymentsListActive.filter(
        (el) => el.id !== id
      );
      state.paymentsList[`page${state.targetPage}`] = state.paymentsListActive;
      state.paymentsListId = state.paymentsListId.filter((el) => el.id !== id);

      if (state.paymentsListActive.length === 0) {
        state.maxPages--;
        state.targetPage = state.maxPages;
        state.paymentsListActive = [
          ...state.paymentsList[`page${state.targetPage}`],
        ];
      }
    },
    setPaymentListUpdate(state, payload) {
      localStorageAll.updatePaymentList(payload);

      state.paymentsListActive.forEach((el) => {
        if (el.id === payload.id) {
          el.date = payload.date;
          el.category = payload.category;
          el.price = payload.price;
          return;
        }
      });
    },
    setMaxPages(state, data) {
      state.maxPages = data;
    },
    setTargetPage(state, data) {
      state.targetPage = data;
    },
    setCategories(state, data) {
      state.categories = [...data];
    },
    setCategoriesUpdate(state, data) {
      state.categories.push(data);
      localStorageAll.addCategory(data);
    },
    setFullPrice(state, data) {
      state.fullPrice = data;
    },
    setFullPriceUpdate(state, data = 0) {
      state.fullPrice = state.fullPrice + data;
    },
    setAnalyticData(state, data) {
      state.analyticData = data;
    },
  },
  getters: {
    // отдает данные
    getPaymentsList: (state) => state.paymentsList,
    getPaymentsListActive: (state) => state.paymentsListActive,
    getCategories: (state) => state.categories,
    getTargetPage: (state) => state.targetPage,
    getItemsOnPage: (state) => state.itemsOnPage,
    getMaxPage: (state) => state.maxPages,
    getPaymentsListFullPrice: (state) => state.fullPrice,
    getAnalyticData: (state) => state.analyticData,
  },
  actions: {
    // запросы данных и изменение через мутации
    fetchData({ commit }, page) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const itemsResolve = {
            maxPages: localStorageAll.getMaxPage(this.state.itemsOnPage),
            items: [
              ...localStorageAll.getPages(this.state.itemsOnPage)[
                `page${page}`
              ],
            ],
            fullPrice: localStorageAll.getFullPrice(),
          };
          resolve(itemsResolve);
        }, 500);
      }).then((res) => {
        commit("setPaymentsListData", res.items);
        commit("setMaxPages", res.maxPages);
        commit("setFullPrice", res.fullPrice);
      });
    },
    fetchCategories({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(localStorageAll.categories);
        }, 500);
      }).then((res) => {
        commit("setCategories", res);
      });
    },
    fetchAnalytic({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(localStorageAll.getAnalyticData()), 100);
      }).then((res) => {
        commit("setAnalyticData", res);
      });
    },
  },
});
