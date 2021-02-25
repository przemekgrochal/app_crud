interface IUsersApi {
    urlApi: string;
    methods: string;
    headers: any;
    bodyData: any;
}

export const logInApi = async (object: IUsersApi): Promise<any> => {
    try {

        const response = await fetch(
            object.urlApi, 
            {
                method: object.methods,
                headers: object.headers,
                body: object.bodyData ? JSON.stringify(object.bodyData) : null,
            }
        );

        const json =  await response.json();
        const status = await response.status;

        return {status: status, json: json};

    } catch (err) {
        if(window.localStorage.getItem('userToken')){
            window.localStorage.removeItem('userToken');
            window.location.reload();
        }
        console.log(err);
    }
};
