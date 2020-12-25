//flex
const flexHarga = require("../flex/hargaFlex");
const penukaranFlex = require('../flex/pilihPenukaran')

//module


const Riwayat = require("../module/riwayat");
const ScanQR = require("../module/scan")
const connectTrashbag = require("../module/connectTrashbag");
const addUser = require("../module/addUser");
const akun = require("../module/akun");
const home = require("../module/home");


async function handleMessage(Context) {
  const message = Context.event.message
  let profileUser = await Context.getUserProfile()
  let userId = profileUser.userId
  addUser(userId, profileUser.displayName, profileUser.pictureUrl)
  if (Context.event.follow || Context.event.unfollow){

  } else if (message.type !== "text") {
    Context.reply([
      {
        type: "text",
        text: "apa tuh",
      },
    ])
  } else {
    switch (message.text.toLowerCase()) {
      case "harga":
        const HargaFlex = await flexHarga()
        await Context.reply([
          {
            type: "flex",
            altText: "Harga Sampah",
            contents: HargaFlex,
          }
        ])
        break
      case "riwayat":
        await Riwayat(Context, userId)
        break
      case "scan":
        await ScanQR(Context, userId)
        break
      case "akun":
        await akun(Context, userId, profileUser.displayName)
        break
      case "penukaran":
        const flex = penukaranFlex
        await Context.reply([
          {
            type: "flex",
            altText: "Pilih Penukaran",
            contents: flex,
          }
        ])
        break
      case "beranda":
        await home(Context, userId)
        break
      default :
        if (message.text.toLowerCase().match(/trashid:/g)){
          await connectTrashbag(Context, userId, message.text)
        }else if (message.text.toLowerCase().match(/identitas tersimpan/g)){

        }else{
          Context.reply([
            {
              type: "text",
              text: `Haiiiii`,
            },
          ])
        }
        break
    }
  }
}

module.exports = {
  handleMessage,
}
