const Product = require('../models/productModel.js')

// main work 

const addProduct = async (req, res) => {

    let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)
}

// get all product

const getallproduct = async (req, res) => {

    let products = await Product.findall({})
    res.status(200).send(products)

}

// get single product

const getsingleproduct = async (req, res) => {

    let id = req.param.id
    let singleproducts = await Product.findone({ where: { id: id } })
    res.status(200).send(singleproducts)

}

// get update product

const getupdateproduct = async (req, res) => {

    let id = req.param.id
    let updateproducts = await Product.update(req.body, { where: { id: id } })
    res.status(200).send(updateproducts)

}

// get Delete product

const getdeleteproduct = async (req, res) => {

    let id = req.param.id
    await Product.destroy({ where: { id: id } })
    res.status(200).send('Product is deleted !')

}

// get Publish product

const getpublishproduct = async (req, res) => {

    let id = await Product.findall({ where: { published: true } })
    res.status(200).send(getpublishproduct)

}

module.exports = {
    addProduct,
    getallproduct,
    getsingleproduct,
    getupdateproduct,
    getdeleteproduct,
    getpublishproduct
}