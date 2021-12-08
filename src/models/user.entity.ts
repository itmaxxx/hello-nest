import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class User {
  @PrimaryColumn()
  public id?: number;

  @Column()
  public fullname: string;

  @Column()
  public age: number;
}

export default User;