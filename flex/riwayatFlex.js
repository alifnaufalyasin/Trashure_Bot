
function riwayatFlex(data) {
  if (!data){
    const flex = {
      "type": "bubble",
      "direction": "ltr",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "Riwayat Setoran",
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
            "text": "Riwayat Kosong",
            "size": "md",
            "align": "center",
            "gravity": "center",
            "margin": "lg",
            "contents": []
          }
        ]
      }
    }
    return flex
  }else{
    let keys = Object.keys(data)
    let bubble = []
    const awal = [
      {
        "type": "text",
        "text": "Riwayat Setoran",
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
      "margin": "md"
    }

    let content = []
    // for (const id in data) {
    let i = 1
    for (let x = keys.length-1; x >= 0; x--) {
      // console.log(data[keys[x]]);
      const date = new Date(data[keys[x]].tanggal)
      let dd = date.getDate()
      dd = String(dd).padStart(2, '0');
      let mm = date.getMonth()
      mm = String(dd).padStart(2, '0');
      let yyyy = date.getFullYear()
      const isi = {
        "type": "box",
        "layout": "horizontal",
        "margin": "md",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "flex": 9,
            "margin": "none",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "margin": "none",
                "contents": [
                  {
                    "type": "text",
                    "text": "Trashbag ID",
                    "size": "md",
                    "flex": 6,
                    "align": "start",
                    "gravity": "center",
                    "margin": "none",
                    "contents": []
                  },
                  {
                    "type": "text",
                    "text": data[keys[x]].trashbagId,
                    "size": "md",
                    "flex": 7,
                    "gravity": "center",
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
                    "text": `${dd} / ${mm} / ${yyyy}`,
                    "size": "md",
                    "flex": 8,
                    "align": "start",
                    "gravity": "center",
                    "margin": "none",
                    "contents": []
                  }
                ]
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "flex": 3,
            "margin": "none",
            "contents": [
              {
                "type": "text",
                "text": data[keys[x]].status,
                "size": "md",
                "color": "#8BC34A",
                "flex": 4,
                "align": "center",
                "gravity": "center",
                "contents": []
              }
            ]
          }
        ]
      }

      content.push(isi)
      content.push(separate)
      let oneBubble = {}
      let contents = {}
      if (i % 5 == 0){
        content.pop()
        contents = awal.concat(content)
        oneBubble = {
          "type": "bubble",
          "direction": "ltr",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": contents
          }
        }
        bubble.push(oneBubble)
        content = []
      }else if (x == 0){
        content.pop()
        contents = awal.concat(content)
        oneBubble = {
          "type": "bubble",
          "direction": "ltr",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": contents
          }
        }
        bubble.push(oneBubble)
        content = []
      }
      i++
    }

    const carousel = {
      "type": "carousel",
      "contents": bubble
    }

    // console.log(JSON.stringify(carousel));
    return carousel
  }
}

module.exports = riwayatFlex