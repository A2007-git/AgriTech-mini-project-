/**
 * AgriTech Farmer Marketplace & Direct Trade Engine
 * Direct produce sales, buyer procurement requests, WhatsApp integration, and localStorage
 */

const DEFAULT_FARMER_LISTINGS = [
  {
    id: "lst_101",
    crop: "Sharbati Golden Wheat (शरबती गेहूं)",
    category: "Cereals",
    variety: "C-306 Traditional Desi",
    quantity: "60 Quintals",
    price: 2850,
    farmer: "Rameshwar Patil",
    village: "Niphad, Nashik (Maharashtra)",
    phone: "9823012345",
    harvestDate: "Ready for Dispatch",
    isOrganic: true,
    created: "Today"
  },
  {
    id: "lst_102",
    crop: "Red Globe Onion (लाल प्याज)",
    category: "Vegetables",
    variety: "Pusa Red Medium-Large",
    quantity: "120 Quintals",
    price: 2500,
    farmer: "Baldev Singh",
    village: "Lasalgaon, Nashik (Maharashtra)",
    phone: "9876543210",
    harvestDate: "Grade-A Sun-Dried",
    isOrganic: false,
    created: "Yesterday"
  },
  {
    id: "lst_103",
    crop: "Bt Cotton - Shankar 6 (कपास)",
    category: "Cash Crops",
    variety: "Long Staple (29mm)",
    quantity: "35 Quintals",
    price: 7600,
    farmer: "Kishorbhai Patel",
    village: "Gondal, Rajkot (Gujarat)",
    phone: "9426189012",
    harvestDate: "First Clean Picking",
    isOrganic: false,
    created: "2 days ago"
  },
  {
    id: "lst_104",
    crop: "Organic Yellow Soybean (सोयाबीन)",
    category: "Oilseeds",
    variety: "JS-9560 Certified Organic",
    quantity: "80 Quintals",
    price: 5200,
    farmer: "Dinesh Malviya",
    village: "Sanwer, Indore (Madhya Pradesh)",
    phone: "9179045678",
    harvestDate: "10% Moisture Double Cleaned",
    isOrganic: true,
    created: "3 days ago"
  },
  {
    id: "lst_105",
    crop: "G-4 Hot Red Chili (लाल तीखी मिर्च)",
    category: "Fruits & Spices",
    variety: "Teja / Guntur Sannam",
    quantity: "25 Quintals",
    price: 19500,
    farmer: "Venkata Rao",
    village: "Tenali, Guntur (Andhra Pradesh)",
    phone: "9848011223",
    harvestDate: "Sun-Cured Deep Red",
    isOrganic: true,
    created: "Today"
  }
];

const DEFAULT_BUYER_DEMANDS = [
  {
    id: "dem_201",
    company: "Patanjali Agro Foods Ltd.",
    cropNeeded: "Certified Organic Wheat & Mustard",
    requiredVolume: "500 Quintals",
    offerPrice: "₹2,950 / Quintal",
    deliveryLocation: "Haridwar / Alwar Processing Plant",
    contactPerson: "Mr. Ajay Sharma (Procurement Head)",
    phone: "9810012345",
    paymentTerms: "100% RTGS within 48 hours of gate receipt"
  },
  {
    id: "dem_202",
    company: "ITC Choupal Fresh / Aashirvaad",
    cropNeeded: "Sharbati & Lok-1 Milling Wheat",
    requiredVolume: "1,200 Quintals",
    offerPrice: "₹2,750 / Quintal",
    deliveryLocation: "Sehore / Indore Hub",
    contactPerson: "Rajeev Verma (Agri Sourcing)",
    phone: "9826078901",
    paymentTerms: "Direct Bank Transfer on delivery"
  },
  {
    id: "dem_203",
    company: "Mother Dairy / Safal F&V",
    cropNeeded: "Nashik Red Onion (Medium 45mm+)",
    requiredVolume: "300 Quintals / Week",
    offerPrice: "₹2,650 / Quintal",
    deliveryLocation: "Mangolpuri Collection Center, Delhi",
    contactPerson: "S. K. Gupta",
    phone: "9811234567",
    paymentTerms: "Direct Farmer Account Transfer"
  },
  {
    id: "dem_204",
    company: "Vardhman Textiles Ginning Mill",
    cropNeeded: "Bt Cotton Shankar-6 (Moisture < 8%)",
    requiredVolume: "800 Quintals",
    offerPrice: "₹7,650 / Quintal",
    deliveryLocation: "Ludhiana / Bathinda Mills",
    contactPerson: "Gurpreet Singh",
    phone: "9872034567",
    paymentTerms: "Instant spot payment after testing"
  }
];

// Load listings from localStorage or defaults
function getFarmerListings() {
  const saved = localStorage.getItem('agritech_farmer_listings');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.warn("Error parsing saved listings", e);
    }
  }
  return DEFAULT_FARMER_LISTINGS;
}

function saveFarmerListings(listings) {
  localStorage.setItem('agritech_farmer_listings', JSON.stringify(listings));
}

