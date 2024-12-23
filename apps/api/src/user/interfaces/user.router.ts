import { Interceptors } from "../../middlewares/interceptors.js";
import ServerRouter from "../../shared/interfaces/interfaces.js";
import { Router } from 'express';
import { UserController } from "./user.controller.js";



export default class UserRouter implements ServerRouter {
  path = '/users';
  interceptor: Interceptors = new Interceptors();
  router: Router = Router();

  constructor(private controller: UserController) {
    this.registerControllers();
  }

  registerControllers(): void {
    this.router.post('/register', this.interceptor.logged, this.interceptor.authorized,  this.controller.register.bind(this.controller));
    this.router.post('/login',  this.controller.login.bind(this.controller));
    this.router.post('/admin/login', this.controller.login.bind(this.controller));
    this.router.get('/',  this.interceptor.logged, this.interceptor.authorized, this.controller.findAllUsers.bind(this.controller));
    this.router.put('/:id', this.interceptor.logged, this.controller.updateUser.bind(this.controller));
    this.router.delete('/:id', this.interceptor.logged, this.interceptor.authorized, this.controller.deleteUser.bind(this.controller));
    this.router.get('/:id', this.interceptor.logged, this.controller.findUser.bind(this.controller));
    this.router.get('/search/user', this.interceptor.logged, this.interceptor.authorized, this.controller.searchUsers.bind(this.controller));
  }
}

