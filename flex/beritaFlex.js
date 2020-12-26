const flamelinkApp = require('../config/flamelink');


async function beritaFlex() {
  const berita = await flamelinkApp.content.get({
    schemaKey: 'berita',
    populate: [{
      field: 'gambar',
        size: {
          width: 300,
          height: 9999,
          quality: 1
        }
    }],
    limitToLast: 5,

  })
  const key = Object.keys(berita)
  const bubble = []
  for (let i = key.length-1; i >= 0; i--) {
    console.log(berita[key[i]].judul);
    const judul = encodeURI(berita[key[i]].judul)
    isi = {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "horizontal",
        "spacing": "md",
        "action": {
          "type": "uri",
          "uri": "https://5d0243351a87.ngrok.io/berita/?judul="+judul
        },
        "width": "300px",
        "height": "230px",
        "backgroundColor": "#8BC34A",
        "contents": [
          {
            "type": "image",
            "url": berita[key[i]].gambar[0].url,
            "gravity": "center",
            "size": "full",
            "aspectRatio": "230:300",
            "position": "absolute",
            "offsetTop": "0px",
            "offsetBottom": "0px",
            "offsetStart": "0px",
            "offsetEnd": "0px"
          },
          {
            "type": "text",
            "text": berita[key[i]].judul,
            "weight": "bold",
            "size": "xl",
            "color": "#FFFFFFFF",
            "align": "start",
            "gravity": "bottom",
            "margin": "none",
            "wrap": true,
            "contents": []
          }
        ]
      }
    }
    bubble.push(isi)
  }

  const carousel = {
    "type": "carousel",
    "contents": bubble
  }

  // console.log(JSON.stringify(carousel));
  return carousel
}

module.exports = beritaFlex