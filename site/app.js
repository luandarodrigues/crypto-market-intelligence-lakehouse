function formatNarrativeLabel(value) {
  return value.replaceAll("_", " ");
}

function formatNumber(value, digits) {
  return Number(value).toFixed(digits);
}

function formatCompactNumber(value, digits = 1) {
  if (value === null || value === undefined) {
    return "N/A";
  }
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: digits,
  }).format(Number(value));
}

function formatPercent(value, digits = 2) {
  if (value === null || value === undefined) {
    return "N/A";
  }
  return `${Number(value).toFixed(digits)}%`;
}

function formatDecimal(value, digits = 4) {
  if (value === null || value === undefined) {
    return "N/A";
  }
  return Number(value).toFixed(digits);
}

function formatGeneratedAt(value) {
  const date = new Date(value);
  return `Snapshot generated ${date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  })} UTC`;
}

function regimeTone(value) {
  if (value.includes("bullish")) {
    return "bullish";
  }
  if (value.includes("bearish")) {
    return "bearish";
  }
  return "neutral";
}

function buildTag(label, tone = "neutral") {
  const toneClass = {
    bullish: "tag-bullish",
    bearish: "tag-bearish",
    neutral: "tag-neutral",
  }[tone] || "tag-neutral";
  return `<span class="tag ${toneClass}">${label}</span>`;
}

function buildHeroMetric(label, value, copy) {
  const item = document.createElement("div");
  item.className = "hero-metric";
  item.innerHTML = `
    <strong>${value}</strong>
    <span>${label}: ${copy}</span>
  `;
  return item;
}

function buildOverviewCard(index, title, body, tone) {
  const item = document.createElement("article");
  item.className = `about-card box--${tone}`;
  item.innerHTML = `
    <span>${String(index + 1).padStart(2, "0")}</span>
    <h3>${title}</h3>
    <p>${body}</p>
  `;
  return item;
}

function buildPipelineNode(label, title, copy, tone) {
  const item = document.createElement("article");
  item.className = `pipeline-node box--${tone}`;
  item.innerHTML = `
    <p class="mini-label">${label}</p>
    <strong>${title}</strong>
    <span>${copy}</span>
  `;
  return item;
}

function buildArchitectureCard(line, index) {
  const item = document.createElement("article");
  item.className = "architecture-card";
  const parts = line.split(":");
  item.innerHTML = `
    <span class="architecture-step">${String(index + 1).padStart(2, "0")}</span>
    <h3>${parts[0]}</h3>
    <p>${parts.slice(1).join(":").trim()}</p>
  `;
  return item;
}

function buildSignalCard(signal, tone) {
  const item = document.createElement("article");
  item.className = `signal-card box--${tone}`;
  item.innerHTML = `
    <p class="mini-label">Signal Layer</p>
    <h3>${signal.name}</h3>
    <p>${signal.description}</p>
  `;
  return item;
}

function buildBlueprintCard(item, tone) {
  const card = document.createElement("article");
  card.className = `signal-card box--${tone}`;
  card.innerHTML = `
    <p class="mini-label">${item.artifact}</p>
    <h3>${item.title}</h3>
    <p>${item.description}</p>
  `;
  return card;
}

function buildFeaturedStat(label, value, body) {
  const item = document.createElement("div");
  item.className = "featured-stat";
  item.innerHTML = `
    <span class="featured-label">${label}</span>
    <strong>${value}</strong>
    <p>${body}</p>
  `;
  return item;
}

function buildBuildDetail(title, body, tone) {
  const item = document.createElement("article");
  item.className = `box box--${tone}`;
  item.innerHTML = `
    <span class="featured-label">${title}</span>
    <h3>${title}</h3>
    <p>${body}</p>
  `;
  return item;
}

