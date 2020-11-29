const flamelinkApp = require('../config/flamelink');
const Users = require('../utils/Users');


async function connectTrashbag(Context, userId, message) {
  const id = message.split(" ")[1]
  console.log("id",id);
  const idUser = await Users.getUserId(userId)
  flamelinkApp.content.add({
    schemaKey: 'trashbag',
    data: {
      trashbagId: id,
      tanggal: Date.now(),
      status: "Proses",
      userId: idUser
    }
  })
  .then(hasil => {
    Context.reply([
      {
        type: "text",
        text: `Trashbag berhasil tersambung`,
      }
    ])
    console.log("Hasil ",hasil);
  })
  .catch(error => {
    console.log(error);
  })
}

module.exports = connectTrashbag