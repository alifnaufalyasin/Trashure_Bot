const axios = require('axios');

function pilihOrganisasi(id_organisasi, userId) {
  let data = {}
  data.userId = userId
  data.id_organisasi = id_organisasi
  axios({
    url: "https://5ab20e50db87.ngrok.io/api/lineBot/set",
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