function buildAssetTable(rows) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Asset</th>
      <th>Narrative</th>
      <th>Attention</th>
      <th>Driver</th>
      <th>Regime</th>
    </tr>
  `;
  const tbody = document.createElement("tbody");
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="table-strong">${row.symbol}</td>
      <td><span class="tag">${formatNarrativeLabel(row.narrative)}</span></td>
      <td>${formatNumber(row.attention_score, 2)}</td>
      <td>${formatNarrativeLabel(row.top_driver)}</td>
      <td>${buildTag(formatNarrativeLabel(row.regime_tag), regimeTone(row.regime_tag))}</td>
    `;
    tbody.appendChild(tr);
  });
  table.append(thead, tbody);
  return table;
}

function buildNarrativeTable(rows) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Narrative</th>
      <th>Assets</th>
      <th>Avg Attention</th>
      <th>Avg Confirmation</th>
    </tr>
  `;
  const tbody = document.createElement("tbody");
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="table-strong">${formatNarrativeLabel(row.narrative)}</td>
      <td>${row.asset_count}</td>
      <td>${formatNumber(row.avg_attention_score, 2)}</td>
      <td>${formatNumber(row.avg_confirmation_score, 2)}</td>
    `;
    tbody.appendChild(tr);
  });
  table.append(thead, tbody);
  return table;
}

function buildAssetItem(row, isActive) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `asset-item${isActive ? " is-active" : ""}`;
  button.dataset.symbol = row.symbol;
  button.innerHTML = `
    <div class="asset-item-top">
      <span class="asset-symbol">${row.symbol}</span>
      <span class="tag">${formatNarrativeLabel(row.narrative)}</span>
      ${buildTag(formatNarrativeLabel(row.regime_tag), regimeTone(row.regime_tag))}
    </div>
    <p class="asset-meta">
      Attention ${formatNumber(row.attention_score, 2)} / Confirmation ${formatNumber(row.confirmation_score, 2)} /
      Driver ${formatNarrativeLabel(row.top_driver)}
    </p>
  `;
  return button;
}

function buildNarrativeItem(row, isActive) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `asset-item${isActive ? " is-active" : ""}`;
  button.dataset.narrative = row.narrative;
  button.innerHTML = `
    <div class="asset-item-top">
      <span class="asset-symbol">${formatNarrativeLabel(row.narrative)}</span>
      <span class="tag">${row.asset_count} assets</span>
    </div>
    <p class="asset-meta">
      Avg attention ${formatNumber(row.avg_attention_score, 2)} / Avg confirmation ${formatNumber(row.avg_confirmation_score, 2)} /
      Leader ${row.leader_symbol}
    </p>
  `;
  return button;
}

