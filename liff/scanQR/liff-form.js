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
      let data = {}
      data.userId = profile.userId
      const dataToken = await axios({
        url: "https://rpl-inventory.herokuapp.com/api/lineBot",
        method: "GET",
        data: data,
      })
      liff.scanCode().then((result) => {
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
              .catch((err) => {
                alert(err)
              })
          })
          .catch((err) => {
            liff
              .sendMessages([
                {
                  type: "text",
                  text: "Error...",
                },
                {
                  type: "text",
                  text: err.data.data.message,
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
    })
    .catch((err) => {
      window.location = "./form.html"
    })
}
