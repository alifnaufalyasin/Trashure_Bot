const flamelinkApp = require('../config/flamelink');
const beritaFlex = require('../flex/beritaFlex');
const Users = require("../utils/Users")
const QuickChart = require('quickchart-js');

async function getData(idUser) {
  const data = await flamelinkApp.content.getByField({
    schemaKey: 'trashbag',
    field: 'userId',
    value: idUser,
    // limitToLast: 15,
    // limitToFirst: 1,
    // filters: [['tanggal', '>', 160500433660]]
    //tanggal sama id sama isinya, jadi bisa di filter by id
  })
  let isi = []
  for (let a = 0; a < 12; a++) {
    isi[a] = parseFloat('0.0')
  }
  const key = Object.keys(data)
  for (let i = key.length - 1; i >= 0; i--) {
    const mon = new Date(data[key[i]].tanggal).getMonth()
    isi[mon] += parseFloat(data[key[i]].berat)
  }
  return isi
}

async function home(Context, userId) {
  const {User, idUser} = await Users.getUser(userId)
  const flexBerita = await beritaFlex()
  const m = new Date().getMonth()
  const month = ['Jan', 'Feb', 'Mar', 'Apr', "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let label = []
  let datasets = []
  const datas = await getData(idUser)
  for (let a = 0; a < 5; a++) {
    label.push(month[m-4+a])
    datasets.push(datas[m-4+a])
  }
  
  const myChart = new QuickChart();
  myChart
    .setConfig({
      type: 'bar',
      data: { 
        labels: label, 
        datasets: [
          { 
            label: 'Berat', 
            borderColor: 'rgba(156, 167, 180, 1)',
            borderWidth: 1,
            backgroundColor: 'rgba(65, 97, 136, 0.7)',
            data: datasets, 
            barThickness: 10
          }]
      },
      options: {
        scales: {
          xAxes: [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Month"
              }
            }
          ],
          yAxes: [
            {
              "stacked": true,
              "scaleLabel": {
                "display": true,
                "labelString": "Kg"
              }
            }
          ]
        }
      }
      
    })
    .setBackgroundColor('rgba(139, 195, 74, 1)')
    .setWidth(300)
    .setHeight(230);

  const chartImageUrl = myChart.getUrl();
  const flex = {
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "vertical",
      "backgroundColor": "#8BC34A",
      "contents": [
        {
          "type": "text",
          "text": "Sampah Terkumpul",
          "weight": "bold",
          "size": "lg",
          "contents": []
        },
        {
          "type": "image",
          "url": chartImageUrl,
          "margin": "none",
          "size": "full"
        }
      ]
    }
  }
  await Context.reply([
    {
      type: "flex",
      altText: "Sampah Terkumpul",
      contents: flex
    },
    {
      type: "flex",
      altText: "Berita",
      contents: flexBerita
    }
  ])
}

module.exports = home