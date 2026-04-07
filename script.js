/* 
 * Ready-Yet? Digital Creator Compliance Engine
 * Governance: Archer Chain Analytics / Mahihkan Ecosystem
 * Motto: INEXORABILIS
 */

const creatorTypes = [
  "Video (YouTube/TikTok)", "Audio (Podcast/Music)", "Visual Art/NFTs", 
  "Literature/Substack", "Digital Services/Coding", "Physical Goods/E-commerce"
];

const regions = {
  CA: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland", "Nova Scotia", "Ontario", "PEI", "Quebec", "Saskatchewan"],
  US: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
};

// Initialize UI
const creatorGrid = document.getElementById('creator-types');
creatorTypes.forEach(type => {
  const btn = document.createElement('button');
  btn.textContent = type;
  btn.className = 'pill';
  btn.onclick = () => btn.classList.toggle('active');
  creatorGrid.appendChild(btn);
});

document.getElementById('country').onchange = (e) => {
  const regionSelect = document.getElementById('region');
  const country = e.target.value;
  regionSelect.innerHTML = '<option value="">Select Region...</option>';
  if (country) {
    regions[country].forEach(r => {
      const opt = document.createElement('option');
      opt.value = r; opt.textContent = r;
      regionSelect.appendChild(opt);
    });
    regionSelect.disabled = false;
  } else {
    regionSelect.disabled = true;
  }
};

document.getElementById('toggleKey').onclick = function() {
  const keyInput = document.getElementById('apiKey');
  keyInput.type = keyInput.type === 'password' ? 'text' : 'password';
  this.textContent = keyInput.type === 'password' ? 'show' : 'hide';
};

document.getElementById('generate').onclick = async () => {
  const results = document.getElementById('results');
  results.classList.remove('hidden');
  results.scrollIntoView({ behavior: 'smooth' });
  
  // Logic to populate checklist based on selection
  document.getElementById('summary').innerHTML = `<p><strong>Institutional Roadmap Generated for:</strong> ${document.getElementById('country').value} (${document.getElementById('region').value})</p>`;
};
