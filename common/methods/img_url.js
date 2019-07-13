const {
  concatURl
} = require('./url')


const userImageURl = (url) => {
  if (url === '') {
    url = concatURl("./images/user_images/avatar_default.png")
  } else {
    url = concatURl(url)
  }
  return url
}

const baImageURl = (url) => {
  return concatURl(url)
}

const TieImageURl = (arr) => {
  arr = JSON.parse(arr)
  arr = arr.map((item => {
    return concatURl(item)
  }))
  return arr
}

module.exports = {
  userImageURl,
  baImageURl,
  TieImageURl
}