<template>
	<div class="modal-mask level-2" @click="close">
		<div class="main-menu lock-mobile-width">
			<div class="container-sm">
				<div v-for="(item, index) in items" :key="index">
					<div v-if="item.isShow" class="row flex-center menu-item" @click="item.click">
						<div class="col-2 text-center flex-center" v-html="item.icon"></div>
						<div class="col-10 p-0" v-html="item.text"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	methods: {
		close: function(e) {
			if (e.target.className.indexOf("modal-mask") >= 0) {
				this.$emit("close");
			}
		},
	},
	computed: {
		items: function() {
			var _this = this;
			return [
				{
					icon: '<i class="bi bi-caret-down-fill"></i>',
					text: "關閉主選單",
					isShow: true,
					click: function() {
						_this.$emit("close");
					},
				},
				{
					icon: `
					<div
								class="btn-color-gold flex-center"
								style="width: 25px; height:25px; background-color: red; border-radius: 30px; box-shadow: none;"
							>
								<i class="bi bi-currency-dollar"></i>
							</div>
					`,
					text: "Donate 贊助支持",
					isShow: true,
					click: function() {
						_this.$parent.isShowDonateModal = true;
					},
				},
				{
					icon: '<i class="bi bi-facebook"></i>',
					text: "Facebook",
					isShow: true,
					click: function() {
						window.open("https://www.facebook.com/wkap.fun", "_blank");
					},
				},
				{
					icon: '<i class="bi bi-arrow-counterclockwise"></i>',
					text: "重新開局",
					isShow: true,
					click: function() {
						sessionStorage.clear();
						localStorage.clear();
						window.onbeforeunload = null;
						window.location.href = window.location.origin + window.location.pathname + "#/";
						_this.$emit("close");
					},
				},
				{
					icon: '<i class="bi bi-pencil-square"></i>',
					text: "玩家筆記（測試中）",
					isShow: true,
					click: function() {
						window.location.href = window.location.origin + window.location.pathname + "#/note";
						_this.$emit("close");
					},
				},
			];
		},
	},
};
</script>
