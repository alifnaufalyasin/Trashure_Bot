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
  Context.reply([
    {
      type: "text",
      text: err2.data.message
    }
  ])
})