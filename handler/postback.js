//module
// const redis = require("redis");
// const client = redis.createClient();

//flex
const walletFlex = require('../flex/walletFlex')

const moduleNominal = require("../module/nominal");

async function handlePostback(Context) {
  let profileUser = await Context.getUserProfile()
  let userId = profileUser.userId;

  console.log(Context.event.postback)
  const text = Context.event.postback.data.split('=')
  switch (text[0]) {
    case 'penukaran':
      if (text[1] == "riwayat"){

      }else{
        const flex = walletFlex
        await Context.reply([
          {
            type: "flex",
            altText: "Pilih Pembayaran",
            contents: flex
          }
        ])
      }
      break;
    case 'pembayaran':
      await Context.setState({
        tipe: text[1]
      })
      await moduleNominal(Context, userId)
      break
    case 'nominal':
      let data = await Context.state
      data['nominal'] = Number(text[1])
      console.log(data);
      await Context.setState({
        nominal: Number(text[1])
      })
      // flex konfirmasi 
      break
    default:
      console.log('gatau')
      break;
  }
}

module.exports = {
  handlePostback,
}
