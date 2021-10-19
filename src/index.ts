import express from "express";
import { createConnection } from "typeorm";

class Index {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configuration();
    this.connectionDB();
  }

  public configuration() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
  }

  public async connectionDB() {
    await createConnection().then(async () => {
      this.app.get("/", (req, res) => {
        res.send("Hello World!");
      });
    });
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server is listening to port ${this.app.get("port")}`);
    });
  }
}

const index = new Index();
index.start();
