const flamelinkApp = require('../config/flamelink');
const riwayatPenukaranFlex = require('../flex/riwayatPenukaranFlex');
const Users = require('../utils/Users');

async function riwayatPenukaran(Context, userId) {
  // const dataRiwayat = await flamelinkApp.content.get({
  //   schemaKey: 'scanSampah',
  //   filters: [['userId', '==', userId]]
  // })
  const idUser = await Users.getUserId(userId)
  const dataRiwayat = await flamelinkApp.content.getByField({
    schemaKey: 'penukaran',
    field: 'userId',
    value: idUser,
    limitToLast: 15,
    // limitToFirst: 1,
    // filters: [['tanggal', '>', 160500433660]]
    //tanggal sama id sama isinya, jadi bisa di filter by id
  })
  // console.log(dataRiwayat);
  const flex = riwayatPenukaranFlex(dataRiwayat)
  await Context.reply([
    {
      type: "flex",
      altText: "Riwayat Penukaran",
      contents: flex,
    }
  ])

}

module.exports = riwayatPenukaran