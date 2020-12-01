const flamelinkApp = require('../config/flamelink')
const flexTrashbag = require('../flex/adaTrashbag')
const scanKosong = require('../flex/scanKosong')
const Users = require('../utils/Users')

async function ScanQR(Context, userId) {
  const idUser = await Users.getUserId(userId)
  const dataRiwayat = await flamelinkApp.content.getByField({
    schemaKey: 'trashbag',
    field: 'userId',
    value: idUser,
    limitToLast: 1
  })
  let key
  if (dataRiwayat) {
    key = Object.keys(dataRiwayat)
    if (dataRiwayat[key[0]].status == "Proses" && dataRiwayat) {
      const flexAda = flexTrashbag(dataRiwayat[key[0]].trashbagId,key[0])
      await Context.reply([
        {
          type: "flex",
          altText: "Trashbag Masih Tersambung",
          contents: flexAda,
        }
      ])
    } else {
      await Context.reply([
        {
          type: "flex",
          altText: "Scan QR",
          contents: scanKosong,
        }
      ])
    }
  }else{
    await Context.reply([
      {
        type: "flex",
        altText: "Scan QR",
        contents: scanKosong,
      }
    ])
  }
  
}

module.exports = ScanQR