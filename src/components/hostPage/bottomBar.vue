<template>
	<div class="bottom-bar lock-mobile-width bg-color-2">
		<button class="next-btn btn-color-green" @click="back()">
			<i class="bi bi-arrow-left-circle-fill"></i> 上一步
		</button>
		<button class="next-btn btn-color-green" @click="next()" :disabled="disableNext">
			下一步 <i class="bi bi-arrow-right-circle-fill"></i>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		disableNext: {
			default: false,
		},
	},
	methods: {
		back: function() {
			this.$emit("back");
		},
		next: function() {
			this.$emit("next");
		},
	},
};
</script>
