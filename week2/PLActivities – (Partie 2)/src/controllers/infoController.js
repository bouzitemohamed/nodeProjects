const { json } = require('body-parser');
const infoservices = require('../services/info');
const getProjectInfos=(req,res)=>{
    try{
        const message=infoservices.getInfo();
        res.status(200).json({
            status:'success',
            data:message
        })
    }catch(e){
        res.status(400).json({
            status:'failed',
            message:e
        })
    }
}
module.exports={
    getProjectInfos
};