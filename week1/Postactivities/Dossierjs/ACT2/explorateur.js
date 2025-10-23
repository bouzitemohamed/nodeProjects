const fs = require('fs');   // 'fs' katkhlliina nkhddmo m3a les fichiers
const path = require('path'); // 'path' kat3awnna nkonstruw chemin dyal fichier

// hna kanqraw chno kayn f dossier li fih had fichier
fs.readdir(__dirname, (err, files) => {
  // ila wa9a chi erreur (b7al dossier ma kaynach)
  if (err) return console.error('Kayn chi erreur :', err);

  // kanmchiw fichier b fichier
  files.forEach(file => {
    // kancréé chemin kamel dyal fichier 
    const filePath = path.join(__dirname, file);

    // kanjibo info 3la had fichier 
    fs.stat(filePath, (err, stats) => {
      if (err) return console.error('Erreur f stat:', err);

      // kanprintiw smiya dyal fichier w wa9t l modification
      console.log(`${file} → tbdl f : ${stats.mtime}`);
    });
  });
});
