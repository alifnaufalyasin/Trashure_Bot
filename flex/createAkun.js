const flex = {
  type: "bubble",
  direction: "ltr",
  header: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "text",
        text: "Create Akun",
        size: "xl",
        align: "center",
        weight: "bold",
        color: "#C38E2D",
      },
    ],
  },
  footer: {
    type: "box",
    layout: "horizontal",
    contents: [
      {
        type: "button",
        action: {
          type: "uri",
          label: "CREATE",
          uri: "line://app/1654371439-2yo0m1Ag",
        },
        color: "#DD9614",
        style: "primary",
      },
    ],
  },
}

module.exports = flex
