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
      await getProfile()
      document.getElementById("btnSubmit").addEventListener("click", (e) => {
        e.preventDefault()
        let data = {}
        data.email = document.getElementById("inputEmail").value
        data.password = document.getElementById("inputPassword").value
        data.nama = document.getElementById("inputNama").value
        data.no_telp = document.getElementById("inputNomor").value
        axios({
          url: "https://5ab20e50db87.ngrok.io/api/admin/registrasi",
          method: "POST",
          data: data,
        })
        .then(async (response) => {
          alert('proses')
          console.log(response.data)
          liff
            .sendMessages([
              {
                type: "text",
                text: "Pesanan Diterima",
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
                text: err.response.data.message,
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

const getProfile = () => {
  liff
    .getProfile()
    .then((profile) => {
      // document.getElementById("btnSubmit").style.visibility = "visible";
      document.getElementById("displayNameField").textContent =
        "Hai, " + profile.displayName
      return profile
    })
    .catch((e) => {
      console.log(e)
    })
}
