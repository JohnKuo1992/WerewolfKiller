<template>
	<div id="hostPage" :class="timeStatus" v-cloak>
		<div class="main-menu-btn lock-mobile-width">
			<div class="flex-center" @click="mainMenu">
				<i class="bi bi-list" style="margin-left: 1px;"></i>
			</div>
		</div>

		<div class="header-bar text-center lock-mobile-width bg-color-2">
			<div class="container-sm">
				<transition name="slide-fade" mode="out-in">
					<div v-if="hostMessage" :key="hostMessage" class="host-message text-center">
						<div class="host-text-arrow"></div>
						<div v-html="hostMessage"></div>
					</div>
					<div v-if="!hostMessage" style="height: 80px;"></div>
				</transition>
				<div class="judge-icon">
					<i class="bi bi-person-fill"></i>
				</div>
				<div v-if="hostTips" :key="hostTips" class="fade-in">
					<div class="host-tips text-center" v-html="hostTips"></div>
				</div>
			</div>
		</div>
		<function-bar :function-bar-btns="functionBarBtns"></function-bar>

		<div class="container-sm lock-mobile-width bg-color-1 min-vh-100">
			<div class="row">
				<!-- for Complement header height -->
				<div style="height: 210px;"></div>

				<div class="container">
					<div class="row g-3">
						<player-btn
							v-for="(player, index) in players"
							:key="index"
							:player="player"
							:role-card="roleCard"
							:disable-btn="disableBtn"
							:kill-tag="tonight.killTag"
							v-model="selected"
						></player-btn>
					</div>
				</div>
				<!-- for Complement bottom bar height -->
				<div style="height: 70px;"></div>
			</div>
		</div>
		<div class="bottom-bar lock-mobile-width bg-color-2">
			<button class="next-btn btn-color-green" v-on:click="back()">
				<i class="bi bi-arrow-left-circle-fill"></i> 上一步
			</button>
			<button class="next-btn btn-color-green" v-on:click="next()" :disabled="disableNext && selected.length == 0">
				下一步 <i class="bi bi-arrow-right-circle-fill"></i>
			</button>
		</div>
		<!-- 主選單 -->
		<main-menu v-show="isShowMainMenu" @close="isShowMainMenu = false"></main-menu>
		<!-- 更名功能 -->
		<modal v-show="showModal == 'setName'" @close="showModal = false">
			<div slot="header">
				設定玩家姓名
			</div>
			<div slot="body">
				<div class="row m-1" v-for="(player, index) in players" :key="index">
					<div class="col-3 p-0 name-title flex-center">{{ player.key }}號：</div>
					<div class="col-9 p-0"><input class="name-input" type="text" v-model="player.name" /></div>
				</div>
				<div class="modal-body-mask"></div>
			</div>
			<div slot="footer" class="text-center flex-center ht-50">
				<button class="modal-btn" v-on:click="showModal = false">儲存關閉</button>
			</div>
		</modal>

		<!-- 使用解藥 -->
		<modal v-show="showModal == 'usedAntidote'" @close="showModal = false">
			<div slot="header">使用<span style="color: #1dd1a1;">解藥？</span></div>
			<div slot="footer" class="text-center flex-center ht-50">
				<button class="modal-btn" v-on:click="witchSave(true)">是</button>
				<button class="modal-btn" v-on:click="witchSave(false)">否</button>
			</div>
		</modal>
		<!-- 使用毒藥 -->
		<modal v-show="showModal == 'usedPoison'" @close="showModal = false">
			<div slot="header">使用<span style="color: #9b59b6;">毒藥？</span></div>
			<div slot="footer" class="text-center flex-center ht-50">
				<button class="modal-btn" v-on:click="poisonAsk(true)">是</button>
				<button class="modal-btn" v-on:click="poisonAsk(false)">否</button>
			</div>
		</modal>
		<!-- 騎士對決 -->
		<modal v-show="showModal == 'knightBattle'" @close="showModal = false">
			<div v-show="stage != 'speaking'" slot="header">騎士查驗</div>
			<div v-show="stage == 'speaking'" slot="header">請選擇騎士查驗對象</div>
			<div v-show="stage == 'speaking'" slot="body">
				<div
					v-for="(player, key) in players"
					:key="key"
					class="col-4"
					style="display: inline-block;"
					v-on:click="knightChoose = key"
				>
					<!-- <div
					v-for="(player, key) in players"
					:key="key"
					class="col-4"
					style="display: inline-block;"
					v-on:click="
						function() {
							if (!player.isAlive || key == _.findKey(players, knightPlayer)) {
								return;
							}
							knightChoose = key;
						}
					"
				> -->
					<div
						class="modal-player-btn"
						:class="{
							selected: knightChoose == key,
							disable: !player.isAlive || key == _.findKey(players, knightPlayer),
						}"
					>
						{{ key }}
					</div>
				</div>
				<div class="modal-body-mask"></div>
			</div>
			<div v-show="stage != 'speaking'" slot="body" class="text-center">
				僅能在白天發言階段使用。
			</div>
			<div v-show="stage == 'speaking'" slot="footer" class="text-center flex-center ht-50">
				<button class="modal-btn" v-on:click="knightBattle(knightChoose)">確定</button>
				<button class="modal-btn" v-on:click="showModal = false">取消</button>
			</div>
			<div v-show="stage != 'speaking'" slot="footer" class="text-center flex-center ht-50">
				<button class="modal-btn" v-on:click="showModal = false">關閉</button>
			</div>
		</modal>
		<!-- 狼人自爆 -->
		<modal v-if="showModal == 'wolfKillSelf'" @close="showModal = false">
			<div v-show="stage != 'speaking'" slot="header">狼人自爆</div>
			<div v-show="stage == 'speaking'" slot="header">請選擇自爆的狼人</div>
			<div v-show="stage == 'speaking'" slot="body">
				<div
					v-for="(player, key) in players"
					:key="key"
					v-on:click="wolfKillSelfChoose = key"
					style="display: inline-block;"
					class="col-4"
				>
					<div v-if="player.isAlive && _.get(roleCard, [player.identity, 'camp'], '') === 'bad'">
						<div class="modal-player-btn" :class="{selected: wolfKillSelfChoose == key}">
							{{ key }}
						</div>
					</div>
				</div>
				<br />
			</div>
			<div v-show="stage != 'speaking'" slot="body" class="text-center">
				僅能在白天發言階段使用。
			</div>
			<div v-show="stage == 'speaking'" slot="footer" class="text-center flex-center ht-50">
				<button class="modal-btn" v-on:click="wolfKillSelf(wolfKillSelfChoose)">確定</button>
				<button class="modal-btn" v-on:click="showModal = false">取消</button>
			</div>
			<div v-show="stage != 'speaking'" slot="footer" class="text-center flex-center ht-50">
				<button class="modal-btn" v-on:click="showModal = false">關閉</button>
			</div>
		</modal>

		<!-- 碼表功能 -->
		<time-modal v-show="showModal == 'timer'" @close="showModal = false"></time-modal>
		<!-- 發言順序 -->
		<modal v-if="showModal == 'speakingModal'" @close="showModal = false">
			<div slot="header">誰先發言？</div>
			<div slot="body">
				<!-- <div
					v-for="(player, key) in players"
					:key="key"
					class="col-2"
					style="display: inline-block;"
					v-on:click="
						function() {
							if (!player.isAlive) {
								return;
							}
							today.firstSpeak = key;
						}
					"
				> -->

				<div
					v-for="(player, key) in players"
					:key="key"
					class="col-2"
					style="display: inline-block;"
					v-on:click="today.firstSpeak = key"
				>
					<div
						class="modal-player-btn"
						style="width: 30px; height: 30px;"
						:class="{selected: today.firstSpeak == key, disable: !player.isAlive}"
					>
						{{ key }}
					</div>
				</div>
				<div class="row m-2">
					<div class="col-6">
						<div
							class="modal-player-btn"
							:class="{selected: today.speakingDirection == 'right'}"
							style="width: 100%; height: 50px; border-radius: 50px;"
							@click="today.speakingDirection = 'right'"
						>
							逆時針
						</div>
					</div>
					<div class="col-6">
						<div
							class="modal-player-btn"
							:class="{selected: today.speakingDirection == 'left'}"
							style="width: 100%; height: 50px; border-radius: 50px;"
							@click="today.speakingDirection = 'left'"
						>
							順時針
						</div>
					</div>
				</div>
				<div class="modal-body-mask"></div>
			</div>
			<div slot="footer" class="text-center flex-center ht-50">
				<button id="randomBtn" class="modal-btn" :disabled="dicing" v-on:click="randomOrder()">
					<span v-html="dice"></span> 抽籤
				</button>
				<button
					id="orderBtn"
					class="modal-btn"
					:disabled="!today.firstSpeak || !today.speakingDirection || dicing"
					v-on:click="next()"
				>
					確定
				</button>
			</div>
		</modal>

		<!-- 遊戲結束 -->
		<modal v-if="showModal == 'gameOver'" @close="showModal = false">
			<div slot="header" class="fs-2">{{ gameOverTitle }}</div>
			<div slot="body" class="text-center">
				你喜歡這個程式嗎？<br />歡迎透過一杯咖啡的錢<br />來贊助支持我們<br />我們會繼續努力
			</div>
			<div slot="footer" class="flex-center">
				<button @click="openDonate" class="next-btn w-100 btn-color-gold">
					<i class="bi bi-heart-fill"></i> 我願意小額贊助
				</button>
			</div>
		</modal>
	</div>
