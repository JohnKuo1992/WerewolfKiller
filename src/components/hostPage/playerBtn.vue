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
			<div class="name-tag flex-center">
				<span v-if="player.name" class="fs-7">{{ player.name }}</span>
				<div class="number-tag fiexd-top fs-6 p-1 flex-center fw-bolder color-deep-gray" :class="{'is-dead': !isAlive}">
					{{ index }}
				</div>
			</div>
			<div class="col-12 flex-center">
				<div
					v-if="identity != ''"
					class="role-tag b-shadow-3 bdr-7 fs-7 px-1 overflow-hidden bg-color-black-g"
					style="white-space: nowrap;"
				>
					<i class="bi bi-record-fill fs-8" :class="_.get(roleCard, [identity, 'position'], '') + '-color'"></i>
					{{ _.get(roleCard, [identity, "text"], "") }}
				</div>
			</div>
		</div>
		<div v-if="!isAlive" class="death-tag">
			<div></div>
		</div>

		<div class="mark-tag">
			<div class="fs-8 flex-center text-center">
				<!-- had change -->
				<div
					v-if="changedByMagician[index] == undefined && magicianHadChanged[index] != undefined"
					class="mark expired flex-center"
				>
					<i class="bi bi-arrow-left-right"></i>
				</div>
				<!-- last defend -->
				<div
					v-if="guardLastDefend == index && defendByGuard != index"
					class="mark expired flex-center"
					style="background-color: #ffd32a"
				>
					<i class="bi bi-shield-fill"></i>
				</div>
				<!-- last sleep -->
				<div
					v-if="wolfBeautyLastSleep == index && sleepByWolfBeauty != index"
					class="mark expired flex-center"
					style="background-color: #ef5777"
				>
					<i class="bi bi-heart-fill"></i>
				</div>

				<div
					class="flex-center px-1"
					:class="{
						'change-tag': changedByMagician[index] != undefined,
						expired: changedByMagician[index] != undefined && isChangeExpired,
					}"
				>
					<template v-if="changedByMagician[index] != undefined">
						<i class="bi bi-arrow-left-right" style="margin-right:1px;"></i
						><span class="me-1">{{ magicianHadChanged[index] }}</span>
					</template>
					<div v-if="defendByGuard == index" class="mark flex-center" style="background-color: #ffd32a">
						<i class="bi bi-shield-fill" style="color: white;"></i>
					</div>

					<div v-if="killedByWerewolves == index" class="mark flex-center" style="background-color: #ee5253">
						<img :src="knifeImg" width="12" height="12" alt="" />
					</div>
					<div v-if="sleepByWolfBeauty == index" class="mark flex-center" style="background-color: #ef5777">
						<i class="bi bi-heart-fill" style="color: white;"></i>
					</div>
					<div v-if="savedByWitch == index" class="mark flex-center" style="background-color: #1ABC9C">
						<i class="bi bi-droplet-fill" style="color: white;"></i>
					</div>
					<div v-if="poisonedByWitch == index" class="mark flex-center" style="background-color: #9b59b6">
						<i class="bi bi-droplet" style="color: white;"></i>
					</div>
					<div v-if="verifiedBySeer == index" class="mark flex-center" style="background-color: #0fbcf9">
						<i class="bi bi-eye-fill" style="color: white;"></i>
					</div>
					<div
						v-if="counterattackByGhost == index"
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
		value: {
			isRequired: true,
			default: [],
		},
		isShow: {
			default: true,
		},
		index: {
			isRequired: true,
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
		changedByMagician: {
			isRequired: true,
		},
		defendByGuard: {
			isRequired: true,
		},
		killedByWerewolves: {
			isRequired: true,
		},
		sleepByWolfBeauty: {
			isRequired: true,
		},
		savedByWitch: {
			isRequired: true,
		},
		poisonedByWitch: {
			isRequired: true,
		},
		verifiedBySeer: {
			isRequired: true,
		},
		counterattackByGhost: {
			isRequired: true,
		},
		magicianHadChanged: {
			isRequired: true,
		},
		isChangeExpired: {
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
			knifeImg: require("@/assets/img/knife.svg").default,
		};
	},
	computed: {
		isSelected: function() {
			return _.indexOf(this.value, this.player.key) >= 0;
		},
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
