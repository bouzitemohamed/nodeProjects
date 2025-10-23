/**
 * 1)
 __filename:Chemin complet du fichier courant (ex. /home/user/app/server.js).
__dirname:Chemin du dossier contenant le fichier courant (ex. /home/user/app).
module:Objet interne créé par Node pour représenter le module courant. Il contient notamment module.exports.
exports:Une référence raccourcie vers module.exports, utilisée pour exporter des valeurs depuis le module.
* 2)
exports est une simple référence à module.exports,
Node continue à exporter module.exports, pas ta nouvelle fonction.
* 3)
Ils ne pointent plus vers la même chose.
C’est module.exports que Node retourne réellement quand on fait require()
 */
console.log(__filename);
console.log(__dirname);
console.log(module);
console.log(exports===module.exports);
exports.direSalut=()=>console.log('salut!');
console.log(module.exports);

