export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserProfile {
    first_name: string;
    last_name: string;
    shipping_address: string;
    phone_number: string;
    avatar_url: string;
    user: User;
}