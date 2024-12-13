import { NextFunction, Request, Response } from "express";
import UserService from "../application/userService.js";
import { HTTPError } from "../../shared/errors/error.js";
import { Auth } from "../../shared/utils/auth.js";
import User from "../domain/user.model.js";
import { RequestPlus, TokenPayload } from "../../shared/interfaces/interfaces.js";


export class UserController {
  constructor(private userService: UserService) {}

  async register(req:Request, res:Response, next:NextFunction): Promise<void> {
    try {
      const { email, password, name, role } = req.body;
      console.log(req.body)

      if(!email || !password || !name || !role) {

        throw new HTTPError(400, 'Bad Request', 'Missing required fields');
      }

      req.body.password = await Auth.hash(req.body.password);

      const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
      const user = new User(null, name, email, req.body.password, role || "user", now, now);      console.log(user)

      await this.userService.createUser(user);

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new HTTPError(400, 'Bad Request', 'Missing required fields');
      }

      const user = await this.userService.searchUsers({ key: 'email', value: email });

      if (!user || user.length === 0) {
        throw new HTTPError(404, 'Not Found', 'User not found');
      }
      console.log(user[0])
      const foundUser = user[0];
      console.log("foundUser password + ", foundUser.password)
      console.log("password + ", password)
      if (!(await Auth.compare(password, user[0].password)))
        throw new HTTPError(401, 'Unauthorized', 'Password not match');

      const payload: TokenPayload = {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      };

      const token = Auth.createJWT(payload);

      res.status(200).json({ message: 'Login successful', results: token });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: RequestPlus, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { body } = req;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    body.updated_at = now;

    const currentUserId = req.info.id;
    const currentUserRole = req.info.role;

    console.log(req.info);
    console.log(currentUserRole);

    // Check if the current user is an admin
    if (currentUserRole === 'admin') {
      // Admins can modify any user information
      const newUser = {
        id,
        ...body,
      };

      await this.userService.updateUser(newUser);

      res.status(200).json({ ok: true, message: 'User updated successfully' });
    } else {
      // Non-admin users can only modify their own information
      if (currentUserId !== parseInt(id, 10)) {
        throw new HTTPError(403, 'Forbidden', 'You are not allowed to modify other users\' information');
      }

      // Prevent non-admin users from changing their role
      if (body.role && body.role !== 'user') {
        throw new HTTPError(403, 'Forbidden', 'You are not allowed to change your role');
      }

      const newUser = {
        id,
        ...body,
      };

      await this.userService.updateUser(newUser);

      res.status(200).json({ ok: true, message: 'User updated successfully' });
    }
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
    try {
      const { email } = req.body;
      if (!email) {
        throw new HTTPError(400, 'Bad Request', 'Missing required fields');
      }

      console.log("req body email searchuser + ", email)
      const response = await this.userService.searchUsers({ key: 'email', value: email });
      res.status(200);
      res.json({ results: response });
    } catch (error) {
      console.log("error searchuser + ", error)
      next(error);
    }
  }
}
