<template>
	<div v-cloak>
		<div class="modal-mask day level-2">
			<div class="modal-wrapper flex-center p-3 lock-mobile-width">
				<div
					class="introduce-modal-container bg-color-light-red"
					style="width: calc(100vw - 30px); height: calc(100vh - 140px);"
				>
					<div class="modal-header-custom ht-30">
						<div class="row fs-6 ht-30">{{ playerIndex }} 號玩家筆記欄</div>
					</div>
					<change-day-btn v-model="day" :max="9"></change-day-btn>
					<div class="introduce-modal-body-custom" style="height: calc(100vh - 300px);">
						<div class="col-12 flex-center ht-100">
							<textarea
								class="ht-100 w-100 name-input color-black"
								rows="5"
								v-model="noteContent"
								placeholder="（可以直接打字唷）"
							></textarea>
						</div>
						<div class="col-12 p-2">
							<span class="fs-7">常用：</span>
							<button
								v-for="btn in commonTextBtn"
								:key="btn.text"
								class="my-1 common-words-btn btn-color-transparent color-deep-gray"
								@click="commonTextClick(btn.text)"
							>
								{{ btn.text }}
							</button>
						</div>
						<div class="col-12 flex-center mt-2 mb-3">
							<div class="col-8">
								<button class="btn-color-red bdr-7 ht-30 w-100" @click="vote">
									<i class="bi bi-ticket-perforated"></i> 記錄投票
								</button>
							</div>
						</div>
						<div class="col-12 flex-center"></div>
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
	name: "editNoteModal",
	components: {changeDayBtn},
	props: {
		propDay: {
			type: Number,
			isRequired: true,
			default: 1,
		},
		propNoteData: {
			type: Object,
			isRequired: true,
			default: {},
		},
	},
	watch: {
		propDay: function(n, o) {
			if (n != o) {
				this.day = n;
			}
		},
		propNoteData: {
			handler: function(n) {
				this.noteData = n;
			},
			deep: true,
			immediate: true,
		},
		day: function(n, o) {
			if (n != o) {
				this.$emit("saveDay", n);
				this.syncNoteContent();
			}
		},
	},
	data: function() {
		return {
			playerIndex: 1,
			day: _.clone(this.propDay),
			noteContent: "",
			noteData: _.cloneDeep(this.propNoteData),
			commonTextBtn: [
				{
					text: "跳預言家",
					type: "identity",
				},
				{
					text: "金水",
					type: "action",
				},
				{
					text: "跳女巫",
					type: "identity",
				},
				{
					text: "銀水",
					type: "action",
				},
				{
					text: "警徽流",
					type: "action",
				},
				{
					text: "保",
					type: "action",
				},
				{
					text: "踩",
					type: "action",
				},
				{
					text: "：",
					type: "symbol",
				},
				{
					text: "，",
					type: "symbol",
				},

				{
					text: "0",
					type: "number",
				},
				{
					text: "1",
					type: "number",
				},
				{
					text: "2",
					type: "number",
				},
				{
					text: "3",
					type: "number",
				},
				{
					text: "4",
					type: "number",
				},
				{
					text: "5",
					type: "number",
				},
				{
					text: "6",
					type: "number",
				},
				{
					text: "7",
					type: "number",
				},
				{
					text: "8",
					type: "number",
				},
				{
					text: "9",
					type: "number",
				},
			],
		};
	},
	methods: {
		vote: function() {
			this.$parent.isShowEditNoteModal = false;
			this.$parent.isShowVoteModal = true;
		},
		cancel: function() {
			this.$parent.isShowEditNoteModal = false;
		},
		close: function() {
			// 防呆
			this.noteData[this.playerIndex][this.day] = _.cloneDeep(this.noteContent);
			this.$emit("saveNote", this.noteData);
			this.$parent.isShowEditNoteModal = false;
		},
		open: function(playerIndex) {
			this.playerIndex = playerIndex;
			this.syncNoteContent();
		},
		syncNoteContent: function() {
			this.noteContent = _.get(this, ["noteData", this.playerIndex, this.day], "");
		},
		commonTextClick: function(text) {
			this.noteContent += text;
		},
	},
};
</script>
