const VICTORY_CON = {
    'KILL_SIDE': 'KS',
    'KILL_ALL': 'KA',
}

const WEREWOLVES_KING_RULE = {
    'SUICIDE_CAN_KILL': 'CK',
    'SUICIDE_CAN_NOT_KILL': 'CNK',
}

const WITCH_SELF_HELP_CON = {
    'ONLY_FIRST': 'OF',
    'CAN_NOT': 'CN',
    'ALL_CAN': 'AC',
}

const SHERIFF_RULE = {
    'ONE_SHOT_LOST': 'OSL',
    'TWO_SHOW_LOST': 'TSL',
}

const roleCard = {
    'werewolvesKing': {
        'id': 'werewolvesKing',
        'urlShorthand': 'WK',
        'text': '狼王',
        'shortName': '王',
        'camp': 'bad',
        'position': 'wolves',
    },
    'whiteWolfKing': {
        'id': 'whiteWolfKing',
        'urlShorthand': 'WW',
        'text': '白狼王',
        'shortName': '白',
        'camp': 'bad',
        'position': 'wolves',
    },
    'ghostRider': {
        'id': 'ghostRider',
        'urlShorthand': 'GR',
        'text': '惡靈騎士',
        'shortName': '惡',
        'camp': 'bad',
        'position': 'wolves',
    },
    'wolfBeauty': {
        'id': 'wolfBeauty',
        'urlShorthand': 'WB',
        'text': '狼美人',
        'shortName': '美',
        'camp': 'bad',
        'position': 'wolves',
    },
    'werewolves': {
        'id': 'werewolves',
        'urlShorthand': 'WF',
        'text': '狼人',
        'shortName': '狼',
        'camp': 'bad',
        'position': 'wolves',
    },
    'seer': {
        'id': 'seer',
        'urlShorthand': 'SE',
        'text': '預言家',
        'shortName': '預',
        'camp': 'good',
        'position': 'priesthood',
    },
    'witch': {
        'id': 'witch',
        'urlShorthand': 'WC',
        'text': '女巫',
        'shortName': '女',
        'camp': 'good',
        'position': 'priesthood',
    },
    'hunter': {
        'id': 'hunter',
        'urlShorthand': 'HT',
        'text': '獵人',
        'shortName': '獵',
        'camp': 'good',
        'position': 'priesthood',
    },
    'guard': {
        'id': 'guard',
        'urlShorthand': 'GD',
        'text': '守衛',
        'shortName': '守',
        'camp': 'good',
        'position': 'priesthood',
    },
    'knight': {
        'id': 'knight',
        'urlShorthand': 'KT',
        'text': '騎士',
        'shortName': '騎',
        'camp': 'good',
        'position': 'priesthood',
    },
    // 'idiot': {
    //     'id': 'idiot',
    //     'text': '白痴',
    //     'shortName': '痴',
    //     'camp': 'good',
    //     'position': 'priesthood',
    // },
    'magician': {
        'id': 'magician',
        'urlShorthand': 'MG',
        'text': '魔術師',
        'shortName': '魔',
        'camp': 'good',
        'position': 'priesthood',
    },
    'villagers': {
        'id': 'villagers',
        'urlShorthand': 'VL',
        'text': '平民',
        'shortName': '民',
        'camp': 'good',
        'position': 'villagers',
    }
};

