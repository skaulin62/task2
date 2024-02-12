import { useState } from "react"

export const useStateModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    const hideModal = () => {
        setIsVisible(false);
        return false;
    }
    const showModal = () => {
        setIsVisible(true);
        return true;
    }

    return {hideModal, showModal, isVisible};
}