</template>

<script>
import functionBar from "@/components/hostPage/functionBar.vue";
import mainMenu from "@/components/hostPage/mainMenu.vue";
import modal from "@/components/hostPage/modal.vue";
import timeModal from "@/components/hostPage/timeModal.vue";
import playerBtn from "@/components/hostPage/playerBtn.vue";

import {VICTORY_CON, WITCH_SELF_HELP_CON, SHERIFF_RULE, roleCard, recommendedSetting} from "@/assets/js/const.js";

var temp = [];
var logArr = [];

var logLang = {
	wolfKill: "狼刀殺",
	witchKill: "女巫毒殺",
	good: "好人",
	bad: "壞人",
};

export default {
	components: {functionBar, mainMenu, modal, timeModal, playerBtn},
	data: function() {
		return {
			roleCard: roleCard,
			isSpeakingStage: false,
			stage: "",
			timeStatus: "day",
			day: 1,
			hostMessage:
				'<div style="font-size: 1rem;">感謝你願意當辛苦的主持人<br>讓我幫你減輕負擔<br>我會告訴你 你需要唸出來的內容</div>',
			hostTips: "（請按右下角【下一步】開始）",
			actionNum: 0,
			selected: [],
			selectQuota: 0,
			disableBtn: true,
			disableNext: false,

			tonight: {
				killTag: {},
				killbyHunter: "",
				killbyWerewolvesKing: "",
				killedByWerewolves: "",
				killedByWitch: "",
				haveUsedAntidote: false,
				verifyTarget: "",
				verifyResult: "",
			},
			today: {
				killbyHunter: "",
				killbyWerewolvesKing: "",
				firstSpeak: "",
				speakIndex: 0,
				speakingDirection: "", // left: 順時鐘, right: 逆時鐘
				killedByVote: "",
				PKRoundNum: 0,
			},
			clickPKFlag: false,
			passSkillFlag: false,
			isUsedAntidote: false,
			isUsedPoison: false,
			tonightWitchSave: null,
			witchRule: WITCH_SELF_HELP_CON.ONLY_FIRST,

			tonightVerify: null,

			knightChoose: "",
			knightIsUsedSkill: false,

			wolfKillSelfChoose: "",

			dice: '<i class="bi bi-dice-6-fill"></i>',
			dicing: false,

			isShowMainMenu: false,
			showModal: "",
			gameOverTitle: "",

			playerNum: 0,
			players: {},
			roleNum: {
				werewolvesKing: 0,
				werewolves: 0,
				seer: 0,
				witch: 0,
				hunter: 0,
				knight: 0,
			},
			rolePlayerIndex: {
				seer: 0,
				witch: 0,
				hunter: 0,
				knight: 0,
			},

			victoryCon: VICTORY_CON.KILL_SIDE,
		};
	},
	created: function() {
		temp.push(_.cloneDeep(this.$data));
	},
	mounted: function() {
		var session = sessionStorage.getItem("sessionData");
		if (session != null) {
			session = JSON.parse(session);
			temp = JSON.parse(sessionStorage.getItem("tempData"));
			_.forEach(this.$data, (value, key) => {
				this.$data[key] = session[key];
			});
		}
	},
	watch: {
		selected: function(val, oldVal) {
			if (val.length == 0) {
				return;
			}

			if (this.selected.length > this.selectQuota) {
				this.selected = _.drop(this.selected);
			}

			if (val.length == this.selectQuota) {
				this.next();
			}
		},
	},
	methods: {
		scrollFunctionBar: function() {
			console.log("test");
		},
		initPlayer: function() {
			for (var i = 1; i <= this.playerNum; i++) {
				this.players[i] = {
					key: i,
					name: i + "號玩家",
					identity: "",
					isAlive: true,
				};
			}
		},
		mainMenu: function() {
			this.isShowMainMenu = true;
		},

		saveSession: function() {
			sessionStorage.setItem("sessionData", JSON.stringify(this.$data));
			sessionStorage.setItem("tempData", JSON.stringify(temp));
		},
		next: function() {
			var backupData = _.cloneDeep(this.$data);
			var nowRunDown = this.runDown();

			if (typeof nowRunDown.action === "function") {
				try {
					if (nowRunDown.action() === "pass") {
						this.actionNum += 1;
						this.next();
						return;
					}
				} catch (e) {
					console.log("error at next: ", e);
					return;
				}
			}
			this.hostMessage = nowRunDown.messageHtml;
			this.hostTips = nowRunDown.tipsHtml;
			if (_.has(nowRunDown, ["modal"])) {
				this.showModal = _.get(nowRunDown, ["modal"], false);
			}
			this.actionNum += 1;
			this.backup(backupData);
			this.saveSession();
		},
		backup: function(backupData) {
			temp.push(backupData);
		},
		back: function() {
			if (temp.length <= 1) {
				return;
			}

			var previousData = _.last(temp);
			temp.pop();
			_.forEach(this.$data, (value, key) => {
				this.$data[key] = previousData[key];
			});
			this.selected = [];
			this.clickPKFlag = false;
			this.passSkillFlag = false;
			this.saveSession();
		},
		pkRound: function() {
			this.clickPKFlag = true;
			this.next();
		},
		knightBattle: function(target) {
			if (this.knightIsUsedSkill) {
				return;
			}
			var knightPlayerKey = _.findKey(this.players, this.knightPlayer);
			if (target == "" || target == this.knightPlayer || !this.players[target].isAlive) {
				return;
			}
			this.showModal = false;
			var backupData = _.cloneDeep(this.$data);

			var targetIdentity = _.get(this, ["players", target, "identity"], "");
			var targetCamp = _.get(roleCard, [targetIdentity, "camp"], "");

			if (targetCamp == "bad") {
				this.hostMessage = target + "號 是狼人！<br>準備進入黑夜";
				this.setIsAlive(target, false);
				this.resetNightData();
				this.resetDayData();
				this.actionNum = 0;
				this.day += 1;
			} else if (targetCamp == "good") {
				this.hostMessage = target + "號 不是狼人！<br>" + knightPlayerKey + "號 騎士以死謝罪";
				this.setIsAlive(knightPlayerKey, false);
			}
			logArr.push("騎士驗證" + this.hostMessage);
			this.knightIsUsedSkill = true;
			this.backup(backupData);
		},
		wolfKillSelf: function(target) {
			this.showModal = false;
			var backupData = _.cloneDeep(this.$data);

			if (this.players[target].identity == "werewolvesKing") {
				this.hostMessage = target + "號狼人自爆<br>請使用角色技能";
				this.disableBtn = false;
				this.stage = "usingSkill";
				this.actionNum = 43;
				this.setIsAlive(target, false);
				this.backup(backupData);
				return;
			} else {
				this.hostMessage = target + "號狼人自爆<br>中止所有發言直接進入黑夜";
			}
			this.setIsAlive(target, false);
			this.resetNightData();
			this.resetDayData();
			this.actionNum = 0;
			this.day += 1;

			this.backup(backupData);
		},
		setSelectQuota: function(quota) {
			this.selectQuota = quota;
		},
		setIdentity: function(role) {
			try {
				if (this.selected.length != this.selectQuota) {
					throw "數量不對";
				}

				_.forEach(this.selected, (key) => {
					if (this.players[key].identity !== "") {
						throw "已經設定角色";
					} else {
						this.players[key].identity = role;
					}
				});

				if (_.has(this.rolePlayerIndex, role)) {
					this.rolePlayerIndex[role] = this.selected[0];
				}

				this.selected = [];
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		// kill相關
		setKillTag: function(type = "", canPass = false) {
			try {
				if (canPass && this.selected.length == 0) {
					return;
				}

				if (this.selected.length != 1) {
					throw "數量不對";
				}
				if (type == "") {
					throw "Type不對";
				}
				this.tonight.killTag[this.selected[0]] = type;
				logArr.push(this.selected[0] + "號被" + logLang[type]);
				this.selected = [];
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		executeKillTag: function() {
			_.forEach(this.tonight.killTag, (deadType, index) => {
				if (typeof (this[deadType] === "function")) {
					this[deadType](index);
				}
			});
		},
		setDefaultFirstSpeaker: function() {
			var death = _.keys(this.tonight.killTag);

			if (death.length == 0) {
				return;
			}
			var first = _.toInteger(_.get(death, [0], 0)) + 1;
			var totalPlayers = _.size(this.players);

			for (var i = 0; i < totalPlayers; i++) {
				var index =
					(first + i) % totalPlayers <= 0 ? ((first + i) % totalPlayers) + totalPlayers : (first + i) % totalPlayers;
				if (this.players[index].isAlive == true) {
					this.today.speakingDirection = "left";
					this.today.firstSpeak = index;
					return;
				}
			}
		},
		wolfKill: function(target) {
			try {
				this.tonight.killedByWerewolves = target;
				this.setIsAlive(target, false);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		witchKill: function(target) {
			try {
				this.tonight.killedByWitch = target;
				this.isUsedPoison = true;
				this.setIsAlive(target, false);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		voteKill: function() {
			try {
				if (this.selected.length != 1) {
					throw "數量不對";
				}
				this.today.killedByVote = this.selected[0];
				logArr.push(this.selected[0] + "號遭投票出局");
				this.setIsAlive(this.today.killedByVote, false);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		hunterKill: function(time = "night") {
			try {
				if (this.selected.length != 1) {
					throw "數量不對";
				}
				if (time == "night") {
					this.tonight.killbyHunter = this.selected[0];
				} else if (time == "day") {
					this.today.killbyHunter = this.selected[0];
				}
				logArr.push(this.selected[0] + "號遭技能殺害");
				this.setIsAlive(this.selected[0], false);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		werewolvesKingKill: function(time = "night") {
			try {
				if (this.selected.length != 1) {
					throw "數量不對";
				}
				if (time == "night") {
					this.tonight.killbyWerewolvesKing = this.selected[0];
				} else if (time == "day") {
					this.today.killbyWerewolvesKing = this.selected[0];
				}
				logArr.push(this.selected[0] + "號遭技能殺害");
				this.setIsAlive(this.selected[0], false);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		witchSave: function(boolean) {
			this.tonight.haveUsedAntidote = boolean;
			this.next();
		},
		poisonAsk: function(boolean) {
			var backupData = _.cloneDeep(this.$data);
			if (boolean) {
				this.showModal = false;
				this.hostTips = "（請點選毒藥使用玩家）";
				this.backup(backupData);
				return;
			}
			this.next();
		},
		randomOrder: function() {
			var direction = _.sample(["left", "right"]);
			var alivePlayers = _.map(
				_.filter(this.players, (player) => {
					return player.isAlive;
				}),
				(player) => {
					return player.key;
				}
			);
			this.dicing = true;

			var diceArr = [
				'<i class="bi bi-dice-1"></i>',
				'<i class="bi bi-dice-2"></i>',
				'<i class="bi bi-dice-3"></i>',
				'<i class="bi bi-dice-4"></i>',
				'<i class="bi bi-dice-5"></i>',
				'<i class="bi bi-dice-6"></i>',
				'<i class="bi bi-dice-1-fill"></i>',
				'<i class="bi bi-dice-2-fill"></i>',
				'<i class="bi bi-dice-3-fill"></i>',
				'<i class="bi bi-dice-4-fill"></i>',
				'<i class="bi bi-dice-5-fill"></i>',
				'<i class="bi bi-dice-6-fill"></i>',
			];

			var diceAnimation = setInterval(() => {
				this.dice = _.sample(diceArr);
				this.today.firstSpeak = _.sample(alivePlayers);
				this.today.speakingDirection = _.sample(["left", "right"]);
			}, 50);

			setTimeout(() => {
				clearInterval(diceAnimation);
			}, 1000);

			setTimeout(() => {
				this.disableNext = false;
				this.dicing = false;
				this.next();
			}, 1700);
		},
		seerVerify: function() {
			try {
				if (this.selected.length != 1) {
					throw "數量不對";
				}

				this.tonight.verifyTarget = this.selected[0];
				var target = this.selected[0];

				var identity = _.get(this, ["players", target, "identity"], false);
				var camp = _.get(roleCard, [identity, "camp"], false);

				if (identity != "") {
					this.tonight.verifyResult = camp;
				} else if (identity == false) {
					this.tonight.verifyResult = "good";
				} else {
					throw "驗證發生錯誤";
				}
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		setCity: function() {
			_.forEach(this.players, (value, key) => {
				if (this.players[key].identity == "") {
					this.players[key].identity = "villagers";
				}
			});
		},
		setIsAlive: function(playerIndex, boolean) {
			this.players[playerIndex].isAlive = boolean;
			this.selected = [];
			this.judgingTheOutcome();
		},
		judgingTheOutcome: function() {
			var count = {
				wolves: 0,
				priesthood: 0,
				villagers: 0,
			};

			_.forEach(this.players, (player, key) => {
				if (player.isAlive) {
					count[_.get(roleCard, [player.identity, "position"], false)] += 1;
				}
			});

			if (count.wolves == 0) {
				this.gameOverTitle = "遊戲結束 好人獲勝";
				this.showModal = "gameOver";
				this.disableNext = true;
				return;
			}

			if (this.victoryCon == VICTORY_CON.KILL_SIDE && (count.priesthood == 0 || count.villagers == 0)) {
				this.gameOverTitle = "遊戲結束 狼人獲勝";
				this.showModal = "gameOver";
				this.disableNext = true;
				return;
			}

			if (this.victoryCon == VICTORY_CON.KILL_ALL && count.priesthood == 0 && count.villagers == 0) {
				this.gameOverTitle = "遊戲結束 狼人獲勝";
				this.showModal = "gameOver";
				this.disableNext = true;
				return;
			}
		},
		resetNightData: function() {
			this.tonight = {
				killTag: {},
				killbyHunter: "",
				killbyWerewolvesKing: "",
				killedByWerewolves: "",
				killedByWitch: "",
				haveUsedAntidote: false,
				verifyTarget: "",
				verifyResult: "",
			};
		},
		resetDayData: function() {
			this.today = {
				killbyHunter: "",
				killbyWerewolvesKing: "",
				firstSpeak: "",
				speakIndex: 0,
				speakingDirection: "", // left: 順時鐘, right: 逆時鐘
				killedByVote: "",
				PKRoundNum: 0,
			};
		},
		openDonate: function() {
			this.$parent.isShow.donateModal = true;
		},
		runDown: function() {
			var _this = this;
			var arr = [
				{
					messageHtml: "準備進入第" + _this.day + "夜",
					tipsHtml: "",
					action: function() {},
				},
				{
					messageHtml: "天黑請閉眼",
					tipsHtml: "",
					action: function() {
						_this.stage = "night";
						_this.timeStatus = "night";
						logArr.push("【第" + _this.day + "夜】");
					},
				},
				{
					messageHtml: "狼人請睜眼<br>請確認彼此身份",
					tipsHtml: "（請從下方點選【狼王】玩家號碼）",
					action: function() {
						// 沒有設定狼王
						if (_this.roleNum.werewolvesKing <= 0) {
							return "pass";
						}
						// 僅第一天需要
						if (_this.day > 1) {
							return "pass";
						}

						var quota = _.get(_this, ["roleNum", "werewolvesKing"], 0);
						if (quota <= 0) {
							throw "Set werewolvesKing error: quota <= 0";
						}

						_this.setSelectQuota(quota);
						_this.disableBtn = false;
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						// 僅第一天需要
						if (_this.day > 1) {
							return "pass";
						}
						if (_this.roleNum.werewolvesKing > 0) {
							_this.setIdentity("werewolvesKing");
							this.messageHtml = "狼人請睜眼<br>請確認彼此身份";
							this.tipsHtml = "（請點選其他" + _this.roleNum.werewolves + "名【狼人】玩家）";
						} else {
							this.messageHtml = "狼人請睜眼";
							this.tipsHtml = "（請從下方按鈕點選" + _this.roleNum.werewolves + "名【狼人】玩家號碼）";
						}

						var quota = _.get(_this, ["roleNum", "werewolves"], 0);
						if (quota <= 0) {
							throw "Set werewolves error: quota <= 0";
						}
						_this.setSelectQuota(quota);
						_this.disableBtn = false;
					},
				},
				{
					messageHtml: "",
					tipsHtml: "（請點選被殺害玩家）",
					action: function() {
						if (_this.day <= 1) {
							this.messageHtml = "狼人請殺人";
							_this.setIdentity("werewolves");
						} else {
							this.messageHtml = "狼人請睜眼<br>狼人請殺人";
						}
						_this.disableBtn = false;
						_this.setSelectQuota(1);
					},
				},
				{
					messageHtml: "狼人請閉眼",
					tipsHtml: "",
					action: function() {
						_this.setKillTag("wolfKill");
						_this.disableBtn = true;
					},
				},
				{
					messageHtml: "女巫請睜眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定女巫
						if (_this.roleNum.witch <= 0) {
							return "pass";
						}

						// 僅第一天需要
						if (_this.day <= 1) {
							var quota = _.get(_this, ["roleNum", "witch"], 0);
							if (quota <= 0) {
								throw "Set witch error: quota <= 0";
							}
							this.tipsHtml = "（請點選【女巫】玩家）";
							_this.setSelectQuota(quota);
							_this.disableBtn = false;
						}
					},
				},
				{
					messageHtml: "他死了<br>請問你要使用解藥嗎？",
					tipsHtml: "",
					modal: "",
					action: function() {
						// 沒有設定女巫
						if (_this.roleNum.witch <= 0) {
							return "pass";
						}

						if (_this.day <= 1) {
							_this.setIdentity("witch");
						}

						// 已使用解藥
						if (_this.isUsedAntidote) {
							return "pass";
						}

						var theDead = _.findKey(_this.tonight.killTag, (o) => {
							return o != "";
						});

						var witchPlayerKey = _.findKey(_this.players, (player) => {
							return player == _this.witchPlayer;
						});

						this.tipsHtml = "（請用手勢告知 " + theDead + "號 死亡）";

						if (theDead == witchPlayerKey) {
							if (_this.witchRule == WITCH_SELF_HELP_CON.ONLY_FIRST && _this.day > 1) {
								this.tipsHtml += '<br><span style="font-size: 0.9rem;">第一夜後不可自救</span>';
								return;
							} else if (_this.witchRule == WITCH_SELF_HELP_CON.CAN_NOT) {
								this.tipsHtml += '<br><span style="font-size: 0.9rem;">不可自救</span>';
								return;
							}
						}

						if (_.get(_this, ["witchPlayer", "isAlive"], false) == true) {
							this.modal = "usedAntidote";
						} else {
							this.tipsHtml = '（念完即可）<br><span style="font-size: 0.9rem;">女巫已出局</span>';
							_this.disableNext = false;
							return;
						}

						_this.disableBtn = true;
						_this.disableNext = true;
					},
				},
				{
					messageHtml: "請問你要使用毒藥嗎？<br>你要毒誰呢？",
					tipsHtml: "",
					modal: "",
					action: function() {
						// 沒有設定女巫
						if (_this.roleNum.witch <= 0) {
							return "pass";
						}

						if (_this.tonight.haveUsedAntidote) {
							_this.isUsedAntidote = true;
							_this.tonight.killTag = {};
						}

						if (_.get(_this, ["witchPlayer", "isAlive"], false) == false) {
							this.tipsHtml = '（念完即可）<br><span style="font-size: 0.9rem;">女巫已出局</span>';
							_this.disableNext = false;
							return;
						}

						if (_this.tonight.haveUsedAntidote) {
							this.tipsHtml = '（念完即可）<br><span style="font-size: 0.9rem;">無法同一夜使用解藥毒藥</span>';
							_this.disableNext = false;
							return;
						}
						if (_this.isUsedPoison) {
							this.tipsHtml = '（念完即可）<br><span style="font-size: 0.9rem;">已無毒藥</span>';
							_this.disableNext = false;
							return;
						}
						this.modal = "usedPoison";
						this.tipsHtml = "";
						_this.disableBtn = false;
						_this.disableNext = true;
						// (女巫已淘汰，念完即可)
					},
				},
				{
					messageHtml: "女巫請閉眼",
					tipsHtml: "",
					modal: "",
					action: function() {
						// 沒有設定女巫
						if (_this.roleNum.witch <= 0) {
							return "pass";
						}
						_this.setKillTag("witchKill", true);
						_this.disableBtn = true;
						_this.disableNext = false;
					},
				},
				{
					messageHtml: "預言家請睜眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定預言家
						if (_this.roleNum.seer <= 0) {
							return "pass";
						}
						// 僅第一天需要
						if (_this.day <= 1) {
							var quota = _.get(_this, ["roleNum", "seer"], 0);
							if (quota <= 0) {
								throw "Set seer error: quota <= 0";
							}
							this.tipsHtml = "（請點選【預言家】玩家）";
							_this.setSelectQuota(quota);
							_this.disableBtn = false;
						}
					},
				},
				{
					messageHtml: "請選擇你要查驗的對象",
					tipsHtml: "（請點選被查驗對象）",
					action: function() {
						// 沒有設定預言家
						if (_this.roleNum.seer <= 0) {
							return "pass";
						}
						if (_this.day <= 1) {
							_this.setIdentity("seer");
						}
						if (_.get(_this, ["seerPlayer", "isAlive"], false) != true) {
							this.tipsHtml = '（念完即可）<br><span style="font-size: 0.9rem;">預言家已淘汰</span>';
							return;
						}

						_this.disableBtn = false;
					},
				},
				{
					messageHtml: "",
					tipsHtml: "（請用手勢告知身份）",
					action: function() {
						// 沒有設定預言家
						if (_this.roleNum.seer <= 0) {
							return "pass";
						}
						if (_.get(_this, ["seerPlayer", "isAlive"], false) != true) {
							return "pass";
						}
						_this.seerVerify();
						this.messageHtml =
							_this.tonight.verifyResult === "good"
								? '<i class="bi bi-hand-thumbs-up-fill"></i>'
								: '<i class="bi bi-hand-thumbs-down-fill"></i>';
						_this.disableBtn = true;
						logArr.push("預言家驗證" + _this.selected[0] + "號" + logLang[_this.tonight.verifyResult]);
						_this.selected = [];
					},
				},
				{
					messageHtml: "預言家請閉眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定預言家
						if (_this.roleNum.seer <= 0) {
							return "pass";
						}
					},
				},
				{
					messageHtml: "獵人請睜眼",
					tipsHtml: "（請點選【獵人】玩家）",
					action: function() {
						// 沒有設定獵人
						if (_this.roleNum.hunter <= 0) {
							return "pass";
						}
						if (_this.day > 1) {
							return "pass";
						}

						// 僅第一天需要
						var quota = _.get(_this, ["roleNum", "hunter"], 0);
						if (quota <= 0) {
							throw "Set hunter error: quota <= 0";
						}
						_this.setSelectQuota(quota);
						_this.disableBtn = false;
					},
				},
				{
					messageHtml: "獵人請閉眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定獵人
						if (_this.roleNum.hunter <= 0) {
							return "pass";
						}
						if (_this.day > 1) {
							return "pass";
						}
						_this.setIdentity("hunter");
						_this.disableBtn = true;
					},
				},
				{
					messageHtml: "騎士請睜眼",
					tipsHtml: "（請點選【騎士】玩家）",
					action: function() {
						// 沒有設定騎士
						if (_this.roleNum.knight <= 0) {
							return "pass";
						}
						if (_this.day > 1) {
							return "pass";
						}
						// 僅第一天需要
						var quota = _.get(_this, ["roleNum", "knight"], 0);
						if (quota <= 0) {
							throw "Set hunter error: quota <= 0";
						}
						_this.setSelectQuota(quota);
						_this.disableBtn = false;
					},
				},
				{
					messageHtml: "騎士請閉眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定騎士
						if (_this.roleNum.knight <= 0) {
							return "pass";
						}
						if (_this.day > 1) {
							return "pass";
						}
						_this.setIdentity("knight");
						_this.disableBtn = true;
					},
				},
				{
					messageHtml: "天亮了",
					tipsHtml: "",
					action: function() {
						if (_this.day <= 1) {
							_this.setCity();
						}
						_this.timeStatus = "day";
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						_this.executeKillTag();
						_this.setDefaultFirstSpeaker();
						_this.tonight.killTag = {};
						if (_this.tonight.haveUsedAntidote) {
							this.messageHtml = "昨晚是平安夜";
						} else {
							this.messageHtml =
								"昨晚 " +
								_.filter([_this.tonight.killedByWerewolves, _this.tonight.killedByWitch], function(killed) {
									return killed !== "";
								})
									.sort(function(a, b) {
										return a - b;
									})
									.join("號、") +
								"號 玩家出局";
						}

						logArr.push(this.messageHtml);
					},
				},
				//夜晚 狼刀到獵人
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var theDead = _.get(_this, ["tonight", "killedByWerewolves"], "");
						if (theDead == "" || _.get(_this, ["players", theDead, "identity"]) !== "hunter") {
							return "pass";
						}
						this.messageHtml = theDead + "號玩家<br>請使用角色技能";
						this.tipsHtml = "（請點選技能使用對象）";
						_this.disableBtn = false;
						_this.stage = "usingSkill";
						logArr.push(this.messageHtml);
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_this.passSkillFlag) {
							_this.stage = "day";
							this.messageHtml = _.get(_this, ["tonight", "killedByWerewolves"], "") + "號玩家不使用技能";
							_this.passSkillFlag = false;
							return;
						}
						var theDead = _.get(_this, ["tonight", "killedByWerewolves"], "");
						if (theDead == "" || _.get(_this, ["players", theDead, "identity"]) !== "hunter") {
							return "pass";
						}
						this.messageHtml = _this.selected[0] + "號玩家出局";
						_this.hunterKill("night");
						_this.stage = "day";
					},
				},
				// 獵槍殺到狼王case
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var theDead = _this.tonight.killbyHunter;
						if (theDead == "" || _this.players[theDead].identity !== "werewolvesKing") {
							return "pass";
						}
						this.messageHtml = theDead + "號玩家<br>請使用角色技能";
						this.tipsHtml = "（請點選技能使用對象）";
						_this.disableBtn = false;
						_this.stage = "usingSkill";
						logArr.push(this.messageHtml);
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_this.passSkillFlag) {
							_this.stage = "day";
							this.messageHtml = _this.tonight.killbyHunter + "號玩家不使用技能";
							_this.passSkillFlag = false;
							return;
						}
						var theDead = _this.tonight.killbyHunter;
						if (theDead == "" || _this.players[theDead].identity !== "werewolvesKing") {
							return "pass";
						}
						this.messageHtml = _this.selected[0] + "號玩家出局";
						_this.werewolvesKingKill("day");
						_this.stage = "day";
					},
				},
				// 夜晚 狼王自刀
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var theDead = _.get(_this, ["tonight", "killedByWerewolves"], "");
						if (theDead == "" || _.get(_this, ["players", theDead, "identity"]) !== "werewolvesKing") {
							return "pass";
						}
						this.messageHtml = theDead + "號玩家<br>請使用角色技能";
						this.tipsHtml = "（請點選技能使用對象）";
						_this.disableBtn = false;
						_this.stage = "usingSkill";
						logArr.push(this.messageHtml);
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_this.passSkillFlag) {
							_this.stage = "day";
							this.messageHtml = _.get(_this, ["tonight", "killedByWerewolves"], "") + "號玩家不使用技能";
							_this.passSkillFlag = false;
							return;
						}
						var theDead = _.get(_this, ["tonight", "killedByWerewolves"], "");
						if (theDead == "" || _.get(_this, ["players", theDead, "identity"]) !== "werewolvesKing") {
							return "pass";
						}
						this.messageHtml = _this.selected[0] + "號玩家出局";
						_this.werewolvesKingKill("night");
						_this.stage = "day";
					},
				},
				// 狼王殺到獵人 case
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var theDead = _this.tonight.killbyWerewolvesKing;
						if (theDead == "" || _this.players[theDead].identity !== "hunter") {
							return "pass";
						}
						this.messageHtml = theDead + "號玩家<br>請使用角色技能";
						this.tipsHtml = "（請點選技能使用對象）";
						_this.disableBtn = false;
						_this.stage = "usingSkill";
						logArr.push(this.messageHtml);
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_this.passSkillFlag) {
							_this.stage = "day";
							this.messageHtml = _this.tonight.killbyWerewolvesKing + "號玩家不使用技能";
							_this.passSkillFlag = false;
							return;
						}
						var theDead = _this.tonight.killbyWerewolvesKing;
						if (theDead == "" || _this.players[theDead].identity !== "hunter") {
							return "pass";
						}
						this.messageHtml = _this.selected[0] + "號玩家出局";
						_this.hunterKill("day");
						_this.stage = "day";
					},
				},
				{
					messageHtml: "請發表遺言",
					tipsHtml: "",
					action: function() {
						if (_this.day > 1 || _this.tonight.haveUsedAntidote) {
							return "pass";
						}
						logArr.push(this.messageHtml);
					},
				},
				{
					messageHtml: "",
					tipsHtml: "（決定發言順序）",
					modal: "speakingModal",
					action: function() {
						_this.disableBtn = true;
						_this.disableNext = true;
						_this.selected = [];
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					modal: "timer",
					action: function() {
						_this.stage = "speaking";
						_this.showModal = false;
						_this.disableNext = false;
						var totalPlayers = _.size(_this.players);
						var direction = _this.today.speakingDirection == "left" ? "順時針" : "逆時針";
						var next =
							_this.today.speakingDirection == "left" ? _this.today.firstSpeak + 1 : _this.today.firstSpeak - 1;
						this.messageHtml = "由" + _this.today.firstSpeak + "號玩家開始發言<br>往" + direction + "方向接續";
						logArr.push(this.messageHtml);
					},
				},
				{
					messageHtml: "現在準備投票",
					tipsHtml: "",
					action: function() {
						_this.showModal = false;
						// _this.showTimer = false;
					},
				},
				{
					messageHtml: "3、2、1 請投票",
					tipsHtml: "（請點選遭投票出局玩家）",
					action: function() {
						_this.disableBtn = false;
						_this.stage = "voting";
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_this.clickPKFlag) {
							_this.today.PKRoundNum += 1;
							_this.clickPKFlag = false;
						}
						if (_this.today.PKRoundNum == 1) {
							this.messageHtml = "進行辯論<br>請平票候選人依序發言";
							_this.disableBtn = false;
							logArr.push("平票辯論");
							_this.stage = "PKSpeaking";
							return;
						}
						this.messageHtml = _this.selected[0] + "號玩家出局";
						_this.voteKill();
						_this.stage = "day";
					},
				},
				// 平票PK
				{
					messageHtml: "再次準備投票",
					tipsHtml: "",
					action: function() {
						if (_this.today.PKRoundNum == 1) {
							return;
						}
						return "pass";
					},
				},
				{
					messageHtml: "3、2、1 請投票",
					tipsHtml: "（請點選遭投票出局玩家）",
					action: function() {
						if (_this.today.PKRoundNum == 1) {
							_this.disableBtn = false;
							_this.stage = "voting";
							return;
						}
						return "pass";
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_this.clickPKFlag) {
							_this.today.PKRoundNum += 1;
							_this.clickPKFlag = false;
						}
						if (_this.today.PKRoundNum == 1) {
							this.messageHtml = _this.selected[0] + "號玩家出局";
							_this.voteKill();
							_this.stage = "day";
						} else {
							return "pass";
						}
					},
				},
				//票到獵人或狼王 strat
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var theDead = _.get(_this, ["today", "killedByVote"], "");
						var theDeadIdentity = _.get(_this, ["players", theDead, "identity"], "");

						if (theDeadIdentity === "hunter" || theDeadIdentity === "werewolvesKing") {
							this.messageHtml = theDead + "號玩家<br>請使用角色技能";
							this.tipsHtml = "（請點選技能使用對象）";
							_this.disableBtn = false;
							_this.stage = "usingSkill";
							logArr.push(this.messageHtml);
							return;
						}
						return "pass";
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_this.passSkillFlag) {
							_this.stage = "day";
							this.messageHtml = _.get(_this, ["today", "killedByVote"], "") + "號玩家不使用技能";
							_this.passSkillFlag = false;
							return;
						}
						var theDead = _.get(_this, ["today", "killedByVote"], "");
						var theDeadIdentity = _.get(_this, ["players", theDead, "identity"], "");

						this.messageHtml = _this.selected[0] + "號玩家出局";
						if (theDeadIdentity === "hunter") {
							_this.hunterKill("day");
							_this.stage = "day";
							return;
						} else if (theDeadIdentity === "werewolvesKing") {
							_this.werewolvesKingKill("day");
							_this.stage = "day";
							return;
						}
						return "pass";
					},
				},
				{
					//又殺到狼王或獵人＊＊＊＊＊＊＊＊＊＊＊＊＊
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_this.today.killbyHunter != "") {
							var theDead = _this.today.killbyHunter;
							if (_.get(_this, ["players", theDead, "identity"], "") === "werewolvesKing") {
								this.messageHtml = theDead + "號玩家<br>請使用角色技能";
								this.tipsHtml = "（請點選技能使用對象）";
								_this.disableBtn = false;
								_this.stage = "usingSkill";
								logArr.push(this.messageHtml);
								return;
							}
						}
						if (_this.today.killbyWerewolvesKing != "") {
							var theDead = _this.today.killbyWerewolvesKing;
							if (_.get(_this, ["players", theDead, "identity"], "") === "hunter") {
								this.messageHtml = theDead + "號玩家<br>請使用角色技能";
								this.tipsHtml = "（請點選技能使用對象）";
								_this.disableBtn = false;
								_this.stage = "usingSkill";
								logArr.push(this.messageHtml);
								return;
							}
						}
						return "pass";
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_this.today.killbyHunter != "") {
							var theDead = _this.today.killbyHunter;
							if (_.get(_this, ["players", theDead, "identity"], "") === "werewolvesKing") {
								if (_this.passSkillFlag) {
									_this.stage = "day";
									this.messageHtml = theDead + "號玩家不使用技能";
									_this.passSkillFlag = false;
									return;
								}

								this.messageHtml = _this.selected[0] + "號玩家出局";
								_this.werewolvesKingKill("day");
								_this.stage = "day";
								return;
							}
						}
						if (_this.today.killbyWerewolvesKing != "") {
							var theDead = _this.today.killbyWerewolvesKing;
							if (_.get(_this, ["players", theDead, "identity"], "") === "hunter") {
								if (_this.passSkillFlag) {
									_this.stage = "day";
									this.messageHtml = theDead + "號玩家不使用技能";
									_this.passSkillFlag = false;
									return;
								}

								this.messageHtml = _this.selected[0] + "號玩家出局";
								_this.hunterKill("day");
								_this.stage = "day";
								return;
							}
						}
						return "pass";
					},
				},
				//票到獵人或狼王 end
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_this.today.killedByVote == "" && _this.today.PKRoundNum == 2) {
							this.messageHtml = "再次平票，進入黑夜";
							logArr.push(this.messageHtml);
						} else {
							this.messageHtml = "請發表遺言";
						}
						_this.stage = "day";
						_this.disableBtn = true;
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						_this.actionNum = 0;
						_this.day += 1;
						_this.resetNightData();
						_this.resetDayData();
						return "pass";
					},
				},

				//狼王自爆專用

				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_this.passSkillFlag) {
							_this.stage = "day";
							this.messageHtml = "不使用技能";
							_this.passSkillFlag = false;
							return;
						}
						this.messageHtml = _this.selected[0] + "號玩家出局<br>沒有遺言";
						_this.werewolvesKingKill("day");
						_this.stage = "day";
					},
				},
				//爆到獵人
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var theDead = _this.today.killbyWerewolvesKing;
						if (theDead == "" || _this.players[theDead].identity !== "hunter") {
							return "pass";
						}
						this.messageHtml = theDead + "號玩家<br>請使用角色技能";
						this.tipsHtml = "（請點選技能使用對象）";
						_this.disableBtn = false;
						_this.stage = "usingSkill";
						logArr.push(this.messageHtml);
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_this.passSkillFlag) {
							_this.stage = "day";
							this.messageHtml = _this.today.killbyWerewolvesKing + "號玩家不使用技能";
							_this.passSkillFlag = false;
							return;
						}
						var theDead = _this.today.killbyWerewolvesKing;
						if (theDead == "" || _this.players[theDead].identity !== "hunter") {
							return "pass";
						}
						this.messageHtml = _this.selected[0] + "號玩家出局<br>沒有遺言";
						_this.hunterKill("day");
						_this.stage = "day";
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						_this.actionNum = 0;
						_this.day += 1;
						_this.resetNightData();
						_this.resetDayData();
						return "pass";
					},
				},
			];

			return arr[this.actionNum];
		},
	},
	computed: {
		knightBattleDisable: function() {
			// 有bug
			// return this.knightIsUsedSkill || !_.get(this, ['knightPlayer', 'isAlive'], false);
			return this.knightIsUsedSkill;
		},
		seerPlayer: function() {
			return this.players[this.rolePlayerIndex.seer];
		},
		//bug 沒拿到的時候會用1號去擋
		knightPlayer: function() {
			return this.players[this.rolePlayerIndex.knight];
		},
		witchPlayer: function() {
			return this.players[this.rolePlayerIndex.witch];
		},
		functionBarBtns: function() {
			var _this = this;
			return [
				{
					class: "function-btn btn-color-green",
					click: () => {
						_this.showModal = "knightBattle";
					},
					disable: _this.knightBattleDisable,
					html: "騎士查驗",
					isShow: !(_this.stage == "voting" || _this.stage == "usingSkill") && _this.roleNum.knight >= 1,
				},
				{
					class: "function-btn btn-color-green",
					click: () => {
						_this.showModal = "wolfKillSelf";
					},
					disable: false,
					html: "狼人自爆",
					isShow: !(_this.stage == "voting" || _this.stage == "usingSkill"),
				},
				{
					class: "function-btn btn-color-green",
					click: () => {
						_this.showModal = "timer";
					},
					disable: false,
					html: "碼表功能",
					isShow: !(_this.stage == "voting" || _this.stage == "usingSkill"),
				},
				{
					class: "function-btn btn-color-green",
					click: () => {
						_this.showModal = "setName";
					},
					disable: false,
					html: "更改名稱",
					isShow: !(_this.stage == "voting" || _this.stage == "usingSkill"),
				},
				{
					class: "function-btn btn-color-gold",
					click: () => {
						_this.$parent.isShow.donateModal = true;
					},
					disable: false,
					html: "贊助支持",
					isShow: !(_this.stage == "voting" || _this.stage == "usingSkill"),
				},
				{
					class: "function-btn special",
					click: _this.pkRound,
					disable: false,
					html: _this.today.PKRoundNum == 0 ? "票數相同 進行辯論" : "票數再次相同 進入黑夜",
					isShow: _this.stage == "voting",
				},
				{
					class: "function-btn special",
					click: () => {
						_this.passSkillFlag = true;
						_this.next();
					},
					disable: false,
					html: "不使用技能",
					isShow: _this.stage == "usingSkill",
				},
			];
		},
	},
};
</script>
