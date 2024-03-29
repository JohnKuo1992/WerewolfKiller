<template>
	<div id="gameRoom" class="color-deep-gray min-vh-100">
		<main-menu-btn @click="isShowMainMenu = true"></main-menu-btn>
		<main-menu v-show="isShowMainMenu" @close="isShowMainMenu = false"></main-menu>
		<donateModal v-show="isShowDonateModal" />
		<shareModal v-show="isShowShareModal" />
		<div class="container-sm main-bg-color lock-mobile-width py-2">
			<div class="col-12 mt-3 bg-color-white-t-lv2 bdr-12 b-shadow-1">
				<div class="ht-20"></div>
				<board class="p-2 col-10 offset-1" :setting="boardData" :role-card="roleCard"></board>
			</div>
			<div class="ht-10"></div>
			<div class="color-clould row">
				<div class="col-12 flex-center"><i class="bi bi-chevron-double-down"></i></div>
			</div>
			<div class="col-12 flex-center fs-7 text-center color-clould mt-1">
				為避免不小心看到別人的牌<br />點開看牌後會暫時鎖住其他號碼
			</div>
			<div class="row mt-2">
				<div class="col-6">
					<div
						v-for="(player, index) in players"
						v-show="index + 1 < _.round(playerNum / 2) + 1"
						:key="index"
						class="player-btn-container text-center color-clould col-12 mt-2"
						@click="goto(index)"
					>
						<div
							class="player-btn flex-center justify-content-start ps-2"
							:class="{disabled: isLockCard && index + 1 != openCard.cid}"
						>
							<span class="fs-5 ms-1 wd-25">{{ index + 1 }}</span>
							<span class="fs-7 ms-1">號玩家 點我看牌</span>
						</div>
					</div>
				</div>
				<div class="col-6">
					<div
						v-for="(player, index) in players"
						v-show="index + 1 >= _.round(playerNum / 2) + 1"
						:key="index"
						class="player-btn-container text-center color-clould col-12 mt-2"
						@click="goto(index)"
					>
						<div
							class="player-btn flex-center justify-content-start ps-2"
							:class="{disabled: isLockCard && index + 1 != openCard.cid}"
						>
							<span class="fs-5 ms-1 wd-25">{{ index + 1 }}</span>
							<span class="fs-7 ms-1">號玩家 點我看牌</span>
						</div>
					</div>
				</div>
			</div>
			<div class="ht-10"></div>
			<div class="player-btn-container color-clould col-12 mt-2" @click="goHost()">
				<div class="player-btn flex-center">
					主持人請點我
				</div>
			</div>

			<div class="ht-20"></div>
			<custom-footer></custom-footer>
			<div class="row">
				<button
					class="submit-bar flex-center bg-color-red color-clould lock-mobile-width ht-50 p-2"
					@click="isShowShareModal = true"
				>
					<span class="fs-4">分享本局連結</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import MainMenuBtn from "@/components/hostPage/mainMenuBtn.vue";
import MainMenu from "@/components/hostPage/mainMenu.vue";
import donateModal from "@/components/common/donateModal.vue";
import shareModal from "@/components/gameRoom/shareModal.vue";
import customFooter from "@/components/common/customFooter.vue";

import board from "@/components/hostSettingPage/board.vue";
import {VICTORY_CON, WEREWOLVES_KING_RULE, WITCH_SELF_HELP_CON, SHERIFF_RULE, roleCard} from "@/assets/js/const.js";
import {storage} from "@/assets/js/storage.js";

