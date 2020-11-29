function kasihTitik(nominal) {
  if (nominal.length >=7){//          1                                        1                3
    return nominal.slice(0, nominal.length - 6) + "." + nominal.slice(nominal.length - 6, nominal.length - 3) + "." + nominal.slice(nominal.length - 3) 
  }else{
    return nominal.slice(0, nominal.length - 3) + "." + nominal.slice(nominal.length - 3)
  }
}

module.exports = kasihTitik