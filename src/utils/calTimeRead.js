const calTimeRead = (text) => {
    const words = text.split(/\s+/).length
    const speed = Math.round(words / 250);
    console.log(speed);
    if (speed < 1)
        return 1
    else return speed
}
export default calTimeRead