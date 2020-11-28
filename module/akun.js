const flamelinkApp = require('../config/flamelink')
const akunFlex = require('../flex/akunFlex')
const isiIdentitas = require('../flex/isiIdentitasFlex')

async function akun(Context, userId, Nama) {
  const User = await flamelinkApp.content.getByField({
    schemaKey: 'user',
    field: 'userId',
    value: userId
  })

  if (!User){
    const flex = isiIdentitas(Nama)
    await Context.reply([
      {
        type: "flex",
        altText: "Isi Identitas Diri",
        contents: flex,
      }
    ])
  }else{
    const id = Object.keys(User)[0]
    if(User[id].email == ""){
      const flex = isiIdentitas(Nama)
      await Context.reply([
        {
          type: "flex",
          altText: "Isi Identitas Diri",
          contents: flex,
        }
      ])
    }else{
      // console.log("ada akun");
      const flex = await akunFlex(User)
      await Context.reply([
        {
          type: "flex",
          altText: "Akun",
          contents: flex,
        }
      ])
    }
  }
}

module.exports = akun