import { Server } from "miragejs";
import loginData from "../data/login-data.json";

export const CreateServer = ({ environment = "test" } = {}) => {
  let server = new Server({
    environment,
    routes() {
      this.get("api/login-data", (): any => {
        return loginData;
      });
    },
  });
  return server;
};
