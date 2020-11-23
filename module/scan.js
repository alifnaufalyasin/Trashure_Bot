const flamelinkApp = require('../config/flamelink')
const flexTrashbag = require('../flex/adaTrashbag')
const scanKosong = require('../flex/scanKosong')
const getUserId = require('../utils/getUserId')

async function ScanQR(Context, userId) {
  const idUser = await getUserId(userId)
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
      const flexAda = flexTrashbag(dataRiwayat[key[0]].trashbagId)
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