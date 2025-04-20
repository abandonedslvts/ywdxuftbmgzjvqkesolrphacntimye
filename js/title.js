const titles = [
    'killsec.lol',
    'ambition',
    '/info',
    'gorestars',
];
let currentTitleIndex = 0;

function changeTitle() {
    document.title = titles[currentTitleIndex];
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
}

setInterval(changeTitle, 300);
