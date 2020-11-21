const flamelinkApp = require('../config/flamelink')
const flexTrashbag = require('../flex/adaTrashbag')
const scanKosong = require('../flex/scanKosong')

async function ScanQR(Context, userId) {
  const dataRiwayat = await flamelinkApp.content.getByField({
    schemaKey: 'scanSampah',
    field: 'userId',
    value: userId,
    limitToLast: 1
  })
  const key = Object.keys(dataRiwayat)
  if (dataRiwayat[key[0]].status == "Proses") {
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
}

module.exports = ScanQR