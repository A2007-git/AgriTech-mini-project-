/**
 * AgriTech Weather & Agro-Meteorological Engine
 * Connects to Open-Meteo API with offline agronomic fallback
 */

const REGION_COORDINATES = {
  nagpur: { name: "Nagpur, Maharashtra", lat: 21.1458, lon: 79.0882, primaryCrop: "Nagpur Orange / Soybean / Cotton" },
  ludhiana: { name: "Ludhiana, Punjab", lat: 30.9010, lon: 75.8573, primaryCrop: "Wheat / Paddy" },
  karnal: { name: "Karnal, Haryana", lat: 29.6857, lon: 76.9905, primaryCrop: "Basmati Paddy / Wheat" },
  nashik: { name: "Nashik, Maharashtra", lat: 19.9975, lon: 73.7898, primaryCrop: "Onion / Grapes / Soybean" },
  indore: { name: "Indore, Madhya Pradesh", lat: 22.7196, lon: 75.8577, primaryCrop: "Soybean / Wheat / Gram" },
  rajkot: { name: "Rajkot, Gujarat", lat: 22.3039, lon: 70.8022, primaryCrop: "Cotton / Groundnut" },
  varanasi: { name: "Varanasi, Uttar Pradesh", lat: 25.3176, lon: 82.9739, primaryCrop: "Vegetables / Paddy / Wheat" },
  guntur: { name: "Guntur, Andhra Pradesh", lat: 16.3067, lon: 80.4365, primaryCrop: "Chili / Cotton / Tobacco" },
  mandya: { name: "Mandya, Karnataka", lat: 12.5218, lon: 76.8951, primaryCrop: "Sugarcane / Paddy" },
  salem: { name: "Salem, Tamil Nadu", lat: 11.6643, lon: 78.1460, primaryCrop: "Tapioca / Turmeric / Paddy" },
  patna: { name: "Patna, Bihar", lat: 25.5941, lon: 85.1376, primaryCrop: "Maize / Pulses / Rice" },
  jaipur: { name: "Jaipur, Rajasthan", lat: 26.9124, lon: 75.7873, primaryCrop: "Mustard / Bajra / Pulses" },
  bhubaneswar: { name: "Bhubaneswar, Odisha", lat: 20.2961, lon: 85.8245, primaryCrop: "Paddy / Vegetables" }
};

let currentWeatherState = {
  regionKey: 'nashik',
  locationName: 'Nashik, Maharashtra',
  temp: 28,
  humidity: 65,
  windSpeed: 11,
  rainProb: 15,
  soilTemp: 24,
  condition: 'Partly Cloudy',
  spraySafe: true,
  dailyForecast: [],
  hourlySpray: [],
  advisories: []
};

