const flamelinkApp = require('../config/flamelink');
const beritaFlex = require('../flex/beritaFlex');
const Users = require("../utils/Users")
const QuickChart = require('quickchart-js');

async function home(Context, userId) {
  const {User, idUser} = await Users.getUser(userId)
  const flexBerita = await beritaFlex()
  const myChart = new QuickChart();
  myChart
    .setConfig({
      type: 'bar',
      data: { 
        labels: ['Jan', 'Feb', 'Mar', 'Apr', "May", "Jun"], 
        datasets: [
          { 
            label: 'Berat', 
            borderColor: 'rgba(156, 167, 180, 1)',
            borderWidth: 1,
            backgroundColor: 'rgba(65, 97, 136, 0.7)',
            data: [8, 15, 9, 13, 0, 0], 
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