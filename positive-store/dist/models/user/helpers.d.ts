import { User, UserResponse } from 'types/user';
export declare const formatUserResponse: (userResponse: UserResponse) => User;
export declare const scrubPII: (user: User) => User;
