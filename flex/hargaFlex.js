const flamelinkApp = require('../config/flamelink')

async function flexHarga() {
  let isi = [
    {
      "type": "text",
      "text": "Harga Sampah",
      "weight": "bold",
      "size": "xl",
      "color": "#8BC34A",
      "align": "center",
      "contents": []
    },
    {
      "type": "separator",
      "margin": "md",
      "color": "#8BC34A"
    }
  ]

  const separate = {
    "type": "separator",
    "margin": "none"
  }

  const sampah = await flamelinkApp.content.get({
    schemaKey: 'detailSampah',
    // orderByValue: true,
    orderByChild: 'namaSampah',
    // orderBy: {field: 'namaSampah'},
    populate: [
      {
        field: 'gambar',
        size: {
          width: 300,
          height: 9999,
          quality: 1
        }
      }
      ]
  })
  // console.log(sampah);
  for (const id in sampah) {
    let bagian = {
      "type": "box",
      "layout": "horizontal",
      "spacing": "none",
      "margin": "lg",
      "contents": [
        {
          "type": "image",
          "url": sampah[id].gambar[0].url,
          "margin": "none",
          "align": "start",
          "gravity": "center",
          "size": "lg",
          "backgroundColor": "#FFFFFF00"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": sampah[id].namaSampah,
              "size": "md",
              "flex": 5,
              "align": "center",
              "gravity": "bottom",
              "contents": []
            },
            {
              "type": "text",
              "text": `Rp. ${sampah[id].harga}/Kg`,
              "flex": 5,
              "align": "center",
              "gravity": "top",
              "contents": []
            }
          ]
        }
      ]
    }

    isi.push(bagian)
    isi.push(separate)
  }
  
  isi.pop()

  const flex = {
    "type": "bubble",
    "direction": "ltr",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": isi
    }
  }
  return flex
}

module.exports = flexHarga