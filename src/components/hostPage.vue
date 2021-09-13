<template>
	<div id="hostPage" v-cloak>
		<donateModal v-show="isShowDonateModal" ref="donateModal" />
		<main-menu-btn @click="isShowMainMenu = true"></main-menu-btn>
		<host-bar :hostMessage="hostMessage" :hostTips="hostTips" :temp="temp"></host-bar>
		<div v-show="hostTips" class="tips-bar bg-color-red-mask flex-center lock-mobile-width">
			<div class="host-tips text-center py-1 fs-7" v-html="hostTips"></div>
		</div>
		<div v-show="!hostTips" class="tips-bar bg-color-black-mask flex-center lock-mobile-width">
			<div class="host-tips text-center py-1 fs-7">（下一步繼續）</div>
		</div>
		<div class="container-sm main-bg-color lock-mobile-width min-vh-100">
			<div class="row">
				<!-- for Complement header height -->
				<div style="height: 170px;"></div>
				<div class="container">
					<div class="row g-3">
						<div class="col-6">
							<player-btn
								v-for="(player, index) in players"
								:is-show="index < _.round(playerNum / 2) + 1"
								:key="index"
								:index="index"
								:player="player"
								:player-name="player.name"
								:role-card="roleCard"
								:disable-btn="disableBtn"
								:tonight="tonight"
								:time-status="timeStatus"
								:is-used-antidote="isUsedAntidote"
								:is-used-poison="isUsedPoison"
								:is-used-counterattack="isUsedCounterattack"
								:magician-had-changed="magicianHadChanged"
								:is-change-expired="isChangeExpired"
								:saved-by-witch="savedByWitch"
								:poisoned-by-witch="poisonedByWitch"
								:counterattack-by-ghost="counterattackByGhost"
								:guard-last-defend="guardLastDefend"
								:wolf-beauty-last-sleep="wolfBeautyLastSleep"
								v-model="selected"
							></player-btn>
						</div>
						<div class="col-6">
							<player-btn
								v-for="(player, index) in players"
								:is-show="index >= _.round(playerNum / 2) + 1"
								:key="index"
								:index="index"
								:player="player"
								:player-name="player.name"
								:role-card="roleCard"
								:disable-btn="disableBtn"
								:tonight="tonight"
								:time-status="timeStatus"
								:is-used-antidote="isUsedAntidote"
								:is-used-poison="isUsedPoison"
								:is-used-counterattack="isUsedCounterattack"
								:magician-had-changed="magicianHadChanged"
								:is-change-expired="isChangeExpired"
								:saved-by-witch="savedByWitch"
								:poisoned-by-witch="poisonedByWitch"
								:counterattack-by-ghost="counterattackByGhost"
								:guard-last-defend="guardLastDefend"
								:wolf-beauty-last-sleep="wolfBeautyLastSleep"
								v-model="selected"
							></player-btn>
						</div>
					</div>
				</div>
				<!-- for Complement bottom bar height -->
				<div
					v-if="
						_.reject(this.functionBarBtns, function(o) {
							return !o.isShow;
						}).length > 0
					"
					style="height: 110px;"
				></div>
				<div v-else style="height: 70px;"></div>
			</div>
		</div>
		<div v-if="warnMessage" class="error-message lock-mobile-width flex-center" @click="warnMessage = ''">
			<div class="mx-3 bg-color-white-mask flex-center text-center row p-2">
				<div class="col-12 text-center flex-center ms-3" style="position: relative;width: auto;">
					<i
						class="bi bi-exclamation-triangle-fill color-yellow"
						style="font-size: 25px;text-shadow: white 1px 1px 2px;position: absolute;left: -30px;"
					></i>
					{{ warnMessage }}
				</div>
				<i class="bi bi-x-circle-fill text-end me-3" style="font-size: 20px;position: absolute;"></i>
			</div>
		</div>
		<function-bar :function-bar-btns="functionBarBtns"></function-bar>
		<bottom-bar @next="next" @back="back" :disable-next="disableNext && selected.length == 0"></bottom-bar>
		<!-- 主選單 -->
		<main-menu v-show="isShowMainMenu" @close="isShowMainMenu = false"></main-menu>
		<!-- 更名功能 -->
		<set-name-modal v-if="showModal == 'setName'" v-model="players" @close="showModal = false"></set-name-modal>

		<!-- 使用解藥 -->
		<modal v-show="showModal == 'usedAntidote'" @close="showModal = false">
			<div slot="header">
				使用<span class="bdr-12 bg-color-green color-white px-2 py-1 mx-1"><i class="bi bi-droplet-fill"></i>解藥</span
				>？
			</div>
			<div slot="footer" class="text-center flex-center ht-50">
				<button class="modal-btn btn-color-white color-clould" v-on:click="witchSave(true)">是</button>
				<button class="modal-btn btn-color-white color-clould" v-on:click="witchSave(false)">否</button>
			</div>
		</modal>
		<!-- 使用毒藥 -->
		<modal v-show="showModal == 'usedPoison'" @close="showModal = false">
			<div slot="header">
				使用<span class="bdr-12 bg-color-purple color-white px-2 py-1 mx-1"><i class="bi bi-droplet"></i>毒藥</span>？
			</div>
			<div slot="footer" class="text-center flex-center ht-50">
				<button class="modal-btn btn-color-white color-clould" v-on:click="poisonAsk(true)">是</button>
				<button class="modal-btn btn-color-white color-clould" v-on:click="poisonAsk(false)">否</button>
			</div>
		</modal>
		<!-- 騎士對決 -->
		<knight-battle-modal
			v-if="showModal == 'knightBattle'"
			@close="showModal = false"
			@submit="knightBattle"
			:stage="stage"
			:players="players"
			:knight-player-index="rolePlayerIndex.knight"
		>
		</knight-battle-modal>
		<!-- 狼人自爆 -->
		<wolf-suicide-modal
			v-if="showModal == 'wolfSuicide'"
			@close="showModal = false"
			@submit="wolfSuicide"
			:stage="stage"
			:players="players"
		></wolf-suicide-modal>
		<!-- 碼表功能 -->
		<timer-modal v-if="showModal == 'timer'" @close="showModal = false"></timer-modal>
		<!-- 發言順序 -->
		<modal v-if="showModal == 'speakingModal'" @close="showModal = false">
			<div slot="header">請抽發言順序</div>
			<div slot="body">
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
				<div class="modal-body-mask"></div>
			</div>
			<div slot="footer" class="text-center flex-center ht-50">
				<button id="randomBtn" class="modal-btn btn-color-white" :disabled="dicing" v-on:click="randomOrder()">
					<span v-html="dice"></span> 抽籤
				</button>
			</div>
		</modal>

		<!-- 遊戲結束 -->
		<game-over-modal
			v-if="showModal == 'gameOver'"
			:game-over-title="gameOverTitle"
			@openDonate="openDonate"
		></game-over-modal>
	</div>
</template>

<script>
import MainMenuBtn from "@/components/hostPage/mainMenuBtn.vue";
import HostBar from "@/components/hostPage/hostBar.vue";
import FunctionBar from "@/components/hostPage/functionBar.vue";
import BottomBar from "@/components/hostPage/bottomBar.vue";

