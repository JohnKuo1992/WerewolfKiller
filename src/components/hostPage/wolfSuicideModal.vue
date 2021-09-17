<template>
	<modal>
		<!-- if !stage -->
		<div v-if="stage != 'speaking'" slot="header">狼人自爆</div>
		<div v-if="stage != 'speaking'" slot="body" class="text-center">
			僅能在白天發言階段使用。
		</div>
		<div v-if="stage != 'speaking'" slot="footer" class="text-center flex-center ht-50">
			<button class="modal-btn btn-color-white" @click="close">關閉</button>
		</div>

		<!-- if stage -->
		<div v-if="stage == 'speaking'" slot="header">請選擇自爆的狼人</div>
		<div v-if="stage == 'speaking'" slot="body">
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
						selected: target == key,
						disable:
							!player.isAlive ||
							_.get(roleCard, [player.identity, 'camp'], '') === 'good' ||
							_.get(roleCard, [player.identity, 'id'], '') === 'ghostRider' ||
							_.get(roleCard, [player.identity, 'id'], '') === 'wolfBeauty',
					}"
				>
					{{ key }}
				</div>
			</div>
			<!-- <div class="modal-body-mask"></div> -->
		</div>

		<div v-if="stage == 'speaking'" slot="footer" class="text-center flex-center ht-50">
			<button class="modal-btn btn-color-white" @click="submit(target)">確定</button>
			<button class="modal-btn btn-color-white" @click="close">取消</button>
		</div>
	</modal>
</template>

<script>
import Modal from "@/components/hostPage/modal.vue";
import {roleCard} from "@/assets/js/const.js";

export default {
	components: {Modal},
	data: function() {
		return {
			target: "",
			roleCard: roleCard,
		};
	},
	props: {
		stage: {
			default: "",
		},
		players: {
			default: {},
		},
	},
	methods: {
		close: function() {
			this.$emit("close");
		},
		clickBtn: function(player, key) {
			if (!player.isAlive || _.get(this.roleCard, [player.identity, "camp"], "") === "good") {
				return;
			}
			this.target = key;
		},
		submit: function(index) {
			this.$emit("submit", index);
		},
	},
};
</script>
