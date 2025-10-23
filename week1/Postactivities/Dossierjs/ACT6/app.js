// kanjibo module dial http bach nkhlqo serveur
const http = require("http");

// kanjibo class Logger li drt f fichier logger.js
const Logger = require("./logger");

// kancrei object men Logger bach nst3mlo
const logger = new Logger();

// kan3ayto l'event listener 3la l'evenement "messageLogged"
// kol ma ttsajal message, ghadi ytzhar lina f console
logger.on("messageLogged", (data) => 
    console.log("Événement capturé :", data)
);

// kancrei serveur http
const server = http.createServer((req, res) => {
    // kol ma jatch requête, kanlogiw url dialha
    logger.log(`Requête reçue : ${req.url}`);
    // njawb l client b message
    res.end("Requête enregistrée !");
});

// kan9blo serveur 3la port 4000 w kan3ti message f console
server.listen(4000, () => console.log("Serveur sur le port 4000..."));
