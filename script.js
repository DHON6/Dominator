const titleText = "<img src='d.svg' alt='Логотип D' class='inline-logo inline-logo-h2' /><img src='o.svg' alt='Логотип o' class='inline-logo inline-logo-h2' /><img src='m.svg' alt='Логотип m' class='inline-logo inline-logo-h2' /><img src='i.svg' alt='Логотип i' class='inline-logo inline-logo-h2' /><img src='n.svg' alt='Логотип n' class='inline-logo inline-logo-h2' /><img src='a.svg' alt='Логотип a' class='inline-logo inline-logo-h2' /><img src='t.svg' alt='Логотип t' class='inline-logo inline-logo-h2' /><img src='o.svg' alt='Логотип o' class='inline-logo inline-logo-h2' /><img src='r.svg' alt='Логотип r' class='inline-logo inline-logo-h2' />";
const descriptionText = "Получи преимущество в Counter-Strike 2 с нашими модификациями!";
const animatedTexts = {
  "animated-title": "Доминируй в Counter-Strike 2 с <img src='d.svg' alt='Логотип D' class='inline-logo inline-logo-h1' /><img src='o.svg' alt='Логотип o' class='inline-logo inline-logo-h1' /><img src='m.svg' alt='Логотип m' class='inline-logo inline-logo-h1' /><img src='i.svg' alt='Логотип i' class='inline-logo inline-logo-h1' /><img src='n.svg' alt='Логотип n' class='inline-logo inline-logo-h1' /><img src='a.svg' alt='Логотип a' class='inline-logo inline-logo-h1' /><img src='t.svg' alt='Логотип t' class='inline-logo inline-logo-h1' /><img src='o.svg' alt='Логотип o' class='inline-logo inline-logo-h1' /><img src='r.svg' alt='Логотип r' class='inline-logo inline-logo-h1' />",
  "animated-intro": "<img src='d.svg' alt='Логотип D' class='inline-logo' /><img src='o.svg' alt='Логотип o' class='inline-logo' /><img src='m.svg' alt='Логотип m' class='inline-logo' /><img src='i.svg' alt='Логотип i' class='inline-logo' /><img src='n.svg' alt='Логотип n' class='inline-logo' /><img src='a.svg' alt='Логотип a' class='inline-logo' /><img src='t.svg' alt='Логотип t' class='inline-logo' /><img src='o.svg' alt='Логотип o' class='inline-logo' /><img src='r.svg' alt='Логотип r' class='inline-logo' /> — твой ключ к превосходству в игре.",
  "animated-screenshot-text": "Посмотрите, как работают наши модификации в Counter-Strike 2:",
  "animated-aimbot-text": "Aimbot: Молниеносное наведение на врагов",
  "animated-wallhack-text": "Wallhack: Полный контроль над картой"
};

function typeEffect(element, text, speed = 50, callback) {
  let i = 0;
  element.innerHTML = "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = text;
  const nodes = Array.from(tempDiv.childNodes);
  let nodeIndex = 0;
  let charIndex = 0;

  const typeNext = () => {
    if (nodeIndex >= nodes.length) {
      if (callback) callback();
      return;
    }

    const node = nodes[nodeIndex];
    if (node.nodeType === Node.TEXT_NODE) {
      const textContent = node.textContent || "";
      if (charIndex < textContent.length) {
        element.appendChild(document.createTextNode(textContent.charAt(charIndex)));
        charIndex++;
        setTimeout(typeNext, speed);
      } else {
        nodeIndex++;
        charIndex = 0;
        setTimeout(typeNext, speed);
      }
    } else {
      element.appendChild(node.cloneNode(true));
      nodeIndex++;
      setTimeout(typeNext, speed);
    }
  };
  typeNext();
}

function downloadCheats() {
  const thanks = document.getElementById("thanks-message");
  thanks.textContent = "Скачивание началось! Проверьте ваш браузер.";
  thanks.classList.remove("error");
  thanks.focus();

  setTimeout(() => {
    const randomError = Math.random() < 0.2; // 20% шанс ошибки
    if (randomError) {
      thanks.textContent = "Ошибка: Не удалось начать скачивание.";
      thanks.classList.add("error");
    }
  }, 2000);
}

window.onload = () => {
  const introText = document.getElementById("intro-text");
  const titleElem = document.getElementById("title");
  const descElem = document.getElementById("description");

  if (introText) {
    introText.style.opacity = 1;
  }

  // Анимация выбранных текстов
  const animateNext = (index = 0) => {
    const keys = Object.keys(animatedTexts);
    if (index >= keys.length) {
      if (titleElem && descElem) {
        typeEffect(titleElem, titleText, 50, () => {
          typeEffect(descElem, descriptionText, 50);
        });
      }
      return;
    }
    const key = keys[index];
    const element = document.getElementById(key);
    if (element) {
      typeEffect(element, animatedTexts[key], 50, () => animateNext(index + 1));
    } else {
      animateNext(index + 1);
    }
  };
  animateNext();

  // Показ/скрытие навигационной панели при прокрутке
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 100) {
      navbar.classList.add("visible");
    } else {
      navbar.classList.remove("visible");
    }
    lastScrollTop = scrollTop;
  });
};