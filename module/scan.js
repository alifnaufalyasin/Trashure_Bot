const flamelinkApp = require('../config/flamelink')
const scanKosong = require('../flex/scanKosong')

async function ScanQR(Context, userId) {
  const dataRiwayat = await flamelinkApp.content.getByField({
    schemaKey: 'scanSampah',
    field: 'userId',
    value: userId,
    limitToLast: 1
  })
  const key = Object.key(dataRiwayat)
  if (dataRiwayat[key[0]].status == "Proses") {
    await Context.reply([
      {
        type: "flex",
        altText: "Scan QR",
        contents: scanKosong,
      },
      await Context.reply([
        {
          type: "text",
          text: `Masih ada`,
        }
      ])
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