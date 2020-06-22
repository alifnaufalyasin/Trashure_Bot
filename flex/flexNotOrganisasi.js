function flexUtama(organisasi) {
  let bubble = []
  organisasi.map((item, index) => {
    const bubbleItem = {
      type: "bubble",
      hero: {
        type: "image",
        url: item.logo,
        size: "full",
        aspectRatio: "4:3",
        aspectMode: "cover",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: item.nama,
            size: "xl",
            weight: "bold",
            color: "#DD9614",
          },
          {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            margin: "lg",
            contents: [
              {
                type: "text",
                text: item.alamat,
              },
            ],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        flex: 0,
        spacing: "sm",
        contents: [
          {
            type: "button",
            action: {
              type: "postback",
              label: "Join",
              data: "joinorganisasi=" + item.id_organisasi,
            },
            color: "#DD9614",
            height: "sm",
            style: "primary",
          },
          {
            type: "spacer",
            size: "sm",
          },
        ],
      },
    }
    bubble.push(bubbleItem)
  })

  const flex = {
    type: "carousel",
    contents: bubble,
  }

  return flex
}

module.exports = flexUtama
