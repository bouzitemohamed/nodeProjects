// Katimporti l module 'events'
const EventEmitter = require('events')

// Kansawb class smitha Logger li kat hériti (extends) men EventEmitter
// b had tariqa, Logger wla fih l9odra y3ayet w ytsana les événements
class Logger extends EventEmitter {
    // had la fonction log katakhod message
    log(message) {
        // katktb l message f console
        console.log('log:', message)
        // w mn b3d kat3ayet 3la événement smito 'messagelogged'
        // w katsift m3ah objet fih l message w la date
        this.emit('messagelogged', { message, date: new Date() })
    }
}

// hna kansift l class Logger bach l fichier akhor y9dar yimportiha w yst3mlha
module.exports = Logger
