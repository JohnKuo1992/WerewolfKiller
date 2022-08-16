<template>
	<div id="note" class="color-deep-gray day" v-cloak>
		<div class="container-sm lock-mobile-width main-bg-color min-vh-100">
			<main-menu-btn @click="isShowMainMenu = true"></main-menu-btn>
			<!-- 主選單 -->
			<main-menu v-show="isShowMainMenu" @close="isShowMainMenu = false"></main-menu>
			<div class="host-bar text-center lock-mobile-width bg-color-white-t-lv2">
				<div class="container-sm p-0"></div>
			</div>
			<div class="row">
				<div class="contaner p-3">
					<div class="ht-130"></div>
					<div
						v-for="(playerNoteData, playerIndex) in noteData"
						:key="playerIndex"
						class="note-btn color-clould p-2 mb-3"
						@click="editNote(playerIndex)"
					>
						<div class="note-number-tag flex-center">
							{{ playerIndex }}
						</div>
						<div class="col-12 flex-left">
							<div class="ms-3 fs-6 w-100">
								<div v-if="isBlank(playerIndex)" class="flex-center color-light-gray">
									（ 點擊開始筆記&nbsp;<i class="bi bi-pencil-square"></i>&nbsp;）
								</div>
								<div v-for="(n, day) in playerNum" :key="playerIndex + '-day' + day">
									<template v-if="_.get(noteData, [playerIndex, day], false) || beVotedByHtml(day, playerIndex) != ''">
										<div>
											{{ _.get(noteData, [playerIndex, day], "") }}
										</div>
										<div class="row" v-html="beVotedByHtml(day, playerIndex)"></div>
										<div v-if="day == 0" class="day-title-tag color-light-gray fs-7">（警長競選階段）</div>
										<div v-else class="day-title-tag color-light-gray fs-7">（第 {{ day }} 天）</div>
										<hr class="my-1 color-light-gray" />
									</template>
								</div>
							</div>
						</div>
					</div>
				</div>
				<custom-footer></custom-footer>
				<div class="ht-50"></div>
				<button
					@click="voting"
					class="submit-bar bottom-bar flex-center bg-color-red color-clould lock-mobile-width ht-50 p-2"
				>
					<span class="fs-4"><i class="bi bi-ticket-perforated"></i> 記錄投票</span>
				</button>
			</div>
		</div>
		<set-player-modal
			v-show="isShowSetPlayerModal"
			v-model="playerNum"
			@savePlayerNum="savePlayerNum"
		></set-player-modal>
		<vote-modal
			v-show="isShowVoteModal"
			:player-num="playerNum"
			:prop-day="day"
			:vote-data="voteData"
			@saveDay="saveDay"
			@saveVote="saveVote"
		>
		</vote-modal>
		<edit-note-modal
			v-show="isShowEditNoteModal"
			ref="editNoteModal"
			:prop-day="day"
			:prop-note-data="noteData"
			@saveDay="saveDay"
			@saveNote="saveNote"
		></edit-note-modal>
		<donateModal v-show="isShowDonateModal" ref="donateModal" />
	</div>
</template>

<script>
import setPlayerModal from "@/components/note/setPlayerModal.vue";
import voteModal from "@/components/note/voteModal.vue";
import editNoteModal from "@/components/note/editNoteModal.vue";
import donateModal from "@/components/common/donateModal.vue";
import MainMenuBtn from "@/components/hostPage/mainMenuBtn.vue";
import MainMenu from "@/components/hostPage/mainMenu.vue";
import customFooter from "@/components/common/customFooter.vue";

export default {
	components: {voteModal, editNoteModal, setPlayerModal, donateModal, MainMenuBtn, MainMenu, customFooter},
	data: function() {
		return {
			gid: "",
			isShowSetPlayerModal: true,
			isShowVoteModal: false,
			isShowEditNoteModal: false,
			isShowMainMenu: false,
			isShowDonateModal: false,
			day: 1,
			playerNum: 9,
			noteData: {},
			voteData: {},
		};
	},
	mounted: function() {
		this.playerNum = _.toNumber(_.get(this.$route, ["query", "player"], 9));
		this.initNoteData();
	},
	computed: {
		voteObj: function() {
			var result = {};

			_.forEach(this.voteData, function(voteDataByDay, day) {
				result[day] = _.reduce(
					voteDataByDay,
					function(result, value, key) {
						(result[value] || (result[value] = [])).push(key);
						return result;
					},
					{}
				);
			});

			return result;
		},
	},
	methods: {
		initNoteData: function() {
			var data = {};
			for (var i = 1; i <= this.playerNum; i++) {
				data[i] = {isAlive: true};
			}

			this.noteData = data;
		},
		saveDay: function(data) {
			console.log(data);
			this.day = data;
		},
		editNote: function(playerIndex) {
			this.isShowEditNoteModal = true;
			this.$refs.editNoteModal.open(playerIndex);
		},
		voting: function() {
			this.isShowVoteModal = true;
		},
		savePlayerNum: function(data) {
			this.playerNum = _.cloneDeep(data);
			this.initNoteData();
		},
		saveVote: function(data) {
			this.voteData = _.cloneDeep(data);
		},
		saveNote: function(data) {
			this.noteData = _.cloneDeep(data);
		},
		isBlank: function(playerIndex) {
			for (var d = 1; d <= playerIndex; d++) {
				if (_.get(this.noteData, [playerIndex, d], false) || this.beVotedByHtml(d, playerIndex) != "") {
					return false;
				}
			}
			return true;
		},
		beVotedByHtml: function(day, playerIndex) {
			var html = "";

			var voteTo = _.get(this, ["voteData", day, playerIndex], false);
			var beVotedBy = _.get(this, ["voteObj", day, playerIndex], false);

			if (voteTo || beVotedBy) {
				html += "<div class='col-3 pe-0 fs-7'>";

				if (voteTo) {
					html += '投給<i class="bi bi-caret-right-fill"></i>' + voteTo;
				}
				html += "</div>";
				if (beVotedBy) {
					html +=
						"<div class='col-9 fs-7'>" +
						'｜被投票<i class="bi bi-caret-left-fill"></i>' +
						_.join(beVotedBy, ", ") +
						"</div>";
				}
			}

			return html;
		},
	},
};
</script>