// Render Farmer Listings Grid
function renderMarketplaceListings(type = 'farmer') {
  const container = document.getElementById('marketplace-listings-grid');
  if (!container) return;

  const countFarmerEl = document.getElementById('count-farmer-listings');
  const countBuyerEl = document.getElementById('count-buyer-demands');

  const farmerListings = getFarmerListings();
  if (countFarmerEl) countFarmerEl.textContent = farmerListings.length;
  if (countBuyerEl) countBuyerEl.textContent = DEFAULT_BUYER_DEMANDS.length;

  if (type === 'farmer') {
    container.innerHTML = farmerListings.map(item => {
      const waMsg = encodeURIComponent(`Namaste ${item.farmer} ji, I saw your listing for ${item.crop} (${item.quantity}) at ₹${item.price}/Q on AgriTech portal. I am interested in purchasing. Please share details.`);
      
      return `
        <div class="mkt-card">
          <div class="mkt-card-header">
            <div>
              ${item.isOrganic ? '<span class="badge badge-success" style="margin-bottom:4px;"><i class="fa-solid fa-leaf"></i> Organic / Residue Free</span>' : ''}
              <h3 class="mkt-crop-title">${item.crop}</h3>
              <p class="mkt-farmer-info"><i class="fa-solid fa-user-circle"></i> Farmer: ${item.farmer}</p>
            </div>
            <div class="mkt-price-badge">
              ₹${item.price.toLocaleString('en-IN')}
              <span class="mkt-price-unit">per Quintal</span>
            </div>
          </div>

          <ul class="mkt-details-list">
            <li><i class="fa-solid fa-boxes-stacked text-green"></i> <strong>Available Quantity:</strong> ${item.quantity}</li>
            <li><i class="fa-solid fa-location-dot text-amber"></i> <strong>Location:</strong> ${item.village}</li>
            <li><i class="fa-solid fa-clock text-blue"></i> <strong>Status:</strong> ${item.harvestDate}</li>
          </ul>

          <div class="mkt-actions">
            <a href="https://api.whatsapp.com/send?phone=91${item.phone}&text=${waMsg}" target="_blank" rel="noopener" class="btn-whatsapp">
              <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
            </a>
            <a href="tel:${item.phone}" class="btn-call">
              <i class="fa-solid fa-phone"></i> Call Farmer
            </a>
          </div>
        </div>
      `;
    }).join('');
  } else {
    // Render Buyer Demands
    container.innerHTML = DEFAULT_BUYER_DEMANDS.map(item => {
      const waMsg = encodeURIComponent(`Namaste, I am a farmer on AgriTech portal. I can supply ${item.cropNeeded} for your requirement at ${item.offerPrice}. Let's discuss dispatch.`);

      return `
        <div class="mkt-card" style="border-left: 4px solid var(--blue-600);">
          <div class="mkt-card-header">
            <div>
              <span class="badge badge-info" style="margin-bottom:4px;"><i class="fa-solid fa-building-circle-check"></i> Verified Buyer Demand</span>
              <h3 class="mkt-crop-title">${item.company}</h3>
              <p class="mkt-farmer-info"><i class="fa-solid fa-user-tie"></i> Contact: ${item.contactPerson}</p>
            </div>
            <div class="mkt-price-badge" style="background-color:var(--blue-50); border-color:var(--blue-200); color:var(--blue-900);">
              ${item.offerPrice}
              <span class="mkt-price-unit">Target Buy Price</span>
            </div>
          </div>

          <ul class="mkt-details-list">
            <li><i class="fa-solid fa-wheat-awn text-primary"></i> <strong>Produce Required:</strong> ${item.cropNeeded}</li>
            <li><i class="fa-solid fa-scale-balanced text-amber"></i> <strong>Required Volume:</strong> ${item.requiredVolume}</li>
            <li><i class="fa-solid fa-truck-ramp-box text-blue"></i> <strong>Delivery Hub:</strong> ${item.deliveryLocation}</li>
            <li><i class="fa-solid fa-money-bill-wave text-green"></i> <strong>Payment Terms:</strong> ${item.paymentTerms}</li>
          </ul>

          <div class="mkt-actions">
            <a href="https://api.whatsapp.com/send?phone=91${item.phone}&text=${waMsg}" target="_blank" rel="noopener" class="btn-whatsapp">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp Sourcing
            </a>
            <a href="tel:${item.phone}" class="btn-call">
              <i class="fa-solid fa-phone"></i> Call Buyer
            </a>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Add New Farmer Listing from Form
function addNewFarmerListing(listingData) {
  const currentListings = getFarmerListings();
  const newEntry = {
    id: "lst_" + Date.now(),
    crop: listingData.cropName,
    category: listingData.category,
    variety: "Farmer Direct Harvest",
    quantity: `${listingData.quantity} ${listingData.unit}`,
    price: parseFloat(listingData.price),
    farmer: listingData.farmerName,
    village: listingData.village,
    phone: listingData.phone,
    harvestDate: `Ready by ${listingData.harvestDate}`,
    isOrganic: listingData.isOrganic,
    created: "Just now"
  };

  currentListings.unshift(newEntry);
  saveFarmerListings(currentListings);
  renderMarketplaceListings('farmer');
}

// Export functions to window
window.renderMarketplaceListings = renderMarketplaceListings;
window.addNewFarmerListing = addNewFarmerListing;
window.getFarmerListings = getFarmerListings;