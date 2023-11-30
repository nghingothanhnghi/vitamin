function isLeapYear(year) {
	if (isNullOrEmpty(year)) return false;
	if (typeof year === 'string') {
		year = +year;
	}
	
	if (typeof year === 'number') {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}
	
	return false;
}

function drawDate(eYearId, eMonthId, eDayId, year, month, day) {
	if (isNullOrEmpty(eYearId) || isNullOrEmpty(eMonthId) || isNullOrEmpty(eDayId)) return;
	
	$(eYearId).text(year);
	$(eMonthId).text(month);
	$(eDayId).text(day);
	
	$(eYearId).val(year);
	$(eMonthId).val(month);
	$(eDayId).val(day);
}

function drawFirstDateOfMonth(eYearId, eMonthId, eDayId) {
	if (isNullOrEmpty(eYearId) || isNullOrEmpty(eMonthId) || isNullOrEmpty(eDayId)) return;
	
	const date = new Date();
	
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	
	if (month < 10) {
		month = '0' + month;
	}
	
	drawDate(eYearId, eMonthId, eDayId, year + '년', month + '월', '01일');
}

function drawToday(eYearId, eMonthId, eDayId) {
	if (isNullOrEmpty(eYearId) || isNullOrEmpty(eMonthId) || isNullOrEmpty(eDayId)) return;
	
	const date = new Date();
	
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	
	if (month < 10) {
		month = '0' + month;
	}
	
	if (day < 10) {
		day = '0' + day;
	}
	
	drawDate(eYearId, eMonthId, eDayId, year + '년', month + '월', day + '일');
}

function handleClickAllQuickSearch(elementFromDateId, elementToDateId) {
	let selectorFromDate;
	let selectorToDate;
	
	if (isNotNullAndNotEmpty(elementFromDateId)) {
		selectorFromDate = '#' + elementFromDateId;
	} else {
		selectorFromDate = '.date-from';
	}
	
	if (isNotNullAndNotEmpty(elementToDateId)) {
		selectorToDate = '#' + elementToDateId;
	} else {
		selectorToDate = '.date-to';
	}
	
	let now = new Date();
	let elementYears;
	let elementFromYear;
	let fromYear;
	let toYear = now.getFullYear();
	let toMonth = convertToZeroDecimal(now.getMonth() + 1);
	let toDay = convertToZeroDecimal(now.getDate());
	
	elementYears = $(selectorFromDate + ' .years-select .options').children();
	if (isNullOrEmpty(elementYears) || elementYears.length === 0) return;
	
	elementFromYear = elementYears[0]
	fromYear = $(elementFromYear).text().trim();
	if (isNotNullAndNotEmpty(fromYear)) {
		fromYear = fromYear.endsWith('년') ? fromYear : fromYear + '년';
	} else {
		return;
	}
	
	elementYears = $(selectorToDate + ' .years-select .options').children();
	if (isNullOrEmpty(elementYears) || elementYears.length === 0) return;
	
	drawDate(
		selectorFromDate + ' .years-select .selected span',
		selectorFromDate + ' .months-select .selected span', 
		selectorFromDate + ' .days-select .selected span',
		fromYear, '01월', '01일'
	);
	
	drawDate(
		selectorToDate + ' .years-select .selected span',
		selectorToDate + ' .months-select .selected span', 
		selectorToDate + ' .days-select .selected span',
		toYear + '년', toMonth + '월', toDay + '일'
	);
}

