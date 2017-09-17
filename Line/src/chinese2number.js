const NUM_CHAR = ['零','一','二','三','四','五','六','七','八','九','十'];
function chinese2number(msg){
   
    
}

function parse(msg) {
    var tmp = {
        num: [],
        str: ""
    };
    var newMsg = msg;
    for(var i = 0; i < msg.length; ++i){       
        if(NUM_CHAR.indexOf(msg[i])> 0){              
            tmp.num.push(NUM_CHAR.indexOf(msg[i]));
            tmp.str += msg[i];          
        }
        if(NUM_CHAR.indexOf(msg[i]) < 0 || i == msg.length-1){           
            var num = '';
            for(var j = 0; j < tmp.num.length; ++j){
                if(tmp.num[j] != 10){
                    num += tmp.num[j].toString();
                }
                else{
                    if(tmp.num.length == 1)
                        num += '10';
                    else if(j == 0)
                        num += '1';
                    else if(j == tmp.length-1)
                        num += '0';                   
                }               
            }         
            if(num.length > 0)             
                newMsg = newMsg.replace(tmp.str, num);                  
            tmp.num = [];
            tmp.str = "";             
        } 
    }
    return newMsg;
}

exports.parse = parse