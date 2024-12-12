import { NextFunction, Request, Response } from "express";
import UserService from "../application/userService.js";
import { HTTPError } from "../../shared/errors/error.js";
import { Auth } from "../../shared/utils/auth.js";


export class UserController {
  constructor(private userService: UserService) {}

  async register(req:Request, res:Response, next:NextFunction): Promise<void> {
    try {
      const { body } = req.body;

      if(!body.email || !body.password || !body.name || !body.role) {

        throw new HTTPError(400, 'Bad Request', 'Missing required fields');
      }

      req.body.password = await Auth.hash(req.body.password);
      await this.userService.createUser(body);

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  }

  async login(req:Request, res:Response, next:NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if(!email || !password) {
        throw new HTTPError(400, 'Bad Request', 'Missing required fields');
      }

      const user = await this.userService.searchUsers({
        key: 'email',
        value: req.body.email,
      });

      if(user.length === 0) {
        throw new HTTPError(404, 'Not Found', 'User not found');
      }

      const isValid = await Auth.compare(password, user[0].password);

      if(!isValid) {
        throw new HTTPError(401, 'Unauthorized', 'Invalid credentials');
      }

      const token = Auth.createJWT({ id: user[0].id, email: user[0].email, role: user[0].role });

      res.status(200).json({ results: token });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { body } = req;

      const newUser = {
        id,
        ...body,
      };

      await this.userService.updateUser(newUser);

      res.status(200);
      res.json({ ok: true, message: 'User updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await this.userService.deleteUser(Number(id));

      res.status(204);
      res.json({ ok: true, message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async findUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await this.userService.findUser(Number(id));
      res.status(200);
      res.json({ results: response });
    } catch (error) {
      next(error);
    }
  }

  async findAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userService.findAllUsers();
      res.status(200);
      res.json({ results: response });
    } catch (error) {
      next(error);
    }
  }

  async searchUsers(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    if (!email) {
      throw new HTTPError(400, 'Bad Request', 'Missing required fields');
    }
    try {
      const response = await this.userService.searchUsers({ key: 'email', value: email });
      res.status(200);
      res.json({ results: response });
    } catch (error) {
      next(error);
    }
  }
}
