// Xisaabi isbeddelada coins, heer, iyo khibrad
const coinsPerTap = 1; // Coins la helayo marka la taabto
const maxLevel = 100; // Heerka ugu badan

// Soo hel xogta isticmaalaha
function getUserData(username) {
    let userData = JSON.parse(localStorage.getItem('userData')) || {};
    if (!userData[username]) {
        userData[username] = {
            coinAmount: 0,
            level: 1,
            experience: 0
        };
    }
    return userData[username];
}

// Kaydi xogta isticmaalaha
function setUserData(username, data) {
    let userData = JSON.parse(localStorage.getItem('userData')) || {};
    userData[username] = data;
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Korodhka coins
function addCoins(username) {
    let userData = getUserData(username);
    userData.coinAmount += coinsPerTap;
    userData.experience += coinsPerTap;

    const experienceForNextLevel = 1000 * userData.level; // Tusaale: 1,000 coins ayaa loo baahan yahay heer kasta

    while (userData.experience >= experienceForNextLevel && userData.level < maxLevel) {
        userData.experience -= experienceForNextLevel;
        userData.level++;
    }

    setUserData(username, userData);
    updateScore(username);
    updateLevel(username);

    // Kaydi coins-ka cusub si loo isticmaalo bogga kale
    localStorage.setItem('latestCoinAmount', userData.coinAmount);
}

// Cusboonaysii muujiye coins
function updateScore(username) {
    let userData = getUserData(username);
    document.getElementById('coinAmount').textContent = userData.coinAmount;
}

// Cusboonaysii muujiye heerka
function updateLevel(username) {
    let userData = getUserData(username);
    document.getElementById('currentLevel').textContent = userData.level;
    updateProgressBar(userData.experience, 1000 * userData.level); // Cusboonaysii baararka horumarka
}

// Cusboonaysii baararka horumarka
function updateProgressBar(currentExperience, experienceForNextLevel) {
    const progress = (currentExperience / experienceForNextLevel) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

// Bilow xogta isticmaalaha
function initProfile(username) {
    let profilePic = localStorage.getItem('profilePic') || 'https://via.placeholder.com/50';
    let userName = username || 'User';

    document.getElementById('profilePic').src = profilePic;
    document.getElementById('userName').textContent = userName;
}

// Bilow bogga
function init() {
    const username = prompt("Geli magacaaga isticmaalaha:");

    if (!username) {
        alert("Magaca isticmaalaha waa lagama maarmaan!");
        return;
    }

    initProfile(username);
    updateScore(username);
    updateLevel(username);

    // Samee dhacdada riixida hamster
    document.querySelector('.hamster').onclick = function () {
        addCoins(username);
    };
}

// Wac init marka boggu la furo
window.onload = init;
