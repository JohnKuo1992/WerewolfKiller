<template>
	<div class="color-deep-gray">
		<donateModal ref="donateModal" />
		<hostSettingPage ref="hostSettingPage" />
		<hostPage ref="hostPage" />
	</div>
</template>

<script>
import donateModal from "@/components/common/donateModal.vue";
import hostSettingPage from "@/components/hostSettingPage.vue";
import hostPage from "@/components/hostPage.vue";

export default {
	components: {
		donateModal,
		hostSettingPage,
		hostPage,
	},
	mounted: function() {},
};
</script>
