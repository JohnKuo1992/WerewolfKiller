<template>
	<div
		class="player-btn-container text-center color-clould col-4"
		:class="{'selected-btn': isSelected || isAnimation}"
		@click="btnClick(player)"
	>
		<div
			class="player-btn overflow-hidden"
			:class="{
				'click-animation': isAnimation,
				selected: isSelected,
			}"
		>
			<div class="name-tag flex-center mb-1">
				<div class="number-tag fs-6 p-1 flex-center fw-bolder color-deep-gray" :class="{'is-dead': !player.isAlive}">
					{{ player.key }}
				</div>
				<div class="col-12 fs-8 px-1 overflow-hidden" style="white-space: nowrap;">({{ playerName }})</div>
			</div>

			<div v-if="player.identity != ''" class="fs-7" style="display: inline-flex;">
				<!-- <i class="bi bi-flag-fill" :class="_.get(roleCard, [player.identity, 'position'], '') + '-color'"></i> -->

				<!-- <div
					v-if="player.identity == 'witch'"
					class="mark flex-center"
					:class="{used: isUsedAntidote}"
					style="background-color: #1ABC9C"
				>
					<i class="bi bi-droplet-fill"></i>
				</div>
				<div
					v-if="player.identity == 'witch'"
					class="mark flex-center"
					:class="{used: isUsedPoison}"
					style="background-color: #9b59b6"
				>
					<i class="bi bi-droplet"></i>
				</div> -->

				<span class="role-tag" :class="_.get(roleCard, [player.identity, 'camp'], '')">{{
					_.get(roleCard, [player.identity, "text"], "")
				}}</span>
			</div>
		</div>
		<div v-if="!player.isAlive" class="death-tag px-2">
			<div></div>
		</div>

		<div v-if="true" class="border-tag px-2" :class="{'kill-tag': tonight.killedByWerewolves == index}">
			<div></div>
		</div>

		<div class="mark-tag px-2">
			<div class="fs-8 flex-center text-center">
				<div v-if="tonight.defendByGuard == index" class="mark flex-center" style="background-color: #ffd32a">
					<i class="bi bi-shield-fill" style="color: white;"></i>
				</div>
				<div v-if="tonight.sleepByWolfBeauty == index" class="mark flex-center" style="background-color: #ef5777">
					<i class="bi bi-heart-fill"></i>
				</div>
				<div v-if="tonight.savedByWitch == index" class="mark flex-center" style="background-color: #1ABC9C">
					<i class="bi bi-droplet-fill"></i>
				</div>
				<div v-if="tonight.poisonedbyWitch == index" class="mark flex-center" style="background-color: #9b59b6">
					<i class="bi bi-droplet"></i>
				</div>
				<div v-if="tonight.verifiedBySeer == index" class="mark flex-center" style="background-color: #0fbcf9">
					<i class="bi bi-eye-fill"></i>
				</div>
				<div v-if="tonight.counterattackByGhost == index" class="mark flex-center" style="background-color: #ee5253">
					<i class="bi bi-arrow-bar-right"></i>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		index: {
			isRequired: true,
		},
		value: {
			isRequired: true,
			default: [],
		},
		player: {
			isRequired: true,
		},
		playerName: {
			isRequired: true,
		},
		roleCard: {
			isRequired: true,
		},
		disableBtn: {
			isRequired: true,
		},
		tonight: {
			isRequired: true,
		},
		isUsedAntidote: {
			isRequired: true,
		},
	},
	data: function() {
		return {
			isAnimation: false,
		};
	},
	computed: {
		isSelected: function() {
			return _.indexOf(this.value, this.player.key) >= 0;
		},
	},
	methods: {
		btnClick: function() {
			if (!this.player.isAlive) {
				return;
			}
			this.isAnimation = true;
			setTimeout(() => {
				this.isAnimation = false;
			}, 100);
			if (this.disableBtn) {
				return;
			}

			var selected = _.cloneDeep(this.value);

			if (this.isSelected) {
				_.pull(selected, this.player.key);
			} else {
				selected.push(this.player.key);
			}
			this.$emit("input", selected);
		},
	},
};
</script>
