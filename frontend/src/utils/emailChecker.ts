export function emailValid(email: string) {
    const re = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
    const isValid = re.test(email);
    return isValid;
}
