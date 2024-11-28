// Автозаполнение

function getBasicUsers() {
    return [
        {
            nick: 'admin',
            pass: '12345',
            id: null,
            isAdmin: true
        }
    ]
}

autoFill(getBasicUsers(), 'users');

// Основа

function wrapEnteredData(form) {
    let elemNick = form.querySelector('[data-type="userNick"]');
    let elemPass = form.querySelector('[data-type="userPass"]');

    return {
        nick: elemNick.value,
        pass: elemPass.value
    }
}

function checkPassConf(form) {
    let elemPass = form.querySelector('[data-type="userPass"]');
    let elemPassConf = form.querySelector('[data-type="userPassConf"]');

    if (elemPass.value == elemPassConf.value) {
        return true
    }

    return false
}

function findUser(enteredData, parsedUsers, authMode) {
    for (let userData of parsedUsers) {
        if (authMode) {
            if (userData.nick == enteredData.nick 
                && userData.pass == enteredData.pass) {
                    return true
                }
        } else {
            if (userData.nick == enteredData.nick) {
                return true
            }
        }
    }

    return false
}

function setNewUser(newElemList, parsedList) {
    if (!findUser(newElemList, parsedList, false)) {
        parsedList.push(newElemList);
        updateElems(parsedList, 'users');

        alert(`Добро пожаловать, ${newElemList.nick}`);
        writeSession(newElemList, 'authUser');
        toMainPage();

        return true
    }

    return false
}

function checkAdminStatus(authUser, parsedUsers) {
    for (let user of parsedUsers) {
        if (user.nick == authUser.nick) {
            if ('isAdmin' in user) {
                return true
            }

            return false
        }
    }
}

function setAuthUserId(authUser, parsedUsers) {
    for (let user of parsedUsers) {
        if (user.nick == authUser.nick) {
            authUser.id = user.id;
        }
    }
}

function getAuthUser(enteredData, parsedUsers) {
    let authUser;

    if (findUser(enteredData, parsedUsers, true)) {
        authUser = enteredData;

        setAuthUserId(authUser, parsedUsers);
        
        if (checkAdminStatus(authUser, parsedUsers)) {
            authUser.isAdmin = true;
        }

        return authUser
    }

    return false
}

// для main.html

function checkAuth() {
    let authUser = getSession('authUser');

    if (authUser) {
        console.log(`Hello, ${authUser.nick}. Ваш айди: ${authUser.id}`);

        if ('isAdmin' in authUser) {
            console.log('Welcome to Admin-Panel!');
        }

        return authUser

    } else {
        toAuthPage();
    }
}

function checkAuthAdminStatus(authUser) {
    if ('isAdmin' in authUser) {
        return true
    } else {
        return false
    }
}