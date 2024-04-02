import { IconButton, Paper, Typography } from "@mui/material";
import { Delete, Edit } from '@mui/icons-material';

export interface Book {
  id: number,
  title: string,
  author: string,
  genre: string,
  description: string
}

interface BookProps {
  book: Book,
  handleEdit: () => void;
  handleDelete: () => void;
}

export function BookElement(props: BookProps) {
  const { book, handleEdit, handleDelete } = props;

  return (
    <Paper elevation={2} sx={{ p: 2 }} className="book">
      {renderInputFields()}
      {renderActionButtons()}
    </Paper>
  );

  function renderInputFields() {
    return <>
      <Typography variant="h4" gutterBottom>
        {book.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        by {book.author}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Genre: {book.genre}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {book.description}
      </Typography>
    </>
  }

  function renderActionButtons() {
    return <>
      <div className="book-action-buttons">
        <IconButton
          aria-label="close"
          onClick={handleEdit}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          aria-label="close"
          onClick={handleDelete}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Delete />
        </IconButton>
      </div>
    </>
  }
}
