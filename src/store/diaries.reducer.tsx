import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAllDiaries, IPublicDiaries } from "./diaries";

export const getDiariesData: any = createAsyncThunk(
  "data/getDiariesData",
  async (data, thunkAPI) => {
    const response = await fetch("api/diaries-data");
    return await response.json();
  }
);

export const InitialDiariesData: IAllDiaries[] = [
  {
    id: "",
    name: "",
    public: [
      {
        diary_name: "",
        diary_content: [
          {
            note_name: "",
            note_content: "",
          },
        ],
      },
    ],
    private: [
      {
        diary_name: "",
        diary_content: [
          {
            note_name: "",
            note_content: "",
          },
        ],
      },
    ],
  },
];

export const InitialPublicDiariesData: IPublicDiaries[] = [
  {
    name: "",
    diary_name: "",
    diary_content: [
      {
        note_name: "",
        note_content: "",
      },
    ],
  },
];

const DiariesReducer = createSlice({
  name: "diariesData",
  initialState: {
    diaryLoadingState: false,
    allDiariesData: InitialDiariesData,
    allPublicDiaries: InitialPublicDiariesData,
  },
  reducers: {
    diariesData: (state, action) => {
      state.allDiariesData = action.payload;
    },
    getPublicDiaries: (state) => {
      state.allDiariesData.map((diaries: IAllDiaries) => {
        return diaries.public.map((publicDiaries) => {
          const pubObj: IPublicDiaries = {
            name: diaries.name,
            diary_name: publicDiaries.diary_name,
            diary_content: publicDiaries.diary_content,
          };
          state.allPublicDiaries = [...state.allPublicDiaries, pubObj];
          return pubObj;
        });
      });
    },
  },
  extraReducers: {
    [getDiariesData.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.allDiariesData = action.payload;
      state.diaryLoadingState = false;
    },
    [getDiariesData.reject]: (state, action) => {
      console.log("Fetch Data Failed");
      state.diaryLoadingState = false;
    },
    [getDiariesData.pending]: (state, action) => {
      console.log("Fetch Data Pending");
      state.diaryLoadingState = true;
    },
  },
});

export default DiariesReducer;

export const { getPublicDiaries, diariesData } = DiariesReducer.actions;

export const selectDiariesData = (state: any) => ({
  diaryLoadingState: state.diaries.diaryLoadingState,
  allDiariesData: state.diaries.allDiariesData,
  allPublicDiaries: state.diaries.allPublicDiaries,
});
