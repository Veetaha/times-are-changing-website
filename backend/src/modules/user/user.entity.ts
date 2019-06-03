import { Nullable      } from 'ts-typedefs';
import { ObjectType, Field } from 'type-graphql';
import { 
    Entity, CreateDateColumn, UpdateDateColumn, Column 
} from 'typeorm';

import { limits        } from '@common/constants';
import { StringColumn  } from '@utils/orm/decorators/string-column.decorator';

import { UserRole      } from './user-role.enum';
import { StringField, DateField } from '@utils/gql/decorators/explicit-type-field.decorator';

@ObjectType()
@Entity()
export class User {
    /**
     * Unique identifier 
     */
    @StringColumn(limits.user.login, { primary: true })
    @StringField({ description: "Unique user identifier."  })
    login!: string;

    @CreateDateColumn() 
    @DateField({ description: "Date when this account was created." })
    creationDate!: Date;

    @UpdateDateColumn() 
    @DateField({ description: "Date when this account was updated last time." })
    lastUpdateDate!: Date;

    @Column({
        type:    'enum',
        enum:    UserRole,
        default: UserRole.Regular
    })
    @Field(_type => UserRole, { description: "Defines user access level role." })
    role = UserRole.Regular;

    @StringColumn(limits.user.name)
    @StringField({ description: "User name to refer to him/her." })        
    name!: string;
    
    @Column({ select: false })        
    passwordHash?: string;

    @StringColumn(limits.imgId, { nullable: true })
    @StringField({
        nullable: true,
        description: 
        "User avatar picture url, or null of was not set. " +
        "This is currently an `uploadcare` image uuid."
    })
    avatarImgId?: Nullable<string>;

    isAdmin() {
        return this.role === UserRole.Admin;
    }

    
}