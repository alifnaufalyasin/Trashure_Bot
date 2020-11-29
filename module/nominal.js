const flamelinkApp = require('../config/flamelink');
const nominalFlex = require('../flex/nominalFlex');
const Users = require('../utils/Users');

async function moduleNominal(Context, userId) {
  const {User, idUser} = await Users.getUser(userId)
  // console.log(User);
  // console.log(idUser);
  const duit = User[idUser].saldo - User[idUser].tukar
  const tipe = Context.state.tipe
  const flex = await nominalFlex(duit,tipe)
  await Context.reply([
    {
      type: "flex",
      altText: "Pilih Nominal",
      contents: flex
    }
  ])
}

module.exports = moduleNominal