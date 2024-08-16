document.addEventListener("DOMContentLoaded", function() {
    const blocksContainer = document.querySelector(".memory-game-blocks");
    const gameBlocks = Array.from(blocksContainer.children);
    const controlButtons = document.querySelector(".control-buttons span");
    const triesElement = document.querySelector(".tries span");
    let wrongTries = 0;
    
    (function shuffleBlocks() {
        gameBlocks.forEach((block, index) => {
            let randomPos = Math.floor(Math.random() * gameBlocks.length);
            block.style.order = randomPos;
        });
    })();
    controlButtons.onclick = function() {
        this.parentElement.style.display = "none";
    };
    gameBlocks.forEach(block => {
        block.addEventListener("click", function() {
            flipBlock(block);
        });
    });
    function flipBlock(block) {
        block.classList.add('is-flipped');
        const allFlippedBlocks = gameBlocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
        if (allFlippedBlocks.length === 2) {
            stopClicking();
            checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
        }
    }

    function stopClicking() {
        blocksContainer.classList.add('no-clicking');

        setTimeout(() => {
            blocksContainer.classList.remove('no-clicking');
        }, 1000);
    }

    function checkMatchedBlocks(firstBlock, secondBlock) {
        if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

            firstBlock.classList.add('has-match');
            secondBlock.classList.add('has-match');
        } else {
            wrongTries++;
            triesElement.textContent = wrongTries;

            setTimeout(() => {
                firstBlock.classList.remove('is-flipped');
                secondBlock.classList.remove('is-flipped');
            }, 1000);
        }
    }
});