export default {
	components: {
		MainMenuBtn,
		MainMenu,
		donateModal,
		shareModal,
		board,
		customFooter,
	},
	data: function() {
		return {
			isShowMainMenu: false,
			isShowDonateModal: false,
			isShowShareModal: false,
			isLockCard: false,
			openCard: null,
			href: window.location.href,
			playerNum: 0,
			players: [],
			roleCard: roleCard,
			gameData: {},
			hostData: {},
			boardData: {
				title: "本局所使用的板子/規則",
				tips: "",
				depiction: "",
				countOfRole: {
					werewolves: 2,
					seer: 1,
					witch: 1,
					villagers: 2,
				},
				highLightRole: [],
				rule: {
					victoryCon: VICTORY_CON.KILL_ALL,
					hasSheriff: false,
					sheriffRule: "",
					witchRule: WITCH_SELF_HELP_CON.ONLY_FIRST,
					werewolvesKingRule: WEREWOLVES_KING_RULE.SUICIDE_CAN_NOT_KILL,
				},
			},
		};
	},
	mounted: function() {
		try {
			this.gameData = JSON.parse(this.$route.params.gameData);

			// init
			var roleMap = {};
			var rule = {};
			var count = {};
			var num = 0;
			_.forEach(this.roleCard, (role) => {
				this.boardData.highLightRole.push(role.id);
				roleMap[role.urlShorthand] = role.id;
				count[role.id] = 0;
			});

			num = this.gameData.p.length / 2;
			for (var i = 0; i < num; i++) {
				var player = _.get(roleMap, [this.gameData.p.slice(i * 2, i * 2 + 2)], "");
				if (player == "") {
					throw "資料錯誤";
				}

				if (_.has(count, player)) {
					count[player] += 1;
				} else {
					throw "資料錯誤：未知的角色";
				}

				this.players.push(player);
			}

			var rDecode = _.split(this.gameData.r, ",");
			rule["victoryCon"] = rDecode[0];
			rule["hasSheriff"] = rDecode[1];
			rule["sheriffRule"] = rDecode[2];
			rule["witchRule"] = rDecode[3];
			rule["werewolvesKingRule"] = rDecode[4];

			this.playerNum = num;
			this.boardData.rule = rule;
			this.boardData.countOfRole = count;

			this.hostData = {
				playerNum: num,
				countOfRole: _.reduce(
					count,
					function(result, value, key) {
						if (value > 0) {
							result[key] = value;
						}
						return result;
					},
					{}
				),
				rule: rule,
				gid: this.gameData.gid,
			};
		} catch (error) {
			console.log(error);
		}

		this.openCard = storage.getItem("openCard");
		if (this.openCard.gid != this.gameData.gid) {
			this.isLockCard = false;
		} else {
			console.log(this.openCard.cid);
			if (this.openCard.cid == false || this.openCard.cid == null) {
				this.isLockCard = false;
			} else {
				this.isLockCard = true;
			}
		}
	},
	methods: {
		goto: function(index) {
			if (this.isLockCard && index + 1 != this.openCard.cid) {
				return;
			}

			var playerUrlData = {
				i: index + 1,
				r: this.gameData.r,
				p: this.players[index],
				gid: this.gameData.gid,
			};

			window.location.href =
				window.location.origin +
				window.location.pathname +
				"#/player/" +
				encodeURIComponent(JSON.stringify(playerUrlData));
			window.document.documentElement.scrollTop = 0;
		},
		goHost: function() {
			sessionStorage.clear();
			window.location.href =
				window.location.origin +
				window.location.pathname +
				"#/host/" +
				encodeURIComponent(JSON.stringify(this.hostData));
		},
	},
};

window.Clipboard = (function(window, document, navigator) {
	var textArea, copy;

	function isOS() {
		return navigator.userAgent.match(/ipad|iphone/i);
	}

	function createTextArea(text) {
		textArea = document.createElement("textArea");
		textArea.value = text;
		document.body.appendChild(textArea);
	}

	function selectText() {
		var range, selection;

		if (isOS()) {
			range = document.createRange();
			range.selectNodeContents(textArea);
			selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
			textArea.setSelectionRange(0, 999999);
		} else {
			textArea.select();
		}
	}

	function copyToClipboard() {
		document.execCommand("Copy");
		document.body.removeChild(textArea);
	}

	copy = function(text) {
		createTextArea(text);
		selectText();
		copyToClipboard();
	};

	return {
		copy: copy,
	};
})(window, document, navigator);
</script>
