import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TabVisibility = () => {
	const location = useLocation();

	const [isVisible, setIsVisible] = useState(true);
	const [count, setCount] = useState(0);

	const handleFocus = () => {
		setIsVisible(true);
	};
	const handleBlur = () => {
		setIsVisible(false);
	};

	useEffect(() => {
		window.addEventListener("focus", handleFocus);
		window.addEventListener("blur", handleBlur);

		return () => {
			window.removeEventListener("focus", handleFocus);
			window.removeEventListener("blur", handleBlur);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if ((location.pathname.endsWith("start") || location.pathname.endsWith("review")) && isVisible) {
			setCount((prevState) => prevState + 1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	return count;
};

export default TabVisibility;
