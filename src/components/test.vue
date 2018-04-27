<template>
<div class="hello">
	<h1>{{ msg }}</h1>
	<button @click="loggin">click</button>
</div>

</template>

<script>
export default {
	name: 'HelloWorld',
	data() {
		return {
			msg: 'Login pag dud'
		}
	},
	methods: {
		loggin: function() {
			console.log('wanna loggin dude')
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
