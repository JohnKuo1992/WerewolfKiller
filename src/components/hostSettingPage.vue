<template>
	<div id="hostSettingPage" class="day" v-cloak>
		<div class="container-sm lock-mobile-width bg-color-2 min-vh-100">
			<div class="row">
				<div class="ht-40"></div>
				<div class="flex-center text-center fs-2">
					【 狼人殺 輔助程式 】
				</div>
				<div class="col-11 offset-1 p-2 fs-7">
					<i class="bi bi-check2-circle"></i>QR code 自動發牌<br />（沒帶到牌也能玩）<br />
					<i class="bi bi-check2-circle"></i>主持人<span class="under-line">逐步輔助</span>、<span class="under-line"
						>避免出錯</span
					><br />（新手也能輕鬆主持）

					<br />
					<br />
					最近更新時間：2021/09/02
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

						<div class="flex-center">
							<div class="col-12 text-start fs-6 px-3">設定組合</div>
						</div>

						<div>
							<div class="board bg-color-1 p-2 m-2">
								<div class="p-2">
									<div class="col-12 text-start fs-6">套用組合</div>
									<div class="col-12 select-btn flex-center justify-content-start my-2 px-3" @click="showBoard = true">
										<span>{{ _.get(recommendedSetting, [playerNum, chooseSet, "title"], "") }}</span
										><i class="bi bi-caret-down-fill"></i>
									</div>
								</div>
								<div class="row text-center flex-center align-items-start">
									<div class="col-6 p-0">
										【狼人陣營】
										<div class="px-3"><hr class="my-1" /></div>
										<div v-for="(role, roleID) in roleCard" :key="roleID + 'bad'">
											<div v-if="role.camp == 'bad'" class="flex-center pb-1" style="position: relative;">
												<template v-if="roleID == 'werewolves'">
													<div
														@click="joinRole(roleID)"
														class="role-btn mx-2 my-1 flex-center"
														:class="{
															'wolves-bg-color': countOfRole[roleID] >= 1,
															disable: disableAdd && countOfRole[roleID] == 0,
														}"
													>
														{{ role.text }}
														<div v-if="countOfRole[roleID] >= 1" class="pb-1 role-num-tag flex-center">
															<span class="fs-7">x{{ countOfRole[roleID] }}</span>
														</div>
													</div>
													<template v-if="countOfRole[roleID] > 0">
														<div v-if="!disableAdd" class="add-tag flex-center fs-7" @click="countOfRole[roleID] += 1">
															<div class="flex-center">+</div>
														</div>
														<div v-if="disableAdd" class="add-tag flex-center fs-7 disabled">
															<div class="flex-center">+</div>
														</div>
														<div class="subtract-tag flex-center fs-7" @click="countOfRole[roleID] -= 1">
															<div class="flex-center">-</div>
														</div>
													</template>
												</template>
												<template v-else>
													<div
														@click="joinRole(roleID)"
														class="role-btn mx-2 my-1 flex-center"
														:class="{
															'wolves-bg-color': countOfRole[roleID] >= 1,
															disabled: disableAdd && countOfRole[roleID] == 0,
														}"
													>
														{{ role.text }}
													</div>
												</template>
											</div>
										</div>
									</div>
									<div class="col-6 p-0">
										【 好人陣營】
										<div class="px-3"><hr class="my-1" /></div>
										<div v-for="(role, roleID) in roleCard" :key="roleID">
											<div v-if="role.camp == 'good'" class="flex-center pb-1">
												<template v-if="roleID == 'villagers'">
													<div
														class="role-btn mx-2 my-1 flex-center"
														:class="{
															'villagers-bg-color': villagers >= 1,
															disabled: villagers == 0,
														}"
													>
														{{ role.text }}
														<div v-if="villagers >= 1" class="pb-1 role-num-tag flex-center">
															<span class="fs-7">x{{ villagers }}</span>
														</div>
													</div>
												</template>
												<template v-else>
													<div
														@click="joinRole(roleID)"
														class="role-btn mx-2 my-1 flex-center"
														:class="{
															'priesthood-bg-color': countOfRole[roleID] >= 1,
															disabled: disableAdd && countOfRole[roleID] == 0,
														}"
													>
														{{ role.text }}
													</div>
												</template>
											</div>
										</div>
									</div>
									<div class="ht-20"></div>
									<div class="mt-2 text-end px-4">
										<hr class="m-0" />
										{{ sumText }}
									</div>

									<div class="ht-10"></div>
									<div class="mt-2 text-start px-4" style="color: gray;">
										<input type="checkbox" disabled="true" /> 警長（開發中）
										<!-- <input type="checkbox" disabled="true" v-model="rule.hasSheriff" /> 警長（開發中） -->
										<!-- <hr class="m-0" /> -->
									</div>

									<template v-if="countOfRole.witch >= 1 || countOfRole.werewolvesKing >= 1">
										<div class="mt-2 text-start px-4">
											【特殊設定】
											<hr class="m-0" />
										</div>

										<div class="row">
											<div v-if="countOfRole.witch >= 1" class="col-6" style="text-align: left;">
												<div>
													<input
														id="wR1"
														type="radio"
														v-model="rule.witchRule"
														value="onlyFirst"
														:disabled="countOfRole.witch == 0"
													/>
													<label for="wR1"
														><span class="fs-7"> 女巫<span class="under-line">第一晚</span>可自救</span></label
													>
												</div>
												<div>
													<input
														id="wR2"
														type="radio"
														v-model="rule.witchRule"
														value="canNot"
														:disabled="countOfRole.witch == 0"
													/>
													<label for="wR2"
														><span class="fs-7"> 女巫全程<span class="under-line">不可自救</span></span></label
													>
												</div>
												<div>
													<input
														id="wR3"
														type="radio"
														v-model="rule.witchRule"
														value="allCan"
														:disabled="countOfRole.witch == 0"
													/>
													<label for="wR3"><span class="fs-7"> 女巫全程可自救</span></label>
												</div>
											</div>

											<div v-if="countOfRole.werewolvesKing >= 1" class="col-6" style="text-align: left;">
												<div>
													<input
														id="kR2"
														type="radio"
														v-model="rule.werewolvesKingRule"
														value="suicideCanKill"
														:disabled="countOfRole.werewolvesKing == 0"
													/>
													<label for="kR2"><span class="fs-7"> 狼王自爆可帶人</span></label>
												</div>
												<div>
													<input
														id="kR1"
														type="radio"
														v-model="rule.werewolvesKingRule"
														value="suicideCanNotKill"
														:disabled="countOfRole.werewolvesKing == 0"
													/>
													<label for="kR1"><span class="fs-7"> 狼王自爆不可帶人</span></label>
												</div>
											</div>
										</div>
									</template>

									<div class="mt-2 text-start px-4">
										【狼隊獲勝條件】
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
		<div v-if="showBoard" class="modal-mask">
			<div class="lock-mobile-width">
				<div class="board-modal-title col-12 p-3" style="background-color: white;">
					<div class="col-12 text-center flex-center mt-3 fs-2">套用推薦組合</div>
					<div class="text-center flex-center mt-3">
						<div class="col-6 fs-5">遊戲人數</div>
						<div class="col-6 row">
							<count-btn v-model="chooseNum" :max="15" :min="6"></count-btn>
						</div>
					</div>
				</div>
				<div class="board-modal-content flex-center align-items-start">
					<div class="col-12 px-3">
						<div v-for="(setting, index) in recommendedSetting[chooseNum]" :key="index" @click="setChooseSet(index)">
							<board class="board bg-color-1 p-2 my-3 col-12" :setting="setting" :role-card="roleCard"></board>
						</div>
					</div>
				</div>
				<div class="board-modal-bottom ht-60 col-12 p-2">
					<button class="btn-submit text-center" @click="showBoard = false">關&ensp;閉</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import countBtn from "@/components/hostSettingPage/countBtn.vue";
