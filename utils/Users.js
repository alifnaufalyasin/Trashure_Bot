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

async function updateUser(userId, idUser='') {
  let id = ''
  if (userId){
    id = await getUserId(userId)
  }else{
    id = idUser
  }
  const Trashbag = await flamelinkApp.content.getByField({
    schemaKey: 'trashbag',
    field: 'userId',
    value: id
  })

  const Penukaran = await flamelinkApp.content.getByField({
    schemaKey: 'penukaran',
    field: 'userId',
    value: id
  })

  let berat = parseFloat('0.0')
  let harga = 0
  let tukar = 0
  for (const key in Trashbag) {
    harga += Trashbag[key].harga
    berat += parseFloat(Trashbag[key].berat)
  }

  for (const key in Penukaran) {
    tukar += Penukaran[key].nominal + 1000
  }

  await flamelinkApp.content.update({
    schemaKey: 'user',
    entryId: id,
    data: {
      saldo: harga,
      beratTotal: berat,
      tukar: tukar
    }
  })
}

async function updateDataUser() {
  console.log("Update Data User");
  const User = await flamelinkApp.content.get({
    schemaKey: 'user',
  })
  
  const key = Object.keys(User)
  for (let i = 0; i < key.length; i++) {
    await updateUser(null,key[i])
  }
}

module.exports = {
  getUserId,
  getUser,
  updateUser,
  updateDataUser
}