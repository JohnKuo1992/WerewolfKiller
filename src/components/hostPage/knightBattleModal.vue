<template>
	<modal>
		<template v-if="stage != 'speaking'">
			<div slot="header">騎士查驗</div>
			<div slot="body" class="text-center">
				僅能在白天發言階段使用。
			</div>
			<div slot="footer" class="text-center flex-center ht-50">
				<button class="modal-btn btn-color-green" @click="close">關閉</button>
			</div>
		</template>
		<template v-if="stage == 'speaking' && !checkIsAlive()">
			<div slot="header">騎士查驗</div>
			<div slot="body" class="text-center">
				本場騎士已出局。
			</div>
			<div slot="footer" class="text-center flex-center ht-50">
				<button class="modal-btn btn-color-green" @click="close">關閉</button>
			</div>
		</template>
		<template v-if="stage == 'speaking' && checkIsAlive()">
			<div slot="header">請選擇騎士查驗對象</div>
			<div slot="body">
				<div
					v-for="(player, key) in players"
					:key="key"
					class="col-2"
					style="display: inline-block;"
					@click="clickBtn(player, key)"
				>
					<div
						class="modal-player-btn"
						style="width: 30px; height: 30px;"
						:class="{
							selected: key == target,
							disable: !player.isAlive || key == knightPlayerIndex,
						}"
					>
						{{ key }}
					</div>
				</div>
				<!-- <div class="modal-body-mask"></div> -->
			</div>
			<div slot="footer" class="text-center flex-center ht-50">
				<button class="modal-btn btn-color-white" @click="submit(target)">確定</button>
				<button class="modal-btn btn-color-white" @click="close">取消</button>
			</div>
		</template>
	</modal>
</template>

<script>
import Modal from "@/components/hostPage/modal.vue";
export default {
	components: {Modal},
	data: function() {
		return {
			target: "",
		};
	},
	props: {
		stage: {
			default: "",
		},
		players: {
			default: {},
		},
		knightPlayerIndex: {
			default: "",
		},
	},
	methods: {
		close: function() {
			this.$emit("close");
		},
		clickBtn: function(player, key) {
			if (!player.isAlive || key == this.knightPlayerIndex) {
				return;
			}
			this.target = key;
		},
		submit: function(index) {
			this.$emit("submit", index);
		},
		checkIsAlive: function() {
			if (this.knightPlayerIndex != 0 && _.get(this, ["players", this.knightPlayerIndex, "isAlive"])) {
				return true;
			} else {
				return false;
			}
		},
	},
};
</script>
