/**
 * AgriTech Master Application Controller
 * Handles navigation tabs, language switching, calculators, modals, events, and UI lifecycle
 */

document.addEventListener('DOMContentLoaded', () => {
  // Service Worker Registration for PWA & Offline Support
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.log('SW registration note:', err);
    });
  }
  // 1. Initialize Default State
  initNavigation();
  initLanguage();
  initLocationSelector();
  initCropFilters();
  initPlantDoctor();
  initMandiFilters();
  initMarketplace();
  initSchemesAndCalculators();
  initModals();
  initVoiceAssistant();

  // 2. Fetch Initial Weather for Default Region (Nashik)
  if (window.fetchWeatherData) {
    window.fetchWeatherData('nashik');
  }

  // 3. Render Initial Datasets
  if (window.renderCropsDirectory) window.renderCropsDirectory();
  if (window.renderMandiTable) window.renderMandiTable();
  if (window.drawPriceTrendChart) setTimeout(window.drawPriceTrendChart, 300);
  if (window.renderMarketplaceListings) window.renderMarketplaceListings('farmer');
  if (window.renderGovtSchemes) window.renderGovtSchemes('all');
  if (window.renderOrganicRecipes) window.renderOrganicRecipes();

  // Resize listener for Canvas Price Chart
  window.addEventListener('resize', () => {
    if (window.drawPriceTrendChart) {
      window.drawPriceTrendChart();
    }
  });

  // Check and run initial fertilizer calculation
  runStandaloneFertCalculator();
  runSolarEstimator();
});

/* ==========================================================================
   Navigation Tabs Controller
   ========================================================================== */
function initNavigation() {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      // If switching to Mandi tab, redraw Canvas Chart
      if (targetId === 'mandi-tab' && window.drawPriceTrendChart) {
        setTimeout(window.drawPriceTrendChart, 150);
      }

      // Scroll top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Footer tab jump links
  document.querySelectorAll('[data-tab-jump]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.getAttribute('data-tab-jump');
      const btn = document.querySelector(`.nav-tab-btn[data-tab="${tabId}"]`);
      if (btn) btn.click();
    });
  });

  // Alert ticker close button
  const closeTicker = document.getElementById('close-ticker-btn');
  if (closeTicker) {
    closeTicker.addEventListener('click', () => {
      const ticker = document.getElementById('alert-ticker');
      if (ticker) ticker.style.display = 'none';
    });
  }
}

/* ==========================================================================
   Language Switcher Controller
   ========================================================================== */
function initLanguage() {
  const langToggleBtn = document.getElementById('btn-lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = window.currentLang === 'en' ? 'hi' : 'en';
      if (window.applyTranslations) {
        window.applyTranslations(nextLang);
      }

      // Re-render components with active language
      if (window.renderWeatherUI) window.renderWeatherUI();
      if (window.renderCropsDirectory) window.renderCropsDirectory();
      if (window.renderMandiTable) window.renderMandiTable();

      showToast(nextLang === 'hi' ? "भाषा हिंदी में बदली गई" : "Language switched to English", "info");
    });
  }
}

/* ==========================================================================
   Location & Region Selector
   ========================================================================== */
function initLocationSelector() {
  const regionSelect = document.getElementById('region-select');
  const refreshBtn = document.getElementById('btn-refresh-weather');

  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'custom') {
        getUserGeolocation();
      } else {
        if (window.fetchWeatherData) {
          window.fetchWeatherData(val);
          showToast(`Weather updated for ${regionSelect.options[regionSelect.selectedIndex].text}`, "success");
        }
      }
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      const currentVal = regionSelect ? regionSelect.value : 'nashik';
      if (window.fetchWeatherData) {
        window.fetchWeatherData(currentVal === 'custom' ? 'nashik' : currentVal);
        showToast("Weather refreshed successfully", "success");
      }
    });
  }
}

