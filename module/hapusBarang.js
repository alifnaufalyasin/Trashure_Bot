const axios = require('axios');

async function hapusBarang(id_barang, userId, Context) {
  axios({
    url: "https://rpl-inventory.herokuapp.com/api/lineBot?userId="+userId,
    method: "GET",
  })
  .then(async (response) => {
    axios({
      url: "https://rpl-inventory.herokuapp.com/api/deleteBarang/"+id_barang,
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${response.data.data.token}`
      },
    })
    .then(async (response2) => {
      if(response2.data.success){
        Context.reply([
          {
            type: "text",
            text: response2.data.message
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
    ///
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

module.exports = hapusBarang