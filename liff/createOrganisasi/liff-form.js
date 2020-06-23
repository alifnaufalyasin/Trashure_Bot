window.onload = function () {
  let myLiffId = "1654371439-KGlkPNDy"
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
      const profile = liff.getContext()
      const userId = profile.userId
      axios({
        url: "https://rpl-inventory.herokuapp.com/api/lineBot?userId=" + userId,
        method: "GET",
        // data: data,
      })
        .then((dataToken) => {
          document
            .getElementById("btnSubmit")
            .addEventListener("click", (e) => {
              e.preventDefault()
              const nama = document.getElementById("inputNama").value
              const alamat = document.getElementById("inputAlamat").value
              const password = document.getElementById("inputNama").value
              const logo = $("#inputLogo")[0].files[0]
              let data = new FormData()
              data.append("nama", nama)
              data.append("alamat", alamat)
              data.append("password", password)
              data.append("logo", logo)
              axios({
                url:
                  "https://rpl-inventory.herokuapp.com/api/organisasi/registrasi",
                method: "POST",
                headers: {
                  Authorization: `Bearer ${dataToken.data.data.token}`,
                },
                data: data,
              })
                .then((response) => {
                  console.log(response.data)
                  if (response.data.success) {
                    let token = {}
                    token.userId = userId
                    token.id_organisasi = id_organisasi
                    axios({
                      url: "https://rpl-inventory.herokuapp.com/api/lineBot/set",
                      method: "POST",
                      data: token,
                    })
                    liff
                      .sendMessages([
                        {
                          type: "text",
                          text: "Lihat Barang"
                        }
                      ])
                      .then(() => {
                        console.log("message sent")
                        liff.closeWindow()
                      })
                      .catch((err4) => {
                        console.log(err4)
                        alert(err4)
                      })
                  } else {
                    liff
                      .sendMessages([
                        {
                          type: "text",
                          text: "Error...",
                        },
                        {
                          type: "text",
                          text: response.data.message,
                        },
                      ])
                      .then(() => {
                        console.log("message sent")
                        liff.closeWindow()
                      })
                      .catch((err5) => {
                        alert(err5)
                      })
                  }
                })
                .catch((err2) => {
                  // alert(err2.response.data.message)
                  let pesan = ""
                  response.data.data.map((item, index) => {
                    return (pesan += item.message + ", ")
                  })
                  liff
                    .sendMessages([
                      {
                        type: "text",
                        text: "Error...",
                      },
                      {
                        type: "text",
                        text: pesan,
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
          // alert(err0.response.data.message)
          liff
            .sendMessages([
              {
                type: "text",
                text: "Error...",
              },
              {
                type: "text",
                text: err0.response.data.message,
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

const getProfile = () => {
  liff
    .getProfile()
    .then((profile) => {
      document.getElementById("btnSubmit").style.visibility = "visible"
      document.getElementById("displayNameField").textContent =
        "Hai, " + profile.displayName
      return profile
    })
    .catch((e) => {
      console.log(e)
    })
}
