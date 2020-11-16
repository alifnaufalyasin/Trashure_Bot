const bodyParser = require("body-parser")
const express = require("express")
const { bottender } = require("bottender")
const getInstagramPhoto = require('get-instagram-photo')

const app = bottender({
  dev: process.env.NODE_ENV !== "production",
})

const port = process.env.PORT || 5000

// the request handler of the bottender app
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(
    bodyParser.json({
      verify: (req, _, buf) => {
        req.rawBody = buf.toString()
      },
    })
  )

  // your custom route
  server.use(bodyParser.urlencoded({extended:true}))
  server.use(bodyParser.json())
  server.use("/liff", express.static("liff"))

  server.get("/", (req, res) => {
    res.send("ngapain kesini hayooo")
  })
  server.get("/getImage",(req,res) => {
    const link = req.query.link
    console.log(link);
    // res.status(200).send(link)
    getInstagramPhoto(link)
    .then(image => {
      console.log(image)
      //=> https://scontent.cdninstagram.com/t51.2885-15/e35/13735878_229794197415635_1137269208_n.jpg?ig_cache_key=MTMwOTgzMzc5MjgzOTgzMDA4NQ%3D%3D.2
      res.status(200).send(image)
    })
    .catch(error => {
      res.status(400).send({"message": "error", "error": error})
    })


  })
  // const flamelinkApp = require('./config/flamelink')
  // server.get("/tambah", async (req,res,next) => {
  //   const hasil = await flamelinkApp.content.add({
  //     schemaKey: 'scanSampah',
  //     data: {
  //       userId: "Ua2faf57f45fddebd81410b69c29f342c",
  //       trashbagId: "2654B398NO",
  //       tanggal: Date.now(),
  //       status: "Proses"
  //     }
  //   })
  //   res.send(hasil)
  // })

  // route for webhook request
  server.all("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
