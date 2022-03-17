const helpers = {
	self: this,
	sageHeaderAndList: (response, sortKey) => {
		const list = response.filter((e) => Number(e[sortKey]) > 1);
		const heading = response.filter((e) => Number(e[sortKey]) === 1)[0];
		return [ heading, list ];
	},
	LoadRandomSpinnerIcon: () => {
		const icons = [
			'Audio',
			'BallTriangle',
			'Bars',
			'Circles',
			'Grid',
			'Hearts',
			'Oval',
			'Puff',
			'Rings',
			'TailSpin',
			'ThreeDots'
		];
		// const rIndex = Math.floor(Math.random() * icons.length) + 1;
		const icon = icons[6];
		return icon;
	},
	stringToCapitalize: (string) => {
		return string.split('_').map((s) => s.substring(0, 1).toUpperCase() + s.substring(1, s.length)).join(' ');
	},
	donutChartColors: [
		'#e91e63',
		'#9c27b0',
		'#673ab7',
		'#3f51b5',
		'#2196f3',
		'#03a9f4',
		'#00bcd4',
		'#009688',
		'#4caf50',
		'#8bc34a',
		'#cddc39',
		'#ffeb3b',
		'#ffc107',
		'#ff9800',
		'#ff5722',
		'#795548',
		'#607d8b',
		'#f44336'
	],
	indianLacSeperator: (value) => {
		return value.toLocaleString('en-IN', {
			maximumFractionDigits: 2,
			style: 'currency',
			currency: 'INR'
		});
	},
	countryCurrencyLacSeperator: (locale, currency, value, maximumFractionDigits) => {
		return Number(value).toLocaleString(locale, {
			maximumFractionDigits,
			minimumFractionDigits: maximumFractionDigits,
			style: currency ? 'currency' : 'decimal',
			...(currency && { currency })
		});
	},
	lacSeperator: (number) => {
		return number.toLocaleString('en-IN');
	},
	strToNumMonth: {
		// usage: strToNumMonth["Mar"] | output: "03"
		Jan: '01',
		Feb: '02',
		Mar: '03',
		Apr: '04',
		May: '05',
		Jun: '06',
		Jul: '07',
		Aug: '08',
		Sep: '09',
		Oct: '10',
		Nov: '11',
		Dec: '12'
	},
	monthToStr: {
		// usage: monthToStr["03"] | output: Mar
		'01': 'Jan',
		'02': 'Feb',
		'03': 'Mar',
		'04': 'Apr',
		'05': 'May',
		'06': 'Jun',
		'07': 'Jul',
		'08': 'Aug',
		'09': 'Sep',
		10: 'Oct',
		11: 'Nov',
		12: 'Dec'
	},
	fullmonthNames: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	],
	threeDigitMonthNames: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
	leadingZeros: (number) => {
		let num = Number(number);
		return num < 10 ? `0${num}` : num;
	},
	dateToMonthYear: (date) => {
		// usage: 2020-03-18 | Output: Mar-2020
		const myDate = new Date(date);
		return `${helpers.threeDigitMonthNames[myDate.getMonth()]}-${myDate.getFullYear()}`;
	},
	addMonths: (date, count) => {
		if (date && count) {
			let [ m, d ] = [ '', (date = new Date(+date)).getDate() ];
			date.setMonth(date.getMonth() + count, 1);
			m = date.getMonth();
			date.setDate(d);
			if (date.getMonth() !== m) date.setDate(0);
		}
		return date;
	},
	getNextMonthFirst: () => {
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
		const yyyy = date.getFullYear();
		return `${yyyy}-${mm}-01`;
	},
	getNow: () => {
		const leadingZeros = (number) => {
			let num = Number(number);
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
	DateToYYYYMMDD: (date) => {
		const leadingZeros = (number) => {
			let num = Number(number);
			return num < 10 ? `0${num}` : num;
		};
		const yyyy = date.getFullYear();
		const mmm = leadingZeros(date.getMonth() + 1);
		const dd = leadingZeros(date.getDate());
		return `${yyyy}-${mmm}-${dd}`;
	},
	stripCommasInCSV: (arrayOfObjects) => {
		let array = arrayOfObjects.map((ar) => {
			const newArr = Object.keys(ar).map((k) => ({
				[k]: String(ar[k]).replace(/,/g, '')
			}));
			return Object.assign({}, {}, ...newArr);
		});
		return array;
	},
	// usage: chunkArray([1,2,3,4,5,6],3)
	//output: [[1,2,3],[4,5,6]]
	chunkArray: (array, n) => {
		return array.map((x, i) => array.slice(i * n, i * n + n)).filter((r) => r.length > 0);
	},
	LANGUAGE_BY_LOCALE: {
		'Afar-Djibouti': 'aa-DJ',
		'Afar-Eritrea': 'aa-ER',
		'Afar-Ethiopia': 'aa-ET',
		'Afrikaans-Namibia': 'af-NA',
		'Afrikaans-South Africa': 'af-ZA',
		'Aghem-Cameroon': 'agq-CM',
		'Akan-Ghana': 'ak-GH',
		'Albanian-Albania': 'sq-AL',
		'Albanian-North Macedonia': 'sq-MK',
		'Alsatian-France': 'gsw-FR',
		'Alsatian-Liechtenstein': 'gsw-LI',
		'Alsatian-Switzerland': 'gsw-CH',
		'Amharic-Ethiopia': 'am-ET',
		'Arabic-Algeria': 'ar-DZ',
		'Arabic-Bahrain': 'ar-BH',
		'Arabic-Chad': 'ar-TD',
		'Arabic-Comoros': 'ar-KM',
		'Arabic-Djibouti': 'ar-DJ',
		'Arabic-Egypt': 'ar-EG',
		'Arabic-Eritrea': 'ar-ER',
		'Arabic-Iraq': 'ar-IQ',
		'Arabic-Israel': 'ar-IL',
		'Arabic-Jordan': 'ar-JO',
		'Arabic-Kuwait': 'ar-KW',
		'Arabic-Lebanon': 'ar-LB',
		'Arabic-Libya': 'ar-LY',
		'Arabic-Mauritania': 'ar-MR',
		'Arabic-Morocco': 'ar-MA',
		'Arabic-Oman': 'ar-OM',
		'Arabic-Palestinian Authority': 'ar-PS',
		'Arabic-Qatar': 'ar-QA',
		'Arabic-Saudi Arabia': 'ar-SA',
		'Arabic-Somalia': 'ar-SO',
		'Arabic-South Sudan': 'ar-SS',
		'Arabic-Sudan': 'ar-SD',
		'Arabic-Syria': 'ar-SY',
		'Arabic-Tunisia': 'ar-TN',
		'Arabic-U.A.E.': 'ar-AE',
		'Arabic-World': 'ar-001',
		'Arabic-Yemen': 'ar-YE',
		'Armenian-Armenia': 'hy-AM',
		'Assamese-India': 'as-IN',
		'Asturian-Spain': 'ast-ES',
		'Asu-Tanzania': 'asa-TZ',
		'Azerbaijani (Cyrillic)-Azerbaijan': 'az-Cyrl-AZ',
		'Azerbaijani (Latin)-Azerbaijan': 'az-Latn-AZ',
		'Bafia-Cameroon': 'ksf-CM',
		'Bamanankan (Latin)-Mali': 'bm-Latn-ML',
		'Bangla-Bangladesh': 'bn-BD',
		'Bangla-India': 'bn-IN',
		'Basaa-Cameroon': 'bas-CM',
		'Bashkir-Russia': 'ba-RU',
		'Basque-Spain': 'eu-ES',
		'Belarusian-Belarus': 'be-BY',
		'Bemba-Zambia': 'bem-ZM',
		'Bena-Tanzania': 'bez-TZ',
		'Blin-Eritrea': 'byn-ER',
		'Bodo-India': 'brx-IN',
		'Bosnian (Cyrillic)-Bosnia and Herzegovina': 'bs-Cyrl-BA',
		'Bosnian (Latin)-Bosnia and Herzegovina': 'bs-Latn-BA',
		'Breton-France': 'br-FR',
		'Bulgarian-Bulgaria': 'bg-BG',
		'Burmese-Myanmar': 'my-MM',
		'Catalan-Andorra': 'ca-AD',
		'Catalan-France': 'ca-FR',
		'Catalan-Italy': 'ca-IT',
		'Catalan-Spain': 'ca-ES',
		'Cebuan (Latin)-Philippines': 'ceb-Latn-PH',
		'Central Atlas Tamazight (Latin)-Morocco': 'tzm-Latn-',
		'Central Kurdish-Iraq': 'ku-Arab-IQ',
		'Chakma-Chakma': 'ccp-Cakm',
		'Chakma-India': 'ccp-Cakm-',
		'Chechen-Russia': 'cd-RU',
		'Cherokee-United States': 'chr-Cher-US',
		'Chiga-Uganda': 'cgg-UG',
		"Chinese (Simplified)-People's Republic of China": 'zh-CN',
		'Chinese (Simplified)-Singapore': 'zh-SG',
		'Chinese (Traditional)-Hong Kong S.A.R.': 'zh-HK',
		'Chinese (Traditional)-Macao S.A.R.': 'zh-MO',
		'Chinese (Traditional)-Taiwan': 'zh-TW',
		'Church Slavic-Russia': 'cu-RU',
		'Congo Swahili-Congo DRC': 'swc-CD',
		'Cornish-United Kingdom': 'kw-GB',
		'Corsican-France': 'co-FR',
		'Croatian-Croatia': 'hr-HR',
		'Croatian (Latin)-Bosnia and Herzegovina': 'hr-BA',
		'Czech-Czech Republic': 'cs-CZ',
		'Danish-Denmark': 'da-DK',
		'Danish-Greenland': 'da-GL',
		'Dari-Afghanistan': 'prs-AF',
		'Divehi-Maldives': 'dv-MV',
		'Duala-Cameroon': 'dua-CM',
		'Dutch-Aruba': 'nl-AW',
		'Dutch-Belgium': 'nl-BE',
		'Dutch-Bonaire, Sint Eustatius and Saba': 'nl-BQ',
		'Dutch-Curaçao': 'nl-CW',
		'Dutch-Netherlands': 'nl-NL',
		'Dutch-Sint Maarten': 'nl-SX',
		'Dutch-Suriname': 'nl-SR',
		'Dzongkha-Bhutan': 'dz-BT',
		'Embu-Kenya': 'ebu-KE',
		'English-American Samoa': 'en-AS',
		'English-Anguilla': 'en-AI',
		'English-Antigua and Barbuda': 'en-AG',
		'English-Australia': 'en-AU',
		'English-Austria': 'en-AT',
		'English-Bahamas': 'en-BS',
		'English-Barbados': 'en-BB',
		'English-Belgium': 'en-BE',
		'English-Belize': 'en-BZ',
		'English-Bermuda': 'en-BM',
		'English-Botswana': 'en-BW',
		'English-British Indian Ocean Territory': 'en-IO',
		'English-British Virgin Islands': 'en-VG',
		'English-Burundi': 'en-BI',
		'English-Cameroon': 'en-CM',
		'English-Canada': 'en-CA',
		'English-Caribbean': 'en-029',
		'English-Cayman Islands': 'en-KY',
		'English-Christmas Island': 'en-CX',
		'English-Cocos [Keeling] Islands': 'en-CC',
		'English-Cook Islands': 'en-CK',
		'English-Cyprus': 'en-CY',
		'English-Denmark': 'en-DK',
		'English-Dominica': 'en-DM',
		'English-Eritrea': 'en-ER',
		'English-Europe': 'en-150',
		'English-Falkland Islands': 'en-FK',
		'English-Finland': 'en-FI',
		'English-Fiji': 'en-FJ',
		'English-Gambia': 'en-GM',
		'English-Germany': 'en-DE',
		'English-Ghana': 'en-GH',
		'English-Gibraltar': 'en-GI',
		'English-Grenada': 'en-GD',
		'English-Guam': 'en-GU',
		'English-Guernsey': 'en-GG',
		'English-Guyana': 'en-GY',
		'English-Hong Kong': 'en-HK',
		'English-India': 'en-IN',
		'English-Ireland': 'en-IE',
		'English-Isle of Man': 'en-IM',
		'English-Israel': 'en-IL',
		'English-Jamaica': 'en-JM',
		'English-Jersey': 'en-JE',
		'English-Kenya': 'en-KE',
		'English-Kiribati': 'en-KI',
		'English-Lesotho': 'en-LS',
		'English-Liberia': 'en-LR',
		'English-Macao SAR': 'en-MO',
		'English-Madagascar': 'en-MG',
		'English-Malawi': 'en-MW',
		'English-Malaysia': 'en-MY',
		'English-Malta': 'en-MT',
		'English-Marshall Islands': 'en-MH',
		'English-Mauritius': 'en-MU',
		'English-Micronesia': 'en-FM',
		'English-Montserrat': 'en-MS',
		'English-Namibia': 'en-NA',
		'English-Nauru': 'en-NR',
		'English-Netherlands': 'en-NL',
		'English-New Zealand': 'en-NZ',
		'English-Nigeria': 'en-NG',
		'English-Niue': 'en-NU',
		'English-Norfolk Island': 'en-NF',
		'English-Northern Mariana Islands': 'en-MP',
		'English-Pakistan': 'en-PK',
		'English-Palau': 'en-PW',
		'English-Papua New Guinea': 'en-PG',
		'English-Pitcairn Islands': 'en-PN',
		'English-Puerto Rico': 'en-PR',
		'English-Republic of the Philippines': 'en-PH',
		'English-Rwanda': 'en-RW',
		'English-Saint Kitts and Nevis': 'en-KN',
		'English-Saint Lucia': 'en-LC',
		'English-Saint Vincent and the Grenadines': 'en-VC',
		'English-Samoa': 'en-WS',
		'English-Seychelles': 'en-SC',
		'English-Sierra Leone': 'en-SL',
		'English-Singapore': 'en-SG',
		'English-Sint Maarten': 'en-SX',
		'English-Slovenia': 'en-SI',
		'English-Solomon Islands': 'en-SB',
		'English-South Africa': 'en-ZA',
		'English-South Sudan': 'en-SS',
		'English-St Helena, Ascension, Tristan da Cunha': 'en-SH',
		'English-Sudan': 'en-SD',
		'English-Swaziland': 'en-SZ',
		'English-Sweden': 'en-SE',
		'English-Switzerland': 'en-CH',
		'English-Tanzania': 'en-TZ',
		'English-Tokelau': 'en-TK',
		'English-Tonga': 'en-TO',
		'English-Trinidad and Tobago': 'en-TT',
		'English-Turks and Caicos Islands': 'en-TC',
		'English-Tuvalu': 'en-TV',
		'English-Uganda': 'en-UG',
		'English-United Arab Emirates': 'en-AE',
		'English-United Kingdom': 'en-GB',
		'English-United States': 'en-US',
		'English-US Minor Outlying Islands': 'en-UM',
		'English-US Virgin Islands': 'en-VI',
		'English-Vanuatu': 'en-VU',
		'English-World': 'en-001',
		'English-Zambia': 'en-ZM',
		'English-Zimbabwe': 'en-ZW',
		'Esperanto-World': 'eo-001',
		'Estonian-Estonia': 'et-EE',
		'Ewe-Ghana': 'ee-GH',
		'Ewe-Togo': 'ee-TG',
		'Ewondo-Cameroon': 'ewo-CM',
		'Faroese-Denmark': 'fo-DK',
		'Faroese-Faroe Islands': 'fo-FO',
		'Filipino-Philippines': 'fil-PH',
		'Finnish-Finland': 'fi-FI',
		'French-Algeria': 'fr-DZ',
		'French-Belgium': 'fr-BE',
		'French-Benin': 'fr-BJ',
		'French-Burkina Faso': 'fr-BF',
		'French-Burundi': 'fr-BI',
		'French-Cameroon': 'fr-CM',
		'French-Canada': 'fr-CA',
		'French-Central African Republic': 'fr-CF',
		'French-Chad': 'fr-TD',
		'French-Comoros': 'fr-KM',
		'French-Congo': 'fr-CG',
		'French-Congo, DRC': 'fr-CD',
		"French-Côte d'Ivoire": 'fr-CI',
		'French-Djibouti': 'fr-DJ',
		'French-Equatorial Guinea': 'fr-GQ',
		'French-France': 'fr-FR',
		'French-French Guiana': 'fr-GF',
		'French-French Polynesia': 'fr-PF',
		'French-Gabon': 'fr-GA',
		'French-Guadeloupe': 'fr-GP',
		'French-Guinea': 'fr-GN',
		'French-Haiti': 'fr-HT',
		'French-Luxembourg': 'fr-LU',
		'French-Madagascar': 'fr-MG',
		'French-Mali': 'fr-ML',
		'French-Martinique': 'fr-MQ',
		'French-Mauritania': 'fr-MR',
		'French-Mauritius': 'fr-MU',
		'French-Mayotte': 'fr-YT',
		'French-Morocco': 'fr-MA',
		'French-New Caledonia': 'fr-NC',
		'French-Niger': 'fr-NE',
		'French-Principality of Monaco': 'fr-MC',
		'French-Reunion': 'fr-RE',
		'French-Rwanda': 'fr-RW',
		'French-Saint Barthélemy': 'fr-BL',
		'French-Saint Martin': 'fr-MF',
		'French-Saint Pierre and Miquelon': 'fr-PM',
		'French-Senegal': 'fr-SN',
		'French-Seychelles': 'fr-SC',
		'French-Switzerland': 'fr-CH',
		'French-Syria': 'fr-SY',
		'French-Togo': 'fr-TG',
		'French-Tunisia': 'fr-TN',
		'French-Vanuatu': 'fr-VU',
		'French-Wallis and Futuna': 'fr-WF',
		'Frisian-Netherlands': 'fy-NL',
		'Friulian-Italy': 'fur-IT',
		'Fulah (Latin)-Burkina Faso': 'ff-Latn-BF',
		'Fulah-Cameroon': 'ff-CM',
		'Fulah (Latin)-Cameroon': 'ff-Latn-CM',
		'Fulah (Latin)-Gambia': 'ff-Latn-GM',
		'Fulah (Latin)-Ghana': 'ff-Latn-GH',
		'Fulah-Guinea': 'ff-GN',
		'Fulah (Latin)-Guinea': 'ff-Latn-GN',
		'Fulah (Latin)-Guinea-Bissau': 'ff-Latn-GW',
		'Fulah (Latin)-Liberia': 'ff-Latn-LR',
		'Fulah-Mauritania': 'ff-MR',
		'Fulah (Latin)-Mauritania': 'ff-Latn-MR',
		'Fulah (Latin)-Niger': 'ff-Latn-NE',
		'Fulah-Nigeria': 'ff-NG',
		'Fulah (Latin)-Nigeria': 'ff-Latn-NG',
		'Fulah-Senegal': 'ff-Latn-SN',
		'Fulah (Latin)-Sierra Leone': 'ff-Latn-SL',
		'Galician-Spain': 'gl-ES',
		'Ganda-Uganda': 'lg-UG',
		'Georgian-Georgia': 'ka-GE',
		'German-Austria': 'de-AT',
		'German-Belgium': 'de-BE',
		'German-Germany': 'de-DE',
		'German-Italy': 'de-IT',
		'German-Liechtenstein': 'de-LI',
		'German-Luxembourg': 'de-LU',
		'German-Switzerland': 'de-CH',
		'Greek-Cyprus': 'el-CY',
		'Greek-Greece': 'el-GR',
		'Greenlandic-Greenland': 'kl-GL',
		'Guarani-Paraguay': 'gn-PY',
		'Gujarati-India': 'gu-IN',
		'Gusii-Kenya': 'guz-KE',
		'Hausa (Latin)-Ghana': 'ha-Latn-GH',
		'Hausa (Latin)-Niger': 'ha-Latn-NE',
		'Hausa (Latin)-Nigeria': 'ha-Latn-NG',
		'Hawaiian-United States': 'haw-US',
		'Hebrew-Israel': 'he-IL',
		'Hindi-India': 'hi-IN',
		'Hungarian-Hungary': 'hu-HU',
		'Icelandic-Iceland': 'is-IS',
		'Igbo-Nigeria': 'ig-NG',
		'Indonesian-Indonesia': 'id-ID',
		'Interlingua-France': 'ia-FR',
		'Interlingua-World': 'ia-001',
		'Inuktitut (Latin)-Canada': 'iu-Latn-CA',
		'Inuktitut (Syllabics)-Canada': 'iu-Cans-CA',
		'Irish-Ireland': 'ga-IE',
		'Italian-Italy': 'it-IT',
		'Italian-San Marino': 'it-SM',
		'Italian-Switzerland': 'it-CH',
		'Italian-Vatican City': 'it-VA',
		'Japanese-Japan': 'ja-JP',
		'Javanese-Latin': 'jv-Latn',
		'Javanese-Latin, Indonesia': 'jv-Latn-ID',
		'Jola-Fonyi-Senegal': 'dyo-SN',
		'Kabuverdianu-Cabo Verde': 'kea-CV',
		'Kabyle-Algeria': 'kab-DZ',
		'Kako-Cameroon': 'kkj-CM',
		'Kalenjin-Kenya': 'kln-KE',
		'Kamba-Kenya': 'kam-KE',
		'Kannada-India': 'kn-IN',
		'Kashmiri-Perso-Arabic': 'ks-Arab',
		'Kazakh-Kazakhstan': 'kk-KZ',
		'Khmer-Cambodia': 'km-KH',
		"K'iche-Guatemala": 'quc-Latn-GT',
		'Kikuyu-Kenya': 'ki-KE',
		'Kinyarwanda-Rwanda': 'rw-RW',
		'Kiswahili-Kenya': 'sw-KE',
		'Kiswahili-Tanzania': 'sw-TZ',
		'Kiswahili-Uganda': 'sw-UG',
		'Konkani-India': 'kok-IN',
		'Korean-Korea': 'ko-KR',
		'Korean-North Korea': 'ko-KP',
		'Koyra Chiini-Mali': 'khq-ML',
		'Koyraboro Senni-Mali': 'ses-ML',
		'Kwasio-Cameroon': 'nmg-CM',
		'Kyrgyz-Kyrgyzstan': 'ky-KG',
		'Kurdish-Perso-Arabic, Iran': 'ku-Arab-IR',
		'Lakota-United States': 'lkt-US',
		'Langi-Tanzania': 'lag-TZ',
		'Lao-Lao P.D.R.': 'lo-LA',
		'Latvian-Latvia': 'lv-LV',
		'Lingala-Angola': 'ln-AO',
		'Lingala-Central African Republic': 'ln-CF',
		'Lingala-Congo': 'ln-CG',
		'Lingala-Congo DRC': 'ln-CD',
		'Lithuanian-Lithuania': 'lt-LT',
		'Low German-Germany': 'nds-DE',
		'Low German-Netherlands': 'nds-NL',
		'Lower Sorbian-Germany': 'dsb-DE',
		'Luba-Katanga-Congo DRC': 'lu-CD',
		'Luo-Kenya': 'luo-KE',
		'Luxembourgish-Luxembourg': 'lb-LU',
		'Luyia-Kenya': 'luy-KE',
		'Macedonian-North Macedonia': 'mk-MK',
		'Machame-Tanzania': 'jmc-TZ',
		'Makhuwa-Meetto-Mozambique': 'mgh-MZ',
		'Makonde-Tanzania': 'kde-TZ',
		'Malagasy-Madagascar': 'mg-MG',
		'Malay-Brunei Darussalam': 'ms-BN',
		'Malay-Malaysia': 'ms-MY',
		'Malayalam-India': 'ml-IN',
		'Maltese-Malta': 'mt-MT',
		'Manx-Isle of Man': 'gv-IM',
		'Maori-New Zealand': 'mi-NZ',
		'Mapudungun-Chile': 'arn-CL',
		'Marathi-India': 'mr-IN',
		'Masai-Kenya': 'mas-KE',
		'Masai-Tanzania': 'mas-TZ',
		'Mazanderani-Iran': 'mzn-IR',
		'Meru-Kenya': 'mer-KE',
		"Meta'-Cameroon": 'mgo-CM',
		'Mohawk-Canada': 'moh-CA',
		'Mongolian (Cyrillic)-Mongolia': 'mn-MN',
		"Mongolian (Traditional Mongolian)-People's Republic of China": 'mn-Mong-CN',
		'Mongolian (Traditional Mongolian)-Mongolia': 'mn-Mong-MN',
		'Morisyen-Mauritius': 'mfe-MU',
		'Mundang-Cameroon': 'mua-CM',
		"N'ko-Guinea": 'nqo-GN',
		'Nama-Namibia': 'naq-NA',
		'Nepali-India': 'ne-IN',
		'Nepali-Nepal': 'ne-NP',
		'Ngiemboon-Cameroon': 'nnh-CM',
		'Ngomba-Cameroon': 'jgo-CM',
		'Northern Luri-Iraq': 'lrc-IQ',
		'Northern Luri-Iran': 'lrc-IR',
		'North Ndebele-Zimbabwe': 'nd-ZW',
		'Norwegian (Bokmal)-Norway': 'nb-NO',
		'Norwegian (Nynorsk)-Norway': 'nn-NO',
		'Norwegian Bokmål-Svalbard and Jan Mayen': 'nb-SJ',
		'Nuer-Sudan': 'nus-SD',
		'Nuer-South Sudan': 'nus-SS',
		'Nyankole-Uganda': 'nyn-UG',
		'Occitan-France': 'oc-FR',
		'Odia-India': 'or-IN',
		'Oromo-Ethiopia': 'om-ET',
		'Oromo-Kenya': 'om-KE',
		'Ossetian-Cyrillic, Georgia': 'os-GE',
		'Ossetian-Cyrillic, Russia': 'os-RU',
		'Pashto-Afghanistan': 'ps-AF',
		'Pashto-Pakistan': 'ps-PK',
		'Persian-Afghanistan': 'fa-AF',
		'Persian-Iran': 'fa-IR',
		'Polish-Poland': 'pl-PL',
		'Portuguese-Angola': 'pt-AO',
		'Portuguese-Brazil': 'pt-BR',
		'Portuguese-Cabo Verde': 'pt-CV',
		'Portuguese-Equatorial Guinea': 'pt-GQ',
		'Portuguese-Guinea-Bissau': 'pt-GW',
		'Portuguese-Luxembourg': 'pt-LU',
		'Portuguese-Macao SAR': 'pt-MO',
		'Portuguese-Mozambique': 'pt-MZ',
		'Portuguese-Portugal': 'pt-PT',
		'Portuguese-São Tomé and Príncipe': 'pt-ST',
		'Portuguese-Switzerland': 'pt-CH',
		'Portuguese-Timor-Leste': 'pt-TL',
		'Pseudo Language-Pseudo locale for east Asian/complex script localization testing': 'qps-ploca',
		'Pseudo Language-Pseudo locale used for localization testing': 'qps-ploc',
		'Pseudo Language-Pseudo locale used for localization testing of mirrored locales': 'qps-plocm',
		'Punjabi-India': 'pa-IN',
		'Punjabi-Islamic Republic of Pakistan': 'pa-Arab-PK',
		'Quechua-Bolivia': 'quz-BO',
		'Quechua-Ecuador': 'quz-EC',
		'Quechua-Peru': 'quz-PE',
		'Ripuarian-Germany': 'ksh-DE',
		'Romanian-Moldova': 'ro-MD',
		'Romanian-Romania': 'ro-RO',
		'Romansh-Switzerland': 'rm-CH',
		'Rombo-Tanzania': 'rof-TZ',
		'Rundi-Burundi': 'rn-BI',
		'Russian-Belarus': 'ru-BY',
		'Russian-Kazakhstan': 'ru-KZ',
		'Russian-Kyrgyzstan': 'ru-KG',
		'Russian-Moldova': 'ru-MD',
		'Russian-Russia': 'ru-RU',
		'Russian-Ukraine': 'ru-UA',
		'Rwa-Tanzania': 'rwk-TZ',
		'Saho-Eritrea': 'ssy-ER',
		'Sakha-Russia': 'sah-RU',
		'Samburu-Kenya': 'saq-KE',
		'Sami (Inari)-Finland': 'smn-FI',
		'Sami (Lule)-Norway': 'smj-NO',
		'Sami (Lule)-Sweden': 'smj-SE',
		'Sami (Northern)-Finland': 'se-FI',
		'Sami (Northern)-Norway': 'se-NO',
		'Sami (Northern)-Sweden': 'se-SE',
		'Sami (Skolt)-Finland': 'sms-FI',
		'Sami (Southern)-Norway': 'sma-NO',
		'Sami (Southern)-Sweden': 'sma-SE',
		'Sango-Central African Republic': 'sg-CF',
		'Sangu-Tanzania': 'sbp-TZ',
		'Sanskrit-India': 'sa-IN',
		'Scottish Gaelic-United Kingdom': 'gd-GB',
		'Sena-Mozambique': 'seh-MZ',
		'Serbian (Cyrillic)-Bosnia and Herzegovina': 'sr-Cyrl-BA',
		'Serbian (Cyrillic)-Montenegro': 'sr-Cyrl-ME',
		'Serbian (Cyrillic)-Serbia': 'sr-Cyrl-RS',
		'Serbian (Cyrillic)-Serbia and Montenegro (Former)': 'sr-Cyrl-CS',
		'Serbian (Latin)-Bosnia and Herzegovina': 'sr-Latn-BA',
		'Serbian (Latin)-Montenegro': 'sr-Latn-ME',
		'Serbian (Latin)-Serbia': 'sr-Latn-RS',
		'Serbian (Latin)-Serbia and Montenegro (Former)': 'sr-Latn-CS',
		'Sesotho sa Leboa-South Africa': 'nso-ZA',
		'Setswana-Botswana': 'tn-BW',
		'Setswana-South Africa': 'tn-ZA',
		'Shambala-Tanzania': 'ksb-TZ',
		'Shona-Latin': 'sn-Latn',
		'Shona-Zimbabwe': 'sn-Latn-ZW',
		'Sindhi-Islamic Republic of Pakistan': 'sd-Arab-PK',
		'Sinhala-Sri Lanka': 'si-LK',
		'Slovak-Slovakia': 'sk-SK',
		'Slovenian-Slovenia': 'sl-SI',
		'Soga-Uganda': 'xog-UG',
		'Somali-Djibouti': 'so-DJ',
		'Somali-Ethiopia': 'so-ET',
		'Somali-Kenya': 'so-KE',
		'Somali-Somalia': 'so-SO',
		'Sotho-South Africa': 'st-ZA',
		'South Ndebele-South Africa': 'nr-ZA',
		'Southern Sotho-Lesotho': 'st-LS',
		'Spanish-Argentina': 'es-AR',
		'Spanish-Belize': 'es-BZ',
		'Spanish-Bolivarian Republic of Venezuela': 'es-VE',
		'Spanish-Bolivia': 'es-BO',
		'Spanish-Brazil': 'es-BR',
		'Spanish-Chile': 'es-CL',
		'Spanish-Colombia': 'es-CO',
		'Spanish-Costa Rica': 'es-CR',
		'Spanish-Cuba': 'es-CU',
		'Spanish-Dominican Republic': 'es-DO',
		'Spanish-Ecuador': 'es-EC',
		'Spanish-El Salvador': 'es-SV',
		'Spanish-Equatorial Guinea': 'es-GQ',
		'Spanish-Guatemala': 'es-GT',
		'Spanish-Honduras': 'es-HN',
		'Spanish-Latin America': 'es-419',
		'Spanish-Mexico': 'es-MX',
		'Spanish-Nicaragua': 'es-NI',
		'Spanish-Panama': 'es-PA',
		'Spanish-Paraguay': 'es-PY',
		'Spanish-Peru': 'es-PE',
		'Spanish-Philippines': 'es-PH',
		'Spanish-Puerto Rico': 'es-PR',
		'Spanish-Spain': 'es-ES',
		'Spanish-UnitedStates': 'es-US',
		'Spanish-Uruguay': 'es-UY',
		'Standard Moroccan Tamazight-Morocco': 'zgh-Tfng-MA',
		'Standard Moroccan Tamazight-Tifinagh': 'zgh-Tfng',
		'Swati-South Africa': 'ss-ZA',
		'Swati-Swaziland': 'ss-SZ',
		'Swedish-Åland Islands': 'sv-AX',
		'Swedish-Finland': 'sv-FI',
		'Swedish-Sweden': 'sv-SE',
		'Syriac-Syria': 'syr-SY',
		'Tachelhit-Tifinagh': 'shi-Tfng',
		'Tachelhit-Tifinagh, Morocco': 'shi-Tfng-MA',
		'Tachelhit (Latin)-Morocco': 'shi-Latn-MA',
		'Taita-Kenya': 'dav-KE',
		'Tajik (Cyrillic)-Tajikistan': 'tg-Cyrl-TJ',
		'Tamazight (Latin)-Algeria': 'tzm-Latn-DZ',
		'Tamil-India': 'ta-IN',
		'Tamil-Malaysia': 'ta-MY',
		'Tamil-Singapore': 'ta-SG',
		'Tamil-Sri Lanka': 'ta-LK',
		'Tasawaq-Niger': 'twq-NE',
		'Tatar-Russia': 'tt-RU',
		'Telugu-India': 'te-IN',
		'Teso-Kenya': 'teo-KE',
		'Teso-Uganda': 'teo-UG',
		'Thai-Thailand': 'th-TH',
		'Tibetan-India': 'bo-IN',
		"Tibetan-People's Republic of China": 'bo-CN',
		'Tigre-Eritrea': 'tig-ER',
		'Tigrinya-Eritrea': 'ti-ER',
		'Tigrinya-Ethiopia': 'ti-ET',
		'Tongan-Tonga': 'to-TO',
		'Tsonga-South Africa': 'ts-ZA',
		'Turkish-Cyprus': 'tr-CY',
		'Turkish-Turkey': 'tr-TR',
		'Turkmen-Turkmenistan': 'tk-TM',
		'Ukrainian-Ukraine': 'uk-UA',
		'Upper Sorbian-Germany': 'hsb-DE',
		'Urdu-India': 'ur-IN',
		'Urdu-Islamic Republic of Pakistan': 'ur-PK',
		"Uyghur-People's Republic of China": 'ug-CN',
		'Uzbek-Perso-Arabic': 'uz-Arab',
		'Uzbek-Perso-Arabic, Afghanistan': 'uz-Arab-AF',
		'Uzbek (Cyrillic)-Uzbekistan': 'uz-Cyrl-UZ',
		'Uzbek (Latin)-Uzbekistan': 'uz-Latn-UZ',
		'Vai-Liberia': 'vai-Vaii-LR',
		'Vai (Latin)-Liberia': 'vai-Latn-LR',
		'Valencian-Spain': 'ca-ES-'
	},
	CURRENCY: {
		AFGHANISTAN: 'AFN',
		ALBANIA: 'ALL',
		ALGERIA: 'DZD',
		ANGOLA: 'AOA',
		ANGUILLA: 'XCD',
		ARGENTINA: 'ARS',
		ARMENIA: 'AMD',
		ARUBA: 'AWG',
		AUSTRALIA: 'AUD',
		AZERBAIJAN: 'AZN',
		BAHAMAS: 'BSD',
		BAHRAIN: 'BHD',
		BANGLADESH: 'BDT',
		BARBADOS: 'BBD',
		BELARUS: 'BYN',
		BELIZE: 'BZD',
		BENIN: 'XOF',
		BERMUDA: 'BMD',
		BHUTAN: 'BTN',
		'BOLIVIA (PLURINATIONAL STATE OF)': 'BOB',
		'BONAIRE, SINT EUSTATIUS AND SABA': 'USD',
		'BOSNIA AND HERZEGOVINA': 'BAM',
		BOTSWANA: 'BWP',
		'BOUVET ISLAND': 'NOK',
		BRAZIL: 'BRL',
		'BRITISH INDIAN OCEAN TERRITORY (THE)': 'USD',
		'BRUNEI DARUSSALAM': 'BND',
		BULGARIA: 'BGN',
		'BURKINA FASO': 'XOF',
		BURUNDI: 'BIF',
		'CABO VERDE': 'CVE',
		CAMBODIA: 'KHR',
		CAMEROON: 'XAF',
		CANADA: 'CAD',
		'CAYMAN ISLANDS (THE)': 'KYD',
		'CENTRAL AFRICAN REPUBLIC (THE)': 'XAF',
		CHAD: 'XAF',
		CHILE: 'CLP',
		CHINA: 'CNY',
		'CHRISTMAS ISLAND': 'AUD',
		'COCOS (KEELING) ISLANDS (THE)': 'AUD',
		COLOMBIA: 'COP',
		'COMOROS (THE)': 'KMF',
		'CONGO (THE DEMOCRATIC REPUBLIC OF THE)': 'CDF',
		'CONGO (THE)': 'XAF',
		'COOK ISLANDS (THE)': 'NZD',
		'COSTA RICA': 'CRC',
		"CÔTE D'IVOIRE": 'XOF',
		CROATIA: 'HRK',
		CUBA: 'CUP',
		CURAÇAO: 'ANG',
		CZECHIA: 'CZK',
		DENMARK: 'DKK',
		DJIBOUTI: 'DJF',
		'DOMINICAN REPUBLIC (THE)': 'DOP',
		ECUADOR: 'USD',
		EGYPT: 'EGP',
		'EL SALVADOR': 'USD',
		'EQUATORIAL GUINEA': 'XAF',
		ERITREA: 'ERN',
		ETHIOPIA: 'ETB',
		'EUROPEAN UNION': 'EUR',
		'FALKLAND ISLANDS (THE) [MALVINAS]': 'FKP',
		'FAROE ISLANDS (THE)': 'DKK',
		FIJI: 'FJD',
		GABON: 'XAF',
		'GAMBIA (THE)': 'GMD',
		GEORGIA: 'GEL',
		GHANA: 'GHS',
		GIBRALTAR: 'GIP',
		GREENLAND: 'DKK',
		GUAM: 'USD',
		GUATEMALA: 'GTQ',
		GUERNSEY: 'GBP',
		GUINEA: 'GNF',
		'GUINEA-BISSAU': 'XOF',
		GUYANA: 'GYD',
		HAITI: 'HTG',
		'HEARD ISLAND AND McDONALD ISLANDS': 'AUD',
		HONDURAS: 'HNL',
		'HONG KONG': 'HKD',
		HUNGARY: 'HUF',
		ICELAND: 'ISK',
		INDIA: 'INR',
		INDONESIA: 'IDR',
		'INTERNATIONAL MONETARY FUND (IMF)': 'XDR',
		'IRAN (ISLAMIC REPUBLIC OF)': 'IRR',
		IRAQ: 'IQD',
		'ISLE OF MAN': 'GBP',
		ISRAEL: 'ILS',
		JAMAICA: 'JMD',
		JAPAN: 'JPY',
		JERSEY: 'GBP',
		JORDAN: 'JOD',
		KAZAKHSTAN: 'KZT',
		KENYA: 'KES',
		KIRIBATI: 'AUD',
		"KOREA (THE DEMOCRATIC PEOPLE'S REPUBLIC OF)": 'KPW',
		'KOREA (THE REPUBLIC OF)': 'KRW',
		KUWAIT: 'KWD',
		KYRGYZSTAN: 'KGS',
		"LAO PEOPLE'S DEMOCRATIC REPUBLIC (THE)": 'LAK',
		LEBANON: 'LBP',
		LESOTHO: 'LSL',
		LIBERIA: 'LRD',
		LIBYA: 'LYD',
		LIECHTENSTEIN: 'CHF',
		MACAO: 'MOP',
		'MACEDONIA (THE FORMER YUGOSLAV REPUBLIC OF)': 'MKD',
		MADAGASCAR: 'MGA',
		MALAWI: 'MWK',
		MALAYSIA: 'MYR',
		MALDIVES: 'MVR',
		MALI: 'XOF',
		MAURITANIA: 'MRU',
		MAURITIUS: 'MUR',
		'MEMBER COUNTRIES OF THE AFRICAN DEVELOPMENT BANK GROUP': 'XUA',
		MEXICO: 'MXN',
		'MICRONESIA (FEDERATED STATES OF)': 'USD',
		'MOLDOVA (THE REPUBLIC OF)': 'MDL',
		MONGOLIA: 'MNT',
		MONTSERRAT: 'XCD',
		MOROCCO: 'MAD',
		MOZAMBIQUE: 'MZN',
		MYANMAR: 'MMK',
		NAMIBIA: 'NAD',
		NAURU: 'AUD',
		NEPAL: 'NPR',
		'NEW CALEDONIA': 'XPF',
		'NEW ZEALAND': 'NZD',
		NICARAGUA: 'NIO',
		'NIGER (THE)': 'XOF',
		NIGERIA: 'NGN',
		NIUE: 'NZD',
		'NORFOLK ISLAND': 'AUD',
		'NORTHERN MARIANA ISLANDS (THE)': 'USD',
		NORWAY: 'NOK',
		OMAN: 'OMR',
		PAKISTAN: 'PKR',
		PALAU: 'USD',
		PANAMA: 'USD',
		'PAPUA NEW GUINEA': 'PGK',
		PARAGUAY: 'PYG',
		PERU: 'PEN',
		'PHILIPPINES (THE)': 'PHP',
		PITCAIRN: 'NZD',
		POLAND: 'PLN',
		'PUERTO RICO': 'USD',
		QATAR: 'QAR',
		ROMANIA: 'RON',
		'RUSSIAN FEDERATION (THE)': 'RUB',
		RWANDA: 'RWF',
		'SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA': 'SHP',
		'SAINT KITTS AND NEVIS': 'XCD',
		'SAINT LUCIA': 'XCD',
		'SAINT VINCENT AND THE GRENADINES': 'XCD',
		SAMOA: 'WST',
		'SAO TOME AND PRINCIPE': 'STN',
		'SAUDI ARABIA': 'SAR',
		SENEGAL: 'XOF',
		SERBIA: 'RSD',
		SEYCHELLES: 'SCR',
		'SIERRA LEONE': 'SLL',
		SINGAPORE: 'SGD',
		'SINT MAARTEN (DUTCH PART)': 'ANG',
		'SISTEMA UNITARIO DE COMPENSACION REGIONAL DE PAGOS SUCRE': 'XSU',
		'SOLOMON ISLANDS': 'SBD',
		SOMALIA: 'SOS',
		'SOUTH AFRICA': 'ZAR',
		'SOUTH SUDAN': 'SSP',
		'SRI LANKA': 'LKR',
		'SUDAN': 'SDG',
		SURINAME: 'SRD',
		'SVALBARD AND JAN MAYEN': 'NOK',
		ESWATINI: 'SZL',
		SWEDEN: 'SEK',
		SWITZERLAND: 'CHF',
		'SYRIAN ARAB REPUBLIC': 'SYP',
		'TAIWAN (PROVINCE OF CHINA)': 'TWD',
		TAJIKISTAN: 'TJS',
		'TANZANIA, UNITED REPUBLIC OF': 'TZS',
		THAILAND: 'THB',
		'TIMOR-LESTE': 'USD',
		TOGO: 'XOF',
		TOKELAU: 'NZD',
		TONGA: 'TOP',
		'TRINIDAD AND TOBAGO': 'TTD',
		TUNISIA: 'TND',
		TURKEY: 'TRY',
		TURKMENISTAN: 'TMT',
		'TURKS AND CAICOS ISLANDS': 'USD',
		TUVALU: 'AUD',
		UGANDA: 'UGX',
		UKRAINE: 'UAH',
		'UNITED ARAB EMIRATES': 'AED',
		'UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND': 'GBP',
		'UNITED STATES MINOR OUTLYING ISLANDS': 'USD',
		'UNITED STATES OF AMERICA': 'USD',
		URUGUAY: 'UYU',
		UZBEKISTAN: 'UZS',
		VANUATU: 'VUV',
		'VENEZUELA (BOLIVARIAN REPUBLIC OF)': 'VES',
		'VIET NAM': 'VND',
		'VIRGIN ISLANDS (BRITISH)': 'USD',
		'VIRGIN ISLANDS (U.S.)': 'USD',
		'WALLIS AND FUTUNA': 'XPF',
		'WESTERN SAHARA': 'MAD',
		YEMEN: 'YER',
		ZAMBIA: 'ZMW',
		ZIMBABWE: 'ZWL'
	}
};

export default helpers;
