const cheerio = require('cheerio');
const { WEIGHT_CLASES, CHAR_NAME_MATCH, MOVELIST_FILTERS, COMBOS_FILTER_OPTIONS } = require('../constants/vf5-revo');
const createId = require("./createId");
const getCommand = require("./getCommand");
const getValue = require("./getValue");
const getMoveCategory = require('./getMoveCategory');
const getAttackLevel = require('./getAttackLevel');
const getMoveProp = require('./getMoveProp');
const getMovePunishes = require('./getMovePunishes');

function getCharacterData(html, characterId) {
    const { name: characterName, short_name } = CHAR_NAME_MATCH[characterId];
    const $ = cheerio.load(html);
    const skillTable = $("table.skillTable");
    const moveCategories = [{ id: 'all_moves', name: 'All Moves', order: 0 }];
    const allMoves = [];
    const attackLevels = [];
    const movelist = {};
    const moves_properties = {};
    let currentCategory;
    const movelistFilterOptions = [];
    let combosFilterOptions = [];
    const moveKeyProps = [];
    skillTable
        .find("tr")
        .first()
        .find("th, td")
        .each((_, cell) => {
            const currentCell = $(cell);
            const moveProp = getMoveProp(currentCell);
            moveKeyProps.push(moveProp);
        })

    let multipleRowData = {};
    skillTable.find("tr").slice(1).each((rowIndex, row) => {
        const currentRow = $(row);
        const currentRowChildren = currentRow.children();
        const rowData = {};
        console.log(multipleRowData)
        const isMoveCategory = currentRowChildren.length === 1;
        if (isMoveCategory) {
            const [categoryId, categoryName] = getMoveCategory(currentRow);
            currentCategory = categoryId;
            moveCategories.push({
                id: categoryId,
                name: categoryName,
                order: moveCategories.length
            });
            return;
        }
        if (currentRowChildren.length < 16) {
            // 14 and 15
            console.log("Weird row", currentRowChildren.length);
            return;
        };

        currentRow
            .find("td")
            .each((j, cell) => {
                const currentCell = $(cell);

                const cellChildren = currentCell.contents().toArray();
                const columnName =
                    moveKeyProps[j].id ||
                    `Column_${j + 1}`;
                const isCommand = columnName === 'command';
                const isAttackLevel = columnName === 'attack_level';
                const isDodgeDirection = columnName === 'dodge_direction';

                const command = isCommand ?
                    getCommand(cellChildren, $) : [];
                const currentCellText = currentCell.text().trim();
                const value = getValue(currentCellText, command, columnName);
                const dodgeValue = value || '-';

                rowData[columnName] = isDodgeDirection ? dodgeValue : value;
             
                if (isDodgeDirection) {
                    if (!moves_properties[`dodge_direction_${dodgeValue}`]) moves_properties[`dodge_direction_${dodgeValue}`] = 0;
                    moves_properties[`dodge_direction_${dodgeValue}`] += 1;
                }
                if (isAttackLevel && value) {
                    const [attackLevelId, attackLevelName, attackLevelShortName, attackLevelOrder] = getAttackLevel(value)
                    const attackLevelMatch = attackLevels.find(move => move.id === attackLevelId);
                    rowData[columnName] = attackLevelId;

                    if (!!attackLevelMatch) {
                        attackLevelMatch.number_of_moves += 1;
                    } else {
                        attackLevels.push({
                            id: attackLevelId,
                            order: attackLevelOrder,
                            name: attackLevelName,
                            short_name: attackLevelShortName,
                            number_of_moves: 1
                        });
                    }
                }

                if (currentCell.attr('rowspan')) {
                    multipleRowData[columnName] = { value: rowData[columnName], span: currentCell.attr('rowspan') }
                }

            });
        if (Object.keys(rowData).length > 0) {
            const moveId = createId(rowData, rowIndex);
            if (!currentCategory) {
                moveCategories.push({ id: 'normal_moves', name: 'Normal moves', order: moveCategories.length })
                currentCategory = 'normal_moves';
            }
            rowData.category = currentCategory;
            const movePunishes = getMovePunishes(rowData, moves_properties);
            const finalData = {
                ...rowData,
                ...movePunishes,
                id: moveId
            };
            allMoves.push(finalData);
            if (!movelist[currentCategory]) movelist[currentCategory] = []
            movelist[currentCategory].push(finalData);
        }
    });

    const moveList = {
        ...movelist,
        all_moves: allMoves
    }
    const categoriesWithMoveLengths = moveCategories.map(cat => {
        return {
            ...cat,
            number_of_moves: moveList[cat.id].length
        }
    })

    const { id: wId, name: wName, short_name: wShortName } = WEIGHT_CLASES.find(wClass => wClass.characters.includes(characterId));

    const sortedAttackLevels = attackLevels.sort((a, b) => a.order - b.order);
    sortedAttackLevels.forEach(attackLevel => {
        moves_properties[attackLevel.id] = attackLevel.number_of_moves;
        movelistFilterOptions.push({
            id: `attack_level/${attackLevel.id}`,
            key: 'attack_level',
            value: attackLevel.id,
            name: attackLevel.name,
            short_name: attackLevel.short_name,
            // number_of_moves: attackLevel.number_of_moves,
            order: movelistFilterOptions.length

        })
        combosFilterOptions.push({
            id: `attack_level/${attackLevel.id}`,
            key: 'tags',
            value: attackLevel.id,
            name: attackLevel.name,
            short_name: attackLevel.short_name,
            // number_of_moves: attackLevel.number_of_moves,
            order: combosFilterOptions.length

        })
    })
    MOVELIST_FILTERS.forEach(filter => {
        movelistFilterOptions.push({
            ...filter,
            order: movelistFilterOptions.length
        })
    })
    WEIGHT_CLASES.forEach(wCLass => {
        wCLass.characters.forEach(wChar => {
            combosFilterOptions.push({
                id: `character_tags/${wChar}`,
                key: 'character_tags',
                value: wChar,
                name: CHAR_NAME_MATCH[wChar].name,
                short_name: CHAR_NAME_MATCH[wChar].short_name,
                initials: CHAR_NAME_MATCH[wChar].initials,
                weight_id: wCLass.id,
                weight_name: wCLass.name,
                weight_short_name: wCLass.short_name,
                order: combosFilterOptions.length
            })
        })
    });

    moveCategories.forEach(moveCat => {
        combosFilterOptions.push({
            id: `move_category/${moveCat.id}`,
            key: 'tags',
            value: moveCat.id,
            name: moveCat.name,
            short_name: moveCat.name,
            order: combosFilterOptions.length
        })
    })
    COMBOS_FILTER_OPTIONS.forEach(filter => {
        combosFilterOptions.push({
            ...filter,
            order: combosFilterOptions.length
        })
    })

    return {
        id: characterId,
        name: characterName,
        short_name: short_name,
        weight_class: { id: wId, name: wName, short_name: wShortName },
        moves_properties,
        // attack_levels: sortedAttackLevels,
        move_categories: categoriesWithMoveLengths,
        // move_key_props: moveKeyProps,
        // movelist_sort_options: movelistSortOptions,
        movelist_filter_options: movelistFilterOptions,
        // combos_sort_options: COMBOS_SORT_OPTIONS,
        combos_filter_options: combosFilterOptions,
        movelist: moveList
    }
}

module.exports = getCharacterData;