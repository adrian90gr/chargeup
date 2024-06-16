import React from "react";
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button,} from "@mui/material";

const ConfirmModalComponent = ({open,onClose,onConfirm,title,description}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModalComponent;
