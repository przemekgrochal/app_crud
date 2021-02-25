import { fetchData } from '../api/index';
import { IUser } from '../dataTypes/IUser';
import { IResponseApi } from '../dataTypes/IResponseApi';
import { isExpired, decodeToken } from "react-jwt";
import { http } from "../config";

export class Auth {
    
    private urlLoginApi: string = `${http}/auth/login`;
    private urlRegisterApi: string = `${http}/auth/register`;
    private userApi: string = `${http}/api/user`;

    public static logIn = async (email:string, password:string): Promise<any> => 
    {  
        return (
            await fetchData.logInApi({

                urlApi: new Auth().urlLoginApi,
                methods: 'POST',

                headers: {
                    ['Content-Type']: 'application/json',
                },

                bodyData: {
                    email: email,
                    password: password
                },

            }).then((response:IResponseApi) => {

                if(!response.json.message) {
                    window.localStorage.setItem("userToken", response.json.accessToken);
                    return response
                }

                return response;

            }).catch(error => {

                throw error
            })
        );
    }

    public static checkAuth = async () => 
    {
        let userToken: string | null =  window.localStorage.getItem("userToken");

        if(userToken) 
        {
            const decodedToken = decodeToken(userToken);
            const isTokenExpired = isExpired(userToken);
            if((decodeToken !== null) && (isTokenExpired === false)) {
   
                return(fetchData.authApi({
    
                    urlApi: new Auth().userApi + `/${decodedToken.userId}`,
                    methods: 'GET',
    
                    headers: {
                        ['Content-Type']: 'application/json',
                        ['Authorization']: `Bearer ${userToken}`,
                    },
    
                }).then((response:any) => {

                    if(response) {
                        if(response.json.accessToken) {
                            window.localStorage.setItem("userToken", response.json.accessToken);
                            return response;
                        }
                    }
                    
                    return false;
    
                }).catch(error => {
                    throw error
                }));
            }
        } 

        return false;
    }

    public static logOut = async () => 
    {
        await window.localStorage.removeItem("userToken");
    }

    public static register = async (email:string, password:string): Promise<any> => 
    {  
        return (
            await fetchData.registerApi({

                urlApi: new Auth().urlRegisterApi,
                methods: 'POST',

                headers: {
                    ['Content-Type']: 'application/json',
                },

                bodyData: {
                    email: email,
                    name: '',
                    role: '',
                    password: password
                },

            }).then((response:IResponseApi) => {

                // if(!response.json.message) {
                //     window.localStorage.setItem("userToken", response.json.accessToken);
                //     return response
                // }

                // console.log(response);

                return response;

            }).catch(error => {

                throw error
            })
        );
    }
}