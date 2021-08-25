<template>
	<modal>
		<div slot="header">
			設定玩家姓名
		</div>
		<div slot="body">
			<div class="row m-1" v-for="(player, index) in value" :key="index">
				<div class="col-3 p-0 name-title flex-center">{{ player.key }}號：</div>
				<div class="col-9 p-0">
					<input class="name-input" type="text" v-model="player.name" />
				</div>
			</div>
			<div class="modal-body-mask"></div>
		</div>
		<div slot="footer" class="text-center flex-center ht-50">
			<button class="modal-btn btn-color-green" @click="close">儲存關閉</button>
		</div>
	</modal>
</template>

<script>
import modal from "@/components/hostPage/modal.vue";

export default {
	components: {modal},
	props: {
		value: {
			isRequired: true,
		},
	},
	methods: {
		close: function() {
			this.save();
			this.$emit("close");
		},
		save: function() {
			this.$emit("input", this.value);
		},
	},
};
</script>
