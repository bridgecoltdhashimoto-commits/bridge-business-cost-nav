(function () {
  "use strict";

  var pageConfigs = {
    "pos-guide.html": {
      label: "POS導入前の確認",
      title: "次の3点が確認できる場合だけ、公式資料へ",
      description: "資料請求後に具体的な確認が進められる事業者へ絞り、情報収集だけのクリックを減らします。",
      items: [
        ["店舗でレジを使っている", "飲食・小売・美容・医療など、実際に会計や売上管理を行う店舗があります。"],
        ["導入課題が具体的", "現在のレジ、集計、在庫、キャッシュレス対応のうち、見直したい項目があります。"],
        ["確認連絡に対応できる", "資料請求後、会社名・店舗情報・利用目的などの確認に対応できます。"]
      ],
      warning: "レジを使用しない業種、利用意思がない申込みは対象外です。"
    },
    "timecard-guide.html": {
      label: "勤怠管理導入前の確認",
      title: "従業員管理の課題が具体的な場合だけ、公式資料へ",
      description: "従業員数や勤務形態を整理してから進むことで、資料確認後の検討を進めやすくします。",
      items: [
        ["従業員・スタッフがいる", "打刻、勤怠、シフト、休暇、残業などを管理する対象者がいます。"],
        ["現在の管理方法が分かる", "紙、表計算、既存システムなど、現在の運用と困っている点を説明できます。"],
        ["確認連絡に対応できる", "会社情報、従業員数、利用目的などの確認に対応できます。"]
      ],
      warning: "導入意思がなく、資料だけを取得する目的の申込みは避けてください。"
    },
    "business-wifi-guide.html": {
      label: "法人Wi-Fi申込前の確認",
      title: "法人名義で実際に利用する場合だけ、公式プランへ",
      description: "この広告は法人向けです。個人利用や短期間の確認だけでは成果条件を満たしません。",
      items: [
        ["法人名義で申し込む", "今回の広告は法人向けで、個人からの申込みは成果対象外です。"],
        ["業務で継続利用する", "店舗、現場、営業、出張、テレワークなど、具体的な利用目的があります。"],
        ["受取後も利用する", "Web申込み後60日以内に端末を受け取り、1か月以上継続利用する条件を確認しています。"]
      ],
      warning: "申込みだけでは成果条件を満たしません。契約期間、解約条件、通信容量も確認してください。"
    },
    "led-guide.html": {
      label: "LED工事問い合わせ前の確認",
      title: "工事計画が具体的な場合だけ、業者紹介へ",
      description: "問い合わせ後に業者または運営会社から確認連絡があります。実際に工事を検討している事業者向けです。",
      items: [
        ["工事場所が決まっている", "店舗、事務所、工場、倉庫など、LED化したい場所と範囲が分かります。"],
        ["希望時期を説明できる", "現地調査、見積、施工を進めたい時期を伝えられます。"],
        ["確認連絡に対応できる", "工事内容や場所を確認する電話・メール等の連絡に対応できます。"]
      ],
      warning: "冷やかし、情報不備、工事業者を探していない申込みは対象外です。"
    }
  };

  function injectStyles() {
    if (document.getElementById("bridge-fit-gate-style")) {
      return;
    }
    var style = document.createElement("style");
    style.id = "bridge-fit-gate-style";
    style.textContent = [
      ".fit-gate{padding:30px 0 8px}",
      ".fit-gate__box{border:2px solid color-mix(in srgb,var(--accent) 28%,#d9e4ef);border-radius:25px;padding:24px;background:linear-gradient(135deg,#fff,#f5faff);box-shadow:0 18px 44px rgba(7,26,53,.1)}",
      ".fit-gate__label{display:inline-flex;margin-bottom:8px;padding:5px 9px;border-radius:999px;background:#eaf2ff;color:#164f9c;font-size:.72rem;font-weight:1000;letter-spacing:.08em}",
      ".fit-gate h2{color:var(--navy);font-size:clamp(1.55rem,3.7vw,2.35rem);line-height:1.25;margin-bottom:8px}",
      ".fit-gate__lead{color:var(--muted);font-weight:700;margin-bottom:17px}",
      ".fit-gate__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}",
      ".fit-gate__item{padding:16px;border:1px solid var(--line);border-radius:17px;background:#fff}",
      ".fit-gate__item b{display:block;color:var(--navy);margin-bottom:5px}",
      ".fit-gate__item p{color:var(--muted);font-size:.88rem;font-weight:700}",
      ".fit-gate__warning{margin-top:14px;padding:12px 14px;border:1px solid #f1d18c;border-radius:14px;background:#fff8e8;color:#6f5100;font-size:.84rem;font-weight:800}",
      ".fit-gate__action{display:flex;align-items:center;justify-content:center;min-height:55px;margin-top:14px;padding:13px 18px;border-radius:16px;color:#fff!important;text-decoration:none;text-align:center;font-weight:1000;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 14px 32px rgba(18,102,232,.22)}",
      ".ad-shell.is-qualified:before{content:'対象条件を確認した方へ';display:inline-flex;margin:0 0 12px;padding:5px 9px;border-radius:999px;background:#e8f8f2;color:#0a6d52;font-size:.72rem;font-weight:1000}",
      ".top-back{display:inline-flex;margin-left:12px;color:#164f9c;text-decoration:none;font-size:.78rem;font-weight:900}",
      "@media(max-width:820px){.fit-gate__box{padding:18px}.fit-gate__grid{grid-template-columns:1fr}.top-back{display:none}}"
    ].join("");
    document.head.appendChild(style);
  }

  function buildGate(config) {
    var section = document.createElement("section");
    section.id = "fit-check";
    section.className = "fit-gate";
    var cards = config.items.map(function (item) {
      return '<div class="fit-gate__item"><b>' + item[0] + '</b><p>' + item[1] + '</p></div>';
    }).join("");
    section.innerHTML = '<div class="wrap"><div class="fit-gate__box">' +
      '<span class="fit-gate__label">' + config.label + '</span>' +
      '<h2>' + config.title + '</h2>' +
      '<p class="fit-gate__lead">' + config.description + '</p>' +
      '<div class="fit-gate__grid">' + cards + '</div>' +
      '<p class="fit-gate__warning">' + config.warning + '</p>' +
      '<a class="fit-gate__action" href="#official">条件を確認したので公式情報へ進む</a>' +
      '</div></div>';
    return section;
  }

  function enhancePage() {
    var fileName = window.location.pathname.split("/").pop();
    var config = pageConfigs[fileName];
    var official = document.getElementById("official");
    if (!config || !official || document.getElementById("fit-check")) {
      return;
    }

    injectStyles();
    official.parentNode.insertBefore(buildGate(config), official);

    var heroCta = document.querySelector(".hero .cta");
    if (heroCta) {
      heroCta.href = "#fit-check";
      heroCta.textContent = "30秒で対象条件を確認";
    }

    var stickyCta = document.querySelector(".sticky a");
    if (stickyCta) {
      stickyCta.href = "#fit-check";
      stickyCta.textContent = "対象条件を確認する";
    }

    var adShell = official.querySelector(".ad-shell");
    if (adShell) {
      adShell.classList.add("is-qualified");
    }

    var topbarWrap = document.querySelector(".topbar .wrap");
    if (topbarWrap && !topbarWrap.querySelector(".top-back")) {
      var back = document.createElement("a");
      back.className = "top-back";
      back.href = "./";
      back.textContent = "← コスト削減ナビへ戻る";
      var brand = topbarWrap.querySelector(".brand");
      if (brand) {
        brand.appendChild(back);
      }
    }

    var action = document.querySelector(".fit-gate__action");
    if (action) {
      action.addEventListener("click", function () {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "qualification_check",
          affiliate_category: fileName.replace("-guide.html", ""),
          page_location: window.location.href
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhancePage);
  } else {
    enhancePage();
  }
})();