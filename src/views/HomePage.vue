<template>
<div class="main-container">
	
	<Chat id="chat"/>

	<h1>Bienvenue, {{ $store.getters.userName }} </h1>

</div>

</template>

<script>
import Chat from '@/components/Chat'
export default {
	name: 'HomePage',
	data() {
		return {
			dots: '...'
		}
	},

	methods: {

	},
	created() {
	},
	components: {
		Chat
	}
}

</script>

<style scoped="">
	.main-container {
		height: 100vh;
		display: grid;
		grid-template-columns: 250px 1fr;
	}
</style>
