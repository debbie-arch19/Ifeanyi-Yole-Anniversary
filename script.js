
/* =========================================
   IF EANYI & SAMUEL
   ANNIVERSARY WEBSITE
========================================= */


/* =========================================
   1. ANNIVERSARY TIMER
========================================= */

const weddingDate = new Date(2024, 10, 26, 0, 0, 0);

function updateTimer() {
  const now = new Date();
  const cursor = new Date(weddingDate);

  let years = 0;
  let months = 0;

  while (true) {
    const next = new Date(cursor);
    next.setFullYear(next.getFullYear() + 1);

    if (next > now) break;

    cursor.setFullYear(cursor.getFullYear() + 1);
    years++;
  }

  while (true) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);

    if (next > now) break;

    cursor.setMonth(cursor.getMonth() + 1);
    months++;
  }

  const days = Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
     Date.UTC(cursor.getFullYear(), cursor.getMonth(), cursor.getDate()))
    / 86400000
  );

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateTimer();
setInterval(updateTimer, 1000);


/* =========================================
   2. PAGE ELEMENTS
========================================= */

const homepage = document.getElementById("homepage");
const treasureRoom = document.getElementById("treasure-room");
const giftContent = document.getElementById("gift-content");

const videoGift = document.getElementById("video-gift");
const letterGift = document.getElementById("letter-gift");
const gamesGift = document.getElementById("games-gift");

const gamesMenu = document.getElementById("games-menu");
const gameScreen = document.getElementById("game-screen");

const video = document.getElementById("anniversary-video");

const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =========================================
   3. HELPER FUNCTIONS
========================================= */

function animateElement(element, frames, duration = 600) {
  if (!element || prefersReducedMotion) {
    return Promise.resolve();
  }

  return element.animate(frames, {
    duration,
    easing: "ease-in-out",
    fill: "forwards"
  }).finished.catch(() => {});
}

function showTreasures() {
  homepage.classList.add("hidden");
  giftContent.classList.add("hidden");
  treasureRoom.classList.remove("hidden");
}

function stopVideo() {
  if (video && !video.paused) {
    video.pause();
  }
}


/* =========================================
   4. ENVELOPE OPENING
========================================= */

const envelopeButton = document.getElementById("open-envelope");

let envelopeBusy = false;

envelopeButton.addEventListener("click", async () => {

  if (envelopeBusy) return;

  envelopeBusy = true;
  envelopeButton.disabled = true;

  const envelopeIcon = envelopeButton.querySelector(".envelope-icon");

  await animateElement(envelopeIcon, [
    { transform: "scale(1) rotate(0deg)" },
    { transform: "scale(1.3) rotate(-15deg)" },
    { transform: "scale(1.3) rotate(15deg)" },
    { transform: "scale(0.8) rotate(0deg)" }
  ], 650);

  homepage.classList.add("hidden");
  treasureRoom.classList.remove("hidden");

  envelopeButton.disabled = false;
  envelopeBusy = false;

});


/* =========================================
   5. BACK TO HOMEPAGE
========================================= */

document.getElementById("back-home").addEventListener("click", () => {

  treasureRoom.classList.add("hidden");
  giftContent.classList.add("hidden");
  homepage.classList.remove("hidden");

});


/* =========================================
   6. TREASURE CHEST OPENING
========================================= */

let chestBusy = false;

document.querySelectorAll(".treasure").forEach(chest => {

  chest.addEventListener("click", async () => {

    if (chestBusy) return;

    chestBusy = true;
    chest.disabled = true;

    const chestIcon = chest.querySelector(".chest-icon");

    await animateElement(chestIcon, [
      {
        transform: "scale(1) rotateX(0deg)",
        filter: "brightness(1)"
      },
      {
        transform: "scale(1.15) rotateX(-15deg)",
        filter: "brightness(1.7)"
      },
      {
        transform: "scale(1.25) rotateX(10deg)",
        filter: "brightness(1.5)"
      },
      {
        transform: "scale(0.9)",
        filter: "brightness(1)"
      }
    ], 700);

    const selectedGift = chest.dataset.treasure;

    treasureRoom.classList.add("hidden");
    giftContent.classList.remove("hidden");

    videoGift.classList.add("hidden");
    letterGift.classList.add("hidden");
    gamesGift.classList.add("hidden");

    if (selectedGift === "video") {
      videoGift.classList.remove("hidden");
    }

    if (selectedGift === "letter") {
      letterGift.classList.remove("hidden");
    }

    if (selectedGift === "games") {
      gamesGift.classList.remove("hidden");
      gamesMenu.classList.remove("hidden");
      gameScreen.classList.add("hidden");
    }

    chest.disabled = false;
    chestBusy = false;

  });

});