// Geolocation GPS API
function getUserGeolocation() {
  if (!navigator.geolocation) {
    showToast("Geolocation is not supported by your browser.", "warning");
    return;
  }

  showToast("Locating your farm via GPS...", "info");

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      
      const customCoords = {
        name: `Current Location (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`,
        lat,
        lon,
        primaryCrop: "Local Farm Crops"
      };

      if (window.fetchWeatherData) {
        window.currentWeatherState.locationName = customCoords.name;
        // Fetch weather for custom GPS
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`;
        
        fetch(url)
          .then(res => res.json())
          .then(data => {
            window.parseLiveWeather(data, customCoords);
            window.renderWeatherUI();
            showToast("GPS Live Weather loaded!", "success");
          })
          .catch(() => {
            window.fetchWeatherData('nashik');
            showToast("Loaded regional proxy weather", "info");
          });
      }
    },
    (err) => {
      console.warn(err);
      showToast("Unable to retrieve GPS location. Selected default region.", "warning");
      const regionSelect = document.getElementById('region-select');
      if (regionSelect) regionSelect.value = 'nashik';
      if (window.fetchWeatherData) window.fetchWeatherData('nashik');
    }
  );
}

/* ==========================================================================
   Crop Directory Filters & Search
   ========================================================================== */
function initCropFilters() {
  const seasonSelect = document.getElementById('crop-season-filter');
  const catSelect = document.getElementById('crop-category-filter');
  const searchInput = document.getElementById('crop-search-input');

  function applyCropFilters() {
    const season = seasonSelect ? seasonSelect.value : 'all';
    const category = catSelect ? catSelect.value : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = window.CROPS_DATABASE.filter(c => {
      const matchSeason = season === 'all' || c.season === season || c.season === 'all';
      const matchCat = category === 'all' || c.category === category;
      const matchQuery = !query || c.name.toLowerCase().includes(query) || c.hindiName.includes(query) || c.category.toLowerCase().includes(query);
      return matchSeason && matchCat && matchQuery;
    });

    if (window.renderCropsDirectory) {
      window.renderCropsDirectory(filtered);
    }
  }

  if (seasonSelect) seasonSelect.addEventListener('change', applyCropFilters);
  if (catSelect) catSelect.addEventListener('change', applyCropFilters);
  if (searchInput) searchInput.addEventListener('input', applyCropFilters);

  // Soil Matcher Trigger
  const matcherBtn = document.getElementById('btn-open-soil-matcher');
  if (matcherBtn) {
    matcherBtn.addEventListener('click', () => {
      const modal = document.getElementById('modal-soil-matcher');
      if (modal) modal.classList.remove('hidden');
    });
  }

  // Quick Fert Calc button in banner
  const quickFertBtn = document.getElementById('btn-quick-fert-calc');
  if (quickFertBtn) {
    quickFertBtn.addEventListener('click', () => {
      const tabSchemes = document.querySelector('.nav-tab-btn[data-tab="schemes-tab"]');
      if (tabSchemes) tabSchemes.click();
      const calcBox = document.querySelector('.calculator-card');
      if (calcBox) calcBox.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Organic modal trigger
  const organicBtn = document.getElementById('btn-open-organic-modal');
  if (organicBtn) {
    organicBtn.addEventListener('click', () => {
      const modal = document.getElementById('modal-organic-recipes');
      if (modal) modal.classList.remove('hidden');
    });
  }
}

/* ==========================================================================
   AI Plant Doctor Controller
   ========================================================================== */
function initPlantDoctor() {
  if (window.updateSymptomsList) window.updateSymptomsList();
  if (window.setupQuickSampleHandlers) window.setupQuickSampleHandlers();

  // Plant part radio change
  document.querySelectorAll('input[name="plant-part"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (window.updateSymptomsList) window.updateSymptomsList();
    });
  });

  // Doctor Form Submit
  const docForm = document.getElementById('plant-doctor-form');
  if (docForm) {
    docForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cropVal = document.getElementById('diag-crop-select').value;
      const partInput = document.querySelector('input[name="plant-part"]:checked');
      const partVal = partInput ? partInput.value : 'leaf';

      const checkedSymptoms = Array.from(document.querySelectorAll('input[name="symptom"]:checked')).map(cb => cb.value);

      if (window.runPlantDiagnosis) {
        window.runPlantDiagnosis(cropVal, partVal, checkedSymptoms);
        showToast("Diagnosis complete! Treatment prescription generated.", "success");
      }
    });
  }

  // Photo Dropzone and file input simulation
  const dropzone = document.getElementById('upload-dropzone');
  const fileInput = document.getElementById('leaf-image-file');
  const previewBox = document.getElementById('image-preview-box');
  const previewImg = document.getElementById('leaf-preview-img');
  const removeImgBtn = document.getElementById('btn-remove-img');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target !== removeImgBtn && !removeImgBtn?.contains(e.target)) {
        fileInput.click();
      }
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (re) => {
          if (previewImg) previewImg.src = re.target.result;
          if (previewBox) previewBox.classList.remove('hidden');
          showToast("Photo uploaded. Ready for AI inspection.", "info");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (removeImgBtn) {
    removeImgBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (fileInput) fileInput.value = '';
      if (previewBox) previewBox.classList.add('hidden');
      if (previewImg) previewImg.src = '';
    });
  }
}

/* ==========================================================================
   Mandi Intelligence Filters
   ========================================================================== */
function initMandiFilters() {
  const stateFilter = document.getElementById('mandi-state-filter');
  const commodityFilter = document.getElementById('mandi-commodity-filter');
  const searchInput = document.getElementById('mandi-search-input');

  function applyMandiFilters() {
    const state = stateFilter ? stateFilter.value : 'all';
    const commodity = commodityFilter ? commodityFilter.value : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = window.MANDI_RATES_DATABASE.filter(m => {
      const matchState = state === 'all' || m.state === state;
      const matchCommodity = commodity === 'all' || m.commodity === commodity;
      const matchQuery = !query || m.mandi.toLowerCase().includes(query) || m.commodity.toLowerCase().includes(query) || m.state.toLowerCase().includes(query);
      return matchState && matchCommodity && matchQuery;
    });

    if (window.renderMandiTable) {
      window.renderMandiTable(filtered);
    }
  }

  if (stateFilter) stateFilter.addEventListener('change', applyMandiFilters);
  if (commodityFilter) {
    commodityFilter.addEventListener('change', (e) => {
      applyMandiFilters();
      if (e.target.value !== 'all' && window.selectCropForTrendChart) {
        window.selectCropForTrendChart(e.target.value, "Lasalgaon");
      }
    });
  }
  if (searchInput) searchInput.addEventListener('input', applyMandiFilters);

  // Profit Calculator Modal trigger
  const profitBtn = document.getElementById('btn-open-profit-calc');
  if (profitBtn) {
    profitBtn.addEventListener('click', () => {
      const modal = document.getElementById('modal-profit-calc');
      if (modal) modal.classList.remove('hidden');
    });
  }
}

/* ==========================================================================
   Marketplace Listings & Produce Post Modal
   ========================================================================== */
function initMarketplace() {
  const pillFarmer = document.getElementById('pill-farmer-listings');
  const pillBuyer = document.getElementById('pill-buyer-demands');

  if (pillFarmer && pillBuyer) {
    pillFarmer.addEventListener('click', () => {
      pillFarmer.classList.add('active');
      pillBuyer.classList.remove('active');
      if (window.renderMarketplaceListings) window.renderMarketplaceListings('farmer');
    });

    pillBuyer.addEventListener('click', () => {
      pillBuyer.classList.add('active');
      pillFarmer.classList.remove('active');
      if (window.renderMarketplaceListings) window.renderMarketplaceListings('buyer');
    });
  }

  // Open sell produce modal
  const openSellBtn = document.getElementById('btn-open-sell-modal');
  if (openSellBtn) {
    openSellBtn.addEventListener('click', () => {
      const modal = document.getElementById('modal-post-produce');
      if (modal) modal.classList.remove('hidden');
    });
  }

  // Form Submit for Posting Produce
  const sellForm = document.getElementById('form-sell-produce');
  if (sellForm) {
    sellForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const cropName = document.getElementById('sell-crop-name').value;
      const category = document.getElementById('sell-crop-category').value;
      const quantity = document.getElementById('sell-quantity').value;
      const unit = document.getElementById('sell-quantity-unit').value;
      const price = document.getElementById('sell-price-ask').value;
      const farmerName = document.getElementById('sell-farmer-name').value;
      const phone = document.getElementById('sell-farmer-phone').value;
      const village = document.getElementById('sell-farmer-village').value;
      const harvestDate = document.getElementById('sell-harvest-date').value;
      const isOrganic = document.getElementById('sell-is-organic').checked;

      if (window.addNewFarmerListing) {
        window.addNewFarmerListing({
          cropName,
          category,
          quantity,
          unit,
          price,
          farmerName,
          phone,
          village,
          harvestDate,
          isOrganic
        });
      }

      const modal = document.getElementById('modal-post-produce');
      if (modal) modal.classList.add('hidden');
      sellForm.reset();
      showToast("Listing published! Buyers can now contact you on WhatsApp/Phone.", "success");
    });
  }
}

/* ==========================================================================
   Schemes & Farmer Practical Calculators
   ========================================================================== */
function initSchemesAndCalculators() {
  // Category buttons for schemes
  document.querySelectorAll('.scheme-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.scheme-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');
      if (window.renderGovtSchemes) window.renderGovtSchemes(cat);
    });
  });

  // Standalone fertilizer calculate button
  const fertBtn = document.getElementById('btn-calculate-fert-dose');
  if (fertBtn) {
    fertBtn.addEventListener('click', runStandaloneFertCalculator);
  }

  // Solar subsidy calculate button
  const solarBtn = document.getElementById('btn-estimate-solar');
  if (solarBtn) {
    solarBtn.addEventListener('click', runSolarEstimator);
  }

  // Soil Matcher Form submit
  const soilForm = document.getElementById('form-soil-matcher');
  if (soilForm) {
    soilForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const soil = document.getElementById('match-soil-type').value;
      const water = document.getElementById('match-water-source').value;
      const season = document.getElementById('match-season').value;
      const investment = document.getElementById('match-investment').value;

      const results = window.matchSoilToCrops(soil, water, season, investment);
      const resultsBox = document.getElementById('soil-match-results');

      if (resultsBox) {
        resultsBox.classList.remove('hidden');
        resultsBox.innerHTML = `
          <h4 style="margin-top:16px; margin-bottom:10px; color:var(--primary-900); font-size:1.05rem;">
            <i class="fa-solid fa-ranking-star text-amber"></i> Recommended High-Yield Crops for Your Field:
          </h4>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${results.map((res, i) => `
              <div style="display:flex; justify-content:space-between; align-items:center; background-color:var(--primary-50); border:1px solid var(--primary-200); padding:10px 14px; border-radius:var(--radius-md);">
                <div>
                  <strong style="color:var(--slate-900);">${i + 1}. ${res.crop.name} (${res.crop.hindiName})</strong>
                  <div style="font-size:0.775rem; color:var(--slate-600);">${res.crop.category.toUpperCase()} • Avg Yield: ${res.crop.avgYield}</div>
                </div>
                <span class="badge badge-success">${res.score}% Suitability</span>
              </div>
            `).join('')}
          </div>
        `;
      }
    });
  }

  // Mandi Profit Calc Form submit
  const profitForm = document.getElementById('form-mandi-profit-calc');
  if (profitForm) {
    profitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const vol = document.getElementById('calc-crop-vol').value;
      const localP = document.getElementById('calc-local-price').value;
      const distP = document.getElementById('calc-dist-mandi-price').value;
      const distKm = document.getElementById('calc-dist-km').value;
      const freight = document.getElementById('calc-truck-freight').value;
      const hamali = document.getElementById('calc-loading-cost').value;

      const res = window.calculateMandiNetProfit(vol, localP, distP, distKm, freight, hamali);
      const compBox = document.getElementById('mandi-profit-comparison-box');

      if (compBox) {
        compBox.innerHTML = `
          <div style="margin-top:18px; padding:16px; background-color:${res.isDistantBetter ? 'var(--primary-50)' : 'var(--amber-50)'}; border:1px solid ${res.isDistantBetter ? 'var(--primary-300)' : 'var(--amber-300)'}; border-radius:var(--radius-md);">
            <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:8px;">
              <span>Local Mandi Net Profit:</span>
              <span style="color:var(--slate-800);">₹${res.localNetProfit.toLocaleString('en-IN')}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:8px;">
              <span>Major Mandi Net Profit (After Transport ₹${res.distTransport}):</span>
              <span style="color:var(--primary-800);">₹${res.distNetProfit.toLocaleString('en-IN')}</span>
            </div>
            <div style="margin-top:10px; padding-top:10px; border-top:1px solid rgba(0,0,0,0.1); font-size:0.95rem; font-weight:800; color:${res.isDistantBetter ? 'var(--primary-800)' : 'var(--amber-800)'};">
              <i class="fa-solid ${res.isDistantBetter ? 'fa-circle-check text-green' : 'fa-triangle-exclamation text-amber'}"></i>
              ${res.isDistantBetter
                ? `Recommended: Transport to Major Mandi for +₹${res.diffInHand.toLocaleString('en-IN')} extra in-hand profit!`
                : `Recommended: Sell at Local APMC! Long distance freight cost (₹${res.distTransport}) exceeds price advantage.`}
            </div>
          </div>
        `;
      }
    });
  }
}

function runStandaloneFertCalculator() {
  const cropSelect = document.getElementById('calc-crop-select');
  const areaInput = document.getElementById('calc-area-input');
  const unitSelect = document.getElementById('calc-unit-select');
  const resultsBox = document.getElementById('fert-calc-results');

  if (!cropSelect || !areaInput || !resultsBox) return;

  const res = window.calculateFertilizerBags(cropSelect.value, areaInput.value, unitSelect.value);

  resultsBox.innerHTML = `
    <div style="font-weight:700; font-size:0.9rem; color:var(--primary-900); margin-bottom:8px;">
      <i class="fa-solid fa-bag-shopping"></i> Required Fertilizer for ${res.acreage} Acres:
    </div>
    <div class="dose-result-row">
      <span><strong>Urea (45 kg Bag):</strong></span>
      <span style="font-weight:800; color:var(--slate-900);">${res.ureaBags} Bags</span>
    </div>
    <div class="dose-result-row">
      <span><strong>DAP (50 kg Bag):</strong></span>
      <span style="font-weight:800; color:var(--slate-900);">${res.dapBags} Bags</span>
    </div>
    <div class="dose-result-row">
      <span><strong>MOP / Potash (50 kg Bag):</strong></span>
      <span style="font-weight:800; color:var(--slate-900);">${res.mopBags} Bags</span>
    </div>
    <div class="dose-result-row">
      <span><strong>Zinc Sulphate 33%:</strong></span>
      <span style="font-weight:800; color:var(--slate-900);">${res.zincKg} kg</span>
    </div>
    <p style="font-size:0.75rem; color:var(--slate-600); margin-top:8px;">
      *Apply 100% DAP & MOP as basal dose during final plowing; split Urea in 2-3 top dressings.
    </p>
  `;
}

function runSolarEstimator() {
  const hpSelect = document.getElementById('pump-hp-select');
  const catSelect = document.getElementById('farmer-category-select');
  const resultsBox = document.getElementById('solar-calc-results');

  if (!hpSelect || !catSelect || !resultsBox) return;

  const res = window.estimateSolarPumpSubsidy(hpSelect.value, catSelect.value);

  resultsBox.innerHTML = `
    <div style="font-weight:700; font-size:0.9rem; color:var(--primary-900); margin-bottom:8px;">
      <i class="fa-solid fa-solar-panel"></i> PM-KUSUM Subsidy Breakdown (${res.hp} HP Pump):
    </div>
    <div class="dose-result-row">
      <span>Total Benchmark System Cost:</span>
      <span>₹${res.totalCost.toLocaleString('en-IN')}</span>
    </div>
    <div class="dose-result-row" style="color:var(--primary-800);">
      <span>Govt Subsidy (${res.subsidyPct}% Total):</span>
      <strong>- ₹${res.totalSubsidy.toLocaleString('en-IN')}</strong>
    </div>
    <div class="dose-result-row">
      <span>Central Subsidy (MNRE):</span>
      <span>₹${res.centralSubsidy.toLocaleString('en-IN')}</span>
    </div>
    <div class="dose-result-row">
      <span>State Govt Contribution:</span>
      <span>₹${res.stateSubsidy.toLocaleString('en-IN')}</span>
    </div>
    <div class="dose-result-row" style="font-size:0.95rem; font-weight:800; color:var(--slate-900); border-top:1px solid var(--primary-300); padding-top:6px;">
      <span>Net Farmer Upfront Share:</span>
      <span style="color:var(--primary-800);">₹${res.upfrontDeposit.toLocaleString('en-IN')}</span>
    </div>
  `;
}

/* ==========================================================================
   Modals & Backdrop Listener
   ========================================================================== */
function initModals() {
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('hidden');
    });
  });

  // Close when clicking dark backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
      }
    });
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.add('hidden'));
    }
  });
}

/* ==========================================================================
   Voice Assistant Read Aloud
   ========================================================================== */
function initVoiceAssistant() {
  const voiceBtn = document.getElementById('btn-voice-assist');
  const readWeatherBtn = document.getElementById('btn-read-weather-advisory');

  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      if (window.readWeatherAdvisoryAloud) {
        window.readWeatherAdvisoryAloud();
      }
    });
  }

  if (readWeatherBtn) {
    readWeatherBtn.addEventListener('click', () => {
      if (window.readWeatherAdvisoryAloud) {
        window.readWeatherAdvisoryAloud();
      }
    });
  }
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'warning') icon = 'fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 250ms ease';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

window.showToast = showToast;