function handleClickThisMonthQuickSearch(elementFromDateId, elementToDateId) {
	let selectorFromDate;
	let selectorToDate;

	if (isNotNullAndNotEmpty(elementFromDateId)) {
		selectorFromDate = '#' + elementFromDateId;
	} else {
		selectorFromDate = '.date-from';
	}
	
	if (isNotNullAndNotEmpty(elementToDateId)) {
		selectorToDate = '#' + elementToDateId;
	} else {
		selectorToDate = '.date-to';
	}
	
	const today = new Date();
	const thisYear = today.getFullYear();
	
	let thisMonth = today.getMonth() + 1;
	if (thisMonth < 10) thisMonth = '0' + thisMonth;	
	
	let tmp = today.getMonth() + 1;
	let endDay = '31일';
	if (tmp == 2) {
		if (isLeapYear(thisYear)) {
			endDay = '29일';
		} else {
			endDay = '28일';
		}
	} else if (tmp == 4 || tmp == 6 || tmp == 9 || tmp == 11) {
		endDay = '30일';
	}
	
	drawDate(
		selectorFromDate + ' .years-select .selected span',
		selectorFromDate + ' .months-select .selected span', 
		selectorFromDate + ' .days-select .selected span',
		thisYear + '년', thisMonth + '월', '01일'
	);
	
	drawDate(
		selectorToDate + ' .years-select .selected span',
		selectorToDate + ' .months-select .selected span', 
		selectorToDate + ' .days-select .selected span',
		thisYear + '년', thisMonth + '월', endDay
	);
}

function handleClickPreviousMonthQuickSearch(elementFromDateId, elementToDateId) {
	let selectorFromDate;
	let selectorToDate;
	
	if (isNotNullAndNotEmpty(elementFromDateId)) {
		selectorFromDate = '#' + elementFromDateId;
	} else {
		selectorFromDate = '.date-from';
	}
	
	if (isNotNullAndNotEmpty(elementToDateId)) {
		selectorToDate = '#' + elementToDateId;
	} else {
		selectorToDate = '.date-to';
	}
	
	const today = new Date();
	const thisYear = today.getFullYear();
	
	let month = today.getMonth();
	if (month < 10) month = '0' + month;	
	
	let tmp = today.getMonth();
	let endDay = '31일';
	if (tmp == 2) {
		if (isLeapYear(thisYear)) {
			endDay = '29일';
		} else {
			endDay = '28일';
		}
	} else if (tmp == 4 || tmp == 6 || tmp == 9 || tmp == 11) {
		endDay = '30일';
	}
	
	drawDate(
		selectorFromDate + ' .years-select .selected span',
		selectorFromDate + ' .months-select .selected span', 
		selectorFromDate + ' .days-select .selected span',
		thisYear + '년', month + '월', '01일'
	);
	
	drawDate(
		selectorToDate + ' .years-select .selected span',
		selectorToDate + ' .months-select .selected span', 
		selectorToDate + ' .days-select .selected span',
		thisYear + '년', month + '월', endDay
	);
}

function handleClickPrevious3MonthsQuickSearch(elementFromDateId, elementToDateId) {
	let selectorFromDate;
	let selectorToDate;
	
	if (isNotNullAndNotEmpty(elementFromDateId)) {
		selectorFromDate = '#' + elementFromDateId;
	} else {
		selectorFromDate = '.date-from';
	}
	
	if (isNotNullAndNotEmpty(elementToDateId)) {
		selectorToDate = '#' + elementToDateId;
	} else {
		selectorToDate = '.date-to';
	}
	
	const today = new Date();
	const thisYear = today.getFullYear();
	
	let month = today.getMonth() - 1;
	if (month < 10) month = '0' + month;	
	
	let currentMonth = today.getMonth() + 1;
	if (currentMonth < 10) currentMonth = '0' + currentMonth;	
	
	let tmp = today.getMonth() + 1;
	let endDay = '31일';
	if (tmp == 2) {
		if (isLeapYear(thisYear)) {
			endDay = '29일';
		} else {
			endDay = '28일';
		}
	} else if (tmp == 4 || tmp == 6 || tmp == 9 || tmp == 11) {
		endDay = '30일';
	}
	
	drawDate(
		selectorFromDate + ' .years-select .selected span',
		selectorFromDate + ' .months-select .selected span', 
		selectorFromDate + ' .days-select .selected span',
		thisYear + '년', month + '월', '01일'
	);
	
	drawDate(
		selectorToDate + ' .years-select .selected span',
		selectorToDate + ' .months-select .selected span', 
		selectorToDate + ' .days-select .selected span',
		thisYear + '년', currentMonth + '월', endDay
	);
}

