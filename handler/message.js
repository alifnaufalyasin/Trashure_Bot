//flex
const createAkunFlex = require("../flex/createAkun")

//module
const loginHandle = require("../module/login")
const joinHandle = require("../module/joinOrganisasi")
const listBarang = require("../module/listBarang")

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
    console.log(userId)
    switch (message.text.toLowerCase()) {
      case "login":
        Context.reply([
          {
            type: "text",
            text: `Sudah punya akun? ketik "login <email> (spasi) <password>"`,
          },
          {
            type: "flex",
            altText: "Create Akun",
            contents: createAkunFlex,
          },
        ])
        break
      case "akun berhasil dibuat":
        Context.reply([
          {
            type: "text",
            text: `Sudah punya akun? ketik "login <email> (spasi) <password>"`,
          },
        ])
        break
      case "lihat barang":
        await listBarang(userId, Context)
        break
      default:
        if (message.text.toLowerCase().match(/login/g)) {
          await loginHandle(message.text.split(" "), Context, userId)
        } else if (message.text.toLowerCase().match(/organisasi/g)) {
          await joinHandle(message.text.split(" "), Context, userId)
        } else if (
          message.text.toLowerCase().match(/error/g) ||
          message.text.toLowerCase().match(/berhasil/g)
        ) {
        } else {
          Context.reply([
            {
              type: "text",
              text: "Silahkan buka menu tab dibawah",
            },
          ])
        }
        break
    }
  }
}

module.exports = {
  handleMessage,
}
