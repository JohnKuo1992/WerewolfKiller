<template>
	<div id="gameRoom" class="color-deep-gray">
		<main-menu-btn @click="isShowMainMenu = true"></main-menu-btn>
		<main-menu v-show="isShowMainMenu" @close="isShowMainMenu = false"></main-menu>
		<donateModal v-show="isShowDonateModal" />
		<div class="container-sm main-bg-color lock-mobile-width min-vh-100 py-2">
			<div class="ht-20"></div>
			<div class="flex-center">
				<div v-if="cover" class="card floating bg-color-black-g b-shadow-1 ht-20 bdr-7 flex-center">
					<div class="col-12 row">
						<div class="col-12 color-clould text-center my-2" style="font-size: 150px;">{{ playerIndex }}</div>
						<div class="col-12 flex-center">
							<span class="fs-7 color-clould">再次確認你的號碼唷</span>
						</div>
						<div class="col-12 flex-center">
							<span class="fs-7 color-clould">等待主持人宣布看牌後點擊看牌</span>
						</div>
						<div class="col-12 flex-center mt-3">
							<button class="btn-color-white bdr-12 py-2 px-3 flex-center" @click="open()">看牌</button>
						</div>
					</div>
				</div>
				<div v-if="!cover" id="openCard" class="card bg-color-white-g b-shadow-1 ht-20 bdr-7 flex-center">
					<div class="col-12 p-3" style="height: 100%;">
						<div class="col-12 flex-center fs-5" style="margin-top: 160px;">
							{{ role.text }}
						</div>
						<div class="col-12 flex-center mt-1">
							<span class="fs-7 bdr-7 px-2" :class="role.position + '-bg-color'"
								>({{ campText(role.camp, role.position) }})</span
							>
						</div>
						<div class="ht-10"></div>
						<div class="col-12 fs-7">介紹</div>
						<hr class="my-1" />
						<div class="col-12 fs-7" v-html="roleIntroduction[role.id]"></div>
						<div class="ht-20"></div>
						<div class="fs-7" @click="isShowIntroduce = true">
							<span class="under-line"><i class="bi bi-file-earmark-text-fill"></i> 查看其他角色介紹</span>
						</div>
						<div class="ht-20"></div>
					</div>
				</div>
			</div>
			<div
				v-if="!cover"
				id="moreButton"
				@click="scrollDown()"
				class="more-btn bg-color-black-t-lv1 color-clould b-shadow-2 flex-center"
			>
				<i class="bi bi-chevron-compact-down"></i>
			</div>

			<div v-if="!cover" class="col-12 mt-3 py-3 bg-color-white-t-lv1 color-white bdr-12 b-shadow-1">
				<div class="col-12 text-center">你是 {{ playerIndex }} 號玩家</div>
			</div>
			<div class="ht-20"></div>
			<custom-footer></custom-footer>

			<!-- <board class="board bg-color-theme-white p-2 col-12" :setting="boardData" :role-card="roleCard"></board> -->
			<rule-modal :is-show="isShowIntroduce" @close="isShowIntroduce = false"></rule-modal>
		</div>
	</div>
</template>

<script>
import MainMenuBtn from "@/components/hostPage/mainMenuBtn.vue";
import MainMenu from "@/components/hostPage/mainMenu.vue";
import donateModal from "@/components/common/donateModal.vue";
import ruleModal from "@/components/common/ruleModal.vue";
import customFooter from "@/components/common/customFooter.vue";

import {
	VICTORY_CON,
	WEREWOLVES_KING_RULE,
	WITCH_SELF_HELP_CON,
	SHERIFF_RULE,
	roleCard,
	roleIntroduction,
} from "@/assets/js/const.js";

import {storage} from "@/assets/js/storage.js";

export default {
	components: {
		MainMenuBtn,
		MainMenu,
		donateModal,
		ruleModal,
		customFooter,
	},
	data: function() {
		return {
			gid: "",
			isShowMainMenu: false,
			isShowDonateModal: false,
			isShowIntroduce: false,
			cover: true,
			roleCard: roleCard,
			playerIndex: 0,
			role: {},
			roleIntroduction: roleIntroduction,
		};
	},
	mounted: function() {
		this.initData();
	},
	methods: {
		initData: function() {
			var urlData = JSON.parse(this.$route.params.playerData);
			this.playerIndex = urlData.i;
			this.role = this.roleCard[urlData.p];
			this.gid = urlData.gid;
		},
		open: function() {
			this.cover = false;
			this.$nextTick(() => {
				this.initMoreBtn();
			});

			storage.setItem({
				name: "openCard",
				value: {gid: this.gid, cid: this.playerIndex},
				expires: 1000 * 60 * 20,
			});
		},
		initMoreBtn: function() {
			var element = document.getElementById("openCard");
			$("#moreButton").css({top: $(element).height() - 30});

			var scrollTop = $(element).scrollTop();
			var ht = $(element).height();
			var scrollHeight = element.scrollHeight;
			if (scrollTop + ht + 10 >= scrollHeight) {
				$("#moreButton").remove();
				return;
			}

			if (element != null) {
				element.addEventListener(
					"scroll",
					function() {
						var a = $(this).scrollTop();
						var b = $(this).height();
						var c = this.scrollHeight;

						if (a + b + 10 > c) {
							$("#moreButton").fadeOut(400, function() {
								$("#moreButton").remove();
							});
						}
					},
					false
				);
			}
		},
		scrollDown: function() {
			$("#openCard").animate({scrollTop: 300});
		},
		campText: function(camp, position) {
			var result = "";
			if (camp == "bad") {
				result = "狼人陣營";
			} else {
				result = "好人陣營";
				if (position == "priesthood") {
					result += "-神職";
				} else {
					result += "-平民";
				}
			}
			return result;
		},
	},
};
</script>
