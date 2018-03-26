//Nos conectamos a la base de datos:
//El nombre de la bbdd es packages (debería ser en singular)
const mongoose = require('mongoose');

/* Si lo hace strict:true (por defecto esta inicializado a true) - ignora todos
los campos que no estén en el modelo que lo estamos pasando.
Strict: false - acepta los otros campos que le pases.
*/
const Package = mongoose.model('packages', {
    name: String,
    description: String,
    version: String,
    license: String,
} /* { strict:false } */);

//GET:
function list(){
    return Package.find({});
    //return Package.find({}).lean().exec(); -> pasas todos los campos del objeto
}

//POST:
function create(pkg){
    return new Package(pkg).save()
    .catch((error) => {
        if (error.code === 11000) {
            //throw new Error(error.message);
            const err = new Error('Duplicate');
            err.status = 411;
            throw err;
        }
        throw error; //capturamos aqui el resto de errores
    })
}

module.exports = {
    list,
    create
};


/* 
Sin base de datos:

function list(){
    return new Promise((resolve) => {
        resolve([]);
    });
} 

Con bbdd: (No es necesario poner new Promise, el método find ya la devuelve):

function list(){
    //Hay que poner el return para que te devuelva la promesa, sino devuelve undefined:
    return new Promise((resolve) => {
        resolve(Package.find());
    });
}

*/