'use strict';
let data, globalCorrectAnswer, globalStukData;
let percentageA, percentageB, percentageC, percentageD;
var myChartCircleA, myChartCircleB, myChartCircleC, myChartCircleD;
const listenToButtonAnswerQuestion = function () {
  document.querySelectorAll('.js-button').forEach((button) => {
    button.addEventListener('click', function (e) {
      document.querySelector('.c-flip--inner').classList.toggle('is-flipped');
      disableButtons();
    });
  });
};

const listenToReloadButton = function () {
  document.querySelectorAll('.js-new-question').forEach((button) => {
    button.addEventListener('click', function () {
      document.querySelector('.c-card--front').style.display = 'block';
      document.querySelector('.c-card--answers').style.display = 'none';
      if (document.querySelector('.c-flip--inner').classList.contains('is-flipped')) {
        document.querySelector('.c-flip--inner').classList.toggle('is-flipped');
      }
      showData(data);
      disableButtons();
    });
  });
};
const callbackCorrectAnswer = function (jsonObject) {
  //console.log(jsonObject);
};
const callbackFalseAnswer = function (jsonObject) {
  //console.log(jsonObject);
};

const addNumberToAnswer = function (id) {
  switch (id) {
    case 'a':
      globalStukData['answers-a'] = parseInt(globalStukData['answers-a']) + 1;
      putData('https://api-eindopdracht-interaction-design.azurewebsites.net/api/data', globalStukData);
      break;
    case 'b':
      globalStukData['answers-b'] = parseInt(globalStukData['answers-b']) + 1;
      putData('https://api-eindopdracht-interaction-design.azurewebsites.net/api/data', globalStukData);
      break;
    case 'c':
      globalStukData['answers-c'] = parseInt(globalStukData['answers-c']) + 1;
      putData('https://api-eindopdracht-interaction-design.azurewebsites.net/api/data', globalStukData);
      break;
    case 'd':
      globalStukData['answers-d'] = parseInt(globalStukData['answers-d']) + 1;
      putData('https://api-eindopdracht-interaction-design.azurewebsites.net/api/data', globalStukData);
      break;
    default:
      console.log('error');
  }
};
const listenToAnswers = function () {
  document.querySelectorAll('.js-answer').forEach((answer) => {
    answer.addEventListener('click', function (e) {
      let id = this.getAttribute('id');
      addNumberToAnswer(id);
      if (id === globalCorrectAnswer) {
        document.querySelector('.c-answer-feedbacktext').classList.remove('c-answer-feedbacktext-false');
        document.querySelector('.c-answer-feedbacktext').classList.add('c-answer-feedbacktext-correct');
        document.querySelector('.c-answer-feedbacktext').innerHTML = 'Correct!';
      } else {
        document.querySelector('.c-answer-feedbacktext').classList.remove('c-answer-feedbacktext-true');
        document.querySelector('.c-answer-feedbacktext').classList.add('c-answer-feedbacktext-false');
        document.querySelector('.c-answer-feedbacktext').innerHTML = 'False!';
      }

      document.querySelector('.c-card--front').style.display = 'none';
      document.querySelector('.c-card--answers').style.display = 'block';
      disableButtons();
    });
  });
};

const disableButtons = function () {
  document.querySelectorAll('.js-disable').forEach((button) => {
    button.tabIndex = -1;
  });

  if (document.querySelector('.c-flip--inner').classList.contains('is-flipped')) {
    document.querySelector('.js-button--question').tabIndex = 0;
    document.querySelector('.js-new-question').tabIndex = 0;
  }
  if (!document.querySelector('.c-flip--inner').classList.contains('is-flipped')) {
    document.querySelector('.js-answer-a').tabIndex = 0;
    document.querySelector('.js-answer-b').tabIndex = 0;
    document.querySelector('.js-answer-c').tabIndex = 0;
    document.querySelector('.js-answer-d').tabIndex = 0;
    document.querySelector('.js-button--answer').tabIndex = 0;
    document.querySelector('.js-new-question').tabIndex = 0;
  }
  if (document.querySelector('.c-card--front').style.display === 'none') {
    document.querySelector('.js-new-question').tabIndex = 0;
    //document.querySelector('.js-button-question').tabIndex = 1;
  }
};

