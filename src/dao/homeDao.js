const mysql = require('../library/mysql');
const s3Location = require('../../config/s3Config').s3Location;
const rp = require('request-promise-native');
const appid = require('../../config/weatherApi').appid;

async function getWeather() {
    let options = {
        uri: 'https://api.openweathermap.org/data/2.5/weather',
        qs: {
            q: 'Seoul',
            appid: appid
        },
        json: true
    };

    return {weather:'맑음', text:'즐거운 등산하세요!'};

    rp(options)
        .then(function (repos) {
            switch(repos.weather[0].main){
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
        })
        .catch(function (err) {
            throw err;
        });
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
    selectTheme,
    selectCourseIdxByThemeIdx,
    selectMountainIdxByCourseIdx,
    selectMountainByIdx,
};