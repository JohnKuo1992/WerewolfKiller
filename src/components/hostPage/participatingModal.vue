<template>
	<modal>
		<!-- if !stage -->
		<div slot="header">請點選要參選的玩家</div>

		<!-- if stage -->
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
						selected: _.indexOf(target, key) != -1,
						disable: !player.isAlive,
					}"
				>
					{{ key }}
				</div>
			</div>
			<!-- <div class="modal-body-mask"></div> -->
		</div>

		<div slot="footer" class="text-center flex-center ht-50">
			<button class="modal-btn btn-color-white" @click="submit(false)">無人參選</button>
			<button class="modal-btn btn-color-white" @click="submit(true)">確定</button>
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
			target: [],
			roleCard: roleCard,
			participatingPlayers: [],
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
			if (!player.isAlive) {
				return;
			}
			if (_.indexOf(this.target, key) != -1) {
				this.target = _.remove(this.target, (n) => {
					return n != key;
				});
			} else {
				this.target.push(key);
			}
		},
		submit: function(boolean) {
			if (boolean && this.target.length == 0) {
				return;
			}
			var data = [];

			if (boolean) {
				data = this.target;
			} else {
				data = [];
			}

			this.$emit(
				"submit",
				data.sort(function(a, b) {
					return a - b;
				})
			);
		},
	},
};
</script>
