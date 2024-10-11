import {useEffect} from "react";

export default function useLogger(message) {
    useEffect(() => {
        if (message !== null) {
            console.log("Here", message);
        }
    }, [])
}