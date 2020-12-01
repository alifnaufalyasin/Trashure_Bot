const flamelinkApp = require('../config/flamelink');
const konfirmasiFlex = require('../flex/konfirmasiFlex');
const Users = require("../utils/Users")

async function konfirmasi(Context, userId) {
  const {User, idUser} = await Users.getUser(userId)
  const dataUser = Context.state
  const flex = konfirmasiFlex(User[idUser].nomorTelpon, dataUser.nominal, dataUser.tipe)
  await Context.reply([
    {
      type: "flex",
      altText: "Konfirmasi Penukaran",
      contents: flex
    }
  ])
}

module.exports = konfirmasi