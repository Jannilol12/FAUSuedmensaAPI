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

getParsedXMLFromURL('https://www.max-manager.de/daten-extern//sw-erlangen-nuernberg/xml/mensa-sued.xml', function (result) {
    var menuList = getMenuList(result);
    var date = getDate(menuList[0]);
    var dishList = getDishList(menuList[4]);
    var category = getCategory(dishList[0]);
    var pictogram = getPictogram(dishList[0]);
    var title = getTitle(dishList[0]);
    console.log(getTitleName(title));
    console.log(getSideDish(dishList[0]));
    getSideDishAllergies(getSideDish(dishList[0]));
    // console.log(menuList[0].item);
});

function getParsedXMLFromURL(link, callback) {
    parser.on('error', function (err) {
        console.log('Parser error', err);
    });
    request(link, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            var str = html.toString();
            parser.parseString(str, function (err, result) {
                //console.log(result);
                callback(result);
            });
        } else {
            return "ERROR: " + response;
        }
    });
}

function getMenuList(xml) {
    return xml.speiseplan.tag;
}

function getDate(menu) {
    var time = menu.$.timestamp;
    var date = new Date(time * 1000);
    return (date.getDate() + "." + date.getMonth() + "." + date.getFullYear()).toString();
}

function getDishList(menu) {
    return menu.item;
}

function getCategory(dish) {
    return dish.category.toString();
}

function getTitle(dish) {
    return dish.title.toString();
}

function getTitleName(title){
    var getTitleName = title.split('(');
    return getTitleName[0];
}

function getTitleAllergies(title) {
    var getAllergies = title.split('(');
    getAllergies = getAllergies[1].substring(0, getAllergies[1].length - 1);
    return getAllergies.split(',');
}

function getDescription(dish) {
    return dish.description.toString();
}

function getSideDish(dish) {
    return dish.beilagen.toString();
}

function getSideDishAllergies(sideDish){
    console.log(sideDish.split(','));
}

function getPriceOne(dish) {
    return dish.preis1.toString();
}

function getPriceTwo(dish) {
    return dish.preis2.toString();
}

function getUnit(dish) {
    return dish.einheit.toString();
}

//TODO: return value -> piktogramme: [ "<img src='https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/G.png?v=1' class='infomax-food-icon G' width='60' height='60' alt='food-icon'>" ]
function getPictogram(dish) {
    return dish.piktogramme;
}

//TODO return value
function getPhoto(dish) {
    return dish.foto;
}


/*
allergies=[1,5,8,WZ]

 */