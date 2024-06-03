const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector("#item-list");
const info = document.querySelector("#item-info");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addItem();
});

list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        getInfo(
            e.target.parentElement.parentElement.children[0].children[0]
                .innerText
        ).remove();
        e.target.parentElement.parentElement.remove();
    }

    if (e.target.classList.contains("buy-button")) {
        e.target.parentElement.parentElement.classList.toggle("hiding");
        let infoItem = getInfo(
            e.target.parentElement.parentElement.children[0].children[0]
                .innerText
        );
        if (infoItem) {
            infoItem.remove();
            infoItem.classList.add("crossed");
            info.children[3].append(infoItem);
        } else {
            infoItem = getInfo(
                e.target.parentElement.parentElement.children[0].children[0]
                    .innerText,
                3
            );
            infoItem.remove();
            infoItem.classList.toggle("crossed");
            info.children[1].append(infoItem);
        }
    }

    if (
        e.target.classList.contains("name") &&
        !e.target.parentElement.parentElement.classList.contains("hiding")
    ) {
        const currentInfo = getInfo(e.target.innerText);
        const editor = document.createElement("input");
        editor.setAttribute("placeholder", e.target.innerText);
        editor.addEventListener("focusout", () => {
            console.log("I AM HAPPENING");
            const name = document.createElement("p");
            name.classList.add("name");
            if (editor.value.trim() == "") {
                name.innerText = editor.placeholder;
            } else {
                let newName = editor.value;
                if (newName.length > 12) {
                    newName = newName.slice(0, 13).concat("...");
                }
                name.innerText = newName;
                currentInfo.children[0].innerText = newName;
            }
            editor.parentElement.append(name);
            editor.remove();
            
        });
        e.target.parentElement.append(editor);
        e.target.remove();
        editor.focus();
    }

    if (e.target.classList.contains("plus")) {
        e.target.parentElement.children[1].innerText++;
        getInfo(
            e.target.parentElement.parentElement.children[0].children[0]
                .innerText
        ).children[1].innerText++;
    }

    if (e.target.classList.contains("minus")) {
        let num = e.target.parentElement.children[1];
        if (num.innerText > 1) {
            num.innerText--;
            getInfo(
                e.target.parentElement.parentElement.children[0].children[0]
                    .innerText
            ).children[1].innerText--;
        }
    }
});

function getInfo(name, num = 1) {
    for (let item of info.children[num].children) {
        if (item.children[0].innerText == name) {
            return item;
        }
    }
}

function addItem() {
    let name = input.value;
    if (name != "") {
        if (name.length > 12) {
            name = name.slice(0, 13).concat("...");
        }
        list.append(createItem(name));
        info.children[1].append(createInfo(name));

        input.value = "";
        input.focus();
    }
}

function createInfo(name) {
    const itemInfo = document.createElement("div");
    const itemName = document.createElement("p");
    itemName.innerText = name;
    const itemNum = document.createElement("p");
    itemNum.innerText = "1";
    itemNum.classList.add("num");
    itemInfo.append(itemName, itemNum);
    return itemInfo;
}

function createItem(name) {
    const item = document.createElement("div");
    item.classList.add("item");

    const itemName = document.createElement("div");
    itemName.classList.add("item-name");
    const p = document.createElement("p");
    p.innerText = name;
    p.classList.add("name");
    itemName.append(p);
    item.append(itemName);

    const itemNum = document.createElement("div");
    itemNum.classList.add("item-num");
    const minus = document.createElement("button");
    minus.classList.add("minus");
    minus.innerText = "-";
    minus.setAttribute("data-tooltip", "Зменшує");
    const num = document.createElement("p");
    num.innerText = "1";
    const plus = document.createElement("button");
    plus.classList.add("plus");
    plus.innerText = "+";
    plus.setAttribute("data-tooltip", "Збільшує");
    itemNum.append(minus);
    itemNum.append(num);
    itemNum.append(plus);
    item.append(itemNum);

    const itemAct = document.createElement("div");
    itemAct.classList.add("item-act");
    const buy = document.createElement("button");
    buy.setAttribute("data-tooltip", "Купити");
    buy.classList.add("buy-button");
    buy.innerText = "Куплено";
    const del = document.createElement("button");
    del.setAttribute("data-tooltip", "Видалити");
    del.classList.add("delete-button");
    del.innerHTML = "&#x2716;";
    itemAct.append(buy);
    itemAct.append(del);
    item.append(itemAct);

    return item;
}