function handleClickThisYearQuickSearch(elementFromDateId, elementToDateId) {
	let selectorFromDate;
	let selectorToDate;
	
	if (isNotNullAndNotEmpty(elementFromDateId)) {
		selectorFromDate = '#' + elementFromDateId;
	} else {
		selectorFromDate = '.date-from';
	}
	
	if (isNotNullAndNotEmpty(elementToDateId)) {
		selectorToDate = '#' + elementToDateId;
	} else {
		selectorToDate = '.date-to';
	}
	
	const today = new Date();
	const thisYear = today.getFullYear();
	
	drawDate(
		selectorFromDate + ' .years-select .selected span',
		selectorFromDate + ' .months-select .selected span', 
		selectorFromDate + ' .days-select .selected span',
		thisYear + '년', '01월', '01일'
	);
	
	drawDate(
		selectorToDate + ' .years-select .selected span',
		selectorToDate + ' .months-select .selected span', 
		selectorToDate + ' .days-select .selected span',
		thisYear + '년', '12월', '31일'
	);
}

function handleClickLastYearQuickSearch(elementFromDateId, elementToDateId) {
	let selectorFromDate;
	let selectorToDate;
	
	if (isNotNullAndNotEmpty(elementFromDateId)) {
		selectorFromDate = '#' + elementFromDateId;
	} else {
		selectorFromDate = '.date-from';
	}
	
	if (isNotNullAndNotEmpty(elementToDateId)) {
		selectorToDate = '#' + elementToDateId;
	} else {
		selectorToDate = '.date-to';
	}
	
	const today = new Date();
	const lastyear = today.getFullYear() - 1;
	
	drawDate(
		selectorFromDate + ' .years-select .selected span',
		selectorFromDate + ' .months-select .selected span', 
		selectorFromDate + ' .days-select .selected span',
		lastyear + '년', '01월', '01일'
	);
	
	drawDate(
		selectorToDate + ' .years-select .selected span',
		selectorToDate + ' .months-select .selected span', 
		selectorToDate + ' .days-select .selected span',
		lastyear + '년', '12월', '31일'
	);
}

function getDateFromDropdown(selector) {
    if (isNullOrEmpty(selector)) return null;

    const strYear = $(selector + ' .years-select .selected span').text().trim();
    const strMonth = $(selector + ' .months-select .selected span').text().trim();
    const strDay = $(selector + ' .days-select .selected span').text().trim();

    const year = Number(strYear.substring(0, 4));
    const month = Number(strMonth.substring(0, 2));
    const day = Number(strDay.substring(0, 2));

    return new Date(year, month - 1, day);
}

function getStrDateFromDropdown(selector, format) {
    if (isNullOrEmpty(selector)) return '';
	
	if (typeof selector === 'string' && !(selector.startsWith('.') || selector.startsWith('#'))) {
		selector = '#' + selector;
	}
	
	const strYear = $(selector + ' .years-select .selected span').text().trim();
    const strMonth = $(selector + ' .months-select .selected span').text().trim();
    const strDay = $(selector + ' .days-select .selected span').text().trim();

    const year = strYear.substring(0, 4);
    const month = strMonth.substring(0, 2);
    const day = strDay.substring(0, 2);
	
	if (isNullOrEmpty(year) || isNullOrEmpty(month) || isNullOrEmpty(day)) return '';
	
	if (format === 'yyyy-mm-dd' || format === 'yyyy-MM-dd') {
		return year + '-' + month + '-' + day;
	} else if (format === 'yyyymmdd' || format === 'yyyyMMdd') {
		return year + month + day;
	} else {
		return year + '-' + month + '-' + day;
	}
}

