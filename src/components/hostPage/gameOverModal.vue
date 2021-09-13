<template>
	<modal>
		<div slot="header" class="fs-3">{{ gameOverTitle }}</div>
		<div slot="body" class="text-center">
			你喜歡這個程式嗎？<br />歡迎透過一杯咖啡的錢<br />來贊助支持我們<br />我們會繼續努力
		</div>
		<div slot="footer" class="flex-center">
			<button @click="openDonate" class="bdr-12 ht-40 w-100 btn-color-gold">
				<i class="bi bi-heart-fill"></i> 我願意小額贊助
			</button>
		</div>
	</modal>
</template>

<script>
import Modal from "@/components/hostPage/modal.vue";
export default {
	components: {Modal},
	props: {
		gameOverTitle: {
			default: "",
		},
	},
	methods: {
		openDonate: function() {
			this.$emit("openDonate");
		},
	},
};
</script>
