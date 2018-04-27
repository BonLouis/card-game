import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
	state: { // = data
		user: {isConnected: false}
	},
	getters: { // = computed

	},
	actions: { // = methods
		socket_testAction: (a) => {
			console.log('action', a);
		},
		socket_connect: () => {
			console.log('action');
		}
	},
	mutations: { // = update state
		SOCKET_CONNECT: (state, status) => {
			console.log('mutation');
			state.user.isConnected = true;
		},
		SOCKET_DISCONNECT: (state) => {
			state.user.connected = false;
		}
	},
	modules: {

	}
})