function getStrDateYYYYMMFromDropdown(selector) {
    if (isNullOrEmpty(selector)) return '';
	
	if (typeof selector === 'string' && !(selector.startsWith('.') || selector.startsWith('#'))) {
		selector = '#' + selector;
	}
	
	const strYear = $(selector + ' .years-select .selected span').text().trim();
    const strMonth = $(selector + ' .months-select .selected span').text().trim();

    const year = strYear.substring(0, 4);
    const month = strMonth.substring(0, 2);
	
	if (isNullOrEmpty(year) || isNullOrEmpty(month)) return '';
	
	return year + month;
}

function compareDate(date1, date2) {
    if (isNullOrEmpty(date1) || isNullOrEmpty(date2)) return null;
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) return null;

    if (date1.getTime() == date2.getTime()) {
        return 0;
    } else if (date1.getTime() > date2.getTime()) {
        return 1;
    } else {
        return -1;
    }
}

function handleOnClickDate(selector, onClick) {
	if (isNullOrEmpty(selector) || typeof selector !== 'string') return;
	
	if (typeof selector === 'string' && !(selector.startsWith('.') || selector.startsWith('#'))) {
		selector = '#' + selector;
	}
	
	if (isNotNullAndNotEmpty(onClick) && typeof onClick === 'function') {
		onClick();
	} else {
		if ($(selector).hasClass('date-to')) {
			const elemetFromDate = $('.date-from');
			
			if (isNotNullAndNotEmpty(elemetFromDate) && elemetFromDate.length > 0) {
				const fromDate =  getDateFromDropdown('.date-from');
				const toDate = getDateFromDropdown(selector);
				
				if (compareDate(fromDate, toDate) > 0) {
					let year = toDate.getFullYear();
					let month = toDate.getMonth() + 1;
					let day = toDate.getDate();
					
					if (month < 10) {
						month = '0' + month;
					}
					
					if (day < 10) {
						day = '0' + day;
					}
					
					drawDate(
						'.date-from .years-select .selected span',
						'.date-from .months-select .selected span', 
						'.date-from .days-select .selected span',
						year + '년', month + '월', day + '일'
					);
				}
			}
		} else if ($(selector).hasClass('date-from')) {
			const elemetToDate = $('.date-to');
			
			if (isNotNullAndNotEmpty(elemetToDate) && elemetToDate.length > 0) {
				const fromDate = getDateFromDropdown(selector);
				const toDate = getDateFromDropdown('.date-to');
				
				if (compareDate(fromDate, toDate) > 0) {
					let year = fromDate.getFullYear();
					let month = fromDate.getMonth() + 1;
					let day = fromDate.getDate();
					
					if (month < 10) {
						month = '0' + month;
					}
					
					if (day < 10) {
						day = '0' + day;
					}
					
					drawDate(
						'.date-to .years-select .selected span',
						'.date-to .months-select .selected span', 
						'.date-to .days-select .selected span',
						year + '년', month + '월', day + '일'
					);
				}
			}
		}
	}

}

