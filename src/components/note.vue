<template>
	<div id="note" class="color-deep-gray day" v-cloak>
		<div class="container-sm lock-mobile-width main-bg-color min-vh-100">
			<main-menu-btn @click="isShowMainMenu = true"></main-menu-btn>
			<!-- 主選單 -->
			<main-menu v-show="isShowMainMenu" @close="isShowMainMenu = false"></main-menu>
			<div class="host-bar text-center lock-mobile-width bg-color-white-t-lv2">
				<div class="container-sm p-0">
					<div class="row">
						<div class="col-10 offset-1 text-start pt-2 pb-1 fs-6">
							自由筆記區：
						</div>
						<div class="col-10 offset-1">
							<textarea
								class="w-100"
								rows="3"
								style="border: none; color: black; border-radius: 3px; height: 80px;"
							></textarea>
						</div>
					</div>
				</div>
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
										<div v-show="isShowNote">
											{{ _.get(noteData, [playerIndex, day], "") }}
										</div>
										<div v-show="isShowVote" class="row" v-html="beVotedByHtml(day, playerIndex)"></div>
										<div
											v-show="
												(isShowNote && _.get(noteData, [playerIndex, day], '') != '') ||
													(isShowVote && beVotedByHtml(day, playerIndex) != '')
											"
										>
											<div v-if="day == 0" class="day-title-tag color-light-gray fs-7">
												（警長競選階段）
											</div>
											<div v-else class="day-title-tag color-light-gray fs-7">（第 {{ day }} 天）</div>
											<hr class="my-1 color-light-gray" />
										</div>
									</template>
								</div>
							</div>
						</div>
					</div>
				</div>
				<custom-footer></custom-footer>
				<div class="ht-50"></div>
				<function-bar :function-bar-btns="functionBarBtns"></function-bar>
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
import FunctionBar from "@/components/hostPage/functionBar.vue";

export default {
	components: {voteModal, editNoteModal, setPlayerModal, donateModal, MainMenuBtn, MainMenu, customFooter, FunctionBar},
	data: function() {
		return {
			gid: "",
			isShowSetPlayerModal: true,
			isShowVoteModal: false,
			isShowEditNoteModal: false,
			isShowMainMenu: false,
			isShowDonateModal: false,
			isShowNote: true,
			isShowVote: true,
			day: 1,
			playerNum: 9,
			noteData: {},
			voteData: {},
		};
	},
	mounted: function() {
		window.onbeforeunload = function() {
			return false;
		};

		document.addEventListener("gesturestart", function(event) {
			event.preventDefault();
		});

		var session = sessionStorage.getItem("noteSessionData");

		if (session != null) {
			//載入上次記錄或重新開局

			session = JSON.parse(session);
			_.forEach(this.$data, (value, key) => {
				this.$data[key] = session[key];
			});
		} else {
			this.playerNum = _.toNumber(_.get(this.$route, ["query", "player"], 9));
			this.initNoteData();
		}
	},
	watch: {
		noteData: {
			handler: function() {
				this.saveSession();
			},
			deep: true,
		},
		voteData: {
			handler: function() {
				this.saveSession();
			},
			deep: true,
		},
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
		functionBarBtns: function() {
			var _this = this;
			return [
				{
					class: "function-btn btn-color-wine-red color-white t-shadow-1",
					click: () => {
						_this.isShowNote = true;
						_this.isShowVote = true;
					},
					disable: false,
					html:
						(_this.isShowNote == true && _this.isShowVote == true
							? '<i class="bi bi-check2-circle"></i>'
							: '<i class="bi bi-circle"></i>') + " 顯示全部",
					isShow: !_.isEmpty(_this.voteData),
				},
				{
					class: "function-btn btn-color-wine-red color-white t-shadow-1",
					click: () => {
						_this.isShowNote = false;
						_this.isShowVote = true;
					},
					disable: false,
					html:
						(_this.isShowNote != true && _this.isShowVote == true
							? '<i class="bi bi-check2-circle"></i>'
							: '<i class="bi bi-circle"></i>') + " 只顯示票型",
					isShow: !_.isEmpty(_this.voteData),
				},
				{
					class: "function-btn btn-color-wine-red color-white t-shadow-1",
					click: () => {
						_this.isShowNote = true;
						_this.isShowVote = false;
					},
					disable: false,
					html:
						(_this.isShowNote == true && _this.isShowVote != true
							? '<i class="bi bi-check2-circle"></i>'
							: '<i class="bi bi-circle"></i>') + " 只顯示筆記",
					isShow: !_.isEmpty(_this.voteData),
				},
			];
		},
	},
	methods: {
		saveSession: function() {
			sessionStorage.setItem("noteSessionData", JSON.stringify(this.$data));
		},
		initNoteData: function() {
			var data = {};
			for (var i = 1; i <= this.playerNum; i++) {
				data[i] = {isAlive: true};
			}

			this.noteData = data;
		},
		saveDay: function(data) {
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
