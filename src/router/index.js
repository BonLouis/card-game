import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import Login from '@/views/Login'

import store from '@/store';

Vue.use(Router);

const router = new Router({
	routes: [{
		path: '/',
		name: 'HomePage',
		component: HomePage,
		meta: {
			requiresAuth: true
		}
	}, {
		path: '/login',
		component: Login,
		meta: {
			requiresAuth: false
		}
	}]
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!store.getters.userIsLogged) {

			if (!localStorage.getItem('pseudo')) {
				next({
					path: '/login',
					query: {
						redirect: to.fullPath
					}
				})
			} else {
				store.dispatch('initUser', localStorage.getItem('pseudo'))
					.then(_ => {
						next();
					});
			}
		} else {
			next();
		}
	} else {
		next(); // make sure to always call next()!
	}
});

export default router;