// Fetch real-time weather from Open-Meteo API
async function fetchWeatherData(regionKey) {
  const coords = REGION_COORDINATES[regionKey] || REGION_COORDINATES['nashik'];
  currentWeatherState.regionKey = regionKey;
  currentWeatherState.locationName = coords.name;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`;
    
    const response = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!response.ok) throw new Error('API fetch failed');
    
    const data = await response.json();
    parseLiveWeather(data, coords);
  } catch (err) {
    console.warn("Using offline simulated agro-met data for", coords.name, err);
    generateSimulatedWeather(coords);
  }

  renderWeatherUI();
}

function parseLiveWeather(data, coords) {
  const cur = data.current;
  const temp = Math.round(cur.temperature_2m);
  const humidity = Math.round(cur.relative_humidity_2m);
  const wind = Math.round(cur.wind_speed_10m);
  const weatherCode = cur.weather_code;

  let condition = "Clear & Sunny";
  if (weatherCode >= 1 && weatherCode <= 3) condition = "Partly Cloudy";
  else if (weatherCode >= 45 && weatherCode <= 48) condition = "Foggy / Mist";
  else if (weatherCode >= 51 && weatherCode <= 67) condition = "Light Rain / Showers";
  else if (weatherCode >= 80 && weatherCode <= 99) condition = "Thunderstorm / Heavy Rain";

  const hourlyPrecip = data.hourly.precipitation_probability ? data.hourly.precipitation_probability.slice(0, 24) : [];
  const rainProb = hourlyPrecip.length ? Math.max(...hourlyPrecip.slice(0, 12)) : 10;
  const soilTemp = Math.max(16, Math.round(temp - 3));

  // Compute spraying window for next 24h in 3-hour blocks
  const hourlySpray = [];
  for (let i = 0; i < 8; i++) {
    const hIdx = i * 3;
    const hWind = data.hourly.wind_speed_10m ? data.hourly.wind_speed_10m[hIdx] : 10;
    const hRain = data.hourly.precipitation_probability ? data.hourly.precipitation_probability[hIdx] : 10;
    const hHum = data.hourly.relative_humidity_2m ? data.hourly.relative_humidity_2m[hIdx] : 60;
    const hourLabel = `${((new Date().getHours() + hIdx) % 24).toString().padStart(2, '0')}:00`;

    let status = 'optimal';
    let label = 'Optimal';
    if (hWind > 18 || hRain > 40) {
      status = 'risky';
      label = 'Avoid';
    } else if (hWind > 12 || hRain > 20 || hHum > 85) {
      status = 'moderate';
      label = 'Moderate';
    }

    hourlySpray.push({ time: hourLabel, status, label });
  }

  // 7-day forecast
  const daily = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = i === 0 ? 'Today' : days[d.getDay()];
    const dateStr = `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
    const maxT = Math.round(data.daily.temperature_2m_max[i]);
    const minT = Math.round(data.daily.temperature_2m_min[i]);
    const rainP = data.daily.precipitation_probability_max ? data.daily.precipitation_probability_max[i] : 10;
    const code = data.daily.weather_code[i];

    let iconClass = 'fa-sun text-amber';
    if (code >= 1 && code <= 3) iconClass = 'fa-cloud-sun text-blue';
    else if (code >= 51 && code <= 67) iconClass = 'fa-cloud-rain text-blue';
    else if (code >= 80) iconClass = 'fa-cloud-bolt text-indigo';

    daily.push({ dayName, dateStr, maxT, minT, rainP, iconClass, isToday: i === 0 });
  }

  currentWeatherState = {
    ...currentWeatherState,
    temp,
    humidity,
    windSpeed: wind,
    rainProb,
    soilTemp,
    condition,
    spraySafe: wind < 15 && rainProb < 25,
    dailyForecast: daily,
    hourlySpray,
    advisories: generateAgroAdvisories(temp, humidity, rainProb, wind, coords)
  };
}

function generateSimulatedWeather(coords) {
  const baseTemps = {
    nagpur: 32, ludhiana: 31, karnal: 30, nashik: 28, indore: 29, rajkot: 33,
    varanasi: 32, guntur: 34, mandya: 27, salem: 31, patna: 31, jaipur: 35, bhubaneswar: 30
  };
  const temp = (baseTemps[currentWeatherState.regionKey] || 29) + Math.floor(Math.random() * 3 - 1);
  const humidity = 62 + Math.floor(Math.random() * 15);
  const wind = 9 + Math.floor(Math.random() * 8);
  const rainProb = 15 + Math.floor(Math.random() * 20);
  const soilTemp = temp - 4;

  const hourlySpray = [
    { time: '06:00', status: 'optimal', label: 'Optimal' },
    { time: '09:00', status: 'optimal', label: 'Optimal' },
    { time: '12:00', status: 'moderate', label: 'High Heat' },
    { time: '15:00', status: 'moderate', label: 'Breeze' },
    { time: '18:00', status: 'optimal', label: 'Optimal' },
    { time: '21:00', status: 'optimal', label: 'Safe' },
    { time: '00:00', status: 'optimal', label: 'Safe' },
    { time: '03:00', status: 'optimal', label: 'Safe' }
  ];

  const days = ['Today', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daily = days.map((dayName, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      dayName: i === 0 ? 'Today' : dayName,
      dateStr: `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`,
      maxT: temp + (i % 2 === 0 ? 1 : -1),
      minT: temp - 8,
      rainP: Math.max(10, (rainProb + i * 5) % 60),
      iconClass: i % 3 === 0 ? 'fa-cloud-sun text-blue' : 'fa-sun text-amber',
      isToday: i === 0
    };
  });

  currentWeatherState = {
    ...currentWeatherState,
    temp,
    humidity,
    windSpeed: wind,
    rainProb,
    soilTemp,
    condition: 'Partly Cloudy • Good for Field Activities',
    spraySafe: wind < 15 && rainProb < 30,
    dailyForecast: daily,
    hourlySpray,
    advisories: generateAgroAdvisories(temp, humidity, rainProb, wind, coords)
  };
}

