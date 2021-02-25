import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import { User } from "../entity/User";
import config from "../config/config";
import { createConnection, getRepository, Repository, Connection, getConnection }  from "typeorm";
import { error } from "winston";
import jwt_decode from "jwt-decode";
import { IUser } from "../types/userType";
import { Console } from "console";

export class AuthController {

  public register = async (req: Request, res: Response, next: NextFunction) => {

    createConnection().then(async connection => {

      let user = new User();
      const userRepository = connection.getRepository(User);
      let isUser: Array<User> = await userRepository.find({ where: { email: req.body.email } })

      // if user does not exist in database add tokens
      if(isUser.length === 0) {
        req.body = {
          ...req.body, 
          accessToken: this.generateAccessToken({ userId: user.id, userEmail: req.body.email }),
        }
      } 

      connection.close();
    }).catch(error => console.log("ERROR FROM AuthController.register: ", error));

    next();
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    createConnection().then(async connection => {

      const userRepository = getRepository(User);
      let user: User = new User();
      let { password, email, } = req.body;

      if (!(email && password)) {
        connection.close();
        res.status(400).send();
      }

      try {
        user = await userRepository.findOneOrFail({ where: { email: email }});
        let accessToken = this.generateAccessToken({ userId: user.id, userEmail: user.email });

        if(user.checkIfUnencryptedPasswordIsValid(password)) 
        {
          await userRepository.save({...user, token: accessToken});
          connection.close();

          res.json({
            email: user.email,
            name: user.name,
            role: user.role,
            avatarUrl: '',
            accessToken: accessToken,
          });

        } 
        else 
        {
          connection.close();
          res.status(401).json({
            message: 'bad password',
          });
        }        
        
      } catch (error) {
        connection.close();
        res.status(401).json({
          message: 'user not found',
        });
      }

    }).catch(error => console.log("ERROR FROM AuthController.login: ", error));
  };

  
  public verifyTokens = (token:any):any => {
    // if the [accessToken] expires then method returns null
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err:any, user:any) => user ? user : null);
  }

  public authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    const HS256 = 'eyJhbGciOiJIUzI1Ni';    
    // !send new expires inside access token

    if(accessToken) 
    {
      if(accessToken.startsWith(HS256))
      {
         createConnection().then(async connection => {
          const userRepository = connection.getRepository(User);
          let userRequest: IUser = jwt_decode(accessToken);
          let isUser: User | null = await userRepository.findOne({ where: { email: userRequest.userEmail } }) || null;

          if(this.verifyTokens(accessToken) && isUser) 
          {    
            req.body = {
              ...req.body, 
              accessToken: this.generateAccessToken({ userId: userRequest.userId, userEmail: userRequest.userEmail })
            } 

            await connection.close();
            next();
            
          } 
            else 
          {
            await connection.close();
            res.status(401).send('unauthorized');
          }

        }).catch(error => {
          console.log("ERROR FROM AuthController.authenticate: ", error);
          res.status(401).send('unauthorized user not found');
        });
      }
    } 
      else 
    {
      res.status(401).send('unauthorized');
    }
  };

  public generateAccessToken(user:any) {    
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { 
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`
      // expiresIn: "10s"
    });
  };
}