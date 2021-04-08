import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { handleResponse } from '../_helpers';

const currentUserSubject = new BehaviorSubject((JSON.parse(localStorage.getItem('currentUser'))));

export const authenticationService = {
    signIn,
    signUp,
    signOut,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function signIn(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`http://localhost:8080/api/auth/signin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            let a = JSON.parse(user);

            let aStr = JSON.stringify(a)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', aStr);
            currentUserSubject.next(aStr);

            return user;
        });


}

function signUp(username, password, idEmployee) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, idEmployee })
    };

    return fetch(`http://localhost:8080/api/auth/signup`, requestOptions)
        .then(handleResponse)
        .then(user => {

            return user;
        });
}



function signOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
