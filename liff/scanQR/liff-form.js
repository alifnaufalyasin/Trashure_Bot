window.onload = function () {
  let myLiffId = "1655250356-dqegQDlM"
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
    .then(() => {
      const profile = liff.getContext()
      const userId = profile.userId
      liff.scanCode()
        .then((result) => {
          const kode = result.value
          if (result == "null"){
            liff.closeWindow()
          } else{
            liff
              .sendMessages([
                {
                  type: "text",
                  text: "TrashID: "+kode,
                },
              ])
              .then(() => {
                console.log("message sent")
                liff.closeWindow()
              })
              .catch((err) => {
                alert(err)
              })
          }
        })
      let data = { userId: userId }
    })
    .catch((err) => {
      window.location = "./form.html"
    })
}
