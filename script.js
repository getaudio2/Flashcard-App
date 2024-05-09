const container = document.querySelector(".container");
const addQuestionModal = document.getElementById("add-card-modal");
const saveBtn = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-card");
const closeBtn = document.getElementById("close-btn");

let editBool = false;
let originalId = null;
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

addQuestion.addEventListener('click', ()=>{
    container.classList.add('hide');
    question.value = "";
    answer.value = "";
    addQuestionModal.classList.remove('hide');
});

closeBtn.addEventListener('click', ()=>{
    container.classList.remove('hide');
    addQuestionModal.classList.add('hide');
    if (editBool) {
        editBool = false;
    }
});

saveBtn.addEventListener('click', ()=>{
    let tempQuestion = question.value.trim();
    let tempAnswer = answer.value.trim();
    if(!tempQuestion || !tempAnswer){
        errorMessage.classList.remove('hide');
    } else {
        if(editBool){
            flashcards = flashcards.filter(flashcard => flashcard.id !== originalId);
        }
        let id = Date.now();
        flashcards.push({ id, question: tempQuestion, answer: tempAnswer});
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        container.classList.remove('hide');
        errorMessage.classList.add('hide');
        viewList();
        question.value = "";
        answer.value = "";
        editBool = false;
        addQuestionModal.classList.add('hide');
    }
});

function viewList(){
    const cardsList = document.querySelector('.cards-list');
    cardsList.innerHTML = '';
    flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    flashcards.forEach(flashcard => {
        const div = document.createElement("div");
        div.classList.add('card');
        div.innerHTML = `
            <p class="que-div">${flashcard.question}</p>
            <p class="ans-div hide">${flashcard.answer}</p>
            <button class="show-hide-btn">Show/Hide</button>
            <div class="btns-con">
                <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        div.setAttribute('data-id', flashcard.id);
        const displayAns = div.querySelector('.ans-div');
        const showHideBtn = div.querySelector('.show-hide-btn');
        const editBtn = div.querySelector('.edit');
        const deleteBtn = div.querySelector('.delete');

        showHideBtn.addEventListener('click', ()=>{
            displayAns.classList.toggle('hide');
        });

        editBtn.addEventListener('click', ()=>{
            editBool = true;
            modifyElement(editBtn, true);
            addQuestionModal.classList.remove('hide');
        });

        deleteBtn.addEventListener('click', ()=>{
            modifyElement(deleteBtn);
        });

        cardsList.appendChild(div);
    });
};

const modifyElement = (element, edit = false) =>{
    const parentDiv = element.parentElement.parentElement;
    const id = Number(parentDiv.getAttribute('data-id'));
    const parentQuestion = parentDiv.querySelector('.que-div').innerText;
    if(edit){
        const parentAnswer = parentDiv.querySelector('.ans-div').innerText;
        answer.value = parentAnswer;
        question.value = parentQuestion;
        originalId = id;
        disableBtns(true);
    } else {
        flashcards = flashcards.filter(flashcard => flashcard.id !== id);
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }
    parentDiv.remove();
};

const disableBtns = (value) => {
    const editButtons = document.getElementsByClassName('edit');
    Array.from(editButtons).forEach((element) =>{
        element.disabled = value;
    });
};

document.addEventListener('DOMContentLoaded', viewList);