import board from "@/components/hostSettingPage/board.vue";
import {
	VICTORY_CON,
	WEREWOLVES_KING_RULE,
	WITCH_SELF_HELP_CON,
	SHERIFF_RULE,
	roleCard,
	recommendedSetting,
} from "@/assets/js/const.js";

export default {
	components: {
		countBtn,
		board,
	},
	data: function() {
		return {
			showBoard: false,
			roleCard: roleCard,
			recommendedSetting: recommendedSetting,
			chooseSet: 0,
			chooseNum: 0,
			playerNum: 0,
			countOfRole: {},
			rule: {
				hasSheriff: false,
				sheriffRule: "",
				witchRule: WITCH_SELF_HELP_CON.ONLY_FIRST,
				victoryCon: VICTORY_CON.KILL_SIDE,
				werewolvesKingRule: WEREWOLVES_KING_RULE.SUICIDE_CAN_NOT_KILL,
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
				this.chooseNum = val;

				var recommendData = _.get(
					this,
					["recommendedSetting", val, this.chooseSet],
					_.get(this, ["recommendedSetting", val, 0], {})
				);

				this.applyData(recommendData);
			},
		},
	},
	methods: {
		applyData: function(data) {
			if (_.size(data) <= 0) {
				return;
			}
			this.initCountOfRole();
			_.forEach(data.countOfRole, (count, roleID) => {
				this.countOfRole[roleID] = count;
			});

			_.forEach(data.rule, (ruleValue, ruleID) => {
				this.rule[ruleID] = ruleValue;
			});
		},
		initCountOfRole: function() {
			var tempObj = {};
			_.forEach(this.roleCard, (role) => {
				tempObj[role.id] = 0;
			});

			this.countOfRole = tempObj;
		},
		setChooseSet: function(index) {
			this.chooseSet = index;

			if (this.chooseNum == this.playerNum) {
				var chooseData = _.get(this, ["recommendedSetting", this.playerNum, index], {});
				this.applyData(chooseData);
			} else {
				this.playerNum = this.chooseNum;
			}
			this.showBoard = false;
		},
		joinRole: function(roleID) {
			if (this.countOfRole[roleID] == 0) {
				if (this.disableAdd) {
					return;
				}
				this.countOfRole[roleID] = 1;
			} else {
				this.countOfRole[roleID] = 0;
			}
		},
		licensing: function(countOfRole) {
			//發牌
			var arr = [];
			_.forEach(countOfRole, (count, role) => {
				for (var i = 0; i < count; i++) {
					arr.push(role);
				}
			});
			// 洗牌
			_.forEach(arr, (role, index) => {
				var randonIndex = _.random(0, arr.length - 1);
				var temp = arr[index];
				arr[index] = arr[randonIndex];
				arr[randonIndex] = temp;
			});

			console.log(arr);
		},
		submit: function() {
			this.countOfRole.villagers = this.villagers;
			this.$parent.$refs.hostPage.playerNum = _.cloneDeep(this.playerNum);
			this.$parent.$refs.hostPage.countOfRole = _.cloneDeep(this.countOfRole);
			this.$parent.$refs.hostPage.rule = _.cloneDeep(this.rule);

			this.licensing(this.$parent.$refs.hostPage.countOfRole);
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
			return roleTotalNum >= this.playerNum ? true : false;
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
		sumText: function() {
			var wolvesCount = 0;
			var priesthoodCount = 0;
			_.forEach(this.countOfRole, (roleCount, roleID) => {
				if (this.roleCard[roleID].position == "wolves") {
					wolvesCount += roleCount;
				} else if (this.roleCard[roleID].position == "priesthood") {
					priesthoodCount += roleCount;
				}
			});
			return (
				this.playerNum +
				"人 = " +
				wolvesCount +
				"狼 + " +
				priesthoodCount +
				"神 + " +
				(this.playerNum - wolvesCount - priesthoodCount) +
				"民"
			);
		},
	},
};
</script>
