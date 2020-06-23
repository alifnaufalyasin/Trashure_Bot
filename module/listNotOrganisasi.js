const axios = require('axios');
const setFlexOrg = require('../flex/flexNotOrganisasi')


function listNotOrganisasi(Context, userId) {
  // data = {userId}
  axios({
    url: "https://rpl-inventory.herokuapp.com/api/lineBot?userId="+userId,
    method: "GET",
    // data: data,
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
        if(response2.data.success){
          const flexNotOrganisasi = await setFlexOrg(response2.data.data)
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
              text: response2.data.message
            }
          ])
        }
      })
      .catch((err2) => {
        console.log(err2)
        Context.reply([
          {
            type: "text",
            text: err2.response.data.message
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
        text: err.response.data.message
      }
    ])
  })
}

module.exports = listNotOrganisasi