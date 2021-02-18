export interface IDialogComponent {
  openClose: boolean;
  setOpenClose: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogBoxData: React.Dispatch<React.SetStateAction<string>>;
}
