/**
 * AgriTech Mandi Intelligence & Price Trends Engine
 * APMC Mandi rates, MSP benchmarks, Canvas trend chart, and Transport profit calculator
 */

const MSP_DATA = {
  "Wheat": 2275,
  "Paddy (Basmati)": 2320,
  "Cotton": 7121,
  "Soybean": 4892,
  "Mustard": 5650,
  "Gram (Chana)": 5440,
  "Maize": 2225,
  "Onion": 1400, // Market benchmark
  "Tomato": 1200,
  "Potato": 1100,
  "Chili (Red)": 14500,
  "Orange (Santra)": 3500
};

const MANDI_RATES_DATABASE = [
  { commodity: "Orange (Santra)", mandi: "Nagpur (Kalamna)", state: "Maharashtra", min: 3800, max: 6200, modal: 5100, arrivals: 16800, trend: "+240", change: "up" },
  { commodity: "Soybean", mandi: "Nagpur", state: "Maharashtra", min: 4700, max: 5250, modal: 5080, arrivals: 14500, trend: "+160", change: "up" },
  { commodity: "Cotton", mandi: "Nagpur (Katol)", state: "Maharashtra", min: 7050, max: 7780, modal: 7540, arrivals: 11200, trend: "+110", change: "up" },
  { commodity: "Onion", mandi: "Lasalgaon", state: "Maharashtra", min: 1850, max: 2850, modal: 2450, arrivals: 14200, trend: "+120", change: "up" },
  { commodity: "Onion", mandi: "Pimpalgaon", state: "Maharashtra", min: 1800, max: 2800, modal: 2400, arrivals: 9800, trend: "+80", change: "up" },
  { commodity: "Onion", mandi: "Azadpur", state: "Delhi", min: 2200, max: 3100, modal: 2750, arrivals: 18500, trend: "+150", change: "up" },
  { commodity: "Onion", mandi: "Indore", state: "Madhya Pradesh", min: 1600, max: 2500, modal: 2200, arrivals: 7600, trend: "-40", change: "down" },
  { commodity: "Onion", mandi: "Bangalore", state: "Karnataka", min: 2100, max: 3000, modal: 2600, arrivals: 8200, trend: "+60", change: "up" },

  { commodity: "Wheat", mandi: "Khanna", state: "Punjab", min: 2380, max: 2520, modal: 2460, arrivals: 22000, trend: "+30", change: "up" },
  { commodity: "Wheat", mandi: "Karnal", state: "Haryana", min: 2350, max: 2500, modal: 2440, arrivals: 19000, trend: "+25", change: "up" },
  { commodity: "Wheat", mandi: "Indore", state: "Madhya Pradesh", min: 2400, max: 2900, modal: 2680, arrivals: 16500, trend: "+50", change: "up" },
  { commodity: "Wheat", mandi: "Kota", state: "Rajasthan", min: 2320, max: 2580, modal: 2480, arrivals: 11200, trend: "+15", change: "up" },
  { commodity: "Wheat", mandi: "Varanasi", state: "Uttar Pradesh", min: 2280, max: 2450, modal: 2390, arrivals: 8900, trend: "+10", change: "up" },

  { commodity: "Soybean", mandi: "Indore", state: "Madhya Pradesh", min: 4600, max: 5150, modal: 4980, arrivals: 24000, trend: "+180", change: "up" },
  { commodity: "Soybean", mandi: "Ujjain", state: "Madhya Pradesh", min: 4550, max: 5100, modal: 4920, arrivals: 15600, trend: "+140", change: "up" },
  { commodity: "Soybean", mandi: "Akola", state: "Maharashtra", min: 4650, max: 5200, modal: 5040, arrivals: 18200, trend: "+190", change: "up" },
  { commodity: "Soybean", mandi: "Kota", state: "Rajasthan", min: 4500, max: 5050, modal: 4890, arrivals: 9400, trend: "+110", change: "up" },

  { commodity: "Cotton", mandi: "Rajkot", state: "Gujarat", min: 6900, max: 7650, modal: 7420, arrivals: 12500, trend: "+90", change: "up" },
  { commodity: "Cotton", mandi: "Guntur", state: "Andhra Pradesh", min: 7000, max: 7750, modal: 7510, arrivals: 14800, trend: "+120", change: "up" },
  { commodity: "Cotton", mandi: "Adilabad", state: "Telangana", min: 6850, max: 7480, modal: 7290, arrivals: 8900, trend: "+60", change: "up" },
  { commodity: "Cotton", mandi: "Abohar", state: "Punjab", min: 7100, max: 7800, modal: 7580, arrivals: 6700, trend: "+110", change: "up" },

  { commodity: "Mustard", mandi: "Jaipur", state: "Rajasthan", min: 5400, max: 6050, modal: 5880, arrivals: 16000, trend: "+70", change: "up" },
  { commodity: "Mustard", mandi: "Alwar", state: "Rajasthan", min: 5450, max: 6100, modal: 5920, arrivals: 13500, trend: "+85", change: "up" },
  { commodity: "Mustard", mandi: "Agra", state: "Uttar Pradesh", min: 5350, max: 5980, modal: 5810, arrivals: 10400, trend: "+40", change: "up" },
  { commodity: "Mustard", mandi: "Hisar", state: "Haryana", min: 5380, max: 6000, modal: 5840, arrivals: 8200, trend: "+55", change: "up" },

  { commodity: "Tomato", mandi: "Kolar", state: "Karnataka", min: 900, max: 1650, modal: 1350, arrivals: 11000, trend: "-50", change: "down" },
  { commodity: "Tomato", mandi: "Nashik", state: "Maharashtra", min: 1000, max: 1800, modal: 1480, arrivals: 9200, trend: "+40", change: "up" },
  { commodity: "Tomato", mandi: "Madanapalle", state: "Andhra Pradesh", min: 950, max: 1700, modal: 1400, arrivals: 14500, trend: "-30", change: "down" },

  { commodity: "Potato", mandi: "Agra", state: "Uttar Pradesh", min: 1100, max: 1550, modal: 1380, arrivals: 32000, trend: "+20", change: "up" },
  { commodity: "Potato", mandi: "Farrukhabad", state: "Uttar Pradesh", min: 1050, max: 1480, modal: 1320, arrivals: 21000, trend: "+15", change: "up" },
  { commodity: "Potato", mandi: "Jalandhar", state: "Punjab", min: 1150, max: 1600, modal: 1420, arrivals: 14000, trend: "+30", change: "up" },

  { commodity: "Chili (Red)", mandi: "Guntur", state: "Andhra Pradesh", min: 14000, max: 21500, modal: 18200, arrivals: 8500, trend: "+450", change: "up" },
  { commodity: "Chili (Red)", mandi: "Khammam", state: "Telangana", min: 13800, max: 20800, modal: 17600, arrivals: 6200, trend: "+380", change: "up" },

  { commodity: "Gram (Chana)", mandi: "Indore", state: "Madhya Pradesh", min: 5400, max: 6100, modal: 5850, arrivals: 11000, trend: "+90", change: "up" },
  { commodity: "Gram (Chana)", mandi: "Bikaner", state: "Rajasthan", min: 5350, max: 5980, modal: 5780, arrivals: 7800, trend: "+60", change: "up" },

  { commodity: "Maize", mandi: "Gulabbagh", state: "Bihar", min: 2150, max: 2480, modal: 2360, arrivals: 19000, trend: "+40", change: "up" },
  { commodity: "Maize", mandi: "Davangere", state: "Karnataka", min: 2100, max: 2420, modal: 2310, arrivals: 12000, trend: "+35", change: "up" }
];

