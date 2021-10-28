import express from "express";
import { createConnection } from "typeorm";
import { PostController } from "./controller/post.controller";
import { AuthenticationController } from "./controller/authentication.controller";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";
class Index {
  private basePath: string = "/api";
  private app: express.Application;
  private postController: PostController;
  private authenticationController: AuthenticationController;

  constructor() {
    this.app = express();
    this.configuration();
    this.connectionDB();
  }

  public configuration() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(cookieParser());
  }

  public async connectionDB() {
    await createConnection().then(async () => {
      this.app.get("/", (req, res) => {
        res.send("Hello World!");
      });

      // add controller here
      this.postController = new PostController();
      this.authenticationController = new AuthenticationController();

      this.app.use(this.basePath, this.postController.router);
      this.app.use(this.basePath, this.authenticationController.router);

      // error handling
      this.app.use(errorMiddleware);
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
