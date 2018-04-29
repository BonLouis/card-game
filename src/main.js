// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';

// import sockets from '@/sockets';
import router from '@/router';
import store from '@/store';

import VueSocketio from 'vue-socket.io';

Vue.use( VueSocketio, 'http://localhost:3030', store );

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue( {
	el: '#app',
	components: { App },
	template: '<App/>',

	// sockets,
	router,
	store
} )