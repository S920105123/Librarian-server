const axios = require('axios');

const BookUrl = 'http://webpac.lib.nctu.edu.tw/F?func=find-b&find_code=WTI&local_base=TOP01&adjacent=1';
const ISBNUrl = 'http://webpac.lib.nctu.edu.tw/F?func=find-b&find_code=ISBN&local_base=TOP01&adjacent=1';
const optimizeFlag = "var title = "

function getBook(searchText) {
    let url = BookUrl + "&request=" + encodeURIComponent(searchText);
    console.log("Make get request to", url);
    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        //console.log("get",res.data);

        return res.data.slice(res.data.indexOf(optimizeFlag));
    });
}

function getISBN(searchText) {
    let url = ISBNUrl + "&request=" + encodeURIComponent(searchText);
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
