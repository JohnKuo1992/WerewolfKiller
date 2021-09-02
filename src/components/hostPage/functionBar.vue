<template>
	<div class="function-bar lock-mobile-width bg-color-black-mask-2">
		<div class="function-bar-wapper flex-center">
			<button
				v-for="(btn, index) in functionBarBtns"
				:key="index"
				v-show="btn.isShow"
				:class="btn.class"
				@click="btn.click"
				:disabled="btn.disable"
				v-html="btn.html"
			></button>
			<div style="width: 25px;"></div>
		</div>
		<!-- todo: fix animation -->
		<div id="maskNavBar" class="function-bar-mask color-clould flex-center bg-color-black-mask-2">
			<i class="bi bi-chevron-right" style="font-size: 0.8rem;"></i>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		functionBarBtns: {
			isRequired: true,
		},
	},
	mounted: function() {
		var element = _.get(document.getElementsByClassName("function-bar"), [0], null);
		if (element != null) {
			element.addEventListener(
				"scroll",
				_.throttle(function(event) {
					var a = $(this).scrollLeft();
					var b = $(this).width();
					var c = $(".function-bar-wapper").width();
					if (a + b + 50 > c) {
						$("#maskNavBar").fadeOut();
					} else {
						$("#maskNavBar").fadeIn();
					}
				}, 50),
				false
			);
		}

		var screenWidth = window.screen.width;
		var marginRight = (screenWidth - 540) / 2;
		$("#maskNavBar").css({
			marginRight: marginRight > 0 ? marginRight : 0,
		});

		$(window).resize(function() {
			var screenWidth = window.screen.width;
			var marginRight = (screenWidth - 540) / 2;
			$("#maskNavBar").css({
				marginRight: marginRight > 0 ? marginRight : 0,
			});
		});
	},
};
</script>
