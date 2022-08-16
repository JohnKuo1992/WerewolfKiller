<template>
	<div v-cloak>
		<div class="modal-mask day level-2">
			<div class="modal-wrapper flex-center p-3 lock-mobile-width">
				<div class="introduce-modal-container" style="width: calc(100vw - 30px); height: calc(100vh - 100px);">
					<div class="modal-header-custom">
						<div class="row">
							記錄投票
						</div>
					</div>
					<hr class="my-2" />
					<div class="introduce-modal-body-custom" style="height: calc(100vh - 250px);">
						<div class="col-12 p-2">
							<change-day-btn v-model="day" :max="9"></change-day-btn>

							<div v-for="i in playerNum" :key="i" class="col-12 ht-40 flex-center px-2">
								<div class="col-2 text-end">{{ i }}號</div>
								<div class="col-10 p-1 mx-1">
									<select ref="myBtn" v-model="voteOption[i]" class="bdr-7 name-text-input px-2">
										<option value="pass">pass</option>
										<option v-for="y in playerNum" :key="i + '-' + y" :value="_.toString(y)" :disabled="i == y">{{
											y
										}}</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer-custom m-1">
						<div class="ht-50 flex-center">
							<div class="col-4 mx-1">
								<button class="btn-color-yellow bdr-7 ht-30 w-100" @click="cancel">
									<i class="bi bi-x-circle"></i> 取消
								</button>
							</div>
							<div class="col-4 mx-1">
								<button class="btn-color-yellow bdr-7 ht-30 w-100" @click="close">
									<i class="bi bi-check-circle-fill"></i> 儲存
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
import changeDayBtn from "@/components/note/changeDayBtn.vue";

export default {
	name: "voteModal",
	components: {changeDayBtn},
	props: {
		playerNum: {
			isRequired: true,
		},
		voteData: {
			isRequired: true,
		},
		propDay: {
			type: Number,
			isRequired: true,
			default: 1,
		},
	},
	data: function() {
		return {
			day: 1,
			voteOption: {},
			emptyOptionTemp: {},
		};
	},
	watch: {
		playerNum: function() {
			this.initOptionTemplate();
		},
		propDay: function(n, o) {
			if (n != o) {
				this.day = n;
			}
		},
		day: function(n, o) {
			if (n != o) {
				this.$emit("saveDay", n);
				this.initOption();
			}
		},
	},
	mounted: function() {
		this.initOptionTemplate();
		this.initOption();
	},
	methods: {
		initOptionTemplate: function() {
			var template = {};
			for (var i = 1; i <= this.playerNum; i++) {
				template[i] = "";
			}
			this.emptyOptionTemp = template;
		},
		initOption: function() {
			this.voteOption = _.cloneDeep(_.get(this.voteData, [this.day], this.emptyOptionTemp));
		},
		close: function() {
			var saveData = _.cloneDeep(this.voteData);
			saveData[this.day] = _.cloneDeep(this.voteOption);
			this.$emit("saveVote", saveData);
			this.$parent.isShowVoteModal = false;
		},
		cancel: function() {
			this.$parent.isShowVoteModal = false;
		},
	},
};
</script>
