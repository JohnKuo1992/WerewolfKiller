<template>
	<div
		class="player-btn-container text-center color-clould col-4"
		:class="{'selected-btn': isSelected || isAnimation}"
		v-on:click="btnClick(player)"
	>
		<div class="player-btn p-2" :class="{'click-animation': isAnimation, selected: isSelected}">
			<div class="overflow-hidden">
				<span class="number">{{ player.key }}</span>
				<br />
				<span class="fs-7">({{ playerName }})</span>
				<br />
			</div>
		</div>
		<div v-if="!player.isAlive" class="death-tag p-2">
			<div></div>
		</div>
		<div v-if="!!_.get(this.killTag, [this.player.key], false)" class="kill-tag p-2">
			<div></div>
		</div>
		<div v-if="player.identity != ''" class="role-tag p-2">
			<div class="fs-7">
				<i class="bi bi-flag-fill" :class="_.get(roleCard, [player.identity, 'position'], '') + '-color'"></i>
				&nbsp;{{ _.get(roleCard, [player.identity, "text"], "") }}
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
		killTag: {
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
			this.isAnimation = true;
			setTimeout(() => {
				this.isAnimation = false;
			}, 100);
			if (this.disableBtn || !this.player.isAlive) {
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
