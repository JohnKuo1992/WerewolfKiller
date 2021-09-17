<template>
	<div class="main-menu-btn lock-mobile-width">
		<div class="ht-50 flex-center" style="width: 50px;">
			<div class="flex-center main-menu-btn-click" @click="open">
				<i class="bi bi-list" style="margin-left: 1px;"></i>
			</div>
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
