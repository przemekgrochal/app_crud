import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { createConnection, getRepository, Repository, Connection, getConnection }  from "typeorm";
import { User } from "../entity/User";

export class UserController {

    public getAllUser = async (req: Request, res: Response, next: NextFunction) => 
    {
        createConnection().then(async connection => {
            let userRepository = connection.getRepository(User);
            let allUser = await userRepository.find();
            
            connection.close();
        
            res.status(200).json({
                accessToken: req.body.accessToken,
                users: allUser
            });

        }).catch(error => console.log(error));
    };

    public getUserById = async (req: Request, res: Response) => 
    {
        createConnection().then(async connection => {
            const id: number = Number(req.params.id);       
            const userRepository = getRepository(User);

            try 
            {
                const user = await userRepository.findOneOrFail(id, 
                    {
                        select: ["id", "email", "role", "created_at"] 
                    }
                );

                connection.close();
        
                res.status(200).json({
                    accessToken: req.body.accessToken,
                    user: user
                });

            } 
            catch (error) 
            {
                connection.close();
                res.status(404).json({
                    accessToken: req.body.accessToken,
                    message: 'User not found',
                });
            }

        }).catch(error => console.log(error));
    };

    public createNewUser = async (req: Request, res: Response) => 
    {
        createConnection().then(async connection => {
            let user = new User();
            let { name, password, role, email } = req.body;

            user.id = user.id;
            user.role = role ? role : user.role;
            user.email = email ? email : user.email;
            user.name = name ? name : user.name;
            user.password = password ? password : 'default';
            user.created_at = new Date().toISOString();
            user.hashPassword();

            // //Validade if the parameters are ok
            // const errors = await validate(user);
            // if (errors.length > 0) {
            //     res.status(400).send(errors);
            //     return;
            // }

            const userRepository = connection.getRepository(User);
            let isUser: User | null = await userRepository.findOne({ where: { email: user.email } }) || null;

            if(user === null) {
                connection.close();
                res.status(409).json({
                    accessToken: req.body.accessToken,
                    message: 'User email is required',
                });
            }

            if(!isUser) 
            {
                await userRepository.save(user);
                connection.close();
               
                res.status(201).json({
                    accessToken: req.body.accessToken,
                    message: 'User created',
                });  
            } 
            else 
            {
                connection.close();
                res.status(409).json({
                    accessToken: req.body.accessToken,
                    message: 'User is exist',
                });
            }

        }).catch(error => console.log("ERROR FROM UserController.createNewUser: ", error));
    };

    public editUser = async (req: Request, res: Response) => 
    {
        createConnection().then(async connection => {
            const id: number = Number(req.params.id);
            const userRepository = connection.getRepository(User);
            let { name, password, role, email, updated_at } = req.body;

            try 
            {
                let user = await userRepository.findOneOrFail(id);
                user.id = id;
                user.role = role;
                user.email = email;
                user.name = name;
                user.password = password;
                user.updated_at = new Date().toISOString();

                let userArray: Array<User> = await userRepository.find({ where: { email: user.email } });

                if(userArray.length === 0) 
                {
                    await userRepository.save(user);
                    connection.close();
                
                    res.status(201).json({
                        accessToken: req.body.accessToken,
                        message: 'User created',
                    });  
                } 
                else 
                {
                    connection.close();
                    throw 'User email is exist';
                    
                }
            } 
            catch (error) 
            {
                connection.close();
                res.status(404).json({
                    accessToken: req.body.accessToken,
                    message: error ? error : 'User not found',
                });
            }

            //Validate the new values on model
            // user.username = username;
            // user.role = role;
            // const errors = await validate(user);
            // if (errors.length > 0) {
            //     res.status(400).send(errors);
            //     return;
            // }

        }).catch(error => console.log(error));
    };

    public deleteUser = async (req: Request, res: Response) => 
    {  
        createConnection().then(async connection => {
        const id: number = Number(req.params.id);
        const userRepository = getRepository(User);

            try 
            {
                let user = await userRepository.findOneOrFail(id);
                // userRepository.delete(id);
                await userRepository.remove(user);
                connection.close();

                res.status(200).json({
                    accessToken: req.body.accessToken,
                    message: 'User deleted',
                });
            } 
            catch (error) 
            {
                connection.close();
                res.status(404).json({
                    accessToken: req.body.accessToken,
                    message: 'User not found',
                });
            }

        }).catch(error => console.log(error));
    };
};