// Current selected commodity for price chart
let activeChartCommodity = "Onion";
let activeChartMandi = "Lasalgaon";

// Render Mandi Rates Table
function renderMandiTable(filteredList = null) {
  const tbody = document.getElementById('mandi-table-body');
  if (!tbody) return;

  const list = filteredList || MANDI_RATES_DATABASE;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align:center; padding:32px; color:var(--slate-500);">
          <i class="fa-solid fa-store-slash" style="font-size:2rem; margin-bottom:8px; display:block;"></i>
          No mandi prices found for the selected state/commodity filters.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(item => {
    const msp = MSP_DATA[item.commodity] || 0;
    const diff = item.modal - msp;
    const diffPct = msp > 0 ? ((diff / msp) * 100).toFixed(1) : 0;
    const aboveMsp = diff >= 0;

    return `
      <tr>
        <td><strong>${item.commodity}</strong></td>
        <td><i class="fa-solid fa-location-pin text-primary"></i> ${item.mandi}</td>
        <td>${item.state}</td>
        <td>₹${item.min.toLocaleString('en-IN')}</td>
        <td>₹${item.max.toLocaleString('en-IN')}</td>
        <td><span class="price-modal-val">₹${item.modal.toLocaleString('en-IN')}</span></td>
        <td>
          <span class="badge ${aboveMsp ? 'badge-success' : 'badge-danger'}">
            ${aboveMsp ? '+' : ''}${diffPct}% ${aboveMsp ? 'Above MSP' : 'Below MSP'}
          </span>
        </td>
        <td>
          <span class="${item.change === 'up' ? 'trend-up' : 'trend-down'}">
            <i class="fa-solid ${item.change === 'up' ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}"></i>
            ${item.trend}
          </span>
        </td>
        <td>
          <button class="btn-secondary btn-sm" onclick="selectCropForTrendChart('${item.commodity}', '${item.mandi}')">
            <i class="fa-solid fa-chart-line"></i> View Trend
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Select Crop for Canvas Trend Chart
function selectCropForTrendChart(commodity, mandi) {
  activeChartCommodity = commodity;
  activeChartMandi = mandi;

  const cropNameEl = document.getElementById('chart-crop-name');
  const mandiNameEl = document.getElementById('chart-mandi-name');
  if (cropNameEl) cropNameEl.textContent = commodity;
  if (mandiNameEl) mandiNameEl.textContent = `${mandi} Mandi`;

  drawPriceTrendChart();

  // Scroll to chart smoothly
  const chartCard = document.querySelector('.price-trend-card');
  if (chartCard) {
    chartCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Draw HTML5 Canvas Price Trend Curve
function drawPriceTrendChart() {
  const canvas = document.getElementById('mandiPriceChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = 240 * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = 240;
  const padding = { top: 30, right: 30, bottom: 40, left: 60 };

  // Generate 15 days historical price sequence for active commodity
  const item = MANDI_RATES_DATABASE.find(m => m.commodity === activeChartCommodity && m.mandi === activeChartMandi) || MANDI_RATES_DATABASE[0];
  const basePrice = item.modal;

  const pricePoints = [];
  const labels = [];
  const today = new Date();

  for (let i = 14; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    labels.push(`${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`);

    // Natural fluctuation curve
    const wave = Math.sin(i * 0.6) * (basePrice * 0.06);
    const trendOffset = (14 - i) * (basePrice * 0.004);
    const p = Math.round(basePrice - wave + trendOffset);
    pricePoints.push(p);
  }

  const minP = Math.min(...pricePoints) * 0.95;
  const maxP = Math.max(...pricePoints) * 1.05;

  ctx.clearRect(0, 0, width, height);

  // Draw Horizontal Grid Lines & Y-axis labels
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b';
  ctx.font = '11px Inter, sans-serif';

  const gridSteps = 4;
  for (let i = 0; i <= gridSteps; i++) {
    const y = padding.top + (i / gridSteps) * (height - padding.top - padding.bottom);
    const priceVal = Math.round(maxP - (i / gridSteps) * (maxP - minP));

    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    ctx.fillText(`₹${priceVal}`, 8, y + 4);
  }

  // Calculate Coordinate points
  const points = pricePoints.map((price, idx) => {
    const x = padding.left + (idx / (pricePoints.length - 1)) * (width - padding.left - padding.right);
    const y = padding.top + (1 - (price - minP) / (maxP - minP)) * (height - padding.top - padding.bottom);
    return { x, y, price };
  });

  // Gradient Fill below line
  const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  gradient.addColorStop(0, 'rgba(22, 163, 74, 0.25)');
  gradient.addColorStop(1, 'rgba(22, 163, 74, 0.0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, height - padding.bottom);
  ctx.lineTo(points[0].x, points[0].y);

  for (let i = 0; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Draw Smooth Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 0; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.strokeStyle = '#15803d';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw Data Points & X-axis Dates
  points.forEach((pt, idx) => {
    // Circle point
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Date labels on X-axis (every 3 days)
    if (idx % 3 === 0 || idx === points.length - 1) {
      ctx.fillStyle = '#64748b';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[idx], pt.x, height - 12);
    }
  });

  // Last Price Tag
  const lastPoint = points[points.length - 1];
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 12px Inter, sans-serif';
  ctx.fillText(`₹${lastPoint.price}/Q`, lastPoint.x - 20, lastPoint.y - 12);
}

// Mandi Transport Net Profit Calculator
function calculateMandiNetProfit(volume, localRate, distRate, distanceKm, freightPerKm, hamaliPerQ) {
  const vol = parseFloat(volume);
  const localPrice = parseFloat(localRate);
  const distPrice = parseFloat(distRate);
  const distKm = parseFloat(distanceKm);
  const freight = parseFloat(freightPerKm);
  const hamali = parseFloat(hamaliPerQ);

  // Local Mandi Revenue & Costs (Minimal 5km transport + hamali)
  const localGross = vol * localPrice;
  const localHamali = vol * hamali;
  const localTransport = 150; // local tractor trolly flat
  const localCess = localGross * 0.01; // 1% mandi fee
  const localNetProfit = localGross - (localHamali + localTransport + localCess);

  // Distant Major Mandi Revenue & Costs
  const distGross = vol * distPrice;
  const distHamali = vol * hamali;
  const distTransport = distKm * freight; // truck transport
  const distCess = distGross * 0.015; // 1.5% APMC cess
  const distNetProfit = distGross - (distHamali + distTransport + distCess);

  const diffInHand = distNetProfit - localNetProfit;
  const isDistantBetter = diffInHand > 0;

  return {
    vol,
    localGross: Math.round(localGross),
    localNetProfit: Math.round(localNetProfit),
    distGross: Math.round(distGross),
    distTransport: Math.round(distTransport),
    distNetProfit: Math.round(distNetProfit),
    diffInHand: Math.round(Math.abs(diffInHand)),
    isDistantBetter
  };
}

// Export functions to window
window.MANDI_RATES_DATABASE = MANDI_RATES_DATABASE;
window.MSP_DATA = MSP_DATA;
window.renderMandiTable = renderMandiTable;
window.selectCropForTrendChart = selectCropForTrendChart;
window.drawPriceTrendChart = drawPriceTrendChart;
window.calculateMandiNetProfit = calculateMandiNetProfit;