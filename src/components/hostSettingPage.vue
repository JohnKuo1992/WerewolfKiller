<template>
	<div id="hostSettingPage" class="day" v-cloak>
		<div class="container-sm lock-mobile-width bg-color-2 min-vh-100">
			<div class="row">
				<div class="ht-40"></div>
				<div class="flex-center text-center fs-2">
					【 狼人殺 輔助程式 】
				</div>
				<div class="col-11 offset-1 p-2 fs-7">
					這是提供狼人殺主持人可以<br />
					<span class="under-line">方便紀錄</span> 以及 <span class="under-line">避免出錯</span>的小幫手 <br />
					之後會推出給玩家使用的<span class="under-line">玩家筆記</span>小幫手 <br />
					敬請期待～<br />
					<br />
					最近更新時間：2021/08/24
				</div>
				<div class="ht-30"></div>

				<div class="container">
					<div class="row">
						<div class="text-center flex-center">
							<div class="col-6 fs-5">遊戲人數</div>
							<div class="col-6 row">
								<count-btn v-model="playerNum" :max="15" :min="6"></count-btn>
							</div>
						</div>
						<div class="ht-20"></div>

						<!-- 推薦組合 -->
						<div v-if="_.get(recommendedSetting, [playerNum], []).length > 0" class="flex-center">
							<div class="col-12 text-start fs-6 px-3">推薦組合</div>
						</div>

						<div v-for="(setting, index) in recommendedSetting[playerNum]" :key="index" @click="setChooseSet(index)">
							<board
								class="board bg-color-1 p-2 m-2"
								:class="{selected: chooseSet == index}"
								:setting="setting"
								:role-card="roleCard"
							></board>
						</div>
						<div class="ht-10"></div>

						<!-- 自訂 -->
						<div class="flex-center">
							<div class="col-12 text-start fs-6 px-3">使用自訂</div>
						</div>

						<div @click="setChooseSet('custom')">
							<div class="board bg-color-1 p-2 m-2" :class="{selected: chooseSet == 'custom'}">
								<div class="row text-center flex-center">
									<div class="my-1">
										【狼人陣營】
										<hr class="my-1" />
									</div>
									<div v-for="(role, roleID) in roleCard" :key="roleID + 'bad'">
										<div v-if="role.camp == 'bad'" class="flex-center pb-1">
											<div class="col-5 offset-1">{{ role.text }}</div>
											<div class="col-5">
												<count-btn
													v-model="countOfRole[roleID]"
													:disable-add="disableAdd"
													:max="roleID == 'werewolves' ? playerNum : 1"
												></count-btn>
											</div>
											<div class="col-1"></div>
										</div>
									</div>
									<div class="ht-10"></div>
									<div class="my-1">
										【好人陣營】
										<hr class="my-1" />
									</div>
									<div v-for="(role, roleID) in roleCard" :key="roleID">
										<div v-if="role.camp == 'good'" class="flex-center pb-1">
											<template v-if="roleID == 'villagers'">
												<div class="col-5 offset-1">{{ role.text }}</div>
												<div class="col-5">
													{{ villagers }}
												</div>
												<div class="col-1"></div>
											</template>
											<template v-else>
												<div class="col-5 offset-1">{{ role.text }}</div>
												<div class="col-5">
													<count-btn v-model="countOfRole[roleID]" :disable-add="disableAdd"></count-btn>
												</div>
												<div class="col-1"></div>
											</template>
										</div>
										<div v-if="roleID == 'witch'" class="col-9 offset-3">
											<div style="text-align: left;">
												<div>
													<input
														id="wR1"
														type="radio"
														v-model="rule.witchRule"
														value="onlyFirst"
														:disabled="countOfRole.witch == 0"
													/>
													<label for="wR1"><span class="fs-7"> 第一晚可自救</span></label>
												</div>
												<div>
													<input
														id="wR2"
														type="radio"
														v-model="rule.witchRule"
														value="canNot"
														:disabled="countOfRole.witch == 0"
													/>
													<label for="wR2"><span class="fs-7"> 全程不可自救</span></label>
												</div>
												<div>
													<input
														id="wR3"
														type="radio"
														v-model="rule.witchRule"
														value="allCan"
														:disabled="countOfRole.witch == 0"
													/>
													<label for="wR3"><span class="fs-7"> 全程可自救</span></label>
												</div>
											</div>
											<div class="ht-10"></div>
										</div>
									</div>
									<div class="mt-2 text-start px-4" style="color: gray;">
										<input type="checkbox" disabled="true" v-model="rule.hasSheriff" /> 警長（開發中）
										<hr class="m-0" />
									</div>
									<div class="text-start px-4" style="color: gray;">
										<input
											type="radio"
											class="fs-7"
											v-model="rule.sheriffRule"
											value="1"
											:disabled="!rule.hasSheriff"
										/>
										<span class="fs-7"> 單爆吞警徽</span>
										<br />
										<input type="radio" v-model="rule.sheriffRule" value="2" :disabled="!rule.hasSheriff" />
										<span class="fs-7"> 雙爆吞警徽</span>
									</div>
									<div class="mt-2 text-start px-4">
										【獲勝條件】
										<hr class="m-0" />
									</div>

									<div class="text-start px-4">
										<div class="col-12">
											<input id="vC1" type="radio" v-model="rule.victoryCon" value="killSide" />
											<label for="vC1">屠邊<span class="fs-7">（神職全死 或 平民全死）</span></label>
										</div>
										<div class="col-12">
											<input id="vC2" type="radio" v-model="rule.victoryCon" value="killAll" />
											<label for="vC2">屠城<span class="fs-7">（好人全死）</span></label>
										</div>
									</div>
									<div class="ht-10"></div>
								</div>
							</div>
						</div>

						<div class="ht-60 my-1"></div>
						<div class="submit-bar lock-mobile-width ht-60 p-2">
							<button class="btn-submit text-center btn-color-green" @click="submit">開&ensp;始</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import countBtn from "@/components/hostSettingPage/countBtn.vue";
