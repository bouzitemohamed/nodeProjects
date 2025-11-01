function getInfo(){
    const NAME=process.env.NAME;
    const VERSION=process.env.VERSION;
    const DATE=process.env.DATE;
     return `the version of this projrct :${NAME}  is ${VERSION} created at : ${DATE}  `
}
module.exports={
    getInfo
}