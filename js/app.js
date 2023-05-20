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
function cookieStore(storeName, minCust, maxCust, avgSale) {
  this.storeName = storeName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.hours = hours;
  this.totalsPerHour = getTotalsPerHour();
  this.totalPerDay = getTotalPerDay(this.totalsPerHour);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

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
cookieStore.prototype.render = function render() {
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
  new cookieStore(storeNames[0], 23, 65, 6.3),
  new cookieStore(storeNames[1], 3, 24, 1.2),
  new cookieStore(storeNames[2], 11, 38, 3.7),
  new cookieStore(storeNames[3], 20, 38, 2.3),
  new cookieStore(storeNames[4], 2, 16, 4.6),
];

const tableElm = document.getElementById("sales-table");
const tableHeadingElm = document.getElementById("heading-row");

let locationThElm = document.createElement("th");
locationThElm.textContent = "";
tableHeadingElm.appendChild(locationThElm);

for (let i of hours) {
  let hourlyThElm = document.createElement("th");
  hourlyThElm.textContent = i;
  tableHeadingElm.appendChild(hourlyThElm);
}

let subtotalThElm = document.createElement("th");
subtotalThElm.textContent = "Daily Location Total";
tableHeadingElm.appendChild(subtotalThElm);

for (let i of stores) {
  i.render();
}
