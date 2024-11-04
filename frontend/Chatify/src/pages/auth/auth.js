import { jwtDecode } from 'jwt-decode';
import api from '../../config/axios';


//Helper function
export function getJwtToken() {
    return sessionStorage.getItem("jwt");
}

export function setJwtToken(token) {
    sessionStorage.setItem("jwt", token);
}

export function getRefreshToken() {
    return sessionStorage.getItem("refreshToken");
}

export function setRefreshToken(token) {
    sessionStorage.setItem("refreshToken", token);
}

export function setUserDetail(token) {
    const user = jwtDecode(token);
    const userId = user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    const userName = user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    sessionStorage.setItem("username", userName);
    sessionStorage.setItem("userId", userId);
}

export function isTokenValid() {
    const token = sessionStorage.getItem('jwt');
    if (!token) return false;

    const { exp } = jwtDecode(token);
    return Date.now() < exp * 1000;
}

export function logout() {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('refreshToken');
    localStorage.setItem('logout', Date.now());
    window.location.href = '/login';
  }
