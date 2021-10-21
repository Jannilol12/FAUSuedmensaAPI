// const request = require('request');
// const cheerio = require('cheerio');
//
//
// const xml = getXMLFromLink('https://www.max-manager.de/daten-extern//sw-erlangen-nuernberg/xml/mensa-sued.xml');
// console.log(xml);
//
// function getXMLFromLink(link){
//     request(link, (error, response, html) => {
//         if(!error && response.statusCode == 200) {
//             console.log(cheerio.load(html));
//             return cheerio.load(html);
//         }else{
//             return "ERROR: " + response;
//         }
//     });
// }
//
// function getTag(xml){
//     console.log(xml('tag').text);
// }


// var https = require('https');
// var xml2js = require('xml2js');
// var parser = new xml2js.Parser();
// var concat = require('concat-stream');
//
// const xml = getParsedXMLFromURL();
// console.log(xml);
// const menu = getMenuItems(xml);
// console.log(menu);
//
// function getParsedXMLFromURL() {
//     parser.on('error', function (err) {
//         console.log('Parser error', err);
//     });
//     https.get('https://www.max-manager.de/daten-extern//sw-erlangen-nuernberg/xml/mensa-sued.xml', function (resp) {
//
//         resp.on('error', function (err) {
//             console.log('Error while reading', err);
//         });
//
//         resp.pipe(concat(function (buffer) {
//             var str = buffer.toString();
//             parser.parseString(str, function (err, result) {
//                 console.log(result.speiseplan);
//                 return result;
//             });
//         }));
//     });
// }
//
// function getMenuItems(xml){
//     return xml;
// }
const request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

getParsedXMLFromURL('https://www.max-manager.de/daten-extern//sw-erlangen-nuernberg/xml/mensa-sued.xml', function(result){
    var menuList = getMenuList(result);
    var date = getDateFromMenu(menuList[0]);
});

function getParsedXMLFromURL(link, callback) {
    parser.on('error', function (err) {
        console.log('Parser error', err);
    });
    request(link, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            var str = html.toString();
            parser.parseString(str, function (err, result) {
                //console.log(result);
                callback(result);
            });
        }else{
            return "ERROR: " + response;
        }
    });
}

function getMenuList(xml) {
    return xml.speiseplan.tag;
}

function getDateFromMenu(menu){
    var time = menu.$.timestamp;
    var date = new Date(time*1000);
    return date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
}