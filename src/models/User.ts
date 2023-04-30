import { Event } from './Events';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { Model } from './Model';
import { Collection } from './Collection';

export interface UserPropTypes {
    name?: string;
    age?: number;
    id?: number;
}

const rootUrl = 'http://localhost:3000/users/';

export class User extends Model<UserPropTypes>{
    static buildUser(attrs: UserPropTypes): User {
        return new User(
            new Attributes<UserPropTypes>(attrs),
            new Event(),
            new Sync<UserPropTypes>(rootUrl),
        );
    }

    static buildUserCollection(): Collection<User, UserPropTypes> {
        return new Collection<User, UserPropTypes>('http://localhost:3000/users', (json: UserPropTypes) => {
            return User.buildUser(json);
        });
    }
}