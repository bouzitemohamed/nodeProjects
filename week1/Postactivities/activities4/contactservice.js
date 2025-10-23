const contacts = [];
function ajouterContact(nom,tel){
    contacts.push({nom,tel});
}
function listerContacts(){
    return contacts;
}
module.exports={
    ajouterContact,
    listerContacts
}