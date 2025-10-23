const os = require('os'); // 'os' katkhlliina nkhdmo m3a les infos dyal système (ordinateur, mémoire, etc.)

// kataffichi l système d’exploitation (Windows, Linux, macOS...)
console.log(`Platform: ${os.platform()}`);

// kataffichi l architecture (b7al x64, arm, etc.)
console.log(`Architecture: ${os.arch()}`);

// kataffichi ch7al mn cœur kayn f CPU (processor)
console.log(`CPU: ${os.cpus().length} cœur`);

// kataffichi ch7al mn mémoire totale kayna f PC (en bytes)
console.log(`Mémoire totale: ${os.totalmem()}`);

// kataffichi ch7al mn mémoire mazal libre (en bytes)
console.log(`Mémoire libre: ${os.freemem()}`);

// kataffichi ch7al mn wa9t l système khddam (en heures)
console.log(`Uptime (f sa3at): ${(os.uptime() / 3600).toFixed(2)}`);

/**
 * 1)
 * os.platform():Le système d’exploitation sur lequel Node.js tourne ex:"win32", "linux", "darwin" (macOS)
   os.arch():L’architecture du processeur de la machine
 * 2)
   os.platform() et os.arch() permettent de détecter le système 
   d’exploitation et l’architecture du processeur, 
   utile pour adapter le comportement du logiciel 
   selon l’environnement. Par exemple:
   pour afficher un tableau de bord système ,
   ou choisir la bonne version d’un binaire natif.
 */