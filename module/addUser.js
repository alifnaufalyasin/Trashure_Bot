const flamelinkApp = require('../config/flamelink')

async function addUser(userId, nama, imageURL) {
  const User = await flamelinkApp.content.getByField({
    schemaKey: 'user',
    field: 'userId',
    value: userId
  })

  if (!User){
    const user = await flamelinkApp.content.add({
      schemaKey: 'user',
      data: {
        userId: userId,
        nama: nama,
        fotoProfile: imageURL
      }
    })
    return user.id
  }else{
    const id = Object.keys(User)[0]
    flamelinkApp.content.update({
      schemaKey: 'user',
      entryId: id,
      data: {
        nama: nama,
        fotoProfile: imageURL
      }
    })
    return id
  }
}

module.exports = addUser