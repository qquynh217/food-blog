import { USERS_LIST } from "./fakeData";

export const getAll = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(USERS_LIST)
        }, 250)
    })
}
export const getUser = (username) => {
    return USERS_LIST.find((user) => {
        return user.username === username
    })
}
export const postAccount = (newAccount) => {
    USERS_LIST.push(newAccount)
}
export const putAccount = (username, updateAccount) => {
    const index = USERS_LIST.findIndex((user) => {
        return user.username === username
    })
    USERS_LIST[index] = { ...updateAccount }
}