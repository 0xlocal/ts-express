import express from "express";
import { createConnection } from "typeorm";
import { PostController } from "./controller/post.controller";

class Index {
  private app: express.Application;
  private postController: PostController;

  constructor() {
    this.app = express();
    this.configuration();
    this.connectionDB();
  }

  public configuration() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  public async connectionDB() {
    await createConnection().then(async () => {
      this.app.get("/", (req, res) => {
        res.send("Hello World!");
      });

      this.postController = new PostController();

      this.app.use("/api/posts/", this.postController.router);
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
