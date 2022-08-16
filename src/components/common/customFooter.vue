<template>
	<div>
		<div class="col-12 color-clould flex-center fs-8">by</div>

		<div class="col-12 color-clould flex-center fs-7">狼人殺 輔助程式</div>
		<div class="col-12 flex-center color-clould">
			<span class="fs-7">https://wkap.fun</span>
		</div>
		<div class="ht-20"></div>

		<div class="col-12 flex-center">
			<div class="col-3 offset-3 flex-center color-clould">
				<div
					class="flex-center"
					style="width: 40px; height:40px; border-radius: 30px; box-shadow: none;"
					@click="facebook"
				>
					<i class="bi bi-facebook" style="font-size:39px;"></i>
				</div>
			</div>
			<div class="col-3 flex-center">
				<div
					class="btn-color-gold flex-center"
					style="width: 40px; height:40px;border-radius: 30px; box-shadow: none;"
					@click="donate"
				>
					<i class="bi bi-currency-dollar" style="font-size:20px;"></i>
				</div>
			</div>
			<div class="col-3 flex-center"></div>
		</div>

		<div class="ht-60"></div>
	</div>
</template>

<script>
export default {
	methods: {
		facebook: function() {
			window.open("https://www.facebook.com/wkap.fun", "_blank");
		},
		donate: function() {
			this.$parent.isShowDonateModal = true;
		},
	},
};
</script>
