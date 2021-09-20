<template>
	<div class="modal-mask day level-2">
		<div class="modal-wrapper flex-center p-3 lock-mobile-width">
			<div class="introduce-modal-container" style="width: calc(100vw - 30px); height: calc(100vh - 200px);">
				<div class="col-12 flex-center justify-content-end">
					<button class="btn-color-light-red bdr-7 ht-30" @click="close"><i class="bi bi-save"></i> 儲存關閉</button>
				</div>

				<div class="modal-header-custom">
					填寫玩家名稱
				</div>
				<div class="introduce-modal-body-custom" style="height: calc(100vh - 330px);">
					<div v-for="i in playerNum" :key="i" class="col-12 ht-40 flex-center px-2">
						<div class="col-2 text-end">{{ i }}號</div>
						<div class="col-10 p-1 mx-1">
							<input v-model="nameObj[i]" type="text" class="bdr-7 name-text-input px-2" :placeholder="i + '號玩家'" />
						</div>
					</div>
					<div class="ht-40"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {roleCard, roleIntroduction} from "@/assets/js/const.js";

export default {
	props: {
		playerNum: {
			default: 0,
		},
	},
	data: function() {
		return {
			nameObj: {},
			roleCard: roleCard,
			roleIntroduction: roleIntroduction,
		};
	},
	watch: {},
	methods: {
		close: function() {
			this.$emit("saveName", this.nameObj);
			this.$emit("close");
		},
	},
};
</script>
