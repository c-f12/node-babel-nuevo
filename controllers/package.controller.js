const packageModel = require('../models/packages.model');

function list(){
     return packageModel.list();
}

function create(pkg){
    return packageModel.create(pkg);
}


module.exports = {
    list
};