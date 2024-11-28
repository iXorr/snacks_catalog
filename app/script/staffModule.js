// Автозаполнение

function getBasicStaff() {
    return [
        {
            title: 'LAYS',
            descr: 'С СЫРОМ',
            imgPath: './assets/img/crisps/lays-cheese.webp',
            price: 150
        },
    
        {
            title: 'LAYS',
            descr: 'С КРАБОМ',
            imgPath: './assets/img/crisps/lays-crab.png',
            price: 125
        },
    
        {
            title: 'LAYS',
            descr: 'С ЛОСОСЕМ',
            imgPath: './assets/img/crisps/lays-salmon.webp',
            price: 250
        },
    
        {
            title: 'LAYS',
            descr: 'С ЛУКОМ',
            imgPath: './assets/img/crisps/lays-onion.webp',
            price: 75
        },

        {
            title: 'LAYS',
            descr: 'СМЕТАНКА',
            imgPath: './assets/img/crisps/lays-smetana.webp',
            price: 95
        },

        {
            title: 'LAYS',
            descr: 'РИФЛЁНЫЕ',
            imgPath: './assets/img/crisps/lays-rifle.jpg',
            price: 195
        },

        {
            title: 'PRINGLES',
            descr: 'ОРИГИНАЛ',
            imgPath: './assets/img/crisps/pringles-original.webp',
            price: 155
        },

        {
            title: 'PRINGLES',
            descr: 'ПАПРИКА',
            imgPath: './assets/img/crisps/pringles-paprika.webp',
            price: 205
        },

        {
            title: 'PRINGLES',
            descr: 'С СЫРОМ',
            imgPath: './assets/img/crisps/pringles-cheese.jpg',
            price: 175
        },

        {
            title: 'PRINGLES',
            descr: 'С ПИЦЦЕЙ',
            imgPath: './assets/img/crisps/pringles-pizza.jpg',
            price: 225
        },

        {
            title: 'PRINGLES',
            descr: 'ВЕТЧИНА',
            imgPath: './assets/img/crisps/pringles-ham.jpg',
            price: 195
        },

        {
            title: '5D',
            descr: '4 СЫСА',
            imgPath: './assets/img/crisps/5d-cheese.png',
            price: 35
        }
    ]
}

autoFill(getBasicStaff(), 'staff');

// Смещение элементов списка и подготовка

function getStaffChanges(editForm) {
    let editInputsList = editForm.querySelector('.editInputs').children;

    let newStaffElem = {};

    for (let editInput of editInputsList) {
        newStaffElem[expandSingleDataset(editInput)] = editInput.value;
    }

    return newStaffElem
}

function expandSingleDataset(elem) {
    return Object.keys(elem.dataset)[0]
}

function editStaffElem(staff, newStaffElem) {
    for (let i = 0; i < staff.length; i++) {
        if (staff[i].id == newStaffElem.id) {
            staff[i] = newStaffElem;
        }
    }
}

// Редактирование списка

function replaceStaffElem(staff, newStaffElem) {
    if (newStaffElem.id == staff.length) {
        addStaffElem(staff, newStaffElem);
    } else {
        editStaffElem(staff, newStaffElem);
    }
}

// Удаление элемента

function deleteStaffElem(item, staff) {
    staff = staff.filter(elem => elem.id != item.dataset.id);
    updateElems(staff, 'staff');
    reloadPage();
}

// Добавление элемента

function addStaffElem(staff, newStaffElem) {
    staff[staff.length] = newStaffElem;
}