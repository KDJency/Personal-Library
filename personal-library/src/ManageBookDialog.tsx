import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from "@mui/material";
import { useEffect } from "react";
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';

interface ManageBookDialogProps {
  open: boolean;
  dialogValues: any;
  dialogType: string;
  onClose: (values: any, type: string) => void;
}

export function ManageBookDialog(props: ManageBookDialogProps) {
  const { onClose, open, dialogValues, dialogType } = props;

  const handleClose = () => {
    onClose({}, dialogType);
  };

  const formik = useFormik({
    initialValues: dialogValues,
    onSubmit: values => {
      onClose({...values, ...dialogValues.id}, dialogType);
    },
  });

  useEffect(() => {
    async function setInitialValues() {
      await formik.setValues(dialogValues);
    };
    setInitialValues();
  }, [dialogValues]);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        component: 'form',
        onSubmit: () => { formik.handleSubmit() },
      }}
    >
      <DialogTitle sx={{ m: 0, px: 3, pb: 0, pt: 3 }}>
        {dialogType === 'add' ? 'Add' : 'Edit'} Book
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ m: 0, p: 3 }}>
        <div className="dialog-form">
          <TextField
            id="title"
            className="input-field"
            label="Title"
            variant="outlined"
            required
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.title} />
          <TextField
            id="author"
            className="input-field"
            label="Author"
            variant="outlined"
            required
            onChange={formik.handleChange}
            value={formik.values.author} />
          <TextField
            id="genre"
            className="input-field"
            label="Genre"
            variant="outlined"
            required
            onChange={formik.handleChange}
            value={formik.values.genre} />
          <TextField
            id="description"
            className="input-field"
            label="Description"
            variant="outlined"
            multiline
            required
            rows={4}  
            onChange={formik.handleChange}
            value={formik.values.description} />
        </div>
      </DialogContent>
      <DialogActions sx={{ m: 0, px: 3, pb: 3, pt: 0 }}>
        <Button type="submit" variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}