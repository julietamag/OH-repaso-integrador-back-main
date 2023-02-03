const S= require('sequelize')
const db= require('../db')

class Libros extends S.Model{
    //metodo de clase
    static findByLetter = function(letter){
        return Libros.findAll({where: {
            titulo: {
                [S.Op.startsWith]:letter
             }
        }})
    };
    //metodo de instancia
     findByAuthor() {
        return Libros.findAll({where: {
            id: {
                [S.Op.not]: this.id,
              },
            autor: {
                [S.Op.like]: this.autor
             }
        }})
    }
}





Libros.init({
    titulo:{
        type: S.STRING
    },
    autor:{
        type: S.STRING 
    },
    ventas:{
        type: S.BIGINT
    }
},{sequelize:db, modelName:'libros'})

//hook
Libros.addHook('beforeValidate', (libros, options) => {
    if(libros.ventas > 30000) {
        libros.titulo += ' Best Seller'
    }
})

module.exports= Libros;