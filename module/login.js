const axios = require('axios');
const setFlexOrg = require('../flex/flexOrganisasi')

async function login(arrText, Context, userId) {
  let data = {}
  data.email = arrText[1]
  data.password = arrText[2]
  
  axios({
    url: "https://rpl-inventory.herokuapp.com/api/admin/login",
    method: "POST",
    data: data,
  })
  .then(async (response) => {
    // console.log(response)
    if(response.data.success){
      let token = {}
      token.userId = userId
      token.id_admin = response.data.data.id_admin
      token.token = response.data.data.token
      axios({
        url: "https://rpl-inventory.herokuapp.com/api/lineBot/set",
        method: "POST",
        data: token,
      })
      const flexOrganisasi = await setFlexOrg(response.data.data.organisasi)
      console.log(flexOrganisasi);
      Context.reply([
        {
          type: "text",
          text: "Login berhasil"
        },
        {
          type: "flex",
          altText: "List Organisasi",
          contents: flexOrganisasi
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
        text: err.data.message
      }
    ])
  })
}

module.exports = login