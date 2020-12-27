const puppeteer = require("puppeteer")
// const { ItemModel } = require("./mongo/mongo") // MongoDB Model

// Scrapping from CyberPuerta.mx

const cyberPuertaScrap = async link => {
  const chromeOptions = {
    headless: true,
    defaultViewport: null,
    args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"]
  }

  const browser = await puppeteer.launch(chromeOptions)
  const page = await browser.newPage()

  await page.goto(link)
  const product = await page.evaluate(() => {
    const productName = document.querySelector(".detailsInfo_right_title")
    const productDiscountedPrice = document.querySelector(".priceText")
    const productOriginalPrice = document.querySelector("del")
    const productImage = document.querySelector("#emzoommainpic")

    const product = {}

    if (productName && productImage) {
      product.name = productName.innerHTML.split("―")[0]
      product.image = {
        URL: productImage.children[0].getAttribute("src"),
        alt: productImage.children[0].getAttribute("alt")
      }
      if (productOriginalPrice) {
        product.originalPrice = productOriginalPrice.innerHTML
        product.discountedPrice = productDiscountedPrice.innerHTML
      } else {
        product.originalPrice = productDiscountedPrice.innerHTML
      }
      return product
    } else {
      return {
        errMessage: "Item no encontrado ó URL invalida"
      }
    }
  })

  await page.close()

  return product
}

module.exports = {
  // amazonScrap,
  cyberPuertaScrap
}

// Scrapping from Amazon.com.mx

// const amazonScrap = async link => {
//    console.log(link)

//    const browser = await puppeteer.launch()
//    const page = await browser.newPage()

//    await page.goto(link)
//    const product = await page.evaluate(() => {
//       const productImage = document.querySelector("#imgBlkFront")
//       const productName = document.querySelector("#productTitle")
//       const productPrice = document.querySelector(".a-color-price")
//       console.log(productImage)
//       return {
//          name: productName.innerHTML,
//          price: productPrice.innerHTML
//       }
//    })
//    await page.close()

//    return product
// }
