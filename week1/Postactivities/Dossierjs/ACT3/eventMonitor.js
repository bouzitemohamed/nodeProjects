// Katimporti l module 'events'
const EventEmitter = require('events');

// Kanssawb instance men EventEmitter bach nkhdmo biha
const emitter = new EventEmitter();

// hna kansd3iw .on() bach nsma3o l wa9t li wa7d l événement ytra (b smyto 'utilisateurConnecte')
emitter.on('utilisateurConnecte', (data) => {
    // had fonction kattsala mlli l événement yt3ayet 3lih
    console.log(`Nouvelle connexion : ${data.nom} (${data.id})`);
});

// hna kans3iyto 3la l événement b smyto, w kandir data li bghina nsiftou
emitter.emit('utilisateurConnecte', { id: 1, nom: 'asma' });

/**
 * 1)Si l’écouteur est enregistré après l’émission de l’événement :
   L’événement sera perdu. EventEmitter déclenche l’événement uniquement pour les écouteurs qui sont déjà enregistrés au moment de l’appel de emit.
   2)Oui, tu peux enregistrer plusieurs fonctions pour un même événement, elles seront toutes appelées dans l’ordre d’enregistrement.
 */