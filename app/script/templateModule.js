// Стилизация элементов, выбранных в корзину

function styleBinStaff(staffElem, li) {
    let bin = getSession('bin');

    if (bin) {
        for (let binElem of bin) {
            if (binElem == staffElem.id) {
                li.classList.add('binStaff');
            } 
        }
    }
}

function removeNonBinStaff(li) {
    if (checkPage('bin')) {
        if (!li.classList.contains('binStaff')) {
            li.remove();
        }
    }
}

// Основной шаблон каталога и его содержимого

function createList(staff, parentNode, authUser = false) {
    for (let staffElem of staff) {
        let li = document.createElement('li');

        styleBinStaff(staffElem, li);

        for (let key in staffElem) {
            li.dataset[key] = staffElem[key];
        }

        createListContent(li);

        let btnWrapper;

        if (checkAuthAdminStatus(authUser)) {

            btnWrapper = createBtnWrapper();
            createEditBtn(btnWrapper);
            createDeleteBtn(btnWrapper);
            li.append(btnWrapper);
            
        } else {

            if (li.classList.contains('binStaff')) {
                createRemoveBinBtn(li);
            } else {
                createAddBinBtn(li);
            }
        }

        parentNode.append(li);
        removeNonBinStaff(li);
    }
}

function createListContent(li) {
    function fillElemContent(tagName, elemProp) {
        let elem = document.createElement(tagName);
        elem.classList.add('catalog-item');

        if (tagName == 'img') {
            elem.setAttribute('src', li.dataset[elemProp]);
        } else {
            elem.textContent = li.dataset[elemProp];
        }

        li.append(elem);
    }

    fillElemContent('h2', 'title');
    fillElemContent('p', 'descr');
    fillElemContent('p', 'price');
    fillElemContent('img', 'imgPath');
}

function createBtnWrapper() {
    let btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btnsWrapper');

    return btnWrapper
}

function createEditBtn(li) {
    let btn = document.createElement('button');
    btn.classList.add('editStaff');
    insertIconInBtn('./assets/img/UI/edit-staff.svg', btn);
    li.append(btn);
}

function createDeleteBtn(li) {
    let btn = document.createElement('button');
    btn.classList.add('deleteStaff');
    insertIconInBtn('./assets/img/UI/delete-staff.svg', btn);
    li.append(btn);
}

function createAddBinBtn(li) {
    let btn = document.createElement('button');
    btn.classList.add('addStaffToBin');
    insertIconInBtn('./assets/img/UI/add-to-cart.svg', btn);
    li.append(btn);
}

function createRemoveBinBtn(li) {
    let btn = document.createElement('button');
    btn.classList.add('removeStaffFromBin');
    insertIconInBtn('./assets/img/UI/remove-from-cart.svg', btn);
    li.append(btn);
}

// Шаблон для редактирования каталога

function translateEditMenu(editForm) {
    editForm.style.transform = 'translateX(0%)';
}

function hideEditMenu(editForm) {
    editForm.style.transform = 'translateX(100%)';
}

function popupEditMenu(item, editForm) {
    translateEditMenu(editForm);
    clearEditMenu(editForm);
    fillEditForm(item, editForm);
    displayEditMenu(editForm);
}

function displayEditMenu(editForm) {
    editForm.style.display = 'block';
}

function clearEditMenu(editForm) {
    editForm.innerHTML = '';
}

function hideId(key, elem) {
    if (key == 'id') {
        elem.style.display = 'none';
    }
}

function insertIconInBtn(iconPath, btn) {
    let icon = document.createElement('img');
    icon.src = iconPath;
    btn.append(icon);
}

function fillEditForm(item, editForm) {
    let inputsWrapper = document.createElement('div');
    inputsWrapper.classList.add('editInputs');

    for (let key in item.dataset) {
        let editInput = document.createElement('input');
        editInput.dataset[key] = item.dataset[key];
        editInput.value = item.dataset[key];
        editInput.required = true;

        inputsWrapper.append(editInput);
        hideId(key, editInput);
    }

    editForm.append(inputsWrapper);

    // кнопка "подтвердить"

    let editSubmit = document.createElement('button');
    editSubmit.id = 'editSubmit';
    insertIconInBtn('./assets/img/UI/confirm.svg', editSubmit);

    // кнопка "отклонить"

    let editCancel = document.createElement('button');
    editCancel.id = 'editCancel';
    insertIconInBtn('./assets/img/UI/cancel.svg', editCancel);

    let btnsWrapper = document.createElement('div');
    btnsWrapper.classList.add('btnsWrapper');

    btnsWrapper.append(editSubmit);
    btnsWrapper.append(editCancel);

    editForm.append(btnsWrapper);

    return editForm
}

function displayBtnAddStaff(btn, authUser) {
    if (checkAuthAdminStatus(authUser)) {
        btn.style.display = 'flex';
    }
}

// Добавление шаблона нового элемента

function getEmptyLi(staff) {
    let li = document.createElement('li');
    
    li.dataset.title = 'grechka';
    li.dataset.descr = 'normalnya!';
    li.dataset.imgPath = './assets/img/crisps/example.jpg';
    li.dataset.price = 50;
    li.dataset.id = staff.length;

    return li
}

// если каталог или корзина пустые

function showMelina(parentNode) {
    let melinaWrapper = document.createElement('div');
    melinaWrapper.classList.add('melinaWrapper');

    let melinaMessage = document.createElement('span');
    melinaMessage.textContent = 'maidenless, у вас тут пусто!';
    melinaMessage.classList.add('melinaMsg');

    let melinaImg = document.createElement('img');
    melinaImg.classList.add('melina');
    melinaImg.src = './assets/img/melina-dancing.gif';

    melinaWrapper.append(melinaImg);
    melinaWrapper.append(melinaMessage);

    parentNode.append(melinaWrapper);
}