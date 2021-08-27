<template>
	<div class="">
		{{ setting.title }}
		<div style="display: flex;">
			<div v-for="(num, role) in setting.countOfRole" style="display: contents;" :key="role + '-' + num">
				<template v-if="num > 0">
					<div class="role-dot-tag" :class="_.get(roleCard, [role, 'position'], '') + '-bg-color'">
						{{ roleCard[role].shortName }}
					</div>
					<!-- <div v-for="i in (num-1)" class="role-dot-tag" :class="_.get(roleCard, [role, 'position'], '') + '-background-color'" style="margin-left: -20px;">{{roleCard[role].shortName}}</div> -->
					<div
						v-if="num >= 2"
						style="width: 20px;
                            display: flex;
                            place-content: center flex-start;
                            align-items: flex-end;
                            justify-content: flex-start;
                            align-content: center;"
					>
						<span style="font-size: 0.5rem;">x{{ num }}</span>
					</div>
				</template>
			</div>
		</div>
		<div style="height: 5px;"></div>
		<div v-if="showSheriffRule" class="rule-line">・{{ showSheriffRule }}</div>
		<div v-if="showWitchRule" class="rule-line">・{{ showWitchRule }}</div>
		<div v-if="showVictoryCon" class="rule-line">・{{ showVictoryCon }}</div>
	</div>
</template>

<script>
import {VICTORY_CON, WITCH_SELF_HELP_CON, SHERIFF_RULE, roleCard, recommendedSetting} from "../../assets/js/const.js";

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
		showSheriffRule: function() {
			if (!this.setting.rule.hasSheriff) {
				return "無警長";
			}
			var rule = {
				"1": "有警長（單爆吞警徽）",
				"2": "有警長（雙爆吞警徽）",
			};

			return rule[_.get(this, ["setting", "sheriffRule"], "2")];
		},
		showWitchRule: function() {
			if (this.setting.countOfRole.witch <= 0) {
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
		showVictoryCon: function() {
			return this.setting.rule.victoryCon == VICTORY_CON.KILL_SIDE ? "屠邊局" : "屠城局";
		},
	},
};
</script>
