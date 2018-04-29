import Vuex from 'vuex'
import Vue from 'vue'
import { strToMap } from 'utils'
Vue.use(Vuex)

/*
 Set consts
 */
const
	SET_PSEUDO = 'SET_PSEUDO',
	SET_STATUS = 'SET_STATUS',
	SET_PLAYING_STATE = 'SET_PLAYING_STATE',
	SOCKET_GIVE_ID = 'SOCKET_GIVE_ID',
	SOCKET_ADD_USER = 'SOCKET_ADD_USER';




export default new Vuex.Store({
	strict: true,
	state: { // = data
		user: {
			pseudo: '',
			status: 'offline',
			playing: false,
			id: '' // socket.id
		},
		users: new Map()
	},
	getters: { // = computed
		userIsLogged: (state) => !!state.user.pseudo,
		userName: (state) => state.user.pseudo
	},
	mutations: { // = update state
		[SET_PSEUDO] (state, pseudo) {
			state.user.pseudo = pseudo;
		},
		[SET_STATUS] (state, status) {
			state.user.status = status;
		},
		[SET_PLAYING_STATE] (state, playingState) {
			state.user.playing = playingState;
		},
		/**
		 * Sockets mutations
		 */
		[SOCKET_GIVE_ID] (state, socketID) {
			state.user.id = socketID;
		},
		[SOCKET_ADD_USER] (state, map) {
			state.users = strToMap(map);
		}
	},
	actions: { // = methods
		initUser ({dispatch, state}, pseudo) {
			return new Promise(resolveAll => {
				Promise.all([
					dispatch('setPseudo', pseudo),
					dispatch('setStatus', 'online')
					])
				.then(values => {
					localStorage.setItem('pseudo', pseudo);

					// hack to be sure that id is defined
					// before sending profile
					this._vm.$socket.emit('ask_id', () => {
						this._vm.$socket.emit('post_user', state.user);
						resolveAll();
					});
				});
			});
		},
		setPseudo: ({commit}, pseudo) => {
			return new Promise(resolve => {
				commit('SET_PSEUDO', pseudo);
				resolve(pseudo);
			});
		},
		setStatus: ({commit}, status) => {
			return new Promise(resolve => {
				commit('SET_STATUS', status);
				resolve(status);
			});
		}
	},
	modules: {

	}
})
