const VICTORY_CON = {
    'KILL_SIDE': 'killSide',
    'KILL_ALL': 'killAll',
}

const WEREWOLVES_KING_RULE = {
    'SUICIDE_CAN_KILL': 'suicideCanKill',
    'SUICIDE_CAN_NOT_KILL': 'suicideCanNotKill',
}

const WITCH_SELF_HELP_CON = {
    'ONLY_FIRST': 'onlyFirst',
    'CAN_NOT': 'canNot',
    'ALL_CAN': 'allCan',
}

const SHERIFF_RULE = {
    'ONE_SHOT_LOST': 'oneShotLost',
    'TWO_SHOW_LOST': 'twoShotLost',
}

const roleCard = {
    'werewolvesKing': {
        'id': 'werewolvesKing',
        'text': '狼王',
        'shortName': '王',
        'camp': 'bad',
        'position': 'wolves',
    },
    'whiteWolfKing': {
        'id': 'whiteWolfKing',
        'text': '白狼王',
        'shortName': '白',
        'camp': 'bad',
        'position': 'wolves',
    },
    'ghostRider': {
        'id': 'ghostRider',
        'text': '惡靈騎士',
        'shortName': '惡',
        'camp': 'bad',
        'position': 'wolves',
    },
    'wolfBeauty': {
        'id': 'wolfBeauty',
        'text': '狼美人',
        'shortName': '美',
        'camp': 'bad',
        'position': 'wolves',
    },
    'werewolves': {
        'id': 'werewolves',
        'text': '狼人',
        'shortName': '狼',
        'camp': 'bad',
        'position': 'wolves',
    },
    'seer': {
        'id': 'seer',
        'text': '預言家',
        'shortName': '預',
        'camp': 'good',
        'position': 'priesthood',
    },
    'witch': {
        'id': 'witch',
        'text': '女巫',
        'shortName': '女',
        'camp': 'good',
        'position': 'priesthood',
    },
    'hunter': {
        'id': 'hunter',
        'text': '獵人',
        'shortName': '獵',
        'camp': 'good',
        'position': 'priesthood',
    },
    'guard': {
        'id': 'guard',
        'text': '守衛',
        'shortName': '守',
        'camp': 'good',
        'position': 'priesthood',
    },
    'knight': {
        'id': 'knight',
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
        'text': '魔術師',
        'shortName': '魔',
        'camp': 'good',
        'position': 'priesthood',
    },
    'villagers': {
        'id': 'villagers',
        'text': '平民',
        'shortName': '民',
        'camp': 'good',
        'position': 'villagers',
    }
};

const recommendedSetting = {
    '6': [{
            'title': '預言家 + 女巫',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'villagers': 2,
            },
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_ALL,
            }
        },
        {
            'title': '預言家 + 獵人',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolves': 2,
                'seer': 1,
                'hunter': 1,
                'villagers': 2,
            },
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_ALL,
            }
        },
        {
            'title': '預言家 + 守衛',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolves': 2,
                'seer': 1,
                'guard': 1,
                'villagers': 2,
            },
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_ALL,
            }
        }
    ],
    '7': [{
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
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        }
    ],
    '8': [{
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
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
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
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
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
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },

    ],
    '10': [{
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
            'title': '（節目愛玩）惡靈騎士 + 狼王',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'ghostRider': 1,
                'werewolves': 1,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'knight': 1,
                'villagers': 3,
            },
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
    ],
    '11': [{
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
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            },
        }, {
            'title': '惡靈騎士 + 狼王（4狼）',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'ghostRider': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'knight': 1,
                'villagers': 3,
            },
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            },
        },
        {
            'title': '狼美 + 狼王 (3狼)',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'wolfBeauty': 1,
                'werewolves': 1,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'knight': 1,
                'villagers': 4,
            },
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            },
        }
    ],
    '12': [{
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
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
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
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
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
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
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
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
    ],
    '13': [{
            'title': '狼王白狼王 + 騎士',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'whiteWolfKing': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
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
            'title': '狼美狼王 + 魔術師',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'wolfBeauty': 1,
                'werewolves': 3,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'magician': 1,
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
            'rule': {
                'hasSheriff': true,
                'sheriffRule': SHERIFF_RULE.TWO_SHOW_LOST,
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'title': '狼王白狼王 + 騎士',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'whiteWolfKing': 1,
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
            'title': '狼美狼王 + 魔術師',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'wolfBeauty': 1,
                'werewolves': 3,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'guard': 1,
                'magician': 1,
                'villagers': 5,
            },
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

export { VICTORY_CON, WEREWOLVES_KING_RULE, WITCH_SELF_HELP_CON, SHERIFF_RULE, roleCard, recommendedSetting }