const librosRouter = require("express").Router();
const Libros = require("../models/libros");

// ruta get one
librosRouter.get("/", (req, res) => {
  Libros.findAll().then((libros) => res.status(200).send(libros));
});

// get All titles with same letter
librosRouter.get("/findByLetter", (req, res) => {
  const { titulo } = req.body;
  const titleLetter = titulo[0];
  console.log(titleLetter);
  Libros.findByLetter(titleLetter).then((libros) =>
    res.status(200).send(libros)
  );
});

// get titles with same author
librosRouter.get("/:bookId", (req, res, next) => {
  Libros.findOne({ where: { id: req.params.bookId } })
    .then((libro) => {
      if (!libro) next("No se ha encontrado ese libro");
      return libro.findByAuthor();
    })
    .then((libros) => {
      return res.send(libros);
    })
    .catch(next);
});

librosRouter.post("/", (req, res) => {
  Libros.create(req.body).then((libros) => res.status(201).send(libros));
});

//ruta put

librosRouter.put("/:id", (req, res, next) => {
  Libros.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(([affectedRows, updated]) => {
      const libro = updated[0];
      res.status(201).send(libro);
    })
    .catch(next);
});

//ruta delete

librosRouter.delete("/:id", (req, res, next) => {
  Libros.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(202))
    .catch(next);
});

module.exports = librosRouter;
