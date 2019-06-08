import { Component, Input } from '@angular/core';

import { UserRole } from '@app/gql/generated';

@Component({
    selector:    'app-user-role',
    templateUrl: './user-role.component.html',
    styleUrls:  ['./user-role.component.scss']
})
export class UserRoleComponent {
    @Input() role!: UserRole;
    UserRole = UserRole;
}