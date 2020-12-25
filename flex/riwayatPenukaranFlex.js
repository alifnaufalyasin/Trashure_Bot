
function riwayatFlex(data) {
  const walletURL = {
    "pulsa": "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FPulsa.png?alt=media&token=899c71a1-5c6b-4938-8297-77362b82a658",
    "dana": "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FDana.png?alt=media&token=7d468798-21ea-4e19-a344-2136c66567d1",
    "ovo": "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FOvo.png?alt=media&token=386cf4db-e7ff-4ad3-b969-ceae2b58f7db",
    "gopay": "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FGopay.png?alt=media&token=40d7c3ac-f969-460e-b64b-93aff6df67e5",
    "shopeePay": "https://firebasestorage.googleapis.com/v0/b/trahsure-aliven.appspot.com/o/flamelink%2Fmedia%2Fsized%2F300_9999_100%2FShopeePay.png?alt=media&token=1350a81f-53b2-46c5-beb6-3f6d1ef79d31"
  }
  
  function tulis(tipe, nominal, nomor){
    const daftarProvider = {
      'Telkomsel': ['0811','0812','0813','0821','0822','0823','0852','0853','0851'],
      'Indosat': ['0855','0856','0857','0858','0814','0815','0816'],
      'XL': ['0817','0818','0819','0859','0877','0878','0879'],
      'Three': ['0896','0897','0898','0899'],
      'Axis': ['0831','0838'],
      'Smartfren': ['0881','0882','0883','0884']
    }
    if (tipe == "pulsa"){
      const noawal = nomor.slice(0, 4)
      const key = Object.keys(daftarProvider)
      for (let i = 0; i < key.length; i++) {
        if (daftarProvider[key[i]].includes(noawal)){
          return {judul: `Penukaran pulsa`, isi: `Penukaran pulsa ${nominal} dengan nomor kartu ${key[i]} berhasil`}
          break
        }
      }
    }else{
      return {judul: `Saldo ${tipe.toUpperCase()}`, isi: `Saldo ${tipe} sebesar ${nominal} berhasil ditukarkan`}
    }
  }
  if (!data){
    const flex = {
      "type": "bubble",
      "direction": "ltr",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "Riwayat Penukaran",
            "weight": "bold",
            "size": "xl",
            "color": "#8BC34A",
            "align": "center",
            "contents": []
          },
          {
            "type": "separator",
            "margin": "md",
            "color": "#8BC34A"
          },
          {
            "type": "text",
            "text": "Riwayat Kosong",
            "size": "md",
            "align": "center",
            "gravity": "center",
            "margin": "lg",
            "contents": []
          }
        ]
      }
    }
    return flex
  }else{
    let keys = Object.keys(data)
    let bubble = []
    const awal = [{
      "type": "text",
      "text": "Riwayat Penukaran",
      "weight": "bold",
      "size": "xl",
      "color": "#8BC34A",
      "align": "center",
      "contents": []
    },
    {
      "type": "separator",
      "margin": "md",
      "color": "#8BC34A"
    }]

    const separate = {
      "type": "separator",
      "margin": "md"
    }

    let content = []
    let i = 1
    for (let x = keys.length-1; x >= 0; x--) {
      const text = tulis(data[keys[x]].tipe, data[keys[x]].nominal, data[keys[x]].nomor)
      const isi = {
        "type": "box",
        "layout": "horizontal",
        "margin": "md",
        "contents": [
          {
            "type": "image",
            "url": walletURL[data[keys[x]].tipe],
            "flex": 3,
            "align": "start",
            "size": "xs"
          },
          {
            "type": "box",
            "layout": "vertical",
            "flex": 7,
            "contents": [
              {
                "type": "text",
                "text": text.judul,
                "weight": "bold",
                "gravity": "center",
                "contents": []
              },
              {
                "type": "text",
                "text": text.isi,
                "size": "xs",
                "gravity": "center",
                "wrap": true,
                "contents": []
              }
            ]
          }
        ]
      }
      content.push(isi)
      content.push(separate)
      let oneBubble = {}
      let contents = {}
      if (i % 5 == 0){
        content.pop()
        contents = awal.concat(content)
        oneBubble = {
          "type": "bubble",
          "direction": "ltr",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": contents
          }
        }
        bubble.push(oneBubble)
        content = []
      }else if (x == 0){
        content.pop()
        contents = awal.concat(content)
        oneBubble = {
          "type": "bubble",
          "direction": "ltr",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": contents
          }
        }
        bubble.push(oneBubble)
        content = []
      }
      i++
    }
    const carousel = {
      "type": "carousel",
      "contents": bubble
    }
    return carousel
  }
}

module.exports = riwayatFlex