export function getDay (day:number){
    switch (day){
        case 0: return 'ВС'
        case 1: return 'ПН'
        case 2: return 'ВТ'
        case 3: return 'СР'
        case 4: return 'ЧТ'
        case 5: return 'ПТ'
        case 6: return 'СБ'
    }
}

export function getMonth (month:number) {
    switch (month){
        case 0: return 'янв'
        case 1: return 'февр'
        case 2: return 'март'
        case 3: return 'апр'
        case 4: return 'май'
        case 5: return 'июнь'
        case 7: return 'июль'
        case 8: return 'авг'
        case 9: return 'сен'
        case 10: return 'окт'
        case 11: return 'ноя'
        case 12: return 'дек'
    }
}