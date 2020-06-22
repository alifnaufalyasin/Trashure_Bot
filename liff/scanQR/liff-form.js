window.onload = function () {
  let myLiffId = "1654371439-2yo0m1Ag"
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
      const profile = await liff.getProfile()
      let data = {}
      data.userId = profile.userId
      const dataToken = await axios({
          url: "https://rpl-inventory.herokuapp.com/api/lineBot",
          method: "GET",
          data: data,
        })
      liff.scanCode().then(async result => {
        const kode = result.value
        const data2 = {kode}
        axios({
          url: "https://rpl-inventory.herokuapp.com/api/scanQR",
          method: "POST",
          headers: {
            'Authorization': `Bearer ${dataToken.data.data.token}`
          },
          data: data2,
        })
        .then(async (response) => {
          liff
            .sendMessages([
              {
                type: "text",
                text: "Berhasil scan barang "+response.data.data.nama,
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
      document.getElementById("btnSubmit").addEventListener("click", (e) => {
        e.preventDefault()
        let data = {}
        data.email = document.getElementById("inputEmail").value
        data.password = document.getElementById("inputPassword").value
        data.nama = document.getElementById("inputNama").value
        data.no_telp = document.getElementById("inputNomor").value
        
      })
    })
    .catch((err) => {
      window.location = "./form.html"
    })
}

