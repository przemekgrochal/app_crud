// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     Unique,
//     CreateDateColumn,
//     UpdateDateColumn
//   } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcrypt-nodejs";
import { v4 as uuidv4 } from 'uuid';

import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
 
@Entity()
// @Unique(["username"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({default: 'TypeOrmDefaultRole'})
    role: string;

    @Column({default:`email_${uuidv4()}@example.com`})
    email: string;
  
    @Column({default: 'TypeOrmDefaultName'})
    name: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    token: string;
  
    @Column({ nullable: true })
    reset_password_token: string;

    @Column({ nullable: true })
    reset_password_expires: string;

    @Column({ nullable: true })
    created_at: String;
  
    @Column({ nullable: true })
    updated_at: String;

    @Column({ nullable: true })
    deleted_at: String;

    hashPassword() {
      let salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
    }
  
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}