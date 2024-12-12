
export default class User {
  constructor (
    public id: number | null,
    public name: string,
    public email: string,
    public password: string,
    public role: "admin" | "user" = "user",
    public created_at?: string,
    public updated_at?: string
  ) {}

  toDatabase(): Record<string, unknown> {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      created_at: this.created_at || new Date().toISOString().replace('T', ' ').substring(0, 19),
      updated_at: this.updated_at || new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
  }
}
