(function () {
  "use strict";

  function addStyles() {
    if (document.getElementById("bridge-customer-ui")) return;
    var style = document.createElement("style");
    style.id = "bridge-customer-ui";
    style.textContent = [
      ".top-back{display:inline-flex;margin-left:12px;color:#164f9c;text-decoration:none;font-size:.78rem;font-weight:900}",
      ".service-note{display:inline-flex;padding:5px 9px;border-radius:999px;background:#eef4ff;color:#164f9c;font-size:.72rem;font-weight:900}",
      ".decision-note{max-width:760px;margin:0 auto 18px;padding:13px 15px;border-radius:15px;background:#f4f8fc;border:1px solid #d9e4ef;color:#34465d;font-size:.88rem;font-weight:750;line-height:1.7}",
      "@media(max-width:820px){.top-back{display:none}}"
    ].join("");
    document.head.appendChild(style);
  }

  function replacePhrases() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (node) {
      var value = node.nodeValue;
      if (!value || !value.trim()) return;
      node.nodeValue = value
        .replace(/PR｜アフィリエイト広告を含みます/g, "サービス紹介を含みます")
        .replace(/本ページにはアフィリエイト広告が含まれます/g, "本ページには広告リンクが含まれます")
        .replace(/成果対象外/g, "サービス対象外")
        .replace(/成果条件/g, "利用条件")
        .replace(/利用意思がない申込みは対象外です。/g, "実際に導入を検討している場合に利用してください。")
        .replace(/導入意思がなく、資料だけを取得する目的の申込みは避けてください。/g, "現在の課題と必要な機能を整理してから資料を確認すると、比較しやすくなります。")
        .replace(/冷やかし、情報不備、工事業者を探していない申込みは対象外です。/g, "工事場所・範囲・希望時期を整理してから確認すると、業者との相談がスムーズです。")
        .replace(/個人からの申込みはサービス対象外です。/g, "掲載サービスは法人向けです。個人名義では利用できません。")
        .replace(/個人からの申込みは対象外です。/g, "掲載サービスは法人向けです。個人名義では利用できません。");
    });
  }

  function addBackLink() {
    var topbarWrap = document.querySelector(".topbar .wrap");
    if (!topbarWrap || topbarWrap.querySelector(".top-back")) return;
    var brand = topbarWrap.querySelector(".brand");
    if (!brand) return;
    var back = document.createElement("a");
    back.className = "top-back";
    back.href = "./";
    back.textContent = "← コスト削減ナビへ戻る";
    brand.appendChild(back);
  }

  function getDecisionText() {
    var path = window.location.pathname;
    if (/pos-guide\.html$/.test(path)) {
      return "店舗数、現在のレジ、必要な機能、導入時期を整理してから資料を確認すると、比較がスムーズです。";
    }
    if (/timecard-guide\.html$/.test(path)) {
      return "従業員数、拠点数、勤務形態、希望する打刻方法を整理してから確認してください。";
    }
    if (/business-wifi-guide\.html$/.test(path)) {
      return "利用場所、必要台数、通信容量、利用期間が分かる状態で確認すると、適切なプランを比べやすくなります。";
    }
    if (/led-guide\.html$/.test(path)) {
      return "工事場所、照明数、希望時期、現地調査の可否を整理し、具体的に工事を検討する段階で確認してください。";
    }
    return "現在の課題、必要な条件、導入時期を整理し、具体的に比較する段階で確認してください。";
  }

  function addDecisionNote() {
    var adShell = document.querySelector("#official .ad-shell, #official .adbox");
    if (!adShell || adShell.parentElement.querySelector(".decision-note")) return;
    var note = document.createElement("p");
    note.className = "decision-note";
    note.textContent = getDecisionText();
    adShell.parentElement.insertBefore(note, adShell);
  }

  function polishPage() {
    addStyles();
    replacePhrases();
    addBackLink();
    addDecisionNote();

    var topDisclosure = document.querySelector(".topbar .pr");
    if (topDisclosure) {
      topDisclosure.className = "service-note";
      topDisclosure.textContent = "サービス紹介を含みます";
    }

    var officialHeading = document.querySelector("#official .eyebrow");
    if (officialHeading) officialHeading.textContent = "SERVICE INFORMATION";

    var legalHeading = document.querySelector(".legal h2");
    if (legalHeading) legalHeading.textContent = "ご利用上の注意";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", polishPage);
  } else {
    polishPage();
  }
})();