function buildAssetDetail(row) {
  const wrapper = document.createElement("div");
  if (!row) {
    wrapper.innerHTML = `
      <div class="detail-copy">
        <p>Select an asset to inspect its narrative, regime, and current attention context.</p>
      </div>
    `;
    return wrapper;
  }

  const signalSummary = row.top_driver === "derivatives_positioning"
    ? "Derivatives positioning is the leading explanatory layer right now."
    : row.top_driver === "onchain_confirmation"
      ? "On-chain confirmation is helping justify the current attention profile."
      : "Volume and market-structure context remain the primary explanation right now.";

  const marketSummary = row.relative_strength_7d === null || row.relative_strength_7d === undefined
    ? "Cross-sectional market features are not yet available for this asset in the exported snapshot."
    : `${row.symbol} is showing ${formatPercent(row.relative_strength_7d)} relative strength over the recent 7-day window, with ${formatCompactNumber(row.quote_volume)} in quote volume.`;

  const derivativesSummary = row.open_interest
    ? `Current derivatives context includes ${formatCompactNumber(row.open_interest, 2)} open interest and ${formatDecimal(row.funding_rate, 6)} funding.`
    : "Derivatives detail is currently sparse for this asset, which makes the explorer useful for highlighting where coverage still needs to deepen.";

  wrapper.innerHTML = `
    <div class="detail-hero">
      <div class="asset-detail-top">
        <span class="detail-symbol">${row.symbol}</span>
        <span class="tag">${formatNarrativeLabel(row.narrative)}</span>
        ${buildTag(formatNarrativeLabel(row.regime_tag), regimeTone(row.regime_tag))}
      </div>
      <div class="detail-score-row">
        <div class="detail-score">Attention ${formatNumber(row.attention_score, 2)}</div>
        <div class="detail-tag-row">
          <span class="tag">${formatNarrativeLabel(row.top_driver)}</span>
        </div>
      </div>
    </div>
    <div class="detail-grid">
      <div class="detail-metric">
        <span>Attention score</span>
        <strong>${formatNumber(row.attention_score, 3)}</strong>
      </div>
      <div class="detail-metric">
        <span>Confirmation score</span>
        <strong>${formatNumber(row.confirmation_score, 4)}</strong>
      </div>
      <div class="detail-metric">
        <span>Primary driver</span>
        <strong>${formatNarrativeLabel(row.top_driver)}</strong>
      </div>
      <div class="detail-metric">
        <span>Price</span>
        <strong>${row.close_price ? `$${formatCompactNumber(row.close_price, 2)}` : "N/A"}</strong>
      </div>
      <div class="detail-metric">
        <span>Quote volume</span>
        <strong>${formatCompactNumber(row.quote_volume, 2)}</strong>
      </div>
      <div class="detail-metric">
        <span>RS 7d</span>
        <strong>${formatPercent(row.relative_strength_7d)}</strong>
      </div>
      <div class="detail-metric">
        <span>Breadth</span>
        <strong>${row.breadth_flag ? formatNarrativeLabel(row.breadth_flag) : "N/A"}</strong>
      </div>
      <div class="detail-metric">
        <span>Crowding</span>
        <strong>${row.crowding_flag === null || row.crowding_flag === undefined ? "N/A" : row.crowding_flag ? "Elevated" : "Contained"}</strong>
      </div>
      <div class="detail-metric">
        <span>Open interest</span>
        <strong>${formatCompactNumber(row.open_interest, 2)}</strong>
      </div>
    </div>
    <div class="detail-copy">
      <p>
        ${row.symbol} currently sits inside the <strong>${formatNarrativeLabel(row.narrative)}</strong> narrative bucket,
        with a <strong>${formatNarrativeLabel(row.regime_tag)}</strong> regime tag.
      </p>
      <p>${signalSummary}</p>
      <p>${marketSummary}</p>
      <p>${derivativesSummary}</p>
      <p>
        This explorer is the first product-style surface built directly on top of the same exported gold layer used by
        the portfolio page, and acts as a prototype for a deeper platform experience.
      </p>
    </div>
  `;
  return wrapper;
}

function buildComparePanel(selectedRow, compareRow) {
  const wrapper = document.createElement("div");
  if (!selectedRow) {
    wrapper.innerHTML = "<p class=\"asset-meta\">Select an asset to compare.</p>";
    return wrapper;
  }

  if (!compareRow || compareRow.symbol === selectedRow.symbol) {
    wrapper.innerHTML = `
      <div class="card-header compact">
        <h3>Asset Comparison</h3>
        <p>Choose a second asset to compare against the selected one.</p>
      </div>
    `;
    return wrapper;
  }

  const rows = [
    ["Attention", formatNumber(selectedRow.attention_score, 2), formatNumber(compareRow.attention_score, 2)],
    ["RS 7d", formatPercent(selectedRow.relative_strength_7d), formatPercent(compareRow.relative_strength_7d)],
    ["Volume", formatCompactNumber(selectedRow.quote_volume, 2), formatCompactNumber(compareRow.quote_volume, 2)],
    ["Regime", formatNarrativeLabel(selectedRow.regime_tag), formatNarrativeLabel(compareRow.regime_tag)],
  ];

  wrapper.innerHTML = `
    <div class="card-header compact">
      <h3>Asset Comparison</h3>
      <p>${selectedRow.symbol} versus ${compareRow.symbol} across the first exported product signals.</p>
    </div>
  `;

  const table = document.createElement("table");
  table.className = "mini-table";
  table.innerHTML = `
    <thead>
      <tr>
        <th>Metric</th>
        <th>${selectedRow.symbol}</th>
        <th>${compareRow.symbol}</th>
      </tr>
    </thead>
  `;
  const tbody = document.createElement("tbody");
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  wrapper.appendChild(table);
  return wrapper;
}

