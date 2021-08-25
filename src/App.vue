<template>
	<div class="color-deep-gray">
		<donateModal v-show="isShow.donateModal" ref="donateModal" />
		<hostSettingPage v-show="isShow.hostSettingPage" ref="hostSettingPage" />
		<hostPage v-show="isShow.hostPage" ref="hostPage" />
	</div>
</template>

<script>
import donateModal from "@/components/common/donateModal.vue";
import hostSettingPage from "@/components/hostSettingPage.vue";
import hostPage from "@/components/hostPage.vue";

export default {
	data: function() {
		return {
			isShow: {
				donateModal: false,
				hostSettingPage: true,
				hostPage: false,
			},
		};
	},
	components: {
		donateModal,
		hostSettingPage,
		hostPage,
	},
	mounted: function() {
		window.onbeforeunload = function() {
			return false;
		};

		document.addEventListener("gesturestart", function(event) {
			event.preventDefault();
		});

		var session = sessionStorage.getItem("sessionData");
		if (session != null) {
			this.isShow.hostSettingPage = false;
			this.isShow.hostPage = true;
		}
	},
};
</script>
