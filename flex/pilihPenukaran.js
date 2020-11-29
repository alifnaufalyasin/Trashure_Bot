flex = {
  "type": "bubble",
  "direction": "ltr",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
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
        "type": "box",
        "layout": "horizontal",
        "spacing": "md",
        "margin": "lg",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "Tukar",
              "data": "penukaran=tukar"
            },
            "color": "#8BC34A",
            "margin": "md",
            "height": "md",
            "style": "primary",
            "gravity": "center"
          },
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "Riwayat",
              "data": "penukaran=riwayat"
            },
            "color": "#8BC34A",
            "margin": "md",
            "height": "md",
            "style": "primary"
          }
        ]
      }
    ]
  }
}


module.exports = flex