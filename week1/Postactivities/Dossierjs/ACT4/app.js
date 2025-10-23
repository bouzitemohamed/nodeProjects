// Katjib la classe Logger men fichier logger.js
const Logger = require('./logger');

// Katcréé instance men Logger bach tkhddem biha
const logger = new Logger();

// Katssma3 l'événement 'mesagelogged' ila t3ayet 3lih mn Logger
logger.on('mesagelogged', (data) => {
    // Ila t3ayet l'événement, kataffichi l'ma3loumat li jat
    console.log('evenement capture', data);
});

// Katktb f console belli l'application bdat
console.log('application demarre');
