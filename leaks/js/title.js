const titles = [
    'killsec.lol',
    'source leaks',
    'X3',
    'gorestars',
];
let currentTitleIndex = 0;

function changeTitle() {
    document.title = titles[currentTitleIndex];
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
}

setInterval(changeTitle, 300);