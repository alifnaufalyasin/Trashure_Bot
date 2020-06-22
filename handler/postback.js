const pilihOrganisasi = require("../module/pilihOrganisasi");
const listNotOrganisasi = require("../module/listNotOrganisasiasi")

async function handlePostback(Context) {
  let profileUser = await Context.getUserProfile()
  let userId = profileUser.userId;

  console.log(Context.event.postback)
  const data = Context.event.postback.data.split('=')
  switch (data[0]) {
    case 'organisasi':
      const id_organisasi = data[1]
      await pilihOrganisasi(id_organisasi, userId, Context)
      break;
    case 'listOrganisasi':
      await listNotOrganisasi(Context, userId)
      break;
    default:
      console.log('gatau')
      break;
  }
}

module.exports = {
  handlePostback,
}
