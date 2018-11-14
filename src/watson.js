var watson = require('watson-developer-cloud');
var request = require('request');
var backend = require('./backend');
require('dotenv').config()

// conversation context
var context = {};

// cart 
var cart = {
    products: []
};

// Set up Conversation service wrapper.
var conversation = new watson.AssistantV1 ({
    username: process.env.WATSON_USERNAME, // replace with username from service key
    password: process.env.WATSON_PASSWORD, // replace with password from service key
    url: process.env.ASSISTANT_URL, // replace with workspace url
    version: '2018-09-20',
});



function callWatsonAPI(msg, event) {
    conversation.message({
        "input": { 'text': msg },
        "context": context,
        "workspace_id": process.env.WATSON_WORKSPACE_ID ,
    }, function (err, response) {
        if (err)
            console.log('error:', err);
        else {
            /* update context */
            context = response.context;
            console.log(JSON.stringify(response, null, 2));
            callMessageAPI(response, event);
            //  console.log(extractNumbers( response.input.text));
        }
    });
}

function callMessageAPI(response, event) {
    var context = response.context;
    var text = response.input.text;
    var indents = response.indents;
    var entities = response.entities;

    // Order confirmataion
    if (context.orderConfirm) {
        event.reply(orderConfirm(entities));
        
    }
    // Checkout
    else if (context.orderSubmit) {
        orderSubmit(event)
        event.reply(response.output.text);

    }
<<<<<<< HEAD
    event.reply(response.output.text);
=======
    else if(context.queue){
        backend.displayQueue(event);
        context.queue = false;
    }
    else {
        event.reply(response.output.text);
    }
>>>>>>> f01255d5d0b103e4c562a29ded40af14fed77d1b
}

function createEntity() {
    var options = {
        method: 'POST',
        url: 'https://gateway.watsonplatform.net/conversation/api/v1/workspaces/aaeb5ef3-9c90-4103-b2e1-1d3920a8d700/entities?version=2017-05-26',
        auth: {
            user: username,
            password: password
        },
        json: {
            entity: "latte",
            values: [{ value: "拿鐵" }]
        }
    }

    request(options, function callback(err, res, body) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(body);
        }
    })

}

function orderConfirm(entities, event) {
    function add2cart(name, number) {
        var curProduct = {
            name: name,
            number: number
        };
        var flag = true;
        for (var i = 0; i < cart.products.length; ++i) {
            if (cart.products[i].name == curProduct.name) {
                cart.products[i].number += curProduct.number;
                flag = false;
                break;
            }
        }
        if (flag) {
            cart.products.push(curProduct);
        }

        console.log(cart.products);
        // update context, orderConfirm ended
        context.orderConfirm = false;
    }
    var products = [];
    var numbers = [];

    for (var i = 0; i < entities.length; ++i) {
        if (entities[i].entity == "numbers") numbers.push(entities[i]);
        else if (entities[i].entity == "products") products.push(entities[i]);
    }
    var msg = "您確定要點";
    // step method 1
    // var step = 0;
    // for (var i = 0; i < products.length; ++i) {
    //     if (step < numbers.length) {
    //         if (numbers[step].location[0] < products[i].location[0]) {
    //             msg = msg + numbers[step].value + '份' + products[i].value + '和';
    //             add2cart(products[i].value, parseInt(numbers[step].value));
    //             step++;

    //         }
    //         else {
    //             msg = msg + '1份' + products[i].value + '和';
    //             add2cart(products[i].value, 1);
    //         }
    //     } else {
    //         msg = msg + '1份' + products[i].value + '和';
    //         add2cart(products[i].value, 1);
    //     }
    // }
    // msg = msg.substring(0, msg.length - 1) + '嗎？';

    // step method 2
    for (var i = 0; i < products.length; ++i) {
        if (i < numbers.length) {
            msg = msg + numbers[i].value + '份' + products[i].value + '和';
            add2cart(products[i].value, parseInt(numbers[i].value));
        }
        else {
            msg = msg + '1份' + products[i].value + '和';
            add2cart(products[i].value, 1);
        }
    }
    msg = msg.substring(0, msg.length - 1) + '嗎？';
    console.log(msg);
    return msg;



}

function orderSubmit(event) {
    for (var i = 0; i < cart.products.length; ++i) {
        if (cart.products[i].number == 0) {
            cart.products.splice(i, 1);
        }
        backend.checkout(event, cart.products, '1a');
        cart.products = [];
    }
}



function extractNumbers(msg) {
    return msg.match(/(\d[\d\.]*)/g);
}

exports.callWatsonAPI = callWatsonAPI
exports.createEntity = createEntity
