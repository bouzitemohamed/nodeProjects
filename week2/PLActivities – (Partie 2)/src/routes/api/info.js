const express=require('express');
const infoController=require('../../controllers/infoController');
const productController=require('../../controllers/productsController');
const validateResource=require('../../middlewares/validateResource');
const router=express.Router();
router.get('/products',productController.getFilteredProducts);
router.get('/info',infoController.getProjectInfos);
router.get('/resources',productController.getAllProducts);
router.post('/resources',validateResource(['name', 'price', 'category']),productController.createProduct);
router.delete('/resources/:id',productController.deleteProduct);
router.put('/resources/:id',productController.updateProduct);
/*router.get('resources/:id');
router.post('/resources');
router.put('/resources/:id');
router.delete('/resources/:id');*/

module.exports=router;