
function flexTrashbag(id) {
  flex = {
    "type": "bubble",
    "direction": "ltr",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "Scan",
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
          "text": `Trashbag dengan ID ${id} masih tersambung`,
          "align": "center",
          "margin": "lg",
          "wrap": true,
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "postback",
            "label": "Putuskan Sambungan",
            "data": "putusTrashbag="+id
          },
          "color": "#8BC34A",
          "height": "md",
          "style": "primary",
          "gravity": "center",
          "offsetTop": "sm"
        }
      ]
    }
  }

  return flex
}

module.exports = flexTrashbag
