export function get_height_array(){
    const max_height = 210;
    const min_height = 140;
    const arr = Array(max_height-min_height).fill(min_height).map((n, i) => n + i);
    const heights = [];
    arr.forEach(el => {
        heights.push({value: el, label: `${el} cm`});
    });
    return heights;
}

export function get_age_array(years_old){
    const max_older = 100;
    const min_older = 18;
    const arr = Array(max_older-min_older).fill(18).map((n, i) => n + i);
    const ages = [];
    arr.forEach(el => {
        ages.push({value: el, label: `${el} ${years_old}`});
    });
    return ages;
}

export function get_birthday_years_array(){
    const highest_date = new Date();
    const min_older = 18;
    highest_date.setFullYear(highest_date.getFullYear()-min_older);
    const arr = Array(82).fill(highest_date.getFullYear()).map((n, i) => n - i);
    const years = [];
    arr.forEach(el => {
        years.push({value: el, label: el});
    });
    return years;
}

export function get_birthday_months_array(labels){
    const arr = [];
    for(let i=0;i<labels.length;i++){
        const value = i+1 < 10 ? `0${i+1}`: (i+1).toString();
        arr.push({value: value, label: labels[i]});
    }
    return arr;
}

const isLeap = year => new Date(year, 1, 29).getDate() === 29;


export function get_birthday_days_array(month, year){
    const days_in_february = year?.current?.value && isLeap(year.current.value) ? 29 : 28;

    const arr = [];
    const up_to = (month === '04' || month === '06' || month === '09' || month === '11') ?
        30 : month === '02' ? days_in_february : 31;
    for(let i=0;i<up_to;i++){
        const value = i+1 < 10 ? `0${i+1}`: (i+1).toString();
        arr.push(value);
    }
    const days = [];
    arr.forEach(el => {
        days.push({value: el, label: el});
    });
    return days;
}

export function get_age_from_birthday(birthday){
    const birthday_timestamp = new Date(birthday).getTime();
    const current_date = new Date().getTime();
    const difference = current_date - birthday_timestamp;
    return Math.floor(difference / 31557600000);
}

export function get_hours_and_minutes(totalMinutes){
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
}