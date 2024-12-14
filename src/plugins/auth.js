import { ref } from "vue";

export const isAuth = ref(false)
export const userToken = ref(localStorage.getItem('auth')||null)

export function setToken(token){
    localStorage.setItem('auth', token)
    isAuth.value = true
    userToken.value = token
}


export function clearAuth(){
    localStorage.removeItem('auth')
    isAuth.value = false
    userToken.value = null
}


export function initAuth(){
    const token = localStorage.getItem('auth')
    if(token)
    {
        isAuth.value = true
        userToken.value = token
    }
}