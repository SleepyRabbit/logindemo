/**
 * Created by houenxing on 17/1/19.
 */
'use strict';

//import your components here

import login from '../../components/login.vue';
import logout from '../../components/logout.vue';
import home from '../../components/home.vue';
import like from '../../components/like.vue';
import hate from '../../components/hate.vue';

//import your children components here

import bar from '../../components/list/bar.vue';
import cart from '../../components/list/cart.vue';
import chart from '../../components/list/chart.vue';
import dashboard from '../../components/list/dashboard.vue';
import devcenter from '../../components/list/devcenter.vue';

export default [
  {
    path: '/home',
    name: 'home',
    component: home,
    redirect: {path: '/home/dashboard'},      //进入home页面后自动重新定位至/home/dashboard
    children: [
      {
        path: 'bar',
        name: 'bar',
        component: bar,
      },
      {
        path: 'chart',
        name: 'chart',
        component: chart,
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: dashboard,
      },
      {
        path: 'cart',
        name: 'cart',
        component: cart,
      },
      {
        path: 'devcenter',
        name: 'devcenter',
        component: devcenter,
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/logout',
    name: 'logout',
    component: logout,
  },
  {
    path: '/like',
    name: 'like',
    component: like,
  },
  {
    path: '/hate',
    name: 'hate',
    component: hate,
  },
  {
    path: '*',
    redirect: {path: '/home'}
  },
]
