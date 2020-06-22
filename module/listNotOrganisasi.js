const axios = require('axios');
const setFlexOrg = require('../flex/flexNotOrganisasi')


function listNotOrganisasi(Context, userId) {
  data = {userId}
  axios({
    url: "https://rpl-inventory.herokuapp.com/api/lineBot",
    method: "GET",
    data: data,
  })
  .then(async (response) => {
    if(response.data.success){

      axios({
        url: "https://rpl-inventory.herokuapp.com/api/organisasi/not",
        method: "POST",
        headers: {
          'Authorization': `Bearer ${response.data.data.token}`
        },
      })
      .then(async (response2) => {
        if(response.data.success){
          const flexNotOrganisasi = await setFlexOrg(response.data.data.organisasi)
          Context.reply([
            {
              type: "text",
              text: "Pilih organisasi yang anda ingin join"
            },
            {
              type: "flex",
              altText: "List Organisasi",
              contents: flexNotOrganisasi
            }
          ])
        }else{
          Context.reply([
            {
              type: "text",
              text: response.data.message
            }
          ])
        }
      })
      .catch((err) => {
        Context.reply([
          {
            type: "text",
            text: JSON.toString(err)
          }
        ])
      })
    }else{
      console.log(response.data.message)
      Context.reply([
        {
          type: "text",
          text: response.data.message
        }
      ])
    }
  })
  .catch((err) => {
    console.log(err)
    Context.reply([
      {
        type: "text",
        text: JSON.toString(err)
      }
    ])
  })
}

module.exports = listNotOrganisasi