const regions = {
  CA: ["Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Nova Scotia","Ontario","Prince Edward Island","Quebec","Saskatchewan","Northwest Territories","Nunavut","Yukon"],
  US: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]
};

const creatorTypes = [
  { id:"audio", label:"Musician / Audio" },
  { id:"video", label:"Video Creator" },
  { id:"writer", label:"Writer / Author" },
  { id:"artist", label:"Digital Artist" },
  { id:"photo", label:"Photographer" },
  { id:"software", label:"Software / Apps" },
  { id:"coach", label:"Coach / Consultant" },
  { id:"designer", label:"Graphic Designer" },
  { id:"game", label:"Game Creator" },
  { id:"newsletter", label:"Newsletter / Substack" }
];

const countrySelect = document.getElementById("country");
const regionSelect = document.getElementById("region");
const creatorContainer = document.getElementById("creator-types");
const generateBtn = document.getElementById("generate");
const results = document.getElementById("results");

let selectedTypes = new Set();

countrySelect.addEventListener("change", () => {
  const c = countrySelect.value;
  regionSelect.innerHTML = "";
  if (!c) {
    regionSelect.disabled = true;
    regionSelect.innerHTML = "<option>Select country first...</option>";
    return;
  }
  regionSelect.disabled = false;
  regionSelect.innerHTML = "<option>Select province / state...</option>";
  regions[c].forEach(r => {
    const o = document.createElement("option");
    o.value = r;
    o.textContent = r;
    regionSelect.appendChild(o);
  });
});

creatorTypes.forEach(t => {
  const pill = document.createElement("button");
  pill.className = "pill";
  pill.textContent = t.label;
  pill.onclick = () => {
    if (selectedTypes.has(t.id)) {
      selectedTypes.delete(t.id);
      pill.classList.remove("selected");
    } else {
      selectedTypes.add(t.id);
      pill.classList.add("selected");
    }
  };
  creatorContainer.appendChild(pill);
});

generateBtn.addEventListener("click", () => {
  const country = countrySelect.value;
  const region = regionSelect.value;

  if (!country || !region || selectedTypes.size === 0) {
    alert("Complete all required fields.");
    return;
  }

  document.getElementById("registrations").innerHTML = `
    <li><input type="checkbox"> Business name registration</li>
    <li><input type="checkbox"> Tax registration (GST/HST or State Sales Tax)</li>
    <li><input type="checkbox"> Local business license (if required)</li>
  `;

  document.getElementById("notes").innerHTML = `
    <li><input type="checkbox"> Digital goods may be taxed differently</li>
    <li><input type="checkbox"> Thresholds vary by jurisdiction</li>
  `;

  document.getElementById("links").innerHTML = `
    <li><input type="checkbox"> Check your provincial/state registry</li>
    <li><input type="checkbox"> Check federal or state tax authority</li>
  `;

  document.getElementById("readyChecklist").innerHTML = `
    <ul class="checklist">
      <li><input type="checkbox"> Open business bank account</li>
      <li><input type="checkbox"> Set up bookkeeping</li>
      <li><input type="checkbox"> Save all registration confirmations</li>
      <li><input type="checkbox"> Configure tax settings on platforms</li>
    </ul>
  `;

  results.classList.remove("hidden");
});