function setDateSelector(selector, onClickOption) {
	if (isNullOrEmpty(selector) || typeof selector !== 'string') return;
	
	if (typeof selector === 'string' && !(selector.startsWith('.') || selector.startsWith('#'))) {
		selector = '#' + selector;
	}

	drawFirstDateOfMonth(
		'.date-from .years-select .selected span',
		'.date-from .months-select .selected span',
		'.date-from .days-select .selected span'
	);
	
	drawToday(
		'.date-to .years-select .selected span',
		'.date-to .months-select .selected span',
		'.date-to .days-select .selected span'
	);

	const tempMonth = new Date().getMonth() + 1;
	const year = new Date().getFullYear();
	const days = $(selector + ' .days-select .options .option');
	if (tempMonth === 2) {
		if (isLeapYear(year)) {
			$(days[29]).hide();
			$(days[30]).hide();
		} else {
			$(days[28]).hide();
			$(days[29]).hide();
			$(days[30]).hide();
		}	
	} else if (tempMonth === 4 || tempMonth === 6 || tempMonth === 9 || tempMonth === 11) {
		$(days[30]).hide();
	}
	
	$(selector + ' .days-select .options .option').on('click', function() {
		handleOnClickDate(selector);
		
		if (isNotNullAndNotEmpty(onClickOption) && typeof onClickOption === 'function') {
			setTimeout(function() {
				onClickOption();
			}, 150);
		}
	});
	
	$(selector + ' .months-select .options .option').on('click', function() {
		$(selector + ' .days-select .options .option').show();
		
		const strYear = $(selector + ' .years-select .selected span').text();
		if (isNotNullAndNotEmpty(strYear)) {
			const year = Number(strYear.trim().substring(0, 4));	
			
			const strMonth = $(this).text();
			if (isNotNullAndNotEmpty(strMonth)) {
				const month =  Number(strMonth.trim().substring(0, 2));
				
				const days = $(selector + ' .days-select .options .option');
				
				if (month === 2) {
					if (isLeapYear(year)) {
						$(days[29]).hide();
						$(days[30]).hide();
					} else {
						$(days[28]).hide();
						$(days[29]).hide();
						$(days[30]).hide();
					}	
				} else if (month === 4 || month === 6 || month === 9 || month === 11) {
					$(days[30]).hide();
				}
			}
		}
		
		setTimeout(function() {
			handleOnClickDate(selector);
		}, 100);
		
		if (isNotNullAndNotEmpty(onClickOption) && typeof onClickOption === 'function') {
			setTimeout(function() {
				onClickOption();
			}, 150);
		}
	});
	
	$(selector + ' .years-select .options .option').on('click', function() {
		$(selector + ' .days-select .options .option').show();
		
		const strYear = $(this).text();
		if (isNotNullAndNotEmpty(strYear)) {
			const year = Number(strYear.trim().substring(0, 4));	

			const strMonth = $(selector + ' .months-select .selected span').text();
			if (isNotNullAndNotEmpty(strMonth)) {
				const month =  Number(strMonth.trim().substring(0, 2));
				
				const days = $(selector + ' .days-select .options .option');
				
				if (month === 2) {
					if (isLeapYear(year)) {
						$(days[29]).hide();
						$(days[30]).hide();
					} else {
						$(days[28]).hide();
						$(days[29]).hide();
						$(days[30]).hide();
					}	
				} else if (month === 4 || month === 6 || month === 9 || month === 11) {
					$(days[30]).hide();
				}
			}
		}
		setTimeout(function() {
			handleOnClickDate(selector);
		}, 100);
		
		if (isNotNullAndNotEmpty(onClickOption) && typeof onClickOption === 'function') {
			setTimeout(function() {
				onClickOption();
			}, 150);
		}
	});
}

//formatDate
function formatDate(date, patternStr) {
	if (!patternStr) {
		patternStr = 'M/d/yyyy';
	}
	var day = date.getDate(),
		month = date.getMonth(),
		year = date.getFullYear(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		second = date.getSeconds(),
		miliseconds = date.getMilliseconds(),
		h = hour % 12,
		hh = twoDigitPad(h),
		HH = twoDigitPad(hour),
		MM = twoDigitPad(minute),
		ss = twoDigitPad(second),
		aaa = hour < 12 ? 'AM' : 'PM',
		dd = twoDigitPad(day),
		m = month + 1,
		mm = twoDigitPad(m),
		yyyy = year + "",
		yy = yyyy.substr(2, 2)
		;

	patternStr = patternStr
		.replace('hh', hh).replace('h', h)
		.replace('HH', HH).replace('H', hour)
		.replace('MM', MM).replace('M', minute)
		.replace('ss', ss).replace('s', second)
		.replace('S', miliseconds)
		.replace('dd', dd).replace('d', day)
		.replace('yyyy', yyyy)
		.replace('yy', yyyy)
		.replace('aaa', aaa)
		.replace('mm', mm)
		.replace('m', m);
	return patternStr;
}


//twoDigitPad
function twoDigitPad(num) {
	return num < 10 ? "0" + num : num;
}
