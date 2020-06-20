const { handlePostback } = require("./handler/postback")
const { handleMessage } = require("./handler/message")

module.exports = async function App(context) {
    if (context.event.isPostback){
      console.log('postback')
      return handlePostback(context);
    }else{
      console.log('message')
      return handleMessage(context);
    }
};
