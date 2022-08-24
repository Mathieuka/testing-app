export const emailValid = (email: string) => new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);

export const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};