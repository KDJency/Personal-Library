import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { Book } from "./BookElement";

interface DeleteBookDialogProps {
  open: boolean;
  dialogValues: any;
  dialogType: string;
  onClose: (values: any, type: string) => void;
}

export function DeleteBookDialog(props: DeleteBookDialogProps) {
  const { onClose, open, dialogValues, dialogType } = props;

  const handleClose = (values: any) => {
    onClose(values, dialogType);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 3 }}>
        Are you sure you want to delete this book?
      </DialogTitle>
      <DialogContent sx={{ m: 0, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {dialogValues.title}
        </Typography>
        <Typography variant="h6" gutterBottom>
          by {dialogValues.author}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ m: 0, px: 3, pb: 3, pt: 0 }}>
        <Button onClick={() => handleClose({})} variant="outlined">No</Button>
        <Button onClick={() => handleClose(dialogValues)} variant="contained">Yes</Button>
      </DialogActions>
    </Dialog>
  );
}