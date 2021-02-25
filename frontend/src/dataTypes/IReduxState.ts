// export interface IReduxState {
//     code: number;
//     meta: {
//         pagination: {
//             total: number;
//             pages: number;
//             page: number;
//             limit: number;
//         };
//     };

//     users: {
//         id: number;
//         name: string;
//         email: string;
//         gender: string;
//         status: string;
//         created_at: string;
//         updated_at: string;
//     }[];

//     userRoles: string[];
// }

export interface IReduxState {
    stateUsers: {
        code: number;
        meta: {
            pagination: {
                total: number;
                pages: number;
                page: number;
                limit: number;
            };
        };

        users: {
            id: number;
            name: string;
            email: string;
            gender: string;
            status: string;
            created_at: string;
            updated_at: string;
        }[];

        userRoles: string[];
    };
}
