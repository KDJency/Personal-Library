import axios from 'axios';
import { Book } from './BookElement';

export async function getBooks(url: string) {
  const { data } = await axios.get(url);
  return data;
}

export async function addBook(postData: Book) {
  const { data } = await axios.post('http://localhost:3001/books', postData);
  return data;
}

export async function updateBook(id: number, updateData: Book) {
  const { data } = await axios.put(`http://localhost:3001/books/${id}`, updateData);
  return data;
}

export function deleteBook(id: number) {
  return axios.delete(`http://localhost:3001/books/${id}`);
}