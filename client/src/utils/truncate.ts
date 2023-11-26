const truncate = (str : string, len : number) => str.length < len ? str : `${str.slice(0, len)}...`;
export default truncate;