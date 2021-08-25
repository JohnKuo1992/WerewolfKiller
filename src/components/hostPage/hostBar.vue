<template>
	<div class="host-bar text-center lock-mobile-width bg-color-2">
		<div class="container-sm">
			<transition name="slide-fade" mode="out-in">
				<div v-if="hostMessage" :key="hostMessage" class="host-message text-center fs-3">
					<div class="host-text-arrow"></div>
					<div v-html="hostMessage"></div>
				</div>
				<div v-if="!hostMessage" style="height: 80px;"></div>
			</transition>
			<div class="judge-icon">
				<i class="bi bi-person-fill"></i>
			</div>
			<div v-if="hostTips" :key="hostTips" class="fade-in">
				<div class="host-tips text-center" v-html="hostTips"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "hostBar",
	props: {
		hostMessage: {
			default: "",
		},
		hostTips: {
			default: "",
		},
	},
};
</script>
