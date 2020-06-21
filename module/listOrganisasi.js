const axios = require('axios');

function listOrganisasi(Context, userId) {
  data = {userId}
  axios({
    url: "https://rpl-inventory.herokuapp.com/api/lineBot",
    method: "GET",
    data: data,
  })
  .then(async (response) => {

  })
  .catch((err) => {
    Context.reply([
      {
        type: "text",
        text: JSON.toString(err)
      }
    ])
  })
}