import donateModal from "@/components/common/donateModal.vue";
import MainMenu from "@/components/hostPage/mainMenu.vue";
import Modal from "@/components/hostPage/modal.vue";
import TimerModal from "@/components/hostPage/timerModal.vue";
import PlayerBtn from "@/components/hostPage/playerBtn.vue";
import SetNameModal from "@/components/hostPage/setNameModal.vue";
import KnightBattleModal from "@/components/hostPage/knightBattleModal.vue";
import WolfSuicideModal from "@/components/hostPage/wolfSuicideModal.vue";
import GameOverModal from "@/components/hostPage/gameOverModal.vue";

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
		FunctionBar,
		donateModal,
		MainMenu,
		Modal,
		TimerModal,
		PlayerBtn,
		HostBar,
		BottomBar,
		SetNameModal,
		KnightBattleModal,
		WolfSuicideModal,
		MainMenu,
		MainMenuBtn,
		GameOverModal,
	},
	data: function() {
		return {
			temp: [],
			backupKey: [
				"isSpeakingStage",
				"stage",
				"timeStatus",
				"day",
				"hostMessage",
				"hostTips",
				"actionNum",
				"selected",
				"selectQuota",
				"disableBtn",
				"disableNext",

				"tonight",
				"today",
				"clickPKFlag",
				"passSkillFlag",
				"isUsedAntidote",
				"isUsedPoison",

				"isUsedCounterattack",

				"savedByWitch",
				"poisonedByWitch",
				"counterattackByGhost",

				"guardLastDefend",
				"wolfBeautyLastSleep",

				"magicianHadChanged",
				"isChangeExpired",

				"knightIsUsedSkill",

				"dice",
				"dicing",

				"isShowMainMenu",
				"showModal",
				"gameOverTitle",

				"playerNum",
				"players",
				"countOfRole",
				"rolePlayerIndex",

				"sheriffIndex",
				"sheriffPassCount",
				"passCount",
			],
			roleCard: roleCard,
			isSpeakingStage: false,
			stage: "",
			timeStatus: "day",
			day: 1,
			hostMessage: "準備看牌<br>3、2、1 請確認角色身份",
			hostTips: "（請按右下角【下一步】繼續）",
			warnMessage: "",
			warnMessageTimeoutFun: null,
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
				haveUsedAntidote: false,

				savedByWitch: "",
				poisonedByWitch: "",
				counterattackByGhost: "",

				verifiedBySeer: "",
				verifiedResult: "",
				defendByGuard: "",
				sleepByWolfBeauty: "",
				changedByMagician: {},
				totalDead: [],
			},
			today: {
				killbyHunter: "",
				killbyWerewolvesKing: "",
				killByWolfSuicide: "",
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

			isUsedCounterattack: false,

			savedByWitch: "",
			poisonedByWitch: "",
			counterattackByGhost: "",

			guardLastDefend: "",
			wolfBeautyLastSleep: "",

			magicianHadChanged: [],
			isChangeExpired: false,

			knightIsUsedSkill: false,

			dice: '<i class="bi bi-dice-6-fill"></i>',
			dicing: false,

			isShowDonateModal: false,
			isShowMainMenu: false,
			showModal: "",
			gameOverTitle: "",

			playerNum: 0,
			players: {},
			countOfRole: {},
			rolePlayerIndex: {
				werewolvesKing: 0,
				ghostRider: 0,
				wolfBeauty: 0,
				whiteWolfKing: 0,

				seer: 0,
				witch: 0,
				hunter: 0,
				guard: 0,
				knight: 0,
				idiot: 0,
				magician: 0,
			},

			sheriffIndex: "",
			sheriffPassCount: 0,
			passCount: {
				oneShotLost: 1,
				twoShowLost: 2,
			},

			rule: {
				hasSheriff: false,
				sheriffRule: "",
				witchRule: "",
				victoryCon: "",
				werewolvesKingRule: "",
			},
		};
	},
	created: function() {
		var backupData = _.pick(_.cloneDeep(this.$data), this.backupKey);
		this.backup(backupData);
	},
	mounted: function() {
		window.onbeforeunload = function() {
			return false;
		};

		document.addEventListener("gesturestart", function(event) {
			event.preventDefault();
		});

		var session = sessionStorage.getItem("sessionData");
		if (session != null) {
			//載入上次記錄或重新開局

			session = JSON.parse(session);
			_.forEach(this.$data, (value, key) => {
				this.$data[key] = session[key];
			});
		} else {
			var hostData = JSON.parse(this.$route.params.hostData);
			this.playerNum = hostData.playerNum;
			this.countOfRole = hostData.countOfRole;
			this.rule = hostData.rule;
			this.initPlayer();
		}
	},
	watch: {
		warnMessage: function(val) {
			clearTimeout(this.warnMessageTimeoutFun);
			if (val == "") {
				return;
			}
			this.warnMessageTimeoutFun = setTimeout(() => {
				this.warnMessage = "";
			}, 2000);
		},
		selected: function(val, oldVal) {
			if (val.length == 0 || this.disableBtn) {
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
		initPlayer: function() {
			var initTemp = {};
			for (var i = 1; i <= this.playerNum; i++) {
				initTemp[i] = {
					key: i,
					name: i + "號玩家",
					identity: "",
					isAlive: true,
				};
			}
			this.players = initTemp;
		},
		saveSession: function() {
			sessionStorage.setItem("sessionData", JSON.stringify(this.$data));
		},
		next: function() {
			this.warnMessage = "";
			var backupData = _.pick(_.cloneDeep(this.$data), this.backupKey);
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
					this.warnMessage = e;
					return;
				}
			}
			this.hostMessage = nowRunDown.messageHtml;
			this.hostTips = nowRunDown.tipsHtml;
			if (_.has(nowRunDown, ["modal"])) {
				this.showModal = _.get(nowRunDown, ["modal"], false);
			}
			if (_.has(nowRunDown, ["disablePlayerBtn"])) {
			}
			this.disableBtn = _.get(nowRunDown, ["disablePlayerBtn"], true);

			this.actionNum += 1;
			this.backup(backupData);
			this.saveSession();
		},
		backup: function(backupData) {
			this.temp.push(backupData);
		},
		back: function() {
			if (this.temp.length <= 1) {
				return;
			}

			var previousData = _.last(this.temp);
			this.temp.pop();
			_.forEach(previousData, (value, key) => {
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
			var backupData = _.pick(_.cloneDeep(this.$data), this.backupKey);

			var targetIdentity = _.get(this, ["players", target, "identity"], "");
			var targetCamp = _.get(roleCard, [targetIdentity, "camp"], "");

			if (targetCamp == "bad") {
				this.hostMessage = target + "號 是狼人！<br>準備進入黑夜";
				this.hostTips = "";
				this.setIsAlive(target, false);
				this.isChangeExpired = false;
				this.resetNightData();
				this.resetDayData();
				this.actionNum = 0;
				this.day += 1;
			} else if (targetCamp == "good") {
				this.hostMessage = target + "號 不是狼人！<br>" + knightPlayerKey + "號 騎士以死謝罪";
				this.hostTips = "";
				this.setIsAlive(knightPlayerKey, false);
			}
			this.knightIsUsedSkill = true;
			this.backup(backupData);
		},
		wolfSuicide: function(target) {
			try {
				if (target == "") {
					throw "數量不對";
				}
				this.showModal = false;
				var backupData = _.pick(_.cloneDeep(this.$data), this.backupKey);

				if (this.stage == "sheriffSpeaking") {
					this.hostMessage = target + "號狼人自爆<br>公布昨夜死訊後進入黑夜";
					this.disableBtn = false;
				}

				if (
					(this.players[target].identity == "werewolvesKing" &&
						this.rule.werewolvesKingRule == WEREWOLVES_KING_RULE.SUICIDE_CAN_KILL) ||
					this.players[target].identity == "whiteWolfKing"
				) {
					this.hostMessage = target + "號狼人自爆<br>請使用角色技能";
					this.hostTips = "（請點選技能使用對象）";

					this.disableBtn = false;
					this.stage = "usingSkill";
					//todo 要改
					this.actionNum = 62;

					//如果上警階段已死要有新邏輯

					this.setIsAlive(target, false);
					this.backup(backupData);
					return;
				} else {
					this.hostMessage = target + "號狼人自爆<br>中止所有發言直接進入黑夜";
					this.hostTips = "";
				}
				this.setIsAlive(target, false);
				this.resetNightData();
				this.resetDayData();
				this.actionNum = 0;
				this.day += 1;

				this.backup(backupData);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		setSelectQuota: function(quota) {
			this.selectQuota = quota;
		},
		setIdentity: function(role) {
			try {
				if (this.selected.length != this.selectQuota) {
					throw "請點選玩家";
				}

				_.forEach(this.selected, (key) => {
					if (this.players[key].identity !== "") {
						this.selected = [];
						throw "這位玩家已經有設定角色囉";
					}
				});

				_.forEach(this.selected, (key) => {
					this.players[key].identity = role;
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
		setKillTag: function(type = "", target = "", canPass = false) {
			try {
				if (canPass && this.selected.length == 0) {
					return;
				}
				if (target == "") {
					target = this.selected[0];
				}

				if (!target) {
					throw "請點選玩家";
				}
				if (type == "") {
					throw "Type不對";
				}
				this.tonight.killTag[target] = type;
				this.selected = [];
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		executeKillTag: function() {
			var tonightDead = [];
			_.forEach(this.tonight.killTag, (deadType, index) => {
				if (typeof (this[deadType] === "function")) {
					// 守衛守護 與 女巫解藥
					if (deadType == "wolfKill") {
						if ((this.tonight.defendByGuard == index) ^ this.tonight.haveUsedAntidote) {
							return;
						}
					}

					// 惡靈騎士夜晚不會死亡
					if (this.checkIsChangedbyMagic(index) == this.rolePlayerIndex.ghostRider) {
						return;
					}

					if (this.checkIsChangedbyMagic(index) == this.rolePlayerIndex.wolfBeauty) {
						this.wolfBeautyKill(this.checkIsChangedbyMagic(this.tonight.sleepByWolfBeauty));
						tonightDead.push(this.checkIsChangedbyMagic(this.tonight.sleepByWolfBeauty));
					}
					this[deadType](this.checkIsChangedbyMagic(index));
					tonightDead.push(this.checkIsChangedbyMagic(index));
				}
			});
			this.tonight.totalDead = tonightDead;
		},
		setDefaultFirstSpeaker: function() {
			var death = this.tonight.totalDead;

			if (death.length == 0 || this.tonight.totalDead.length == 0) {
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
		magicianChange: function(target) {
			try {
				if (target.length != 2) {
					throw "數量不對";
				}
				_.forEach(target, (t) => {
					if (this.magicianHadChanged[t] != undefined) {
						this.selected = [];
						throw "不可使用已經交換過的玩家";
					}
				});
				this.tonight.changedByMagician[target[0]] = target[1];
				this.tonight.changedByMagician[target[1]] = target[0];

				_.merge(this.magicianHadChanged, this.tonight.changedByMagician);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		checkIsChangedbyMagic: function(target) {
			if (this.isChangeExpired) {
				return target;
			}
			return this.tonight.changedByMagician[target] != undefined ? this.tonight.changedByMagician[target] : target;
		},
		guardDefend: function(target) {
			try {
				if (!target) {
					throw "請點選玩家";
				}
				if (target == this.guardLastDefend) {
					this.selected = [];
					throw "不可與上一晚守護相同玩家";
				}
				this.tonight.defendByGuard = target;
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		wolfBeautySleep: function(target) {
			try {
				if (!target) {
					throw "請點選玩家";
				}
				if (target == _.get(this, ["rolePlayerIndex", "wolfBeauty"])) {
					throw "不可以誘惑自己啦";
				}

				if (target == this.wolfBeautyLastSleep) {
					this.selected = [];
					throw "不可與上一晚睡相同玩家";
				}
				this.tonight.sleepByWolfBeauty = target;
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		wolfBeautyKill: function(target) {
			try {
				this.setIsAlive(target, false);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		wolfKill: function(target) {
			try {
				this.setIsAlive(target, false);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		witchKill: function(target) {
			try {
				this.isUsedPoison = true;
				this.setIsAlive(target, false);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		ghostRiderKill: function(target) {
			try {
				this.setIsAlive(target, false);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		voteKill: function(target = "") {
			if (target == "") {
				target = this.selected[0];
			}
			try {
				if (!target) {
					throw "請點選玩家";
				}
				this.today.killedByVote = target;
				this.setIsAlive(this.today.killedByVote, false);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		hunterKill: function(time = "night", target = "") {
			try {
				if (target == "") {
					target = this.selected[0];
				}
				if (!target || target == undefined) {
					throw "請點選玩家";
				}
				if (time == "night") {
					if (target == this.rolePlayerIndex.ghostRider) {
						return;
					}
					this.tonight.killbyHunter = target;
				} else if (time == "day") {
					this.today.killbyHunter = target;
				}
				this.setIsAlive(target, false);
			} catch (e) {
				console.log(e);
				throw e;
			}
		},
		werewolvesKingKill: function(time = "night", target = "") {
			try {
				if (target == "") {
					target = this.selected[0];
				}
				if (!target || target == undefined) {
					throw "請點選玩家";
				}
				if (time == "night") {
					if (target == this.rolePlayerIndex.ghostRider) {
						return;
					}
					this.tonight.killbyWerewolvesKing = target;
				} else if (time == "day") {
					this.today.killbyWerewolvesKing = target;
				}
				this.setIsAlive(target, false);
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
			var backupData = _.pick(_.cloneDeep(this.$data), this.backupKey);

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
		seerVerify: function(target = "") {
			try {
				if (!target) {
					target = this.selected[0];
				}
				if (!target) {
					throw "請點選玩家";
				}

				var identity = _.get(this, ["players", target, "identity"], false);
				var camp = _.get(roleCard, [identity, "camp"], false);

				if (identity != "") {
					this.tonight.verifiedResult = camp;
				} else if (identity == false) {
					this.tonight.verifiedResult = "good";
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
			this.judgingTheOutcome();
		},
		judgingTheOutcome: function() {
			var count = {
				wolves: 0,
				priesthood: 0,
				villagers: 0,
			};

			var totalCount = _.sum(_.values(count));

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

			if (this.rule.victoryCon == VICTORY_CON.KILL_SIDE && (count.priesthood == 0 || count.villagers == 0)) {
				this.gameOverTitle = "遊戲結束 狼人獲勝";
				this.showModal = "gameOver";
				this.disableNext = true;
				return;
			}

			if (
				(this.rule.victoryCon == VICTORY_CON.KILL_ALL && count.priesthood == 0 && count.villagers == 0) ||
				(this.rule.victoryCon == VICTORY_CON.KILL_ALL && totalCount == 4 && count.wolves == 2)
			) {
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
				haveUsedAntidote: false,
				verifiedBySeer: "",
				verifiedResult: "",
				defendByGuard: "",
				sleepByWolfBeauty: "",
				changedByMagician: {},
				totalDead: [],
			};
		},
		resetDayData: function() {
			this.today = {
				killbyHunter: "",
				killbyWerewolvesKing: "",
				killByWolfSuicide: "",
				firstSpeak: "",
				speakIndex: 0,
				speakingDirection: "", // left: 順時鐘, right: 逆時鐘
				killedByVote: "",
				PKRoundNum: 0,
			};
		},
		openDonate: function() {
			this.isShowDonateModal = true;
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
					},
				},
				{
					messageHtml: "魔術師請睜眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定魔術師
						if (_.get(_this, ["countOfRole", "magician"], 0) <= 0) {
							return "pass";
						}
						// 僅第一天需要
						if (_this.day <= 1) {
							this.tipsHtml = "（請從下方點選【魔術師】玩家號碼）";
						}

						_this.setSelectQuota(1);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "請選擇你今夜要交換的對象",
					tipsHtml: "",
					action: function() {
						// 沒有設定魔術師
						if (_.get(_this, ["countOfRole", "magician"], 0) <= 0) {
							return "pass";
						}
						// 僅第一天需要
						if (_this.day <= 1) {
							_this.setIdentity("magician");
						}

						// 魔術師已出局
						if (!_.get(_this, ["magicianPlayer", "isAlive"], false) == true) {
							this.tipsHtml = '（念完即可）<br><span class="fs-7">魔術師已出局</span>';
							return;
						}

						// 不得使用的時候要擋
						this.tipsHtml = "（請從下方點選兩位要交換的玩家）";
						_this.stage = "usingSkill";

						_this.setSelectQuota(2);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "魔術師請閉眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定魔術師
						if (_.get(_this, ["countOfRole", "magician"], 0) <= 0) {
							return "pass";
						}

						if (_this.passSkillFlag) {
							_this.passSkillFlag = false;
							_this.stage = "night";
							return;
						}

						if (!_.get(_this, ["magicianPlayer", "isAlive"], false)) {
							return;
						}
						_this.magicianChange(_this.selected);
						_this.stage = "night";
						_this.selected = [];
					},
				},
				{
					messageHtml: "守衛請睜眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定守衛
						if (_.get(_this, ["countOfRole", "guard"], 0) <= 0) {
							return "pass";
						}
						// 僅第一天需要
						if (_this.day <= 1) {
							this.tipsHtml = "（請從下方點選【守衛】玩家號碼）";
						}

						_this.setSelectQuota(1);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "請選擇你今夜要守護的對象",
					tipsHtml: "",
					action: function() {
						// 沒有設定守衛
						if (_.get(_this, ["countOfRole", "guard"], 0) <= 0) {
							return "pass";
						}
						// 僅第一天需要
						if (_this.day <= 1) {
							_this.setIdentity("guard");
						}

						// 已出局
						if (!_.get(_this, ["guardPlayer", "isAlive"], false)) {
							this.tipsHtml = '（念完即可）<br><span class="fs-7">守衛已出局</span>';
							_this.disableNext = false;
							return;
						}

						this.tipsHtml = "（請從下方點選要守護的玩家）";
						_this.stage = "usingSkill";
						_this.setSelectQuota(1);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "守衛請閉眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定守衛
						if (_.get(_this, ["countOfRole", "guard"], 0) <= 0) {
							return "pass";
						}
						// 不使用技能
						if (_this.passSkillFlag) {
							_this.passSkillFlag = false;
							_this.stage = "night";
							return;
						}

						// 已出局
						if (!_.get(_this, ["guardPlayer", "isAlive"], false)) {
							return;
						}

						_this.guardDefend(_this.selected[0]);
						_this.stage = "night";
						_this.selected = [];
					},
				},
				{
					messageHtml: "狼人請睜眼<br>請確認彼此身份",
					tipsHtml: "（請從下方點選【狼王】玩家號碼）",
					action: function() {
						// 沒有設定狼王
						if (_.get(_this, ["countOfRole", "werewolvesKing"], 0) <= 0) {
							return "pass";
						}
						// 僅第一天需要
						if (_this.day > 1) {
							return "pass";
						}

						_this.setSelectQuota(1);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "狼人請睜眼<br>請確認彼此身份",
					tipsHtml: "（請從下方點選【狼美人】玩家號碼）",
					action: function() {
						// 沒有設定狼美
						if (_.get(_this, ["countOfRole", "wolfBeauty"], 0) <= 0) {
							return "pass";
						}
						// 僅第一天需要
						if (_this.day > 1) {
							return "pass";
						}

						if (_.get(_this, ["countOfRole", "werewolvesKing"], 0) > 0) {
							_this.setIdentity("werewolvesKing");
						}

						_this.setSelectQuota(1);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "狼人請睜眼<br>請確認彼此身份",
					tipsHtml: "（請從下方點選【惡靈騎士】玩家號碼）",
					action: function() {
						// 沒有設定惡靈騎士
						if (_.get(_this, ["countOfRole", "ghostRider"], 0) <= 0) {
							return "pass";
						}
						// 僅第一天需要
						if (_this.day > 1) {
							return "pass";
						}

						if (
							_.get(_this, ["countOfRole", "wolfBeauty"], 0) <= 0 &&
							_.get(_this, ["countOfRole", "werewolvesKing"], 0) > 0
						) {
							_this.setIdentity("werewolvesKing");
						}

						if (_.get(_this, ["countOfRole", "wolfBeauty"], 0) > 0) {
							_this.setIdentity("wolfBeauty");
						}

						_this.setSelectQuota(1);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "狼人請睜眼<br>請確認彼此身份",
					tipsHtml: "（請從下方點選【白狼王】玩家號碼）",
					action: function() {
						// 沒有設定惡靈騎士
						if (_.get(_this, ["countOfRole", "whiteWolfKing"], 0) <= 0) {
							return "pass";
						}
						// 僅第一天需要
						if (_this.day > 1) {
							return "pass";
						}

						if (
							_.get(_this, ["countOfRole", "ghostRider"], 0) <= 0 &&
							_.get(_this, ["countOfRole", "wolfBeauty"], 0) <= 0 &&
							_.get(_this, ["countOfRole", "werewolvesKing"], 0) > 0
						) {
							_this.setIdentity("werewolvesKing");
						}

						if (
							_.get(_this, ["countOfRole", "ghostRider"], 0) <= 0 &&
							_.get(_this, ["countOfRole", "wolfBeauty"], 0) > 0
						) {
							_this.setIdentity("wolfBeauty");
						}

						if (_.get(_this, ["countOfRole", "ghostRider"], 0) > 0) {
							_this.setIdentity("ghostRider");
							// 如果第一天就被守衛守到惡靈騎士
							if (!_this.isUsedCounterattack && _this.tonight.defendByGuard == _this.rolePlayerIndex.ghostRider) {
								_this.isUsedCounterattack = true;
								_this.setKillTag("ghostRiderKill", _this.rolePlayerIndex.guard);
								_this.tonight.counterattackByGhost = _this.rolePlayerIndex.guard;
							}
						}

						_this.setSelectQuota(1);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						if (_.get(_this, ["countOfRole", "werewolves"], 0) <= 0) {
							return "pass";
						}

						// 僅第一天需要
						if (_this.day > 1) {
							return "pass";
						}

						if (
							_.get(_this, ["countOfRole", "whiteWolfKing"], 0) <= 0 &&
							_.get(_this, ["countOfRole", "ghostRider"], 0) <= 0 &&
							_.get(_this, ["countOfRole", "wolfBeauty"], 0) <= 0 &&
							_.get(_this, ["countOfRole", "werewolvesKing"], 0) > 0
						) {
							_this.setIdentity("werewolvesKing");
						}

						if (
							_.get(_this, ["countOfRole", "whiteWolfKing"], 0) <= 0 &&
							_.get(_this, ["countOfRole", "ghostRider"], 0) <= 0 &&
							_.get(_this, ["countOfRole", "wolfBeauty"], 0) > 0
						) {
							_this.setIdentity("wolfBeauty");
						}

						if (
							_.get(_this, ["countOfRole", "whiteWolfKing"], 0) <= 0 &&
							_.get(_this, ["countOfRole", "ghostRider"], 0) > 0
						) {
							_this.setIdentity("ghostRider");
							// 如果第一天就被守衛守到惡靈騎士
							if (!_this.isUsedCounterattack && _this.tonight.defendByGuard == _this.rolePlayerIndex.ghostRider) {
								_this.isUsedCounterattack = true;
								_this.setKillTag("ghostRiderKill", _this.rolePlayerIndex.guard);
								_this.tonight.counterattackByGhost = _this.rolePlayerIndex.guard;
							}
						}

						if (_.get(_this, ["countOfRole", "whiteWolfKing"], 0) > 0) {
							_this.setIdentity("whiteWolfKing");
						}

						if (
							_.get(_this, ["countOfRole", "whiteWolfKing"], 0) > 0 ||
							_.get(_this, ["countOfRole", "wolfBeauty"], 0) > 0 ||
							_.get(_this, ["countOfRole", "ghostRider"], 0) > 0 ||
							_.get(_this, ["countOfRole", "werewolvesKing"], 0) > 0
						) {
							this.messageHtml = "狼人請睜眼<br>請確認彼此身份";
							this.tipsHtml = "（請點選其他" + _this.countOfRole.werewolves + "名【狼人】玩家）";
						} else {
							this.messageHtml = "狼人請睜眼";
							this.tipsHtml = "（請從下方按鈕點選" + _this.countOfRole.werewolves + "名【狼人】玩家號碼）";
						}

						var quota = _.get(_this, ["countOfRole", "werewolves"], 0);
						if (quota <= 0) {
							throw "Set werewolves error: quota <= 0";
						}
						_this.setSelectQuota(quota);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "",
					tipsHtml: "（請點選被殺害玩家）",
					action: function() {
						if (_this.day > 1) {
							this.messageHtml = "狼人請睜眼<br>狼人請殺人";
						} else {
							if (
								_.get(_this, ["countOfRole", "werewolves"], 0) <= 0 &&
								_.get(_this, ["countOfRole", "whiteWolfKing"], 0) <= 0 &&
								_.get(_this, ["countOfRole", "ghostRider"], 0) <= 0 &&
								_.get(_this, ["countOfRole", "wolfBeauty"], 0) <= 0 &&
								_.get(_this, ["countOfRole", "werewolvesKing"], 0) > 0
							) {
								_this.setIdentity("werewolvesKing");
							}

							if (
								_.get(_this, ["countOfRole", "werewolves"], 0) <= 0 &&
								_.get(_this, ["countOfRole", "whiteWolfKing"], 0) <= 0 &&
								_.get(_this, ["countOfRole", "ghostRider"], 0) <= 0 &&
								_.get(_this, ["countOfRole", "wolfBeauty"], 0) > 0
							) {
								_this.setIdentity("wolfBeauty");
							}

							if (
								_.get(_this, ["countOfRole", "werewolves"], 0) <= 0 &&
								_.get(_this, ["countOfRole", "whiteWolfKing"], 0) <= 0 &&
								_.get(_this, ["countOfRole", "ghostRider"], 0) > 0
							) {
								_this.setIdentity("ghostRider");
								// 如果第一天就被守衛守到惡靈騎士
								if (!_this.isUsedCounterattack && _this.tonight.defendByGuard == _this.rolePlayerIndex.ghostRider) {
									_this.isUsedCounterattack = true;
									_this.setKillTag("ghostRiderKill", _this.rolePlayerIndex.guard);
									_this.tonight.counterattackByGhost = _this.rolePlayerIndex.guard;
								}
							}

							if (
								_.get(_this, ["countOfRole", "werewolves"], 0) <= 0 &&
								_.get(_this, ["countOfRole", "whiteWolfKing"], 0) > 0
							) {
								_this.setIdentity("whiteWolfKing");
							}

							if (_.get(_this, ["countOfRole", "werewolves"], 0) > 0) {
								_this.setIdentity("werewolves");
							}

							this.messageHtml = "狼人請殺人";
						}

						this.disablePlayerBtn = false;
						_this.setSelectQuota(1);
					},
				},
				{
					messageHtml: "狼人請閉眼",
					tipsHtml: "",
					action: function() {
						if (_this.rolePlayerIndex.ghostRider == _this.selected[0]) {
							_this.selected = [];
							throw "惡靈騎士不能自刀";
						}
						if (_this.rolePlayerIndex.wolfBeauty == _this.selected[0]) {
							_this.selected = [];
							throw "狼美人不能自刀";
						}
						_this.tonight.killedByWerewolves = _this.selected[0];
						_this.setKillTag("wolfKill");
					},
				},
				{
					messageHtml: "狼美人請睜眼",
					tipsHtml: "",
					action: function() {
						if (_.get(_this, ["countOfRole", "wolfBeauty"], 0) <= 0) {
							return "pass";
						}
					},
				},
				{
					messageHtml: "請選擇你要誘惑的對象",
					tipsHtml: "（請點選被誘惑的玩家）",
					action: function() {
						if (_.get(_this, ["countOfRole", "wolfBeauty"], 0) <= 0) {
							return "pass";
						}
						if (!_.get(_this, ["wolfBeauty", "isAlive"], false)) {
							this.tipsHtml = '（念完即可）<br><span class="fs-7">狼美人已出局</span>';
							return;
						}

						this.disablePlayerBtn = false;
						_this.setSelectQuota(1);
					},
				},
				{
					messageHtml: "狼美人請閉眼",
					tipsHtml: "",
					action: function() {
						if (_.get(_this, ["countOfRole", "wolfBeauty"], 0) <= 0) {
							return "pass";
						}

						if (!_.get(_this, ["wolfBeauty", "isAlive"], false)) {
							return;
						}

						_this.wolfBeautySleep(_this.selected[0]);
						_this.selected = [];
					},
				},
				{
					messageHtml: "女巫請睜眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定女巫
						if (_.get(_this, ["countOfRole", "witch"], 0) <= 0) {
							return "pass";
						}

						// 僅第一天需要
						if (_this.day > 1) {
							return;
						}
						this.tipsHtml = "（請點選【女巫】玩家）";
						_this.setSelectQuota(1);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "他死了<br>請問你要使用解藥嗎？",
					tipsHtml: "",
					modal: "",
					action: function() {
						// 沒有設定女巫
						if (_.get(_this, ["countOfRole", "witch"], 0) <= 0) {
							return "pass";
						}

						if (_this.day <= 1) {
							_this.setIdentity("witch");
						}

						var theDead = _.findKey(_this.tonight.killTag, (o) => {
							return o != "";
						});

						var witchPlayerKey = _.findKey(_this.players, (player) => {
							return player == _this.witchPlayer;
						});

						// 已使用解藥
						if (_this.isUsedAntidote) {
							this.tipsHtml = '（念完即可）<br><span class="fs-7">已使用過解藥，不需告知誰死亡</span>';
							return;
						} else {
							this.tipsHtml = "（請用手勢告知 " + theDead + "號 死亡）";
						}

						if (theDead == witchPlayerKey) {
							if (_this.rule.witchRule == WITCH_SELF_HELP_CON.ONLY_FIRST && _this.day > 1) {
								this.tipsHtml += '<br><span class="fs-7">第一夜後不可自救</span>';
								return;
							} else if (_this.rule.witchRule == WITCH_SELF_HELP_CON.CAN_NOT) {
								this.tipsHtml += '<br><span class="fs-7">不可自救</span>';
								return;
							}
						}

						if (_.get(_this, ["witchPlayer", "isAlive"], false) == true) {
							this.modal = "usedAntidote";
						} else {
							this.tipsHtml = '（念完即可）<br><span class="fs-7">女巫已出局</span>';
							_this.disableNext = false;
							return;
						}

						_this.disableNext = true;
					},
				},
				{
					messageHtml: "請問你要使用毒藥嗎？<br>你要毒誰呢？",
					tipsHtml: "",
					modal: "",
					action: function() {
						// 沒有設定女巫
						if (_.get(_this, ["countOfRole", "witch"], 0) <= 0) {
							return "pass";
						}

						if (_this.tonight.haveUsedAntidote) {
							_this.isUsedAntidote = true;
							_this.tonight.savedByWitch = _.findKey(_this.tonight.killTag, (deadType) => {
								return deadType == "wolfKill";
							});

							this.tipsHtml = '（念完即可）<br><span class="fs-7">無法同一夜使用解藥毒藥</span>';
							_this.disableNext = false;
							return;
						}

						if (_.get(_this, ["witchPlayer", "isAlive"], false) == false) {
							this.tipsHtml = '（念完即可）<br><span class="fs-7">女巫已出局</span>';
							_this.disableNext = false;
							return;
						}

						if (_this.isUsedPoison) {
							this.tipsHtml = '（念完即可）<br><span class="fs-7">已無毒藥</span>';
							_this.disableNext = false;
							return;
						}
						this.modal = "usedPoison";
						this.tipsHtml = "";
						this.disablePlayerBtn = false;
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
						if (_.get(_this, ["countOfRole", "witch"], 0) <= 0) {
							return "pass";
						}

						if (
							!_this.tonight.haveUsedAntidote &&
							_.get(_this, ["witchPlayer", "isAlive"], false) == true &&
							!_this.isUsedPoison
						) {
							var target = _this.selected[0];

							_this.tonight.poisonedByWitch = target;
							_this.setKillTag("witchKill", target, true);
							// 魔術師交換

							if (!_this.isUsedCounterattack && target == _this.rolePlayerIndex.ghostRider) {
								_this.isUsedCounterattack = true;
								_this.tonight.counterattackByGhost = _this.rolePlayerIndex.witch;
								_this.setKillTag("ghostRiderKill", _this.rolePlayerIndex.witch);
							}
						}

						_this.disableNext = false;
					},
				},
				{
					messageHtml: "預言家請睜眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定預言家
						if (_.get(_this, ["countOfRole", "seer"], 0) <= 0) {
							return "pass";
						}
						// 僅第一天需要
						if (_this.day > 1) {
							return;
						}

						this.tipsHtml = "（請點選【預言家】玩家）";
						_this.setSelectQuota(1);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "請選擇你要查驗的對象",
					tipsHtml: "（請點選被查驗對象）",
					action: function() {
						// 沒有設定預言家
						if (_.get(_this, ["countOfRole", "seer"], 0) <= 0) {
							return "pass";
						}
						if (_this.day <= 1) {
							_this.setIdentity("seer");
						}
						if (_.get(_this, ["seerPlayer", "isAlive"], false) != true) {
							this.tipsHtml = '（念完即可）<br><span class="fs-7">預言家已淘汰</span>';
							return;
						}

						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "",
					tipsHtml: "（請用手勢告知身份）",
					action: function() {
						// 沒有設定預言家
						if (_.get(_this, ["countOfRole", "seer"], 0) <= 0) {
							return "pass";
						}
						if (!_.get(_this, ["seerPlayer", "isAlive"], false)) {
							return "pass";
						}
						var target = _this.selected[0];

						if (target == _.get(_this.rolePlayerIndex, ["seer"])) {
							_this.selected = [];
							throw "不可查驗自己";
						}
						_this.tonight.verifiedBySeer = target;

						// 魔術師交換
						if (_this.tonight.changedByMagician[target] != undefined) {
							this.tipsHtml =
								"（請用手勢告知身份）<br><span class='fs-7'>他查驗到的是" +
								_this.checkIsChangedbyMagic(target) +
								"號唷</span>";
						}

						if (!_this.isUsedCounterattack && target == _this.rolePlayerIndex.ghostRider) {
							_this.isUsedCounterattack = true;
							_this.tonight.counterattackByGhost = _this.rolePlayerIndex.seer;
							_this.setKillTag("ghostRiderKill", _this.rolePlayerIndex.seer);
						}
						_this.seerVerify(_this.checkIsChangedbyMagic(target));

						this.messageHtml =
							_this.tonight.verifiedResult === "good"
								? '<i class="bi bi-hand-thumbs-up-fill"></i>'
								: '<i class="bi bi-hand-thumbs-down-fill"></i>';
						_this.selected = [];
					},
				},
				{
					messageHtml: "預言家請閉眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定預言家
						if (_.get(_this, ["countOfRole", "seer"], 0) <= 0) {
							return "pass";
						}
					},
				},
				{
					messageHtml: "獵人請睜眼",
					tipsHtml: "（請點選【獵人】玩家）",
					action: function() {
						// 沒有設定獵人
						if (_.get(_this, ["countOfRole", "hunter"], 0) <= 0) {
							return "pass";
						}
						if (_this.day > 1) {
							return "pass";
						}

						_this.setSelectQuota(1);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "獵人請閉眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定獵人
						if (_.get(_this, ["countOfRole", "hunter"], 0) <= 0) {
							return "pass";
						}
						if (_this.day > 1) {
							return "pass";
						}
						_this.setIdentity("hunter");
					},
				},
				{
					messageHtml: "騎士請睜眼",
					tipsHtml: "（請點選【騎士】玩家）",
					action: function() {
						// 沒有設定騎士
						if (_.get(_this, ["countOfRole", "knight"], 0) <= 0) {
							return "pass";
						}
						if (_this.day > 1) {
							return "pass";
						}

						_this.setSelectQuota(1);
						this.disablePlayerBtn = false;
					},
				},
				{
					messageHtml: "騎士請閉眼",
					tipsHtml: "",
					action: function() {
						// 沒有設定騎士
						if (_.get(_this, ["countOfRole", "knight"], 0) <= 0) {
							return "pass";
						}
						if (_this.day > 1) {
							return "pass";
						}
						_this.setIdentity("knight");
					},
				},

				{
					messageHtml: "現在開始競選警長<br>請有意願參選的玩家舉手",
					tipsHtml: "（請點選有競選的玩家）",
					action: function() {
						return "pass";
						// 沒有設定警長
						if (!_this.rule.hasSheriff || _this.sheriffIndex || _this.passCount[_this.rule.sheriffRule]) {
							return "pass";
						}

						// function bar : 無人參選 警長流失
					},
				},

				{
					messageHtml: "天亮請睜眼",
					tipsHtml: "",
					action: function() {
						if (_this.day <= 1) {
							_this.setCity();
						}

						if (
							_this.rule.hasSheriff &&
							!_this.sheriffIndex &&
							_this.sheriffPassCount < _this.passCount[_this.rule.sheriffRule]
						) {
							//抽發言順序
						}

						_this.timeStatus = "day";
					},
				},

				{
					messageHtml: "系統抽出發言順序<br>由XXX開始發言",
					tipsHtml: "",
					action: function() {
						return "pass";
						if (
							!_this.rule.hasSheriff ||
							_this.sheriffIndex ||
							_this.sheriffPassCount >= _this.passCount[_this.rule.sheriffRule]
						) {
							return "pass";
						}

						_this.stage = "sheriffSpeaking";
					},
				},

				{
					messageHtml: "請未參選警長的玩家準備投票",
					tipsHtml: "",
					action: function() {
						return "pass";
						if (
							!_this.rule.hasSheriff ||
							_this.sheriffIndex ||
							_this.sheriffPassCount >= _this.passCount[_this.rule.sheriffRule]
						) {
							return "pass";
						}
					},
				},

				{
					messageHtml: "3、2、1 請投票",
					tipsHtml: "（請選擇當選警長玩家）",
					action: function() {
						return "pass";
						if (
							!_this.rule.hasSheriff ||
							_this.sheriffIndex ||
							_this.sheriffPassCount >= _this.passCount[_this.rule.sheriffRule]
						) {
							return "pass";
						}
						_this.stage = "sheriffVoting";

						// function bar : 平票進行PK
					},
				},
				{
					messageHtml: "請平手玩家再次依序發表政見",
					tipsHtml: "",
					action: function() {
						return "pass";
						if (
							!_this.rule.hasSheriff ||
							_this.sheriffIndex ||
							_this.sheriffPassCount >= _this.passCount[_this.rule.sheriffRule]
						) {
							return "pass";
						}
						_this.stage = "sheriffSpeaking";
					},
				},
				{
					messageHtml: "再次準備投票<br>若再次平手本局警長將流失",
					tipsHtml: "",
					action: function() {
						return "pass";
						if (
							!_this.rule.hasSheriff ||
							_this.sheriffIndex ||
							_this.sheriffPassCount >= _this.passCount[_this.rule.sheriffRule]
						) {
							return "pass";
						}
					},
				},
				{
					messageHtml: "3、2、1 請投票",
					tipsHtml: "（請選擇當選警長玩家）",
					action: function() {
						return "pass";
						if (
							!_this.rule.hasSheriff ||
							_this.sheriffIndex ||
							_this.sheriffPassCount >= _this.passCount[_this.rule.sheriffRule]
						) {
							return "pass";
						}
						_this.stage = "sheriffVoting";

						// function bar : 再次平手 警長流失
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						return "pass";
						if (
							!_this.rule.hasSheriff ||
							_this.sheriffIndex ||
							_this.sheriffPassCount >= _this.passCount[_this.rule.sheriffRule]
						) {
							return "pass";
						}
						_this.stage = "day";

						// ＸＸＸ當選警長 / 警長流失
					},
				},

				// 公布死訊
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						_this.executeKillTag();
						_this.tonight.killTag = {};
						_this.guardLastDefend = _this.tonight.defendByGuard;
						_this.wolfBeautyLastSleep = _this.tonight.sleepByWolfBeauty;

						if (_this.tonight.totalDead.length == 0) {
							this.messageHtml = "昨晚是平安夜";
						} else {
							this.messageHtml =
								"昨晚 " +
								_this.tonight.totalDead
									.sort(function(a, b) {
										return a - b;
									})
									.join("號、") +
								"號 玩家出局";

							this.messageHtml += _this.day <= 1 ? "<br>請發表遺言" : "<br>沒有遺言";

							var wolfTarget = _this.checkIsChangedbyMagic(_.get(_this, ["tonight", "killedByWerewolves"], ""));
							if (wolfTarget === _this.rolePlayerIndex.hunter || wolfTarget === _this.rolePlayerIndex.werewolvesKing) {
								if (
									!_.get(_this, ["players", wolfTarget, "isAlive"], false) &&
									wolfTarget != _this.tonight.poisonedByWitch
								) {
									this.tipsHtml = "（有玩家可使用技能！請按下一步）";
								}
							}
						}
					},
				},
				//夜晚 狼刀到獵人
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						// 先確認獵人是被刀的對象
						var wolfTarget = _this.checkIsChangedbyMagic(_.get(_this, ["tonight", "killedByWerewolves"], ""));
						if (wolfTarget !== _this.rolePlayerIndex.hunter) {
							return "pass";
						}
						// 在確認他是否有死
						if (_.get(_this, ["players", wolfTarget, "isAlive"], false)) {
							return "pass";
						}
						// 被毒死沒技能
						if (_this.tonight.poisonedByWitch == wolfTarget) {
							return "pass";
						}

						this.messageHtml = wolfTarget + "號玩家<br>請使用角色技能";
						this.tipsHtml = "（請點選技能使用對象）";
						this.disablePlayerBtn = false;
						_this.stage = "usingSkill";
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						// 先確認獵人是被刀的對象
						var wolfTarget = _this.checkIsChangedbyMagic(_.get(_this, ["tonight", "killedByWerewolves"], ""));
						if (wolfTarget !== _this.rolePlayerIndex.hunter) {
							return "pass";
						}
						// 在確認他是否有死
						if (_.get(_this, ["players", wolfTarget, "isAlive"], false)) {
							return "pass";
						}
						// 被毒死沒技能
						if (_this.tonight.poisonedByWitch == wolfTarget) {
							return "pass";
						}

						if (_this.passSkillFlag) {
							_this.stage = "day";
							this.messageHtml = wolfTarget + "號玩家不使用技能";
							_this.passSkillFlag = false;
							return;
						}

						var target = _this.checkIsChangedbyMagic(_this.selected[0]);
						if (!target || target == undefined) {
							throw "請點選玩家";
						}

						if (target == _this.rolePlayerIndex.ghostRider) {
							this.messageHtml = _this.selected[0] + "號玩家沒事，遊戲繼續";
							this.tipsHtml = "（惡靈騎士不死於夜槍）";
						}
						// 狼美人魅惑對象先死
						else if (target == _this.rolePlayerIndex.wolfBeauty) {
							var sleepTarget = _this.checkIsChangedbyMagic(_this.tonight.sleepByWolfBeauty);
							if (_.get(_this, ["players", sleepTarget, "isAlive"])) {
								_this.wolfBeautyKill(sleepTarget);
								_this.tonight.totalDead.push(sleepTarget);
								this.messageHtml =
									[sleepTarget, target]
										.sort(function(a, b) {
											return a - b;
										})
										.join("號、") + "號 玩家出局";
							} else {
								this.messageHtml = target + "號 玩家出局";
							}

							this.messageHtml += _this.day <= 1 ? "<br>請發表遺言" : "<br>沒有遺言";
							_this.hunterKill("night", target);
							_this.tonight.totalDead.push(target);
						} else {
							if (!_.get(_this, ["players", target, "isAlive"])) {
								this.messageHtml = _this.selected[0] + "號玩家沒事，遊戲繼續";
							} else {
								this.messageHtml = target + "號玩家出局";
								this.messageHtml += _this.day <= 1 ? "<br>請發表遺言" : "<br>沒有遺言";
								_this.hunterKill("night", target);
								_this.tonight.totalDead.push(target);

								if (target == _this.rolePlayerIndex.werewolvesKing) {
									this.tipsHtml = "（有玩家可使用技能！請按下一步）";
								}
							}
						}

						_this.isChangeExpired = true;
						_this.selected = [];
						_this.stage = "day";
					},
				},
				// 獵槍殺到狼王case
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var hunterTarget = _.get(_this, ["tonight", "killbyHunter"], "");
						if (hunterTarget !== _this.rolePlayerIndex.werewolvesKing) {
							return "pass";
						}
						if (_.get(_this, ["players", hunterTarget, "isAlive"], false)) {
							return "pass";
						}

						this.messageHtml = hunterTarget + "號玩家<br>請使用角色技能";
						this.tipsHtml = "（請點選技能使用對象）";
						this.disablePlayerBtn = false;
						_this.stage = "usingSkill";
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var hunterTarget = _.get(_this, ["tonight", "killbyHunter"], "");
						if (
							hunterTarget !== _this.rolePlayerIndex.werewolvesKing ||
							_.get(_this, ["players", hunterTarget, "isAlive"], false)
						) {
							return "pass";
						}

						if (_this.passSkillFlag) {
							_this.stage = "day";
							this.messageHtml = hunterTarget + "號玩家不使用技能";
							_this.passSkillFlag = false;
							return;
						}

						var target = _this.selected[0];

						if (!target || target == undefined) {
							throw "請點選玩家";
						}
						if (target == _this.rolePlayerIndex.wolfBeauty) {
							var sleepTarget = _this.checkIsChangedbyMagic(_this.tonight.sleepByWolfBeauty);
							if (_.get(_this, ["players", sleepTarget, "isAlive"])) {
								_this.wolfBeautyKill(sleepTarget);
								_this.tonight.totalDead.push(sleepTarget);

								this.messageHtml =
									[sleepTarget, target]
										.sort(function(a, b) {
											return a - b;
										})
										.join("號、") + "號 玩家出局";
							} else {
								this.messageHtml = target + "號 玩家出局";
							}
							_this.werewolvesKingKill("day");
							_this.tonight.totalDead.push(target);
						} else {
							this.messageHtml = target + "號玩家出局";
							_this.werewolvesKingKill("day");
							_this.tonight.totalDead.push(target);
						}
						this.messageHtml += _this.day <= 1 ? "<br>請發表遺言" : "<br>沒有遺言";
						_this.stage = "day";
						_this.selected = [];
					},
				},
				// 夜晚 狼王自刀
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						// 先確認狼王是被刀的對象
						var wolfTarget = _this.checkIsChangedbyMagic(_.get(_this, ["tonight", "killedByWerewolves"], ""));
						if (wolfTarget !== _this.rolePlayerIndex.werewolvesKing) {
							return "pass";
						}
						// 在確認他是否有死
						if (_.get(_this, ["players", wolfTarget, "isAlive"], false)) {
							return "pass";
						}
						// 被毒死沒技能
						if (_this.tonight.poisonedByWitch == wolfTarget) {
							return "pass";
						}

						this.messageHtml = wolfTarget + "號玩家<br>請使用角色技能";
						this.tipsHtml = "（請點選技能使用對象）";
						this.disablePlayerBtn = false;
						_this.stage = "usingSkill";
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						// 先確認狼王是被刀的對象
						var wolfTarget = _this.checkIsChangedbyMagic(_.get(_this, ["tonight", "killedByWerewolves"], ""));
						if (wolfTarget !== _this.rolePlayerIndex.werewolvesKing) {
							return "pass";
						}
						// 在確認他是否有死
						if (_.get(_this, ["players", wolfTarget, "isAlive"], false)) {
							return "pass";
						}
						// 被毒死沒技能
						if (_this.tonight.poisonedByWitch == wolfTarget) {
							return "pass";
						}

						if (_this.passSkillFlag) {
							_this.stage = "day";
							this.messageHtml = wolfTarget + "號玩家不使用技能";
							_this.passSkillFlag = false;
							return;
						}

						var target = _this.checkIsChangedbyMagic(_this.selected[0]);
						if (!target || target == undefined) {
							throw "請點選玩家";
						}

						if (target == _this.rolePlayerIndex.ghostRider) {
							this.messageHtml = _this.selected[0] + "號玩家沒事";
							this.tipsHtml = "（惡靈騎士不死於夜槍）";
						}
						// 狼美人魅惑對象先死
						else if (target == _this.rolePlayerIndex.wolfBeauty) {
							var sleepTarget = _this.checkIsChangedbyMagic(_this.tonight.sleepByWolfBeauty);
							if (_.get(_this, ["players", sleepTarget, "isAlive"])) {
								_this.wolfBeautyKill(sleepTarget);
								_this.tonight.totalDead.push(sleepTarget);

								this.messageHtml =
									[sleepTarget, target]
										.sort(function(a, b) {
											return a - b;
										})
										.join("號、") + "號 玩家出局";
							} else {
								this.messageHtml = target + "號 玩家出局";
							}
							this.messageHtml += _this.day <= 1 ? "<br>請發表遺言" : "<br>沒有遺言";
							_this.werewolvesKingKill("night", target);
							_this.tonight.totalDead.push(target);
						} else {
							if (!_.get(_this, ["players", target, "isAlive"])) {
								this.messageHtml = _this.selected[0] + "號玩家沒事，遊戲繼續";
							} else {
								this.messageHtml = target + "號玩家出局";
								this.messageHtml += _this.day <= 1 ? "<br>請發表遺言" : "<br>沒有遺言";

								_this.werewolvesKingKill("night", target);
								_this.tonight.totalDead.push(target);

								if (target == _this.rolePlayerIndex.hunter) {
									this.tipsHtml = "（有玩家可使用技能！請按下一步）";
								}
							}
						}

						_this.isChangeExpired = true;

						_this.selected = [];
						_this.stage = "day";
					},
				},
				// 狼王殺到獵人 case
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var wolfKingTarget = _.get(_this, ["tonight", "killbyWerewolvesKing"], "");
						if (wolfKingTarget !== _this.rolePlayerIndex.hunter) {
							return "pass";
						}
						if (_.get(_this, ["players", wolfKingTarget, "isAlive"], false)) {
							return "pass";
						}

						this.messageHtml = wolfKingTarget + "號玩家<br>請使用角色技能";
						this.tipsHtml = "（請點選技能使用對象）";
						this.disablePlayerBtn = false;
						_this.stage = "usingSkill";
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var wolfKingTarget = _.get(_this, ["tonight", "killbyWerewolvesKing"], "");
						if (wolfKingTarget !== _this.rolePlayerIndex.hunter) {
							return "pass";
						}
						if (_.get(_this, ["players", wolfKingTarget, "isAlive"], false)) {
							return "pass";
						}

						if (_this.passSkillFlag) {
							_this.stage = "day";
							this.messageHtml = _this.tonight.killbyWerewolvesKing + "號玩家不使用技能";
							_this.passSkillFlag = false;
							return;
						}

						var target = _this.selected[0];
						if (!target || target == undefined) {
							throw "請點選玩家";
						}

						if (target == _this.rolePlayerIndex.wolfBeauty) {
							var sleepTarget = _this.checkIsChangedbyMagic(_this.tonight.sleepByWolfBeauty);
							if (_.get(_this, ["players", sleepTarget, "isAlive"])) {
								_this.wolfBeautyKill(sleepTarget);
								_this.tonight.totalDead.push(sleepTarget);

								this.messageHtml =
									[sleepTarget, target]
										.sort(function(a, b) {
											return a - b;
										})
										.join("號、") + "號 玩家出局";
							} else {
								this.messageHtml = target + "號 玩家出局";
							}
							_this.hunterKill("day");
							_this.tonight.totalDead.push(target);
						} else {
							this.messageHtml = target + "號玩家出局";
							_this.hunterKill("day");
							_this.tonight.totalDead.push(target);
						}
						this.messageHtml += _this.day <= 1 ? "<br>請發表遺言" : "<br>沒有遺言";
						_this.stage = "day";
						_this.selected = [];
					},
				},
				{
					messageHtml: "抽發言順序",
					tipsHtml: "（請按抽籤）",
					modal: "speakingModal",
					action: function() {
						_this.selected = [];
						_this.setDefaultFirstSpeaker();
						_this.disableNext = true;

						if (_this.tonight.totalDead != 0) {
							return "pass";
						}
					},
				},
				{
					messageHtml: "",
					tipsHtml: "（全部玩家發言完畢後，下一步繼續）<br><span class='fs-7'>歡迎使用碼表功能</span>",
					modal: "timer",
					action: function() {
						_this.stage = "speaking";
						_this.isChangeExpired = true;
						_this.showModal = false;
						_this.disableNext = false;
						var totalPlayers = _.size(_this.players);
						var next =
							_this.today.speakingDirection == "left" ? _this.today.firstSpeak + 1 : _this.today.firstSpeak - 1;
						this.messageHtml = "由" + _this.today.firstSpeak + "號玩家開始發言";
					},
				},
				{
					messageHtml: "現在準備投票",
					tipsHtml: "",
					action: function() {
						_this.showModal = false;
					},
				},
				{
					messageHtml: "3、2、1 請投票",
					tipsHtml: "（請點選遭投票出局玩家）",
					action: function() {
						this.disablePlayerBtn = false;
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
							this.messageHtml = "進行辯論<br>請平手玩家依序再次進行發言";
							_this.stage = "PKSpeaking";
							return;
						}

						var target = _this.selected[0];
						if (target == _this.rolePlayerIndex.wolfBeauty) {
							var sleepTarget = _this.checkIsChangedbyMagic(_this.tonight.sleepByWolfBeauty);

							if (_.get(_this, ["players", sleepTarget, "isAlive"])) {
								_this.wolfBeautyKill(sleepTarget);
								this.messageHtml =
									[sleepTarget, target]
										.sort(function(a, b) {
											return a - b;
										})
										.join("號、") + "號 玩家出局";
							} else {
								this.messageHtml = target + "號 玩家出局";
							}
							_this.voteKill(target);
						} else {
							this.messageHtml = target + "號玩家出局";
							_this.voteKill(target);
						}

						this.messageHtml += "<br>請發表遺言";
						if (target == _this.rolePlayerIndex.hunter || target == _this.rolePlayerIndex.werewolvesKing) {
							this.tipsHtml = "（有玩家可使用技能！請按下一步）";
						}

						_this.selected = [];
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
							this.disablePlayerBtn = false;
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
							var target = _this.selected[0];
							if (target == _this.rolePlayerIndex.wolfBeauty) {
								var sleepTarget = _this.checkIsChangedbyMagic(_this.tonight.sleepByWolfBeauty);
								if (_.get(_this, ["players", sleepTarget, "isAlive"])) {
									_this.wolfBeautyKill(sleepTarget);
									this.messageHtml =
										[sleepTarget, target]
											.sort(function(a, b) {
												return a - b;
											})
											.join("號、") + "號 玩家出局";
								} else {
									this.messageHtml = target + "號 玩家出局";
								}
								_this.voteKill(target);
							} else {
								this.messageHtml = target + "號玩家出局";
								_this.voteKill(target);
							}
							this.messageHtml += "<br>請發表遺言";

							if (target == _this.rolePlayerIndex.hunter || target == _this.rolePlayerIndex.werewolvesKing) {
								this.tipsHtml = "（有玩家可使用技能！請按下一步）";
							}

							_this.selected = [];
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
							this.disablePlayerBtn = false;
							_this.stage = "usingSkill";
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

						var target = _this.selected[0];
						if (target == _this.rolePlayerIndex.wolfBeauty) {
							var sleepTarget = _this.tonight.sleepByWolfBeauty;
							if (_.get(_this, ["players", sleepTarget, "isAlive"])) {
								_this.wolfBeautyKill(sleepTarget);
								this.messageHtml =
									[sleepTarget, target]
										.sort(function(a, b) {
											return a - b;
										})
										.join("號、") + "號 玩家出局";
							} else {
								this.messageHtml = target + "號 玩家出局";
							}
						} else {
							this.messageHtml = target + "號玩家出局";
						}

						this.messageHtml += "<br>請發表遺言";
						if (target == _this.rolePlayerIndex.hunter || target == _this.rolePlayerIndex.werewolvesKing) {
							this.tipsHtml = "（有玩家可使用技能！請按下一步）";
						}

						if (theDeadIdentity === "hunter") {
							_this.hunterKill("day");
							_this.stage = "day";
							_this.selected = [];
							return;
						} else if (theDeadIdentity === "werewolvesKing") {
							_this.werewolvesKingKill("day");
							_this.stage = "day";
							_this.selected = [];
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
								this.disablePlayerBtn = false;
								_this.stage = "usingSkill";
								return;
							}
						}
						if (_this.today.killbyWerewolvesKing != "") {
							var theDead = _this.today.killbyWerewolvesKing;
							if (_.get(_this, ["players", theDead, "identity"], "") === "hunter") {
								this.messageHtml = theDead + "號玩家<br>請使用角色技能";
								this.tipsHtml = "（請點選技能使用對象）";
								this.disablePlayerBtn = false;
								_this.stage = "usingSkill";
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

								var target = _this.selected[0];
								if (target == _this.rolePlayerIndex.wolfBeauty) {
									var sleepTarget = _this.tonight.sleepByWolfBeauty;
									if (_.get(_this, ["players", sleepTarget, "isAlive"])) {
										_this.wolfBeautyKill(sleepTarget);
										this.messageHtml =
											[sleepTarget, target]
												.sort(function(a, b) {
													return a - b;
												})
												.join("號、") + "號 玩家出局";
									} else {
										this.messageHtml = target + "號 玩家出局";
									}
								} else {
									this.messageHtml = target + "號玩家出局";
								}

								this.messageHtml += "<br>請發表遺言";
								_this.werewolvesKingKill("day");
								_this.stage = "day";
								_this.selected = [];

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

								var target = _this.selected[0];
								if (target == _this.rolePlayerIndex.wolfBeauty) {
									var sleepTarget = _this.tonight.sleepByWolfBeauty;
									if (_.get(_this, ["players", sleepTarget, "isAlive"])) {
										_this.wolfBeautyKill(sleepTarget);
										this.messageHtml =
											[sleepTarget, target]
												.sort(function(a, b) {
													return a - b;
												})
												.join("號、") + "號 玩家出局";
									} else {
										this.messageHtml = target + "號 玩家出局";
									}
								} else {
									this.messageHtml = target + "號玩家出局";
								}

								this.messageHtml += "<br>請發表遺言";
								_this.hunterKill("day");
								_this.stage = "day";
								_this.selected = [];

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
						} else {
							return "pass";
						}
						_this.stage = "day";
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						_this.isChangeExpired = false;
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
						try {
							if (_this.passSkillFlag) {
								_this.stage = "day";
								this.messageHtml = "不使用技能";
								_this.passSkillFlag = false;
								return;
							}

							if (_this.selected.length == 0) {
								throw "請點選玩家";
							}

							this.messageHtml = _this.selected[0] + "號玩家出局<br>沒有遺言";
							_this.setIsAlive(_this.selected[0], false);
							_this.today.killByWolfSuicide = _this.selected[0];

							if (_this.selected[0] == _this.rolePlayerIndex.hunter) {
								this.tipsHtml = "（有玩家可使用技能！請按下一步）";
							}
							_this.selected = [];
							_this.stage = "day";
						} catch (e) {
							throw "請點選玩家";
						}
					},
				},
				//爆到獵人
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var theDead = _this.today.killByWolfSuicide;
						if (theDead == "" || _this.players[theDead].identity !== "hunter") {
							return "pass";
						}
						this.messageHtml = theDead + "號玩家<br>請使用角色技能";
						this.tipsHtml = "（請點選技能使用對象）";
						this.disablePlayerBtn = false;
						_this.selected = [];
						_this.stage = "usingSkill";
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
						var theDead = _this.today.killByWolfSuicide;
						if (theDead == "" || theDead !== _this.rolePlayerIndex.hunter) {
							return "pass";
						}
						_this.hunterKill("day");
						if (_this.selected[0] == _this.rolePlayerIndex.werewolvesKing) {
							this.tipsHtml = "（有玩家可使用技能！請按下一步）";
						}

						this.messageHtml = _this.selected[0] + "號玩家出局<br>沒有遺言";
						_this.stage = "day";
						_this.selected = [];
					},
				},
				// 又槍到狼王
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var theDead = _this.today.killbyHunter;
						if (theDead == "" || theDead != _this.rolePlayerIndex.werewolvesKing) {
							return "pass";
						}
						this.messageHtml = theDead + "號玩家<br>請使用角色技能";
						this.tipsHtml = "（請點選技能使用對象）";
						this.disablePlayerBtn = false;
						_this.selected = [];
						_this.stage = "usingSkill";
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						var theDead = _this.today.killbyHunter;
						if (theDead == "" || theDead != _this.rolePlayerIndex.werewolvesKing) {
							return "pass";
						}

						if (_this.passSkillFlag) {
							_this.stage = "day";
							this.messageHtml = _this.today.killbyHunter + "號玩家不使用技能";
							_this.passSkillFlag = false;
							return;
						}

						_this.werewolvesKingKill("day");
						this.messageHtml = _this.selected[0] + "號玩家出局<br>沒有遺言";
						_this.stage = "day";
						_this.selected = [];
					},
				},
				{
					messageHtml: "",
					tipsHtml: "",
					action: function() {
						_this.isChangeExpired = false;
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
		guardPlayer: function() {
			return this.players[this.rolePlayerIndex.guard];
		},
		magicianPlayer: function() {
			return this.players[this.rolePlayerIndex.magician];
		},
		wolfBeauty: function() {
			return this.players[this.rolePlayerIndex.wolfBeauty];
		},
		functionBarBtns: function() {
			var _this = this;
			return [
				{
					class: "function-btn btn-color-wine-red color-white t-shadow-1",
					click: () => {
						_this.showModal = "knightBattle";
					},
					disable: _this.knightBattleDisable,
					html: "騎士查驗",
					isShow: _this.stage == "speaking" && _this.countOfRole.knight >= 1,
				},
				{
					class: "function-btn btn-color-wine-red color-white t-shadow-1",
					click: () => {
						_this.showModal = "wolfSuicide";
					},
					disable: false,
					html: "狼人自爆",
					isShow: _this.stage == "speaking",
				},
				{
					class: "function-btn btn-color-wine-red color-white t-shadow-1",
					click: () => {
						_this.showModal = "timer";
					},
					disable: false,
					html: "碼表功能",
					isShow: _this.stage == "speaking",
				},
				// {
				// 	class: "function-btn btn-color-green",
				// 	click: () => {
				// 		_this.showModal = "setName";
				// 	},
				// 	disable: false,
				// 	html: "更改名稱",
				// 	isShow: !(_this.stage == "voting" || _this.stage == "usingSkill"),
				// },
				{
					class: "function-btn btn-color-gold",
					click: () => {
						_this.$parent.isShow.donateModal = true;
					},
					disable: false,
					html: "贊助支持",
					isShow: false,
				},
				{
					class: "function-btn special btn-color-red t-shadow-1",
					click: _this.pkRound,
					disable: false,
					html: _this.today.PKRoundNum == 0 ? "票數相同 進行辯論" : "票數再次相同 進入黑夜",
					isShow: _this.stage == "voting",
				},
				{
					class: "function-btn special btn-color-red t-shadow-1",
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
