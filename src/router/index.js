import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import test from '@/components/test'

import store from '@/store';
const { user } = store.state;

console.log(user);

Vue.use( Router );

const router = new Router( {
	routes: [ {
		path: '/',
		name: 'HomePage',
		component: HomePage,
		meta: {
			requiresAuth: true
		}
	}, {
		path: '/login',
		component: test,
	} ]
} );

router.beforeEach( ( to, from, next ) => {
	if ( to.matched.some( record => record.meta.requiresAuth ) ) {
		debugger;
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if ( !user.isConnected ) {
			next( {
				path: '/login',
				query: { redirect: to.fullPath }
			} )
		} else {
			next()
		}
	} else {
		next() // make sure to always call next()!
	}
} );

export default router;