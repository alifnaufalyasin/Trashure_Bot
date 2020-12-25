window.onload = function () {
  let myLiffId = "1655250356-8OMObjyN"
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
      document.getElementById("formDetails").addEventListener("submit", () => {
        liff.sendMessages([
          {
            type:'text',
            text:'Identitas Tersimpan'
          }
        ])
        .then(() => {
          console.log('message sent');
          liff.closeWindow();
        })
        .catch((err) => {
          console.log('error', err);
          alert(JSON.stringify(err))
        });
      })
    })
    .catch((err) => {
      window.location = "./form.html"
    })
}

const getProfile = () => {
  liff
    .getProfile()
    .then(async (profile) => {
      document.getElementById("btnSubmit").style.visibility = "visible";
      document.getElementById("displayNameField").textContent =
        "Hai, " + profile.displayName
      document.getElementById("inputNama").value = profile.displayName
      axios.get(`/getUser/${profile.userId}`)
      .then(User => {
        document.getElementById("inputNomor").value = User.data.nomorTelpon
        document.getElementById("inputEmail").value = User.data.email
        document.getElementById("inputTanggalLahir").value = User.data.tanggalLahir
        document.getElementById("inputIdUser").value = User.data.idUser
      })
      
      return profile
    })
    .catch((e) => {
      console.log(e)
    })
}
