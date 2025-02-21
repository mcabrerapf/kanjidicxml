
const CHAR_URL_MATCH = {
    akira: 'skill01',
    pai: 'skill02',
    lau: 'skill03',
    wolf: 'skill04',
    jeffry: 'skill05',
    kage: 'skill06',
    sarah: 'skill07',
    jacky: 'skill08',
    shun: 'skill09',
    lion: 'skill10',
    aoi: 'skill11',
    lei: 'skill12',
    vanessa: 'skill13',
    brad: 'skill14',
    goh: 'skill15',
    eileen: 'skill16',
    elblaze: 'skill17',
    taka: 'skill18',
    jean: 'skill19',
}

const CHAR_NAME_MATCH = {
    akira: {
        name: "Akira Yuki",
        short_name: 'Akira',
        initials: 'AK',
    },
    aoi: {
        name: "Aoi Umenokouji",
        short_name: 'Aoi',
        initials: 'AO',
    },
    brad: {
        name: "Brad Burns",
        short_name: 'Brad',
        initials: 'BR',
    },
    eileen: {
        name: "Eileen",
        short_name: "Eileen",
        initials: 'EI',
    },
    elblaze: {
        name: "El Blaze",
        short_name: "Blaze",
        initials: 'BL',
    },
    goh: {
        name: "Goh Hinogami",
        short_name: 'Goh',
        initials: 'GO',
    },
    jacky: {
        name: "Jacky Bryant",
        short_name: 'Jacky',
        initials: 'JA',
    },
    jean: {
        name: "Jean Kujo",
        short_name: 'Jean',
        initials: 'JE',
    },
    jeffry: {
        name: "Jeffry McWild",
        short_name: "Jeffry",
        initials: 'JF',
    },
    kage: {
        name: "Kage Maru",
        short_name: "Kage",
        initials: 'KA',
    },
    lau: {
        name: "Lau Chan",
        short_name: "Lau",
        initials: 'LA',
    },
    lei: {
        name: "Lei Fei",
        short_name: "Lei",
        initials: 'LE',
    },
    lion: {
        name: "Lion Rafale",
        short_name: "Lion",
        initials: 'LI',
    },
    pai: {
        name: "Pai Chan",
        short_name: "Pai",
        initials: 'PA',
    },
    sarah: {
        name: "Sarah Bryant",
        short_name: "Sarah",
        initials: 'SA',
    },
    shun: {
        name: "Shun Di",
        short_name: "Shun",
        initials: 'SH',
    },
    taka: {
        name: "Taka Arashi",
        short_name: "Taka",
        initials: 'TA',
    },
    vanessa: {
        name: "Vanessa Lewis",
        short_name: "Vanessa",
        initials: 'VA',
    },
    wolf: {
        name: "Wolf Hawkfield",
        short_name: "Wolf",
        initials: 'WO',
    }
}

const MOVE_PROP_REPLACE = {
    move_name: {
        id: 'name',
        name: 'Name',
        short_name: 'Nam'
    },
    command: {
        id: 'command',
        name: 'Command',
        short_name: 'Cmd'
    },
    attack_level: {
        id: 'attack_level',
        name: 'Attack Level',
        short_name: 'Lvl'
    },
    damage: {
        id: 'damage',
        name: 'Damage',
        short_name: 'Dmg'
    },
    startup: {
        id: 'startup',
        name: 'Startup',
        short_name: 'Str'
    },
    active: {
        id: 'active',
        name: 'Active',
        short_name: 'Act'
    },
    total: {
        id: 'total',
        name: 'Total',
        short_name: 'Tot'
    },
    gd: {
        id: 'block',
        name: 'Block',
        short_name: 'Blk'
    },
    hit: {
        id: 'hit',
        name: 'Hit',
        short_name: 'Hit'
    },
    c_hit: {
        id: 'c_hit',
        name: 'Counter Hit',
        short_name: 'CHt'
    },
    crouch_hit: {
        id: 'crouch_hit',
        name: 'Crouch Hit',
        short_name: 'CrH'
    },
    crouch_c_hit: {
        id: 'crouch_c_hit',
        name: 'Crouch Counter Hit',
        short_name: 'CCH'
    },
    recovery_c: {
        id: 'crouch_recovery',
        name: 'Crouch Recovery',
        short_name: 'CrR'
    },
    dodge_direction: {
        id: 'dodge_direction',
        name: 'Dodge Direction',
        short_name: 'Dge'
    },
    sober: {
        id: 'sober',
        name: 'Sober',
        short_name: 'Sob'
    },
    notes: {
        id: 'notes',
        name: 'Notes',
        short_name: 'Nts'
    },
}

