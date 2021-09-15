<template>
	<div class="host-bar text-center lock-mobile-width bg-color-white-t-lv2">
		<div class="container-sm p-0">
			<div class="host-message">
				<div class="judge-icon">
					<span class="now-arrow-icon color-gray"><i class="bi bi-forward-fill"></i></span>
					<span class="now-tips-tag bg-color-gray color-clould fs-8 px-2">主持人請說</span>
				</div>
				<div class="host-message-item past flex-center text-center fs-7 align-items-end pb-2">
					<div class="offset-1" v-html="_.get(tempArr, [tempArr.length - 2], '')"></div>
				</div>
				<div class="host-message-item flex-center text-center fs-5">
					<div class="offset-1" v-html="_.get(tempArr, [tempArr.length - 1], hostMessage)"></div>
				</div>
				<div class="host-message-item flex-center text-center fs-5"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "hostBar",
	props: {
		hostMessage: {
			default: "",
		},
		temp: {
			default: [],
		},
	},
	data: function() {
		return {
			tempArr: [],
		};
	},
	watch: {
		"temp.length": function(newValue, oldValue) {
			if (this.tempArr[this.tempArr.length - 1] == this.hostMessage || this.hostMessage == "") {
				return;
			}

			if (newValue > oldValue && this.hostMessage != this.lastMessage) {
				this.tempArr.push(this.hostMessage);
				$(".host-message").css({
					marginTop: "90px",
				});
				$(".host-message").animate({
					marginTop: "",
				});
			} else if (newValue < oldValue && this.hostMessage != this.lastMessage) {
				this.tempArr.pop();
				$(".host-message").css({
					marginTop: "-125px",
				});
				$(".host-message").animate({
					marginTop: "",
				});
			}
		},
	},
};
</script>
