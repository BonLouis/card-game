import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import axios from 'axios';

import store from '@/store';

Vue.use( VueSocketio, 'http://localhost:3030', store );

// export default {
// 	test: function ( val ) {
// 		console.log( 'this method was fired by the socket server. data:', val )
// 	}
// }