function createBin() {
    let bin = [];

    writeSession(bin, 'bin');
}

function checkBin() {
    let userBin = getSession('bin');

    if (userBin) {
        return true
    }

    return false
}

function getUniqueBin(bin) {
    let uniqueBin = new Set(bin);
    return Array.from(uniqueBin);
}

function addStaffToBin(item) {
    if (!checkBin()) {
       createBin();
    }

    let bin = getSession('bin');
    bin.push(item.dataset.id);
    writeSession(getUniqueBin(bin), 'bin');
}

function removeStaffFromBin(item) {
    let bin = getSession('bin');
    bin = bin.filter(binElem => binElem != item.dataset.id);
    writeSession(getUniqueBin(bin), 'bin');
}

// установить общую стоимость

function setTotalAmount(bin, staff, elem) {
    if (bin) {
        let totalAmount = 0;

        for (let binElem of bin) {
    
            for (let staffKey in staff) {
                if (binElem == staff[staffKey].id) {
                    totalAmount += Number(staff[staffKey].price);
                }
            }
        }
        
        elem.textContent = totalAmount;
    }
}