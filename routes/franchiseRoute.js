const productController = require('../Controllers/productController')

const router = require('express').Router()

router.post('/addproduct', productController.addProduct)

router.get('/allproducts', productController.getallproduct)

router.get('/published', productController.getpublishproduct)

router.get('/:id', productController.getsingleproduct)

router.put('/:id', productController.getupdateproduct)

router.delete('/:id', productController.getdeleteproduct)

module.exports = router