const ATTACK_LEVEL_MATCH = {
    high: {
        order: 0,
        short_name: 'H'
    },
    ex_high: {
        order: 1,
        short_name: 'H*'
    },
    mid: {
        order: 2,
        short_name: 'M'
    },
    ex_mid: {
        order: 3,
        short_name: 'M*'
    },
    low: {
        order: 4,
        short_name: 'L'
    },
    ex_low: {
        order: 5,
        short_name: 'L*'
    },
    //
    high_throw: {
        order: 6,
        short_name: 'HT'
    },
    high_catch_throw: {
        order: 7,
        short_name: 'HCT'
    },
    low_throw: {
        order: 8,
        short_name: 'LT'
    },
    low_catch_throw: {
        order: 9,
        short_name: 'LCT'
    },
    down_throw: {
        order: 10,
        short_name: 'DT'
    },
    hit_throw: {
        order: 11,
        short_name: 'HtT'
    },
    throw_combo: {
        order: 12,
        short_name: 'TC'
    },
    //
    high_unblockable: {
        order: 13,
        short_name: 'HU'
    },
    down_attacks: {
        order: 14,
        short_name: 'DA'
    },
    inashi: {
        order: 15,
        short_name: 'I'
    },
    atemi: {
        order: 16,
        short_name: 'A'
    },
    deflect: {
        order: 17,
        short_name: 'D'
    },
    other: {
        order: 18,
        short_name: 'O'
    },
}

const WEIGHT_CLASES = [
    {
        id: 0,
        name: 'Super lightweight',
        short_name: 'SLW',
        characters: ['aoi', 'eileen', 'elblaze']
    },
    {
        id: 1,
        name: 'Lightweight',
        short_name: 'LW',
        characters: ['sarah', 'shun', 'pai', 'lion', 'vanessa']
    },
    {
        id: 2,
        name: 'Midweight',
        short_name: 'MW',
        characters: ['akira', 'lau', 'jacky', 'kage', 'lei', 'brad', 'goh', 'jean']
    },
    {
        id: 3,
        name: 'Heavyweight',
        short_name: 'HW',
        characters: ['wolf', 'jeffry']
    },
    {
        id: 4,
        name: 'Super Heavyweight',
        short_name: 'SHW',
        characters: ['taka']
    }
]

const MOVELIST_SORT_OPTIONS = [
    {
        "id": "default",
        "name": "Default",
        "key": "",
        "dir": "asc",
        type: null,
        "order": 0
    },
    {
        "id": "name",
        "name": "Name",
        "short_name": "Nam",
        "key": "name",
        "dir": "asc",
        type: 'string',
        "order": 1
    },
    {
        "id": "command",
        "name": "Command",
        "short_name": "Cmd",
        "key": "command",
        "dir": "asc",
        type: "array",
        "order": 2
    },
    {
        "id": "attack_level",
        "name": "Attack Level",
        "short_name": "Lvl",
        "key": "attack_level",
        "dir": "asc",
        type: 'string',
        "order": 3
    },
    {
        "id": "damage",
        "name": "Damage",
        "short_name": "Dmg",
        "key": "damage",
        "dir": "asc",
        type: 'number',
        "order": 4
    },
    {
        "id": "startup",
        "name": "Startup",
        "short_name": "Str",
        "key": "startup",
        "dir": "asc",
        type: 'number',
        "order": 5
    },
    {
        "id": "active",
        "name": "Active",
        "short_name": "Act",
        "key": "active",
        "dir": "asc",
        type: 'number',
        "order": 6
    },
    {
        "id": "total",
        "name": "Total",
        "short_name": "Tot",
        "key": "total",
        "dir": "asc",
        type: 'number',
        "order": 7
    },
    {
        "id": "block",
        "name": "Block",
        "short_name": "Blk",
        "key": "block",
        "dir": "asc",
        type: 'number',
        "order": 8
    },
    {
        "id": "hit",
        "name": "Hit",
        "short_name": "Hit",
        "key": "hit",
        "dir": "asc",
        type: 'number',
        "order": 9
    },
    {
        "id": "c_hit",
        "name": "Counter Hit",
        "short_name": "CHt",
        "key": "c_hit",
        "dir": "asc",
        type: 'number',
        "order": 10
    },
    {
        "id": "crouch_hit",
        "name": "Crouch Hit",
        "short_name": "CrH",
        "key": "crouch_hit",
        "dir": "asc",
        type: 'number',
        "order": 11
    },
    {
        "id": "crouch_c_hit",
        "name": "Crouch Counter Hit",
        "short_name": "CCH",
        "key": "crouch_c_hit",
        "dir": "asc",
        type: 'number',
        "order": 12
    },
    {
        "id": "crouch_recovery",
        "name": "Crouch Recovery",
        "short_name": "CrR",
        "key": "crouch_recovery",
        "dir": "asc",
        type: 'number',
        "order": 13
    },
    {
        "id": "dodge_direction",
        "name": "Dodge Direction",
        "short_name": "Dge",
        "key": "dodge_direction",
        "dir": "asc",
        type: 'string',
        "order": 14
    },
    {
        "id": "sober",
        "name": "Sober",
        "short_name": "Sob",
        "key": "sober",
        "dir": "asc",
        type: 'number',
        "order": 15
    },
    {
        "id": "notes",
        "name": "Notes",
        "short_name": "Nts",
        "key": "notes",
        "dir": "asc",
        type: 'number',
        "order": 16
    }
];


