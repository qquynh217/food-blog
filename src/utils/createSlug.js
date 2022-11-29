import { nanoid } from "nanoid";

const removeAccents = (str) => {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}
const createSlug = (str) => {
    const s = removeAccents(str).toLowerCase().split(/\s+/)
    let res = ""
    for (let index = 0; index < s.length; index++) {
        res += s[index] + "-"
    }
    return res.substring(0, res.length - 1) + "-" + nanoid(6)
}
export default createSlug