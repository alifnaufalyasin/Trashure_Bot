const kasihTitik = require("../utils/kasihTitik");

function konfirmasiFlex(nomor, nominal, type) {
  const harga = kasihTitik(String(nominal))
  const tipe = {
    pulsa: "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FPulsa.png?alt=media&token=899c71a1-5c6b-4938-8297-77362b82a658",
    dana: "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FDana.png?alt=media&token=7d468798-21ea-4e19-a344-2136c66567d1",
    ovo: "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FOvo.png?alt=media&token=386cf4db-e7ff-4ad3-b969-ceae2b58f7db",
    gopay: "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FGopay.png?alt=media&token=40d7c3ac-f969-460e-b64b-93aff6df67e5",
    shopeepay: "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FShopeePay.png?alt=media&token=1350a81f-53b2-46c5-beb6-3f6d1ef79d31"
  }

  flex = {
    "type": "bubble",
    "direction": "ltr",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "Konfirmasi Penukaran",
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
          "type": "text",
          "text": "Apakah data dibawah ini sudah benar?",
          "size": "sm",
          "align": "center",
          "margin": "md",
          "wrap": true,
          "contents": []
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "Metode",
              "flex": 4,
              "align": "start",
              "gravity": "center",
              "contents": []
            },
            {
              "type": "image",
              "url": tipe[type],
              "flex": 7,
              "align": "start",
              "gravity": "center",
              "size": "xxs"
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "margin": "none",
          "contents": [
            {
              "type": "text",
              "text": "Nomor",
              "flex": 4,
              "align": "start",
              "gravity": "center",
              "contents": []
            },
            {
              "type": "text",
              "text": nomor,
              "flex": 7,
              "contents": []
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "margin": "none",
          "contents": [
            {
              "type": "text",
              "text": "Nominal",
              "flex": 4,
              "align": "start",
              "gravity": "center",
              "contents": []
            },
            {
              "type": "text",
              "text": "Rp "+ harga,
              "flex": 7,
              "contents": []
            }
          ]
        },
        {
          "type": "text",
          "text": "*abaikan jika tidak jadi melakukan penukaran",
          "size": "xxs",
          "align": "start",
          "margin": "md",
          "wrap": true,
          "contents": []
        },
        {
          "type": "box",
          "layout": "horizontal",
          "spacing": "sm",
          "margin": "lg",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "Ganti Nomor",
                "uri": "https://liff.line.me/1655250356-8OMObjyN"
              },
              "style": "secondary"
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "Ya",
                "data": "konfirmasi"
              },
              "color": "#8BC34A",
              "style": "primary"
            }
          ]
        }
      ]
    }
  }

  return flex
}

module.exports = konfirmasiFlex