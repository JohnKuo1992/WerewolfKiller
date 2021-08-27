const VICTORY_CON = {
    'KILL_SIDE': 'killSide',
    'KILL_ALL': 'killAll',
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
            'title': '',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 0,
                'werewolves': 2,
                'seer': 1,
                'witch': 0,
                'hunter': 1,
                'knight': 0,
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
            'title': '',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 0,
                'werewolves': 2,
                'seer': 1,
                'witch': 0,
                'hunter': 0,
                'knight': 0,
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
            'title': '',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'werewolves': 1,
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
            'title': '生還者',
            'tips': '',
            'depiction': '',
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
        'title': '',
        'tips': '',
        'depiction': '',
        'countOfRole': {
            'werewolvesKing': 0,
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
    }, {
        'title': '',
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
    }],
    '9': [{
            'title': '',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'werewolves': 2,
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
        {
            'title': '',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolves': 3,
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
        }
    ],
    '10': [{
            'title': '',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'werewolves': 2,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'knight': 0,
                'villagers': 4,
            },
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.ONLY_FIRST,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'title': '',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolves': 3,
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
        {
            'title': '',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolves': 3,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'guard': 1,
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
        //     'title': '雙狼王局',
        //     'tips': '',
        //     'depiction': '',
        //     'countOfRole': {
        //         'werewolvesKing': 2,
        //         'werewolves': 1,
        //         'seer': 1,
        //         'witch': 1,
        //         'hunter': 1,
        //         'knight': 1,
        //         'villagers': 3,
        //     },
        //     hasSheriff: false,
        //     sheriffRule: '', //1:單爆吞警徽 2:雙爆吞警徽
        //     witchRule: '2',
        //     victoryCon: '1',
        // }
    ],
    '11': [{
        'title': '',
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
        }

    }],
    '12': [{
            'title': '',
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
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
        {
            'title': '',
            'tips': '',
            'depiction': '',
            'countOfRole': {
                'werewolvesKing': 1,
                'werewolves': 3,
                'seer': 1,
                'witch': 1,
                'hunter': 1,
                'guard': 1,
                'villagers': 4,
            },
            'rule': {
                'hasSheriff': false,
                'sheriffRule': '',
                'witchRule': WITCH_SELF_HELP_CON.CAN_NOT,
                'victoryCon': VICTORY_CON.KILL_SIDE,
            }
        },
    ]
}

export { VICTORY_CON, WITCH_SELF_HELP_CON, SHERIFF_RULE, roleCard, recommendedSetting }