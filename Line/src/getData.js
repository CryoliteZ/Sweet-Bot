const request = require('request');

function login(params) {
    var options = {
        method: 'POST',
        url: 'https://nonsenseworkshop.com:2053/pos/signin/',       
        json: {
            username: "testAdministrator",
            password: "abaaabab"
        }
    }

    request(options, function callback(err, res, body) {
        if (err) {
            console.log(err);
            return;
        }else{
            console.log(body);
        } 
    })
    
}

function getProduct(){ 
    var options = {
        method: 'GET',
        url: 'https://nonsenseworkshop.com:2053/pos/product/',        
    }

    request(options, function callback(err, res, body) {
        if (err) {
            console.log(err);
            return;
        }else{
            console.log(body);
        } 
    })
    
}

function init() {
    login();
    // getProduct();
}

exports.init = init
exports.login = login
exports.getProduct = getProduct