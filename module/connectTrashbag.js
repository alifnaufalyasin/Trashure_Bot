const flamelinkApp = require('../config/flamelink')

async function connectTrashbag(Context, UserId, message) {
  const id = message.split(" ")[1]
  console.log("id",id);
  flamelinkApp.content.add({
    schemaKey: 'scanSampah',
    data: {
      userId: "Ua2faf57f45fddebd81410b69c29f342c",
      trashbagId: id,
      tanggal: Date.now(),
      status: "Proses"
    }
  })
  .then(hasil => {
    Context.reply([
      {
        type: "text",
        text: `Trashbag berhasil tersambung`,
      },
      {
        type: "text",
        text: JSON.stringify(hasil),
      },
    ])
    console.log("Hasil ",hasil);
  })
  .catch(error => {
    console.log(error);
  })
}

module.exports = connectTrashbag