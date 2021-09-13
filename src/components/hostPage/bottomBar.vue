<template>
	<div class="bottom-bar lock-mobile-width bg-color-red row">
		<div class="col-6 flex-center m-0 p-0" style="border-right: 1px solid #ffffff85;">
			<button class="next-btn p-0" @click="back()">
				<span><i class="bi bi-skip-start-fill"></i> 復原</span>
			</button>
		</div>
		<div class="col-6 m-0 p-0" style="border-left: 1px solid #ffffff85;">
			<button class="next-btn p-0" @click="next()" :disabled="disableNext">
				<span>下一步 <i class="bi bi-skip-end-fill"></i></span>
			</button>
		</div>
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