function buildNarrativePulsePanel(narrativeRow, peerRows) {
  const wrapper = document.createElement("div");
  if (!narrativeRow) {
    wrapper.innerHTML = `
      <div class="card-header compact">
        <h3>Narrative Pulse</h3>
        <p>No narrative aggregation is available for the current selection.</p>
      </div>
    `;
    return wrapper;
  }

  wrapper.innerHTML = `
    <div class="card-header compact">
      <h3>Narrative Pulse</h3>
      <p>${formatNarrativeLabel(narrativeRow.narrative)} is currently led by ${narrativeRow.leader_symbol} across ${narrativeRow.asset_count} tracked assets.</p>
    </div>
    <div class="pulse-metrics">
      <div class="detail-metric">
        <span>Avg attention</span>
        <strong>${formatNumber(narrativeRow.avg_attention_score, 2)}</strong>
      </div>
      <div class="detail-metric">
        <span>Avg confirmation</span>
        <strong>${formatNumber(narrativeRow.avg_confirmation_score, 2)}</strong>
      </div>
      <div class="detail-metric">
        <span>Leader</span>
        <strong>${narrativeRow.leader_symbol}</strong>
      </div>
    </div>
  `;

  const peers = document.createElement("div");
  peers.className = "peer-list";
  peerRows.forEach((row) => {
    const item = document.createElement("div");
    item.className = "peer-item";
    item.innerHTML = `
      <span class="peer-symbol">${row.symbol}</span>
      <span>${formatNumber(row.attention_score, 2)}</span>
      ${buildTag(formatNarrativeLabel(row.regime_tag), regimeTone(row.regime_tag))}
    `;
    peers.appendChild(item);
  });
  wrapper.appendChild(peers);
  return wrapper;
}

function buildNarrativeDetail(row, peerRows) {
  const wrapper = document.createElement("div");
  if (!row) {
    wrapper.innerHTML = `
      <div class="detail-copy">
        <p>Select a narrative to inspect its current leader set and peer structure.</p>
      </div>
    `;
    return wrapper;
  }

  const broadCount = row.regime_mix.filter((value) => value === "bearish_attention" || value === "bullish_attention").length;

  wrapper.innerHTML = `
    <div class="detail-hero">
      <div class="asset-detail-top">
        <span class="detail-symbol">${formatNarrativeLabel(row.narrative)}</span>
        <span class="tag">${row.asset_count} tracked assets</span>
      </div>
      <div class="detail-score-row">
        <div class="detail-score">Leader ${row.leader_symbol}</div>
      </div>
    </div>
    <div class="detail-grid">
      <div class="detail-metric">
        <span>Avg attention</span>
        <strong>${formatNumber(row.avg_attention_score, 3)}</strong>
      </div>
      <div class="detail-metric">
        <span>Avg confirmation</span>
        <strong>${formatNumber(row.avg_confirmation_score, 4)}</strong>
      </div>
      <div class="detail-metric">
        <span>Directional assets</span>
        <strong>${broadCount}/${row.asset_count}</strong>
      </div>
    </div>
    <div class="detail-copy">
      <p>
        ${formatNarrativeLabel(row.narrative)} is currently led by <strong>${row.leader_symbol}</strong> and groups
        ${row.asset_count} assets in the first public analytical surface.
      </p>
      <p>
        This narrative mode is meant to show rotation and concentration patterns at the cluster level, which is a more
        research-oriented view than scanning individual assets one by one.
      </p>
    </div>
  `;

  const peers = document.createElement("div");
  peers.className = "peer-list";
  peerRows.forEach((peer) => {
    const item = document.createElement("div");
    item.className = "peer-item";
    item.innerHTML = `
      <span class="peer-symbol">${peer.symbol}</span>
      <span>${formatNumber(peer.attention_score, 2)}</span>
      ${buildTag(formatNarrativeLabel(peer.regime_tag), regimeTone(peer.regime_tag))}
    `;
    peers.appendChild(item);
  });
  wrapper.appendChild(peers);
  return wrapper;
}

