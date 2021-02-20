export interface IDialogComponent {
  openClose: boolean;
  setOpenClose: React.Dispatch<React.SetStateAction<boolean>>;
  performAction: any;
  setChangeState: React.Dispatch<React.SetStateAction<boolean>>;
  changeState: boolean;
}

export interface INotesComponent {
  openClose: boolean;
  setOpenClose: React.Dispatch<React.SetStateAction<boolean>>;
  performAction: any;
  setChangeState: React.Dispatch<React.SetStateAction<boolean>>;
  changeState: boolean;
  diaryName: string;
  diaryType: string;
}
