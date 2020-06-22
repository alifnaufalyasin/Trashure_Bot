window.onload = function () {
  let myLiffId = "1654371439-ONAX01kB"
  initializeLiff(myLiffId)
}

/**
 * Initialize LIFF
 * @param {string} myLiffId The LIFF ID of the selected element
 */
function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId,
    })
    .then(async () => {
      const profile = liff.getContext()
      const userId = profile.userId
      let data = { userId: userId }
      axios({
        url: "https://rpl-inventory.herokuapp.com/api/lineBot",
        method: "GET",
        data: data,
      })
      .then((dataToken) => {
        liff.scanCode()
        .then((result) => {
          const kode = result.value
          const data2 = { kode }
          axios({
            url: "https://rpl-inventory.herokuapp.com/api/scanQR",
            method: "POST",
            headers: {
              Authorization: `Bearer ${dataToken.data.data.token}`,
            },
            data: data2,
          })
            .then((response) => {
              liff
                .sendMessages([
                  {
                    type: "text",
                    text: "Berhasil scan barang " + response.data.data.nama,
                  },
                ])
                .then(() => {
                  console.log("message sent")
                  liff.closeWindow()
                })
                .catch((err4) => {
                  alert(err4)
                })
            })
            .catch((err2) => {
              alert(err2.data.data.message)
              liff
                .sendMessages([
                  {
                    type: "text",
                    text: "Error...",
                  },
                  {
                    type: "text",
                    text: err2.data.data.message,
                  },
                ])
                .then(() => {
                  console.log("message sent")
                  liff.closeWindow()
                })
                .catch((err3) => {
                  alert(err3)
                })
            })
        })
      })
      .catch((err0) => {
        alert(err0.data.data.message)
        liff
          .sendMessages([
            {
              type: "text",
              text: "Error...",
            },
            {
              type: "text",
              text: err0.data.data.message,
            },
          ])
          .then(() => {
            console.log("message sent")
            liff.closeWindow()
          })
          .catch((err) => {
            alert(err)
          })
      })
    })
    .catch((err) => {
      window.location = "./form.html"
    })
}
