//module


async function handlePostback(Context) {
  let profileUser = await Context.getUserProfile()
  let userId = profileUser.userId;

  console.log(Context.event.postback)
  const data = Context.event.postback.data.split('=')
  let id_organisasi
  switch (data[0]) {
    case 'tambahTrashbag':
      break;
    default:
      console.log('gatau')
      break;
  }
}

module.exports = {
  handlePostback,
}
