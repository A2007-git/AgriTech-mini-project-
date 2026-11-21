/**
 * AgriTech Government Schemes & Farmer Calculator Engine
 * Comprehensive agricultural schemes, subsidy rates, and PM-KUSUM solar estimator
 */

const GOVT_SCHEMES_DB = [
  {
    id: "pm_kisan",
    title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    hindiTitle: "प्रधानमंत्री किसान सम्मान निधि योजना",
    category: "income",
    benefit: "₹6,000 per Year (Direct DBT)",
    benefitDetails: "Direct cash transfer of ₹2,000 every 4 months into verified farmer Aadhaar-linked bank accounts.",
    eligibility: [
      "All small and marginal landholder farmer families owning cultivable land.",
      "Aadhaar-seeded active bank account and eKYC completed.",
      "Institutional landholders and high income tax payees excluded."
    ],
    documents: ["Aadhaar Card", "Land Khatauni / 7/12 Extract (ROR)", "Bank Passbook"],
    portalUrl: "https://pmkisan.gov.in/",
    helpline: "155261 / 011-24300606"
  },
  {
    id: "pmfby",
    title: "PM Fasal Bima Yojana (PMFBY - Crop Insurance)",
    hindiTitle: "प्रधानमंत्री फसल बीमा योजना",
    category: "insurance",
    benefit: "Comprehensive Crop Loss Coverage",
    benefitDetails: "Nominal premium: 2% for Kharif food/oilseed crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops. 100% sum insured payout for natural calamities.",
    eligibility: [
      "All farmers growing notified crops in notified areas (both loanee and non-loanee farmers).",
      "Sharecroppers and tenant farmers with land agreements are also eligible."
    ],
    documents: ["Land Possession Certificate / Sowing Certificate", "Aadhaar Card", "Bank Account Details", "Crop Sowing Declaration"],
    portalUrl: "https://pmfby.gov.in/",
    helpline: "1800-200-5142 (Toll Free)"
  },
  {
    id: "pm_kusum",
    title: "PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha)",
    hindiTitle: "पीएम-कुसुम सोलर पंप योजना",
    category: "subsidy",
    benefit: "Up to 60% - 90% Subsidy on Solar Pumps",
    benefitDetails: "30% Central Govt subsidy + 30% State Govt subsidy + 30% Bank loan. Farmer pays only 10% upfront cost for 3 HP to 10 HP solar pumps.",
    eligibility: [
      "Individual farmers, water user associations, cooperatives, and FPOs with agricultural land.",
      "Preference given to diesel pump replacement and un-electrified borewells."
    ],
    documents: ["Aadhaar", "Land Records (7/12 & 8A)", "Borewell / Open Well Certificate", "Bank Account"],
    portalUrl: "https://pmkusum.mnre.gov.in/",
    helpline: "1800-180-3333"
  },
  {
    id: "pmksy_drip",
    title: "PM Krishi Sinchayee Yojana (Per Drop More Crop - Drip Subsidy)",
    hindiTitle: "प्रधानमंत्री कृषि सिंचाई योजना (ड्रिप व स्प्रिंकलर सब्सिडी)",
    category: "subsidy",
    benefit: "45% to 55% Micro-Irrigation Subsidy",
    benefitDetails: "55% subsidy for Small & Marginal farmers (up to 5 Ha), and 45% for Other farmers for installing Drip & Sprinkler systems.",
    eligibility: [
      "All farmers with available perennial irrigation water source.",
      "Applicable for horticulture, vegetables, sugarcane, cotton, and orchard crops."
    ],
    documents: ["Aadhaar Card", "Land 7/12 & 8-A Extract", "Electricity Bill / Water Source Proof", "Soil & Water Test Report"],
    portalUrl: "https://pmksy.gov.in/",
    helpline: "State Agriculture Department Portal"
  },
  {
    id: "kcc_loan",
    title: "Kisan Credit Card (KCC - Subsidized Crop Loan)",
    hindiTitle: "किसान क्रेडिट कार्ड (4% ब्याज दर फसल ऋण)",
    category: "insurance",
    benefit: "Crop Loans up to ₹3 Lakhs @ Effective 4% Interest",
    benefitDetails: "Standard interest is 7%, with 3% prompt repayment incentive from Central Govt, reducing effective interest rate to just 4% per annum.",
    eligibility: [
      "All farmers (individual/joint borrowers), tenant farmers, oral lessees, and self-help groups.",
      "Covers crop cultivation, post-harvest expenses, and farm asset maintenance."
    ],
    documents: ["Application Form", "Land Record Title", "Aadhaar / Voter ID", "Passport Size Photos"],
    portalUrl: "https://myscheme.gov.in/schemes/kcc",
    helpline: "1800-11-5526 / Any Nationalized Bank"
  },
  {
    id: "soil_health_card",
    title: "Soil Health Card Scheme (Free Soil Testing)",
    hindiTitle: "मृदा स्वास्थ्य कार्ड योजना",
    category: "income",
    benefit: "Free Soil Testing & Custom Fertilizer Prescription",
    benefitDetails: "Analyzes 12 soil health parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) and issues customized nutrient recommendation card every 2 years.",
    eligibility: ["All agricultural landowners in India."],
    documents: ["Soil Sample Collection Form", "Aadhaar Card", "Survey Number of Farm Plot"],
    portalUrl: "https://soilhealth.dac.gov.in/",
    helpline: "1800-180-1551"
  }
];

