const kasihTitik = require("../utils/kasihTitik")

function nominalFlex(duit,type) {
  const arrHarga = [5000,10000,20000,50000,100000,150000,200000]
  const tipe = {
    pulsa: "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FPulsa.png?alt=media&token=899c71a1-5c6b-4938-8297-77362b82a658",
    dana: "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FDana.png?alt=media&token=7d468798-21ea-4e19-a344-2136c66567d1",
    ovo: "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FOvo.png?alt=media&token=386cf4db-e7ff-4ad3-b969-ceae2b58f7db",
    gopay: "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FGopay.png?alt=media&token=40d7c3ac-f969-460e-b64b-93aff6df67e5",
    shopeepay: "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FShopeePay.png?alt=media&token=1350a81f-53b2-46c5-beb6-3f6d1ef79d31"
  }
  const pil5000 = {
    "type": "box",
    "layout": "vertical",
    "margin": "none",
    "action": {
      "type": "postback",
      "label": "5000",
      "data": "nominal=5000"
    },
    "contents": [
      {
        "type": "text",
        "text": "5.000",
        "contents": []
      },
      {
        "type": "text",
        "text": "Rp 6.000",
        "weight": "bold",
        "size": "lg",
        "contents": []
      },
      {
        "type": "separator",
        "margin": "sm"
      }
    ]
  }

  let content = [{
    "type": "text",
    "text": "Penukaran",
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
  },
  {
    "type": "image",
    "url": tipe[type],
    "margin": "none",
    "align": "center",
    "gravity": "center",
    "size": "xs"
  }]

  let i = 0
  while (duit >= arrHarga[i]+1000 && i < arrHarga.length) {
    if (i == 0) {
      content.push(pil5000)
    }else {
      let atas = String(arrHarga[i])
      let bawah = String(arrHarga[i] + 1000)
      atas = kasihTitik(atas)
      bawah = kasihTitik(bawah)
      let pilLain = {
        "type": "box",
        "layout": "vertical",
        "margin": "sm",
        "action": {
          "type": "postback",
          "label": String(arrHarga[i]),
          "data": "nominal="+ String(arrHarga[i])
        },
        "contents": [
          {
            "type": "text",
            "text": atas,
            "contents": []
          },
          {
            "type": "text",
            "text": "Rp " + bawah,
            "weight": "bold",
            "size": "lg",
            "contents": []
          },
          {
            "type": "separator",
            "margin": "sm"
          }
        ]
      }
      content.push(pilLain)
    }
    i++
  }
  

  flex = {
    "type": "bubble",
    "direction": "ltr",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": content
    }
  }
  // console.log(JSON.stringify(flex));
  return flex
}

module.exports = nominalFlex