(function () {
  let isBotActive = false;

  // Bảng convert kana → romaji (ưu tiên match dài trước)
  const kanaMap = [
    ["あ", "A"],
    ["い", "I"],
    ["う", "U"],
    ["え", "E"],
    ["お", "O"],
    ["か", "KA"],
    ["き", "KI"],
    ["く", "KU"],
    ["け", "KE"],
    ["こ", "KO"],
    ["さ", "SA"],
    ["し", "SI"],
    ["す", "SU"],
    ["せ", "SE"],
    ["そ", "SO"],
    ["た", "TA"],
    ["ち", "TI"],
    ["つ", "TU"],
    ["て", "TE"],
    ["と", "TO"],
    ["な", "NA"],
    ["に", "NI"],
    ["ぬ", "NU"],
    ["ね", "NE"],
    ["の", "NO"],
    ["は", "HA"],
    ["ひ", "HI"],
    ["ふ", "HU"],
    ["へ", "HE"],
    ["ほ", "HO"],
    ["ま", "MA"],
    ["み", "MI"],
    ["む", "MU"],
    ["め", "ME"],
    ["も", "MO"],
    ["や", "YA"],
    ["ゆ", "YU"],
    ["よ", "YO"],
    ["ら", "RA"],
    ["り", "RI"],
    ["る", "RU"],
    ["れ", "RE"],
    ["ろ", "RO"],
    ["わ", "WA"],
    ["を", "WO"],
    ["ん", "NN"],
    ["が", "GA"],
    ["ぎ", "GI"],
    ["ぐ", "GU"],
    ["げ", "GE"],
    ["ご", "GO"],
    ["ざ", "ZA"],
    ["じ", "ZI"],
    ["ず", "ZU"],
    ["ぜ", "ZE"],
    ["ぞ", "ZO"],
    ["だ", "DA"],
    ["ぢ", "DI"],
    ["づ", "DU"],
    ["で", "DE"],
    ["ど", "DO"],
    ["ば", "BA"],
    ["び", "BI"],
    ["ぶ", "BU"],
    ["べ", "BE"],
    ["ぼ", "BO"],
    ["ぱ", "PA"],
    ["ぴ", "PI"],
    ["ぷ", "PU"],
    ["ぺ", "PE"],
    ["ぽ", "PO"],
    ["きゃ", "KYA"],
    ["きゅ", "KYU"],
    ["きょ", "KYO"],
    ["しゃ", "SYA"],
    ["しゅ", "SYU"],
    ["しょ", "SYO"],
    ["ちゃ", "TYA"],
    ["ちゅ", "TYU"],
    ["ちょ", "TYO"],
    ["にゃ", "NYA"],
    ["にゅ", "NYU"],
    ["にょ", "NYO"],
    ["ひゃ", "HYA"],
    ["ひゅ", "HYU"],
    ["ひょ", "HYO"],
    ["みゃ", "MYA"],
    ["みゅ", "MYU"],
    ["みょ", "MYO"],
    ["りゃ", "RYA"],
    ["りゅ", "RYU"],
    ["りょ", "RYO"],
    ["ぎゃ", "GYA"],
    ["ぎゅ", "GYU"],
    ["ぎょ", "GYO"],
    ["じゃ", "ZYA"],
    ["じゅ", "ZYU"],
    ["じょ", "ZYO"],
    ["びゃ", "BYA"],
    ["びゅ", "BYU"],
    ["びょ", "BYO"],
    ["ぴゃ", "PYA"],
    ["ぴゅ", "PYU"],
    ["ぴょ", "PYO"],
    ["っ", "Q"],
    ["ー", "-"],
    // ae dùng nếu có kí tự nào đặc biệt mà không đọc được thì vào dom mà thêm vào kanaMap hộ, nhớ tạo PR =)))
    ["ー", "-"],
    ["ぁ", "XA"],
    ["ぃ", "XI"],
    ["ぅ", "XU"],
    ["ぇ", "XE"],
    ["ぉ", "XO"],
    ["ゃ", "XYA"],
    ["ゅ", "XYU"],
    ["ょ", "XYO"],
    ["っ", "XTU"], // small tsu standalone (nếu không theo sau bởi kana)

    // Full-width numbers → half-width
    ["１", "1"],
    ["２", "2"],
    ["３", "3"],
    ["４", "4"],
    ["５", "5"],
    ["６", "6"],
    ["７", "7"],
    ["８", "8"],
    ["９", "9"],
    ["０", "0"],

    // Full-width symbols hay gặp
    ["　", " "],
    ["、", ","],
    ["。", "."],
    ["・", "/"],
  ];

  function kanaToRomaji(kana) {
    let result = "";
    let i = 0;
    while (i < kana.length) {
      // Thử match 2 ký tự trước (combo như きゃ)
      let matched = false;
      if (i + 1 < kana.length) {
        const two = kana.slice(i, i + 2);
        const found = kanaMap.find(([k]) => k === two);
        if (found) {
          result += found[1];
          i += 2;
          matched = true;
        }
      }
      if (!matched) {
        const one = kana[i];
        if (one === "っ") {
          // っ → double consonant của âm tiếp theo
          const next = kana[i + 1];
          if (next) {
            const nextFound = kanaMap.find(([k]) => k === next);
            if (nextFound) {
              result += nextFound[1][0]; // lấy consonant đầu
            } else {
              result += "Q";
            }
          }
          i++;
        } else {
          const found = kanaMap.find(([k]) => k === one);
          result += found ? found[1] : "";
          i++;
        }
      }
    }
    return result;
  }

  function getTargetChar() {
    const kanaContainer = document.getElementById("kanaText");
    const sentenceContainer = document.getElementById("sentenceText");
    if (!kanaContainer || !sentenceContainer) return null;

    const kanaSpans = kanaContainer.querySelectorAll("span");
    // Kana chưa gõ = span thứ 2 (không có class entered)
    const kanaRemaining = kanaSpans[1]?.textContent || "";
    const kanaEntered = kanaSpans[0]?.textContent || "";

    if (!kanaRemaining) return null;

    // Convert toàn bộ kana còn lại sang romaji
    const romajiRemaining = kanaToRomaji(kanaRemaining);

    // Lấy romaji đã gõ trong sentenceText để biết đang ở đâu trong đoạn romaji
    const sentenceSpans = sentenceContainer.querySelectorAll("span");
    const enteredRomaji = sentenceSpans[0]?.textContent || "";

    // Romaji của kana đã entered (để tính offset)
    const romajiOfEntered = kanaToRomaji(kanaEntered);

    // Offset trong romajiRemaining
    const offset = enteredRomaji.length - romajiOfEntered.length;
    const idx = Math.max(0, offset);

    return romajiRemaining[idx] || null;
  }

  window.addEventListener(
    "keydown",
    function (e) {
      if (e.key === "F8") {
        isBotActive = !isBotActive;
        // console.log("Bot:", isBotActive ? "ON" : "OFF");
        return;
      }
    },
    true,
  );

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
