import express from "express";
import { createConnection } from "typeorm";
import { AuthenticationController } from "./controller/authentication.controller";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import config from "./config/db.config";
import { UserController } from "./controller/user.controller";
import morgan from "morgan";
import * as rfs from "rotating-file-stream";
import path from "path";
import { RoleController } from "./controller/role.controller";
import { CategoryController } from "./controller/category.controller";
import { AuthorController } from "./controller/author.controller";
import { initialize } from "./config/initialize";
class Index {
  private basePath: string = "/api";
  private app: express.Application;
  private authenticationController: AuthenticationController;
  private userController: UserController;
  private roleController: RoleController;
  private categoryController: CategoryController;
  private authorController: AuthorController;

  constructor() {
    this.app = express();
    this.configuration();
    this.connectionDB();
  }

  public configuration() {
    const accessLogStream = rfs.createStream("access.log", {
      interval: "1d",
      path: path.join(__dirname, "log"),
    });

    this.app.set("port", process.env.PORT || 3000);
    this.app.use(
      morgan(
        '[:date[clf]] :remote-addr ":method :url HTTP/:http-version" :status :response-time ms',
        {
          stream: accessLogStream,
        }
      )
    );
    this.app.use(morgan("short"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());
  }

  public async connectionDB() {
    await createConnection(config).then(async (connection) => {
      this.app.get("/", (req, res) => {
        res.send("Hello World!");
      });

      // * add controller here
      this.authenticationController = new AuthenticationController();
      this.userController = new UserController();
      this.roleController = new RoleController();
      this.categoryController = new CategoryController();
      this.authorController = new AuthorController();

      this.app.use(this.basePath, this.authenticationController.router);
      this.app.use(this.basePath, this.userController.router);
      this.app.use(this.basePath, this.roleController.router);
      this.app.use(this.basePath, this.categoryController.router);
      this.app.use(this.basePath, this.authorController.router);

      // * error handling
      this.app.use(errorMiddleware);
      initialize(connection);
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
