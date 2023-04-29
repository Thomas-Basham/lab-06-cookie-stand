"use strict";
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

const stores = [
  new cookieStore(storeNames[0], 23, 65, 6.3),
  new cookieStore(storeNames[1], 3, 24, 1.2),
  new cookieStore(storeNames[2], 11, 38, 3.7),
  new cookieStore(storeNames[3], 20, 38, 2.3),
  new cookieStore(storeNames[4], 2, 16, 4.6),
];

function render(stores) {
  const salesSectionElem = document.getElementById("sales-data");
  for (let i = 0; i < stores.length; i++) {
    console.log(stores[i]);
    let headingElem = document.createElement("h3");
    headingElem.textContent = stores[i].storeName;

    let ulElem = document.createElement("ul");

    for (let j = 0; j < stores[i].totalsPerHour.length; j++) {
      let liElem = document.createElement("li");
      liElem.textContent =
        hours[j] + " " + stores[i].totalsPerHour[j] + " cookies";

      ulElem.appendChild(liElem);
    }
    let liTotalElem = document.createElement("li");
    liTotalElem.textContent = "Total Sales: " + stores[i].totalPerDay;
    ulElem.appendChild(liTotalElem);
    salesSectionElem.appendChild(headingElem);
    salesSectionElem.appendChild(ulElem);
  }
}

render(stores);
