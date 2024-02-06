import { useEffect, useState } from "react"

export const useLocalStorage = (key: string, initialVal?: any) => {
    const [value, setValue] = useState(getVal(key));

    useEffect(() => {
        setVal(key,  initialVal || value );
    }, [value])

    return [value, setValue] as const;
}

const getVal = (key: string) => {
    const value = window.localStorage.getItem(key);
    try {
        return JSON.parse(value!)
    }
    catch {
        return '';
    }
}

const setVal = (key: string, value: string) => {
    if(typeof value == 'object' && value) {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value);
}