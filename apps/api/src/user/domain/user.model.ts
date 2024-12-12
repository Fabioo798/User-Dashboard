
export default class User {
  constructor (
  public id: number,
  public email: string,
  public password: string,
  public name: string,
  public role: "admin" | "user" = "user"
  ) {}

  toDatabase(): Record<string, unknown> {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
    };
  }
}
