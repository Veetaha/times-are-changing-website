import { registerEnumType } from 'type-graphql';

export enum UserRole {
    Guest   = 'Guest',
    Regular = 'Regular',
    Admin   = 'Admin'
}

registerEnumType(UserRole, {
    name: 'UserRole',
    description: `Enumeration that defines users' access level`
});