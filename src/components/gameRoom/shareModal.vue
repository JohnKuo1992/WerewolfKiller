<template>
	<div v-cloak>
		<div class="modal-mask level-5 p-3">
			<div class="donate-modal-wapper lock-mobile-width">
				<div class="container-sm p-2">
					<div class="row flex-center">
						<div class="mt-4 col-12 text-center fs-4">加入本局遊戲</div>
						<hr class="m-3" />
					</div>
					<div class="row">
						<div class="col-12 flex-center" id="qrcode"></div>
						<div class="col-12 px-3 fs-6 mb-3 mt-2 text-center">
							<div class="ms-1">（ <i class="bi bi-arrow-up-circle-fill"></i> 掃QR code 即可加入本局 ）</div>
						</div>
						<div class="col-12">
							<div class="mt-4">
								<div class="ms-1 text-center">
									<button v-show="!isCopy" class="bdr-12 w-50 ht-40 btn-color-red" @click="share()">
										分享本局連結 <i class="bi bi-box-arrow-up"></i>
									</button>
									<button v-show="isCopy" class="bdr-12 w-50 ht-40 btn-color-wine-red" disabled>
										（ <i class="bi bi-check-circle-fill"></i>已複製本局連結 ）
									</button>
									<p id="copy" style="display: none;">{{ href }}</p>
								</div>
								<div class="mt-2 fs-6 text-center">（ <i class="bi bi-arrow-up-circle-fill"></i> 也可以點我 ）</div>
							</div>
						</div>
					</div>
					<div class="ht-10"></div>
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
	name: "shareModal",
	data: function() {
		return {
			jkospayImg: require("@/assets/img/jkospay.png").default,
			isCopy: false,
			href: window.location.href,
		};
	},
	mounted: function() {
		$("#qrcode").qrcode({
			render: "canvas", //也可以替換為table
			minVersion: 1, // version range somewhere in 1 .. 40
			maxVersion: 40,
			ecLevel: "H", //識別度  'L', 'M', 'Q' or 'H'
			left: 0,
			top: 0,
			size: 200, //尺寸
			width: 210,
			height: 210,
			text: window.location.href, //二維碼內容
			radius: 0.1, // 0.0 .. 0.5
			quiet: 2, //邊距
			mode: 4,
			mSize: 0.2, //圖片大小
			mPosX: 0.5,
			mPosY: 0.5,
			label: "jQuery.qrcode",
			fontname: "sans",
		});
	},
	methods: {
		close: function() {
			this.$parent.isShowShareModal = false;
			this.isCopy = false;
		},
		share: function() {
			if (navigator.share) {
				navigator
					.share({
						title: "狼人殺" + this.$parent.playerNum + "人局",
						text: "邀請你加入狼人殺" + this.$parent.playerNum + "人局！",
						url: window.location.href,
					})
					.then(() => console.log("Successful share"))
					.catch((error) => console.log("Error sharing", error));
			} else {
				window.Clipboard.copy(window.location.href);
				this.isCopy = true;
			}
		},
	},
};
</script>
