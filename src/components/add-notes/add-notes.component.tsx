import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { INotesComponent } from "./add-notes";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginData } from "../../store/login.reducer";
import "./add-notes.styles.css";
import { getYourDiaries } from "../../store/diaries.reducer";

const AddNotes: React.FC<INotesComponent> = ({
  openClose,
  setOpenClose,
  performAction,
  setChangeState,
  changeState,
  diaryName,
  diaryType,
}) => {
  const [dialogData, setDialogData] = useState<string>("");
  const [textboxData, setTextboxData] = useState<string>("");
  const dispatch = useDispatch();
  const { userData } = useSelector(selectLoginData);

  const handleSubmitData = () => {
    let dataChange = null;
    dataChange = dispatch(
      performAction({
        diary_name: diaryName,
        diary_type: diaryType,
        note_title: dialogData,
        note_detail: textboxData,
        user_data: userData,
      })
    );
    dataChange &&
      dataChange.then(() => {
        dispatch(getYourDiaries(userData.id));
        setChangeState(!changeState);
      });
    setOpenClose(false);
  };

  const handleClose = () => {
    setOpenClose(false);
  };

  return (
    <div>
      <Dialog open={openClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give Your Note a title then add details in your favorite note!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={`Enter Note title`}
            type="text"
            fullWidth
            onChange={(e) => {
              setDialogData(e.target.value);
            }}
          />
          <br />
          <br />
          <textarea
            className="add-notes__textbox-detail"
            placeholder={`Detail Goes Here...`}
            rows={4}
            onChange={(e) => {
              setTextboxData(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={dialogData.length <= 2 || textboxData.length <= 10}
            onClick={handleSubmitData}
            color="primary"
          >
            Add Note
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNotes;
