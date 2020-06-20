const { postback } = require("./handler/postback")
const { handleMessage } = require("./handler/message")

module.exports = async function App(context) {
    if (context.event.isPosback){
      return postback(context);
    }else{
      return handleMessage(context);
    }
};