const roleIntroduction = {
    werewolvesKing: `<i class="bi bi-caret-right-fill"></i>可自刀 / 可自爆<br>
<i class="bi bi-caret-right-fill"></i>出局後可以帶一名玩家出局<br>
<i class="bi bi-arrow-return-right mx-1"></i>被女巫毒死和騎士查驗無法使用技能
<br>
<br>
<p class="fs-7 fw-light">
舉例說明：<br>
<i class="bi bi-dot"></i>夜晚自刀，可以使用技能<br>
<i class="bi bi-dot"></i>被獵人開槍，可以使用技能<br>
<i class="bi bi-dot"></i>被女巫毒死，主持人僅會公布出局，不會告知使用技能。<br>
<br>
<i class="bi bi-dot"></i>狼王自爆後可否帶人，依照玩家們自行決定的規則。<br>
</p>`,
    whiteWolfKing: `<i class="bi bi-caret-right-fill"></i>可自刀 / 可自爆<br>
<i class="bi bi-caret-right-fill"></i>自爆後可以帶一名玩家出局<br>
<i class="bi bi-arrow-return-right mx-1"></i>遭帶出局的玩家沒有遺言<br>`,
    ghostRider: `<i class="bi bi-caret-right-fill"></i>不可自刀 / 不可自爆<br>
<i class="bi bi-caret-right-fill"></i>(一次性)夜晚技能反傷<br>
<i class="bi bi-caret-right-fill"></i>(不限次數)夜晚任何方式都不會出局<br>
<br>
<p class="fs-7 fw-light">
舉例說明：<br>
<span class="under-line">(一次性)夜間技能反傷</span><br>
<i class="bi bi-dot"></i>夜中，第一次被守衛守護，守衛出局<br>
<i class="bi bi-dot"></i>夜中，第一次被女巫用毒，女巫出局<br>
<i class="bi bi-dot"></i>夜中，第一次被預言家查驗，預言家出局<br>
<br>
<span class="under-line">(不限次數)夜晚任何方式都不會出局</span><br>
<i class="bi bi-dot"></i>被女巫用毒，不會出局<br>
<i class="bi bi-dot"></i>獵人夜晚被狼殺，天亮後開的槍屬於【夜槍】，夜槍打中惡靈騎士，不會出局<br>
</p>`,
    wolfBeauty: `<i class="bi bi-caret-right-fill"></i>不可自刀 / 不可自爆<br>
<i class="bi bi-caret-right-fill"></i>每晚可誘惑一名對象，狼美人出局的時候，該對象也會出局<br>
<i class="bi bi-arrow-return-right mx-1"></i>被騎士查驗無法使用技能<br>
<i class="bi bi-arrow-return-right mx-1"></i>不可連續兩晚誘惑相同玩家<br>
<i class="bi bi-arrow-return-right mx-1"></i>被誘惑的玩家會先出局<br>
<br>
<p class="fs-7 fw-light">
舉例說明：<br>
<span class="under-line">除了騎士查驗之外都有技能</span><br>
<i class="bi bi-dot"></i>被女巫用毒<br>
<i class="bi bi-dot"></i>被獵人開槍<br>
<i class="bi bi-dot"></i>被投票出局<br>
狼美人與誘惑對象皆會一起出局<br>
<br>
<span class="under-line">被誘惑的玩家會先出局</span><br>
<i class="bi bi-dot"></i>場上僅剩下 1狼(狼美)1神1民<br>
狼美誘惑了平民<br>
狼美被投票出局，民先死，故狼人會獲勝<br>
</p>`,
    werewolves: `<i class="bi bi-caret-right-fill"></i>可自刀 / 可自爆<br>
<i class="bi bi-caret-right-fill"></i>自爆(公開身份)，停止所有發言直接進入黑夜<br>`,
    seer: `<i class="bi bi-caret-right-fill"></i>每晚可以查驗一名玩家所屬陣營<br>
<br>
<p class="fs-7 fw-light">
<span class="under-line">主持人會以手勢告知</span><br>
<i class="bi bi-hand-thumbs-up-fill"></i>代表好人<br>
<i class="bi bi-hand-thumbs-down-fill"></i>代表狼人<br>
</p>`,
    witch: `<i class="bi bi-caret-right-fill"></i>夜晚可使用毒藥或是解藥<br>
<i class="bi bi-arrow-return-right mx-1"></i>解藥僅能救狼人刀死的對象<br>
<i class="bi bi-arrow-return-right mx-1"></i>整場遊戲解藥毒藥各只有一瓶<br>

<br>
<p class="fs-7 fw-light">
<span class="under-line">特殊案例：</span><br>
<i class="bi bi-dot"></i>若是解藥拯救對象與守衛當夜守護對象相同，該玩家仍然會出局。<br>
<i class="bi bi-dot"></i>使用完解藥後主持人不再告知當夜被狼殺死的對象。<br>
<i class="bi bi-dot"></i>女巫可否自救，依照玩家們自行決定的規則。<br>
</p>`,
    hunter: `<i class="bi bi-caret-right-fill"></i>出局後可以帶一名玩家出局<br>
    <i class="bi bi-arrow-return-right mx-1"></i>可以選擇不使用技能<br>
<i class="bi bi-arrow-return-right mx-1"></i>被女巫毒死和狼美人睡死無法使用技能<br>
`,
    knight: `<i class="bi bi-caret-right-fill"></i>白天發言階段可以公開自己的身份，查驗一名玩家隸屬陣營<br><br>
<p class="fs-7 fw-light">
<i class="bi bi-dot"></i>若是狼人：該狼人玩家出局，直接進入黑夜。<br>
<i class="bi bi-dot"></i>若不是狼人：騎士出局。<br>
</p>`,
    guard: `<i class="bi bi-caret-right-fill"></i>每晚可以守護一名玩家免於狼刀殺<br>
<i class="bi bi-arrow-return-right mx-1"></i>可以守護自己<br>
<i class="bi bi-arrow-return-right mx-1"></i>可以選擇不使用技能<br>
<i class="bi bi-arrow-return-right mx-1"></i>不能連續兩晚守護相同對象<br>
<i class="bi bi-arrow-return-right mx-1"></i>守護僅對當夜狼人刀死的對象有效<br>
<br>
<p class="fs-7 fw-light">
<span class="under-line">特殊案例：</span><br>
<i class="bi bi-dot"></i>若是守護對象同時被女巫的解藥拯救，該玩家仍然會出局。<br>
</p>`,
    magician: `<i class="bi bi-caret-right-fill"></i>每晚可以交換兩名玩家的號碼，當天夜晚所有發生的事情都會交換<br>
<i class="bi bi-arrow-return-right mx-1"></i>可以選擇不使用技能<br>
<i class="bi bi-arrow-return-right mx-1"></i>效力僅限夜晚<br>
<i class="bi bi-arrow-return-right mx-1"></i>整場遊戲一個玩家只能被換一次<br>
<br>
<p class="fs-7 fw-light">
<span class="under-line">舉例說明：</span><br>
交換 (1號平民)<i class="bi bi-arrow-left-right"></i>(5號狼人)<br>
<i class="bi bi-dot"></i>預言家查1號：主持人會給狼人手勢<br>
<i class="bi bi-dot"></i>女巫毒1號：隔天5號出局<br>
<i class="bi bi-dot"></i>獵人夜晚被刀死，天亮開槍屬於【夜槍】：打1號：5號會出局<br>
<br>
<span class="under-line">效力僅限夜晚</span><br>
<i class="bi bi-dot"></i>承上情況，狼美人睡1號：<br>
<i class="bi bi-dot"></i>若當夜狼美人出局，會帶走5號<br>
<i class="bi bi-dot"></i>若是白天狼美人遭投票出局，帶走的就是原本的1號<br>
</p>`,
    villagers: `<i class="bi bi-caret-right-fill"></i>努力找出誰是狼人，幫助好人陣營獲勝<br>`,
};

