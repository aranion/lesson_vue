import Vue from "vue";
import Router from "vue-router";


import PageDashboard from "../pages/PageDashboard";
import PageAbout from "../pages/PageAbout";
import Page404 from "../pages/Page404";
// const PageDashboard = "../pages/PageDashboard";
// const PageAbout = "../pages/PageAbout";
// const Page404 = "../pages/Page404";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      component: PageDashboard,
      // component: () => import(PageDashboard),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: PageDashboard,
      // component: () => import(PageDashboard),
    },
    {
      path: "/dashboard/add/payment/*",
      name: "dashboardAddForm",
      component: PageDashboard,
      // component: () => import(PageDashboard),
    },
    {
      path: "/about",
      name: "about",
      component: PageAbout,
      // component: () => import(PageAbout),
    },
    {
      path: "/*",
      name: "NotFound",
      component: Page404,
      // component: () => import(Page404),
    },
  ],
});

const titles = {
  main: "Welcome to dashboard!",
  dashboard: "Welcome to dashboard!",
  dashboardAddForm: "Welcome to dashboard!",
  about: "About us",
  NotFound: "Page not found",
};

// до перехода
// router.beforeEach((to, from, next) => {
//   console.log(to, from, next);
// });

// после перехода
router.afterEach((to, from) => {
  // console.log(to, from);
  from;
  document.title = titles[to.name];
});

export default router;
