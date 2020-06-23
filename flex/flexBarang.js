function addZero(number) {
  return String(number).padStart().padStart(2, "0");
}


function flexUtama(barang) {
  let bubble = []
  barang.map((item, index) => {
    const tgl_produksi = new Date(item.tgl_produksi)
    const tgl_masuk = new Date(item.tgl_masuk)
    const tgl_cek = new Date(item.tgl_cek)

    const bubbleItem = {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": item.barcode,
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": item.nama,
            "size": "xl",
            "weight": "bold"
          },
          {
            "type": "separator",
            "color": "#A7A7A7"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "margin": "sm",
            "contents": [
              {
                "type": "text",
                "text": "kode",
                "flex": 4,
                "wrap": true
              },
              {
                "type": "text",
                "text": item.kode_barcode,
                "flex": 6
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "Deskripsi",
                "flex": 4
              },
              {
                "type": "text",
                "text": item.deskripsi,
                "flex": 6,
                "wrap": true
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "Value",
                "flex": 4
              },
              {
                "type": "text",
                "text": item.value,
                "flex": 6
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "Tgl Produksi",
                "flex": 4
              },
              {
                "type": "text",
                "text": `${addZero(tgl_produksi.getDay())}-${addZero(tgl_produksi.getDate())}-${tgl_produksi.getFullYear()}`,
                "flex": 6
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "Tgl Masuk",
                "flex": 4
              },
              {
                "type": "text",
                "text": `${addZero(tgl_masuk.getDate())}-${addZero(tgl_masuk.getMonth())}-${tgl_masuk.getFullYear()}  ${addZero(tgl_masuk.getHours())}:${addZero(tgl_masuk.getMinutes())}`,
                "flex": 6
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "Tgl Cek",
                "flex": 4
              },
              {
                "type": "text",
                "text": `${addZero(tgl_cek.getDate())}-${addZero(tgl_cek.getMonth())}-${tgl_cek.getFullYear()}  ${addZero(tgl_cek.getHours())}:${addZero(tgl_cek.getMinutes())}`,
                "flex": 6
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "flex": 0,
        "spacing": "sm",
        "contents": [
          {
            "type": "separator",
            "margin": "sm",
            "color": "#A7A7A7"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "margin": "md",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "postback",
                  "label": "Update",
                  "data": "updatebarang="+item.id_barang
                },
                "color": "#DD9614",
                "height": "sm",
                "style": "primary"
              },
              {
                "type": "button",
                "action": {
                  "type": "postback",
                  "label": "Hapus",
                  "data": "hapus="+item.id_barang
                },
                "color": "#DD1414",
                "margin": "md",
                "height": "sm",
                "style": "primary"
              }
            ]
          },
          {
            "type": "spacer",
            "size": "sm"
          }
        ]
      }
    }

    bubble.push(bubbleItem)
  })

  const bubbleAkhir = {
    "type": "bubble",
    "direction": "ltr",
    "body": {
      "type": "box",
      "layout": "vertical",
      "spacing": "none",
      "margin": "none",
      "contents": [
        {
          "type": "text",
          "text": "Tambah Barang",
          "size": "xl",
          "align": "center",
          "weight": "bold",
          "color": "#DD9614"
        },
        {
          "type": "separator",
          "color": "#A7A7A7"
        },
        {
          "type": "text",
          "text": "Klik tombol dibawah ini untuk menambahkan barang",
          "margin": "md",
          "align": "center",
          "weight": "regular",
          "wrap": true
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "Tambah",
            "uri": "https://liff.line.me/1654371439-eAkgWOEp"
          },
          "color": "#DD9614",
          "margin": "md",
          "style": "primary"
        }
      ]
    }
  }

  bubble.push(bubbleAkhir)

  const flex = {
    type: "carousel",
    contents: bubble,
  }

  return flex
}



module.exports = flexUtama