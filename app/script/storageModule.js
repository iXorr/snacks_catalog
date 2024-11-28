// Автозаполнениe

function autoFill(basicItem, localItem) {
    let item = localStorage.getItem(localItem);

    if (!item) {
        updateElems(basicItem, localItem);
    }
}

function getBasicUsers() {
    return [
        {
            nick: 'admin',
            pass: '12345',
            id: null,
            isAdmin: true
        }
    ];
}

// Прочее

function indexElems(elems) {
    for (let key in elems) {
        elems[key].id = key;
    }
}

// Постоянное хранилище

function getParsedElems(localItem) {
    let parsedList = JSON.parse(localStorage.getItem(localItem));
    indexElems(parsedList);

    return parsedList
}

function updateElems(parsedList, localItem) {
    indexElems(parsedList);

    parsedList = JSON.stringify(parsedList);
    localStorage.setItem(localItem, parsedList);
}

function setNewElem(newElemList, parsedList, localItem) {
    parsedList.push(newElemList);
    updateElems(parsedList, localItem);
}

// Сессионное хранилище

function getSession(localItem) {
    return JSON.parse(sessionStorage.getItem(localItem))
}

function writeSession(elem, localItem) {
    elem = JSON.stringify(elem);
    sessionStorage.setItem(localItem, elem);
}

function clearSession() {
    sessionStorage.clear();
    reloadPage();
}