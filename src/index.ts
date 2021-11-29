import express from "express";
import { Connection, createConnection } from "typeorm";
import { PostController } from "./controller/post.controller";
import { AuthenticationController } from "./controller/authentication.controller";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { Authority } from "./entity/authority.entity";
import { Role } from "./entity/role.entity";
import config from "./config/db.config";
import { UserController } from "./controller/user.controller";
import morgan from "morgan";
import * as rfs from "rotating-file-stream";
import path from "path";
class Index {
  private basePath: string = "/api";
  private app: express.Application;
  private authenticationController: AuthenticationController;
  private userController: UserController;
  private postController: PostController;

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

      // add controller here
      this.authenticationController = new AuthenticationController();
      this.userController = new UserController();
      this.postController = new PostController();

      this.app.use(this.basePath, this.authenticationController.router);
      this.app.use(this.basePath, this.userController.router);
      this.app.use(this.basePath, this.postController.router);

      // error handling
      this.app.use(errorMiddleware);

      this.initData(connection);
    });
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server is listening to port ${this.app.get("port")}`);
      console.log(`Server Secret is ${process.env.SECRET}`);
    });
  }

  private async initData(connection: Connection) {
    /**
     * Initialize data for Roles and Authorities
     *
     * This code will be executed when server running first time.
     */

    await connection.manager.save(Authority, {
      authorityName: "CREATE_USER",
    });
    await connection.manager.save(Authority, {
      authorityName: "READ_USER",
    });
    await connection.manager.save(Authority, {
      authorityName: "UPDATE_USER",
    });
    await connection.manager.save(Authority, {
      authorityName: "DELETE_USER",
    });

    await connection.manager.save(Authority, {
      authorityName: "CREATE_ROLE",
    });
    await connection.manager.save(Authority, {
      authorityName: "READ_ROLE",
    });
    await connection.manager.save(Authority, {
      authorityName: "UPDATE_ROLE",
    });
    await connection.manager.save(Authority, {
      authorityName: "DELETE_ROLE",
    });

    await connection.manager.save(Authority, {
      authorityName: "CREATE_BOOK",
    });
    await connection.manager.save(Authority, {
      authorityName: "READ_BOOK",
    });
    await connection.manager.save(Authority, {
      authorityName: "UPDATE_BOOK",
    });
    await connection.manager.save(Authority, {
      authorityName: "DELETE_BOOK",
    });

    await connection.manager.save(Authority, {
      authorityName: "CREATE_BOOK_CATEGORY",
    });
    await connection.manager.save(Authority, {
      authorityName: "READ_BOOK_CATEGORY",
    });
    await connection.manager.save(Authority, {
      authorityName: "UPDATE_BOOK_CATEGORY",
    });
    await connection.manager.save(Authority, {
      authorityName: "DELETE_BOOK_CATEGORY",
    });

    await connection.manager.save(Role, {
      roleName: "ADMIN",
    });

    await connection.manager.save(Role, {
      roleName: "MEMBER",
    });
  }
}

const index = new Index();
index.start();
