import CryptoJS from "crypto-js";
import sanitizeHtml from "sanitize-html";

const encryptData = (data) => {
	return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_ENCRYPTION_KEY).toString();
};

const decryptData = (data) => {
	if (!data) return;

	var bytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPTION_KEY);

	return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

function capitalizeFirstLetter(string) {
	if (!string) return "";
	string.toLowerCase();
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const setToStorage = (key, value) => {
	let storedValue = JSON.stringify(value);
	localStorage.setItem(key, storedValue);
};

const getFromStorage = (key) => {
	let value = localStorage.getItem(key);
	return value ? JSON.parse(value) : null;
};

const removefromStorage = (key) => localStorage.removeItem(key);

const sanitizeHtmlOption = {
	allowedTags: sanitizeHtml.defaults.allowedTags.concat(["ul", "ol", "img", "ins"]),
	allowedAttributes: {
		a: ["name"],
		img: ["src"],
	},
	disallowedTagsMode: "recursiveEscape",
};

const insertNewLine = (text) => {
	if (text.length >= 2 && text[0] === '"' && text[text.length - 1] === '"') {
		return removeQuotesBetweenTags(text.split("[new-line]").join("<br/><br/>").slice(1, -1));
	} else {
		return removeQuotesBetweenTags(text.split("[new-line]").join("<br/><br/>"));
	}
};

const removeQuotesBetweenTags = (inputString) => {
	// Find the first occurrence of "<p>"
	const startIndex = inputString.indexOf("<p>");

	if (startIndex === -1) {
		// If "<p>" is not found, return the original string
		return inputString;
	}

	// Find the last occurrence of "</P]>"
	const lastIndex = inputString.lastIndexOf("</p>");

	if (lastIndex === -1) {
		// If "</P]>" is not found, return the original string
		return inputString;
	}

	// Extract the content between "<p>" and "</P]>"
	const contentBetweenTags = inputString.substring(startIndex + 3, lastIndex);

	// Remove all double quotes from the extracted content
	const contentWithoutQuotes = contentBetweenTags.replace(/"/g, "");

	// Replace the original content between "<p>" and "</P]>" with the modified content
	const modifiedString = inputString.substring(0, startIndex + 3) + contentWithoutQuotes + inputString.substring(lastIndex);

	return modifiedString;
};

export { encryptData, decryptData, capitalizeFirstLetter, sanitizeHtmlOption, setToStorage, getFromStorage, insertNewLine, removefromStorage };
