/**
 * AgriTech Crop Advisory & Agronomy Knowledge Engine
 * 22+ Crop guides, Fertilizer bag calculator, and Soil matcher
 */

const CROPS_DATABASE = [
  {
    id: "wheat",
    name: "Wheat",
    hindiName: "गेहूं",
    category: "cereal",
    season: "rabi",
    icon: "fa-wheat-awn",
    duration: "110-135 Days",
    seedRate: "40-45 kg / Acre",
    soilType: "Well-drained Alluvial Loam or Clay Loam",
    phRange: "6.0 - 7.5",
    npkRatio: "120:60:40 kg/Ha (50:25:15 kg/Acre)",
    avgYield: "18-24 Quintals / Acre",
    description: "Staple rabi cereal crop. Requires cool winter climate during vegetative growth and warm dry weather during maturity.",
    descriptionHi: "प्रमुख रबी खाद्यान्न फसल। वानस्पतिक वृद्धि के लिए ठंडा मौसम और पकने के समय शुष्क व धूप वाला मौसम आवश्यक है।",
    stages: [
      { name: "CRI (Crown Root Initiation)", days: "20-25 DAS", watering: "Critical First Irrigation", nutrient: "1/3 Nitrogen (Urea) Top-Dressing" },
      { name: "Tillering Stage", days: "40-45 DAS", watering: "Second Irrigation", nutrient: "Zinc Sulphate 33% (5kg/acre)" },
      { name: "Jointing & Booting", days: "65-75 DAS", watering: "Third Irrigation", nutrient: "Foliar 0:52:34 NPK spray" },
      { name: "Flowering & Grain Filling", days: "85-100 DAS", watering: "Fourth Irrigation (Light)", nutrient: "Foliar 13:0:45 (Potassium Nitrate)" },
      { name: "Maturity & Harvest", days: "115-130 DAS", watering: "Stop irrigation 15 days before harvest", nutrient: "Harvest when grain moisture < 12%" }
    ],
    commonPests: ["Yellow Rust (पीला रतुआ)", "Aphids (माहो)", "Termites (दीमक)", "Loose Smut (कंडुआ)"]
  },
  {
    id: "rice",
    name: "Paddy / Rice",
    hindiName: "धान",
    category: "cereal",
    season: "kharif",
    icon: "fa-seedling",
    duration: "120-145 Days",
    seedRate: "8-10 kg / Acre (Transplanted)",
    soilType: "Clayey loam, heavy alluvial soil with water retention",
    phRange: "5.5 - 7.0",
    npkRatio: "100:50:50 kg/Ha (40:20:20 kg/Acre)",
    avgYield: "22-30 Quintals / Acre",
    description: "Primary monsoon cereal. Requires continuous moist or shallow standing water conditions during active tillering.",
    descriptionHi: "प्रमुख मानसूनी खाद्यान्न फसल। कल्ले फूटने के समय खेत में नमी या 2-3 सेमी खड़ा पानी अत्यंत लाभदायक होता है।",
    stages: [
      { name: "Nursery & Transplanting", days: "21-25 Days Seedling", watering: "Puddle field with 3-5cm water", nutrient: "Basal DAP + Zinc Sulphate" },
      { name: "Active Tillering", days: "30-45 DAT", watering: "Maintain 2-3 cm standing water", nutrient: "First Urea split (30 kg/acre)" },
      { name: "Panicle Initiation", days: "60-70 DAT", watering: "Critical watering stage", nutrient: "Second Urea split + MOP" },
      { name: "Milking & Grain Filling", days: "85-105 DAT", watering: "Intermittent saturation", nutrient: "Foliar Boron 20% (1g/L)" },
      { name: "Ripening & Harvest", days: "120-135 DAT", watering: "Drain water 10 days before harvesting", nutrient: "Harvest when 85% grains turn golden" }
    ],
    commonPests: ["Stem Borer (तना छेदक)", "Brown Plant Hopper (BPH)", "Leaf Blast (झुलसा)", "Bacterial Leaf Blight"]
  },
  {
    id: "cotton",
    name: "Cotton (Kapas)",
    hindiName: "कपास",
    category: "cash",
    season: "kharif",
    icon: "fa-cloud",
    duration: "150-180 Days",
    seedRate: "1.5-2.0 kg / Acre (Bt Hybrid)",
    soilType: "Deep Black Cotton Soil (Regur) or Deep Loam",
    phRange: "6.5 - 8.2",
    npkRatio: "150:60:60 kg/Ha (60:25:25 kg/Acre)",
    avgYield: "8-14 Quintals / Acre",
    description: "High-value commercial fiber crop. Requires warm climate, moderate rainfall, and well-aerated deep black soil.",
    descriptionHi: "प्रमुख नकदी रेशा फसल। काली मिट्टी और अच्छी जलनिकासी वाली भूमि में भरपूर उत्पादन देती है।",
    stages: [
      { name: "Germination & Square Formation", days: "30-45 DAS", watering: "Avoid excess water", nutrient: "Basal NPK + Neem cake" },
      { name: "Flowering & Boll Initiation", days: "60-80 DAS", watering: "Drip irrigation every 3-4 days", nutrient: "Foliar 13:0:45 + Micronutrients" },
      { name: "Peak Boll Development", days: "90-120 DAS", watering: "Maintain uniform soil moisture", nutrient: "Magnesium Sulphate spray" },
      { name: "Boll Bursting & Picking", days: "135-175 DAS", watering: "Reduce irrigation", nutrient: "Gradual picking in dry sunshine" }
    ],
    commonPests: ["Pink Bollworm (गुलाबी सुंडी)", "Whitefly (सफेद मक्खी)", "Thrips", "Cotton Leaf Curl Virus"]
  },
  {
    id: "soybean",
    name: "Soybean",
    hindiName: "सोयाबीन",
    category: "oilseed",
    season: "kharif",
    icon: "fa-cubes-stacked",
    duration: "90-105 Days",
    seedRate: "25-30 kg / Acre",
    soilType: "Fertile well-drained loamy to black soil",
    phRange: "6.0 - 7.5",
    npkRatio: "30:60:40 kg/Ha (12:25:16 kg/Acre)",
    avgYield: "8-12 Quintals / Acre",
    description: "Short-duration protein & oil powerhouse. Fixes atmospheric nitrogen via root nodules.",
    descriptionHi: "कम अवधि की दलहनी-तिलहनी फसल। जड़ों में राइजोबियम ग्रंथियों द्वारा वायुमंडलीय नाइट्रोजन का स्थिरीकरण करती है।",
    stages: [
      { name: "Sowing & Seed Treatment", days: "0-5 DAS", watering: "Sow at optimum soil moisture", nutrient: "Rhizobium + PSB Culture" },
      { name: "Vegetative Growth", days: "25-35 DAS", watering: "Hoeing & weed management", nutrient: "Sulphur (10 kg/acre)" },
      { name: "Flowering & Pod Formation", days: "45-65 DAS", watering: "Critical stage: irrigate if dry", nutrient: "Foliar 0:52:34 spray" },
      { name: "Pod Filling & Harvest", days: "80-95 DAS", watering: "Avoid moisture stress", nutrient: "Harvest when pods turn brown" }
    ],
    commonPests: ["Girdle Beetle (गर्डल बीटल)", "Semilooper (तम्बाकू इल्ली)", "Yellow Mosaic Virus", "Rust"]
  },
  {
    id: "mustard",
    name: "Mustard / Rapeseed",
    hindiName: "सरसों",
    category: "oilseed",
    season: "rabi",
    icon: "fa-sun",
    duration: "115-135 Days",
    seedRate: "1.5-2.0 kg / Acre",
    soilType: "Sandy loam to clay loam soils",
    phRange: "6.0 - 7.8",
    npkRatio: "80:40:40 kg/Ha (32:16:16 kg/Acre)",
    avgYield: "7-11 Quintals / Acre",
    description: "Major rabi oilseed crop with low water requirement. Highly responsive to sulphur fertilization.",
    descriptionHi: "कम पानी में तैयार होने वाली प्रमुख रबी तिलहन फसल। सल्फर (गंधक) के प्रयोग से तेल प्रतिशत में भारी वृद्धि होती है।",
    stages: [
      { name: "Sowing & Thinning", days: "15-20 DAS", watering: "First light irrigation", nutrient: "Basal SSP + Single Super Phosphate" },
      { name: "Branching & Flowering", days: "40-50 DAS", watering: "Second critical irrigation", nutrient: "Urea Top-Dressing (20 kg/acre)" },
      { name: "Pod Formation (Siliqua)", days: "70-85 DAS", watering: "Third irrigation if soil is dry", nutrient: "Foliar Boron spray" },
      { name: "Maturity", days: "110-125 DAS", watering: "Stop irrigation", nutrient: "Harvest when 75% pods turn yellowish" }
    ],
    commonPests: ["Mustard Aphid (चेपा/माहो)", "Sawfly", "White Rust (सफेद रतुआ)", "Alternaria Blight"]
  },
  {
    id: "onion",
    name: "Onion",
    hindiName: "प्याज़",
    category: "vegetable",
    season: "rabi",
    icon: "fa-circle-dot",
    duration: "120-140 Days",
    seedRate: "4-5 kg / Acre (Transplanted)",
    soilType: "Friable sandy loam rich in organic matter",
    phRange: "6.5 - 7.5",
    npkRatio: "100:50:50 kg/Ha (40:20:20 kg/Acre)",
    avgYield: "100-150 Quintals / Acre",
    description: "High-value bulb crop grown across Kharif and Rabi. Requires frequent light irrigation and good drainage.",
    descriptionHi: "प्रमुख व्यावसायिक कंद फसल। नियमित हल्की सिंचाई और पोटाश-सल्फर के संतुलित प्रयोग से बड़े व चमकदार कंद बनते हैं।",
    stages: [
      { name: "Nursery & Transplanting", days: "45-50 Days Nursery", watering: "Immediate light irrigation", nutrient: "Basal DAP + MOP + Sulphur" },
      { name: "Vegetative & Foliage Growth", days: "30-50 DAT", watering: "Irrigate every 6-8 days", nutrient: "Urea split + Micronutrient spray" },
      { name: "Bulb Initiation & Sizing", days: "60-90 DAT", watering: "Do not let soil crack", nutrient: "Foliar 0:0:50 (SOP) spray" },
      { name: "Neck Fall & Harvest", days: "110-130 DAT", watering: "Withhold water 15 days before harvest", nutrient: "Curing under shade for 7-10 days" }
    ],
    commonPests: ["Thrips (थ्रिप्स/जू)", "Purple Blotch (बैंगनी धब्बा)", "Stemphylium Blight", "Basal Rot"]
  },
  {
    id: "tomato",
    name: "Tomato",
    hindiName: "टमाटर",
    category: "vegetable",
    season: "all",
    icon: "fa-apple-whole",
    duration: "110-140 Days",
    seedRate: "100-150 grams / Acre (Hybrid)",
    soilType: "Well-drained deep loam with good organic matter",
    phRange: "6.0 - 7.0",
    npkRatio: "120:60:60 kg/Ha (50:25:25 kg/Acre)",
    avgYield: "200-350 Quintals / Acre (Hybrid)",
    description: "Versatile vegetable with high yield potential. Responds exceptionally well to staking and drip fertigation.",
    descriptionHi: "सर्वाधिक लोकप्रिय व लाभकारी सब्जी। स्टेकिंग (तार-बांस सहारा) और ड्रिप फर्टिगेशन से गुणवत्ता व पैदावार दोगुनी होती है।",
    stages: [
      { name: "Transplanting & Establishment", days: "25-30 Days Seedling", watering: "Daily light drip watering", nutrient: "19:19:19 Starter dose" },
      { name: "Vegetative & Staking", days: "25-40 DAT", watering: "Maintain field capacity", nutrient: "12:61:00 (Mono Ammonium Phosphate)" },
      { name: "Flowering & Fruit Set", days: "45-70 DAT", watering: "Consistent moisture prevents fruit drop", nutrient: "Calcium Nitrate + Boron foliar" },
      { name: "Fruit Sizing & Multiple Pickings", days: "75-130 DAT", watering: "Drip every alternate day", nutrient: "13:0:45 + Micronutrients" }
    ],
    commonPests: ["Early & Late Blight (झुलसा)", "Leaf Curl Virus (पत्ती मरोड़)", "Fruit Borer (फल छेदक)", "Tuta Absoluta"]
  },
  {
    id: "potato",
    name: "Potato",
    hindiName: "आलू",
    category: "vegetable",
    season: "rabi",
    icon: "fa-egg",
    duration: "85-110 Days",
    seedRate: "12-15 Quintals / Acre (Seed Tubers)",
    soilType: "Loose, friable sandy loam rich in humus",
    phRange: "5.2 - 6.4",
    npkRatio: "150:100:120 kg/Ha (60:40:50 kg/Acre)",
    avgYield: "120-180 Quintals / Acre",
    description: "High-energy tuber crop. Requires cool nights, ridging/earthing up, and protection against late blight.",
    descriptionHi: "प्रमुख कंद फसल। मिट्टी चढ़ाना (Earthing-up) और पोटाश का उचित प्रयोग भरपूर और सुडौल कंद उत्पादन के लिए आवश्यक है।",
    stages: [
      { name: "Tuber Sowing & Sprouting", days: "0-15 DAS", watering: "Light moisture in ridges", nutrient: "Basal NPK + Well-rotted FYM" },
      { name: "Earthing-up & Vegetative", days: "30-35 DAS", watering: "Irrigate every 8-10 days", nutrient: "Urea Top-Dressing + Ridging" },
      { name: "Tuber Bulking Stage", days: "50-75 DAS", watering: "Critical moisture stage", nutrient: "Sulphate of Potash (0:0:50)" },
      { name: "Haulm Cutting & Harvest", days: "85-100 DAS", watering: "Stop water 10 days before dehaulming", nutrient: "Cure skins before cold storage" }
    ],
    commonPests: ["Late Blight (पिछेती झुलसा)", "Potato Tuber Moth", "Black Scurf", "Common Scab"]
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    hindiName: "गन्ना",
    category: "cash",
    season: "all",
    icon: "fa-cubes",
    duration: "300-360 Days",
    seedRate: "25,000-30,000 Two-bud setts / Acre",
    soilType: "Deep fertile alluvial or medium black loam",
    phRange: "6.5 - 7.8",
    npkRatio: "250:115:115 kg/Ha (100:45:45 kg/Acre)",
    avgYield: "350-500 Quintals / Acre",
    description: "Heavy feeder commercial cash crop. Requires ample sunlight, regular irrigation, and multiple split fertilizer doses.",
    descriptionHi: "दीर्घकालिक नकदी फसल। प्रचुर धूप, नियमित सिंचाई और संतुलित नाइट्रोजन-पोटाश के प्रयोग से गन्ने की मोटाई व वजन बढ़ता है।",
    stages: [
      { name: "Sett Planting & Germination", days: "0-45 DAP", watering: "Light irrigation after planting", nutrient: "Basal DAP + Carbofuran/Chlorpyrifos" },
      { name: "Tillering Stage", days: "45-120 DAP", watering: "Irrigate every 10-12 days", nutrient: "Urea split doses (50 kg/acre)" },
      { name: "Grand Growth Stage", days: "120-270 DAP", watering: "Heavy water requirement", nutrient: "Earthing up + Trash mulching" },
      { name: "Maturity & Ripening", days: "270-360 DAP", watering: "Reduce irrigation frequency", nutrient: "Harvest when brix reading > 18%" }
    ],
    commonPests: ["Early Shoot Borer (कंसुआ)", "Top Borer", "Pyrilla (पायरीला)", "Red Rot (लाल सड़न)"]
  },
  {
    id: "chickpea",
    name: "Chickpea / Gram",
    hindiName: "चना",
    category: "pulse",
    season: "rabi",
    icon: "fa-bowl-rice",
    duration: "100-120 Days",
    seedRate: "30-35 kg / Acre (Desi) / 45 kg (Kabuli)",
    soilType: "Well-drained light to heavy soils",
    phRange: "6.0 - 7.5",
    npkRatio: "20:50:20 kg/Ha (8:20:8 kg/Acre)",
    avgYield: "8-12 Quintals / Acre",
    description: "King of pulses in India. Highly drought hardy and enriches soil through biological nitrogen fixation.",
    descriptionHi: "भारत की प्रमुख दलहनी फसल। कम पानी में भी उत्कृष्ट उत्पादन देती है और भूमि की उर्वरता बढ़ाती है।",
    stages: [
      { name: "Sowing & Branching", days: "20-30 DAS", watering: "First irrigation at pre-flowering", nutrient: "Rhizobium + PSB seed inoculation" },
      { name: "Nipping / Topping", days: "35-45 DAS", watering: "Pinch top shoots for more branching", nutrient: "Foliar 19:19:19 spray" },
      { name: "Pod Formation", days: "65-85 DAS", watering: "Second light irrigation at pod fill", nutrient: "Foliar 2% Urea or DAP spray" },
      { name: "Harvest", days: "100-115 DAS", watering: "Harvest when plants dry and rattle", nutrient: "Store with neem leaves" }
    ],
    commonPests: ["Pod Borer / Helicoverpa (घाटी छेदक)", "Fusarium Wilt (उकठा)", "Ascochyta Blight", "Root Rot"]
  },
  {
    id: "orange",
    name: "Nagpur Orange / Mandarin",
    hindiName: "नागपुर संतरा",
    category: "fruit",
    season: "all",
    icon: "fa-lemon",
    duration: "Perennial Orchard (Ambia & Mrig Bahar)",
    seedRate: "110-120 Budded Plants / Acre (6m x 6m spacing)",
    soilType: "Deep well-drained medium black to light loamy soil (depth > 1m)",
    phRange: "6.5 - 7.8",
    npkRatio: "600:200:300 g NPK per tree/year + 25kg FYM",
    avgYield: "80-120 Quintals (8-12 Tons) / Acre",
    description: "World-famous GI-tagged fruit of Vidarbha/Nagpur. Grown in two main seasons: Ambia Bahar (Feb flowering, Oct harvest) and Mrig Bahar (June-July flowering, Feb harvest).",
    descriptionHi: "विदर्भ-नागपुर का विश्व प्रसिद्ध जीआई-टैग प्राप्त फल। दो मुख्य बहारों (अम्बिया और मृग बहार) में फलन होता है। नियमित सूक्ष्म पोषक तत्वों और बोरॉन से फलों की मिठास व चमक बढ़ती है।",
    stages: [
      { name: "Stress / Resting Period (Water Stress)", days: "30-40 Days before flowering", watering: "Withhold irrigation to induce uniform flowering", nutrient: "Clean weed basin & apply FYM + Neem cake" },
      { name: "Flowering & Fruit Set", days: "0-30 Days after stress release", watering: "Resume regular light drip irrigation", nutrient: "Apply 1/3rd Nitrogen + Single Super Phosphate" },
      { name: "Fruit Sizing (Marble to Egg Size)", days: "45-90 DAF", watering: "Maintain constant root-zone moisture", nutrient: "Foliar spray of 13:0:45 + Micronutrients (Zn, Fe, Mn)" },
      { name: "Fruit Maturity & Sugar Accumulation", days: "120-180 DAF", watering: "Gradual drip irrigation", nutrient: "Potassium Sulphate (0:0:50) + Boron (1g/L)" },
      { name: "Harvest & Color Break", days: "210-240 DAF", watering: "Light irrigation before harvesting", nutrient: "Careful manual clipping without bruising rind" }
    ],
    commonPests: ["Citrus Psylla (सिट्रस साइला)", "Leaf Miner (पत्ती सुरंग कीट)", "Fruit Sucking Moth", "Phytophthora Gummosis (गोंदिया रोग)"]
  }
];

