import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class User {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public fullname: string;

  @Column()
  public age: number;
}

export default User;