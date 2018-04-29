<template>
<div class="hello">
	<form @submit.prevent="log">
		<input type="text"
		       v-model.trim="pseudo"
		       placeholder="Entrez votre pseudo">
	</form>
</div>

</template>

<script>
export default {
	name: 'HelloWorld',
	data() {
		return {
			pseudo: ''
		}
	},
	methods: {
		log () {
			this.$store.dispatch('initUser', this.pseudo)
				.then(_ => {
					this.goNext();
				});
		},
		goNext () {
			this.$router.push({path: this.$route.query.redirect});
		}
	}
}

</script>

<style scoped="">
h1,
h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
</style>
