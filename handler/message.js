//flex
const createAkunFlex = require('../flex/createAkun')

async function handleMessage(Context) {
  const message = Context.event.message;
  let profileUser = await Context.getUserProfile()
  let userId = profileUser.userId;
  // console.log(profileUser);

  if (message.type !== "text") {
    Context.reply([{
      type: "text",
      text: "apa tuh"
    }]);
  } else {
    // console.log(userId);

    switch (message.text.toLowerCase()) {
      case "login" : 
        Context.reply([
          {
            type: "text",
            text: `Sudah punya akun? ketik "login <email> (spasi) <password>"`
          },
          {
            type: "flex",
            altText: "Create Akun",
            contents: createAkunFlex
          }
        ]);
        break;
      default :
        Context.reply([
          {
            type: "text",
            text: 'Silahkan Ketik "Menu" atau buka tab dibawah'
          }
        ]);
    }
  }
}

module.exports = {
  handleMessage
};