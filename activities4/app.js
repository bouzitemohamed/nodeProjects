/**
 * 1)
   contactService.js:Gère la logique métier : ajout et liste des contacts (données et traitement).
   utils/format.js:Gère le formatage de l’affichage d’un contact (présentation des données).
   app.js:C’est le point d’entrée de l’application : il coordonne les autres modules, exécute la logique et affiche le résultat.
   *2)
   Parce que cela suit le principe de séparation des responsabilités (Separation of Concerns).
   Chaque fichier a une tâche précise et indépendante :
   Le formatage peut changer sans casser la logique métier.
   La logique (ajout/liste) peut évoluer sans toucher l’affichage.
   Le point d’entrée reste simple et clair.
   *3)
   Réutilisabilité,Évolutivité,Testabilité,Lisibilité
 */
const {ajouterContact,listerContacts}=require('./contactservice');
const formaterContact=require('./utils/format');
ajouterContact("alice","067584945");
ajouterContact("bob","069588654");
listerContacts().forEach(c => console.log(formaterContact(c)));