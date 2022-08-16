<template>
	<div v-cloak>
		<div class="modal-mask day level-2">
			<div class="modal-wrapper flex-center p-3 lock-mobile-width" style="margin-top: 20vh;">
				<div class="introduce-modal-container" style="width: calc(90vw - 30px);">
					<div class="modal-header-custom">
						<div class="flex-center fs-7">歡迎使用 狼人殺輔助程式 筆記功能</div>
					</div>
					<hr class="my-2" />
					<div class="introduce-modal-body-custom">
						<div class="col-12 flex-center mt-2 mb-3">
							<div class="col-8 text-center">
								<div class="my-3">共有幾位玩家？</div>
								<count-btn v-model="playerNum" :max="20" :min="3"></count-btn>
							</div>
						</div>
						<div class="col-12 flex-center"></div>
					</div>
					<div class="modal-footer-custom m-1">
						<div class="ht-50 flex-center">
							<div class="col-4 mx-1">
								<button class="btn-color-yellow bdr-7 ht-30 w-100" @click="close">
									<i class="bi bi-check-circle-fill"></i> 確定
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import countBtn from "@/components/hostSettingPage/countBtn.vue";

export default {
	name: "setPlayerModal",
	components: {countBtn},
	props: {
		value: {
			type: Number,
			default: 12,
		},
	},
	watch: {
		value: function(n, o) {
			if (n != o) {
				this.playerNum = n;
			}
		},
	},
	data: function() {
		return {
			playerNum: 12,
		};
	},
	mounted: function() {
		this.playerNum = this.value;
	},
	methods: {
		close: function() {
			this.$emit("savePlayerNum", this.playerNum);
			this.$parent.isShowSetPlayerModal = false;
		},
	},
};
</script>
