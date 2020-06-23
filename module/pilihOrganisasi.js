const axios = require('axios');
const setFlexBarang = require('../flex/flexBarang')

function pilihOrganisasi(id_organisasi, userId, Context, status) {
  let data = {}
  data.userId = userId
  data.id_organisasi = id_organisasi
  axios({
    url: "https://rpl-inventory.herokuapp.com/api/lineBot/set",
    method: "POST",
    data: data,
  })
  .then(async (response) => {
    if(response.data.success && status == 'admin'){
      axios({
        url: "https://rpl-inventory.herokuapp.com/api/organisasi/"+response.data.data.id_organisasi,
        method: "GET",
        headers: {
          'Authorization': `Bearer ${response.data.data.token}`
        },
      })
      .then(async (response2) => {
        if(response2.data.success){
          const flexBarang = await setFlexBarang(response2.data.data.items)
          Context.reply([
            {
              type: "text",
              text: "Berikut adalah barang yang ada pada "+response2.data.data.nama
            },
            {
              type: "flex",
              altText: "List Barang",
              contents: flexBarang
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
        console.log(err2);
        Context.reply([
          {
            type: "text",
            text: err2.data.message
          }
        ])
      })
    }else if (response.data.success){
      Context.reply([
        {
          type: "text",
          text: `Masukkan password organisasi dengan ketik "Organisasi <password>"`
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

module.exports = pilihOrganisasi