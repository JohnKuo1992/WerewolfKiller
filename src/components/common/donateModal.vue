<template>
	<div v-cloak>
		<div class="modal-mask level-5 p-3">
			<div class="donate-modal-wapper lock-mobile-width">
				<div class="container-sm p-2">
					<div class="row flex-center">
						<div class="mt-4 col-12 text-center fs-4">贊助支持</div>
						<hr class="m-1" />
					</div>
					<div class="row">
						<div class="w-100 fs-7 text-center mt-1">
							你喜歡這個程式嗎？<br />歡迎透過一杯咖啡的錢<br />來贊助支持我們<br />我們會繼續努力
						</div>
					</div>
					<div class="ht-40"></div>
					<div class="row">
						<div class="w-100 text-center fs-6">
							小額贊助方式
						</div>
					</div>
					<div class="ht-10"></div>
					<div class="row">
						<div class="w-100 text-center">
							<div>
								<a class="pay-img" href="https://www.jkopay.com/transfer?j=Transfer:900533530" target="_blank">
									<img class="pay-img" :src="jkospayImg" />
								</a>
							</div>
							<div class="mt-1">
								<span class="fs-7">（不限金額，10塊也能贊助哦！）</span>
							</div>
						</div>
					</div>
					<div class="ht-20"></div>
					<div class="row">
						<div class="w-100 text-center">
							<div>
								<a href="https://www.buymeacoffee.com/johnkuo" target="_blank">
									<img
										src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
										alt="Buy Me A Coffee"
										style="height: 60px !important;width: 217px !important;"
									/>
								</a>
							</div>
							<div class="mt-1">
								<span class="fs-7">（透過PayPal使用信用卡，最低1美元）</span>
							</div>
						</div>
					</div>
					<div class="w-100 text-center flex-center my-4" @click="close">
						<button class="bdr-12 w-50 ht-40 btn-color-light-red">關閉</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "donateModal",
	data: function() {
		return {
			jkospayImg: require("@/assets/img/jkospay.png").default,
		};
	},
	methods: {
		close: function() {
			this.$parent.isShowDonateModal = false;
		},
	},
};
</script>