/* =========================================
   7. BACK TO TREASURES
========================================= */

document.getElementById("back-treasures").addEventListener("click", () => {

  stopVideo();

  giftContent.classList.add("hidden");
  treasureRoom.classList.remove("hidden");

});


/* =========================================
   8. GAME NAVIGATION
========================================= */

document.querySelectorAll(".game-choice").forEach(button => {

  button.addEventListener("click", () => {

    const selectedGame = button.dataset.game;

    gamesMenu.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    if (selectedGame === "who-knows") {
      showWhoKnows();
    }

    if (selectedGame === "this-or-that") {
      showThisOrThat();
    }

    if (selectedGame === "remember-when") {
      showRememberWhen();
    }

    if (selectedGame === "bucket-list") {
      showBucketList();
    }

  });

});


document.getElementById("back-games").addEventListener("click", () => {

  gameScreen.classList.add("hidden");
  gamesMenu.classList.remove("hidden");

});


/* =========================================
   9. GAME: WHO KNOWS WHO?
========================================= */

const whoKnowsQuestions = [
  "Who is more likely to fall asleep during a movie?",
  "Who takes longer to get ready?",
  "Who is more stubborn?",
  "Who is more likely to forget where they kept something?",
  "Who is the better cook?",
  "Who is more romantic?",
  "Who spends more time on their phone?",
  "Who is more likely to start laughing at the wrong time?",
  "Who apologises first after an argument?",
  "Who is more likely to suggest a spontaneous outing?"
];

function showWhoKnows() {

  document.getElementById("game-title").textContent =
    "Who Knows Who?";

  const area = document.getElementById("game-area");

  let currentQuestion = 0;

  area.innerHTML = `
    <p>Amicably discern the answers to these questions.</p>
    <h3 id="who-question"></h3>
    <p id="who-count"></p>
    <button id="next-who">Next Question</button>
  `;

  function loadQuestion() {

    document.getElementById("who-question").textContent =
      whoKnowsQuestions[currentQuestion];

    document.getElementById("who-count").textContent =
      `Question ${currentQuestion + 1} of ${whoKnowsQuestions.length}`;

    document.getElementById("next-who").textContent =
      currentQuestion === whoKnowsQuestions.length - 1
        ? "Start Again"
        : "Next Question";

  }

  document.getElementById("next-who").addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion >= whoKnowsQuestions.length) {
      currentQuestion = 0;
    }

    loadQuestion();

  });

  loadQuestion();

}


/* =========================================
   10. GAME: THIS OR THAT
========================================= */

const thisOrThatQuestions = [
  ["Beach holiday", "Picnic"],
  ["Movie night", "Game night"],
  ["Cooking together", "Eating out"],
  ["Morning dates", "Night dates"],
  ["Matching outfits", "Coordinating Colours"],
  ["Road trip", "Flight"],
  ["Sweet messages", "Long phone calls"],
  ["Surprise gifts", "Planned gifts"],
  ["Dancing together", "Singing together"],
  ["Staying indoors", "Going on an adventure"],
  ["Weekends at work", "Free Weekends"],
  ["Taking pictures", "Making videos"]
];

function showThisOrThat() {

  document.getElementById("game-title").textContent =
    "This or That";

  const area = document.getElementById("game-area");

  let currentQuestion = 0;

  area.innerHTML = `
    <p>Choose one. No overthinking!</p>
    <h3 id="choice-question">Which would you choose?</h3>
    <div id="choice-buttons"></div>
    <p id="choice-result"></p>
    <button id="next-choice">Next</button>
  `;

  function loadChoice() {

    const question = thisOrThatQuestions[currentQuestion];

    document.getElementById("choice-buttons").innerHTML = `
      <button class="choice-option">${question[0]}</button>
      <button class="choice-option">${question[1]}</button>
    `;

    document.getElementById("choice-result").textContent =
      `Question ${currentQuestion + 1} of ${thisOrThatQuestions.length}`;

    document.getElementById("next-choice").textContent =
      currentQuestion === thisOrThatQuestions.length - 1
        ? "Start Again"
        : "Next";

    document.querySelectorAll(".choice-option").forEach(option => {

      option.addEventListener("click", () => {

        document.getElementById("choice-result").textContent =
          `You chose: ${option.textContent} ♡`;

      });

    });

  }

  document.getElementById("next-choice").addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion >= thisOrThatQuestions.length) {
      currentQuestion = 0;
    }

    loadChoice();

  });

  loadChoice();

}


