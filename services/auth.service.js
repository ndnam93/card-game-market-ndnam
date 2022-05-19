import { BehaviorSubject } from 'rxjs';
import Router from 'next/router'
import { fetchWrapper } from '../helpers';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const userSubject = new BehaviorSubject(typeof window === 'object' && JSON.parse(localStorage.getItem('user')));

function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/auth/login`, { email, password })
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

function getUser() {
  return fetchWrapper.get(`${baseUrl}/users/${userSubject.value.user.id}`);
}


export const authService = {
  user: userSubject,
  get userValue () { return userSubject.value },
  login,
  logout,
  getUser,
};
