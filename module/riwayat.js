const flamelinkApp = require('../config/flamelink');
const riwayatFlex = require('../flex/riwayatFlex');

async function Riwayat(Context, userId) {
  // const dataRiwayat = await flamelinkApp.content.get({
  //   schemaKey: 'scanSampah',
  //   filters: [['userId', '==', userId]]
  // })
  const dataRiwayat = await flamelinkApp.content.getByField({
    schemaKey: 'scanSampah',
    field: 'userId',
    value: userId,
    limitToLast: 15,
    // limitToFirst: 1,
    // filters: [['tanggal', '>', 160500433660]]
    //tanggal sama id sama isinya, jadi bisa di filter by id
  })
  // console.log(dataRiwayat);
  const flex = riwayatFlex(dataRiwayat)
  await Context.reply([
    {
      type: "flex",
      altText: "Riwayat",
      contents: flex,
    }
  ])

}

module.exports = Riwayat