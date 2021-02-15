import { Server } from "miragejs";

export const CreateServer = ({ environment = "test" } = {}) => {
  let server = new Server({
    environment,
    routes() {
      this.get("api/login-data", (): any => {
        return JSON.parse(localStorage.getItem("loginCred")!);
      });
      this.post("api/login-post", (schema, request): any => {
        const data = JSON.parse(localStorage.getItem("loginCred")!);
        const attr = JSON.parse(request.requestBody);
        data.push(attr);
        localStorage.setItem("loginCred", JSON.stringify(data));
        return localStorage.getItem("loginCred");
      });
    },
  });
  return server;
};
