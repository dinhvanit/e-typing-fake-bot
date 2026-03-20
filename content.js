(function () {
  let isBotActive = false;

  // F8 để bật/tắt
  window.addEventListener(
    "keydown",
    function (e) {
      if (e.key === "F8") {
        isBotActive = !isBotActive;
        return;
      }
    },
    true,
  );

  // fake typing
  window.addEventListener(
    "keydown",
    function (e) {
      if (!isBotActive || !e.isTrusted || e.key.length !== 1 || e.key === "F8")
        return;

      const targetChar = getTargetChar();

      if (targetChar) {
        e.preventDefault();
        e.stopImmediatePropagation();
        pressKey(targetChar, e.target);
      }
    },
    true,
  );

  function getTargetChar() {
    const container = document.getElementById("sentenceText");
    if (!container) return null;

    const spans = container.querySelectorAll("span");

    if (spans.length >= 2) {
      const text = spans[1].textContent;
      if (text.length > 0) return text[0];
    }

    for (let span of spans) {
      if (span.textContent.length > 0) return span.textContent[0];
    }
    return null;
  }

  function pressKey(char, target) {
    const upper = char.toUpperCase();
    const code = upper.charCodeAt(0);
    const charCode = char.charCodeAt(0);

    const options = {
      key: char,
      code: `Key${upper}`,
      keyCode: code,
      which: code,
      charCode: charCode,
      bubbles: true,
      cancelable: true,
      view: window,
    };

    const el = target || document.activeElement || document;

    const dispatch = (type, opts) => {
      const ev = new KeyboardEvent(type, opts);
      Object.defineProperty(ev, "keyCode", { get: () => code });
      Object.defineProperty(ev, "which", { get: () => code });
      Object.defineProperty(ev, "charCode", {
        get: () => (type === "keypress" ? charCode : 0),
      });
      el.dispatchEvent(ev);
    };

    dispatch("keydown", options);
    dispatch("keypress", options);
    dispatch("keyup", options);
  }
})();
