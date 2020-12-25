const kasihTitik = require("../utils/kasihTitik");

function akunFlex(User) {
  const id = Object.keys(User)[0]
  const date = new Date(User[id].tanggalLahir)
  let dd = date.getDate()
  dd = String(dd).padStart(2, '0');
  let mm = date.getMonth()
  // mm = String(dd).padStart(2, '0');
  let yyyy = date.getFullYear()
  const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  let nominal = String(User[id].saldo - User[id].tukar)
  nominal = kasihTitik(nominal)
  flex = {
    "type": "bubble",
    "direction": "ltr",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "Akun",
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
          "url": User[id].fotoProfile,
          "margin": "lg",
          "gravity": "center",
          "size": "lg"
        },
        {
          "type": "text",
          "text": User[id].nama,
          "weight": "bold",
          "size": "lg",
          "align": "center",
          "gravity": "center",
          "margin": "md",
          "contents": []
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "none",
          "contents": [
            {
              "type": "image",
              "url": "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2Fcrown.png?alt=media&token=15624dba-7b12-42c5-9929-cf7149e3ee7a",
              "size": "xxs"
            },
            {
              "type": "text",
              "text": "Level",
              "align": "center",
              "contents": []
            },
            {
              "type": "text",
              "text": User[id].level,
              "align": "center",
              "contents": []
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "margin": "xs",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "image",
                  "url": "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2Fcard.png?alt=media&token=d5c9f5fe-6797-404b-a2d6-8cd9fde107f5",
                  "size": "xxs"
                },
                {
                  "type": "text",
                  "text": "Saldo",
                  "align": "center",
                  "contents": []
                },
                {
                  "type": "text",
                  "text": "Rp " + nominal,
                  "align": "center",
                  "contents": []
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "image",
                  "url": "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2Ftrash.png?alt=media&token=2efb2efe-ddbf-427d-898a-dfc7308b31be",
                  "size": "xxs"
                },
                {
                  "type": "text",
                  "text": "Total",
                  "align": "center",
                  "contents": []
                },
                {
                  "type": "text",
                  "text": String(User[id].beratTotal) + " Kg",
                  "align": "center",
                  "contents": []
                }
              ]
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "md",
          "contents": [
            {
              "type": "text",
              "text": "Nomor HP",
              "size": "sm",
              "color": "#0000007C",
              "contents": []
            },
            {
              "type": "text",
              "text": User[id].nomorTelpon,
              "size": "md",
              "contents": []
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "md",
          "contents": [
            {
              "type": "text",
              "text": "Email",
              "size": "sm",
              "color": "#0000007C",
              "contents": []
            },
            {
              "type": "text",
              "text": User[id].email,
              "size": "md",
              "contents": []
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "md",
          "contents": [
            {
              "type": "text",
              "text": "Tanggal Lahir",
              "size": "sm",
              "color": "#0000007C",
              "contents": []
            },
            {
              "type": "text",
              "text": `${dd} - ${month[mm]} - ${yyyy}`,
              "size": "md",
              "contents": []
            }
          ]
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "Edit Akun",
            "uri": "https://liff.line.me/1655250356-8OMObjyN"
          },
          "color": "#8BC34A",
          "margin": "xl",
          "height": "md",
          "style": "primary",
          "gravity": "center",
          "offsetTop": "md"
        }
      ]
    }
  }
  return flex
}

module.exports = akunFlex