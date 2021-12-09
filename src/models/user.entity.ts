import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class User {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public fullname: string;

  @Column()
  public username: string;

  @Column()
  public age: number;

  @Column()
  public password: string;
}

export default User;