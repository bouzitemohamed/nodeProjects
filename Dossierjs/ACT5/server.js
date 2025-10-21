const http = require('http');

// hadi katcree serveur  b Node.js
const server = http.createServer((req, res) => {

  // ila dakhl l'utilisateur l '/' 
  if (req.url === '/') {
    // nktbou lih message b text
    res.write('Bla bienvenu f serveur dyalna Node.js ');
    res.end(); // hna kanm7ssmo l réponse
  } 
  
  // ila dakhl l '/api/etudiants'
  else if (req.url === '/api/etudiants') {
    // n3tiwh code 200 ok
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // nkhdmo array dyal smiyat w n7awlo JSON
    res.end(JSON.stringify(['Asma', 'Youness', 'Oussama']));
  } 
  
  // ila chi haja ma 3andnach f routes
  else {
    // 404 = page ma kaynach
    res.writeHead(404);
    res.end('Page ma kaynach ');
  }
});

// hna kan9olo l serveur ybda ytsana f port 3000
server.listen(3000, () => {
  console.log('Serveur khdem f port 3000 ');
});
