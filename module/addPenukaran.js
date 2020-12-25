const flamelinkApp = require('../config/flamelink');
const Users = require("../utils/Users")

async function penukaran(Context, userId) {
  const {User, idUser} = await Users.getUser(userId)
  const user = await flamelinkApp.content.add({
    schemaKey: 'penukaran',
    data: {
      userId: idUser,
      tanggal: Date.now(),
      nominal: Number(Context.state.nominal),
      nomor: User[idUser].nomorTelpon,
      tipe: Context.state.tipe
    }
  })
  Context.reply([
    {
      type: "text",
      text: "Penukaran Berhasil",
    },
  ])
}

module.exports = penukaran