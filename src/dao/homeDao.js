const mysql = require('../library/mysql');
const rp = require('request-promise-native');
var parser = require('xml2json');
const appid = require('../../config/weatherApi').appid;
const dust_key = require('../../config/weatherApi').dust_key;

async function getWeather() {
    let options = {
        uri: 'https://api.openweathermap.org/data/2.5/weather',
        qs: {
            q: 'Seoul',
            appid: appid
        },
        json: true
    };

    const result = await rp(options);

    switch(result.weather[0].main){
        case 'Mist':
            return {weather:'맑음', text:'즐거운 등산하세요!'};
        case 'Clouds' || 'Dust':
            return {weather:'흐림', text:'즐거운 등산하세요!'};
        case 'Drizzle' || 'Rain' || 'Thunderstorm':
            return {weather:'비', text:'즐거운 등산하세요!'};
        case 'Snow':
            return {weather:'눈', text:'등산에 유의하세요!'};
        case 'Sand':
            return {weather:'황사', text:'등산에 유의하세요!'};
        default:
            return {weather:'안개', text:'등산에 유의하세요!'};
    }
}

async function getDust() {
    let options = {
        uri: 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
        qs: {
            serviceKey: dust_key,
            numOfRows: 1,
            pageNo: 1,
            sidoName: '서울',
            ver: 1.0
        }
    };

    const dust_num = JSON.parse(parser.toJson(await rp(options))).response.body.items.item.pm10Value;

    if (dust_num <= 15)
        return {main:'최고', num: dust_num, text:'즐거운 등산하세요!'};
    else if (dust_num <=30)
        return {main:'좋음', num: dust_num, text:'즐거운 등산하세요!'};
    else if (dust_num <=40)
        return {main:'양호', num: dust_num, text:'즐거운 등산하세요!'};
    else if (dust_num <=50)
        return {main:'보통', num: dust_num, text:'즐거운 등산하세요!'};
    else if (dust_num <=75)
        return {main:'나쁨', num: dust_num, text:'즐거운 등산하세요!'};
    else if (dust_num <=100)
        return {main:'상당히 나쁨', num: dust_num, text:'즐거운 등산하세요!'};
    else if (dust_num <=150)
        return {main:'매우 나쁨', num: dust_num, text:'즐거운 실외 활동을 자제하세요 :)!'};
    else
        return {main:'최악', num: dust_num, text:'즐거운 실외 활동을 자제하세요 :)!'};
}

async function selectTheme() {
    const sql = `
    SELECT theme_idx, name as theme_name
    FROM Santa.THEME
    ORDER BY theme_idx ASC;
    `;

    const result = await mysql.query(sql, []);

    return result
}

async function selectCourseIdxByThemeIdx(theme_idx) {
    const sql = `
    SELECT course_idx
    FROM Santa.THEME_COURSE
    WHERE theme_idx = (?);
    `;

    const result = await mysql.query(sql, [theme_idx]);

    return result
}

async function selectMountainIdxByCourseIdx(course_idx) {
    const sql = `
    SELECT mountain_idx
    FROM Santa.COURSE
    WHERE course_idx = (?);
    `;

    const result = await mysql.query(sql, [course_idx]);

    return result
}

async function selectMountainByIdx(mountain_idx) {
    const sql = `
    SELECT name, img
    FROM Santa.MOUNTAIN
    WHERE mountain_idx = (?);
    `;

    const result = await mysql.query(sql, [mountain_idx]);

    return result
}

module.exports = {
    getWeather,
    getDust,
    selectTheme,
    selectCourseIdxByThemeIdx,
    selectMountainIdxByCourseIdx,
    selectMountainByIdx,
};