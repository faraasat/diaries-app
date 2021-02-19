export interface IAllDiaries {
  id: string;
  name: string;
  public: [
    {
      diary_name: string;
      diary_content: [
        {
          note_name: string;
          note_content: string;
        }
      ];
    }
  ];
  private: [
    {
      diary_name: string;
      diary_content: [
        {
          note_name: string;
          note_content: string;
        }
      ];
    }
  ];
}

export interface IPublicDiaries {
  name: string;
  diary_name: string;
  diary_content: [
    {
      note_name: string;
      note_content: string;
    }
  ];
}
