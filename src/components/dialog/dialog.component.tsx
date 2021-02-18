import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IDialogComponent } from "./dialog";

const DialogComponent: React.FC<IDialogComponent> = ({
  openClose,
  setOpenClose,
  setDialogBoxData,
}) => {
  const [dialogData, setDialogData] = useState<string>("");

  const handleSubmitData = () => {
    setDialogBoxData(dialogData);
    setOpenClose(false);
  };

  const handleClose = () => {
    setOpenClose(false);
  };

  return (
    <div>
      <Dialog open={openClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give Your Diary a name. After that you will be able to add notes in
            it!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={`Enter Diary Name`}
            type="text"
            fullWidth
            onChange={(e) => {
              setDialogData(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={dialogData.length <= 2}
            onClick={handleSubmitData}
            color="primary"
          >
            Add Diary
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogComponent;
