function toMainPage() {
    smoothHideBody();

    setTimeout(() => {
        location.href = './main.html';
    }, 150);
}

function toBinPage() {
    smoothHideBody();

    setTimeout(() => {
        location.href = './bin.html';
    }, 150);
}

function toAuthPage() {
    location.href = './index.html';
}

function reloadPage() {
    smoothHideBody();

    setTimeout(() => {
        location.reload();
    }, 150);
}

function smoothDisplayBody() {
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 250);
}

function smoothHideBody() {
    document.body.style.transition = '.15s ease-in-out';
    document.body.style.opacity = '0';
}

function checkPage(pageName) {
    let thisPage = location.pathname;
    thisPage = thisPage.substring(thisPage.lastIndexOf('/'), thisPage.length);

    if (thisPage == `/${pageName}.html`) {
        return true
    }

    return false
}