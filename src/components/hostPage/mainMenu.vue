<template>
	<div class="modal-mask level-2" @click="close">
		<div class="main-menu lock-mobile-width">
			<div class="container-sm">
				<div v-if="item.isShow" v-for="item in items" class="row flex-center menu-item" @click="item.click">
					<div class="col-2 text-center" v-html="item.icon"></div>
					<div class="col-10 p-0" v-html="item.text"></div>
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
					icon: '<i class="bi bi-list"></i>',
					text: "主選單",
					isShow: true,
					click: function() {
						_this.$emit("close");
					},
				},
				{
					icon: '<i class="bi bi-currency-dollar"></i>',
					text: "Donate 贊助支持",
					isShow: true,
					click: function() {
						_this.$parent.$parent.isShow.donateModal = true;
					},
				},
				{
					icon: '<i class="bi bi-facebook"></i>',
					text: "Facebook",
					isShow: true,
					click: function() {
						window.open("https://www.facebook.com/Werewolf.Killer.Note", "_blank");
					},
				},
				{
					icon: '<i class="bi bi-arrow-counterclockwise"></i>',
					text: "重新開局",
					isShow: true,
					click: function() {
						sessionStorage.clear();
						window.onbeforeunload = null;
						location.reload();
					},
				},
			];
		},
	},
};
</script>
