const ConversationV1 = require('watson-developer-cloud/conversation/v1');
const request = require('request');
var username = '065997df-aa32-47b2-8543-2cd06255c6de';
var password = 'sJKZyipOHm5I';



// Set up Conversation service wrapper.
var conversation = new ConversationV1({
  username: username, // replace with username from service key
  password: password, // replace with password from service key
  path: { workspace_id: 'aaeb5ef3-9c90-4103-b2e1-1d3920a8d700' }, // replace with workspace ID
  version_date: '2016-07-11',
 

});


function callMessageAPI(msg, event) {
    conversation.message({  
        "input": {'text': msg},   
            
        },  function(err, response) {
        if (err)
            console.log('error:', err);
        else{
             console.log(JSON.stringify(response, null, 2));
             event.reply(response.output.text);
        }           
    });    
}

function createEntity(data){ 
    var options = {
        method: 'POST',
        url: 'https://gateway.watsonplatform.net/conversation/api/v1/workspaces/aaeb5ef3-9c90-4103-b2e1-1d3920a8d700/entities?version=2017-05-26',
        auth: {
            user: username,
            password: password
        },
        json: {
            entity: "latte",
            values: [{value: "拿鐵"}]
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

exports.callMessageAPI = callMessageAPI
exports.createEntity = createEntity
