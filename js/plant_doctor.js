/**
 * AgriTech AI Plant Doctor & Pest Diagnostic Engine
 * Diagnostic symptom-matching, sample images, and integrated pest management (IPM)
 */

const PLANT_DISEASES_DB = [
  // Tomato Diseases
  {
    id: "tomato_early_blight",
    crop: "tomato",
    part: "leaf",
    symptoms: ["brown_spots", "concentric_rings", "yellow_halo", "leaf_drop"],
    name: "Early Blight (Alternaria solani)",
    hindiName: "टमाटर का अगेती झुलसा",
    pathogen: "Fungal Pathogen (कवक जनित रोग)",
    confidence: "96%",
    description: "Characterized by dark brown to black spots with concentric rings ('target board' pattern) starting on older lower leaves.",
    chemicalControl: [
      { name: "Mancozeb 75% WP", dose: "2.5 g / Litre of water (500 g / acre)", brand: "Dithane M-45 / Indofil" },
      { name: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC", dose: "1.0 ml / Litre of water (200 ml / acre)", brand: "Amistar Top" },
      { name: "Copper Oxychloride 50% WP", dose: "3.0 g / Litre of water", brand: "Blitox 50" }
    ],
    organicControl: [
      "Spray Trichoderma viride (5-10 g / Litre) during early appearance.",
      "Apply 5% Neem Seed Kernel Extract (NSKE) or Neem Oil 1500 ppm (5 ml / Litre).",
      "Foliar spray of Sour Buttermilk (Khatti Chhachh - 50 ml/L) mixed with cow urine."
    ],
    prevention: "Avoid overhead sprinkler irrigation; stake plants to keep leaves off moist soil; rotate with non-solanaceous crops."
  },
  {
    id: "tomato_late_blight",
    crop: "tomato",
    part: "leaf",
    symptoms: ["water_soaked_spots", "white_mildew_underside", "rapid_browning", "foul_smell"],
    name: "Late Blight (Phytophthora infestans)",
    hindiName: "टमाटर का पिछेती झुलसा",
    pathogen: "Oomycete / Water Mold Fungi",
    confidence: "98%",
    description: "Rapidly spreading dark water-soaked lesions with white mold on the leaf underside during cold, humid, foggy weather.",
    chemicalControl: [
      { name: "Cymoxanil 8% + Mancozeb 64% WP", dose: "2.0 g / Litre of water", brand: "Curzate M-8 / Sectin" },
      { name: "Dimethomorph 50% WP", dose: "1.0 g / Litre of water", brand: "Acrobat" },
      { name: "Metalaxyl 8% + Mancozeb 64% WP", dose: "2.5 g / Litre of water", brand: "Ridomil Gold" }
    ],
    organicControl: [
      "Spray Bordeaux Mixture 1% (1kg Copper Sulphate + 1kg Lime in 100L water).",
      "Apply Pseudomonas fluorescens bio-agent (10 g / Litre)."
    ],
    prevention: "Destroy infected vines immediately; ensure excellent drainage; apply preventive copper sprays before foggy spells."
  },
  {
    id: "tomato_leaf_curl",
    crop: "tomato",
    part: "leaf",
    symptoms: ["curling_upwards", "stunted_growth", "thick_leathery_leaves", "whiteflies_present"],
    name: "Tomato Leaf Curl Virus (ToLCV)",
    hindiName: "टमाटर पत्ती मरोड़ विषाणु",
    pathogen: "Begomovirus (Transmitted by Whitefly Bemisia tabaci)",
    confidence: "95%",
    description: "Upward curling, puckering, vein clearing, and severe stunting caused by viral infection spread by whiteflies.",
    chemicalControl: [
      { name: "Diafenthiuron 50% WP", dose: "1.25 g / Litre of water", brand: "Pegasus" },
      { name: "Acetamiprid 20% SP", dose: "0.5 g / Litre of water", brand: "Pride / Manik" },
      { name: "Spiromesifen 22.9% SC", dose: "1.0 ml / Litre of water", brand: "Oberon" }
    ],
    organicControl: [
      "Install Yellow Sticky Traps @ 15-20 traps / acre to trap vector whiteflies.",
      "Spray 2% Neem Oil + Fish Oil Rosin Soap.",
      "Foliar spray of Dashparni Ark (30 ml / Litre)."
    ],
    prevention: "Use 40-mesh insect net in nursery; rogue out infected virus plants immediately to stop field spread."
  },

  // Wheat Diseases
  {
    id: "wheat_yellow_rust",
    crop: "wheat",
    part: "leaf",
    symptoms: ["yellow_stripes", "powder_on_finger", "chlorosis", "drying_leaves"],
    name: "Yellow / Stripe Rust (Puccinia striiformis)",
    hindiName: "गेहूं का पीला रतुआ / हल्दी रोग",
    pathogen: "Fungal Obligate Parasite",
    confidence: "97%",
    description: "Linear yellow-orange powdery stripes along leaf veins that leave yellow dust on fingers when touched.",
    chemicalControl: [
      { name: "Propiconazole 25% EC", dose: "1.0 ml / Litre (200 ml in 200L water / acre)", brand: "Tilt / Bumper" },
      { name: "Tebuconazole 25.9% EC", dose: "1.0 ml / Litre of water", brand: "Folicur" },
      { name: "Azoxystrobin 11% + Tebuconazole 18.3% SC", dose: "1.0 ml / Litre", brand: "Custodia" }
    ],
    organicControl: [
      "Spray fermented Butter-milk (Chhachh) mixed with copper vessel extract.",
      "Bio-fungicide Trichoderma harzianum @ 10 g / Litre."
    ],
    prevention: "Plant resistant wheat varieties (HD-3086, DBW-187, DBW-222, PBW-725); avoid excess nitrogen fertilization."
  },

  // Cotton Diseases
  {
    id: "cotton_pink_bollworm",
    crop: "cotton",
    part: "fruit",
    symptoms: ["rosette_flowers", "entry_holes_boll", "damaged_lint", "premature_drop"],
    name: "Pink Bollworm (Pectinophora gossypiella)",
    hindiName: "कपास की गुलाबी सुंडी",
    pathogen: "Lepidopteran Insect Pest",
    confidence: "96%",
    description: "Caterpillars feed inside flower buds (causing rosette flowers) and burrow into developing bolls, destroying lint and seeds.",
    chemicalControl: [
      { name: "Chlorantraniliprole 18.5% SC", dose: "0.3 ml / Litre of water (60 ml / acre)", brand: "Coragen" },
      { name: "Profenophos 40% + Cypermethrin 4% EC", dose: "2.0 ml / Litre of water", brand: "Roket / Polytrin C" },
      { name: "Emamectin Benzoate 5% SG", dose: "0.5 g / Litre (100 g / acre)", brand: "Proclaim" }
    ],
    organicControl: [
      "Install Pheromone Traps (Gossyplure) @ 8-10 traps / acre for monitoring & mass trapping.",
      "Release Trichogramma bactrae egg parasitoid wasps @ 60,000 / acre at 10-day intervals.",
      "Spray Beauveria bassiana bio-insecticide @ 5 g / Litre."
    ],
    prevention: "Avoid extending cotton crop beyond 150-160 days (terminate ratoon crop); deep summer plowing."
  },

  // Onion Diseases
  {
    id: "onion_purple_blotch",
    crop: "onion",
    part: "leaf",
    symptoms: ["purple_sunken_spots", "leaf_blight", "yellowing_tips", "seed_stalk_breakage"],
    name: "Purple Blotch (Alternaria porri)",
    hindiName: "प्याज़ का बैंगनी धब्बा रोग",
    pathogen: "Fungal Foliar Pathogen",
    confidence: "94%",
    description: "Small sunken water-soaked spots with purple centres and concentric bands on foliage and seed stalks.",
    chemicalControl: [
      { name: "Tebuconazole 50% + Trifloxystrobin 25% WG", dose: "0.7 g / Litre of water", brand: "Nativo" },
      { name: "Mancozeb 75% WP + Sticker (Sandovit)", dose: "2.5 g / Litre of water", brand: "Indofil M-45" },
      { name: "Difenoconazole 25% EC", dose: "1.0 ml / Litre of water", brand: "Score" }
    ],
    organicControl: [
      "Spray Neem Oil 3000 PPM (3 ml/L) mixed with 1 ml/L organic sticker.",
      "Foliar spray of 10% Cow Urine extract fermented with garlic & ginger."
    ],
    prevention: "Ensure good drainage; do not over-irrigate near maturity; always add a spreader/sticker due to waxy onion foliage."
  },

  // Rice Diseases
  {
    id: "rice_leaf_blast",
    crop: "rice",
    part: "leaf",
    symptoms: ["spindle_shaped_spots", "grey_center_brown_margin", "leaf_drying", "neck_breakage"],
    name: "Rice Blast (Magnaporthe oryzae)",
    hindiName: "धान का झुलसा / ब्लास्ट रोग",
    pathogen: "Fungal Airborne Pathogen",
    confidence: "97%",
    description: "Spindle/eye-shaped lesions with grayish-white centers and brownish margins on leaves, neck, and panicle node.",
    chemicalControl: [
      { name: "Tricyclazole 75% WP", dose: "0.6 g / Litre (120 g / acre in 200L water)", brand: "Beam / Baan" },
      { name: "Isoprothiolane 40% EC", dose: "1.5 ml / Litre of water", brand: "Fuji-One" },
      { name: "Kasugamycin 3% SL", dose: "2.0 ml / Litre of water", brand: "Kasu-B" }
    ],
    organicControl: [
      "Seed treatment with Pseudomonas fluorescens @ 10 g / kg seed.",
      "Foliar application of fermented Jeevamrut (20% concentration)."
    ],
    prevention: "Avoid split heavy urea applications late in season; avoid moisture stress in upland paddy."
  },

  // Potato Diseases
  {
    id: "potato_late_blight",
    crop: "potato",
    part: "leaf",
    symptoms: ["water_soaked_spots", "blackened_foliage", "tuber_rot", "white_fungus_leaf_under"],
    name: "Potato Late Blight (Phytophthora infestans)",
    hindiName: "आलू का पिछेती झुलसा",
    pathogen: "Oomycete Fungus",
    confidence: "98%",
    description: "Devastating water-soaked spots turning black and foul-smelling, causing rapid foliage collapse during cold misty weather.",
    chemicalControl: [
      { name: "Cymoxanil 8% + Mancozeb 64% WP", dose: "2.5 g / Litre (500 g / acre)", brand: "Curzate M-8" },
      { name: "Mandipropamid 23.4% SC", dose: "0.8 ml / Litre of water", brand: "Revus" },
      { name: "Chlorothalonil 75% WP", dose: "2.0 g / Litre of water", brand: "Kavach" }
    ],
    organicControl: [
      "Preventive Bordeaux Mixture 1% or Copper Hydroxide 53.8% DF @ 2 g/L.",
      "Trichoderma viride foliar treatment."
    ],
    prevention: "Plant certified disease-free tubers; earth up high ridges to protect tubers from spore wash."
  }
];

// Symptom options dynamically rendered based on crop and plant part
const SYMPTOM_OPTIONS = {
  leaf: [
    { id: "yellow_stripes", label: "Yellow / Orange stripes or dust (पीली धारियां/पाउडर)" },
    { id: "brown_spots", label: "Brown/black concentric circular spots (गोल भूरे/काले धब्बे)" },
    { id: "water_soaked_spots", label: "Dark water-soaked rotting lesions (गीले काले धब्बे)" },
    { id: "curling_upwards", label: "Upward leaf curling & puckering (पत्तियां ऊपर मुड़ना)" },
    { id: "spindle_shaped_spots", label: "Spindle / Eye-shaped spots with grey center (नाव जैसे धब्बे)" },
    { id: "purple_sunken_spots", label: "Purple sunken blotches with yellow border (बैंगनी धब्बे)" },
    { id: "white_mildew_underside", label: "White fungal powder on underside (निचली सतह पर सफेद फफूंद)" },
    { id: "whiteflies_present", label: "Tiny white flying flies underneath (सफेद मक्खियां)" }
  ],
  stem: [
    { id: "entry_holes_stem", label: "Bore holes with frass / sawdust (तने में सुराख व बुरादा)" },
    { id: "dead_heart", label: "Drying central shoot / Dead heart (केंद्रीय तने का सूखना)" },
    { id: "stem_girdling", label: "Dark ring / girdling around branch (शाखा पर घेरा/रिंग)" },
    { id: "red_lesions", label: "Red discoloration inside cut stem (तने के अंदर लाल सड़न)" }
  ],
  fruit: [
    { id: "entry_holes_boll", label: "Bore holes in fruit/boll with rot (फल में छेद व सड़ांध)" },
    { id: "fruit_rot", label: "Soft watery decay or sunken black spots (फल का गलना)" },
    { id: "rosette_flowers", label: "Twisted unopened rosette flowers (मुड़े हुए फूल)" },
    { id: "premature_drop", label: "Heavy premature flower/fruit drop (फलों का झड़ना)" }
  ],
  root: [
    { id: "root_rot", label: "Blackened decaying roots (जड़ों का काला पड़ना)" },
    { id: "root_knots", label: "Galls / swollen knots on roots (जड़ों में गांठे/नेमाटोड)" },
    { id: "vascular_wilting", label: "Sudden wilting while soil is wet (गीली मिट्टी में भी पौधा मुरझाना)" }
  ]
};

// Update symptoms checklist based on selected crop and plant part
function updateSymptomsList() {
  const partInput = document.querySelector('input[name="plant-part"]:checked');
  const part = partInput ? partInput.value : 'leaf';
  const box = document.getElementById('symptoms-checklist-box');
  if (!box) return;

  const options = SYMPTOM_OPTIONS[part] || SYMPTOM_OPTIONS['leaf'];

  box.innerHTML = options.map(opt => `
    <label class="symptom-check-label">
      <input type="checkbox" name="symptom" value="${opt.id}">
      <span>${opt.label}</span>
    </label>
  `).join('');
}

// Diagnose plant disease based on inputs
function runPlantDiagnosis(cropVal, partVal, selectedSymptoms) {
  // Find best match in database
  let bestMatch = null;
  let highestMatchCount = 0;

  PLANT_DISEASES_DB.forEach(d => {
    if (d.crop === cropVal) {
      const matchCount = d.symptoms.filter(s => selectedSymptoms.includes(s)).length;
      if (matchCount > highestMatchCount) {
        highestMatchCount = matchCount;
        bestMatch = d;
      }
    }
  });

  // Fallback to primary disease for that crop if no exact checkbox matched
  if (!bestMatch) {
    bestMatch = PLANT_DISEASES_DB.find(d => d.crop === cropVal) || PLANT_DISEASES_DB[0];
  }

  renderDiagnosisResult(bestMatch);
}

// Render Diagnosis Prescription Result Card
function renderDiagnosisResult(disease) {
  const placeholder = document.getElementById('result-placeholder');
  const content = document.getElementById('result-active-content');
  const isHindi = window.currentLang === 'hi';

  if (placeholder) placeholder.classList.add('hidden');
  if (content) {
    content.classList.remove('hidden');
    content.innerHTML = `
      <div class="diagnosis-header-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px;">
          <div>
            <span class="badge badge-danger" style="margin-bottom:6px;"><i class="fa-solid fa-triangle-exclamation"></i> AI Diagnosis (${disease.confidence} Confidence)</span>
            <h3 class="disease-name">${disease.name}</h3>
            <p class="disease-pathogen">${disease.pathogen} • ${disease.hindiName}</p>
          </div>
          <button id="btn-read-rx-voice" class="btn-secondary btn-sm" onclick="readDiagnosisAloud('${disease.id}')">
            <i class="fa-solid fa-volume-high"></i> Listen
          </button>
        </div>
        <p style="font-size:0.85rem; color:var(--slate-700); margin-top:8px;">
          ${disease.description}
        </p>
      </div>

      <!-- Chemical Control Prescription -->
      <div>
        <h4 class="treatment-section-title text-blue"><i class="fa-solid fa-prescription-bottle-medical"></i> Recommended Chemical Treatments (IPM Approved)</h4>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${disease.chemicalControl.map(chem => `
            <div class="chemical-box">
              <div style="font-weight:700; color:var(--blue-900); font-size:0.9rem;">${chem.name}</div>
              <div style="font-size:0.825rem; color:var(--slate-700); margin-top:2px;">
                <strong>Dosage:</strong> ${chem.dose} • <em>Commercial Brands: ${chem.brand}</em>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Organic & Biological Alternatives -->
      <div>
        <h4 class="treatment-section-title text-green"><i class="fa-solid fa-leaf"></i> Organic & Biological Remedies</h4>
        <div class="organic-box">
          <ul style="padding-left:18px; margin:0; display:flex; flex-direction:column; gap:4px;">
            ${disease.organicControl.map(org => `<li>${org}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Preventive Cultural Practices -->
      <div style="background-color:var(--slate-50); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:12px; font-size:0.825rem; color:var(--slate-700); margin-top:12px;">
        <strong><i class="fa-solid fa-shield-halved text-amber"></i> Preventive Farm Management:</strong> ${disease.prevention}
      </div>
    `;
  }
}

// Read diagnosis aloud
function readDiagnosisAloud(diseaseId) {
  const disease = PLANT_DISEASES_DB.find(d => d.id === diseaseId);
  if (!disease || !('speechSynthesis' in window)) return;

  const isHindi = window.currentLang === 'hi';
  let speech = "";

  if (isHindi) {
    speech = `AgriTech पौधा डॉक्टर निदान: रोग का नाम ${disease.hindiName} है। यह एक ${disease.pathogen} है। इसके रासायनिक उपचार में ${disease.chemicalControl[0].name} का प्रयोग ${disease.chemicalControl[0].dose} करें। जैविक उपचार के लिए नीम तेल या ट्राइकोडर्मा का छिड़काव करें।`;
  } else {
    speech = `AgriTech AI Plant Doctor Diagnosis: Detected condition is ${disease.name}, which is a ${disease.pathogen}. Recommended chemical treatment is ${disease.chemicalControl[0].name} at dosage ${disease.chemicalControl[0].dose}. For organic control, apply neem extract or bio-agent.`;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(speech);
  utterance.lang = isHindi ? 'hi-IN' : 'en-US';
  window.speechSynthesis.speak(utterance);
}

// Quick Sample Buttons Handler
function setupQuickSampleHandlers() {
  document.querySelectorAll('.sample-photo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const crop = btn.getAttribute('data-crop');
      const symptomKey = btn.getAttribute('data-symptom');

      const cropSelect = document.getElementById('diag-crop-select');
      if (cropSelect) cropSelect.value = crop;

      // Select corresponding disease directly
      const disease = PLANT_DISEASES_DB.find(d => d.id.includes(symptomKey) || d.crop === crop);
      if (disease) {
        renderDiagnosisResult(disease);
        if (window.showToast) window.showToast(`Loaded diagnostic model for ${disease.name}`, "info");
      }
    });
  });
}

// Export functions to window
window.PLANT_DISEASES_DB = PLANT_DISEASES_DB;
window.updateSymptomsList = updateSymptomsList;
window.runPlantDiagnosis = runPlantDiagnosis;
window.renderDiagnosisResult = renderDiagnosisResult;
window.readDiagnosisAloud = readDiagnosisAloud;
window.setupQuickSampleHandlers = setupQuickSampleHandlers;