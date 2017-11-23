import { Injectable } from '@angular/core';

import { User } from './models/user.model';

@Injectable()
export class LocalDataService {

    private user = 'userLoged';

    /** USER */

    getUser(): User {
        return JSON.parse(localStorage.getItem(this.user)) as User;
    }

    getUserPromise(): Promise<any> {
        return new Promise<string>((resolve, reject) => {
            resolve(JSON.parse(localStorage.getItem(this.user)));
        });
    }

    setUser(user: User): void {
        var userClone: User = Object.assign({}, user);
        localStorage.setItem(this.user, JSON.stringify(userClone));
    }
}

