'use strict';
let data, globalCorrectAnswer, globalStukData;

const listenToButtonAnswerQuestion = function () {
  document.querySelectorAll('.js-button').forEach((button) => {
    button.addEventListener('click', function (e) {
      console.log('button clicked');
      document.querySelector('.c-flip--inner').classList.toggle('is-flipped');
    });
  });
};

const listenToReloadButton = function () {
  document.querySelectorAll('.js-new-question').forEach((button) => {
    button.addEventListener('click', function () {
      console.log('button question clicked');
      document.querySelector('.c-card--front').style.display = 'block';
      
      if (document.querySelector('.c-flip--inner').classList.contains('is-flipped')) {
        document.querySelector('.c-flip--inner').classList.toggle('is-flipped');
      }
      showData(data);
    });
  });
};

const showData = function (data) {
  let random = Math.floor(Math.random() * data.length);
  console.log(random);
  let stukdata = data[random];
  globalStukData = stukdata;
  globalCorrectAnswer = stukdata['correct-option'];
  let scrollBars = document.querySelectorAll('.js-range');
  for (const item of scrollBars) {
    item.value = stukdata['difficulty'];
  }
  let questions = document.querySelectorAll('.js-question');
  for (const item of questions) {
    item.innerHTML = `Question: ${stukdata['question']}`;
  }
  let answerOptionA = document.querySelectorAll('.js-answer-a');
  for (const item of answerOptionA) {
    item.innerHTML = `A: ${stukdata['option-a']}`;
  }
  let answerOptionB = document.querySelectorAll('.js-answer-b');
  for (const item of answerOptionB) {
    item.innerHTML = `B: ${stukdata['option-b']}`;
  }
  let answerOptionC = document.querySelectorAll('.js-answer-c');
  for (const item of answerOptionC) {
    item.innerHTML = `C: ${stukdata['option-c']}`;
  }
  let answerOptionD = document.querySelectorAll('.js-answer-d');
  for (const item of answerOptionD) {
    item.innerHTML = `D: ${stukdata['option-d']}`;
  }
  let totaalPercentage = parseInt(stukdata['answers-a']) + parseInt(stukdata['answers-b']) + parseInt(stukdata['answers-c']) + parseInt(stukdata['answers-d']);
  document.querySelector('.c-percentage-a').innerHTML = `A: ${Math.round((parseInt(stukdata['answers-a']) / totaalPercentage) * 100)}%`;
  document.querySelector('.c-percentage-b').innerHTML = `B: ${Math.round((parseInt(stukdata['answers-b']) / totaalPercentage) * 100)}%`;
  document.querySelector('.c-percentage-c').innerHTML = `C: ${Math.round((parseInt(stukdata['answers-c']) / totaalPercentage) * 100)}%`;
  document.querySelector('.c-percentage-d').innerHTML = `D: ${Math.round((parseInt(stukdata['answers-d']) / totaalPercentage) * 100)}%`;
  document.querySelector('.js-answer-def').innerHTML = stukdata['answer'];
  if (stukdata['correct-option'].includes('a')) {
    console.log(stukdata['correct-option']);
    document.querySelector('.js-answer-box-a').classList.remove('c-answer-a-solution');
    document.querySelector('.js-answer-box-a').classList.add('c-answer-a');
    document.querySelector('.c-false-icon-a').style.display = 'none';
    document.querySelector('.c-correct-icon-a').style.display = 'block';

    document.querySelector('.js-answer-box-b').classList.remove('c-answer-b');
    document.querySelector('.js-answer-box-b').classList.add('c-answer-b-solution');
    document.querySelector('.c-false-icon-b').style.display = 'block';
    document.querySelector('.c-correct-icon-b').style.display = 'none';

    document.querySelector('.js-answer-box-c').classList.remove('c-answer-c');
    document.querySelector('.js-answer-box-c').classList.add('c-answer-c-solution');
    document.querySelector('.c-false-icon-c').style.display = 'block';
    document.querySelector('.c-correct-icon-c').style.display = 'none';

    document.querySelector('.js-answer-box-d').classList.remove('c-answer-d');
    document.querySelector('.js-answer-box-d').classList.add('c-answer-d-solution');
    document.querySelector('.c-false-icon-d').style.display = 'block';
    document.querySelector('.c-correct-icon-d').style.display = 'none';
  } else if (stukdata['correct-option'].includes('b')) {
    console.log(stukdata['correct-option']);
    document.querySelector('.js-answer-box-a').classList.remove('c-answer-a');
    document.querySelector('.js-answer-box-a').classList.add('c-answer-a-solution');
    document.querySelector('.c-false-icon-a').style.display = 'block';
    document.querySelector('.c-correct-icon-a').style.display = 'none';

    document.querySelector('.js-answer-box-b').classList.remove('c-answer-b-solution');
    document.querySelector('.js-answer-box-b').classList.add('c-answer-b');
    document.querySelector('.c-false-icon-b').style.display = 'none';
    document.querySelector('.c-correct-icon-b').style.display = 'block';

    document.querySelector('.js-answer-box-c').classList.remove('c-answer-c');
    document.querySelector('.js-answer-box-c').classList.add('c-answer-c-solution');
    document.querySelector('.c-false-icon-c').style.display = 'block';
    document.querySelector('.c-correct-icon-c').style.display = 'none';

    document.querySelector('.js-answer-box-d').classList.remove('c-answer-d');
    document.querySelector('.js-answer-box-d').classList.add('c-answer-d-solution');
    document.querySelector('.c-false-icon-d').style.display = 'block';
    document.querySelector('.c-correct-icon-d').style.display = 'none';
  } else if (stukdata['correct-option'].includes('c')) {
    console.log(stukdata['correct-option']);
    document.querySelector('.js-answer-box-a').classList.remove('c-answer-a');
    document.querySelector('.js-answer-box-a').classList.add('c-answer-a-solution');
    document.querySelector('.c-false-icon-a').style.display = 'block';
    document.querySelector('.c-correct-icon-a').style.display = 'none';

    document.querySelector('.js-answer-box-b').classList.remove('c-answer-b');
    document.querySelector('.js-answer-box-b').classList.add('c-answer-b-solution');
    document.querySelector('.c-false-icon-b').style.display = 'block';
    document.querySelector('.c-correct-icon-b').style.display = 'none';

    document.querySelector('.js-answer-box-c').classList.remove('c-answer-c-solution');
    document.querySelector('.js-answer-box-c').classList.add('c-answer-c');
    document.querySelector('.c-false-icon-c').style.display = 'none';
    document.querySelector('.c-correct-icon-c').style.display = 'block';

    document.querySelector('.js-answer-box-d').classList.remove('c-answer-d');
    document.querySelector('.js-answer-box-d').classList.add('c-answer-d-solution');
    document.querySelector('.c-false-icon-d').style.display = 'block';
    document.querySelector('.c-correct-icon-d').style.display = 'none';
  } else if (stukdata['correct-option'].includes('d')) {
    console.log(stukdata['correct-option']);
    document.querySelector('.js-answer-box-a').classList.remove('c-answer-a');
    document.querySelector('.js-answer-box-a').classList.add('c-answer-a-solution');
    document.querySelector('.c-false-icon-a').style.display = 'block';
    document.querySelector('.c-correct-icon-a').style.display = 'none';

    document.querySelector('.js-answer-box-b').classList.remove('c-answer-b');
    document.querySelector('.js-answer-box-b').classList.add('c-answer-b-solution');
    document.querySelector('.c-false-icon-b').style.display = 'block';
    document.querySelector('.c-correct-icon-b').style.display = 'none';

    document.querySelector('.js-answer-box-c').classList.remove('c-answer-c');
    document.querySelector('.js-answer-box-c').classList.add('c-answer-c-solution');
    document.querySelector('.c-false-icon-c').style.display = 'block';
    document.querySelector('.c-correct-icon-c').style.display = 'none';

    document.querySelector('.js-answer-box-d').classList.remove('c-answer-d-solution');
    document.querySelector('.js-answer-box-d').classList.add('c-answer-d');
    document.querySelector('.c-false-icon-d').style.display = 'none';
    document.querySelector('.c-correct-icon-d').style.display = 'block';
  }
};

const getQuestions = async () => {
  data = await getData('https://api-eindopdracht-interaction-design.azurewebsites.net/api/data');
  console.log(data);
  showData(data);
};

const getData = async (endpoint) => {
  return fetch(endpoint)
    .then((r) => r.json())
    .then((d) => d)
    .catch((e) => console.error(e));
};
const putData = async (endpoint, data) => {
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  console.log(response);
};

const init = function () {
  console.log('App initialized');

  getQuestions();
  listenToButtonAnswerQuestion();
  listenToReloadButton();
};

document.addEventListener('DOMContentLoaded', init);
