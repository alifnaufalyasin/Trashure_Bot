const bodyParser = require("body-parser")
const express = require("express")
const { bottender } = require("bottender")
const flamelinkApp = require('./config/flamelink')
const cron = require("node-cron")
var mustacheExpress = require('mustache-express');

const { updateDataUser } = require('./utils/Users')

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
  server.engine('html', mustacheExpress());
  server.set('view engine', 'html');
  server.set('views', __dirname + '/views');
  // your custom route
  server.use(bodyParser.urlencoded({extended:true}))
  server.use(bodyParser.json())
  server.use("/liff", express.static("liff"))

  server.get("/", (req, res) => {
    res.send("ngapain kesini hayooo")
  })

  server.get("/getUser/:userId", async (req,res, next) => {
    const userId = req.params.userId
    let User = await flamelinkApp.content.getByField({
      schemaKey: 'user',
      field: 'userId',
      value: userId
    })

    const id = Object.keys(User)[0]
    let Data = {
      idUser: id,
      nama: User[id].nama,
      nomorTelpon: User[id].nomorTelpon,
      email: User[id].email
    }
    // console.log(Data);
    let date = new Date()
    let dd = ""
    let mm = ""
    let yyyy = ""
    if (User[id].tanggalLahir == ""){
      console.log("masuk");
      // date = Date.now()
      dd = date.getDate()
      dd = String(dd).padStart(2, '0');
      mm = date.getMonth() + 1
      mm = String(mm).padStart(2, '0');
      yyyy = date.getFullYear()
      Data["tanggalLahir"] = `${yyyy}-${mm}-${dd}`
    }else{
      let date = new Date(User[id].tanggalLahir)
      dd = date.getDate()
      dd = String(dd).padStart(2, '0');
      mm = date.getMonth() + 1
      mm = String(mm).padStart(2, '0');
      yyyy = date.getFullYear()
      Data["tanggalLahir"] = `${yyyy}-${mm}-${dd}`
    }
    res.status(200).send(Data)

  })

  server.post("/saveAkun", async (req,res,next) => {
    const Data = req.body
    let Tanggal = Data.tanggalLahir.split("-");
    Tanggal = Tanggal[1] + "/" + Tanggal[2] + "/" + Tanggal[0];
    Tanggal = new Date(Tanggal).getTime();
    console.log(Data);
    flamelinkApp.content.update({
      schemaKey: 'user',
      entryId: Data.idUser,
      data: {
        nama: Data.Nama,
        // fotoProfile: imageURL
        nomorTelpon: Data.Nomor,
        email: Data.Email,
        tanggalLahir: Tanggal
      }
    })
  })
  
  server.get("/berita", async (req,res,next)=>{
    const judul = req.query.judul
    let Berita = await flamelinkApp.content.getByField({
      schemaKey: 'berita',
      field: 'judul',
      value: judul,
      populate: [{
        field: 'gambar'
      }]
    })
    const key = Object.keys(Berita)
    const date = new Date(Berita[key[0]].tanggal)
    let dd = date.getDate()
    dd = String(dd).padStart(2, '0');
    let mm = date.getMonth()
    mm = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mm]
    let yyyy = date.getFullYear()
    res.render('berita',{judul: Berita[key[0]].judul, image: Berita[key[0]].gambar[0].url, tanggal: `${dd} ${mm}, ${yyyy}`, body: Berita[key[0]].body})
  })


  // route for webhook request
  server.all("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

// cron
cron.schedule("0 */1 * * * *", async function () {
  await updateDataUser()
})

//Biar warning ga keluar
process.stderr.write = (function(write) {
  return function() {
    if (!arguments[0].includes("FIREBASE WARNING"))
      write.apply(process.stderr, arguments);
  };
}(process.stderr.write));