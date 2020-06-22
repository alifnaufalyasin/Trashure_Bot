const axios = require('axios');
const setFlexBarang = require('../flex/flexBarang')

function joinOrganisasi(id_organisasi, password, Context, status) {
  let data = {}
  data.password = password
  data.id_organisasi = id_organisasi
  axios({
    url: "https://rpl-inventory.herokuapp.com/api/organisasi",
    method: "POST",
    data: data,
  })
  .then(async (response) => {
    if(response.data.success){
      const data2 = {userId}
      axios({
        url: "https://rpl-inventory.herokuapp.com/api/lineBot",
        method: "GET",
        data: data2,
      })
      .then(async (response2) => {
        if(response2.data.success){
          axios({
            url: "https://rpl-inventory.herokuapp.com/api/organisasi/"+response2.data.data.id_organisasi,
            method: "GET",
            headers: {
              'Authorization': `Bearer ${response2.data.data.token}`
            },
          })
          .then(async (response3) => {
            if(response3.data.success){
              const flexBarang = await setFlexBarang(response3.data.data.items)
              Context.reply([
                {
                  type: "text",
                  text: "Berikut adalah barang yang ada pada "+response3.data.data.nama
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
                  text: response3.data.message
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
          Context.reply([
            {
              type: "text",
              text: response2.data.message
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
}

module.exports = joinOrganisasi