function generateAgroAdvisories(temp, humidity, rainProb, wind, coords) {
  const list = [];

  // Advisory 1: Sowing & Irrigation
  if (rainProb > 50) {
    list.push({
      crop: coords.primaryCrop,
      icon: "fa-droplet-slash",
      priority: "high",
      title: "Heavy Rain Forecast: Pause Irrigation & Urea Top-Dressing",
      titleHi: "भारी बारिश की संभावना: सिंचाई और यूरिया छिड़काव स्थगित करें",
      desc: `High probability of rainfall (${rainProb}%). Delay open canal irrigation and urea broadcasting to avoid nutrient leaching. Ensure field drainage channels are cleared to prevent waterlogging.`,
      descHi: `आगामी दिनों में बारिश की संभावना (${rainProb}%) है। यूरिया का बुरकाव और खुली सिंचाई रोकें ताकि पोषक तत्व न बहें। जलभराव रोकने के लिए जलनिकासी नाली साफ रखें।`,
      action: "Clear field bunds & drainage outlets"
    });
  } else {
    list.push({
      crop: coords.primaryCrop,
      icon: "fa-faucet-drip",
      priority: "normal",
      title: "Favorable Moisture: Schedule Drip Irrigation & Sowing",
      titleHi: "अनुकूल नमी: ड्रिप सिंचाई व बुवाई कार्य संचालित करें",
      desc: `Optimal soil temperature (${temp - 4}°C) and steady weather. Provide light irrigation during morning (6-9 AM) or evening hours. Ideal time for land preparation and sowing.`,
      descHi: `मिट्टी का तापमान (${temp - 4}°C) अनुकूल है। सुबह 6 से 9 बजे या शाम को हल्की सिंचाई दें। खेत की जुताई और बुवाई के लिए मौसम बिल्कुल उपयुक्त है।`,
      action: "Maintain optimal root zone moisture"
    });
  }

  // Advisory 2: Pest & Disease Risk Alert
  if (humidity > 70 && temp >= 24) {
    list.push({
      crop: "Vegetables, Cotton & Pulses",
      icon: "fa-shield-virus",
      priority: "high",
      title: "High Humidity Alert: Risk of Fungal Blight & Sucking Pests",
      titleHi: "उच्च आर्द्रता चेतावनी: फफूंद जनित झुलसा व रस चूसक कीटों का खतरा",
      desc: `Relative humidity is high (${humidity}%). Monitor crops closely for Downy Mildew, Blast, and Whitefly/Aphid infestation. Apply prophylactic neem oil (5ml/L) or Trichoderma.`,
      descHi: `हवा में नमी (${humidity}%) अधिक होने से पत्तियों पर धब्बे, झुलसा और सफेद मक्खी/माहो का प्रकोप हो सकता है। रोकथाम हेतु 5 मिली नीम तेल प्रति लीटर पानी का छिड़काव करें।`,
      action: "Spray Neem Oil (1500 PPM) or Mancozeb 75% WP"
    });
  } else {
    list.push({
      crop: "All Standing Crops",
      icon: "fa-seedling",
      priority: "normal",
      title: "Crop Growth Stage: Apply Micronutrient Zinc & Boron",
      titleHi: "फसल वृद्धि अवस्था: सूक्ष्म पोषक तत्व जिंक व बोरॉन का प्रयोग करें",
      desc: "Vegetative and flowering stages require micronutrients. Foliar spray of Chelated Zinc (0.5g/L) and 19:19:19 NPK improves chlorophyll synthesis and flower retention.",
      descHi: "वानस्पतिक व फूल आने की अवस्था में चिलेटेड जिंक (0.5 ग्राम/लीटर) और एनपीके 19:19:19 का छिड़काव करें जिससे फूलों का झड़ना रुकेगा और पैदावार बढ़ेगी।",
      action: "Foliar application during calm weather hours"
    });
  }

  // Advisory 3: Spraying & Field Machinery
  if (wind < 14) {
    list.push({
      crop: "Chemical & Bio Spraying",
      icon: "fa-spray-can-sparkles",
      priority: "good",
      title: "Spraying Conditions: Safe Window Available (Next 6-8 Hours)",
      titleHi: "छिड़काव अनुकूलता: अगले 6-8 घंटे छिड़काव के लिए सर्वोत्तम",
      desc: `Wind speed is low (${wind} km/h), ensuring zero drift and maximum droplet absorption. Conduct herbicide, insecticide, and growth promoter spraying safely.`,
      descHi: `हवा की गति (${wind} किमी/घंटा) शांत है जिससे दवा हवा में बर्बाद नहीं होगी। खरपतवारनाशक, कीटनाशक और टॉनिक का छिड़काव सुरक्षित रूप से करें।`,
      action: "Use flat fan nozzle & clean water"
    });
  }

  return list;
}

