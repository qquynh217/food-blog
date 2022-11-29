import { POSTS_LIST } from "./fakeData";

export const getAll = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(POSTS_LIST)
        }, 250)
    })
}
export const getPost = (slug) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(POSTS_LIST.slice(1).find((item) => {
                return item.slug === slug
            }))
        }, 250)
    })
}
export const postPost = (newPost) => {
    POSTS_LIST.push(newPost)
}
export const putPost = (slug, editedPost) => {
    const index = POSTS_LIST.findIndex((post) => {
        return post.slug === slug
    })
    POSTS_LIST[index] = editedPost
}
export const postComment = (slug, newComment) => {
    const index = POSTS_LIST.findIndex((post) => {
        return post.slug === slug
    })
    POSTS_LIST[index].comments.push(newComment)
}
export const deletePost = (slug) => {
    const index = POSTS_LIST.findIndex((post) => {
        return post.slug === slug
    })
    POSTS_LIST.splice(index, 1)
}