// Initialize and render crop directory cards
function renderCropsDirectory(filteredList = null) {
  const container = document.getElementById('crops-directory-container');
  if (!container) return;

  const list = filteredList || CROPS_DATABASE;
  const isHindi = window.currentLang === 'hi';

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--slate-500);">
        <i class="fa-solid fa-wheat-awn-circle-exclamation" style="font-size:2.5rem; margin-bottom:10px;"></i>
        <h4>No crops match your filter criteria.</h4>
        <p>Try clearing your search keyword or selecting 'All Seasons'.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(crop => `
    <div class="crop-card">
      <div class="crop-card-header">
        <div class="crop-name-group">
          <div class="crop-avatar">
            <i class="fa-solid ${crop.icon}"></i>
          </div>
          <div>
            <h3 class="crop-title">${crop.name}</h3>
            <span class="crop-hindi-title">${crop.hindiName} • ${crop.season.toUpperCase()}</span>
          </div>
        </div>
        <span class="badge badge-success">${crop.category}</span>
      </div>

      <p style="font-size:0.85rem; color:var(--slate-600); line-height:1.4;">
        ${isHindi ? crop.descriptionHi : crop.description}
      </p>

      <div class="crop-stats-grid">
        <div class="crop-stat-item">
          <span>Seed Rate:</span>
          <span>${crop.seedRate}</span>
        </div>
        <div class="crop-stat-item">
          <span>Duration:</span>
          <span>${crop.duration}</span>
        </div>
        <div class="crop-stat-item">
          <span>Avg Yield:</span>
          <span>${crop.avgYield}</span>
        </div>
        <div class="crop-stat-item">
          <span>Optimum pH:</span>
          <span>${crop.phRange}</span>
        </div>
      </div>

      <div class="crop-card-footer">
        <button class="btn-primary btn-sm btn-block" onclick="openCropDetailModal('${crop.id}')">
          <i class="fa-solid fa-book-open"></i> Full Cultivation Guide
        </button>
      </div>
    </div>
  `).join('');
}

