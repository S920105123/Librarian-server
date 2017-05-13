const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');
const axios = require('axios');

const NTHUBookUrl = 'http://webpac.lib.nthu.edu.tw/F?func=find-b&find_code=WTL&local_base=BK&adjacent=1';
const NTHUISBNUrl = 'http://webpac.lib.nthu.edu.tw/F?func=find-b&find_code=WAN&local_base=BK&adjacent=1';
const optimizeFlag = "var title = "

function getBook(searchText) {
    let url = NTHUBookUrl + "&request=" + encodeURIComponent(searchText);
    console.log("Make get request to", url);
    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        //console.log("get",res.data);

        return res.data.slice(res.data.indexOf(optimizeFlag));
    });
}

function getISBN(searchText) {
    let url = NTHUISBNUrl + "&request=" + encodeURIComponent(searchText);
    console.log("Make get request to", url);
    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        //console.log("get",res.data);

        return res.data.slice(res.data.indexOf(optimizeFlag));
    });
}

module.exports = {
    getBook,
    getISBN
};
