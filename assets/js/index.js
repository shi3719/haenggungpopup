//100vh 브라우저 환경 커버하기
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// resize
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    ingredientNextHeightSelect();
})


const flipCards = document.querySelectorAll('.flip-card');
const resultWrap = document.querySelector('.result_wrap');
const selectedCard = document.querySelector('.selected_card');
const flipCardBacks = document.querySelectorAll('.flip-card-back');
const popup = document.querySelector('.popup');

const getPrize = () => {
    const ranNum = Math.floor((Math.random() * 99) + 1);
    const gift = ['Logo Sticker', 'Vibrancy Sticker', 'Light Badge', 'Person Objet Candle'];
    const pbt = [84, 10, 5, 1];
    let sum = 0;

    for (let i = 0; i < pbt.length; i++) {
        sum += pbt[i];
        if (ranNum <= sum) {
            return { gift: gift[i], index: i };
        }
    }

    // If ranNum is larger than the sum of all probabilities
    return { gift: gift[gift.length - 1], index: gift.length - 1 };
}

flipCards.forEach((flipCard) => {
    flipCard.addEventListener('click', () => {
        const result = getPrize();
        resultWrap.innerHTML = `${result.gift}`;
        selectedCard.style.backgroundImage = `url(/assets/images/gift${result.index + 1}.png)`;
        flipCardBacks.forEach((flipCardBack) => {
            flipCardBack.style.backgroundImage = `url(/assets/images/gift${result.index + 1}.png)`
        });

        flipCards.forEach((flipCard) => {
            flipCard.classList.add('off');
        })
        
        flipCard.classList.remove('off');
        flipCard.classList.add('on');

        setTimeout(() => {
            popup.classList.add('on');
        }, 1000);
    })
})