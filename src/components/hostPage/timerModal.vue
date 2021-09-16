<template>
	<div class="modal-mask level-1">
		<div class="timer-modal bg-color-white-t-lv2 lock-mobile-width">
			<div class="container-sm">
				<div class="row py-2">
					<div class="col-6 flex-center p-0" style="flex-wrap: wrap; position: relative;">
						<div
							class="flex-center col-12 p-0"
							style="height: 70px;
            width: 70px;
            position: relative;
            margin: auto;
            max-width: 500px;
            max-height: 500px;
          "
						>
							<div
								class="circle bg-color-black-g flex-center"
								:class="{counting: counting && !isPause, final: finalTenSeconds}"
							>
								<div></div>
							</div>
							<div class="timer color-clould fs-6">
								<template v-if="counting">
									{{ timer.toFixed(0) }}
								</template>
								<template v-if="!counting">
									{{ setSeconds }}
								</template>
							</div>
							<template v-if="!counting">
								<button
									style="right: -40px;"
									class="add-tag flex-center fs-7 p-1"
									:class="{disabled: setSeconds >= 120}"
									:disabled="setSeconds >= 120"
									@click="setSeconds += 10"
								>
									+
								</button>
								<button
									style="left: -40px;"
									class="subtract-tag flex-center fs-7 p-1"
									:class="{disabled: setSeconds <= 0}"
									:disabled="setSeconds <= 0"
									@click="setSeconds -= 10"
								>
									-
								</button>
							</template>
						</div>
						<div class="col-12 flex-center mt-1">
							<span class="fs-7">碼表</span>
						</div>
					</div>
					<div class="col-4 p-0">
						<div
							@click="close"
							class="flex-center"
							style="
            width: 50px;
            height: 50px;
            position: absolute;
            right: 0px;
            top: 0px;
            font-size: 1.5rem;
            color: #4c4c4c;
          "
						>
							<i class="bi bi-x-circle-fill"></i>
						</div>

						<div class="col-12">
							<div class="ht-50 flex-center">
								<button class="btn-color-white bdr-7 ht-40 w-100 fs-7" @click="startBtnAction()">
									<template v-if="!counting"> <i class="bi bi-play-circle-fill"></i> 開始倒數 </template>
									<template v-if="counting && isPause"> <i class="bi bi-play-circle-fill"></i> 繼續 </template>
									<template v-if="counting && !isPause"> <i class="bi bi-pause-circle-fill"></i> 暫停 </template>
								</button>
							</div>
							<div class="ht-50 flex-center">
								<button class="btn-color-white bdr-7 ht-40 w-100 fs-7" @click="stopTimer()">
									<i class="bi bi-stop-circle-fill"></i> 取消
								</button>
							</div>
						</div>
					</div>
					<div class="col-2"></div>
				</div>

				<div class="row flex-center text-center" style="position: absolute; bottom: 5px; width: 100%"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			timer: 0,
			setSeconds: 60,
			timerInterval: null,
			counting: false,
			isPause: false,
			finalTenSeconds: false,
		};
	},
	methods: {
		startBtnAction: function() {
			if (!this.counting) {
				this.startTimer();
			} else if (this.counting && this.isPause) {
				this.continueTimer();
			} else if (this.counting && !this.isPause) {
				this.pauseTimer();
			}
		},
		close: function() {
			this.$emit("close");
		},
		startTimer: function() {
			if (this.timerInterval) {
				clearInterval(this.timerInterval);
			}
			this.timer = this.setSeconds;
			this.counting = true;
			this.isPause = false;
			this.finalTenSeconds = false;

			this.timerInterval = setInterval(() => {
				this.timer -= 0.1;
				if (this.timer < 10.6) {
					this.finalTenSeconds = true;
				}

				if (this.timer <= 0) {
					this.timer = 0;
					clearInterval(this.timerInterval);
					this.counting = false;
					return;
				}
			}, 100);
		},
		continueTimer: function() {
			if (this.timerInterval) {
				clearInterval(this.timerInterval);
			}
			this.counting = true;
			this.isPause = false;
			this.finalTenSeconds = false;

			this.timerInterval = setInterval(() => {
				this.timer -= 0.1;
				if (this.timer <= 10) {
					this.finalTenSeconds = true;
				}

				if (this.timer <= 0) {
					this.timer = 0;
					clearInterval(this.timerInterval);
					this.counting = false;
					return;
				}
			}, 100);
		},
		stopTimer: function() {
			if (this.timerInterval) {
				clearInterval(this.timerInterval);
				this.counting = false;
				this.isPause = false;
			}
		},
		pauseTimer: function() {
			if (this.timerInterval) {
				clearInterval(this.timerInterval);
			}
			this.isPause = true;
		},
	},
};
</script>
