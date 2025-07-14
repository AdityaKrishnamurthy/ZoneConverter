const timezones = [
  { label: "Local Time", value: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { label: "UTC – Coordinated Universal Time", value: "UTC" },
  { label: "GMT – Greenwich Mean Time", value: "Europe/London" },
  { label: "IST – Indian Standard Time", value: "Asia/Kolkata" },
  { label: "JST – Japan Standard Time", value: "Asia/Tokyo" },
  { label: "PST / PDT – Pacific Time", value: "America/Los_Angeles" },
  { label: "EST / EDT – Eastern Time", value: "America/New_York" },
  { label: "CST / CDT – Central Time", value: "America/Chicago" },
  { label: "CET / CEST – Central European Time", value: "Europe/Berlin" },
  { label: "EET / EEST – Eastern European Time", value: "Europe/Bucharest" },
  { label: "CST – China Standard Time", value: "Asia/Shanghai" },
  { label: "KST – Korea Standard Time", value: "Asia/Seoul" },
  { label: "AEST – Australian Eastern Standard Time", value: "Australia/Sydney" },
  { label: "MST / MDT – Mountain Time", value: "America/Denver" },
  { label: "BRT – Brasília Time", value: "America/Sao_Paulo" },
  { label: "AST – Arabian Standard Time", value: "Asia/Riyadh" },
  { label: "GST – Gulf Standard Time", value: "Asia/Dubai" },
  { label: "NZST / NZDT – New Zealand Time", value: "Pacific/Auckland" },
  { label: "SAST – South Africa Standard Time", value: "Africa/Johannesburg" },
  { label: "AST / ADT – Atlantic Time (Canada)", value: "America/Halifax" }
];

function populateSelects() {
  const from = document.getElementById("fromZone");
  const to = document.getElementById("toZone");

  [from, to].forEach(select => {
    timezones.forEach(tz => {
      const option = document.createElement("option");
      option.value = tz.value;
      option.textContent = tz.label;
      select.appendChild(option);
    });
  });

  from.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
  to.value = "UTC";
}

function convertTime() {
  const fromZone = document.getElementById("fromZone").value;
  const toZone = document.getElementById("toZone").value;
  const inputTime = document.getElementById("datetime").value;

  if (!inputTime) {
    document.getElementById("result").textContent = "Please select a valid date and time.";
    return;
  }

  const fromDate = new Date(inputTime);
  const utcTime = fromDate.toLocaleString("en-US", { timeZone: fromZone });
  const toDate = new Date(utcTime);

  const converted = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: true,
    timeZone: toZone
  }).format(toDate);

  document.getElementById("result").textContent = `Converted Time: ${converted}`;
}

// Theme toggle
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (!prefersDark) document.body.classList.add("light");

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("light");
  document.getElementById("toggleTheme").textContent =
    document.body.classList.contains("light") ? "🌙" : "☀️";
});

document.getElementById("convertBtn").addEventListener("click", convertTime);

window.addEventListener("DOMContentLoaded", populateSelects);
