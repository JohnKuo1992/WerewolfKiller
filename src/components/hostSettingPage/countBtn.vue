<template>
	<div class="flex-center ht-30">
		<div class="col-4 p-0">
			<button class="count-btn btn-color-green fs-5" @click="subtract" :disabled="value <= min">
				<i class="bi bi-dash"></i>
			</button>
		</div>
		<div class="col-4 p-0 fs-5">{{ value }}</div>
		<div class="col-4 p-0">
			<button class="count-btn btn-color-green fs-5" @click="add" :disabled="value >= max || disableAdd">
				<i class="bi bi-plus"></i>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "countBtn",
	props: {
		value: {
			type: Number,
			default: 12,
		},
		max: {
			type: Number,
			default: 1,
		},
		min: {
			type: Number,
			default: 0,
		},
		disableAdd: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		add: function() {
			this.$emit("input", this.value + 1);
		},
		subtract: function() {
			this.$emit("input", this.value - 1);
		},
	},
};
</script>
