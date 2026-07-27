const STORAGE_KEY = "movie-world-cup-v6";
const API_BASE_STORAGE_KEY = "movie-world-cup-api-base";
const GROUP_LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const LOCAL_PROXY_PORTS = [8765, 8766, 8767];
const TOURNAMENT_SIZES = [
  { n: 48, groups: 12, bracket: 32 },
  { n: 40, groups: 10, bracket: 32 },
  { n: 32, groups: 8, bracket: 16 },
  { n: 24, groups: 6, bracket: 16 },
  { n: 16, groups: 4, bracket: 8 },
  { n: 8, groups: 2, bracket: 4 }
];
const RECOMMEND_MODES = [
  { id: "genre", label: "按类型" },
  { id: "region", label: "按地区" },
  { id: "director", label: "按导演" }
];
const HOME_SOURCE_MODES = [
  { id: "recommend", label: "推荐片单" },
  { id: "custom", label: "自选片单" }
];
const HOME_SIZE_OPTIONS = TOURNAMENT_SIZES.map((size) => size.n).slice().reverse();
const MODE_LABELS = {
  genre: "类型",
  region: "地区",
  director: "导演"
};
const MODE_PLACEHOLDERS = {
  genre: "搜索类型：动画 / 科幻 / 犯罪…",
  region: "搜索地区：日本 / 美国 / 法国…",
  director: "搜索导演：宫崎骏 / 诺兰 / 王家卫…"
};
const LOADING_TIPS = [
  "正在召集参赛电影…",
  "按当前赛制重新分组…",
  "海报和签位同步中…",
  "球场灯光调试中…"
];
const ICONS = {
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>`,
  undo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"></path><path d="M20 20a8 8 0 0 0-8-8H4"></path></svg>`,
  restart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v5h5"></path></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"></path><path d="m7 9 5-5 5 5"></path><path d="M5 20h14"></path></svg>`
};

const DEFAULT_MOVIES = [
  { id: "in-the-mood-for-love", title: "花样年华", year: 2000, region: "华语", genre: "爱情", director: "王家卫", rating: 96, vibe: "暧昧、克制、雨巷与旗袍", palette: ["#5b1f19", "#c8a15a"], posterUrl: "" },
  { id: "spirited-away", title: "千与千寻", year: 2001, region: "日本", genre: "奇幻", director: "宫崎骏", rating: 98, vibe: "成长、神隐、蒸汽与河神", palette: ["#295246", "#d8c372"], posterUrl: "" },
  { id: "parasite", title: "寄生虫", year: 2019, region: "韩国", genre: "惊悚", director: "奉俊昊", rating: 97, vibe: "阶层、雨夜、台阶与石头", palette: ["#142025", "#86a396"], posterUrl: "" },
  { id: "the-godfather", title: "教父", year: 1972, region: "美国", genre: "犯罪", director: "弗朗西斯·福特·科波拉", rating: 99, vibe: "家族、权力、暗室与低语", palette: ["#1b1612", "#9b6b43"], posterUrl: "" },
  { id: "the-dark-knight", title: "黑暗骑士", year: 2008, region: "美国", genre: "动作", director: "克里斯托弗·诺兰", rating: 97, vibe: "混乱、秩序、城市与火焰", palette: ["#16222f", "#d56b1f"], posterUrl: "" },
  { id: "before-sunrise", title: "爱在黎明破晓前", year: 1995, region: "美国", genre: "爱情", director: "理查德·林克莱特", rating: 94, vibe: "邂逅、漫步、絮语与清晨", palette: ["#2f425c", "#e0a257"], posterUrl: "" },
  { id: "city-of-god", title: "上帝之城", year: 2002, region: "拉美", genre: "犯罪", director: "费尔南多·梅里尔斯", rating: 95, vibe: "贫民窟、摄影机、奔逃与枪声", palette: ["#5a281c", "#efb048"], posterUrl: "" },
  { id: "the-shawshank-redemption", title: "肖申克的救赎", year: 1994, region: "美国", genre: "剧情", director: "弗兰克·德拉邦特", rating: 99, vibe: "希望、越狱、海报与雨幕", palette: ["#213447", "#d69f56"], posterUrl: "" },
  { id: "portrait-of-a-lady-on-fire", title: "燃烧女子的肖像", year: 2019, region: "欧洲", genre: "爱情", director: "瑟琳·席安玛", rating: 95, vibe: "凝视、火焰、海风与肖像", palette: ["#1f2c34", "#c56f39"], posterUrl: "" },
  { id: "oldboy", title: "老男孩", year: 2003, region: "韩国", genre: "惊悚", director: "朴赞郁", rating: 93, vibe: "复仇、走廊、章鱼与真相", palette: ["#243126", "#b64b3d"], posterUrl: "" },
  { id: "wall-e", title: "机器人总动员", year: 2008, region: "美国", genre: "动画", director: "安德鲁·斯坦顿", rating: 94, vibe: "孤独、太空、垃圾山与手掌", palette: ["#6a461c", "#8db1c1"], posterUrl: "" },
  { id: "fallen-angels", title: "堕落天使", year: 1995, region: "华语", genre: "剧情", director: "王家卫", rating: 92, vibe: "霓虹、独白、隧道与夜奔", palette: ["#103439", "#6fb6a8"], posterUrl: "" },
  { id: "interstellar", title: "星际穿越", year: 2014, region: "美国", genre: "科幻", director: "克里斯托弗·诺兰", rating: 96, vibe: "引力、麦田、父女与尘暴", palette: ["#243442", "#d5c9bb"], posterUrl: "" },
  { id: "the-seventh-seal", title: "第七封印", year: 1957, region: "欧洲", genre: "哲思", director: "英格玛·伯格曼", rating: 91, vibe: "死亡、棋局、海岸与信仰", palette: ["#1e1e1b", "#bbb3a5"], posterUrl: "" },
  { id: "yi-yi", title: "一一", year: 2000, region: "华语", genre: "家庭", director: "杨德昌", rating: 96, vibe: "家庭、窗景、成长与日常", palette: ["#2e3f54", "#a3b7c4"], posterUrl: "" },
  { id: "mad-max-fury-road", title: "疯狂的麦克斯：狂暴之路", year: 2015, region: "澳洲", genre: "动作", director: "乔治·米勒", rating: 94, vibe: "沙暴、机械、追逐与废土", palette: ["#5d2b1f", "#f0a73f"], posterUrl: "" },
  { id: "pulp-fiction", title: "低俗小说", year: 1994, region: "美国", genre: "犯罪", director: "昆汀·塔伦蒂诺", rating: 95, vibe: "章节、对话、舞池与手枪", palette: ["#28181c", "#cf8d53"], posterUrl: "" },
  { id: "princess-mononoke", title: "幽灵公主", year: 1997, region: "日本", genre: "奇幻", director: "宫崎骏", rating: 95, vibe: "森林、诅咒、钢铁与神兽", palette: ["#254432", "#d0b25b"], posterUrl: "" },
  { id: "la-haine", title: "恨", year: 1995, region: "欧洲", genre: "剧情", director: "马修·卡索维茨", rating: 90, vibe: "郊区、坠落、黑白与怒意", palette: ["#20262d", "#9da8af"], posterUrl: "" },
  { id: "her", title: "她", year: 2013, region: "美国", genre: "科幻", director: "斯派克·琼斯", rating: 92, vibe: "耳机、信件、AI 与孤独", palette: ["#7c2a24", "#efba85"], posterUrl: "" },
  { id: "thelma-louise", title: "末路狂花", year: 1991, region: "美国", genre: "公路", director: "雷德利·斯科特", rating: 91, vibe: "公路、自由、日落与悬崖", palette: ["#6f4334", "#d9aa6b"], posterUrl: "" },
  { id: "memories-of-murder", title: "杀人回忆", year: 2003, region: "韩国", genre: "犯罪", director: "奉俊昊", rating: 96, vibe: "稻田、暴雨、泥泞与凝视", palette: ["#283733", "#d4ac63"], posterUrl: "" },
  { id: "the-grand-budapest-hotel", title: "布达佩斯大饭店", year: 2014, region: "欧洲", genre: "喜剧", director: "韦斯·安德森", rating: 93, vibe: "粉色、礼宾员、雪景与点心", palette: ["#8b526d", "#efc17e"], posterUrl: "" },
  { id: "cure", title: "X 圣治", year: 1997, region: "日本", genre: "惊悚", director: "黑泽清", rating: 91, vibe: "催眠、海浪、空白与不安", palette: ["#1d2530", "#7c9398"], posterUrl: "" },
  { id: "moonlight", title: "月光男孩", year: 2016, region: "美国", genre: "成长", director: "巴里·詹金斯", rating: 93, vibe: "海水、蓝色、沉默与拥抱", palette: ["#173b63", "#6ab0c4"], posterUrl: "" },
  { id: "ran", title: "乱", year: 1985, region: "日本", genre: "史诗", director: "黑泽明", rating: 94, vibe: "战场、旗帜、火焰与宿命", palette: ["#50211b", "#d09a50"], posterUrl: "" },
  { id: "incendies", title: "焦土之城", year: 2010, region: "加拿大", genre: "剧情", director: "丹尼斯·维伦纽瓦", rating: 92, vibe: "双线、战火、回声与信件", palette: ["#3f2c22", "#d88f56"], posterUrl: "" },
  { id: "eternal-sunshine", title: "暖暖内含光", year: 2004, region: "美国", genre: "爱情", director: "米歇尔·冈瑞", rating: 94, vibe: "删除记忆、冰面、橘发与重逢", palette: ["#244d64", "#d3a763"], posterUrl: "" },
  { id: "raise-the-red-lantern", title: "大红灯笼高高挂", year: 1991, region: "华语", genre: "剧情", director: "张艺谋", rating: 93, vibe: "深宅、灯笼、规训与寒冬", palette: ["#5c1512", "#d7a267"], posterUrl: "" },
  { id: "the-truman-show", title: "楚门的世界", year: 1998, region: "美国", genre: "喜剧", director: "彼得·威尔", rating: 93, vibe: "直播、海面、出口与微笑", palette: ["#255870", "#f2ca6b"], posterUrl: "" },
  { id: "decision-to-leave", title: "分手的决心", year: 2022, region: "韩国", genre: "爱情", director: "朴赞郁", rating: 92, vibe: "雾气、山路、录音与潮汐", palette: ["#27445a", "#d49b5a"], posterUrl: "" },
  { id: "the-lives-of-others", title: "窃听风暴", year: 2006, region: "欧洲", genre: "剧情", director: "弗洛里安·亨克尔·冯·多纳斯马尔克", rating: 93, vibe: "监听、打字机、灰墙与善意", palette: ["#243034", "#a9b18c"], posterUrl: "" }
];

let state = normalizeRecoveredState(loadState());
let busy = false;
const elements = {
  app: document.getElementById("app"),
  topbar: document.getElementById("topbar"),
  overlays: document.getElementById("overlays")
};
const ui = {
  view: null,
  apiBase: inferInitialApiBase(),
  homeSource: "recommend",
  homeSize: 32,
  recommendMode: "director",
  query: "",
  suggestions: null,
  rosterInput: "",
  importStatus: {
    tone: "neutral",
    text: "推荐和豆瓣导入需要通过本地 server 打开页面；内置片单和 JSON 导入可直接使用。"
  },
  loadingLabel: "",
  suggestionsLoading: false,
  suggestionsRequestId: 0,
  suggestionsDebounce: 0,
  tipsTimer: 0,
  toastTimer: 0,
  shareBlob: null
};

init();

function init() {
  ui.suggestions = [];
  ui.suggestionsLoading = true;
  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("error", handleAssetError, true);
  render();
  void bootstrapProxy();
  void refreshSuggestions("");
}

function handleAssetError(event) {
  const image = event.target;
  if (!(image instanceof HTMLImageElement)) {
    return;
  }
  const fallback = image.dataset.fallbackSrc;
  if (!fallback || image.dataset.fallbackApplied === "1") {
    return;
  }
  image.dataset.fallbackApplied = "1";
  image.src = fallback;
}

function handleClick(event) {
  const trigger = event.target.closest("[data-act]");
  if (!trigger) {
    return;
  }

  const { act } = trigger.dataset;
  if (act === "close-modal" && event.target === trigger) {
    closeModal();
    return;
  }

  switch (act) {
    case "set-home-source":
      ui.homeSource = trigger.dataset.source;
      render();
      break;
    case "set-home-size":
      ui.homeSize = Number(trigger.dataset.size) || 32;
      render();
      break;
    case "set-mode":
      ui.recommendMode = trigger.dataset.mode;
      ui.query = "";
      ui.suggestions = [];
      ui.suggestionsLoading = true;
      render();
      void refreshSuggestions("");
      break;
    case "chip":
    case "pick-suggestion":
      kickoffRecommendation(ui.recommendMode, trigger.dataset.value);
      break;
    case "search-submit":
      submitSearch();
      break;
    case "start-default":
      startWithCatalog(DEFAULT_MOVIES, { label: "内置 32 强" });
      break;
    case "download-template":
      downloadTemplate();
      break;
    case "import-roster":
      handleRosterImport();
      break;
    case "export-roster":
      exportCurrentRoster();
      break;
    case "restore-default":
      restoreDefaultCatalog();
      break;
    case "start-group":
      pushUndo();
      state.phase = "group";
      saveState();
      render();
      break;
    case "toggle-pick":
      togglePick(trigger.dataset.movieId);
      break;
    case "confirm-group":
      confirmGroup();
      break;
    case "toggle-wild":
      toggleWild(trigger.dataset.movieId);
      break;
    case "confirm-wild":
      confirmWild();
      break;
    case "win":
      chooseWinner(trigger.dataset.side, trigger);
      break;
    case "share":
      openShareModal();
      break;
    case "share-go":
      shareImage();
      break;
    case "download-share":
      downloadShareImage();
      break;
    case "undo":
      undo();
      break;
    case "restart-ask":
      openRestartModal();
      break;
    case "restart-yes":
      restartTournament();
      break;
    case "close-modal":
      closeModal();
      break;
    default:
      break;
  }
}

function handleInput(event) {
  if (event.target.id === "home-search") {
    ui.query = event.target.value;
    queueSuggestionRefresh(ui.query);
    renderSuggestions();
    return;
  }

  if (event.target.id === "roster-input") {
    ui.rosterInput = event.target.value;
    syncRosterComposerUI();
  }
}

async function handleChange(event) {
  if (event.target.id !== "roster-file") {
    return;
  }
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }
  ui.rosterInput = await file.text();
  const textarea = document.getElementById("roster-input");
  if (textarea) {
    textarea.value = ui.rosterInput;
  }
  setImportStatus("neutral", `已载入文件 ${file.name}，点击“导入豆瓣片单并抽签”生效。`);
  syncRosterComposerUI();
  event.target.value = "";
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    closeModal();
    return;
  }

  if (!state) {
    if (event.target.id === "home-search" && event.key === "Enter") {
      event.preventDefault();
      submitSearch();
    }
    return;
  }

  if (state.phase === "group" && ["1", "2", "3", "4"].includes(event.key)) {
    const movieId = state.groups[state.gi][Number(event.key) - 1];
    if (movieId) {
      togglePick(movieId);
    }
    return;
  }

  if (state.phase === "group" && event.key === "Enter" && state.sel.length === 2) {
    confirmGroup();
    return;
  }

  if (state.phase === "wildcard" && event.key === "Enter" && state.sel.length === state.size.wild) {
    confirmWild();
    return;
  }

  if (state.phase === "knockout" && (event.key === "1" || event.key === "2")) {
    const side = event.key === "1" ? "a" : "b";
    const card = document.querySelector(`.dcard[data-side="${side}"]`);
    if (card) {
      chooseWinner(side, card);
    }
  }
}

function render() {
  clearInterval(ui.tipsTimer);
  renderTopbar();

  if (ui.view === "loading") {
    elements.app.innerHTML = tplLoading();
    startLoadingTips();
    return;
  }

  if (!state) {
    elements.app.innerHTML = tplHome();
    return;
  }

  switch (state.phase) {
    case "draw":
      elements.app.innerHTML = tplDraw();
      break;
    case "group":
      elements.app.innerHTML = tplGroup();
      break;
    case "wildcard":
      elements.app.innerHTML = tplWildcard();
      break;
    case "knockout":
      elements.app.innerHTML = tplKnockout();
      break;
    case "done":
      elements.app.innerHTML = tplDone();
      break;
    default:
      elements.app.innerHTML = tplHome();
      break;
  }

  window.scrollTo(0, 0);
}

function renderTopbar() {
  if (!state || ui.view === "loading") {
    elements.topbar.hidden = true;
    elements.topbar.innerHTML = "";
    return;
  }

  const backLabel = backButtonLabel();
  elements.topbar.hidden = false;
  elements.topbar.innerHTML = `
    <div class="tb-side tb-side-left">
      <button class="tb-btn tb-back" data-act="undo" type="button" aria-label="${escapeHtml(backLabel)}" title="${escapeHtml(backLabel)}">
        ${ICONS.undo}
        <span class="sr-only">${escapeHtml(backLabel)}</span>
      </button>
    </div>
    <div class="tb-mid">
      <span class="tb-artist">${escapeHtml(state.sourceLabel)}</span>
      <span class="tb-phase">${escapeHtml(phaseLabel())}</span>
    </div>
    <div class="tb-side tb-side-right">
      <button class="tb-btn" data-act="restart-ask" type="button" aria-label="重新开始" title="重新开始">${ICONS.restart}</button>
    </div>
    <div class="tb-prog"><i style="width:${progress()}%"></i></div>
  `;
}

function tplHome() {
  return `
    <section class="screen home">
      <button class="lang-switch" type="button" aria-label="Language">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18"></path><path d="M12 3a13.5 13.5 0 0 1 3.5 9 13.5 13.5 0 0 1-3.5 9 13.5 13.5 0 0 1-3.5-9A13.5 13.5 0 0 1 12 3z"></path></svg>
        <span>简体中文</span>
      </button>
      <a class="rank-fab" href="#about" aria-label="玩法说明">🎬<span>玩法</span></a>
      <div class="hero">
        <h1 class="logo-lockup" aria-label="MOVIE CUP">
          <span class="logo-badge" aria-hidden="true">🎬</span>
          <span class="logo-movie" aria-hidden="true"><i>M</i><i>O</i><i>V</i><i>I</i><i>E</i></span>
          <span class="logo-cup" aria-hidden="true">CUP</span>
        </h1>
        <h2 class="slogan">决战电影之巅</h2>
        <p class="tagline">给你的本命电影，办一场世界杯</p>
      </div>

      ${ui.homeSource === "recommend" ? tplRecommendHome() : tplCustomHome()}

      <div class="mode-pick" role="group" aria-label="片单模式">
        <button class="mode-btn ${ui.homeSource === "recommend" ? "on" : ""}" data-act="set-home-source" data-source="recommend" type="button" aria-pressed="${ui.homeSource === "recommend"}">推荐片单</button>
        <button class="mode-btn ${ui.homeSource === "custom" ? "on" : ""}" data-act="set-home-source" data-source="custom" type="button" aria-pressed="${ui.homeSource === "custom"}">自选片单</button>
        <button class="mode-btn" data-act="start-default" type="button" aria-pressed="false">内置片单</button>
      </div>

      ${ui.homeSource === "recommend" ? `
        <div class="chips-wrap">
          <p class="chips-label">一键开赛</p>
          <div class="chips">
            ${(ui.suggestions || []).slice(0, 6).map((item) => `
              <button class="chip" data-act="chip" data-value="${escapeHtml(item)}" type="button">${escapeHtml(item)}</button>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <p class="home-foot">小组赛 → 遗珠复活 → 淘汰赛，选出你的本命电影</p>
    </section>
    <section class="home-seo" id="about">
      <h2>为你的本命电影，办一场电影世界杯</h2>
      <p>Movie World Cup 是一个免费的电影世界杯生成器：按导演、地区或类型拉出一组候选片单，逐轮筛选出你心中的第一名。打开网页就能玩，不用注册，也不用下载。</p>
      <h3>玩法介绍</h3>
      <ol>
        <li>选择片单来源：推荐片单、自选片单、内置片单三种入口。</li>
        <li>确定赛制：支持 8 / 16 / 24 / 32 / 40 / 48 部电影开赛。</li>
        <li>逐轮晋级：小组赛 4 选 2、遗珠复活赛捞回可惜出局的电影、淘汰赛 1v1 决出冠军。</li>
        <li>生成分享图：冠军诞生后自动画出晋级之路，可以保存分享。</li>
      </ol>
      <h3>常见问题</h3>
      <div class="faq-item"><h4>Movie World Cup 是什么？</h4><p>一个免费的在线电影世界杯游戏：从片单里生成对决签表，逐轮选择，最后选出你的本命电影。</p></div>
      <div class="faq-item"><h4>怎么开赛？</h4><p>首页先选片单来源；推荐片单支持按导演、地区、类型搜索，自选片单支持豆瓣链接、subject ID、片名或 JSON 导入。</p></div>
      <div class="faq-item"><h4>比赛赛制是什么？</h4><p>大曲库走完整赛制：小组赛、遗珠复活赛、淘汰赛；小曲库则直接进入淘汰赛。</p></div>
      <div class="faq-item"><h4>需要注册或付费吗？</h4><p>不需要。比赛进度会自动保存在浏览器本地，冠军诞生后可以导出分享图。</p></div>
      <h3 class="official-head">关于 Movie World Cup</h3>
      <p>这是一个个人项目，灵感来自 MUSIC CUP 的歌曲世界杯体验。当前公开版本托管在 GitHub Pages，推荐片单与豆瓣导入能力通过独立 API 提供支持。</p>
      <p class="official-links">
        <a href="https://w666jx-bot.github.io/movie-world-cup/" target="_blank" rel="noopener">公开站点</a>
        <a href="https://github.com/w666jx-bot/movie-world-cup" target="_blank" rel="noopener">GitHub 仓库</a>
        <a href="https://movie-world-cup-api.vercel.app/api/health" target="_blank" rel="noopener">API Health</a>
      </p>
    </section>
    <nav class="lang-links" aria-label="Language">
      <p class="lang-links-title">Language</p>
      <div class="lang-links-list">
        <a class="lang-link on" href="#top" aria-current="page">简体中文</a>
        <a class="lang-link" href="#top">English</a>
        <a class="lang-link" href="#top">日本語</a>
        <a class="lang-link" href="#top">한국어</a>
        <a class="lang-link" href="#top">Français</a>
        <a class="lang-link" href="#top">Deutsch</a>
      </div>
    </nav>
  `;
}

function tplRecommendHome() {
  return `
    <div class="searchbox">
      <div class="search-field">
        ${ICONS.search}
        <input id="home-search" type="search" value="${escapeHtml(ui.query)}" placeholder="${MODE_PLACEHOLDERS[ui.recommendMode]}" autocomplete="off" enterkeyhint="search">
      </div>
      <div class="sug" id="sug">${tplSuggestions()}</div>
    </div>
    <div class="mode-row mode-row-home">
        ${RECOMMEND_MODES.map((mode) => `
          <button class="mode-pill ${ui.recommendMode === mode.id ? "active" : ""}" data-act="set-mode" data-mode="${mode.id}" type="button">
            ${mode.label}
          </button>
        `).join("")}
      </div>
      <div class="size-row">
        <span class="size-label">赛事规模</span>
        <div class="size-pills" role="tablist" aria-label="赛事规模">
          ${HOME_SIZE_OPTIONS.map((size) => `
            <button class="size-pill ${ui.homeSize === size ? "active" : ""}" data-act="set-home-size" data-size="${size}" type="button">${size} 强</button>
          `).join("")}
        </div>
      </div>
      <p class="helper home-helper">按${MODE_LABELS[ui.recommendMode]}从豆瓣拉出 ${ui.homeSize} 部电影，然后直接进入世界杯赛程。</p>
  `;
}

function tplCustomHome() {
  const lines = parseRosterLines(ui.rosterInput);
  const hasJson = ui.rosterInput.trim().startsWith("[");
  const isSupported = hasJson || HOME_SIZE_OPTIONS.includes(lines.length);
  const statusText = hasJson
    ? "检测到 JSON 片单，会按内容直接恢复赛事。"
    : lines.length
      ? `当前识别到 ${lines.length} 条，可直接导入 ${isSupported ? "支持的赛事规模" : "前请补齐到 8 / 16 / 24 / 32 / 40 / 48 条"}。`
      : `支持 ${HOME_SIZE_OPTIONS.join(" / ")} 条豆瓣链接、subject ID、片名，或直接粘贴 JSON 片单。`;
  const buttonText = hasJson
    ? "导入 JSON 片单"
    : `导入并抽签`;

  return `
    <div class="home-panel custom-panel">
      <div class="setup-head">
        <h3>自选电影片单</h3>
        <p class="setup-note">从你自己的片单直接开赛。文本导入支持自动识别赛事规模。</p>
      </div>
      <div class="setup-actions">
        <label class="file-btn" for="roster-file">读文件</label>
        <input id="roster-file" type="file" accept=".txt,.csv,.tsv,.json">
        <button class="ghost-btn sm" data-act="download-template" type="button">下载模板</button>
        <button class="ghost-btn sm" data-act="restore-default" type="button">恢复内置</button>
        <button class="ghost-btn sm" data-act="export-roster" type="button">导出片单</button>
      </div>
      <textarea id="roster-input" rows="10" spellcheck="false" placeholder="https://movie.douban.com/subject/1291561/
1292052
千与千寻
花样年华">${escapeHtml(ui.rosterInput)}</textarea>
      <div class="composer-meta" id="composer-meta">${escapeHtml(statusText)}</div>
      <div class="panel-foot">
        <div class="import-status ${ui.importStatus.tone === "neutral" ? "" : ui.importStatus.tone}" id="import-status">${escapeHtml(ui.importStatus.text)}</div>
        <div class="hero-actions">
          <button class="btn" data-act="import-roster" type="button">${buttonText}</button>
        </div>
      </div>
    </div>
  `;
}

function tplSuggestions() {
  const suggestions = ui.suggestions || [];
  const heading = ui.query.trim() ? `匹配 ${ui.query.trim()}` : `${MODE_LABELS[ui.recommendMode]}推荐片单`;
  if (ui.suggestionsLoading) {
    return `
      <div class="sug-head"><b>实时建议</b><span>${escapeHtml(heading)}</span></div>
      <div class="sug-empty">正在搜索更多${MODE_LABELS[ui.recommendMode]}…</div>
    `;
  }
  if (!suggestions.length) {
    return `
      <div class="sug-head"><b>实时建议</b><span>${escapeHtml(heading)}</span></div>
      <div class="sug-empty">没找到匹配的${MODE_LABELS[ui.recommendMode]}，按回车会直接用当前输入去豆瓣尝试。</div>
    `;
  }
  return `
    <div class="sug-head"><b>实时建议</b><span>${escapeHtml(heading)}</span></div>
    ${suggestions.map((item) => `
      <button class="sug-item" data-act="pick-suggestion" data-value="${escapeHtml(item)}" type="button">
        <span><b>${escapeHtml(item)}</b><span>${ui.query.trim() ? `${MODE_LABELS[ui.recommendMode]}匹配` : `${MODE_LABELS[ui.recommendMode]}推荐片单`}</span></span>
      </button>
    `).join("")}
  `;
}

function tplLoading() {
  return `
    <section class="screen loading">
      <div class="loading-shell">
        <div class="spinner" aria-hidden="true"></div>
        <div>
          <div class="loading-artist">${escapeHtml(ui.loadingLabel || "电影世界杯")}</div>
          <p class="loading-tip" id="loading-tip">${LOADING_TIPS[0]}</p>
        </div>
      </div>
    </section>
  `;
}

function tplDraw() {
  return `
    <section class="screen with-topbar with-cta">
      <div class="draw-head">
        <span class="pill grad">分组抽签完毕</span>
        <h2>${escapeHtml(state.sourceLabel)}</h2>
        <p class="sub">${drawSubtitle()}</p>
      </div>
      <div class="stat-row">
        <div class="stat"><b>${state.size.n}</b><span>参赛电影</span></div>
        <div class="stat"><b>${state.size.groups}</b><span>小组</span></div>
        <div class="stat"><b>${state.size.bracket}</b><span>淘汰席位</span></div>
      </div>
      <div class="group-grid">
        ${state.groups.map((group, groupIndex) => `
          <div class="gcard">
            <div class="gcard-head"><b>${groupLabel(groupIndex)}</b><span>GROUP</span></div>
            ${group.map((movieId) => {
              const movie = getMovie(movieId);
              return `
                <div class="gsong">
                  ${posterImage(movie)}
                  <span>${escapeHtml(movie.title)}</span>
                </div>
              `;
            }).join("")}
          </div>
        `).join("")}
      </div>
      <div class="cta-bar">
        <button class="btn" data-act="start-group" type="button">开始小组赛</button>
      </div>
    </section>
  `;
}

function tplGroup() {
  const group = state.groups[state.gi];
  return `
    <section class="screen with-topbar with-cta">
      <div class="phase-head">
        <span class="pill">小组赛 · GROUP STAGE</span>
        <h2><span class="grad-text">${groupLabel(state.gi)}</span> 组</h2>
        <p class="sub">${groupSubtitle()}</p>
        <p class="count">${state.gi + 1} / ${state.size.groups}</p>
      </div>
      <div class="pick-grid">
        ${group.map((movieId) => {
          const movie = getMovie(movieId);
          return `
            <article class="scard ${state.sel.includes(movieId) ? "picked" : ""}" data-act="toggle-pick" data-movie-id="${movieId}" role="button" tabindex="0">
              <div class="art">
                ${posterImage(movie)}
                <div class="check">✓</div>
              </div>
              <div class="meta">
                <div class="tname">${escapeHtml(movie.title)}</div>
                <div class="talbum">${escapeHtml(movie.director)} · ${movie.year} · ${escapeHtml(movie.region)}</div>
                <div class="movie-extra">${escapeHtml(movie.genre)} · 评分 ${movie.rating}</div>
              </div>
            </article>
          `;
        }).join("")}
      </div>
      <div class="cta-bar">
        <button class="btn" data-act="confirm-group" type="button" ${state.sel.length === 2 ? "" : "disabled"}>${groupConfirmLabel()}</button>
      </div>
    </section>
  `;
}

function tplWildcard() {
  const leftovers = getWildcardCandidates();
  return `
    <section class="screen with-topbar with-cta">
      <div class="phase-head">
        <span class="pill">遗珠复活赛 · PLAY-OFF</span>
        <h2>捞回<span class="grad-text">遗珠</span></h2>
        <p class="sub">${wildcardSubtitle()}</p>
      </div>
      <div class="wild-grid">
        ${leftovers.map(({ movieId, groupIndex }) => {
          const movie = getMovie(movieId);
          return `
            <article class="wcard ${state.sel.includes(movieId) ? "picked" : ""}" data-act="toggle-wild" data-movie-id="${movieId}" role="button" tabindex="0">
              <div class="art">
                ${posterImage(movie)}
                <span class="gbadge">${groupLabel(groupIndex)}</span>
                <div class="check">✓</div>
              </div>
              <div class="meta">
                <div class="wname">${escapeHtml(movie.title)}</div>
                <div class="movie-extra">${escapeHtml(movie.director)} · ${movie.year} · ${escapeHtml(movie.genre)}</div>
              </div>
            </article>
          `;
        }).join("")}
      </div>
      <div class="cta-bar">
        <button class="btn" data-act="confirm-wild" type="button" ${state.sel.length === state.size.wild ? "" : "disabled"}>
          ${state.sel.length === state.size.wild ? "名单齐了，开启淘汰赛" : `已复活 ${state.sel.length} / ${state.size.wild}`}
        </button>
      </div>
    </section>
  `;
}

function tplKnockout() {
  const round = state.rounds[state.ri];
  const match = round[state.mi];
  return `
    <section class="screen with-topbar">
      <div class="duel-wrap">
        <div class="phase-head">
          <span class="pill">${escapeHtml(roundName(state.ri))} · KNOCKOUT</span>
          <h2>${state.ri === state.rounds.length - 1 ? "冠军之战" : `第 ${state.mi + 1} 场`}</h2>
          <p class="count">${state.mi + 1} / ${round.length}</p>
        </div>
        <div class="duel">
          ${tplDuelCard(getMovie(match.a), "a")}
          <div class="vs-badge"><b>VS</b></div>
          ${tplDuelCard(getMovie(match.b), "b")}
        </div>
        <p class="duel-hint">点击卡片选出胜者。快捷键 1 选左边，2 选右边。</p>
      </div>
    </section>
  `;
}

function tplDuelCard(movie, side) {
  return `
    <article class="dcard" data-act="win" data-side="${side}" role="button" tabindex="0" aria-label="选择 ${escapeHtml(movie.title)}">
      <div class="art">
        ${posterImage(movie, { eager: true })}
      </div>
      <div class="meta">
        <div class="tname">${escapeHtml(movie.title)}</div>
        <div class="talbum">${escapeHtml(movie.director)} · ${movie.year}</div>
        <div class="movie-extra">${escapeHtml(movie.region)} · ${escapeHtml(movie.genre)} · 评分 ${movie.rating}</div>
      </div>
    </article>
  `;
}

function tplDone() {
  const final = state.rounds[state.rounds.length - 1][0];
  const champion = getMovie(final.winner);
  const runnerUp = getMovie(final.winner === final.a ? final.b : final.a);
  const semifinalists = state.rounds.length >= 2
    ? state.rounds[state.rounds.length - 2]
        .map((match) => getMovie(match.winner === match.a ? match.b : match.a))
        .filter(Boolean)
    : [];

  return `
    <section class="screen with-topbar champ">
      <div class="champ-hero">
        <div class="champ-poster"><img src="${buildPoster(champion, "冠军")}" alt="${escapeHtml(champion.title)} 冠军海报"></div>
        <div class="champ-copy">
          <div class="champ-crown">👑</div>
          <div class="champ-label">MOVIE CUP WINNER</div>
          <h1 class="champ-title">${escapeHtml(champion.title)}</h1>
          <p class="champ-meta">${escapeHtml(champion.director)} · ${champion.year} · ${escapeHtml(champion.region)} · ${escapeHtml(champion.genre)}</p>
          <p class="helper champ-note">${escapeHtml(champion.vibe)}</p>
        </div>
      </div>
      <div class="result-sheet">
        <div class="result-row is-champion">
          <span class="result-rank">冠军</span>
          <strong class="result-name">${escapeHtml(champion.title)}</strong>
          <span class="result-meta">${escapeHtml(champion.director)} · ${champion.year}</span>
        </div>
        <div class="result-row">
          <span class="result-rank">亚军</span>
          <strong class="result-name">${escapeHtml(runnerUp.title)}</strong>
          <span class="result-meta">${escapeHtml(runnerUp.director)} · ${runnerUp.year}</span>
        </div>
      </div>
      <div class="podium">
        ${tplPod(runnerUp, "亚军 · RUNNER-UP")}
        ${semifinalists.map((movie) => tplPod(movie, "四强 · SEMI")).join("")}
      </div>
      <div class="champ-actions">
        <button class="btn" data-act="share" type="button">${ICONS.share}生成对阵图</button>
        <button class="ghost-btn" data-act="restart-yes" type="button">${ICONS.restart}再来一场</button>
      </div>
    </section>
  `;
}

function tplPod(movie, label) {
  if (!movie) {
    return "";
  }
  return `
    <div class="pod">
      ${posterImage(movie)}
      <div class="pod-meta">
        <div class="pod-rank">${escapeHtml(label)}</div>
        <div class="pod-name">${escapeHtml(movie.title)}</div>
        <div class="movie-extra">${escapeHtml(movie.director)}</div>
      </div>
    </div>
  `;
}

function renderSuggestions() {
  const node = document.getElementById("sug");
  if (node) {
    node.innerHTML = tplSuggestions();
  }
}

function startLoadingTips() {
  let index = 0;
  ui.tipsTimer = setInterval(() => {
    const tip = document.getElementById("loading-tip");
    if (!tip) {
      clearInterval(ui.tipsTimer);
      return;
    }
    index = (index + 1) % LOADING_TIPS.length;
    tip.textContent = LOADING_TIPS[index];
  }, 1400);
}

function queueSuggestionRefresh(query) {
  clearTimeout(ui.suggestionsDebounce);
  ui.suggestionsLoading = true;
  ui.suggestions = query.trim() ? [query.trim()] : [];
  ui.suggestionsDebounce = window.setTimeout(() => {
    void refreshSuggestions(query);
  }, query.trim() ? 180 : 0);
}

async function refreshSuggestions(query) {
  const text = String(query || "").trim();
  const requestId = ++ui.suggestionsRequestId;

  if (!await ensureApiReady()) {
    ui.suggestionsLoading = false;
    ui.suggestions = text ? [text] : [];
    renderSuggestions();
    return;
  }

  try {
    const response = await fetchJson(`/api/douban/suggest?mode=${encodeURIComponent(ui.recommendMode)}&q=${encodeURIComponent(text)}&limit=8`);
    if (requestId !== ui.suggestionsRequestId) {
      return;
    }
    ui.suggestionsLoading = false;
    ui.suggestions = mergeSuggestionValues(text ? [text] : [], response.suggestions || []);
    renderSuggestions();
  } catch (error) {
    if (requestId !== ui.suggestionsRequestId) {
      return;
    }
    ui.suggestionsLoading = false;
    ui.suggestions = text ? [text] : [];
    renderSuggestions();
  }
}

function mergeSuggestionValues(...lists) {
  const merged = [];
  const seen = new Set();
  lists.flat().forEach((item) => {
    const text = String(item || "").trim();
    if (!text || seen.has(text)) {
      return;
    }
    seen.add(text);
    merged.push(text);
  });
  return merged.slice(0, 8);
}

function submitSearch() {
  const value = ui.query.trim() || ui.suggestions?.[0];
  if (!value) {
    showToast(`先输入一个${MODE_LABELS[ui.recommendMode]}`);
    return;
  }
  kickoffRecommendation(ui.recommendMode, value);
}

async function kickoffRecommendation(mode, value) {
  if (!await ensureApiReady()) {
    setImportStatus("error", "本地代理还没连上。先执行 node server.js，再刷新页面。");
    showToast("当前模式需要本地 server 代理豆瓣接口。");
    return;
  }

  ui.view = "loading";
  ui.loadingLabel = `${MODE_LABELS[mode]}：${value}`;
  render();

  try {
    const response = await fetchJson(`/api/douban/recommend?mode=${encodeURIComponent(mode)}&value=${encodeURIComponent(value)}&count=${ui.homeSize}`);
    startWithCatalog(response.movies, { label: `${MODE_LABELS[mode]}：${value}` });
    setImportStatus("success", `已按${MODE_LABELS[mode]}生成豆瓣 ${response.movies.length} 强：${value}。`);
  } catch (error) {
    ui.view = null;
    setImportStatus("error", error.message || "豆瓣推荐生成失败。");
    render();
    showToast(error.message || "豆瓣推荐生成失败。");
  }
}

async function handleRosterImport() {
  const text = ui.rosterInput.trim();
  if (!text) {
    setImportStatus("error", `导入内容为空。请粘贴 ${HOME_SIZE_OPTIONS.join(" / ")} 行豆瓣链接、subject ID、片名，或一份 JSON 片单。`);
    return;
  }

  if (text.startsWith("[")) {
    try {
      startWithCatalog(JSON.parse(text), { label: "自定义 JSON 片单" });
      setImportStatus("success", "已按 JSON 片单导入并抽签。");
    } catch (error) {
      setImportStatus("error", "JSON 解析失败，请检查格式。");
    }
    return;
  }

  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (!pickTournamentSize(lines.length)) {
    setImportStatus("error", `当前识别到 ${lines.length} 条。自选片单只支持 ${HOME_SIZE_OPTIONS.join(" / ")} 条。`);
    return;
  }

  if (!await ensureApiReady()) {
    setImportStatus("error", "本地代理还没连上。先执行 node server.js，再刷新页面。");
    return;
  }

  ui.view = "loading";
  ui.loadingLabel = "自定义豆瓣片单";
  render();

  try {
    const response = await fetchJson("/api/douban/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines })
    });
    startWithCatalog(response.movies, { label: `自选片单 · ${response.movies.length} 强` });
    ui.rosterInput = "";
    setImportStatus("success", `已按豆瓣片单导入 ${response.movies.length} 强并抽签。`);
    syncRosterComposerUI();
  } catch (error) {
    ui.view = null;
    setImportStatus("error", error.message || "豆瓣片单导入失败。");
    render();
    showToast(error.message || "豆瓣片单导入失败。");
  }
}

function startWithCatalog(catalog, source) {
  state = buildTournamentState(catalog, source);
  busy = false;
  ui.view = null;
  ui.query = "";
  ui.suggestions = [];
  ui.suggestionsLoading = false;
  saveState();
  render();
  void refreshSuggestions("");
}

function buildTournamentState(catalog, source) {
  const normalized = normalizeCatalog(catalog);
  const size = pickTournamentSize(normalized.length);
  if (!size) {
    throw new Error(`当前片单是 ${normalized.length} 条。当前只支持 8 / 16 / 24 / 32 / 40 / 48 部电影开赛。`);
  }
  const groups = buildGroups(normalized, size.groups);
  const groupOf = {};
  groups.forEach((group, groupIndex) => {
    group.forEach((movieId) => {
      groupOf[movieId] = groupIndex;
    });
  });

  return {
    version: 6,
    sourceLabel: source.label,
    catalog: normalized,
    size,
    groups,
    groupOf,
    phase: "draw",
    gi: 0,
    sel: [],
    groupPicks: [],
    wildcardPicks: [],
    rounds: null,
    ri: 0,
    mi: 0,
    undoStack: []
  };
}

function buildGroups(catalog, groupCount) {
  const groups = Array.from({ length: groupCount }, () => []);
  for (let pot = 0; pot < 4; pot += 1) {
    const chunk = catalog.slice(pot * groupCount, (pot + 1) * groupCount).map((movie) => movie.id);
    shuffle(chunk);
    chunk.forEach((movieId, index) => {
      groups[index].push(movieId);
    });
  }
  return groups;
}

function groupConfirmLabel() {
  if (state.sel.length !== 2) {
    return `已选 ${state.sel.length} / 2`;
  }
  if (state.gi + 1 < state.size.groups) {
    return `锁定，进入 ${groupLabel(state.gi + 1)} 组`;
  }
  return state.size.wild > 0 ? "锁定，进入遗珠复活赛" : "锁定，开启淘汰赛";
}

function togglePick(movieId) {
  if (!state || state.phase !== "group") {
    return;
  }
  const index = state.sel.indexOf(movieId);
  if (index >= 0) {
    state.sel.splice(index, 1);
  } else {
    state.sel.push(movieId);
    if (state.sel.length > 2) {
      state.sel.shift();
    }
  }
  saveState();
  syncGroupSelectionUI();
}

function confirmGroup() {
  if (!state || state.phase !== "group" || state.sel.length !== 2) {
    return;
  }
  pushUndo();
  state.groupPicks.push([...state.sel]);
  state.sel = [];
  if (state.groupPicks.length < state.size.groups) {
    state.gi += 1;
  } else if (state.size.wild > 0) {
    state.phase = "wildcard";
  } else {
    startKnockout();
    return;
  }
  saveState();
  render();
}

function getWildcardCandidates() {
  return state.groups.flatMap((group, groupIndex) => (
    group
      .filter((movieId) => !(state.groupPicks[groupIndex] || []).includes(movieId))
      .map((movieId) => ({ movieId, groupIndex }))
  ));
}

function toggleWild(movieId) {
  if (!state || state.phase !== "wildcard") {
    return;
  }
  const index = state.sel.indexOf(movieId);
  if (index >= 0) {
    state.sel.splice(index, 1);
  } else if (state.sel.length >= state.size.wild) {
    showToast(`复活名额只有 ${state.size.wild} 个。`);
    return;
  } else {
    state.sel.push(movieId);
  }
  saveState();
  syncWildcardSelectionUI();
}

function confirmWild() {
  if (!state || state.phase !== "wildcard" || state.sel.length !== state.size.wild) {
    return;
  }
  pushUndo();
  state.wildcardPicks = [...state.sel];
  state.sel = [];
  startKnockout();
}

function startKnockout() {
  const seeded = seedBracket();
  state.rounds = buildRounds(seeded);
  state.phase = "knockout";
  state.ri = 0;
  state.mi = 0;
  saveState();
  render();
  showRoundIntro(roundName(0), `${state.size.bracket} 强，两两对决，点选更喜欢的那一部。`);
}

function seedBracket() {
  const winners = state.groupPicks.flat().slice().sort(compareMovieSourceOrder);
  const wild = state.wildcardPicks.slice().sort(compareMovieSourceOrder);
  const seeds = winners.concat(wild);
  const order = bracketOrder(seeds.length);
  const placed = order.map((seed) => seeds[seed - 1]);

  for (let pass = 0; pass < 2; pass += 1) {
    for (let index = 0; index < placed.length; index += 2) {
      if (state.groupOf[placed[index]] !== state.groupOf[placed[index + 1]]) {
        continue;
      }
      for (let cursor = 0; cursor < placed.length; cursor += 2) {
        if (cursor === index) {
          continue;
        }
        const a = placed[index];
        const b = placed[index + 1];
        const c = placed[cursor];
        const d = placed[cursor + 1];
        if (state.groupOf[a] !== state.groupOf[d] && state.groupOf[c] !== state.groupOf[b]) {
          placed[index + 1] = d;
          placed[cursor + 1] = b;
          break;
        }
      }
    }
  }

  return placed;
}

function buildRounds(seededIds) {
  const rounds = [];
  let current = Array.from({ length: seededIds.length / 2 }, (_, index) => ({
    a: seededIds[index * 2],
    b: seededIds[index * 2 + 1],
    winner: null
  }));
  rounds.push(current);
  while (current.length > 1) {
    current = Array.from({ length: current.length / 2 }, () => ({ a: null, b: null, winner: null }));
    rounds.push(current);
  }
  return rounds;
}

function chooseWinner(side, card) {
  if (!state || state.phase !== "knockout" || card.classList.contains("winner") || busy) {
    return;
  }
  busy = true;
  const round = state.rounds[state.ri];
  const match = round[state.mi];
  pushUndo();
  match.winner = side === "a" ? match.a : match.b;
  card.classList.add("winner");
  const other = card.parentElement.querySelector(`.dcard[data-side="${side === "a" ? "b" : "a"}"]`);
  if (other) {
    other.classList.add("loser");
  }
  setTimeout(() => advanceKnockout(), 520);
}

function advanceKnockout() {
  busy = false;
  if (!state || state.phase !== "knockout") {
    return;
  }
  const round = state.rounds[state.ri];
  const match = round[state.mi];
  if (state.ri + 1 < state.rounds.length) {
    const nextMatch = state.rounds[state.ri + 1][Math.floor(state.mi / 2)];
    if (state.mi % 2 === 0) {
      nextMatch.a = match.winner;
    } else {
      nextMatch.b = match.winner;
    }
  }

  if (state.mi + 1 < round.length) {
    state.mi += 1;
    saveState();
    render();
    return;
  }

  if (state.ri + 1 < state.rounds.length) {
    state.ri += 1;
    state.mi = 0;
    saveState();
    render();
    showRoundIntro(roundName(state.ri), roundIntroText(state.ri));
    return;
  }

  state.phase = "done";
  saveState();
  render();
}

function roundName(roundIndex) {
  const namesByBracket = {
    32: ["32 强", "16 强", "8 强", "4 强", "2 强"],
    16: ["16 强", "8 强", "4 强", "2 强"],
    8: ["8 强", "4 强", "2 强"],
    4: ["4 强", "2 强"]
  };
  return namesByBracket[state.size.bracket]?.[roundIndex] || "淘汰赛";
}

function roundIntroText(roundIndex) {
  const count = state.rounds[roundIndex].length;
  if (count === 1) {
    return "最后一战，选出你的冠军电影。";
  }
  if (count === 2) {
    return "四强对决，两条半区会师决赛。";
  }
  return `${count * 2} 部电影，${count} 场对决。`;
}

function openRestartModal() {
  elements.overlays.innerHTML = `
    <div class="modal" data-act="close-modal">
      <div class="modal-card">
        <h3 class="modal-title">重新开始？</h3>
        <p class="modal-copy">这会退出当前赛事，回到首页。已抽出的签位和当前进度都会保存在浏览器里，之后可以继续新的一轮。</p>
        <div class="modal-actions">
          <button class="btn" data-act="restart-yes" type="button">重新开始</button>
          <button class="ghost-btn" data-act="close-modal" type="button">取消</button>
        </div>
      </div>
    </div>
  `;
}

function restartTournament() {
  closeModal();
  busy = false;
  state = null;
  ui.view = null;
  ui.shareBlob = null;
  saveState();
  render();
}

function undo() {
  closeModal();
  busy = false;
  if (!state) {
    return;
  }
  if (state.phase === "draw") {
    restartTournament();
    return;
  }
  if (!state.undoStack.length) {
    restartTournament();
    return;
  }
  const stack = [...state.undoStack];
  const previous = stack.pop();
  state = normalizeRecoveredState({ ...previous, undoStack: stack });
  saveState();
  render();
}

function backButtonLabel() {
  if (!state) {
    return "返回";
  }
  if (state.phase === "draw") {
    return "返回首页";
  }
  return "返回上一步";
}

function pushUndo() {
  if (!state) {
    return;
  }
  const snapshot = JSON.parse(JSON.stringify({ ...state, undoStack: [] }));
  state.undoStack.push(snapshot);
  if (state.undoStack.length > 40) {
    state.undoStack.shift();
  }
}

function openShareModal() {
  if (document.getElementById("share-modal")) {
    return;
  }

  elements.overlays.innerHTML = `
    <div class="modal" data-act="close-modal">
      <div class="modal-card" id="share-modal">
        <h3 class="modal-title">生成对阵图</h3>
        <p class="modal-copy">会把这届淘汰赛整理成一张本地对阵图图片，适合保存或发给朋友。</p>
        <div class="share-stage" id="share-stage">
          <div class="helper">正在绘制淘汰赛对阵图…</div>
        </div>
        <div class="share-actions" id="share-actions"></div>
      </div>
    </div>
  `;

  createShareBlob()
    .then((blob) => {
      ui.shareBlob = blob;
      const stage = document.getElementById("share-stage");
      const actions = document.getElementById("share-actions");
      if (!stage || !actions) {
        return;
      }
      const url = URL.createObjectURL(blob);
      stage.innerHTML = `<img src="${url}" alt="电影世界杯分享图">`;
      actions.innerHTML = `
        <button class="btn" data-act="share-go" type="button">${ICONS.share}分享</button>
        <button class="ghost-btn" data-act="download-share" type="button">下载图片</button>
      `;
      stage.dataset.objectUrl = url;
    })
    .catch(() => {
      const stage = document.getElementById("share-stage");
      if (stage) {
        stage.innerHTML = `<div class="helper">图片生成失败，请稍后再试。</div>`;
      }
    });
}

function closeModal() {
  const stage = document.getElementById("share-stage");
  if (stage?.dataset.objectUrl) {
    URL.revokeObjectURL(stage.dataset.objectUrl);
  }
  elements.overlays.innerHTML = "";
}

function showRoundIntro(title, subtitle) {
  const intro = document.createElement("div");
  intro.className = "round-intro";
  intro.innerHTML = `
    <div class="ri-box">
      <span class="pill grad">MOVIE CUP</span>
      <div class="ri-title">${escapeHtml(title)}</div>
      <p class="ri-sub">${escapeHtml(subtitle)}</p>
    </div>
  `;
  elements.overlays.appendChild(intro);
  const close = () => {
    intro.classList.add("out");
    setTimeout(() => intro.remove(), 220);
  };
  intro.addEventListener("click", close);
  setTimeout(close, 1500);
}

async function shareImage() {
  if (!ui.shareBlob) {
    return;
  }

  if (!navigator.share) {
    downloadShareImage();
    return;
  }

  const file = new File([ui.shareBlob], `${getChampionMovie().title}-movie-world-cup-bracket.jpg`, { type: "image/jpeg" });
  try {
    if (navigator.canShare && !navigator.canShare({ files: [file] })) {
      downloadShareImage();
      return;
    }
    await navigator.share({
      title: "电影世界杯",
      text: `我的冠军电影是《${getChampionMovie().title}》`,
      files: [file]
    });
  } catch (error) {
    if (error?.name !== "AbortError") {
      downloadShareImage();
    }
  }
}

function downloadShareImage() {
  if (!ui.shareBlob) {
    return;
  }
  const link = document.createElement("a");
  link.download = `${getChampionMovie().title}-movie-world-cup-bracket.jpg`;
  link.href = URL.createObjectURL(ui.shareBlob);
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 200);
}

async function createShareBlob() {
  const champion = getChampionMovie();
  const runnerUp = getRunnerUpMovie();
  const canvas = document.createElement("canvas");
  canvas.width = 1480;
  canvas.height = 1800;
  const context = canvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, champion.palette[0]);
  gradient.addColorStop(1, champion.palette[1]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(6, 8, 12, 0.36)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  roundRect(context, 42, 42, 1396, 1716, 42);
  context.fillStyle = "rgba(10, 12, 16, 0.68)";
  context.fill();
  context.strokeStyle = "rgba(248, 243, 235, 0.12)";
  context.lineWidth = 2;
  context.stroke();

  context.fillStyle = "#f8f3eb";
  context.font = "700 28px Arial";
  context.fillText("MOVIE CUP", 84, 98);
  context.font = "500 20px Arial";
  context.fillStyle = "rgba(248, 243, 235, 0.72)";
  context.fillText("KNOCKOUT BRACKET", 84, 132);
  context.font = "700 56px Arial";
  context.fillStyle = "#f8f3eb";
  context.fillText(state.sourceLabel, 84, 220);
  context.font = "500 24px Arial";
  context.fillStyle = "rgba(248, 243, 235, 0.72)";
  context.fillText(`${state.size.bracket} 强淘汰赛 · 冠军《${champion.title}》`, 84, 264);

  const rounds = state.rounds || [];
  const firstRoundMatches = rounds[0]?.length || 1;
  const slotUnit = 1160 / (firstRoundMatches * 2);
  const contentTop = 330;
  const roundXStart = 64;
  const roundXGap = 220;
  const blockWidth = 176;

  rounds.forEach((round, roundIndex) => {
    const roundX = roundXStart + roundIndex * roundXGap;
    context.fillStyle = "rgba(248, 243, 235, 0.72)";
    context.font = "700 18px Arial";
    context.fillText(roundName(roundIndex), roundX, 304);

    round.forEach((match, matchIndex) => {
      const centerY = contentTop + slotUnit * (2 ** roundIndex) * (2 * matchIndex + 1);
      const blockHeight = Math.min(148, Math.max(92, slotUnit * (2 ** (roundIndex + 1)) - 16));
      const top = centerY - blockHeight / 2;
      const halfHeight = blockHeight / 2;
      const winnerSide = match.winner === match.a ? "a" : match.winner === match.b ? "b" : "";

      roundRect(context, roundX, top, blockWidth, blockHeight, 20);
      context.fillStyle = "rgba(248, 243, 235, 0.06)";
      context.fill();
      context.strokeStyle = "rgba(248, 243, 235, 0.08)";
      context.lineWidth = 1.2;
      context.stroke();

      if (winnerSide === "a" || winnerSide === "b") {
        const highlightTop = winnerSide === "a" ? top : top + halfHeight;
        roundRect(context, roundX + 1, highlightTop + 1, blockWidth - 2, halfHeight - 2, 18);
        context.fillStyle = "rgba(255, 255, 255, 0.08)";
        context.fill();
      }

      context.beginPath();
      context.moveTo(roundX + 18, top + halfHeight);
      context.lineTo(roundX + blockWidth - 18, top + halfHeight);
      context.strokeStyle = "rgba(248, 243, 235, 0.08)";
      context.stroke();

      drawBracketMovieRow(context, getMovie(match.a), roundX, top, blockWidth, halfHeight, winnerSide === "a");
      drawBracketMovieRow(context, getMovie(match.b), roundX, top + halfHeight, blockWidth, halfHeight, winnerSide === "b");

      if (roundIndex < rounds.length - 1) {
        const nextCenterY = contentTop + slotUnit * (2 ** (roundIndex + 1)) * (2 * Math.floor(matchIndex / 2) + 1);
        const startX = roundX + blockWidth;
        const midX = startX + 18;
        context.beginPath();
        context.moveTo(startX, centerY);
        context.lineTo(midX, centerY);
        context.lineTo(midX, nextCenterY);
        context.lineTo(roundX + roundXGap, nextCenterY);
        context.strokeStyle = "rgba(248, 243, 235, 0.2)";
        context.lineWidth = 2;
        context.stroke();
      }
    });
  });

  const championX = roundXStart + rounds.length * roundXGap + 10;
  const championY = contentTop + slotUnit * (2 ** (rounds.length - 1));
  const championWidth = 290;
  const championHeight = 368;
  const poster = await loadImage(buildPoster(champion, "冠军"));

  roundRect(context, championX, championY - championHeight / 2, championWidth, championHeight, 28);
  context.fillStyle = "rgba(248, 243, 235, 0.08)";
  context.fill();
  context.strokeStyle = "rgba(248, 243, 235, 0.12)";
  context.lineWidth = 2;
  context.stroke();

  context.save();
  roundRect(context, championX + 18, championY - 152, 108, 150, 20);
  context.clip();
  context.drawImage(poster, championX + 18, championY - 152, 108, 150);
  context.restore();

  context.fillStyle = "rgba(248, 243, 235, 0.68)";
  context.font = "700 18px Arial";
  context.fillText("冠军", championX + 146, championY - 118);
  context.fillStyle = "#f8f3eb";
  context.font = "700 40px Arial";
  fillCanvasMultiline(context, champion.title, championX + 146, championY - 62, 120, 42);
  context.font = "500 20px Arial";
  context.fillStyle = "rgba(248, 243, 235, 0.76)";
  fillCanvasMultiline(context, `${champion.director} · ${champion.year}`, championX + 146, championY + 44, 120, 24);
  fillCanvasMultiline(context, `${champion.region} · ${champion.genre}`, championX + 18, championY + 120, championWidth - 36, 24);
  if (runnerUp) {
    context.fillStyle = "rgba(248, 243, 235, 0.64)";
    context.font = "600 18px Arial";
    fillCanvasMultiline(context, `亚军 ${runnerUp.title}`, championX + 18, championY + 180, championWidth - 36, 24);
  }

  context.fillStyle = "rgba(248, 243, 235, 0.1)";
  roundRect(context, 84, 1606, 1312, 106, 24);
  context.fill();
  context.fillStyle = "#f8f3eb";
  context.font = "700 20px Arial";
  context.fillText("TOURNAMENT", 116, 1652);
  context.font = "500 24px Arial";
  fillCanvasMultiline(context, `${state.sourceLabel} · ${state.size.n} 部电影 · ${emptyStateFlowText()}`, 116, 1692, 1240, 30);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }
      reject(new Error("分享图生成失败"));
    }, "image/jpeg", 0.92);
  });
}

function drawBracketMovieRow(context, movie, x, y, width, height, isWinner) {
  if (!movie) {
    return;
  }

  context.fillStyle = isWinner ? "#f8f3eb" : "rgba(248, 243, 235, 0.78)";
  context.font = isWinner ? "700 21px Arial" : "600 20px Arial";
  fillCanvasMultiline(context, movie.title, x + 16, y + 28, width - 32, 24);
  context.font = "500 14px Arial";
  context.fillStyle = "rgba(248, 243, 235, 0.58)";
  fillCanvasMultiline(context, `${movie.director} · ${movie.year}`, x + 16, y + height - 14, width - 32, 18);
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function downloadTemplate() {
  const lines = [
    "https://movie.douban.com/subject/1291561/",
    "1292052",
    "花样年华",
    "末路狂花"
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.download = "douban-import-template.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
  setImportStatus("neutral", "已下载导入模板。补到 32 行后再导入即可。");
}

function exportCurrentRoster() {
  const roster = (state?.catalog || normalizeCatalog(DEFAULT_MOVIES)).map((movie) => ({
    subjectId: movie.subjectId,
    sourceIndex: movie.sourceIndex,
    title: movie.title,
    subtitle: movie.subtitle,
    year: movie.year,
    region: movie.region,
    genre: movie.genre,
    genreTags: movie.genreTags,
    director: movie.director,
    directors: movie.directors,
    rating: movie.rating,
    vibe: movie.vibe,
    palette: movie.palette,
    posterUrl: movie.posterUrl,
    sourceUrl: movie.sourceUrl
  }));
  const blob = new Blob([JSON.stringify(roster, null, 2)], { type: "application/json;charset=utf-8" });
  const link = document.createElement("a");
  link.download = buildRosterFilename();
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
  setImportStatus("success", "已导出当前片单 JSON。后续可以直接拖回页面恢复。");
}

function restoreDefaultCatalog() {
  ui.rosterInput = JSON.stringify(normalizeCatalog(DEFAULT_MOVIES), null, 2);
  const textarea = document.getElementById("roster-input");
  if (textarea) {
    textarea.value = ui.rosterInput;
  }
  setImportStatus("success", "已把内置 32 强写入输入框。也可以直接点“内置 32 强开赛”。");
  syncRosterComposerUI();
}

function progress() {
  if (!state) {
    return 0;
  }
  const total = state.size.groups + (state.size.wild > 0 ? 1 : 0) + (state.size.bracket - 1);
  let done = state.groupPicks.length;
  if (state.size.wild > 0 && (state.phase === "knockout" || state.phase === "done")) {
    done += 1;
  }
  if (state.rounds) {
    done += state.rounds.flat().filter((match) => match.winner).length;
  }
  return Math.min(100, Math.round((done / total) * 100));
}

function phaseLabel() {
  switch (state.phase) {
    case "draw":
      return "分组抽签";
    case "group":
      return `小组赛 · ${groupLabel(state.gi)} 组`;
    case "wildcard":
      return "遗珠复活赛";
    case "knockout":
      return `${roundName(state.ri)} · 第 ${state.mi + 1} 场`;
    case "done":
      return "冠军诞生";
    default:
      return "";
  }
}

function getChampionMovie() {
  const final = state?.rounds?.[state.rounds.length - 1]?.[0];
  return final?.winner ? getMovie(final.winner) : null;
}

function getRunnerUpMovie() {
  const final = state?.rounds?.[state.rounds.length - 1]?.[0];
  if (!final?.winner) {
    return null;
  }
  return getMovie(final.winner === final.a ? final.b : final.a);
}

function posterSrc(movie) {
  if (!movie.posterUrl) {
    return buildPoster(movie);
  }
  if (!/^https?:\/\//i.test(movie.posterUrl)) {
    return movie.posterUrl;
  }
  return buildApiUrl(`/api/poster?url=${encodeURIComponent(movie.posterUrl)}`) || movie.posterUrl;
}

function posterImage(movie, options = {}) {
  const loading = options.eager ? "eager" : "lazy";
  return `<img src="${posterSrc(movie)}" data-fallback-src="${buildPoster(movie)}" alt="${escapeHtml(movie.title)} 海报" loading="${loading}">`;
}

function getCatalog() {
  return state?.catalog || [];
}

function getMovie(movieId) {
  return getCatalog().find((movie) => movie.id === movieId);
}

function normalizeCatalog(list) {
  const usedIds = new Set();
  return list.map((movie, index) => {
    const normalized = normalizeMovie(movie, index);
    let nextId = normalized.id;
    while (usedIds.has(nextId)) {
      nextId = `${normalized.id}-${usedIds.size + 1}`;
    }
    usedIds.add(nextId);
    return { ...normalized, id: nextId };
  });
}

function normalizeMovie(movie, index) {
  const title = normalizeDisplayTitle(movie.title);
  if (!title) {
    throw new Error(`第 ${index + 1} 条记录缺少 title。`);
  }

  const genres = Array.isArray(movie.genreTags) ? movie.genreTags.filter(Boolean) : [];
  const directors = Array.isArray(movie.directors) ? movie.directors.filter(Boolean) : [];
  return {
    id: slugify(movie.id || movie.subjectId || title),
    subjectId: String(movie.subjectId || movie.id || "").trim(),
    sourceIndex: Number.isInteger(movie.sourceIndex) ? movie.sourceIndex : index,
    title,
    subtitle: String(movie.subtitle || "").trim(),
    year: Number(movie.year) || parseYear(movie.title) || 2000,
    region: String(movie.region || "未标注").trim(),
    genre: String(movie.genre || genres[0] || "剧情").trim(),
    genreTags: genres.length ? genres : [String(movie.genre || "剧情").trim()],
    director: String(movie.director || directors[0] || "未知导演").trim(),
    directors: directors.length ? directors : [String(movie.director || "未知导演").trim()],
    rating: clamp(Math.round(Number(movie.rating) || 90), 60, 100),
    vibe: String(movie.vibe || buildVibe(movie)).trim(),
    palette: Array.isArray(movie.palette) && movie.palette.length >= 2 ? movie.palette.slice(0, 2) : derivePalette(title, index),
    posterUrl: String(movie.posterUrl || movie.cover || "").trim(),
    sourceUrl: String(movie.sourceUrl || movie.url || "").trim()
  };
}

function syncGroupSelectionUI() {
  document.querySelectorAll('[data-act="toggle-pick"]').forEach((node) => {
    node.classList.toggle("picked", state.sel.includes(node.dataset.movieId));
  });
  const button = document.querySelector('[data-act="confirm-group"]');
  if (button) {
    button.disabled = state.sel.length !== 2;
    button.textContent = groupConfirmLabel();
  }
}

function syncWildcardSelectionUI() {
  document.querySelectorAll('[data-act="toggle-wild"]').forEach((node) => {
    node.classList.toggle("picked", state.sel.includes(node.dataset.movieId));
  });
  const button = document.querySelector('[data-act="confirm-wild"]');
  if (button) {
    button.disabled = state.sel.length !== state.size.wild;
    button.textContent = state.sel.length === state.size.wild
      ? "名单齐了，开启淘汰赛"
      : `已复活 ${state.sel.length} / ${state.size.wild}`;
  }
}

function buildVibe(movie) {
  const pieces = [];
  if (movie.director || (movie.directors && movie.directors[0])) {
    pieces.push(`导演：${movie.director || movie.directors[0]}`);
  }
  if (movie.genreTags && movie.genreTags.length) {
    pieces.push(movie.genreTags.slice(0, 2).join(" / "));
  } else if (movie.genre) {
    pieces.push(movie.genre);
  }
  if (movie.region) {
    pieces.push(movie.region);
  }
  return pieces.join(" · ") || "豆瓣推荐片单";
}

function buildPoster(movie, badge = "入围") {
  const titleLines = splitTitle(movie.title, 8);
  const text = titleLines.map((line, index) => (
    `<text x="44" y="${222 + index * 58}" font-size="48" font-family="Arial, PingFang SC, sans-serif" fill="#f8f3eb" font-weight="700">${escapeHtml(line)}</text>`
  )).join("");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 960">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${movie.palette[0]}"/>
          <stop offset="100%" stop-color="${movie.palette[1]}"/>
        </linearGradient>
      </defs>
      <rect width="720" height="960" fill="url(#bg)"/>
      <rect x="36" y="36" width="648" height="888" rx="28" fill="rgba(8, 10, 12, 0.18)" stroke="rgba(248,243,235,0.16)" stroke-width="2"/>
      <circle cx="580" cy="180" r="96" fill="rgba(248,243,235,0.12)"/>
      <circle cx="188" cy="756" r="150" fill="rgba(8,10,12,0.12)"/>
      <text x="44" y="96" font-size="20" font-family="Arial, PingFang SC, sans-serif" fill="rgba(248,243,235,0.72)">MOVIE WORLD CUP</text>
      <text x="44" y="138" font-size="30" font-family="Arial, PingFang SC, sans-serif" fill="#f8f3eb" font-weight="700">${escapeHtml(badge)}</text>
      ${text}
      <text x="44" y="760" font-size="26" font-family="Arial, PingFang SC, sans-serif" fill="rgba(248,243,235,0.84)">${escapeHtml(movie.director)}</text>
      <text x="44" y="804" font-size="24" font-family="Arial, PingFang SC, sans-serif" fill="rgba(248,243,235,0.72)">${movie.year} / ${escapeHtml(movie.region)} / ${escapeHtml(movie.genre)}</text>
      <text x="44" y="862" font-size="22" font-family="Arial, PingFang SC, sans-serif" fill="rgba(248,243,235,0.74)">${escapeHtml(movie.vibe)}</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function splitTitle(title, maxChars) {
  const lines = [];
  let buffer = "";
  for (const char of title) {
    buffer += char;
    if (buffer.length >= maxChars) {
      lines.push(buffer);
      buffer = "";
    }
  }
  if (buffer) {
    lines.push(buffer);
  }
  return lines.slice(0, 3);
}

function fillCanvasMultiline(context, text, startX, startY, maxWidth, lineHeight) {
  let line = "";
  let y = startY;
  for (const char of text) {
    const testLine = line + char;
    if (context.measureText(testLine).width > maxWidth && line) {
      context.fillText(line, startX, y);
      line = char;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    context.fillText(line, startX, y);
  }
}

function parseRosterLines(text) {
  return String(text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function syncRosterComposerUI() {
  const meta = document.getElementById("composer-meta");
  if (!meta) {
    return;
  }
  const text = ui.rosterInput.trim();
  if (!text) {
    meta.textContent = `支持 ${HOME_SIZE_OPTIONS.join(" / ")} 条豆瓣链接、subject ID、片名，或直接粘贴 JSON 片单。`;
    return;
  }
  if (text.startsWith("[")) {
    meta.textContent = "检测到 JSON 片单，会按内容直接恢复赛事。";
    return;
  }
  const lines = parseRosterLines(text);
  meta.textContent = pickTournamentSize(lines.length)
    ? `当前识别到 ${lines.length} 条，可以直接导入开赛。`
    : `当前识别到 ${lines.length} 条，需补齐到 ${HOME_SIZE_OPTIONS.join(" / ")} 条中的一种。`;
}

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

async function fetchJson(url, options = {}) {
  const response = await fetch(buildApiUrl(url), options);
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.error || `请求失败：${response.status}`);
  }
  return payload;
}

function pickTournamentSize(count) {
  const matched = TOURNAMENT_SIZES.find((size) => count >= size.n);
  if (!matched || matched.n !== count) {
    return null;
  }
  return {
    ...matched,
    wild: matched.bracket - matched.n / 2
  };
}

function bracketOrder(size) {
  let seeds = [1];
  while (seeds.length < size) {
    const matchSize = seeds.length * 2;
    const next = [];
    seeds.forEach((seed) => {
      next.push(seed, matchSize + 1 - seed);
    });
    seeds = next;
  }
  return seeds;
}

function compareMovieSourceOrder(leftId, rightId) {
  const left = getMovie(leftId);
  const right = getMovie(rightId);
  return (
    (left?.sourceIndex ?? Number.MAX_SAFE_INTEGER) - (right?.sourceIndex ?? Number.MAX_SAFE_INTEGER) ||
    String(left?.title || "").localeCompare(String(right?.title || ""), "zh-CN")
  );
}

function drawSubtitle() {
  if (state.size.wild > 0) {
    return `固定 ${state.size.n} 部电影，${state.size.groups} 个小组。每组选 2 部直通，剩余电影争夺 ${state.size.wild} 个复活名额。`;
  }
  return `固定 ${state.size.n} 部电影，${state.size.groups} 个小组。每组选 2 部直通，直接进入 ${state.size.bracket} 强淘汰赛。`;
}

function groupSubtitle() {
  if (state.size.wild > 0) {
    return `从 4 部电影里选出你更喜欢的 2 部直通，剩下的继续争 ${state.size.wild} 个遗珠席位。`;
  }
  return `从 4 部电影里选出你更喜欢的 2 部，直接进入 ${state.size.bracket} 强。`;
}

function wildcardSubtitle() {
  const leftoverCount = state.size.n / 2;
  return `${leftoverCount} 部落选电影里还有 ${state.size.wild} 个复活名额，继续补齐 ${state.size.bracket} 强签表。`;
}

function emptyStateFlowText() {
  const defaultSize = pickTournamentSize(DEFAULT_MOVIES.length);
  if (defaultSize?.wild) {
    return "Group Stage → Wildcard → Knockout → Champion";
  }
  return "Group Stage → Knockout → Champion";
}

function groupLabel(index) {
  return GROUP_LABELS[index] || `G${index + 1}`;
}

function normalizeRecoveredState(candidate) {
  if (!candidate || candidate.version !== 6 || !Array.isArray(candidate.catalog)) {
    return null;
  }
  const normalizedCatalog = normalizeCatalog(candidate.catalog);
  const size = pickTournamentSize(normalizedCatalog.length);
  if (!size) {
    return null;
  }
  const groups = Array.isArray(candidate.groups) && candidate.groups.length === size.groups
    ? candidate.groups
    : buildGroups(normalizedCatalog, size.groups);
  const groupOf = {};
  groups.forEach((group, groupIndex) => {
    group.forEach((movieId) => {
      groupOf[movieId] = groupIndex;
    });
  });
  return {
    ...candidate,
    catalog: normalizedCatalog,
    size,
    groups,
    groupOf,
    phase: candidate.phase || "draw",
    gi: Number(candidate.gi) || 0,
    sel: Array.isArray(candidate.sel) ? candidate.sel : [],
    groupPicks: Array.isArray(candidate.groupPicks) ? candidate.groupPicks : [],
    wildcardPicks: Array.isArray(candidate.wildcardPicks) ? candidate.wildcardPicks : [],
    rounds: Array.isArray(candidate.rounds) ? candidate.rounds : null,
    ri: Number(candidate.ri) || 0,
    mi: Number(candidate.mi) || 0,
    undoStack: Array.isArray(candidate.undoStack) ? candidate.undoStack : []
  };
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch (error) {
    return null;
  }
}

function saveState() {
  if (!state) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setImportStatus(tone, text) {
  ui.importStatus = { tone, text };
  const node = document.getElementById("import-status");
  if (node) {
    node.className = `import-status ${tone === "neutral" ? "" : tone}`.trim();
    node.textContent = text;
  }
}

function showToast(text) {
  const old = document.getElementById("toast");
  if (old) {
    old.remove();
  }
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.className = "toast";
  toast.textContent = text;
  document.body.appendChild(toast);
  clearTimeout(ui.toastTimer);
  ui.toastTimer = window.setTimeout(() => toast.remove(), 2200);
}

function shuffle(list) {
  for (let index = list.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [list[index], list[swapIndex]] = [list[swapIndex], list[index]];
  }
  return list;
}

function parseYear(value) {
  const match = String(value || "").match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : 0;
}

function derivePalette(seed, index) {
  const paletteBank = [
    ["#28323f", "#d19349"],
    ["#5a1d1b", "#cc8d61"],
    ["#183f49", "#b8c96e"],
    ["#332441", "#d4ac78"],
    ["#23331b", "#d48d54"],
    ["#102c3a", "#b07a5f"]
  ];
  return paletteBank[(seed.length + index) % paletteBank.length];
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "") || `movie-${Date.now()}`;
}

function normalizeDisplayTitle(value) {
  const text = String(value || "").trim();
  const chinese = extractChineseDisplayTitle(text);
  return chinese || stripDisplayTitle(text);
}

function extractChineseDisplayTitle(text) {
  const chunks = String(text || "").match(/[\u3400-\u9fffA-Za-z0-9《》·：:？！、，。\-]+/g) || [];
  return chunks.find((part) => /[\u3400-\u9fff]/.test(part)) || "";
}

function stripDisplayTitle(text) {
  return String(text || "")
    .replace(/\s*[\/|｜].*$/, "")
    .replace(/\s{2,}.*/, "")
    .replace(/\s+[A-Za-z].*$/, "")
    .trim();
}

function buildRosterFilename() {
  const stamp = new Date().toISOString().slice(0, 10);
  return `movie-world-cup-roster-${stamp}.json`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function bootstrapProxy() {
  if (await ensureApiReady()) {
    const label = ui.apiBase ? ui.apiBase : "当前页面同源代理";
    setImportStatus("success", `已连接本地代理：${label}。首页推荐和豆瓣片单导入已可用。`);
    return;
  }
  setImportStatus("neutral", "推荐和豆瓣导入需要本地代理。执行 node server.js 后，页面会自动连接 8765 / 8766 / 8767。");
}

async function ensureApiReady() {
  if (ui.apiBase !== null) {
    return true;
  }
  const detected = await discoverApiBase();
  if (detected === null) {
    return false;
  }
  ui.apiBase = detected;
  try {
    localStorage.setItem(API_BASE_STORAGE_KEY, detected);
  } catch (error) {
    // Ignore localStorage failures in restricted contexts.
  }
  return true;
}

async function discoverApiBase() {
  if ((location.protocol === "http:" || location.protocol === "https:") && await probeApiBase("")) {
    return "";
  }

  const saved = sanitizeApiBase(readStoredApiBase());
  if (saved && await probeApiBase(saved)) {
    return saved;
  }

  for (const port of LOCAL_PROXY_PORTS) {
    const candidate = `http://127.0.0.1:${port}`;
    if (await probeApiBase(candidate)) {
      return candidate;
    }
  }
  return null;
}

async function probeApiBase(base) {
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 1200);
    const response = await fetch(buildApiUrl("/api/health", base), {
      method: "GET",
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!response.ok) {
      return false;
    }
    const payload = await response.json().catch(() => null);
    return Boolean(payload?.ok);
  } catch (error) {
    return false;
  }
}

function buildApiUrl(url, overrideBase = ui.apiBase) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  const base = overrideBase ?? "";
  return `${base}${url}`;
}

function inferInitialApiBase() {
  const queryBase = sanitizeApiBase(new URLSearchParams(location.search).get("apiBase"));
  if (queryBase) {
    try {
      localStorage.setItem(API_BASE_STORAGE_KEY, queryBase);
    } catch (error) {
      // Ignore localStorage failures in restricted contexts.
    }
    return queryBase;
  }
  return sanitizeApiBase(readStoredApiBase());
}

function readStoredApiBase() {
  try {
    return localStorage.getItem(API_BASE_STORAGE_KEY);
  } catch (error) {
    return "";
  }
}

function sanitizeApiBase(value) {
  if (!value) {
    return null;
  }
  try {
    const url = new URL(String(value));
    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }
    return url.origin;
  } catch (error) {
    return null;
  }
}
