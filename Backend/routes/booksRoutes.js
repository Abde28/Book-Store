import express from 'express';
import { Book } from '../models/bookmodel.js';
const router = express.Router();

//Route to save a new book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Fill all required fields",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route to get all books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({}); 
        return response.status(201).json({ count: books.length, data: books });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route to get one book by id
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(201).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// route to update a book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Fill all required fields",
      });
      }
      const { id } = request.params;
      const result = await Book.findByIdAndUpdate(id, request.body);
      if (!result) {
          return response.status(404).json({ message: 'Book not found' });
      }
      return response.status(200).send({ message: 'book updated successfully' });
      
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route to get a book
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result){return response.status(404).json({message:'Book not found'});}
    return response.status(200).send({message: 'Book deleted successfully'});
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;