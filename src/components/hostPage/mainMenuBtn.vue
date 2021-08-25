<template>
	<div class="main-menu-btn lock-mobile-width" @click="open">
		<div class="flex-center">
			<i class="bi bi-list" style="margin-left: 1px;"></i>
		</div>
	</div>
</template>
<script>
export default {
	name: "mainMenu",
	methods: {
		open: function() {
			this.$emit("click");
		},
	},
};
</script>