function activateRevealAnimations() {
  const targets = document.querySelectorAll(
    ".hero, .about-shell, .cloud-pin, .featured-shell, .explorer-shell, .card, .architecture-card, .signal-card, .next-steps li",
  );
  if (!("IntersectionObserver" in window)) {
    targets.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  targets.forEach((item) => observer.observe(item));
}

function renderExplorer(data) {
  const state = {
    rows: data.asset_explorer_rows.slice(),
    filteredRows: data.asset_explorer_rows.slice(),
    selectedSymbol: data.asset_explorer_rows[0]?.symbol || null,
    compareSymbol: "none",
    mode: "assets",
    selectedNarrative: data.narrative_explorer_rows[0]?.narrative || null,
  };

  const assetsModeButton = document.getElementById("explorer-mode-assets");
  const narrativesModeButton = document.getElementById("explorer-mode-narratives");
  const assetModePanel = document.getElementById("asset-mode-panel");
  const narrativeModePanel = document.getElementById("narrative-mode-panel");
  const narrativeFilter = document.getElementById("narrative-filter");
  const sortFilter = document.getElementById("sort-filter");
  const regimeFilter = document.getElementById("regime-filter");
  const compareFilter = document.getElementById("compare-asset-filter");
  const assetList = document.getElementById("asset-list");
  const assetDetail = document.getElementById("asset-detail");
  const comparePanel = document.getElementById("compare-panel");
  const narrativePulse = document.getElementById("narrative-pulse");
  const narrativeList = document.getElementById("narrative-list");
  const narrativeDetail = document.getElementById("narrative-detail");

  const narratives = ["all", ...new Set(data.asset_explorer_rows.map((row) => row.narrative))];
  narratives.forEach((narrative) => {
    const option = document.createElement("option");
    option.value = narrative;
    option.textContent = narrative === "all" ? "All narratives" : formatNarrativeLabel(narrative);
    narrativeFilter.appendChild(option);
  });

  const compareBase = document.createElement("option");
  compareBase.value = "none";
  compareBase.textContent = "No comparison";
  compareFilter.appendChild(compareBase);
  data.asset_explorer_rows.forEach((row) => {
    const option = document.createElement("option");
    option.value = row.symbol;
    option.textContent = row.symbol;
    compareFilter.appendChild(option);
  });

  function syncSelection() {
    const exists = state.filteredRows.some((row) => row.symbol === state.selectedSymbol);
    if (!exists) {
      state.selectedSymbol = state.filteredRows[0]?.symbol || null;
    }
  }

  function renderList() {
    assetList.innerHTML = "";
    state.filteredRows.forEach((row) => {
      const item = buildAssetItem(row, row.symbol === state.selectedSymbol);
      item.addEventListener("click", () => {
        state.selectedSymbol = row.symbol;
        renderList();
        renderDetail();
      });
      assetList.appendChild(item);
    });
  }

  function renderNarrativeList() {
    narrativeList.innerHTML = "";
    data.narrative_explorer_rows.forEach((row) => {
      const item = buildNarrativeItem(row, row.narrative === state.selectedNarrative);
      item.addEventListener("click", () => {
        state.selectedNarrative = row.narrative;
        renderNarrativeList();
        renderNarrativeDetail();
      });
      narrativeList.appendChild(item);
    });
  }

  function renderDetail() {
    assetDetail.innerHTML = "";
    const selected = state.filteredRows.find((row) => row.symbol === state.selectedSymbol);
    assetDetail.appendChild(buildAssetDetail(selected));

    comparePanel.innerHTML = "";
    const compareRow = state.rows.find((row) => row.symbol === state.compareSymbol);
    comparePanel.appendChild(buildComparePanel(selected, compareRow));

    narrativePulse.innerHTML = "";
    const narrativeRow = data.narrative_explorer_rows.find((row) => row.narrative === selected?.narrative);
    const peerRows = state.rows
      .filter((row) => row.narrative === selected?.narrative)
      .sort((left, right) => right.attention_score - left.attention_score);
    narrativePulse.appendChild(buildNarrativePulsePanel(narrativeRow, peerRows));
  }

  function renderNarrativeDetail() {
    narrativeDetail.innerHTML = "";
    const selected = data.narrative_explorer_rows.find((row) => row.narrative === state.selectedNarrative);
    const peerRows = state.rows
      .filter((row) => row.narrative === selected?.narrative)
      .sort((left, right) => right.attention_score - left.attention_score);
    narrativeDetail.appendChild(buildNarrativeDetail(selected, peerRows));
  }

  function syncModeUi() {
    const assetMode = state.mode === "assets";
    assetModePanel.classList.toggle("is-hidden", !assetMode);
    narrativeModePanel.classList.toggle("is-hidden", assetMode);
    assetsModeButton.classList.toggle("is-active", assetMode);
    narrativesModeButton.classList.toggle("is-active", !assetMode);
  }

  function applyFilters() {
    state.filteredRows = state.rows.filter((row) => {
      const narrativePass = narrativeFilter.value === "all" || row.narrative === narrativeFilter.value;
      const regimePass = regimeFilter.value === "all" || row.regime_tag === regimeFilter.value;
      return narrativePass && regimePass;
    });
    state.filteredRows.sort((left, right) => {
      const key = sortFilter.value;
      return (Number(right[key] || 0) - Number(left[key] || 0));
    });
    syncSelection();
    renderList();
    renderDetail();
  }

  narrativeFilter.addEventListener("change", applyFilters);
  sortFilter.addEventListener("change", applyFilters);
  regimeFilter.addEventListener("change", applyFilters);
  compareFilter.addEventListener("change", () => {
    state.compareSymbol = compareFilter.value;
    renderDetail();
  });

  assetsModeButton.addEventListener("click", () => {
    state.mode = "assets";
    syncModeUi();
  });

  narrativesModeButton.addEventListener("click", () => {
    state.mode = "narratives";
    syncModeUi();
  });

  applyFilters();
  renderNarrativeList();
  renderNarrativeDetail();
  syncModeUi();
}

function renderCaseStudyPage() {
  if (!document.getElementById("hero-title")) {
    return;
  }

  const data = window.CMIL_SITE_DATA;
  if (!data) {
    return;
  }

  document.getElementById("hero-title").textContent = data.headline.title;
  document.getElementById("hero-subtitle").textContent = data.headline.subtitle;
  document.getElementById("generated-at").textContent = formatGeneratedAt(data.generated_at);

  const heroStats = document.getElementById("hero-stats");
  heroStats.append(
    buildHeroMetric("Assets tracked", data.overview.asset_count, "curated attention universe"),
    buildHeroMetric("Narratives mapped", data.overview.narrative_count, "seeded thematic coverage"),
    buildHeroMetric("Bearish regimes", data.overview.bearish_count, "current gold-layer directional tag"),
  );

  const overview = document.getElementById("overview");
  [
    ["Market structure", "Spot, derivatives, and on-chain context combined into one interpretable decision layer.", "health"],
    ["Databricks direction", "Built with medallion architecture logic so the local flow can evolve into jobs and Delta-backed layers.", "models"],
    ["Product framing", "Designed as a research operating layer, not as another thin crypto dashboard.", "ops"],
    ["Interactive future", "The embedded asset explorer is the first step toward a fuller live platform experience.", "health"],
  ].forEach((item, index) => {
    overview.appendChild(buildOverviewCard(index, item[0], item[1], item[2]));
  });

  const pipelineStrip = document.getElementById("pipeline-strip");
  [
    ["Bronze", "Public source capture", "Raw snapshots from CoinGecko, Binance, and DefiLlama preserved with extraction context.", "health"],
    ["Silver", "Normalized analytical tables", "Market, derivatives, and on-chain records shaped into cleaner reusable structures.", "ops"],
    ["Features", "Cross-surface signal layer", "Relative strength, open interest, funding, and capital-efficiency features prepared for scoring.", "models"],
    ["Gold", "Attention outputs", "Asset ranking, narrative aggregation, and interpretable drivers exported for product surfaces.", "health"],
  ].forEach((item) => {
    pipelineStrip.appendChild(buildPipelineNode(item[0], item[1], item[2], item[3]));
  });

  const architecture = document.getElementById("architecture");
  data.architecture.forEach((line, index) => architecture.appendChild(buildArchitectureCard(line, index)));

  const buildStats = document.getElementById("build-stats");
  buildStats.append(
    buildFeaturedStat("Pipeline layers", "4", "Bronze, silver, features, and gold shaped for lakehouse evolution."),
    buildFeaturedStat("Current assets", String(data.overview.asset_count), "Curated asset universe currently exposed in the public gold snapshot."),
    buildFeaturedStat("Narratives", String(data.overview.narrative_count), "Narrative buckets mapped into the first public analytical surface."),
    buildFeaturedStat("Explorer mode", "v1", "First embedded product interaction layer built on top of the same exported data."),
  );

  const buildDetails = document.getElementById("build-details");
  [
    ["Bundle-first deployment path", "The repo carries a Databricks bundle scaffold so workspace deployment becomes an extension of the same codebase instead of a separate manual setup step.", "health"],
    ["Pipeline orchestration path", "The bronze, silver, features, and gold stages are already separated as runnable scripts, which maps cleanly into Databricks Jobs or Lakeflow-style orchestration later.", "ops"],
    ["Feature layer design", "Signals such as relative strength, open interest, funding, and capital efficiency are modeled as reusable analytical components rather than one-off dashboard calculations.", "models"],
    ["App construction path", "The static case-study page and the embedded asset explorer share one exported site payload, which is the right product boundary for evolving toward a richer interactive application.", "health"],
  ].forEach((item) => {
    buildDetails.appendChild(buildBuildDetail(item[0], item[1], item[2]));
  });

  const signals = document.getElementById("signals");
  const tones = ["health", "models", "ops", "health"];
  data.signals.forEach((signal, index) => signals.appendChild(buildSignalCard(signal, tones[index % tones.length])));

  const blueprintGrid = document.getElementById("blueprint-grid");
  data.databricks_blueprint.forEach((item, index) => {
    blueprintGrid.appendChild(buildBlueprintCard(item, tones[index % tones.length]));
  });

  document.getElementById("top-assets").appendChild(buildAssetTable(data.top_assets));
  document.getElementById("top-narratives").appendChild(buildNarrativeTable(data.top_narratives));

  const nextSteps = document.getElementById("next-steps");
  data.next_steps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    nextSteps.appendChild(li);
  });

  renderExplorer(data);
  activateRevealAnimations();
}

function renderAppPage() {
  const shell = document.getElementById("app-shell");
  if (!shell) {
    return;
  }

  const data = window.CMIL_SITE_DATA;
  if (!data) {
    return;
  }

  document.getElementById("app-hero-title").textContent = `${data.headline.title} App`;
  document.getElementById("app-hero-subtitle").textContent =
    "A dedicated interactive view on top of the exported gold-layer snapshot, designed as the next step beyond the portfolio case study.";
  document.getElementById("generated-at").textContent = formatGeneratedAt(data.generated_at);

  const appKpis = document.getElementById("app-kpis");
  appKpis.append(
    buildHeroMetric("Assets tracked", data.overview.asset_count, "current exported universe"),
    buildHeroMetric("Narratives", data.narrative_explorer_rows.length, "cluster-level analytical views"),
    buildHeroMetric("Top asset", data.top_assets[0]?.symbol || "N/A", "current attention leader"),
    buildHeroMetric("Top narrative", formatNarrativeLabel(data.top_narratives[0]?.narrative || "N/A"), "current aggregated leader"),
  );

  renderExplorer(data);
}

renderCaseStudyPage();
renderAppPage();
