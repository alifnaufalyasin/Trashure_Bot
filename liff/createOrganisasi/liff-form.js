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
      //get token
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
              const password = document.getElementById("inputPassword").value
              const logo = $("#inputLogo")[0].files[0]
              let data = new FormData()
              data.append("nama", nama)
              data.append("alamat", alamat)
              data.append("password", password)
              data.append("logo", logo)
              //registrasi organisasi
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
                    token.id_organisasi = response.data.data.id_organisasi
                    //set data line
                    axios({
                      url: "https://rpl-inventory.herokuapp.com/api/lineBot/set",
                      method: "POST",
                      data: token,
                    })
                    .then((res) => {
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
                        .catch((err8) => {
                          console.log(err8)
                          alert(err8)
                        })
                      })
                      //catch set data line
                      .catch((err6) => {
                        // alert(err6.response.data.message)
                        liff
                          .sendMessages([
                            {
                              type: "text",
                              text: "Error...",
                            },
                            {
                              type: "text",
                              text: err6.response.data.message,
                            },
                          ])
                          .then(() => {
                            console.log("message sent")
                            liff.closeWindow()
                          })
                          .catch((err7) => {
                            alert(err7)
                          })
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
                //catch registrasi organisasi
                .catch((err2) => {
                  // alert(err2.response.data.message)
                  liff
                    .sendMessages([
                      {
                        type: "text",
                        text: "Error...",
                      },
                      {
                        type: "text",
                        text: err2.response.data.message,
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
        //catch get token
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
