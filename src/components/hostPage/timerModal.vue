<template>
	<div class="modal-mask level-1">
		<div class="timer-modal bg-color-white-t-lv2 lock-mobile-width">
			<div class="container-sm">
				<div class="row py-2">
					<div class="col-3 flex-center">
						<div
							class="flex-center"
							style="height: 50px;
            width: 50px;
            position: relative;
            margin: auto;
            max-width: 500px;
            max-height: 500px;
            overflow: hidden;
          "
						>
							<div class="circle bg-color-black-g flex-center" :class="{counting: counting, final: finalTenSeconds}">
								<div></div>
							</div>
							<div class="timer color-clould fs-5" :class="{counting: counting, final: finalTenSeconds}">
								{{ timer.toFixed(1) }}
							</div>
						</div>
					</div>
					<div class="col-9">
						<div class="col-12">
							<span class="fs-6">碼表功能</span>
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
						</div>

						<div class="col-12 row my-1">
							<div class="col-4">
								<button class="ht-50 modal-player-btn w-100" @click="startTimer(30)">
									30s
								</button>
							</div>
							<div class="col-4">
								<button class="ht-50 modal-player-btn w-100" @click="startTimer(60)">
									60s
								</button>
							</div>
							<div class="col-4">
								<button class="ht-50 modal-player-btn w-100" @click="startTimer(90)">
									90s
								</button>
							</div>
						</div>
					</div>
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
			timerInterval: null,
			counting: false,
			finalTenSeconds: false,
		};
	},
	methods: {
		close: function() {
			this.$emit("close");
			clearInterval(this.timerInterval);
			this.counting = false;
			this.timer = 0;
		},
		startTimer: function(time) {
			if (this.timerInterval) {
				clearInterval(this.timerInterval);
			}
			this.timer = time;
			this.counting = true;
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
			}
		},
	},
};
</script>
