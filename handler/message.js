//flex
const flexHarga = require("../flex/hargaFlex");

//module
const Riwayat = require("../module/riwayat");
const ScanQR = require("../module/scan")
const connectTrashbag = require("../module/connectTrashbag");
const addUser = require("../module/addUser");
const akun = require("../module/akun");


async function handleMessage(Context) {
  const message = Context.event.message
  let profileUser = await Context.getUserProfile()
  let userId = profileUser.userId
  addUser(userId, profileUser.displayName, profileUser.pictureUrl)

  if (message.type !== "text") {
    Context.reply([
      {
        type: "text",
        text: "apa tuh",
      },
    ])
  } else {
    switch (message.text.toLowerCase()) {
      case "harga":
        const awal = Date.now()
        const HargaFlex = await flexHarga()
        await Context.reply([
          {
            type: "flex",
            altText: "Harga Sampah",
            contents: HargaFlex,
          }
        ])
        const akhir = Date.now()
        console.log(awal)
        console.log(akhir)
        console.log(akhir-awal)
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