/* =========================================
   11. GAME: REMEMBER WHEN?
========================================= */

const rememberQuestions = [
  "What was your first impression of each other?",
  "Who made the first move?",
  "What is one moment together you will never forget?",
  "What was your first proper date like?",
  "What is the funniest thing that has happened between you?",
  "What song reminds you of your relationship?",
  "What is one place you have always wanted to visit together?",
  "When did you realise you were in love?",
  "What is one thing you hope to experience together?",
  "If you could relive one day together, which would it be?"
];

function showRememberWhen() {

  document.getElementById("game-title").textContent =
    "Remember When?";

  const area = document.getElementById("game-area");

  let currentQuestion = 0;

  area.innerHTML = `
    <p>Some memories deserve a little revisit.</p>
    <h3 id="memory-question"></h3>
    <p id="memory-count"></p>
    <button id="next-memory">Next Memory</button>
  `;

  function loadMemory() {

    document.getElementById("memory-question").textContent =
      rememberQuestions[currentQuestion];

    document.getElementById("memory-count").textContent =
      `Memory ${currentQuestion + 1} of ${rememberQuestions.length}`;

    document.getElementById("next-memory").textContent =
      currentQuestion === rememberQuestions.length - 1
        ? "Start Again"
        : "Next Memory";

  }

  document.getElementById("next-memory").addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion >= rememberQuestions.length) {
      currentQuestion = 0;
    }

    loadMemory();

  });

  loadMemory();

}


/* =========================================
   12. GAME: THINGS WE SHOULD DO
   SHARED BUCKET LIST
========================================= */

const bucketActivities = [
  "Watch an entire movie together.",
  "Visit a water park together.",
  "Have a proper date night.",
  "Take a trip somewhere new.",
  "Cook a meal together.",
  "Wear matching ankara to an assembly, snap pictures and post on Instagram 😉.",
  "Spend an entire night talking about your favourite things about each other.",
  "Have a picnic-style family worship.",
  "Attempt a DIY craft together.",
  "Cook each other's favourite meal.",
  "Attempt a drawing of each other.",
  "Have a karaoke night."
];

const savedActivitiesKey = "ifeanyiSamuelBucketList";

function showBucketList() {

  document.getElementById("game-title").textContent =
    "Things We Should Do";

  const area = document.getElementById("game-area");

  let completed = [];

  try {

    completed = JSON.parse(
      localStorage.getItem(savedActivitiesKey) || "[]"
    );

    if (!Array.isArray(completed)) {
      completed = [];
    }

  } catch (error) {

    completed = [];

  }

  area.innerHTML = `
    <p>Little plans, shared memories, and things to look forward to.</p>
    <p class="bucket-progress" id="bucket-progress"></p>
    <div id="bucket-items"></div>
  `;

  const list = document.getElementById("bucket-items");

  bucketActivities.forEach((activity, index) => {

    const item = document.createElement("div");
    item.className = "bucket-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `activity-${index}`;
    checkbox.checked = completed.includes(index);

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = activity;

    checkbox.addEventListener("change", () => {

      if (checkbox.checked) {

        if (!completed.includes(index)) {
          completed.push(index);
        }

      } else {

        completed = completed.filter(item => item !== index);

      }

      try {
        localStorage.setItem(
          savedActivitiesKey,
          JSON.stringify(completed)
        );
      } catch (error) {
        console.warn("Could not save bucket-list progress.");
      }

      updateProgress();

    });

    item.appendChild(checkbox);
    item.appendChild(label);

    list.appendChild(item);

  });

  function updateProgress() {

    document.getElementById("bucket-progress").textContent =
      `${completed.length} of ${bucketActivities.length} things done ♡`;

  }

  updateProgress();

}
