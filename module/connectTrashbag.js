async function connectTrashbag(Context, UserId, message) {
  const id = message.split(" ")[1]
  flamelinkApp.content.add({
    schemaKey: 'scanSampah',
    data: {
      userId: "Ua2faf57f45fddebd81410b69c29f342c",
      trashbagId: "2654B398PO",
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
    ])
    console.log(hasil);
  })
  .catch(error => {
    console.log(error);
  })
}

module.exports = connectTrashbag