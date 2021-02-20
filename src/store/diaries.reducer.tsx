import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAllDiaries, IPublicDiaries, IYourDiaries } from "./diaries";

export const getDiariesData: any = createAsyncThunk(
  "data/getDiariesData",
  async (data, thunkAPI) => {
    const response = await fetch("api/diaries-data");
    return await response.json();
  }
);

export const postDiaryName: any = createAsyncThunk(
  "data/postDiaryName",
  async (data, thunkAPI) => {
    const response = await fetch("api/diaries-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
);

export const postDiaryNote: any = createAsyncThunk(
  "data/postDiaryNote",
  async (data, thunkAPI) => {
    const response = await fetch("api/note-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
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

export const InitialYourDiariesData: IYourDiaries[] = [
  {
    diary_name: "",
    diary_type: "",
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
    yourDiaries: InitialYourDiariesData,
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

    getYourDiaries: (state, action) => {
      state.diaryLoadingState = true;
      state.yourDiaries = InitialYourDiariesData;

      const youDiary = Object.entries(state.allDiariesData).filter(
        (datum: any) => {
          return datum[1].id === action.payload;
        }
      );

      if (youDiary[0]?.length <= 0) return;

      youDiary!.map(([index, diaries]: [any, any]) => {
        return diaries.public.map((publicDiaries: any) => {
          const yourObj: IYourDiaries = {
            diary_type: "public",
            diary_name: publicDiaries.diary_name,
            diary_content: publicDiaries.diary_content,
          };
          state.yourDiaries = [...state.yourDiaries, yourObj];
          return yourObj;
        });
      });

      youDiary!.map(([index, diaries]: [any, any]) => {
        return diaries.private.map((publicDiaries: any) => {
          const yourObj: IYourDiaries = {
            diary_type: "private",
            diary_name: publicDiaries.diary_name,
            diary_content: publicDiaries.diary_content,
          };
          state.yourDiaries = [...state.yourDiaries, yourObj];
          return yourObj;
        });
      });

      state.diaryLoadingState = false;
    },
  },
  extraReducers: {
    [getDiariesData.fulfilled]: (state, action) => {
      state.allDiariesData = action.payload;
      state.diaryLoadingState = false;
    },
    [getDiariesData.reject]: (state, action) => {
      console.log("getDiariesData Fetch Data Failed");
      state.diaryLoadingState = false;
    },
    [getDiariesData.pending]: (state, action) => {
      console.log("getDiariesData Fetch Data Pending");
      state.diaryLoadingState = true;
    },
    [postDiaryName.fulfilled]: (state, action) => {
      state.allDiariesData = action.payload;
      state.diaryLoadingState = false;
    },
    [postDiaryName.reject]: (state, action) => {
      console.log("postDiaryName Fetch Data Failed");
      state.diaryLoadingState = false;
    },
    [postDiaryName.pending]: (state, action) => {
      console.log("postDiaryName Fetch Data Pending");
      state.diaryLoadingState = true;
    },
    [postDiaryNote.fulfilled]: (state, action) => {
      state.allDiariesData = action.payload;
      state.diaryLoadingState = false;
    },
    [postDiaryNote.reject]: (state, action) => {
      console.log("postDiaryNote Fetch Data Failed");
      state.diaryLoadingState = false;
    },
    [postDiaryNote.pending]: (state, action) => {
      console.log("postDiaryNote Fetch Data Pending");
      state.diaryLoadingState = true;
    },
  },
});

export default DiariesReducer;

export const {
  getPublicDiaries,
  diariesData,
  getYourDiaries,
} = DiariesReducer.actions;

export const selectDiariesData = (state: any) => ({
  diaryLoadingState: state.diaries.diaryLoadingState,
  allDiariesData: state.diaries.allDiariesData,
  allPublicDiaries: state.diaries.allPublicDiaries,
  yourDiaries: state.diaries.yourDiaries,
});
