//flex

//module


async function handleMessage(Context) {
  const message = Context.event.message
  let profileUser = await Context.getUserProfile()
  let userId = profileUser.userId
  // console.log(profileUser);

  if (message.type !== "text") {
    Context.reply([
      {
        type: "text",
        text: "apa tuh",
      },
    ])
  } else {
    switch (message.text.toLowerCase()) {
      case "message":
        break
    }
  }
}

module.exports = {
  handleMessage,
}
