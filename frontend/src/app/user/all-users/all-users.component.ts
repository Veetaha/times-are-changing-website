import _ from 'lodash';
import { Nullable } from 'ts-typedefs';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ITdDataTableColumn, TdDataTableSortingOrder } 
from '@covalent/core/data-table';

import { FormService } from '@utils/form.service';
import { TypedFormGroup } from '@app/interfaces';
import { PaginationComponent } from '@app/common/pagination/pagination.component';
import { AuthState     } from '@app/auth/auth.state';
import { ConfigService } from '@app/config/config.service';
import { PageFetcherFn } from '@app/common/pagination/pagination.interfaces';
import { SortingOrder, FilterUnion, UserRole, UserFilterInput, UserSortInput } 
from '@app/gql/generated';

import { UserService } from '../user.service';
import { PagedUser   } from '../user.interfaces';
import { OpenUserProfilePage } from '../user-routing.actions';


type PaginationFilterInput = {
    role: UserRole[]
};

@Component({
    selector:    'app-all-users',
    templateUrl: './all-users.component.html',
    styleUrls:  ['./all-users.component.scss']
})
export class AllUsersComponent {
    /** 
     * Save array of role values in a static property in order to prevent 
     * its recomputing each time this component gets instantiated.
     */
    readonly userRoleFilterValues = [UserRole.Admin, UserRole.Regular];
    readonly client$ = AuthState.selectClient(this.store);
    readonly sortableCols = [ 'role', 'user', 'creationDate' ];
    readonly tableColumnsConfig: ITdDataTableColumn[] = [
        { name: 'role',   label: 'Role', width: 50 },
        { name: 'name',   label: 'User' },
        { name: 'creationDate', label: 'How old kukold' }
    ];
    readonly filtersForm: TypedFormGroup<PaginationFilterInput>;
    readonly dateFormat: string;
    sort: UserSortInput = { creationDate: { ordering: SortingOrder.Desc } };

    @ViewChild('paginator')
    paginator!: PaginationComponent<PagedUser>;

    constructor(
        private readonly users: UserService,
        private readonly store: Store,
        forms:  FormService,
        config: ConfigService
    ) {
        this.dateFormat = config.dateFormat;
        this.filtersForm = forms.createFormGroup({ role: new FormControl });
    }

    changeSorting(colName: keyof UserSortInput, order: TdDataTableSortingOrder) {
        this.sort = { 
            [colName]: { 
                ordering: order === 'ASC' ? SortingOrder.Asc : SortingOrder.Desc 
            } 
        };
        this.paginator.fetchPage({ offset: 0 });
    }

    createFilters(search: Nullable<string>, hasFiltering: boolean): Nullable<UserFilterInput> {
        if (!search && !hasFiltering) {
            return null;
        }
        const { role } = this.filtersForm.value;
        return {
            unionMode: FilterUnion.And,
            props: {
                name: search ? { ilike: search } : null,
                role: hasFiltering && role.length !== 0 ? { in: role } : null
            }
        };
    }

    usersPageFetcher: PageFetcherFn<PagedUser> = ({limit, offset, search, hasFiltering}) => { 
        return this.users.getUsersPage({ 
            limit, 
            offset, 
            sort: this.sort,
            filter: this.createFilters(search, hasFiltering)
        });
    }


    openUserProfilePage(userLogin: string) {
        this.store.dispatch(new OpenUserProfilePage(userLogin));
    }

   
}