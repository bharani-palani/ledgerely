import _ from "lodash";

const helpers = {
  self: this,
  sageHeaderAndList: (response, sortKey) => {
    const list = response.filter(e => Number(e[sortKey]) > 1);
    const heading = response.filter(e => Number(e[sortKey]) === 1)[0];
    return [heading, list];
  },
  loadRandomSpinnerIcon: () => {
    const icons = ["Audio", "BallTriangle", "Bars", "Circles", "Grid", "Hearts", "Oval", "Puff", "Rings", "TailSpin", "ThreeDots"];
    // const rIndex = Math.floor(Math.random() * icons.length) + 1;
    const icon = icons[6];
    return icon;
  },
  stringToCapitalize: string => {
    return string
      .split("_")
      .map(s => s.substring(0, 1).toUpperCase() + s.substring(1, s.length))
      .join(" ");
  },
  donutChartColors: [
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
    "#f44336",
  ],
  indianLacSeperator: (value, decimal) => {
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: decimal,
      style: "currency",
      currency: "INR",
    });
  },
  countryCurrencyLacSeperator: (locale, currency, value, maximumFractionDigits) => {
    return Number(value).toLocaleString(locale, {
      maximumFractionDigits,
      minimumFractionDigits: maximumFractionDigits,
      style: currency ? "currency" : "decimal",
      ...(currency && { currency }),
    });
  },
  lacSeperator: (number, l = "en-IN") => {
    return number?.toLocaleString(l);
  },
  strToNumMonth: {
    // usage: strToNumMonth["Mar"] | output: "03"
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  },
  monthToStr: {
    // usage: monthToStr["03"] | output: Mar
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  },
  fullmonthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  threeDigitMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  leadingZeros: number => {
    const num = Number(number);
    return num < 10 ? `0${num}` : num;
  },
  dateToMonthYear: date => {
    // usage: 2020-03-18 | Output: Mar-2020
    const myDate = new Date(date);
    return `${helpers.threeDigitMonthNames[myDate.getMonth()]}-${myDate.getFullYear()}`;
  },
  addMonths: (date, count) => {
    if (date && count) {
      let [m, d] = ["", (date = new Date(+date)).getDate()];
      date.setMonth(date.getMonth() + count, 1);
      m = date.getMonth();
      date.setDate(d);
      if (date.getMonth() !== m) date.setDate(0);
    }
    return date;
  },
  getNextMonthDate: day => {
    // get
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 2;
    if (month > 12) {
      year += 1;
      month = 1;
    }
    // set
    const date = new Date(`${year}-${month}-01`);
    let mm = date.getMonth() + 1;
    mm = mm < 10 ? `0${mm}` : mm;
    const dd = day < 10 ? `0${day}` : day;
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  },
  getNow: () => {
    const leadingZeros = number => {
      const num = Number(number);
      return num < 10 ? `0${num}` : num;
    };
    const now = new Date();
    const yyyy = now.getFullYear();
    const mmm = leadingZeros(now.getMonth() + 1);
    const dd = leadingZeros(now.getDate());
    const hh = leadingZeros(now.getHours());
    const mm = leadingZeros(now.getMinutes());
    const ss = leadingZeros(now.getSeconds());
    return `${yyyy}-${mmm}-${dd} ${hh}:${mm}:${ss}`;
  },
  dateToYYYYMMDD: date => {
    const leadingZeros = number => {
      const num = Number(number);
      return num < 10 ? `0${num}` : num;
    };
    const yyyy = date.getFullYear();
    const mm = leadingZeros(date.getMonth() + 1);
    const dd = leadingZeros(date.getDate());
    return `${yyyy}-${mm}-${dd}`;
  },
  stripCommasInCSV: arrayOfObjects => {
    const array = arrayOfObjects.map(ar => {
      const newArr = Object.keys(ar).map(k => ({
        [k]: String(ar[k]).replace(/,/g, ""),
      }));
      return Object.assign({}, {}, ...newArr);
    });
    return array;
  },
  // usage: chunkArray([1,2,3,4,5,6],3)
  // output: [[1,2,3],[4,5,6]]
  chunkArray: (array, n) => {
    return array.map((x, i) => array.slice(i * n, i * n + n)).filter(r => r.length > 0);
  },
  shorten: (str, max) => {
    if (str && str.length > max) {
      return str.slice(0, Math.ceil(max / 2)) + "..." + str.slice(-10, str.length);
    }
    return str;
  },
  getCustomDayOfCustomMonth: (day, month = 0) => {
    const date = new Date();
    date.setMonth(date.getMonth() + month);
    date.setDate(day);
    return date;
  },
  bootstrapColorVariables: [
    getComputedStyle(document.documentElement).getPropertyValue("--bs-blue") || "#000000",
    getComputedStyle(document.documentElement).getPropertyValue("--bs-indigo") || "#000000",
    getComputedStyle(document.documentElement).getPropertyValue("--bs-purple") || "#000000",
    getComputedStyle(document.documentElement).getPropertyValue("--bs-pink") || "#000000",
    getComputedStyle(document.documentElement).getPropertyValue("--bs-red") || "#000000",
    getComputedStyle(document.documentElement).getPropertyValue("--bs-orange") || "#000000",
    getComputedStyle(document.documentElement).getPropertyValue("--bs-yellow") || "#000000",
    getComputedStyle(document.documentElement).getPropertyValue("--bs-green") || "#000000",
    getComputedStyle(document.documentElement).getPropertyValue("--bs-teal") || "#000000",
    getComputedStyle(document.documentElement).getPropertyValue("--bs-cyan") || "#000000",
    getComputedStyle(document.documentElement).getPropertyValue("--bs-gray") || "#000000",
    getComputedStyle(document.documentElement).getPropertyValue("--bs-black") || "#000000",
    getComputedStyle(document.documentElement).getPropertyValue("--bs-light") || "#FFFFFF",
  ],
  getCountableRotatableColors: count => {
    return Array.from({ length: count }, (_, i) => helpers.bootstrapColorVariables[i % helpers.bootstrapColorVariables.length]);
  },
  deletePropertyFromObject: (obj, prop) => {
    const keysToRemove = new Set(Array.isArray(prop) ? prop : [prop]);
    return Object.fromEntries(Object.entries(obj).filter(([key]) => !keysToRemove.has(key)));
  },
  camelCaseToText: text => {
    return text.replace(/([A-Z])/g, " $1").trim();
  },
  stripArrayKeys: (array, stripArray) => array.map(item => _.omit(item, stripArray)),
  getDeviceType: () => {
    const width = window.innerWidth;
    if (width < 768) {
      return "mobile";
    } else if (width >= 768 && width <= 1024) {
      return "tablet";
    } else {
      return "desktop";
    }
  },
  countryCodes: [
    ["+1", "United States / Canada"],
    ["+7", "Russia / Kazakhstan"],
    ["+20", "Egypt"],
    ["+27", "South Africa"],
    ["+30", "Greece"],
    ["+31", "Netherlands"],
    ["+32", "Belgium"],
    ["+33", "France"],
    ["+34", "Spain"],
    ["+36", "Hungary"],
    ["+39", "Italy"],
    ["+40", "Romania"],
    ["+41", "Switzerland"],
    ["+43", "Austria"],
    ["+44", "United Kingdom"],
    ["+45", "Denmark"],
    ["+46", "Sweden"],
    ["+47", "Norway"],
    ["+48", "Poland"],
    ["+49", "Germany"],
    ["+51", "Peru"],
    ["+52", "Mexico"],
    ["+53", "Cuba"],
    ["+54", "Argentina"],
    ["+55", "Brazil"],
    ["+56", "Chile"],
    ["+57", "Colombia"],
    ["+58", "Venezuela"],
    ["+60", "Malaysia"],
    ["+61", "Australia"],
    ["+62", "Indonesia"],
    ["+63", "Philippines"],
    ["+64", "New Zealand"],
    ["+65", "Singapore"],
    ["+66", "Thailand"],
    ["+81", "Japan"],
    ["+82", "South Korea"],
    ["+84", "Vietnam"],
    ["+86", "China"],
    ["+90", "Turkey"],
    ["+91", "India"],
    ["+92", "Pakistan"],
    ["+93", "Afghanistan"],
    ["+94", "Sri Lanka"],
    ["+95", "Myanmar"],
    ["+98", "Iran"],
    ["+211", "South Sudan"],
    ["+212", "Morocco"],
    ["+213", "Algeria"],
    ["+216", "Tunisia"],
    ["+218", "Libya"],
    ["+220", "Gambia"],
    ["+221", "Senegal"],
    ["+222", "Mauritania"],
    ["+223", "Mali"],
    ["+224", "Guinea"],
    ["+225", "Ivory Coast"],
    ["+226", "Burkina Faso"],
    ["+227", "Niger"],
    ["+228", "Togo"],
    ["+229", "Benin"],
    ["+230", "Mauritius"],
    ["+231", "Liberia"],
    ["+232", "Sierra Leone"],
    ["+233", "Ghana"],
    ["+234", "Nigeria"],
    ["+235", "Chad"],
    ["+236", "Central African Republic"],
    ["+237", "Cameroon"],
    ["+238", "Cape Verde"],
    ["+239", "Sao Tome and Principe"],
    ["+240", "Equatorial Guinea"],
    ["+241", "Gabon"],
    ["+242", "Republic of the Congo"],
    ["+243", "Democratic Republic of the Congo"],
    ["+244", "Angola"],
    ["+245", "Guinea-Bissau"],
    ["+248", "Seychelles"],
    ["+249", "Sudan"],
    ["+250", "Rwanda"],
    ["+251", "Ethiopia"],
    ["+252", "Somalia"],
    ["+253", "Djibouti"],
    ["+254", "Kenya"],
    ["+255", "Tanzania"],
    ["+256", "Uganda"],
    ["+257", "Burundi"],
    ["+258", "Mozambique"],
    ["+260", "Zambia"],
    ["+261", "Madagascar"],
    ["+262", "Reunion / Mayotte"],
    ["+263", "Zimbabwe"],
    ["+264", "Namibia"],
    ["+265", "Malawi"],
    ["+266", "Lesotho"],
    ["+267", "Botswana"],
    ["+268", "Eswatini"],
    ["+269", "Comoros"],
    ["+290", "Saint Helena"],
    ["+291", "Eritrea"],
    ["+297", "Aruba"],
    ["+298", "Faroe Islands"],
    ["+299", "Greenland"],
    ["+350", "Gibraltar"],
    ["+351", "Portugal"],
    ["+352", "Luxembourg"],
    ["+353", "Ireland"],
    ["+354", "Iceland"],
    ["+355", "Albania"],
    ["+356", "Malta"],
    ["+357", "Cyprus"],
    ["+358", "Finland"],
    ["+359", "Bulgaria"],
    ["+370", "Lithuania"],
    ["+371", "Latvia"],
    ["+372", "Estonia"],
    ["+373", "Moldova"],
    ["+374", "Armenia"],
    ["+375", "Belarus"],
    ["+376", "Andorra"],
    ["+377", "Monaco"],
    ["+378", "San Marino"],
    ["+380", "Ukraine"],
    ["+381", "Serbia"],
    ["+382", "Montenegro"],
    ["+383", "Kosovo"],
    ["+385", "Croatia"],
    ["+386", "Slovenia"],
    ["+387", "Bosnia and Herzegovina"],
    ["+389", "North Macedonia"],
    ["+420", "Czech Republic"],
    ["+421", "Slovakia"],
    ["+423", "Liechtenstein"],
    ["+500", "Falkland Islands"],
    ["+501", "Belize"],
    ["+502", "Guatemala"],
    ["+503", "El Salvador"],
    ["+504", "Honduras"],
    ["+505", "Nicaragua"],
    ["+506", "Costa Rica"],
    ["+507", "Panama"],
    ["+509", "Haiti"],
    ["+590", "Guadeloupe / Saint Barthelemy"],
    ["+591", "Bolivia"],
    ["+592", "Guyana"],
    ["+593", "Ecuador"],
    ["+594", "French Guiana"],
    ["+595", "Paraguay"],
    ["+597", "Suriname"],
    ["+598", "Uruguay"],
    ["+599", "Curacao"],
    ["+670", "Timor-Leste"],
    ["+673", "Brunei"],
    ["+674", "Nauru"],
    ["+675", "Papua New Guinea"],
    ["+676", "Tonga"],
    ["+677", "Solomon Islands"],
    ["+678", "Vanuatu"],
    ["+679", "Fiji"],
    ["+680", "Palau"],
    ["+685", "Samoa"],
    ["+686", "Kiribati"],
    ["+688", "Tuvalu"],
    ["+689", "French Polynesia"],
    ["+690", "Tokelau"],
    ["+691", "Micronesia"],
    ["+692", "Marshall Islands"],
    ["+850", "North Korea"],
    ["+852", "Hong Kong"],
    ["+853", "Macau"],
    ["+855", "Cambodia"],
    ["+856", "Laos"],
    ["+880", "Bangladesh"],
    ["+886", "Taiwan"],
    ["+960", "Maldives"],
    ["+961", "Lebanon"],
    ["+962", "Jordan"],
    ["+963", "Syria"],
    ["+964", "Iraq"],
    ["+965", "Kuwait"],
    ["+966", "Saudi Arabia"],
    ["+967", "Yemen"],
    ["+968", "Oman"],
    ["+970", "Palestine"],
    ["+971", "United Arab Emirates"],
    ["+972", "Israel"],
    ["+973", "Bahrain"],
    ["+974", "Qatar"],
    ["+975", "Bhutan"],
    ["+976", "Mongolia"],
    ["+977", "Nepal"],
    ["+992", "Tajikistan"],
    ["+993", "Turkmenistan"],
    ["+994", "Azerbaijan"],
    ["+995", "Georgia"],
    ["+996", "Kyrgyzstan"],
    ["+998", "Uzbekistan"],
  ].map(([value, label]) => ({ value, label })),
};

export default helpers;
