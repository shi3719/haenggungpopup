const prizes = [
    { name: "My necklace 반팔티 증정", max: 3 },
    { name: "Rub-T land 목걸이", max: 4 },
    { name: "온라인 20% 할인 쿠폰", max: 5 },
    { name: "온라인 10% 할인 쿠폰", max: 30 },
    { name: "음료수 한 잔 더!", max: 30 }
];

// 로컬 스토리지에서 상품 카운트 가져오기
function getPrizeCounts() {
    const storedCounts = localStorage.getItem('prizeCounts');
    return storedCounts ? JSON.parse(storedCounts) : Array(prizes.length).fill(0);
}

// 상품 카운트 업데이트하여 로컬 스토리지에 저장
function updatePrizeCounts(counts) {
    localStorage.setItem('prizeCounts', JSON.stringify(counts));
}

// 랜덤 상품 선택
function getRandomPrize() {
    let counts = getPrizeCounts();
    let availablePrizes = prizes.filter((prize, index) => counts[index] < prize.max);
    
    // 가능한 상품이 없을 경우 (다 사용됨)
    if (availablePrizes.length === 0) {
        alert("모든 상품이 소진되었습니다.");
        return null;
    }
    
    // 총 가중치 계산 (남은 수량에 비례하여 가중치 부여 - 제곱하여 가중치 상승)
    let totalWeight = availablePrizes.reduce((sum, prize, index) => {
        let availableCount = prize.max - counts[prizes.indexOf(prize)];
        return sum + Math.pow(availableCount, 2); // 남은 수량의 제곱으로 가중치 증가
    }, 0);

    // 총 가중치 내에서 랜덤 숫자 생성
    let randomWeight = Math.random() * totalWeight;

    // 가중치 기반 상품 선택
    let cumulativeWeight = 0;
    for (let prize of availablePrizes) {
        let availableCount = prize.max - counts[prizes.indexOf(prize)];
        cumulativeWeight += Math.pow(availableCount, 2); // 제곱된 가중치 누적
        if (randomWeight <= cumulativeWeight) {
            let prizeIndex = prizes.indexOf(prize);
            counts[prizeIndex]++;
            updatePrizeCounts(counts);
            return prize.name;
        }
    }
}

// 카드 클릭 이벤트 설정
document.querySelectorAll('.flip-card').forEach((card) => {
    card.addEventListener('click', function() {
        card.classList.add('on');

        let selectedPrize = getRandomPrize();
        if (selectedPrize) {
            // 선택된 상품을 화면에 표시
            document.querySelector('.result_wrap').textContent = selectedPrize;
            document.querySelector('.popup').classList.add('on');

            // 선택된 상품의 이미지 표시 (예시)
            const selectedPrizeIndex = prizes.findIndex(prize => prize.name === selectedPrize);
            document.querySelector('.selected_card').style.backgroundImage = `url(/assets/images/gift${selectedPrizeIndex + 1}.png)`;
        }
    });
});