function renderWeatherUI() {
  const state = currentWeatherState;
  const isHindi = window.currentLang === 'hi';

  // Current stats
  const tempEl = document.getElementById('current-temp');
  const descEl = document.getElementById('current-weather-desc');
  const locEl = document.getElementById('weather-location-name');
  const humEl = document.getElementById('current-humidity');
  const windEl = document.getElementById('current-wind');
  const rainEl = document.getElementById('current-rain-prob');
  const soilEl = document.getElementById('current-soil-temp');
  const tickerText = document.getElementById('ticker-text');

  if (tempEl) tempEl.textContent = state.temp;
  if (descEl) descEl.textContent = state.condition;
  if (locEl) locEl.textContent = state.locationName;
  if (humEl) humEl.textContent = `${state.humidity}%`;
  if (windEl) windEl.textContent = `${state.windSpeed} km/h`;
  if (rainEl) rainEl.textContent = `${state.rainProb}%`;
  if (soilEl) soilEl.textContent = `${state.soilTemp}°C`;

  if (tickerText && state.advisories.length > 0) {
    const firstAdv = state.advisories[0];
    tickerText.textContent = isHindi ? firstAdv.titleHi : firstAdv.title;
  }

  // Spraying status badge
  const sprayBadge = document.getElementById('spray-status-badge');
  const sprayDesc = document.getElementById('spray-advice-text');
  if (sprayBadge && sprayDesc) {
    if (state.spraySafe) {
      sprayBadge.className = 'badge badge-success';
      sprayBadge.textContent = isHindi ? 'छिड़काव के लिए सर्वोत्तम समय' : 'Optimal for Spraying';
      sprayDesc.textContent = isHindi
        ? `हवा की गति (${state.windSpeed} किमी/घं) और बारिश का कम जोखिम अगले 6 घंटों को कीटनाशक/उर्वरक छिड़काव के लिए आदर्श बनाते हैं।`
        : `Current wind speed (${state.windSpeed} km/h) and low rain risk (${state.rainProb}%) make next 6 hours ideal for pesticide/foliar spraying.`;
    } else {
      sprayBadge.className = 'badge badge-warning';
      sprayBadge.textContent = isHindi ? 'छिड़काव में सावधानी बरतें' : 'Caution / High Wind or Rain';
      sprayDesc.textContent = isHindi
        ? 'हवा की तेज गति या बारिश के जोखिम के कारण छिड़काव टालें ताकि दवा व्यर्थ न बहे।'
        : 'High wind speed or elevated rain risk detected. Postpone foliar spraying to prevent chemical runoff or drift.';
    }
  }

  // Hourly timeline bar
  const timelineEl = document.getElementById('spray-hourly-bar');
  if (timelineEl && state.hourlySpray) {
    timelineEl.innerHTML = state.hourlySpray.map(slot => `
      <div class="spray-slot ${slot.status}">
        <span class="spray-slot-time">${slot.time}</span>
        <span>${slot.label}</span>
      </div>
    `).join('');
  }

  // Advisories cards
  const advContainer = document.getElementById('weather-advisory-container');
  if (advContainer) {
    advContainer.innerHTML = state.advisories.map(adv => `
      <div class="advisory-card">
        <div class="advisory-card-top">
          <span class="advisory-crop-tag"><i class="fa-solid ${adv.icon}"></i> ${adv.crop}</span>
          <span class="badge ${adv.priority === 'high' ? 'badge-danger' : 'badge-success'}">${adv.priority === 'high' ? 'High Priority' : 'Advisory'}</span>
        </div>
        <h3 class="advisory-title">${isHindi ? adv.titleHi : adv.title}</h3>
        <p class="advisory-text">${isHindi ? adv.descHi : adv.desc}</p>
        <div class="advisory-action-list">
          <strong><i class="fa-solid fa-arrow-right"></i> Recommended Action:</strong> ${adv.action}
        </div>
      </div>
    `).join('');
  }

  // 7-day forecast cards
  const forecastContainer = document.getElementById('forecast-week-container');
  if (forecastContainer && state.dailyForecast) {
    forecastContainer.innerHTML = state.dailyForecast.map(day => `
      <div class="forecast-day-card ${day.isToday ? 'today' : ''}">
        <span class="forecast-date">${day.dayName}</span>
        <span style="font-size:0.75rem; color:var(--slate-500);">${day.dateStr}</span>
        <i class="fa-solid ${day.iconClass} forecast-icon"></i>
        <div class="forecast-temps">
          <span>${day.maxT}°</span> / <span class="min-temp">${day.minT}°</span>
        </div>
        <span class="forecast-rain-prob"><i class="fa-solid fa-droplet"></i> ${day.rainP}%</span>
      </div>
    `).join('');
  }
}

