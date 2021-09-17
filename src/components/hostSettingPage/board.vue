<template>
	<div>
		<div class="row">
			<div class="col-12 mx-2 mb-1">{{ setting.title }}</div>
		</div>
		<div class="row mt-1 px-2">
			<div class="col-6">
				<div class="col-12 flex-center justify-content-start align-items-end mx-1 mb-2">
					<div
						v-for="(num, role) in setting.countOfRole"
						:key="setting.id + '-' + role + '-' + num"
						style="display: contents;"
					>
						<div
							v-show="num > 0 && _.get(roleCard, [role, 'position'], '') == 'wolves'"
							v-for="n in num"
							:key="n"
							class="role-dot-tag fs-7 wolves-bg-color"
							:class="{'n-high-light': _.indexOf(setting.highLightRole, role) < 0}"
						>
							{{ roleCard[role].shortName }}
						</div>
					</div>
				</div>

				<div class="col-12 flex-center justify-content-start align-items-end mx-1 mb-2">
					<div
						v-for="(num, role) in setting.countOfRole"
						:key="setting.id + '-' + role + '-' + num"
						style="display: contents;"
					>
						<div
							v-show="num > 0 && _.get(roleCard, [role, 'position'], '') == 'priesthood'"
							v-for="n in num"
							:key="n"
							class="role-dot-tag fs-7 priesthood-bg-color"
							:class="{'n-high-light': _.indexOf(setting.highLightRole, role) < 0}"
						>
							{{ roleCard[role].shortName }}
						</div>
					</div>
				</div>

				<div class="col-12 flex-center justify-content-start align-items-end mx-1 mb-2">
					<div
						v-for="(num, role) in setting.countOfRole"
						:key="setting.id + '-' + role + '-' + num"
						style="display: contents;"
					>
						<div
							v-show="num > 0 && _.get(roleCard, [role, 'position'], '') == 'villagers'"
							v-for="n in num"
							:key="n"
							class="role-dot-tag fs-7 villagers-bg-color"
							:class="{'n-high-light': _.indexOf(setting.highLightRole, role) < 0}"
						>
							{{ roleCard[role].shortName }}
						</div>
					</div>
				</div>
			</div>
			<div class="col-6">
				<div v-if="showVictoryCon" class="rule-line">・{{ showVictoryCon }}</div>
				<div v-if="showSheriffRule" class="rule-line">・{{ showSheriffRule }}</div>
				<div v-if="showWitchRule != ''" class="rule-line">・{{ showWitchRule }}</div>
				<div v-if="showWolfKingRule" class="rule-line">・{{ showWolfKingRule }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	VICTORY_CON,
	WITCH_SELF_HELP_CON,
	WEREWOLVES_KING_RULE,
	SHERIFF_RULE,
	roleCard,
	recommendedSetting,
} from "../../assets/js/const.js";

export default {
	name: "board",
	props: {
		setting: {
			type: Object,
			default: function() {
				return {};
			},
		},
		roleCard: {
			type: Object,
			default: function() {
				return {};
			},
		},
	},
	computed: {
		showVictoryCon: function() {
			return this.setting.rule.victoryCon == VICTORY_CON.KILL_SIDE ? "屠邊局" : "屠城局";
		},
		showSheriffRule: function() {
			return "無警長";

			//開發中
			if (!this.setting.rule.hasSheriff) {
				return "無警長";
			}
			var rule = {
				OSL: "有警長（單爆吞警徽）",
				TSL: "有警長（雙爆吞警徽）",
			};
			return rule[_.get(this, ["setting", "rule", "sheriffRule"], "TSL")];
		},
		showWitchRule: function() {
			if (_.get(this.setting, ["countOfRole", "witch"], 0) <= 0) {
				return "";
			}

			var result = "";
			switch (this.setting.rule.witchRule) {
				case WITCH_SELF_HELP_CON.ONLY_FIRST:
					return "女巫第一晚可自救";
				case WITCH_SELF_HELP_CON.CAN_NOT:
					return "女巫全程不可自救";
				case WITCH_SELF_HELP_CON.ALL_CAN:
					return "女巫全程可自救";
				default:
					break;
			}
			return "";
		},
		showWolfKingRule: function() {
			if (_.get(this.setting, ["countOfRole", "werewolvesKing"], 0) <= 0) {
				return "";
			}
			return this.setting.rule.werewolvesKingRule == WEREWOLVES_KING_RULE.SUICIDE_CAN_KILL
				? "狼王自爆可帶人"
				: "狼王自爆不可帶人";
		},
	},
};
</script>
