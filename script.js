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