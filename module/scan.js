const scanKosong = require('../flex/scanKosong')

function ScanQR(Context, userId) {
  await Context.reply([
    {
      type: "flex",
      altText: "Scan QR",
      contents: scanKosong,
    }
  ])
}

module.exports = ScanQR