// Read advisory text via Web Speech API
function readWeatherAdvisoryAloud() {
  if (!('speechSynthesis' in window)) {
    alert("Text-to-speech is not supported on this browser.");
    return;
  }

  const isHindi = window.currentLang === 'hi';
  let speechText = "";

  if (isHindi) {
    speechText = `AgriTech मौसम और कृषि परामर्श। ${currentWeatherState.locationName} में वर्तमान तापमान ${currentWeatherState.temp} डिग्री सेल्सियस है। हवा में नमी ${currentWeatherState.humidity} प्रतिशत है। `;
    currentWeatherState.advisories.forEach((adv, i) => {
      speechText += `सलाह नंबर ${i + 1}: ${adv.titleHi}। ${adv.descHi}। `;
    });
  } else {
    speechText = `AgriTech Weather and Agro Advisory. Current temperature in ${currentWeatherState.locationName} is ${currentWeatherState.temp} degrees Celsius, with humidity ${currentWeatherState.humidity} percent. `;
    currentWeatherState.advisories.forEach((adv, i) => {
      speechText += `Advisory ${i + 1}: ${adv.title}. ${adv.desc}. `;
    });
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.lang = isHindi ? 'hi-IN' : 'en-US';
  utterance.rate = 0.95;
  
  const btn = document.getElementById('btn-voice-assist');
  if (btn) btn.classList.add('active-speaking');

  utterance.onend = () => {
    if (btn) btn.classList.remove('active-speaking');
  };

  window.speechSynthesis.speak(utterance);
}

// Export functions to window
window.fetchWeatherData = fetchWeatherData;
window.renderWeatherUI = renderWeatherUI;
window.readWeatherAdvisoryAloud = readWeatherAdvisoryAloud;
window.currentWeatherState = currentWeatherState;