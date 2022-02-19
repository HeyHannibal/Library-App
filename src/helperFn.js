function qsel(arrt) {
    return document.querySelector(arrt);
}

function eFactory(type, id, cssClass, textContent, inputType, name) {
    const element = document.createElement(type);
    if (id) element.setAttribute("id", id);
    if (cssClass) element.setAttribute("class", cssClass);
    if (textContent) element.textContent = textContent;
    if (inputType) element.setAttribute("type", inputType);
    if (name) element.setAttribute(name, name);
    return element;
}

export { qsel, eFactory }