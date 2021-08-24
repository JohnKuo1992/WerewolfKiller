<template>
	<div class="modal-mask level-1">
		<div class="time-modal lock-mobile-width">
			<div class="container-sm">
				<div class="row text-center">
					<div class="p-2 ht-50 flex-center">
						<span style="font-size: 1.2rem">碼表功能</span>
					</div>
				</div>
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
				<div
					class="flex-center"
					style="
            height: calc(100vh - 480px);
            width: calc(100vh - 480px);
            position: relative;
            margin: auto;
            max-width: 500px;
            max-height: 500px;
            overflow: hidden;
          "
				>
					<div class="circle flex-center" :class="{counting: counting, final: finalTenSeconds}">
						<div></div>
					</div>
					<div class="timer" :class="{counting: counting, final: finalTenSeconds}">
						{{ timer.toFixed(1) }}
					</div>
				</div>
				<div class="row flex-center text-center" style="position: absolute; bottom: 5px; width: 100%">
					<div class="col-4">
						<button class="ht-50 modal-player-btn w-100" @click="startTimer(30)">
							倒數30s
						</button>
					</div>
					<div class="col-4">
						<button class="ht-50 modal-player-btn w-100" @click="startTimer(45)">
							倒數45s
						</button>
					</div>
					<div class="col-4">
						<button class="ht-50 modal-player-btn w-100" @click="startTimer(60)">
							倒數60s
						</button>
					</div>
				</div>
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
