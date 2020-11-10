//flex
const flexHarga = require("../flex/hargaFlex");

//module
const Riwayat = require("../module/riwayat");


async function handleMessage(Context) {
  const message = Context.event.message
  let profileUser = await Context.getUserProfile()
  let userId = profileUser.userId
  console.log(userId);

  if (message.type !== "text") {
    Context.reply([
      {
        type: "text",
        text: "apa tuh",
      },
    ])
  } else {
    switch (message.text.toLowerCase()) {
      case "harga":
        const awal = Date.now()
        const HargaFlex = await flexHarga()
        await Context.reply([
          {
            type: "flex",
            altText: "Harga Sampah",
            contents: HargaFlex,
          }
        ])
        const akhir = Date.now()
        console.log(awal)
        console.log(akhir)
        console.log(akhir-awal)
        break
      case "riwayat":
        await Riwayat(Context, userId)
        break
      default :
      Context.reply([
        {
          type: "text",
          text: `Haiiii`,
        },
      ])
        break
    }
  }
}

module.exports = {
  handleMessage,
}
