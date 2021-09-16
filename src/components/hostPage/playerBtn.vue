<template>
	<div
		v-if="isShow"
		class="player-btn-container text-center color-clould col-12 mt-2"
		:class="{'selected-btn': isAnimation}"
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
				<div class="number-tag fiexd-top fs-6 p-1 flex-center fw-bolder color-deep-gray" :class="{'is-dead': !isAlive}">
					{{ index }}
				</div>
				<div v-if="identity != ''" class="role-tag col-12 fs-7 px-1 overflow-hidden" style="white-space: nowrap;">
					<i class="bi bi-record-fill fs-8" :class="_.get(roleCard, [identity, 'position'], '') + '-color'"></i>
					{{ _.get(roleCard, [identity, "text"], "") }}
				</div>
			</div>
		</div>
		<div v-if="!isAlive" class="death-tag">
			<div></div>
		</div>

		<div class="mark-tag px-2">
			<div class="fs-8 flex-center text-center">
				<!-- had change -->
				<div
					v-if="tonight.changedByMagician[index] == undefined && magicianHadChanged[index] != undefined"
					class="flex-center px-1 change-tag expired mx-1"
				>
					<i class="bi bi-arrow-left-right" style="margin-right:1px;"></i><span>{{ magicianHadChanged[index] }}</span>
				</div>
				<!-- last defend -->
				<div
					v-if="guardLastDefend == index && tonight.defendByGuard != index"
					class="mark expired flex-center me-1"
					style="background-color: #ffd32a"
				>
					<i class="bi bi-shield-fill" style="color: white;"></i>
				</div>
				<!-- last sleep -->
				<div
					v-if="wolfBeautyLastSleep == index && tonight.sleepByWolfBeauty != index"
					class="mark expired flex-center me-1"
					style="background-color: #ef5777"
				>
					<i class="bi bi-heart-fill" style="color: white;"></i>
				</div>

				<div
					class="flex-center px-1"
					:class="{
						'change-tag': tonight.changedByMagician[index] != undefined,
						expired: tonight.changedByMagician[index] != undefined && isChangeExpired,
					}"
				>
					<template v-if="tonight.changedByMagician[index] != undefined">
						<i class="bi bi-arrow-left-right" style="margin-right:1px;"></i
						><span class="me-1">{{ magicianHadChanged[index] }}</span>
					</template>
					<div v-if="tonight.defendByGuard == index" class="mark flex-center" style="background-color: #ffd32a">
						<i class="bi bi-shield-fill" style="color: white;"></i>
					</div>

					<div v-if="tonight.killedByWerewolves == index" class="mark flex-center" style="background-color: #ee5253">
						<img :src="knifeImg" width="12" height="12" alt="" />
					</div>
					<div v-if="tonight.sleepByWolfBeauty == index" class="mark flex-center" style="background-color: #ef5777">
						<i class="bi bi-heart-fill" style="color: white;"></i>
					</div>

					<div v-if="tonight.savedByWitch == index" class="mark flex-center" style="background-color: #1ABC9C">
						<i class="bi bi-droplet-fill" style="color: white;"></i>
					</div>
					<div v-if="tonight.poisonedByWitch == index" class="mark flex-center" style="background-color: #9b59b6">
						<i class="bi bi-droplet" style="color: white;"></i>
					</div>
					<div v-if="tonight.verifiedBySeer == index" class="mark flex-center" style="background-color: #0fbcf9">
						<i class="bi bi-eye-fill" style="color: white;"></i>
					</div>
					<div
						v-if="tonight.counterattackByGhost == index"
						class="mark flex-center px-1 fs-8"
						style="background-color: #ee5253; color: white;"
					>
						反傷
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		isShow: {
			default: true,
		},
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
		isAlive: {
			isRequired: true,
		},
		identity: {
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
		magicianHadChanged: {
			isRequired: true,
		},
		isChangeExpired: {
			isRequired: true,
		},
		savedByWitch: {
			isRequired: true,
		},
		poisonedByWitch: {
			isRequired: true,
		},
		counterattackByGhost: {
			isRequired: true,
		},
		guardLastDefend: {
			isRequired: true,
		},
		wolfBeautyLastSleep: {
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
		// isChangeExpired: function() {
		// 	return (
		// 		this.tonight.changedByMagician[this.index] == undefined && this.magicianHadChanged[this.index] != undefined
		// 	);
		// },
	},
	methods: {
		btnClick: function() {
			if (!this.isAlive) {
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
