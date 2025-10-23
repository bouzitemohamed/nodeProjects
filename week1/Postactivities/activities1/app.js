/* 
1)Dans Node.js (et JavaScript en général), 
si plusieurs fichiers déclarent des variables, 
fonctions ou classes portant le même nom, 
elles peuvent entrer en conflit — mais cela dépend du contexte.
2)dnas un projet reale Plusieurs développeurs travaillent sur le même code.
Certains peuvent déclarer des variables ou fonctions avec les mêmes noms,
est va creer un probleme.
3)Node.js résout ce problème il utilise un système de modules,
 basé sur le CommonJS (et aussi les modules ES depuis ECMAScript 2015).
*/
const PI=3.14;
function calculerAire(rayon){
    return PI * rayon * rayon;
}
console.console.log(calculerAire(2));

const PI=3.14;
function calculerAire(rayon){
    return PI * rayon * rayon;
}
console.console.log(calculerAire(2));