const showData = function (data) {
  let random = Math.floor(Math.random() * data.length);
  let stukdata = data[random];
  globalStukData = stukdata;
  globalCorrectAnswer = `${stukdata['correct-option']}`;
  let scrollBars = document.querySelectorAll('.js-range');
  for (const item of scrollBars) {
    item.value = stukdata['difficulty'];
  }

  let categories = document.querySelectorAll('.js-category');
  for (const item of categories) {
    item.innerHTML = `Category: ${stukdata['category']}`;
  }
  let questions = document.querySelectorAll('.js-question');
  for (const item of questions) {
    item.innerHTML = `${stukdata['question']}`;
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
  percentageA = Math.round((parseInt(stukdata['answers-a']) / totaalPercentage) * 100);
  drawCircleA();
  percentageB = Math.round((parseInt(stukdata['answers-b']) / totaalPercentage) * 100);
  drawCircleB();
  percentageC = Math.round((parseInt(stukdata['answers-c']) / totaalPercentage) * 100);
  drawCircleC();
  percentageD = Math.round((parseInt(stukdata['answers-d']) / totaalPercentage) * 100);
  drawCircleD();

  document.querySelector('.js-answer-def').innerHTML = stukdata['answer'];
  if (stukdata['correct-option'].includes('a')) {
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

  showData(data);
};

const drawCircleA = function () {
  var chartProgress = document.getElementById('chartProgressA');

  if (chartProgress) {
    myChartCircleA = new Chart('chartProgressA', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'Option A',
            percent: percentageA,
            backgroundColor: ['#FF0000'],
          },
        ],
      },
      plugins: [
        {
          beforeInit: (chart) => {
            const dataset = chart.data.datasets[0];
            chart.data.labels = [dataset.label];
            dataset.data = [dataset.percent, 100 - dataset.percent];
          },
        },
        {
          beforeDraw: (chart) => {
            var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
            ctx.restore();
            var fontSize = (height / 100).toFixed(2);
            ctx.font = fontSize + 'em sans-serif';
            ctx.fillStyle = '#9b9b9b';
            ctx.textBaseline = 'middle';
            var text = chart.data.datasets[0].percent + '%',
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ],
      options: {
        maintainAspectRatio: true,
        responsive: true,
        cutoutPercentage: 70,
        rotation: Math.PI / 2,
        legend: {
          display: false,
        },
        tooltips: {
          filter: (tooltipItem) => tooltipItem.index == 0,
        },
      },
    });
  }
};
const drawCircleB = function () {
  var chartProgress = document.getElementById('chartProgressB');

  if (chartProgress) {
    myChartCircleB = new Chart('chartProgressB', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'Option B',
            percent: percentageB,
            backgroundColor: ['#0000FF'],
          },
        ],
      },
      plugins: [
        {
          beforeInit: (chart) => {
            const dataset = chart.data.datasets[0];
            chart.data.labels = [dataset.label];
            dataset.data = [dataset.percent, 100 - dataset.percent];
          },
        },
        {
          beforeDraw: (chart) => {
            var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
            ctx.restore();
            var fontSize = (height / 100).toFixed(2);
            ctx.font = fontSize + 'em sans-serif';
            ctx.fillStyle = '#9b9b9b';
            ctx.textBaseline = 'middle';
            var text = chart.data.datasets[0].percent + '%',
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ],
      options: {
        maintainAspectRatio: true,
        responsive: true,
        cutoutPercentage: 70,
        rotation: Math.PI / 2,
        legend: {
          display: false,
        },
        tooltips: {
          filter: (tooltipItem) => tooltipItem.index == 0,
        },
      },
    });
  }
};

const drawCircleC = function () {
  var chartProgress = document.getElementById('chartProgressC');

  if (chartProgress) {
    myChartCircleC = new Chart('chartProgressC', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'Option C',
            percent: percentageC,
            backgroundColor: ['#B8530F'],
          },
        ],
      },
      plugins: [
        {
          beforeInit: (chart) => {
            const dataset = chart.data.datasets[0];
            chart.data.labels = [dataset.label];
            dataset.data = [dataset.percent, 100 - dataset.percent];
          },
        },
        {
          beforeDraw: (chart) => {
            var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
            ctx.restore();
            var fontSize = (height / 100).toFixed(2);
            ctx.font = fontSize + 'em sans-serif';
            ctx.fillStyle = '#9b9b9b';
            ctx.textBaseline = 'middle';
            var text = chart.data.datasets[0].percent + '%',
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ],
      options: {
        maintainAspectRatio: true,
        responsive: true,
        cutoutPercentage: 70,
        rotation: Math.PI / 2,
        legend: {
          display: false,
        },
        tooltips: {
          filter: (tooltipItem) => tooltipItem.index == 0,
        },
      },
    });
  }
};

const drawCircleD = function () {
  var chartProgress = document.getElementById('chartProgressD');

  if (chartProgress) {
    myChartCircleD = new Chart('chartProgressD', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'Option D',
            percent: percentageD,
            backgroundColor: ['#008000'],
          },
        ],
      },
      plugins: [
        {
          beforeInit: (chart) => {
            const dataset = chart.data.datasets[0];
            chart.data.labels = [dataset.label];
            dataset.data = [dataset.percent, 100 - dataset.percent];
          },
        },
        {
          beforeDraw: (chart) => {
            var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
            ctx.restore();
            var fontSize = (height / 100).toFixed(2);
            ctx.font = fontSize + 'em sans-serif';
            ctx.fillStyle = '#9b9b9b';
            ctx.textBaseline = 'middle';
            var text = chart.data.datasets[0].percent + '%',
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ],
      options: {
        maintainAspectRatio: true,
        responsive: true,
        cutoutPercentage: 70,
        rotation: Math.PI / 2,
        legend: {
          display: false,
        },
        tooltips: {
          filter: (tooltipItem) => tooltipItem.index == 0,
        },
      },
    });
  }
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
};

const listenToBeforePrint = function () {
  if (myChartCircleA) {
    myChartCircleA.addEventListener('beforeprint', drawCircleA);
  }
  if (myChartCircleB) {
    myChartCircleB.addEventListener('beforeprint', drawCircleB);
  }
  if (myChartCircleC) {
    myChartCircleC.addEventListener('beforeprint', drawCircleC);
  }
  if (myChartCircleD) {
    myChartCircleD.addEventListener('beforeprint', drawCircleD);
  }
};

const listenToAfterPrint = function () {
  if (myChartCircleA) {
    myChartCircleA.addEventListener('afterprint', drawCircleA);
  }
  if (myChartCircleB) {
    myChartCircleB.addEventListener('afterprint', drawCircleB);
  }
  if (myChartCircleC) {
    myChartCircleC.addEventListener('afterprint', drawCircleC);
  }
  if (myChartCircleD) {
    myChartCircleD.addEventListener('afterprint', drawCircleD);
  }
};

const init = function () {
  console.log('App initialized');

  getQuestions();
  listenToButtonAnswerQuestion();
  listenToAnswers();
  listenToReloadButton();
  listenToBeforePrint();
  listenToAfterPrint();
  disableButtons();
};
window.onbeforeprint = (event) => {
  console.log('Before print');
};

document.addEventListener('DOMContentLoaded', init);
