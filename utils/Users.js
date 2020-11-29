const flamelinkApp = require('../config/flamelink')

async function getUserId(userId) {
  const User = await flamelinkApp.content.getByField({
    schemaKey: 'user',
    field: 'userId',
    value: userId
  })
  const idUser = Object.keys(User)[0]
  return idUser
}

async function getUser(userId) {
  const User = await flamelinkApp.content.getByField({
    schemaKey: 'user',
    field: 'userId',
    value: userId
  })
  const idUser = Object.keys(User)[0]
  return {User, idUser}
}

module.exports = {
  getUserId,
  getUser
}