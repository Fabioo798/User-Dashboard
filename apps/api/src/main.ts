import ExpressServer from "./server/express.server.js";
import UserService from "./user/application/userService.js";
import UserKnexRepository from "./user/infrastructure/user.knex.repo.js"
import { UserController } from "./user/interfaces/user.controller.js";
import UserRouter from "./user/interfaces/user.router.js";


const bootstrap = async () => {

    const userRepository = new UserKnexRepository();
    const userServices = new UserService(userRepository);
    const userController = new UserController(userServices);

    const userRouter = new UserRouter(userController);

    const server = new ExpressServer([userRouter]);
    server.start(4900);
};

bootstrap();
