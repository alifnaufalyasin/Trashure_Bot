const axios = require('axios');

function pilihOrganisasi(id_organisasi, userId, Context) {
  let data = {}
  data.userId = userId
  data.id_organisasi = id_organisasi
  axios({
    url: "https://rpl-inventory.herokuapp.com/api/lineBot/set",
    method: "POST",
    data: data,
  })
  .then(async (response) => {
    Context.reply([
      {
        type: "text",
        text: response.data.message
      }
    ])
  })
  .catch((err) => {
    Context.reply([
      {
        type: "text",
        text: JSON.toString(err)
      }
    ])
  })
}

module.exports = pilihOrganisasi