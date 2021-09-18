<template>
	<div v-show="isShow" class="modal-mask day">
		<div class="modal-wrapper flex-center p-3 lock-mobile-width">
			<div class="introduce-modal-container">
				<div class="modal-header-custom">
					角色介紹
				</div>
				<div class="introduce-modal-body-custom">
					<div>
						<div :id="key" v-for="(role, key) in roleCard" :key="key">
							<div class="role-btn flex-center my-1" :class="role.position + '-bg-color'">{{ role.text }}</div>
							<div class="col-12 px-1 fs-7 mt-2">
								<div style="display: flex;">
									<div class="col-2">
										陣營
									</div>
									<div class="col-10">{{ campText(role.camp, role.position) }}</div>
								</div>
								<div class="mt-2" style="display: flex;">
									<div class="col-2">
										介紹
									</div>
									<div class="col-10" v-html="roleIntroduction[key]"></div>
								</div>
							</div>
							<hr />
						</div>
					</div>
				</div>
				<div class="modal-footer-custom flex-center m-1">
					<button class="btn-color-light-red bdr-12 w-50 ht-40" @click="close">關閉</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {roleCard, roleIntroduction} from "@/assets/js/const.js";

export default {
	props: {
		isShow: {
			default: false,
		},
		offset: {
			defalut: "",
		},
	},
	data: function() {
		return {
			roleCard: roleCard,
			roleIntroduction: roleIntroduction,
		};
	},
	watch: {
		isShow: function(val) {
			if (val) {
				if (this.offset == "good") {
					this.$nextTick(() => {
						$(".introduce-modal-body-custom")[0].scrollTop = $("#seer")[0].offsetTop - 100;
					});
				} else {
					this.$nextTick(() => {
						$(".introduce-modal-body-custom")[0].scrollTop = 0;
					});
				}
			}
		},
	},
	methods: {
		close: function() {
			this.$emit("close");
		},
		campText: function(camp, position) {
			var result = "";
			if (camp == "bad") {
				result = "狼人陣營";
			} else {
				result = "好人陣營";
				if (position == "priesthood") {
					result += "-神職";
				} else {
					result += "-平民";
				}
			}
			return result;
		},
	},
};
</script>
