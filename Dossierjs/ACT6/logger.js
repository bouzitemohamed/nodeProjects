// kanjibo module dial fs bach nkhdmo m3a fichiers
const fs = require("fs");

// kanjibo EventEmitter bach nkhdmo events
const EventEmitter = require("events");

// kancrei class Logger li katsajel messages f fichier w katdir event
class Logger extends EventEmitter {
  // fonction li katlogi message
  log(message) {
    // kanktbo message f fichier "log.txt", kol message f ligne jdida
    fs.appendFileSync("log.txt", message + "\n");

    // kol ma ttsajal message, kan3yto l'event "messageLogged" w n3tio data
    this.emit("messageLogged", { message, date: new Date() });
  }
}

// kanexportiw class bach nst3mloh f fichiers okhrin
module.exports = Logger;
