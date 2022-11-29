export const truncateString = (str) => {
    const arr = str.split(/\s+/)
    let res = ""
    if (arr.length >= 16) {
        arr.slice(0, 18).forEach(word => {
            res += word + " "
        });
        return res + "..."
    }
    return str
}
