window.onload = function() {
  let myLiffId = "1653940376-OjqwPeVm";
  initializeLiff(myLiffId);
};

/**
 * Initialize LIFF
 * @param {string} myLiffId The LIFF ID of the selected element
 */
function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId
    })
    .then(async () => {
      await getProfile();
      document.getElementById("btnSubmit").addEventListener("click", () => {
        liff.sendMessages([
          {
            type:'text',
            text:'Pesanan Diterima'
          }
        ])
        .then(() => {
          console.log('message sent');
          liff.closeWindow();
        })
        .catch((err) => {
          console.log('error', err);
        });          
      })
    })
    .catch(err => {
      window.location = "./form.html";
    });
}


const getProfile = () => {
  liff
    .getProfile()
    .then(profile => {
      // document.getElementById("btnSubmit").style.visibility = "visible";
      document.getElementById("userId").value = profile.userId;
      document.getElementById("displayNameField").textContent =
        "Hai, " + profile.displayName;
      return profile;
    })
    .catch(e => {
      console.log(e);
    });
};

