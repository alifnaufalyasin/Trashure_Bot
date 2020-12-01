const flamelinkApp = require('../config/flamelink')

async function getLastTrashbag(idUser) {
  const Trashbag = await flamelinkApp.content.getByField({
    schemaKey: 'trashbag',
    field: 'userId',
    value: idUser,
    limitToLast: 1
  })

  const id = Object.keys(Trashbag)[0]
  return {Trashbag, id}
}

module.exports = {
  getLastTrashbag
}