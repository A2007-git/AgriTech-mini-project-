/**
 * AgriTech i18n Dictionary
 * Full bilingual support (English & Hindi)
 */

const I18N = {
  en: {
    brandSubtitle: "Smart Farming & Mandi Hub",
    urgentAlert: "Agro Advisory",
    listenBtn: "Voice",
    navWeather: "Weather & Agro-Met",
    navCrop: "Crop Advisory",
    navDoctor: "Plant Doctor",
    navMandi: "Mandi Bhav & Trends",
    navMarketplace: "Farmer Marketplace",
    navSchemes: "Govt Schemes & Tools",

    // Weather
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    rainChance: "Rain Risk (24h)",
    soilTemp: "Est. Soil Temp",
    sprayWindowTitle: "Chemical & Organic Spraying Window Planner",
    agroAdvisoryTitle: "Localized Agro-Meteorological Advisories",
    agroAdvisorySub: "Tailored agronomic recommendations based on upcoming 72-hour forecast",
    forecast7DayTitle: "7-Day Agriculture Weather Outlook",
    forecast7DaySub: "Plan your sowing, irrigation, fertilizer top-dressing, and harvesting",

    // Crop Advisory
    seasonFilterLabel: "Season:",
    categoryFilterLabel: "Crop Type:",
    allSeasons: "All Seasons",
    kharifSeason: "Kharif (Monsoon)",
    rabiSeason: "Rabi (Winter)",
    zaidSeason: "Zaid (Summer)",
    allCrops: "All Categories",
    cropMatcherBtn: "Soil-to-Crop Matcher",
    fertCalcTitle: "Fertilizer Dose Calculator",
    fertCalcDesc: "Calculate exact bags of Urea, DAP, MOP & Zinc for your land area.",
    organicRecipeTitle: "Organic Farming Formulations",
    organicRecipeDesc: "Prep steps for Jeevamrut, Neemastra & Beejamrit bio-fertilizers.",
    openCalculator: "Calculate",
    viewRecipes: "View Recipes",

    // Plant Doctor
    doctorBadge: "AI Crop Protection & Health Center",
    doctorHeading: "Instant Pest & Plant Disease Diagnostic",
    doctorSubheading: "Identify leaf spots, fungal rusts, stem borers, and wilts. Get immediate chemical dosage & organic treatments.",
    diagInputTitle: "Step 1: Select Crop & Symptoms",
    diagSelectCrop: "Select Crop:",
    diagAffectedPart: "Affected Plant Part:",
    partLeaf: "Leaves",
    partStem: "Stem / Stalk",
    partFruit: "Fruit / Pod / Grain",
    partRoot: "Root / Base",
    diagSymptoms: "Observed Visual Symptoms:",
    diagImageUpload: "Or Upload / Test Photo Sample:",
    dropzonePrompt: "Drop crop photo here or click to browse",
    quickSamples: "Try sample issues:",
    runDiagnosisBtn: "Run AI Disease Diagnosis",
    diagPlaceholderHeading: "Select Symptoms & Click Diagnose",
    diagPlaceholderText: "AgriTech AI Doctor will formulate chemical dosages, organic alternatives, and preventive cultural practices.",

    // Mandi
    mandiStateLabel: "State:",
    mandiCropLabel: "Commodity:",
    mandiProfitCalcBtn: "Transport & Net Profit Calculator",
    topGainer: "Top Gainer Today",
    totalArrivals: "Total Mandi Arrivals",
    mspComparison: "Govt MSP Benchmark",
    trendChartTitle: "Mandi Price Trend & AI Sell/Hold Recommendation",
    liveMandiTableTitle: "APMC Mandi Rates Directory (₹ per Quintal)",
    liveMandiTableSub: "Official daily modal, minimum, and maximum prices with MSP comparison",
    liveUpdated: "Live Updated",
    thCommodity: "Commodity / Crop",
    thMandi: "APMC Mandi",
    thState: "State",
    thMinPrice: "Min (₹/Q)",
    thMaxPrice: "Max (₹/Q)",
    thModalPrice: "Modal Price (₹/Q)",
    thMspDiff: "vs MSP",
    thTrend: "Trend",
    thAction: "Action",

    // Marketplace
    mktTag: "Zero Middlemen • Direct Farm Trade",
    mktHeading: "Farmer Direct Produce & Buyer Connect",
    mktSub: "List your harvest for sale or connect with verified food processors, exporters, and wholesale buyers across India.",
    postProduceBtn: "List Your Produce for Sale",
    availableHarvest: "Available Farmer Harvests",
    buyerDemands: "Verified Buyer Demands",

    // Schemes
    schemesHeading: "Major Government Agricultural Schemes & Subsidies",
    schemesSub: "Check eligibility, subsidy percentages, documents needed, and application links.",
    fertCalcCardHeading: "Farm Fertilizer Bag Calculator",
    fertCalcCardSub: "Calculate exact Urea, DAP, and MOP bags for your field",
    calcCrop: "Crop:",
    calcArea: "Land Area:",
    calcUnit: "Unit:",
    btnComputeDose: "Calculate Fertilizer Bags",
    solarCalcHeading: "PM-KUSUM Solar Pump Subsidy Estimator",
    solarCalcSub: "Estimate government grant vs farmer contribution",

    // Modals
    modalSellTitle: "Post Your Harvest for Sale",
    cropNameLabel: "Crop Name & Variety:",
    cropCatLabel: "Category:",
    quantityLabel: "Available Quantity:",
    expectedPriceLabel: "Expected Price (₹ / Quintal):",
    farmerNameLabel: "Farmer Name:",
    phoneLabel: "Phone / WhatsApp Number:",
    villageLabel: "Village / District:",
    harvestDateLabel: "Harvest Ready By:",
    isOrganicLabel: "Certified Organic / Residue Free Produce",
    cancelBtn: "Cancel",
    publishListingBtn: "Publish Listing",
    soilMatcherModalTitle: "Soil & Climate to Crop Matcher",
    profitModalTitle: "Mandi Transport & Net In-Hand Profit Calculator",
    organicModalTitle: "Natural & Bio-Fertilizer Preparation Recipes",

    // Footer
    footerTagline: "Empowering farmers with agro-intelligence, precision weather advisories, disease diagnosis, and fair market discovery.",
    quickLinksTitle: "Quick Resources",
    emergencyHelplinesTitle: "Agricultural Helplines"
  },

  hi: {
    brandSubtitle: "स्मार्ट कृषि व मंडी सलाहकार",
    urgentAlert: "कृषि मौसम सलाह",
    listenBtn: "सुनें (आवाज)",
    navWeather: "मौसम व कृषि सलाह",
    navCrop: "फसल प्रबंधन",
    navDoctor: "पौधा डॉक्टर",
    navMandi: "मंडी भाव व ट्रेंड्स",
    navMarketplace: "किसान डायरेक्ट बाज़ार",
    navSchemes: "सरकारी योजनाएं व टूल्स",

    // Weather
    humidity: "हवा में नमी",
    windSpeed: "हवा की गति",
    rainChance: "बारिश की संभावना",
    soilTemp: "मिट्टी का तापमान",
    sprayWindowTitle: "कीटनाशक व खाद छिड़काव समय सारिणी",
    agroAdvisoryTitle: "क्षेत्रीय कृषि-मौसम परामर्श",
    agroAdvisorySub: "आगामी 72 घंटों के मौसम के आधार पर सटीक खेती सलाह",
    forecast7DayTitle: "7-दिवसीय कृषि मौसम पूर्वानुमान",
    forecast7DaySub: "बुवाई, सिंचाई, यूरिया छिड़काव और कटाई की अग्रिम योजना बनाएं",

    // Crop Advisory
    seasonFilterLabel: "मौसम:",
    categoryFilterLabel: "फसल का प्रकार:",
    allSeasons: "सभी मौसम",
    kharifSeason: "खरीफ (मानसून)",
    rabiSeason: "रबी (सर्दियां)",
    zaidSeason: "जायद (गर्मी)",
    allCrops: "सभी श्रेणियां",
    cropMatcherBtn: "मिट्टी अनुसार फसल चयन",
    fertCalcTitle: "उर्वरक मात्रा कैलकुलेटर",
    fertCalcDesc: "अपने खेत के लिए यूरिया, डीएपी, एमओपी और जिंक की सही बोरियां जानें।",
    organicRecipeTitle: "जैविक खाद व कीटनाशक विधियां",
    organicRecipeDesc: "जीवामृत, नीमास्त्र और बीजामृत बनाने की संपूर्ण विधि।",
    openCalculator: "कैलकुलेट करें",
    viewRecipes: "विधियां देखें",

    // Plant Doctor
    doctorBadge: "AI फसल सुरक्षा व स्वास्थ्य केंद्र",
    doctorHeading: "कीट एवं पादप रोग त्वरित निदान",
    doctorSubheading: "पत्तियों के धब्बे, फफूंद, तना छेदक और उकठा रोग की तुरंत पहचान करें। सटीक दवा और जैविक उपचार पाएं।",
    diagInputTitle: "चरण 1: फसल और लक्षण चुनें",
    diagSelectCrop: "फसल चुनें:",
    diagAffectedPart: "प्रभावित भाग:",
    partLeaf: "पत्तियां",
    partStem: "तना / शाखाएं",
    partFruit: "फल / फली / दाना",
    partRoot: "जड़ / तने का आधार",
    diagSymptoms: "दिखाई दे रहे मुख्य लक्षण:",
    diagImageUpload: "या पौधे की फोटो अपलोड/टेस्ट करें:",
    dropzonePrompt: "रोगग्रस्त पौधे की फोटो यहां डालें या क्लिक करें",
    quickSamples: "नमूना रोग जांचें:",
    runDiagnosisBtn: "AI रोग निदान शुरू करें",
    diagPlaceholderHeading: "लक्षण चुनें और रोग निदान पर क्लिक करें",
    diagPlaceholderText: "AgriTech पौधा डॉक्टर रासायनिक खुराक, जैविक विकल्प और रोकथाम के उपाय सुझाएगा।",

    // Mandi
    mandiStateLabel: "राज्य:",
    mandiCropLabel: "फसल/जिंस:",
    mandiProfitCalcBtn: "परिवहन व शुद्ध मुनाफा कैलकुलेटर",
    topGainer: "आज सबसे ज्यादा बढ़त",
    totalArrivals: "कुल मंडी आवक",
    mspComparison: "सरकारी एमएसपी (MSP) तुलना",
    trendChartTitle: "मंडी भाव ग्राफ व AI बेचने/रोकने की सलाह",
    liveMandiTableTitle: "एपीएमसी मंडी भाव सूची (₹ प्रति क्विंटल)",
    liveMandiTableSub: "दैनिक मॉडल, न्यूनतम और अधिकतम भाव व न्यूनतम समर्थन मूल्य (MSP) तुलना",
    liveUpdated: "लाइव अपडेटेड",
    thCommodity: "फसल / कमोडिटी",
    thMandi: "मंडी",
    thState: "राज्य",
    thMinPrice: "न्यूनतम (₹)",
    thMaxPrice: "अधिकतम (₹)",
    thModalPrice: "मॉडल भाव (₹)",
    thMspDiff: "MSP अंतर",
    thTrend: "रुझान",
    thAction: "एक्शन",

    // Marketplace
    mktTag: "बिना बिचौलिए • सीधा किसान व्यापार",
    mktHeading: "किसान सीधी उपज बिक्री एवं खरीदार संपर्क",
    mktSub: "अपनी उपज सीधे बेचें या प्रमाणित खाद्य प्रसंस्करण कंपनियों और थोक खरीदारों से जुड़ें।",
    postProduceBtn: "अपनी फसल बेचने के लिए दर्ज करें",
    availableHarvest: "उपलब्ध किसान उपज",
    buyerDemands: "सत्यापित खरीदार मांगें",

    // Schemes
    schemesHeading: "प्रमुख सरकारी कृषि योजनाएं व सब्सिडी",
    schemesSub: "पात्रता, सब्सिडी प्रतिशत, आवश्यक दस्तावेज और सीधे आवेदन लिंक देखें।",
    fertCalcCardHeading: "खेत उर्वरक बोरी कैलकुलेटर",
    fertCalcCardSub: "अपने खेत के रकबे के लिए यूरिया, डीएपी व पोटाश की सटीक बोरियां निकालें",
    calcCrop: "फसल:",
    calcArea: "रकबा (क्षेत्रफल):",
    calcUnit: "इकाई:",
    btnComputeDose: "उर्वरक बोरियां निकालें",
    solarCalcHeading: "पीएम-कुसुम सोलर पंप सब्सिडी कैलकुलेटर",
    solarCalcSub: "सरकारी अनुदान व किसान अंशदान का अनुमान लगाएं",

    // Modals
    modalSellTitle: "अपनी उपज बिक्री के लिए पोस्ट करें",
    cropNameLabel: "फसल का नाम व किस्म:",
    cropCatLabel: "श्रेणी:",
    quantityLabel: "उपलब्ध मात्रा:",
    expectedPriceLabel: "अपेक्षित भाव (₹ / क्विंटल):",
    farmerNameLabel: "किसान का नाम:",
    phoneLabel: "फोन / व्हाट्सएप नंबर:",
    villageLabel: "गांव / जिला:",
    harvestDateLabel: "उपज तैयार होने की तिथि:",
    isOrganicLabel: "प्रमाणित प्राकृतिक / जैविक उपज",
    cancelBtn: "रद्द करें",
    publishListingBtn: "लिस्टिंग प्रकाशित करें",
    soilMatcherModalTitle: "मिट्टी और जलवायु अनुसार फसल चयन",
    profitModalTitle: "मंडी परिवहन एवं शुद्ध हाथ में मुनाफा कैलकुलेटर",
    organicModalTitle: "प्राकृतिक व जैविक खाद बनाने की विधियां",

    // Footer
    footerTagline: "सटीक मौसम सलाह, रोग निदान, उचित मंडी भाव और तकनीक से किसान सशक्तिकरण।",
    quickLinksTitle: "महत्वपूर्ण लिंक",
    emergencyHelplinesTitle: "कृषि हेल्पलाइन नंबर"
  }
};

window.I18N = I18N;
window.currentLang = 'en';

function applyTranslations(lang) {
  window.currentLang = lang;
  const dict = I18N[lang] || I18N.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  const langLabel = document.getElementById('current-lang-label');
  if (langLabel) {
    langLabel.textContent = lang === 'en' ? 'English' : 'हिंदी';
  }
}
window.applyTranslations = applyTranslations;