const buildFrameDataFilters = ({ key, name, short_name }) => {
    return [
        {
            id: `is_plus_on_${key}/true`,
            key: `is_plus_on_${key}`,
            value: true,
            name: `Plus on ${name}`,
            short_name: `${short_name}+`,
        },
        {
            id: `is_minus_on_${key}/true`,
            key: `is_minus_on_${key}`,
            value: true,
            name: `Minus on ${name}`,
            short_name: `${short_name}-`,
        },
        {
            id: `launches_on_${key}/true`,
            key: `launches_on_${key}`,
            value: true,
            name: `Launches on ${name}`,
            short_name: `L${short_name}`,
        },
        {
            id: `staggers_on_${key}/true`,
            key: `staggers_on_${key}`,
            value: true,
            name: `Staggers on ${name}`,
            short_name: `S${short_name}`,
        },
        // 
        {
            id: `is_punishable_on_${key}/true`,
            key: `is_punishable_on_${key}`,
            value: true,
            name: `Punishable on ${name}`,
            short_name: `P${short_name}`,
        },
        // 
        {
            id: `guarantees_on_${key}/true`,
            key: `guarantees_on_${key}`,
            value: true,
            name: `Guarantees on ${name}`,
            short_name: `G${short_name}`,
        },
    ]
};

const MOVELIST_FILTERS = [
    {
        id: 'command/[P]',
        key: 'command',
        value: '[P]',
        name: 'Command',
        short_name: 'Cmd',
    },
    // 
    {
        id: 'dodge_direction/〇',
        key: 'dodge_direction',
        value: '〇',
        name: 'Dodge(〇)',
        short_name: 'D(〇)',
    },
    {
        id: 'dodge_direction/×',
        key: 'dodge_direction',
        value: '×',
        name: 'Dodge(×)',
        short_name: 'D(×)',
    },
    {
        id: 'dodge_direction/-',
        key: 'dodge_direction',
        value: '-',
        name: 'Dodge(-)',
        short_name: 'D(-)',
    },
    {
        id: 'dodge_direction/Front',
        key: 'dodge_direction',
        value: 'Front',
        name: 'Dodge(Front)',
        short_name: 'D(F)',
    },
    {
        id: 'dodge_direction/Back',
        key: 'dodge_direction',
        value: 'Back',
        name: 'Dodge(Back)',
        short_name: 'D(B)',
    },
    //
    ...buildFrameDataFilters({ key: 'hit', name: 'Hit', short_name: 'H' }),
    ...buildFrameDataFilters({ key: 'c_hit', name: 'CHit', short_name: 'CH' }),
    ...buildFrameDataFilters({ key: 'crouch_hit', name: 'CrHit', short_name: 'CrH' }),
    ...buildFrameDataFilters({ key: 'crouch_c_hit', name: 'CrCHit', short_name: 'CrCH' }),
    ...buildFrameDataFilters({ key: 'block', name: 'Block', short_name: 'Blk' }),

]

const COMBOS_SORT_OPTIONS = [
    {
        id: 'name',
        name: 'Name',
        short_name: 'Nam',
        dir: 'asc',
        key: 'name',
        type: 'string',
        order: 0,
    },
    {
        id: 'damage',
        name: 'Damage',
        short_name: 'Dmg',
        key: 'damage',
        dir: 'asc',
        type: 'number',
        order: 1,
    },
    {
        id: 'launcher',
        name: 'Launcher',
        short_name: 'Lch',
        key: 'launcher',
        dir: 'asc',
        type: "array",
        order: 2,
    },
    {
        id: 'command',
        name: 'Command',
        short_name: 'Cmd',
        key: 'command',
        dir: 'asc',
        type: "array",
        order: 3,
    },
    {
        id: 'character_tags',
        name: 'Characters',
        short_name: 'CTags',
        key: 'character_tags',
        dir: 'asc',
        type: "array",
        order: 4,
    },
    {
        id: 'tags',
        name: 'Tags',
        short_name: 'Tags',
        key: 'tags',
        dir: 'asc',
        type: "array",
        order: 5,
    },
    {
        id: 'note',
        name: 'Note',
        short_name: 'Note',
        key: 'note',
        dir: 'asc',
        type: 'string',
        order: 6,
    }
];

const COMBOS_FILTER_OPTIONS = [
    {
        id: 'other/wall',
        key: 'tags',
        value: 'wall',
        name: 'Wall',
        short_name: 'Wall',
    },
    {
        id: 'other/ch',
        key: 'tags',
        value: 'ch',
        name: 'Counter Hit',
        short_name: 'CH',
    },
    {
        id: 'other/side',
        key: 'tags',
        value: 'side',
        name: 'Side',
        short_name: 'Side',
    }
]

const constants = {
    ATTACK_LEVEL_MATCH,
    MOVE_PROP_REPLACE,
    CHAR_URL_MATCH,
    CHAR_NAME_MATCH,
    MOVELIST_SORT_OPTIONS,
    MOVELIST_FILTERS,
    COMBOS_SORT_OPTIONS,
    COMBOS_FILTER_OPTIONS,
    WEIGHT_CLASES
}

module.exports = constants;