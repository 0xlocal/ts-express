import { AuthenticationController } from "./controller/authentication.controller";
import { PostController } from "./controller/post.controller";

export const Routes = [new AuthenticationController(), new PostController()];
