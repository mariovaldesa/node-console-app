const { v4: uuidv4 } = require('uuid')

class Tarea {
    id = '';
    desc = '';
    completadaEn = null;

    constructor( desc ) {

        this.desc = desc;
        this.id = uuidv4();
        this.completadaEn = null;
        
    }
}

module.exports = {
    Tarea
}