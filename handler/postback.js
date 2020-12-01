//module
// const redis = require("redis");
// const client = redis.createClient();

//flex
const walletFlex = require('../flex/walletFlex');
const penukaran = require('../module/addPenukaran');
const konfirmasi = require('../module/konfirmasi');

const flamelinkApp = require('../config/flamelink');
const moduleNominal = require("../module/nominal");
const { getLastTrashbag } = require('../utils/Trashbag');
const { getUserId } = require('../utils/Users');

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
      await Context.setState({
        nominal: Number(text[1])
      })
      const tipe = Context.state.tipe//
      if(!tipe || tipe == ''){
        const flex = walletFlex
        await Context.reply([
          {
            type: "flex",
            altText: "Pilih Pembayaran",
            contents: flex
          }
        ])
      }else{
        await konfirmasi(Context, userId)
      }
      break
    case 'konfirmasi':
      console.log(Date.now());
      const waktu = Date.now() - Context.state.tukar
      if(Context.state.tukar && waktu > (1000*60*5)){
        await penukaran(Context, userId)
        Context.setState({
          tipe: '',
          tukar: Date.now()
        })
      }else if (!Context.state.tukar){
        await penukaran(Context, userId)
        Context.setState({
          tipe: '',
          tukar: Date.now()
        })
      }else{
        const menit = Math.floor((waktu) / 60000)
        let detik = Math.floor((waktu) / 1000)
        detik = detik % 60
        Context.reply([
          {
            type: "text",
            text: "Anda telah melakukan penarikan "+menit+" menit " + detik + " detik yang lalu",
          },
        ])
      }
      
      break
    case "putusTrashbag":
      await flamelinkApp.content.update({
        schemaKey: 'trashbag',
        entryId: text[1],
        data: {
          // nama: nama,
          status: "Proses-Putus"
        }
      })
      Context.reply([
        {
          type: "text",
          text: "Memutus sambungan dengan trashbag berhasil",
        },
      ])
      break
    default:
      console.log('gatau')
      break;
  }
}

module.exports = {
  handlePostback,
}
