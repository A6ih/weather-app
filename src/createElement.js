export default function createElement(type, attribute, attributeName, text) {
    const element = document.createElement(type);
    element.setAttribute(attribute, attributeName);
    element.textContent = text;
    return element;
}