// Open Crop Cultivation Modal
function openCropDetailModal(cropId) {
  const crop = CROPS_DATABASE.find(c => c.id === cropId);
  if (!crop) return;

  const modal = document.getElementById('modal-crop-detail');
  const titleEl = document.getElementById('modal-crop-title');
  const contentEl = document.getElementById('modal-crop-content');
  const isHindi = window.currentLang === 'hi';

  if (titleEl) {
    titleEl.innerHTML = `<i class="fa-solid ${crop.icon} text-green"></i> <span>${crop.name} (${crop.hindiName}) - Complete Farming Guide</span>`;
  }

  if (contentEl) {
    contentEl.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:18px;">
        <div style="background-color:var(--primary-50); border:1px solid var(--primary-200); padding:16px; border-radius:var(--radius-md);">
          <h4 style="color:var(--primary-900); margin-bottom:6px;"><i class="fa-solid fa-leaf"></i> Soil & Climate Profile</h4>
          <p style="font-size:0.85rem; color:var(--slate-700);"><strong>Recommended Soil:</strong> ${crop.soilType} (pH: ${crop.phRange})</p>
          <p style="font-size:0.85rem; color:var(--slate-700);"><strong>Recommended NPK:</strong> ${crop.npkRatio}</p>
          <p style="font-size:0.85rem; color:var(--slate-700);"><strong>Seed Rate:</strong> ${crop.seedRate}</p>
        </div>

        <div>
          <h4 style="margin-bottom:12px; font-size:1.05rem;"><i class="fa-solid fa-timeline text-blue"></i> Growth Stage Timeline & Irrigation Schedule</h4>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${crop.stages.map((stage, idx) => `
              <div style="display:flex; gap:12px; border-left:3px solid var(--primary-600); padding:8px 12px; background-color:var(--slate-50); border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
                <div style="font-weight:700; color:var(--primary-800); min-width:32px;">${idx + 1}.</div>
                <div style="flex:1;">
                  <div style="display:flex; justify-content:space-between; font-weight:700; font-size:0.9rem;">
                    <span>${stage.name}</span>
                    <span style="color:var(--slate-500); font-size:0.8rem;">${stage.days}</span>
                  </div>
                  <p style="font-size:0.825rem; color:var(--slate-700); margin-top:3px;"><strong>Watering:</strong> ${stage.watering}</p>
                  <p style="font-size:0.825rem; color:var(--primary-700);"><strong>Nutrient/Fertilizer:</strong> ${stage.nutrient}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h4 style="margin-bottom:8px; font-size:1.05rem;"><i class="fa-solid fa-shield-virus text-amber"></i> Common Pest & Disease Threats</h4>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            ${crop.commonPests.map(pest => `
              <span class="badge badge-warning">${pest}</span>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  if (modal) modal.classList.remove('hidden');
}

// Interactive Fertilizer Dosage Math Calculator
function calculateFertilizerBags(cropKey, areaVal, unitVal) {
  let acreage = parseFloat(areaVal);
  if (unitVal === 'hectare') acreage = acreage * 2.471;
  else if (unitVal === 'bigha') acreage = acreage * 0.40;

  // NPK kg per acre recommendations
  const doses = {
    wheat: { N: 50, P: 25, K: 15, zinc: 5 },
    rice: { N: 40, P: 20, K: 20, zinc: 6 },
    cotton: { N: 60, P: 25, K: 25, zinc: 5 },
    sugarcane: { N: 100, P: 45, K: 45, zinc: 10 },
    maize: { N: 50, P: 25, K: 15, zinc: 5 },
    mustard: { N: 32, P: 16, K: 16, zinc: 4 },
    potato: { N: 60, P: 40, K: 50, zinc: 6 },
    onion: { N: 40, P: 20, K: 20, zinc: 5 }
  };

  const req = doses[cropKey] || doses.wheat;

  // Conversion math:
  // 1 Bag DAP (50kg) = 9kg N + 23kg P2O5
  // DAP bags needed = (req.P * acreage) / 23
  const dapBags = ((req.P * acreage) / 23).toFixed(1);
  const nFromDap = dapBags * 9;

  // Remaining Nitrogen supplied by Urea (45kg bag contains 20.7kg N @ 46%)
  const remN = Math.max(0, (req.N * acreage) - nFromDap);
  const ureaBags = (remN / 20.7).toFixed(1);

  // MOP (50kg bag contains 30kg K2O @ 60%)
  const mopBags = ((req.K * acreage) / 30).toFixed(1);
  const zincKg = (req.zinc * acreage).toFixed(1);

  return {
    acreage: acreage.toFixed(2),
    ureaBags,
    dapBags,
    mopBags,
    zincKg
  };
}

// Soil to Crop Matcher Algorithm
function matchSoilToCrops(soilType, waterSource, season, investment) {
  const matches = [];

  CROPS_DATABASE.forEach(crop => {
    let score = 50;

    // Season match
    if (crop.season === season || crop.season === 'all') score += 30;

    // Soil match
    if (soilType === 'black' && (crop.id === 'cotton' || crop.id === 'soybean' || crop.id === 'wheat' || crop.id === 'chickpea')) score += 25;
    if (soilType === 'alluvial' && (crop.id === 'wheat' || crop.id === 'rice' || crop.id === 'sugarcane' || crop.id === 'tomato' || crop.id === 'potato')) score += 25;
    if (soilType === 'sandy' && (crop.id === 'mustard' || crop.id === 'chickpea' || crop.id === 'onion')) score += 25;
    if (soilType === 'clay' && (crop.id === 'rice' || crop.id === 'wheat')) score += 25;

    // Water match
    if (waterSource === 'rainfed' && (crop.id === 'soybean' || crop.id === 'mustard' || crop.id === 'chickpea')) score += 20;
    if (waterSource === 'assured' && (crop.id === 'sugarcane' || crop.id === 'rice' || crop.id === 'tomato' || crop.id === 'potato')) score += 20;

    // Investment
    if (investment === 'high' && (crop.category === 'vegetable' || crop.category === 'cash')) score += 15;
    if (investment === 'low' && (crop.category === 'pulse' || crop.category === 'cereal')) score += 15;

    if (score >= 70) {
      matches.push({ crop, score });
    }
  });

  return matches.sort((a, b) => b.score - a.score);
}

// Organic Recipes Content
function renderOrganicRecipes() {
  const body = document.getElementById('organic-recipes-body');
  if (!body) return;

  body.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:20px;">
      <!-- Recipe 1: Jeevamrut -->
      <div style="border:1px solid var(--primary-200); border-radius:var(--radius-md); padding:16px; background-color:var(--primary-50);">
        <h4 style="color:var(--primary-900); font-size:1.1rem; margin-bottom:8px;"><i class="fa-solid fa-flask"></i> 1. Jeevamrut (जीवामृत - Powerful Microorganism Multiplier)</h4>
        <p style="font-size:0.85rem; color:var(--slate-700); margin-bottom:8px;"><strong>Ingredients (For 1 Acre):</strong> 200 Litres Water + 10 kg Fresh Desi Cow Dung + 10 Litres Cow Urine (Gomutra) + 2 kg Jaggery (Gur) + 2 kg Gram Flour (Besan) + 1 Handful Virgin Soil from farm bund.</p>
        <p style="font-size:0.85rem; color:var(--slate-700); margin-bottom:8px;"><strong>Preparation:</strong> Mix all ingredients well in a 200-litre plastic barrel. Keep in shade and stir clockwise twice daily for 48 hours. Ready for application within 5-7 days.</p>
        <p style="font-size:0.85rem; color:var(--primary-800);"><strong>Application:</strong> Apply with flood irrigation or filter through mesh for drip/foliar spray (10-20% solution).</p>
      </div>

      <!-- Recipe 2: Neemastra -->
      <div style="border:1px solid var(--amber-200); border-radius:var(--radius-md); padding:16px; background-color:var(--amber-50);">
        <h4 style="color:var(--amber-900); font-size:1.1rem; margin-bottom:8px;"><i class="fa-solid fa-shield-virus"></i> 2. Neemastra (नीमास्त्र - Broad-Spectrum Botanical Insecticide)</h4>
        <p style="font-size:0.85rem; color:var(--slate-700); margin-bottom:8px;"><strong>Ingredients:</strong> 100 Litres Water + 5 kg Crushed Neem Leaves & Berries (Nimboli) + 5 Litres Cow Urine + 2 kg Fresh Cow Dung.</p>
        <p style="font-size:0.85rem; color:var(--slate-700); margin-bottom:8px;"><strong>Preparation:</strong> Mix and ferment in shade for 48 hours. Filter with cotton cloth.</p>
        <p style="font-size:0.85rem; color:var(--amber-800);"><strong>Target Pests:</strong> Controls sucking pests like Whitefly, Aphids, Thrips, Jassids, and young caterpillars.</p>
      </div>

      <!-- Recipe 3: Beejamrit -->
      <div style="border:1px solid var(--blue-200); border-radius:var(--radius-md); padding:16px; background-color:var(--blue-50);">
        <h4 style="color:var(--blue-900); font-size:1.1rem; margin-bottom:8px;"><i class="fa-solid fa-seedling"></i> 3. Beejamrit (बीजामृत - Natural Seed Treatment)</h4>
        <p style="font-size:0.85rem; color:var(--slate-700); margin-bottom:8px;"><strong>Ingredients:</strong> 20 Litres Water + 5 kg Fresh Desi Cow Dung + 5 Litres Cow Urine + 50g Slaked Lime (Chuna) + 1 Handful Fertile Soil.</p>
        <p style="font-size:0.85rem; color:var(--slate-700); margin-bottom:8px;"><strong>Usage:</strong> Coat seeds evenly with Beejamrit before sowing, dry in shade for 1 hour. Protects emerging seedlings from soil-borne fungi and collar rot.</p>
      </div>
    </div>
  `;
}

// Export functions to window
window.CROPS_DATABASE = CROPS_DATABASE;
window.renderCropsDirectory = renderCropsDirectory;
window.openCropDetailModal = openCropDetailModal;
window.calculateFertilizerBags = calculateFertilizerBags;
window.matchSoilToCrops = matchSoilToCrops;
window.renderOrganicRecipes = renderOrganicRecipes;