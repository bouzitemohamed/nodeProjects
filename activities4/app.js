const {ajouterContact,listerContacts}=require('./contactservice');
const formaterContact=require('./utils/format');
ajouterContact("alice","067584945");
ajouterContact("bob","069588654");
listerContacts().forEach(c => console.log(formaterContact(c)));