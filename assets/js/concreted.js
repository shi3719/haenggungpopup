const prizescon = [
    { name: "콘크리티드 마스킹 테이프", max: 97 },
    { name: "콘크리티드 향수", max: 3 }
];

// 로컬 스토리지에서 상품 카운트 가져오기
function getPrizeCounts() {
    const storedCounts = localStorage.getItem('prizeCountscon');
    return storedCounts ? JSON.parse(storedCounts) : Array(prizescon.length).fill(0);
}

// 상품 카운트 업데이트하여 로컬 스토리지에 저장
function updatePrizeCounts(counts) {
    localStorage.setItem('prizeCountscon', JSON.stringify(counts));
}

// 랜덤 상품 선택
function getRandomPrize() {
    let counts = getPrizeCounts();
    let availablePrizes = prizescon.filter((prize, index) => counts[index] < prize.max);
    
    // 가능한 상품이 없을 경우 (다 사용됨)
    if (availablePrizes.length === 0) {
        alert("모든 상품이 소진되었습니다.");
        return null;
    }
    
    let totalWeight = availablePrizes.reduce((sum, prize, index) => {
        let availableCount = prize.max - counts[prizescon.indexOf(prize)];
        return sum + availableCount;
    }, 0);

    // Generate a random number within the total weight
    let randomWeight = Math.random() * totalWeight;

    // Select a product based on weighted probability
    let cumulativeWeight = 0;
    for (let prize of availablePrizes) {
        let availableCount = prize.max - counts[prizescon.indexOf(prize)];
        cumulativeWeight += availableCount;
        if (randomWeight <= cumulativeWeight) {
            let prizeIndex = prizescon.indexOf(prize);
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

            // 예시: 선택된 상품의 이미지를 표시하는 경우
            // document.querySelector('.selected_card').style.backgroundImage = 'url(선택된 이미지 경로)';
        }
    });
});