// Render Govt Schemes Cards
function renderGovtSchemes(categoryFilter = 'all') {
  const container = document.getElementById('schemes-cards-container');
  if (!container) return;

  const filtered = categoryFilter === 'all'
    ? GOVT_SCHEMES_DB
    : GOVT_SCHEMES_DB.filter(s => s.category === categoryFilter);

  container.innerHTML = filtered.map(scheme => `
    <div class="scheme-card">
      <div class="scheme-card-header">
        <div>
          <h3 class="scheme-title">${scheme.title}</h3>
          <span class="scheme-sub">${scheme.hindiTitle}</span>
        </div>
        <span class="scheme-benefit-badge">${scheme.benefit}</span>
      </div>

      <p class="scheme-details">${scheme.benefitDetails}</p>

      <div class="scheme-criteria-list">
        <strong><i class="fa-solid fa-circle-check text-green"></i> Key Eligibility Criteria:</strong>
        <ul style="padding-left:18px; margin-top:4px; font-size:0.8rem; color:var(--slate-700);">
          ${scheme.eligibility.map(e => `<li>${e}</li>`).join('')}
        </ul>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-top:4px;">
        <span style="font-size:0.75rem; color:var(--slate-500);">
          <strong><i class="fa-solid fa-file-invoice"></i> Docs:</strong> ${scheme.documents.join(', ')}
        </span>
        <a href="${scheme.portalUrl}" target="_blank" rel="noopener" class="btn-primary btn-sm">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Apply on Official Portal
        </a>
      </div>
    </div>
  `).join('');
}

// PM-KUSUM Solar Pump Subsidy Estimator
function estimateSolarPumpSubsidy(pumpHp, category) {
  const hp = parseFloat(pumpHp);

  // Approximate benchmark costs (₹)
  const benchmarkCosts = {
    3: 165000,
    5: 245000,
    7.5: 355000,
    10: 460000
  };

  const totalCost = benchmarkCosts[hp] || 245000;
  let centreRate = 0.30;
  let stateRate = 0.30;

  if (category === 'sc_st') {
    centreRate = 0.30;
    stateRate = 0.45; // Up to 75%
  } else if (category === 'northeast') {
    centreRate = 0.50;
    stateRate = 0.30; // Up to 80%
  }

  const centralSubsidy = Math.round(totalCost * centreRate);
  const stateSubsidy = Math.round(totalCost * stateRate);
  const totalSubsidy = centralSubsidy + stateSubsidy;
  const farmerPayable = totalCost - totalSubsidy;
  const bankLoanAvail = Math.round(totalCost * 0.30);
  const upfrontDeposit = Math.max(0, farmerPayable - (category === 'general' ? bankLoanAvail : 0));

  return {
    hp,
    totalCost,
    centralSubsidy,
    stateSubsidy,
    totalSubsidy,
    subsidyPct: Math.round((totalSubsidy / totalCost) * 100),
    farmerPayable,
    bankLoanAvail,
    upfrontDeposit
  };
}

// Export functions to window
window.GOVT_SCHEMES_DB = GOVT_SCHEMES_DB;
window.renderGovtSchemes = renderGovtSchemes;
window.estimateSolarPumpSubsidy = estimateSolarPumpSubsidy;