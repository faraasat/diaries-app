import { Server } from "miragejs";

export const CreateServer = ({ environment = "test" } = {}) => {
  let server = new Server({
    environment,
    routes() {
      this.get("api/login-data", (): any => {
        return JSON.parse(localStorage.getItem("loginCred")!);
      });
      this.post("api/login-post", (schema, request): any => {
        let data = JSON.parse(localStorage.getItem("loginCred")!);
        const attr = JSON.parse(request.requestBody);
        data = [...data, attr];
        localStorage.setItem("loginCred", JSON.stringify(data));
        console.log(localStorage.getItem("loginCred"));
        return localStorage.getItem("loginCred");
      });
      this.get("api/diaries-data", (): any => {
        return JSON.parse(localStorage.getItem("allDiariesData")!);
      });
      this.post("api/diaries-post", (schema, response): any => {
        let diaries = JSON.parse(localStorage.getItem("allDiariesData")!);
        const resData = JSON.parse(response.requestBody);
        const youDiary = diaries.filter((datum: any) => {
          return datum.id === resData.user_data.id;
        });

        const diaryData = {
          diary_name: resData!.diary_name!,
          diary_content: [
            {
              note_name: "",
              note_content: "",
            },
          ],
        };

        if (youDiary.length <= 0) {
          const diaryInsertionData = {
            id: resData.user_data.id,
            name: resData.user_data.username,
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
          };

          resData.diaryType === "private"
            ? (diaryInsertionData.private = [
                ...diaryInsertionData.private!,
                diaryData,
              ])
            : (diaryInsertionData.public = [
                ...diaryInsertionData.public!,
                diaryData,
              ]);
          diaries = [...diaries, diaryInsertionData];
          localStorage.setItem("allDiariesData", JSON.stringify(diaries));
          return diaries;
        } else {
          resData.diaryType === "private"
            ? (youDiary[0]!.private = [...youDiary[0]!.private!, diaryData])
            : (youDiary[0]!.public = [...youDiary[0]!.public!, diaryData]);

          let allExceptYourDiary = diaries.filter((datum: any) => {
            return datum.id !== resData.user_data.id;
          });

          allExceptYourDiary = [...allExceptYourDiary, youDiary[0]];
          localStorage.setItem(
            "allDiariesData",
            JSON.stringify(allExceptYourDiary)
          );
          return allExceptYourDiary;
        }
      });
    },
  });
  return server;
};
