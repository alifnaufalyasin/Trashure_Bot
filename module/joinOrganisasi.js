const axios = require('axios');
const setFlexBarang = require('../flex/flexBarang')

function joinOrganisasi(arrText, Context, userId) {
  const data = {userId}
  axios({
    url: "https://rpl-inventory.herokuapp.com/api/lineBot",
    method: "GET",
    data: data,
  })
  .then(async (response) => {
    console.log('token get')
    console.log(response.data)
    if(response.data.success){
      let data2 = {}
      data2.id_organisasi = response.data.data.id_organisasi
      data2.password = arrText[1]
      axios({
        url: "https://rpl-inventory.herokuapp.com/api/organisasi",
        method: "POST",
        headers: {
          'Authorization': `Bearer ${response.data.data.token}`
        },
        data: data2,
      })
      .then(async (response2) => {
        console.log('set organisasi')
        if(response2.data.success){
          axios({
            url: "https://rpl-inventory.herokuapp.com/api/organisasi/"+response.data.data.id_organisasi,
            method: "GET",
            headers: {
              'Authorization': `Bearer ${response.data.data.token}`
            },
          })
          .then(async (response3) => {
            console.log('get barang')
            if(response3.data.success){
              const flexBarang = await setFlexBarang(response3.data.data.items)
              Context.reply([
                {
                  type: "text",
                  text: "Berhasil bergabung dengan "+response3.data.data.nama
                },
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
          .catch((err3) => {
            console.log(err3)
            Context.reply([
              {
                type: "text",
                text: err3.data.message
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
      .catch((err2) => {
        console.log(err2)
        Context.reply([
          {
            type: "text",
            text: err2.data.message
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
    console.log(err)
    Context.reply([
      {
        type: "text",
        text: err.data.message
      }
    ])
  })
}

module.exports = joinOrganisasi



