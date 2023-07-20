"use strict";
const storeNames = ["Seattle", "Tokyo", "Dubai", "Paris", "Lima"];
const hours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];
function CookieStore(storeName, minCust, maxCust, avgSale) {
  this.storeName = storeName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.hours = hours;
  this.totalsPerHour = getTotalsPerHour();
  this.totalPerDay = getTotalPerDay(this.totalsPerHour);

  function getTotalsPerHour() {
    let salesPerHour = [];
    for (let hour of hours) {
      const hourSale = getRandom(minCust, maxCust) * avgSale;
      salesPerHour.push(Math.floor(hourSale));
    }
    return salesPerHour;
  }
  function getTotalPerDay(totalsPerHour) {
    let total = 0;
    for (let number of totalsPerHour) {
      total += number;
    }
    return total;
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

CookieStore.prototype.render = function render() {
  const tableRowElm = document.createElement("tr");
  const tdNameElm = document.createElement("td");
  tdNameElm.textContent = this.storeName;
  tableRowElm.appendChild(tdNameElm);

  for (let i of this.totalsPerHour) {
    const tdHourlyElem = document.createElement("td");
    tdHourlyElem.textContent = i;
    tableRowElm.appendChild(tdHourlyElem);
  }

  const tdSubtotalElm = document.createElement("td");
  tdSubtotalElm.textContent = this.totalPerDay;
  tableRowElm.appendChild(tdSubtotalElm);

  tableElm.appendChild(tableRowElm);
};

const stores = [
  new CookieStore(storeNames[0], 23, 65, 6.3),
  new CookieStore(storeNames[1], 3, 24, 1.2),
  new CookieStore(storeNames[2], 11, 38, 3.7),
  new CookieStore(storeNames[3], 20, 38, 2.3),
  new CookieStore(storeNames[4], 2, 16, 4.6),
];

const tableElm = document.getElementById("table-body");
const tableHeadingElm = document.getElementById("heading-row");

for (let i of hours) {
  let hourlyThElm = document.createElement("th");
  hourlyThElm.textContent = i;
  tableHeadingElm.appendChild(hourlyThElm);
}

let subtotalThElm = document.createElement("th");
subtotalThElm.textContent = "Daily Location Total";
tableHeadingElm.appendChild(subtotalThElm);

// event handling
let addStoreForm = document.getElementById("add-store-form");
addStoreForm.addEventListener("submit", onSubmit);
function onSubmit(event) {
  event.preventDefault();
  let location = event.target["store-name"].value;
  let minCust = event.target["min-cust"].value;
  let maxCust = event.target["max-cust"].value;
  let avgSale = event.target["avg-sale"].value;

  let newStore = new CookieStore(location, minCust, maxCust, avgSale);
  newStore.render();
  stores.push(newStore);

  tableFootElm.innerHTML = "";
  renderTotals();
  event.target.reset();
}

for (let i of stores) {
  i.render();
}

let tableFootElm = document.getElementById("table-foot");
function renderTotals() {
  let totalRowElm = document.createElement("tr");
  subtotalThElm.textContent = "Daily Location Total";
  let totalsElm = document.createElement("td");
  totalsElm.textContent = "Totals";
  tableFootElm.appendChild(totalRowElm);
  totalRowElm.appendChild(totalsElm);

  for (let i in hours) {
    let hourlyTotal = 0;
    for (let j of stores) {
      hourlyTotal += j.totalsPerHour[i];
    }
    let hourlyTotalElm = document.createElement("td");
    hourlyTotalElm.textContent = hourlyTotal;
    totalRowElm.appendChild(hourlyTotalElm);
  }

  let grandTotal = 0;
  for (let i of stores) {
    grandTotal += i.totalPerDay;
  }
  let grandTotalElm = document.createElement("td");
  grandTotalElm.textContent = grandTotal;
  totalRowElm.appendChild(grandTotalElm);
}

renderTotals();
