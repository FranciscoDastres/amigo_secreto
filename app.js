let friends = [];

function addFriend() {
    const friendInput = document.getElementById("friend");
    const friendName = friendInput.value.trim();

    if (friendName !== "") {
        friends.push(friendName);
        updateFriendList();
        friendInput.value = "";
    }
}

function updateFriendList() {
    const friendsList = document.getElementById("friendsList");
    friendsList.innerHTML = "";

    friends.forEach(friend => {
        const li = document.createElement("li");
        li.textContent = friend;
        friendsList.appendChild(li);
    });

    const drawButton = document.querySelector(".button-draw");
    drawButton.disabled = friends.length === 0;
}

function drawSanta() {
    if (friends.length < 2) {
        alert("You need at least two friends to make the draw.");
        return;
    }

    const shuffledFriends = shuffleArray([...friends]);
    const results = assignSecretSanta(shuffledFriends);
    showResults(results);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function assignSecretSanta(shuffledFriends) {
    const results = [];

    for (let i = 0; i < shuffledFriends.length; i++) {
        const giver = shuffledFriends[i];
        const receiver = shuffledFriends[(i + 1) % shuffledFriends.length];
        results.push({ giver, receiver });
    }

    return results;
}

function showResults(results) {
    const resultList = document.getElementById("result");
    resultList.innerHTML = "<h3>Results:</h3>";

    results.forEach(result => {
        const li = document.createElement("li");
        li.textContent = `${result.giver} -> ${result.receiver}`;
        resultList.appendChild(li);
    });
}
