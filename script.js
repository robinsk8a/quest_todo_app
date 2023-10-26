const date = document.querySelector('.date');
const questList = document.querySelector('.quest-list');
const questSubmitBtn = document.querySelector('.add-quest__icon');
const questInput = document.querySelector('.add-quest__input');
const questChecked = 'fa-check-circle';
const questUnchecked = 'fa-circle';
const lineChecked = 'line-through';
let questId;
let QLIST;



// date function
const dateDisplay = new Date()
date.innerHTML = dateDisplay.toLocaleDateString('en-US',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})


// ADD NEW ITEM
const addNewQuest = function(quest, questId, done, del) {

    if (del) {
        return
    }

    const DONE = done ? questChecked : questUnchecked;
    const LINE = done? lineChecked : '';

    const liTemplate = `
    <li class="quest-item" id="${questId}">
                    <i class="fa-regular ${DONE} quest-item__check quest-item__icon" data="done"></i>
                    <p class="text ${LINE}">${quest}</p>
                    <i class="fa-solid fa-circle-xmark quest-item__cancel quest-item__icon" data="del"></i>
                </li>
    `;
    questList.insertAdjacentHTML("beforeend", liTemplate);
};

const newQuest = () => {
    const quest = questInput.value;
    if (quest) {
        addNewQuest(quest, questId, false, false);
        // MAKING THE ITEM'S ARRAY
        QLIST.push({
            name: quest,
            id: questId,
            done: false,
            del: false
        })
    // SETING THE LOCAL STORAGE
    
};
    localStorage.setItem('TODO', JSON.stringify(QLIST))
    questInput.value = '';
    questInput.focus();
    questId++
}

// TOGGLE CHECK UNCHECK
const questDone = (element) => {
    element.classList.toggle(questChecked);
    element.classList.toggle(questUnchecked);
    element.parentNode.querySelector('.text').classList.toggle(lineChecked);
    QLIST[element.parentNode.id].done = QLIST[element.parentNode.id].done ? false : true;
};

// DELETE LI ITEM (QUEST ITEM)
const questDel = (element) => {
    element.parentNode.parentNode.removeChild(element.parentNode);
    QLIST[element.parentNode.id].del = QLIST[element.parentNode.id].del ? false : true;
};


questSubmitBtn.addEventListener('click', newQuest);
questInput.addEventListener("keypress", function(enterKey) {
    if (enterKey.key === 'Enter') {
        newQuest()
    }
});

questList.addEventListener('click', function(event) {
    const element = event.target;
    const elementData = element.attributes.data.value;
    if(elementData === 'done') {
        questDone(element);
    } else if (element) {
        questDel(element)
    };
    localStorage.setItem('TODO', JSON.stringify(QLIST))
})


let data = localStorage.getItem('TODO')
if (data) {
    QLIST = JSON.parse(data);
    questId = QLIST.length;
    (function() {
        QLIST.forEach(function(i) {
            addNewQuest(i.name, i.id, i.done, i.del);
            })
        })();  
} else {
    QLIST = [];
    questId = 0
}
