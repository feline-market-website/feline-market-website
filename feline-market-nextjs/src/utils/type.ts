export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    user_profile: UserProfile;
    roles: UserRole[];
}

export interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    shipping_address: string;
    phone_number: string;
    avatar_url: string;
    user: User;
}

export interface UserRole {
    id: string;
    role: string;
}

export interface VendorType {
    id: string;
    name: string;
    description: string;
    logo_url: string;
    created_at: string;
    updated_at: string;
}