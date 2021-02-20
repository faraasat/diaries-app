import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IDialogComponent } from "./dialog";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginData } from "../../store/login.reducer";
import "./dialog.styles.css";
import { getYourDiaries } from "../../store/diaries.reducer";

const DialogComponent: React.FC<IDialogComponent> = ({
  openClose,
  setOpenClose,
  performAction,
  setChangeState,
  changeState,
}) => {
  const [dialogData, setDialogData] = useState<string>("");
  const [diaryType, setDiaryType] = useState<string>("private");
  const dispatch = useDispatch();
  const { userData } = useSelector(selectLoginData);

  const handleSubmitData = () => {
    let dataChange = null;
    dataChange = dispatch(
      performAction({
        diary_name: dialogData,
        diaryType: diaryType,
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
          <div className="dialog-component__btn">
            <span className="dialog-component__private-btn">
              <input
                type="radio"
                id="private"
                value="private"
                name="diary-type"
                onClick={() => setDiaryType("private")}
                defaultChecked
              />
              <label htmlFor="private">Private</label>
            </span>
            <span className="dialog-component__public-btn">
              <input
                type="radio"
                id="public"
                value="public"
                onClick={() => setDiaryType("public")}
                name="diary-type"
              />
              <label htmlFor="public">Public</label>
            </span>
          </div>
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
