window.onload = function () {
  let myLiffId = "1655250356-2RjAl0o7"
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
      
    })
    .catch((err) => {
      window.location = "./form.html"
    })
}
