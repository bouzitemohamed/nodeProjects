/**
module.exports = function → exporte une seule fonction ou valeur.

module.exports = { ... } → exporte un objet contenant plusieurs éléments.
 */
const {saluer,dirAuRevoir }= require('./greet.js');
console.log(saluer('mohammed'));
console.log(dirAuRevoir('youssef'));
