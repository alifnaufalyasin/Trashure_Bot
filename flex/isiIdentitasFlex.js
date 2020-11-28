function isiIdentitas(Nama) {
  flex = {
    "type": "bubble",
    "direction": "ltr",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "Isi Identitas Diri",
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
          "text": `Hai ${Nama}, kamu pengguna baru nih, silahkan isi identitas kamu dulu yaa`,
          "align": "center",
          "margin": "md",
          "wrap": true,
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "Isi Identitas Diri",
            "uri": "https://liff.line.me/1655250356-8OMObjyN"
          },
          "color": "#8BC34A",
          "style": "primary",
          "offsetTop": "sm"
        }
      ]
    }
  }
  return flex
}

module.exports = isiIdentitas