import board from "@/components/hostSettingPage/board.vue";
import {VICTORY_CON, WITCH_SELF_HELP_CON, SHERIFF_RULE, roleCard, recommendedSetting} from "@/assets/js/const.js";

export default {
	components: {
		countBtn,
		board,
	},
	data: function() {
		return {
			roleCard: roleCard,
			recommendedSetting: recommendedSetting,
			chooseSet: 0,
			playerNum: 0,
			countOfRole: {},
			rule: {
				hasSheriff: false,
				sheriffRule: "",
				witchRule: WITCH_SELF_HELP_CON.ONLY_FIRST,
				victoryCon: VICTORY_CON.KILL_SIDE,
			},
		};
	},
	created: function() {
		this.initCountOfRole();
		this.playerNum = 12;
	},
	watch: {
		playerNum: {
			immediate: true,
			handler(val) {
				var defaultData = _.get(this, ["recommendedSetting", val, 0], {});
				if (_.size(defaultData) <= 0) {
					this.chooseSet = "custom";
					return;
				}
				this.chooseSet = "0";

				this.initCountOfRole();
				_.forEach(defaultData.countOfRole, (count, roleID) => {
					this.countOfRole[roleID] = count;
				});

				this.rule = _.cloneDeep(defaultData.rule);
			},
		},
	},
	methods: {
		initCountOfRole: function() {
			var tempObj = {};
			_.forEach(this.roleCard, (role) => {
				tempObj[role.id] = 0;
			});

			this.countOfRole = tempObj;
		},
		setChooseSet: function(index) {
			this.chooseSet = index;
		},
		submit: function() {
			if (this.chooseSet == "custom") {
				this.$parent.$refs.hostPage.playerNum = _.cloneDeep(this.playerNum);
				this.$parent.$refs.hostPage.countOfRole = _.cloneDeep(this.countOfRole);
				this.$parent.$refs.hostPage.rule = _.cloneDeep(this.rule);
			} else {
				var _this = this;
				var chooseData = _.get(this, ["recommendedSetting", this.playerNum, this.chooseSet], {});

				this.$parent.$refs.hostPage.playerNum = _.cloneDeep(this.playerNum);
				this.$parent.$refs.hostPage.countOfRole = _.cloneDeep(chooseData.countOfRole);
				this.$parent.$refs.hostPage.rule = _.cloneDeep(chooseData.rule);
			}

			this.$parent.isShow.hostPage = true;
			this.$parent.isShow.hostSettingPage = false;
			this.$parent.$refs.hostPage.initPlayer();
		},
	},
	computed: {
		disableAdd: function() {
			var roleTotalNum = _.sum(
				_.values(
					_.reject(this.countOfRole, function(o, key) {
						return key == "villagers";
					})
				)
			);
			return roleTotalNum + 1 >= this.playerNum ? true : false;
		},
		villagers: function() {
			return (
				this.playerNum -
				_.sum(
					_.values(
						_.reject(this.countOfRole, function(o, key) {
							return key == "villagers";
						})
					)
				)
			);
		},
	},
};
</script>