const recommendedSetting = {
    '6': [{
            'id': 'P6-A',
            'title': '預言家 + 女巫',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'villagers': 2,
            },
            'highLightRole': ['witch'],
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_ALL,
            }
        },
        {
            'id': 'P6-B',
            'title': '預言家 + 獵人',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolves': 2,
                'seer': 1,
                'hunter': 1,
                'villagers': 2,
            },
            'highLightRole': ['hunter'],
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_ALL,
            }
        },
        {
            'id': 'P6-C',
            'title': '預言家 + 守衛',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolves': 2,
                'seer': 1,
                'guard': 1,
                'villagers': 2,
            },
            'highLightRole': ['guard'],
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_ALL,
            }
        }
    ],
    '7': [{
            'id': 'P7-A',
            'title': '狼王 + 預女獵',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'werewolves': 1,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'villagers': 2,
            },
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'id': 'P7-B',
            'title': '生存者模式',
            'tips': 'test',
            'depiction': 'dep',
            'countOfRole': {
                'werewolvesKing': 1,
                'werewolves': 1,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'guard': 1,
                'villagers': 1,
            },
            'highLightRole': ['guard', 'villagers'],
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        }
    ],
    '8': [{
            'id': 'P8-A',
            'title': '3狼 + 預女獵',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolves': 3,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'knight': 0,
                'villagers': 2,
            },
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'id': 'P8-B',
            'title': '狼王 + 預女獵',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'werewolves': 1,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'knight': 0,
                'villagers': 3,
            },
            'highLightRole': ['werewolvesKing'],
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        // {
        //     'title': '諸神黃昏',
        //     'tips': '',
        //     'depiction': '',
        //     'countOfRole': {
        //         'werewolvesKing': 1,
        //         'ghostRider': 1,
        //         'whiteWolfKing': 1,
        //         'seer': 1,
        //         'witch': 1,
        //         'hunter': 1,
        //         'guard': 1,
        //         'knight': 0,
        //         'idiot': 1,
        //     },
        //     'rule': {
        //         'hasSheriff': false,
        //         'sheriffRule': '',
        //         'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
        //         'victoryCon': VICTORY_CON.KILL_ALL,
        //     }
        // },
    ],
    '9': [{
            'id': 'P9-A',
            'title': '狼王 + 獵人',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'villagers': 3,
            },
            'highLightRole': ['werewolvesKing', 'hunter'],
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'id': 'P9-B',
            'title': '狼美人 + 騎士',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'wolfBeauty': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'knight': 1,
                'villagers': 3,
            },
            'highLightRole': ['wolfBeauty', 'knight'],

            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'id': 'P9-C',
            'title': '惡靈騎士 + 騎士',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'ghostRider': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'knight': 1,
                'villagers': 3,
            },
            'highLightRole': ['ghostRider', 'knight'],
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },

    ],
    '10': [{
            'id': 'P10-A',
            'title': '狼王 + 獵人',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'villagers': 4,
            },
            'highLightRole': ['werewolvesKing'],
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        // {
        //     'title': '基本警長局',
        //     'tips': '',
        //     'depiction': '',
        //     'countOfRole': {
        //         'werewolves': 3,
        //         'seer': 1,
        //         'witch': 1,
        //         'hunter': 1,
        //         'villagers': 4,
        //     },
        //     'rule': {
        //         'hasSheriff': true,
        //         'sheriffRule': SHERIFF_RULE.ONE_SHOT_LOST,
        //         'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
        //         'victoryCon': VICTORY_CON.KILL_SIDE,
        //     }
        // },
        {
            'id': 'P10-B',
            'title': '（節目愛玩）惡靈騎士 + 狼王',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'ghostRider': 1,
                'werewolvesKing': 1,
                'werewolves': 1,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'knight': 1,
                'villagers': 3,
            },
            'highLightRole': ['werewolvesKing', 'ghostRider', 'knight'],
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
    ],
    '11': [{
            'id': 'P11-A',
            'title': '狼王 + 預女獵騎（4狼）',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'werewolves': 3,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'knight': 1,
                'villagers': 3,
            },
            'highLightRole': ['werewolvesKing'],
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            },
        }, {
            'id': 'P11-B',
            'title': '惡靈騎士 + 狼王（4狼）',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'ghostRider': 1,
                'werewolvesKing': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'knight': 1,
                'villagers': 3,
            },
            'highLightRole': ['werewolvesKing', 'ghostRider'],
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            },
        },
        {
            'id': 'P11-C',
            'title': '狼美 + 狼王 (3狼)',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'wolfBeauty': 1,
                'werewolvesKing': 1,
                'werewolves': 1,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'knight': 1,
                'villagers': 4,
            },
            'highLightRole': ['werewolvesKing', 'wolfBeauty'],
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            },
        }
    ],
    '12': [{
            'id': 'P12-A',
            'title': '狼王 + 騎士',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'werewolves': 3,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'knight': 1,
                'villagers': 4,
            },
            'highLightRole': ['werewolvesKing', 'knight', 'hunter'],
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'id': 'P12-B',

            'title': '狼王 + 魔術師',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'werewolves': 3,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'magician': 1,
                'villagers': 4,
            },
            'highLightRole': ['werewolvesKing', 'magician', 'hunter'],
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'id': 'P12-C',

            'title': '狼美人 + 騎士',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'wolfBeauty': 1,
                'werewolves': 3,
                'seer': 1,
                'witch': 1,
                'guard': 1,
                'knight': 1,
                'villagers': 4,
            },
            'highLightRole': ['wolfBeauty', 'knight', 'guard'],
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'id': 'P12-D',

            'title': '惡靈騎士',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'ghostRider': 1,
                'werewolves': 3,
                'seer': 1,
                'witch': 1,
                'guard': 1,
                'knight': 1,
                'villagers': 4,
            },
            'highLightRole': ['ghostRider', 'knight', 'guard'],
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
    ],
    '13': [{
            'id': 'P13-A',

            'title': '狼王白狼王 + 騎士',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'whiteWolfKing': 1,
                'werewolvesKing': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'knight': 1,
                'villagers': 5,
            },
            'highLightRole': ['werewolvesKing', 'whiteWolfKing', 'hunter', 'knight'],
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'id': 'P13-B',
            'title': '狼美狼王 + 魔術師',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'wolfBeauty': 1,
                'werewolvesKing': 1,
                'werewolves': 3,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'magician': 1,
                'villagers': 5,
            },
            'highLightRole': ['werewolvesKing', 'wolfBeauty', 'hunter', 'magician'],
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'id': 'P13-C',
            'title': '惡靈騎士 + 狼王',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'ghostRider': 1,
                'werewolvesKing': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'guard': 1,
                'knight': 1,
                'villagers': 5,
            },
            'highLightRole': ['ghostRider', 'werewolvesKing', 'guard', 'knight'],
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        // {
        //     'title': '誰是平民？',
        //     'tips': '',
        //     'depiction': '',
        //     'countOfRole': {
        //         'werewolvesKing': 1,
        //         'whiteWolfKing': 1,
        //         'ghostRider': 1,
        //         'wolfBeauty': 1,
        //         'werewolves': 1,
        //         'seer': 1,
        //         'witch': 1,
        //         'hunter': 1,
        //         'guard': 1,
        //         'knight': 1,
        //         'magician': 1,
        //         'idiot': 1,
        //         'villagers': 1,
        //     },
        //     'rule': {
        //         'hasSheriff': true,
        //         'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
        //         'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
        //         'victoryCon': VICTORY_CON.KILL_SIDE,
        //     }
        // },
    ],
    '14': [{
            'id': 'P14-A',
            'title': '惡靈騎士 + 狼王',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'ghostRider': 1,
                'werewolvesKing': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'guard': 1,
                'knight': 1,
                'villagers': 5,
            },
            'highLightRole': ['ghostRider', 'werewolvesKing', 'knight'],
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'id': 'P14-B',
            'title': '白狼王/狼王 + 騎士',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'whiteWolfKing': 1,
                'werewolvesKing': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'guard': 1,
                'knight': 1,
                'villagers': 5,
            },
            'highLightRole': ['werewolvesKing', 'whiteWolfKing', 'knight'],
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'id': 'P14-C',
            'title': '狼美狼王 + 魔術師',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'wolfBeauty': 1,
                'werewolvesKing': 1,
                'werewolves': 3,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'guard': 1,
                'magician': 1,
                'villagers': 5,
            },
            'highLightRole': ['werewolvesKing', 'wolfBeauty', 'magician'],
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        // {
        //     'title': '誰是平民？',
        //     'tips': '',
        //     'depiction': '',
        //     'countOfRole': {
        //         'werewolvesKing': 1,
        //         'whiteWolfKing': 1,
        //         'ghostRider': 1,
        //         'wolfBeauty': 1,
        //         'werewolves': 1,
        //         'seer': 1,
        //         'witch': 1,
        //         'hunter': 1,
        //         'guard': 1,
        //         'knight': 1,
        //         'magician': 1,
        //         'idiot': 1,
        //         'villagers': 1,
        //     },
        //     'rule': {
        //         'hasSheriff': true,
        //         'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
        //         'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
        //         'victoryCon': VICTORY_CON.KILL_SIDE,
        //     }
        // },
    ],
    '15': [{
            'id': 'P15-A',
            'title': '狼王狼美 + 惡靈騎士',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'ghostRider': 1,
                'wolfBeauty': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'guard': 1,
                'knight': 1,
                'villagers': 5,
            },
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'id': 'P15-B',
            'title': '白狼王狼美惡靈 + 魔術師',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'whiteWolfKing': 1,
                'ghostRider': 1,
                'wolfBeauty': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'magician': 1,
                'knight': 1,
                'villagers': 5,
            },
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
    ]
}

export { VICTORY_CON, WEREWOLVES_KING_RULE, WITCH_SELF_HELP_CON, SHERIFF_RULE, roleCard, roleIntroduction, recommendedSetting }