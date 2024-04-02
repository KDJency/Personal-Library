import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { addBook, deleteBook, getBooks, updateBook } from './service';
import useSWR from 'swr/immutable';
import { Book, BookElement } from './BookElement';
import { ManageBookDialog } from './ManageBookDialog';
import { DeleteBookDialog } from './DeleteBookDialog';
import { Backdrop, CircularProgress } from '@mui/material';

function App() {
  const { data: booksData, isLoading, isValidating, mutate } = useSWR('http://localhost:3001/books', getBooks);
  const emptyDialogValues = {
    title: '',
    author: '',
    genre: '',
    description: ''
  };
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogType, setDialogType] = useState('add');
  const [dialogValues, setDialogValues] = useState(emptyDialogValues);

  const handleClickOpen = () => {
    setDialogValues(emptyDialogValues);
    setDialogType('add');
    setOpen(true);
  };

  const handleClose = async (newValues: Book, type: string) => {
    setOpen(false);
    setOpenDeleteDialog(false);
    let newBookList = booksData;
    if (Object.keys(newValues).length) {
      switch (type) {
        case 'add':
          newBookList = booksData.push(newValues);
          await mutate(addBook(newValues), {
            optimisticData: newBookList,
            rollbackOnError: true,
            populateCache: true,
            revalidate: true
          });
          break;
        case 'edit':
          newBookList = booksData.map((book: Book) => {
            if (book.id === newValues.id) {
              return newValues
            }
            return book
          });
          await mutate(updateBook(newValues.id, newValues), {
            optimisticData: newBookList,
            rollbackOnError: true,
            populateCache: true,
            revalidate: true
          });
          break;
        case 'delete':
          newBookList = booksData.filter((book: Book) => book.id !== newValues.id);
          await mutate(deleteBook(newValues.id), {
            optimisticData: newBookList,
            rollbackOnError: true,
            populateCache: true,
            revalidate: true
          });
          break;
        default:
          break;
      }
    }
  };

  const handleEdit = (book: Book) => {
    setDialogValues(book);
    setDialogType('edit');
    setOpen(true);
  }

  const handleDelete = (book: Book) => {
    setDialogValues(book);
    setDialogType('delete');
    setOpenDeleteDialog(true);
  }

  return (
    <div className='library-container'>
      {renderLoadingScreen()}
      <Button variant="contained" onClick={handleClickOpen}>Add a book to your library</Button>
      {renderManageBookDialog()}
      {renderDeleteBookDialog()}
      <div className='content-container'>
        {booksData?.length ? renderBooklist() : renderEmptyMessage()}
      </div>
    </div>
  );

  function renderLoadingScreen() {
    if (isLoading || isValidating) {
      return <>
        <div className='loader'>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </>
    }
  }

  function renderManageBookDialog() {
    if (open) {
      return <ManageBookDialog open={open} onClose={handleClose} dialogValues={dialogValues} dialogType={dialogType} />;
    }
  }

  function renderDeleteBookDialog() {
    return <DeleteBookDialog open={openDeleteDialog} onClose={handleClose} dialogValues={dialogValues} dialogType={dialogType} />;
  }

  function renderBooklist() {
    return <>
      <Stack spacing={2}>
        {
          booksData?.map((book: Book, index: number) =>
            <BookElement
              key={index}
              book={book}
              handleEdit={() => handleEdit(book)}
              handleDelete={() => handleDelete(book)}
            />
          )
        }
      </Stack>
    </>
  }

  function renderEmptyMessage() {
    return <h4>There are no books in your library. Click the button above to add a book</h4>
  }
}

export default App;
