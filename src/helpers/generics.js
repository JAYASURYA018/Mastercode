import * as _ from "underscore";
const isObject = (object) => object != null && typeof object === 'object';
export function deepEqual(object1, object2) {
    debugger;
    if (!object1 || !object2) {
        return false;
    }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
            return false;
        }
    }
    return true;
}
export const getFirstLetterCapitalized = (str) => `${str.substr(0, 1).toUpperCase()}${str.substr(1)}`;
export const desc = (a, b, orderBy) => {
    if (b[orderBy].toLowerCase() < a[orderBy].toLowerCase()) {
        return -1;
    }
    if (b[orderBy].toLowerCase() > a[orderBy].toLowerCase()) {
        return 1;
    }
    return 0;
};
export const stableSort = (array, compare) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = compare(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
};
export const isEmpty = (data) => {
    if (typeof data === "string" && !data) {
        return true;
    }
    else if (typeof data === "number" && Number.isNaN(data)) {
        return true;
    }
    else if (typeof data === "object" &&
        data &&
        Object.keys(data).length === 0) {
        return true;
    }
    else if (!data && typeof data !== "number") {
        return true;
    }
    else {
        return false;
    }
};
export const deepCopy = (data) => {
    return JSON.parse(JSON.stringify(data));
};
export const getFormatedDate = (dateTime) => {
    const isoString = dateTime;
    const options = { month: "short", day: "numeric", year: "numeric" };
    const date = new Date(isoString);
    const result = new Intl.DateTimeFormat("en-US", options).format(date);
    return result;
};
export const getFormatedTime = (value) => {
    const time = new Date(value).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    return time;
};
export const convertToBytes = (fileData) => {
    let fileContent = [], count = 0;
    for (let item in fileData) {
        if (fileData.length - 1 >= count) {
            fileContent.push(fileData[item]);
            count = count + 1;
        }
    }
    return fileContent;
};
export const decodeASCIIvalue = (array) => {
    let data = '';
    _.each(array, (item) => {
        data += String.fromCharCode(item);
    });
    return data;
};
export const deepEqual1 = (x, y) => {
    if (x === y) {
        return true;
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
        if (Object.keys(x).length != Object.keys(y).length)
            return false;
        for (var prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!deepEqual1(x[prop], y[prop]))
                    return false;
            }
            else
                return false;
        }
        return true;
    }
    else
        return false;
};
//# sourceMappingURL=generics.js.map