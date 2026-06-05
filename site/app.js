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

function buildOverviewCard(label, value) {
  const article = document.createElement("article");
  article.className = "overview-card";
  article.innerHTML = `
    <span class="overview-label">${label}</span>
    <span class="overview-value">${value}</span>
  `;
  return article;
}

function buildHeroStat(label, value) {
  const article = document.createElement("article");
  article.className = "hero-stat";
  article.innerHTML = `
    <span class="hero-stat-label">${label}</span>
    <span class="hero-stat-value">${value}</span>
  `;
  return article;
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

function buildSignalCard(signal) {
  const item = document.createElement("article");
  item.className = "signal-card";
  item.innerHTML = `
    <p class="mini-label">Signal Layer</p>
    <h3>${signal.name}</h3>
    <p>${signal.description}</p>
  `;
  return item;
}

function buildTag(label, tone = "neutral") {
  const toneClass = {
    bullish: "tag-bullish",
    bearish: "tag-bearish",
    neutral: "tag-neutral",
  }[tone] || "tag-neutral";
  return `<span class="tag ${toneClass}">${label}</span>`;
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

function buildHeroTopAsset(row) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div class="focus-symbol">${row.symbol}</div>
    <div class="focus-meta">
      <span class="tag">${formatNarrativeLabel(row.narrative)}</span>
      ${buildTag(formatNarrativeLabel(row.regime_tag), regimeTone(row.regime_tag))}
    </div>
    <p class="focus-value">
      Attention score ${formatNumber(row.attention_score, 2)} with ${formatNarrativeLabel(row.top_driver)}
      as the leading driver.
    </p>
  `;
  return wrapper;
}

function buildNarrativePulse(rows) {
  const wrapper = document.createElement("div");
  wrapper.className = "pulse-list";
  const maxScore = Math.max(...rows.map((row) => row.avg_attention_score), 1);
  rows.slice(0, 3).forEach((row) => {
    const item = document.createElement("div");
    item.className = "pulse-row";
    const width = (row.avg_attention_score / maxScore) * 100;
    item.innerHTML = `
      <div class="pulse-copy">
        <strong>${formatNarrativeLabel(row.narrative)}</strong>
        <span>${row.asset_count} assets mapped</span>
      </div>
      <div class="pulse-track">
        <span class="pulse-fill" style="width: ${width}%"></span>
      </div>
      <span class="pulse-score">${formatNumber(row.avg_attention_score, 2)}</span>
    `;
    wrapper.appendChild(item);
  });
  return wrapper;
}

function buildFeaturedInsight(topAsset, topNarrative) {
  const wrapper = document.createElement("div");
  if (!topAsset || !topNarrative) {
    wrapper.innerHTML = `
      <div class="insight-title">Snapshot not available</div>
      <p class="insight-copy">Run the export pipeline to refresh the site snapshot and insight layer.</p>
    `;
    return wrapper;
  }

  wrapper.innerHTML = `
    <div class="insight-title">
      ${topAsset.symbol} leads current asset attention while ${formatNarrativeLabel(topNarrative.narrative)}
      sets the strongest narrative pulse.
    </div>
    <p class="insight-copy">
      This is the kind of output the platform is designed to produce: a compact view of where attention is
      clustering, which layer is providing the leading explanation, and whether the broader regime looks more
      directional or mixed.
    </p>
  `;
  return wrapper;
}

function buildPipelineNode(label, title, copy) {
  const item = document.createElement("article");
  item.className = "pipeline-node";
  item.innerHTML = `
    <p class="mini-label">${label}</p>
    <strong>${title}</strong>
    <span>${copy}</span>
  `;
  return item;
}

function activateRevealAnimations() {
  const targets = document.querySelectorAll(
    ".hero, .overview-card, .story-card, .architecture-card, .signal-card, .card, .detail-card, .next-steps li",
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
    {
      threshold: 0.16,
    },
  );

  targets.forEach((item) => observer.observe(item));
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
    buildHeroStat("Assets tracked", data.overview.asset_count),
    buildHeroStat("Narratives mapped", data.overview.narrative_count),
    buildHeroStat("Bearish regimes", data.overview.bearish_count),
  );

  const overview = document.getElementById("overview");
  overview.append(
    buildOverviewCard("Assets tracked", data.overview.asset_count),
    buildOverviewCard("Narratives mapped", data.overview.narrative_count),
    buildOverviewCard("Bullish regimes", data.overview.bullish_count),
    buildOverviewCard("Mixed regimes", data.overview.mixed_count),
  );

  const topAsset = data.top_assets[0];
  const topNarrative = data.top_narratives[0];
  if (topAsset) {
    document.getElementById("hero-top-asset").appendChild(buildHeroTopAsset(topAsset));
  }

  document.getElementById("hero-top-narratives").appendChild(buildNarrativePulse(data.top_narratives));
  document.getElementById("hero-insight").appendChild(buildFeaturedInsight(topAsset, topNarrative));

  const pipelineStrip = document.getElementById("pipeline-strip");
  pipelineStrip.append(
    buildPipelineNode("Bronze", "Public source capture", "CoinGecko, Binance, and DefiLlama snapshots preserved with extraction context."),
    buildPipelineNode("Silver", "Normalized analytical tables", "Market, derivatives, and on-chain records shaped into reusable structures."),
    buildPipelineNode("Features", "Cross-surface signal layer", "Relative strength, open interest, funding, and capital-efficiency signals prepared for scoring."),
    buildPipelineNode("Gold", "Attention outputs", "Asset ranking, narrative aggregation, and interpretable drivers exported for public consumption."),
  );

  const architecture = document.getElementById("architecture");
  data.architecture.forEach((line, index) => architecture.appendChild(buildArchitectureCard(line, index)));

  const signals = document.getElementById("signals");
  data.signals.forEach((signal) => signals.appendChild(buildSignalCard(signal)));

  document.getElementById("top-assets").appendChild(buildAssetTable(data.top_assets));
  document.getElementById("top-narratives").appendChild(buildNarrativeTable(data.top_narratives));

  const nextSteps = document.getElementById("next-steps");
  data.next_steps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    nextSteps.appendChild(li);
  });

  activateRevealAnimations();
}

renderSite();
