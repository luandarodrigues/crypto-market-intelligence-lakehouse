function formatNarrativeLabel(value) {
  return value.replaceAll("_", " ");
}

function formatNumber(value, digits) {
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
      Attention ${formatNumber(row.attention_score, 2)} · Confirmation ${formatNumber(row.confirmation_score, 2)} ·
      Driver ${formatNarrativeLabel(row.top_driver)}
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
    </div>
    <div class="detail-copy">
      <p>
        ${row.symbol} currently sits inside the <strong>${formatNarrativeLabel(row.narrative)}</strong> narrative bucket,
        with a <strong>${formatNarrativeLabel(row.regime_tag)}</strong> regime tag.
      </p>
      <p>${signalSummary}</p>
      <p>
        This explorer is the first product-style surface built directly on top of the same exported gold layer used by
        the portfolio page, and acts as a prototype for a deeper platform experience.
      </p>
    </div>
  `;
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
    rows: data.top_assets.slice(),
    filteredRows: data.top_assets.slice(),
    selectedSymbol: data.top_assets[0]?.symbol || null,
  };

  const narrativeFilter = document.getElementById("narrative-filter");
  const regimeFilter = document.getElementById("regime-filter");
  const assetList = document.getElementById("asset-list");
  const assetDetail = document.getElementById("asset-detail");

  const narratives = ["all", ...new Set(data.top_assets.map((row) => row.narrative))];
  narratives.forEach((narrative) => {
    const option = document.createElement("option");
    option.value = narrative;
    option.textContent = narrative === "all" ? "All narratives" : formatNarrativeLabel(narrative);
    narrativeFilter.appendChild(option);
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

  function renderDetail() {
    assetDetail.innerHTML = "";
    const selected = state.filteredRows.find((row) => row.symbol === state.selectedSymbol);
    assetDetail.appendChild(buildAssetDetail(selected));
  }

  function applyFilters() {
    state.filteredRows = state.rows.filter((row) => {
      const narrativePass = narrativeFilter.value === "all" || row.narrative === narrativeFilter.value;
      const regimePass = regimeFilter.value === "all" || row.regime_tag === regimeFilter.value;
      return narrativePass && regimePass;
    });
    syncSelection();
    renderList();
    renderDetail();
  }

  narrativeFilter.addEventListener("change", applyFilters);
  regimeFilter.addEventListener("change", applyFilters);

  applyFilters();
}

function renderSite() {
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
    ["Databricks framing", "The repository is intentionally structured like a medallion pipeline so that Databricks bundles, jobs, and Delta-backed tables become a natural next step rather than a redesign.", "health"],
    ["Ingestion layer", "Public source ingestion is separated from normalization, making the project look more like a platform than a notebook workflow.", "ops"],
    ["Feature layer", "Signals such as relative strength, open interest, funding, and capital efficiency are modeled as reusable analytical components.", "models"],
    ["Consumption layer", "The static case-study microsite and the embedded asset explorer both consume the same exported gold-layer snapshot, which is a strong product pattern for portfolio storytelling.", "health"],
  ].forEach((item) => {
    buildDetails.appendChild(buildBuildDetail(item[0], item[1], item[2]));
  });

  const signals = document.getElementById("signals");
  const tones = ["health", "models", "ops", "health"];
  data.signals.forEach((signal, index) => signals.appendChild(buildSignalCard(signal, tones[index % tones.length])));

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

renderSite();
