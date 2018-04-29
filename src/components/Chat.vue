<template>
	<div class="container">
		<div id="msg-container">
			<div class="in-msg">Message entrant</div>
			<div class="out-msg">Message sortant</div>
			<div class="in-msg">Message entrant</div>
			<div class="out-msg">Message sortant</div>
			<div class="in-msg">Message entrant</div>
			<div class="out-msg">Message sortant</div>
		</div>
		<input type="text" placeholder="Votre message">
	</div>
</template>

<script>
	
</script>

<style scoped>
	.container {
		position: relative;
		background-color: #ccc;
	}
	input {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
	}
	.msg-container {

	}
	.in-msg, .out-msg {
		border: 1px solid #fff;
		border-radius: 10px;
		padding: 0.5rem 1rem;
	}
	.in-msg {
		background-color: #fff;
		border: 1px solid #000;
	}
	.out-msg {

	}

</style>