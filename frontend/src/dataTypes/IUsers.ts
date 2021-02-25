export interface IUsers {
    result: {
        id: number;
        first_name: string;
        last_name: string;
        gender: string;
        dob: string | number;
        email: string;
        phone: string | number;
        website: string;
        address: string;
        status: string;
        _links: {
            self: {
                href: string;
            };
            edit: {
                href: string;
            };
            avatar: {
                href: string;
            };
        };
    };
    _meta: {
        success: boolean;
        code: number;
        message: string;
        totalCount: number;
        pageCount: number;
        currentPage: number;
        perPage: number;
        rateLimit: {
            limit: number;
            remaining: number;
            reset: number;
        };
    };
}
