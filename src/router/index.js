import Vue from "vue";
import store from '@/store'
import VueRouter from "vue-router";
import Auth from '@/middlewares/auth'
import NoLogin from '@/middlewares/noLogin'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    meta:{
      middleware: [Auth],
      
    },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/modules/dashboard/views/index.vue"),
  },
  {
    path: "/articles",
    component: () => import(/* webpackChunkName: "about" */ "@/modules/auth/views/layout.vue"),
    children: [
      {
        path: "",
        name: "Article",
        meta:{
          middleware : [ Auth ]
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/modules/article/views/index.vue"),
      },
      {
        path: "create",
        name: "CreateArticle",
        meta:{
          middleware : [ Auth ]
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/modules/article/views/create.vue"),
      },
      {
        path: ":id",
        name: "DetailArticle",
        meta:{
          middleware : [ Auth ]
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/modules/article/views/detail.vue"),
      }
    ],
  },
  {
    path: "/auth",
    component: () => import(/* webpackChunkName: "about" */ "@/modules/auth/views/layout.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        meta:{
          layout : 'auth',
          middleware : [ NoLogin ]
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/modules/auth/views/login.vue"),
      },
      {
        path: "register",
        name: "Register",
        meta:{
          layout : 'auth',
          middleware : [ NoLogin ]
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/modules/auth/views/register.vue"),
      }
    ],
  },
  
];
const emptyFn = () => { }
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(
	location,
	onComplete = emptyFn,
	onAbort = emptyFn,
) {
	return originalPush.call(this, location, onComplete, onAbort)
}
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
    const payload = { to, from, next , store };
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
