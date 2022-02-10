const { Tarea } = require('./tarea');

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listadoArr() {
        const listado = [];
        Object.keys( this._listado ).forEach( key => {
            listado.push( this._listado[key] );
        })
        return listado;
    }

    crearTarea( desc ) {
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    };

    cargarTareasFromArray( tareas = []) {
        for (const tarea of tareas) {
            let instTarea = new Tarea( tarea.desc );
            instTarea.id = tarea.id;
            instTarea.completadaEn = tarea.completadaEn;
            this._listado[tarea.id] = instTarea;
        }
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach(( tarea, i) => {
            const estado = ( tarea.completadaEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log(`${( i + 1 ).toString().green}. ${ tarea.desc } :: ${ estado }`);
        })
    }

    listarPendientesCompletadas( completadas = true ) {
        console.log();
        let index = 1;
        this.listadoArr.forEach(( tarea, i) => {
            let estado = '';
            const { desc, completadaEn } = tarea;

            if ( completadas ) {

                estado = 'Completada'.green;

                if ( completadaEn ) {
                    console.log(`${index.toString().green}. ${ desc } :: ${ estado } en ${ completadaEn }`);
                    index += 1;
                };
            } else {

                estado = 'Pendientes'.red;

                if ( !completadaEn ) {
                    console.log(`${index.toString().green}. ${ desc } :: ${ estado }`);
                    index += 1;
                };
            }
        })
    }

    borrarTarea( id = '' ) {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    toggleCompletadas( ids = [] ) {
        ids.forEach(id => {

            const tarea = this._listado[id];

            if ( !tarea.completadaEn ) {
                tarea.completadaEn = new Date().toISOString();
            }
        })

        Object.keys( this._listado ).forEach(id => {
            
            const tarea = this._listado[id];

            if (!(ids.includes(id))) {
                tarea.completadaEn = null;
            }
        })
    }
}

module.exports = {
    Tareas
}