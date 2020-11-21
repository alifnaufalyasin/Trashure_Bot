const scanKosong = require('../flex/scanKosong')

async function ScanQR(Context, userId) {
  await Context.reply([
    {
      type: "flex",
      altText: "Scan QR",
      contents: scanKosong,
    }
  ])
}

module.exports = ScanQR