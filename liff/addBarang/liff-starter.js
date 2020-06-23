window.onload = function() {
  let myLiffId = "1654371439-eAkgWOEp";
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
    .then(() => {
      if (liff.isInClient()){
        window.location = "./form.html"
      }else{
        window.location = "../index.html"
      }
    })
    .catch(err => {
      window.location = "./"
    });
}