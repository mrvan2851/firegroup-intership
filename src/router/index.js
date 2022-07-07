import Vue from "vue";
import VueRouter from "vue-router";
import Auth from '@/middlewares/auth'
import OnBoard from '@/middlewares/onboard'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    meta:{
      middleware: [Auth , OnBoard],
      
    },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/modules/dashboard/views/index.vue"),
  },
  {
    path: "/articles",
    component: () => import(/* webpackChunkName: "about" */ "@/modules/article/views/layout.vue"),
    children: [
      {
        path: "",
        name: "Article",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/modules/article/views/index.vue"),
      },
      {
        path: "create",
        name: "CreateArticle",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/modules/article/views/create.vue"),
      },
      {
        path: ":id",
        name: "DetailArticle",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/modules/article/views/detail.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta:{
      layout : 'auth'
    },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/modules/auth/views/login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
  scrollBehavior: function (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
router.beforeEach(async (to, from, next) => {
  if (to.meta.middleware) {
    const middleware = to.meta.middleware;
    const payload = { to, from, next };
    let preventNext = false;
    for (let i = 0; i < middleware.length; i++) {
      const result = await middleware[i](payload);
      if (!result) {
        preventNext = true;
        break;
      }
    }
    if (preventNext) {
      return;
    }
  }
  next();
});

export default router;
