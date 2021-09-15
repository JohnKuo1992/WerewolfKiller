<template>
	<div id="hostSettingPage" class="color-deep-gray" v-cloak>
		<main-menu-btn @click="isShowMainMenu = true"></main-menu-btn>
		<main-menu v-show="isShowMainMenu" @close="isShowMainMenu = false"></main-menu>
		<donateModal v-show="isShowDonateModal" />
		<div class="container-sm lock-mobile-width main-bg-color min-vh-100">
			<div class="row">
				<div class="container p-3">
					<div class="col-12 mt-3 color-clould">
						<div class="ht-20"></div>
						<div class="flex-center text-center fs-2">
							【 狼人殺 輔助程式 】
						</div>
						<div>
							<hr />
						</div>

						<div class="col-11 offset-1 px-3 fs-7">
							<div style="display: flex;">
								<div class="fs-4">
									<i class="bi bi-check2-circle"></i>
								</div>
								<div class="ms-2">QR code 自動發牌<br />(沒帶到牌也能玩)<br /></div>
							</div>
							<div class="mt-2" style="display: flex;">
								<div class="fs-4">
									<i class="bi bi-check2-circle"></i>
								</div>
								<div class="ms-2">
									主持人<span class="under-line">逐步輔助</span>、<span class="under-line">不怕念錯</span
									><br />(新手也能輕鬆主持)
								</div>
							</div>
							<div class="ht-30"></div>
							<div class="text-end pb-2">
								<span class="">最近更新時間：2021/09/13</span>
							</div>
						</div>
					</div>
				</div>
				<div class="container px-3 py-2">
					<div class="board bg-color-white-t-lv2 p-2">
						<div class="text-center flex-center mt-3">
							<div class="col-6 fs-5">遊戲人數</div>
							<div class="col-6 row">
								<count-btn v-model="playerNum" :max="15" :min="6"></count-btn>
							</div>
						</div>
						<div class="ht-20"></div>
						<div class="p-2">
							<div class="col-12 text-start fs-6">套用組合</div>
							<div
								class="col-12 select-btn flex-center justify-content-start my-2 px-3"
								@click="showBoard = true"
								style="background-color: #ffffff;"
							>
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
												v-if="countOfRole[roleID] == 0"
												@click="joinRole(roleID)"
												class="role-btn mx-2 my-1 flex-center"
												:class="{
													'wolves-bg-color': countOfRole[roleID] >= 1,
													disable: disableAdd && countOfRole[roleID] == 0,
												}"
											>
												{{ role.text }}
											</div>
											<div
												v-else
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
												<template v-if="countOfRole[roleID] > 0">
													<button
														style="right: -40px;"
														class="add-tag flex-center fs-7"
														:class="{disabled: disableAdd}"
														:disabled="disableAdd"
														@click="countOfRole[roleID] += 1"
													>
														<div class="flex-center">+</div>
													</button>
													<button
														style="left: -40px;"
														class="subtract-tag flex-center fs-7"
														@click="countOfRole[roleID] -= 1"
													>
														<div class="flex-center">-</div>
													</button>
												</template>
											</div>
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

							<div class="ht-20"></div>
							<div class="mt-2 text-start flex-center" style="color: rgb(185 185 185);">
								<div class="col-6 text-end pe-1 fs-6"><span class="fs-7">（開發中）</span> 警長：</div>
								<div class="col-6">
									<div class="text-start">
										<select
											class="fs-7 px-1"
											style="border-radius: 7px;height: 30px; width:100%; background-color: #bbbbbb; color: gray;"
											disabled="true"
										>
											<option value="">開發中敬請期待</option>
											<option value="">雙爆吞警徽</option>
											<option value="">單爆吞警徽</option>
										</select>
									</div>
								</div>
							</div>

							<div class="mt-2 text-start flex-center">
								<div class="col-6 text-end pe-1">狼隊獲勝條件：</div>
								<div class="col-6">
									<div class="text-start">
										<select
											class="fs-7 px-1"
											v-model="rule.victoryCon"
											style="border-radius: 7px;height: 30px; width:100%; background-color: #ffffff;"
										>
											<option value="KS">屠邊（神職全死 或 平民全死）</option>
											<option value="KA">屠城（好人全死）</option>
										</select>
									</div>
								</div>
							</div>

							<div class="ht-20"></div>
							<template v-if="countOfRole.witch >= 1 || countOfRole.werewolvesKing >= 1">
								<div class="mt-2 text-center px-4">
									【特殊設定】
									<hr class="m-0" />
								</div>
								<div v-if="countOfRole.witch >= 1" class="mt-2 text-start flex-center">
									<div class="col-6 text-end pe-1">女巫自救：</div>
									<div class="col-6">
										<div class="text-start">
											<select
												v-if="countOfRole.witch >= 1"
												class="fs-7 px-1"
												v-model="rule.witchRule"
												style="border-radius: 7px;height: 30px; width:100%; background-color: #ffffff;"
											>
												<option value="OF">第一晚可自救</option>
												<option value="CN">全程不可自救</option>
												<option value="AC">全程可自救</option>
											</select>
										</div>
									</div>
								</div>

								<div v-if="countOfRole.werewolvesKing >= 1" class="mt-2 text-start flex-center">
									<div class="col-6 text-end pe-1">狼王自爆：</div>
									<div class="col-6">
										<div class="text-start">
											<select
												v-if="countOfRole.werewolvesKing >= 1"
												class="fs-7 px-1"
												v-model="rule.werewolvesKingRule"
												style="border-radius: 7px;height: 30px; width:100%; background-color: #ffffff;"
											>
												<option value="CK">自爆可帶人</option>
												<option value="CNK">自爆不可帶人</option>
											</select>
										</div>
									</div>
								</div>
								<div class="ht-10"></div>
							</template>
						</div>
					</div>
					<div class="ht-50 my-1"></div>
				</div>
				<div class="submit-bar flex-center bg-color-red lock-mobile-width ht-50 p-2" @click="submit">
					<span class="color-clould fs-4">開&ensp;始</span>
				</div>
			</div>
		</div>
		<div v-if="showBoard" class="modal-mask">
			<div class="lock-mobile-width">
				<div class="board-modal-title lock-mobile-width col-12 p-3 bg-color-light-red b-shadow-2">
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
						<div class="ht-60"></div>
						<div class="ht-60"></div>
						<div class="ht-10"></div>
						<div v-for="(setting, index) in recommendedSetting[chooseNum]" :key="index" @click="setChooseSet(index)">
							<board
								class="board b-shadow-4 bg-color-light-red p-2 my-3 col-12"
								:setting="setting"
								:role-card="roleCard"
							></board>
						</div>
						<div class="ht-30"></div>
						<div class="ht-50"></div>
					</div>
				</div>
				<div
					class="board-modal-bottom bg-color-wine-red b-shadow-5 lock-mobile-width ht-50 col-12 p-2 flex-center"
					@click="showBoard = false"
				>
					<span class="color-clould fs-4">關&ensp;閉</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MainMenuBtn from "@/components/hostPage/mainMenuBtn.vue";
import MainMenu from "@/components/hostPage/mainMenu.vue";
import donateModal from "@/components/common/donateModal.vue";

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
		MainMenuBtn,
		MainMenu,
		donateModal,
		countBtn,
		board,
	},
	data: function() {
		return {
			isShowMainMenu: false,
			isShowDonateModal: false,
			showBoard: false,
			roleCard: roleCard,
			recommendedSetting: recommendedSetting,
			chooseSet: 0,
			chooseNum: 0,
			playerNum: 0,
			countOfRole: {},
			rule: {
				victoryCon: VICTORY_CON.KILL_SIDE,
				hasSheriff: false,
				sheriffRule: "",
				witchRule: WITCH_SELF_HELP_CON.ONLY_FIRST,
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
					arr.push(this.roleCard[role].urlShorthand);
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
			var urlData = {
				p: _.join(arr, ""),
				r: _.join(_.values(this.rule)),
			};

			window.location.href =
				window.location.origin + window.location.pathname + "#/gameRoom/" + encodeURIComponent(JSON.stringify(urlData));
			window.document.documentElement.scrollTop = 0;
		},
		submit: function() {
			this.countOfRole.villagers = this.villagers;
			this.licensing(this.countOfRole);
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
