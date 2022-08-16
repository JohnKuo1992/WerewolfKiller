<template>
	<div class="flex-center ht-50">
		<div class="col-3 p-0 flex-center justify-content-end ht-50">
			<button class="count-btn btn-color-white fs-5" @click="subtract" :disabled="value <= min">
				<i class="bi bi-caret-left-fill"></i>
			</button>
		</div>
		<div v-if="value == 0" class="col-6 p-0 fs-5 flex-center ht-50">警長競選階段</div>
		<div v-else class="col-6 p-0 fs-5 flex-center ht-50">第 {{ value }} 天</div>
		<div class="col-3 p-0 flex-center justify-content-start ht-50">
			<button class="count-btn btn-color-white fs-5" @click="add" :disabled="value >= max || disableAdd">
				<i class="bi bi-caret-right-fill"></i>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "changeDayBtn",
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
