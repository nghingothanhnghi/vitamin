function Grid(
    resultId = '',
    method = 'GET',
    searchUrl = '',
    countUrl = '',
    columns = [],
    pagination = true,
    rownumbers = false,
    onSuccess,
    onClickRow,
    sumUrl = '',
    hasFooter = false,
    footers = []
) {
    this.resultId = resultId;

    this.method = method;
    this.searchUrl = searchUrl;
    this.countUrl = countUrl;

    this.columns = columns;

    this.pagination = pagination;
    this.rownumbers = rownumbers;

    this.onSuccess = onSuccess;
    this.onClickRow = onClickRow;

    this.page = 0;
    this.len = 12;
    this.params = {sort: []};
    
    this.sumUrl = sumUrl;
    this.hasFooter = hasFooter;
    this.footers = footers;

	this.STR_ASC = "ASC";
	this.STR_DESC = "DESC";

    let self = this;

    this.load = function () {
        if (isNotNullAndNotEmpty(self.resultId)) {
            self.loadGrid();

            if (self.pagination) {
                self.loadPagination(1, 1);
            }
            
            if (self.hasFooter) {
                self.loadFooter();
            }
        }
    }

    this.loadGrid = function () {
    	$(".block-loading").addClass('is-loading');
        $('#' + self.resultId + ' table.hr-table tbody').html('');
        $('#' + self.resultId + ' table.hr-mobile-table').html('');

        if (self.pagination) {
			self.len = self.getLen();
	
            self.params.page = self.page;
            self.params.len = self.len;
        }

        if (self.method.toLowerCase() === 'get') {
            $.ajax({
                url: self.searchUrl,
                type: "GET",
                data: self.params,
                success: function (data) {
                    var res = { data: data };
                    if(self.columns.length > 0){
                    	self.renderGrid(res);
                    }
                    
                    if (isNotNullAndNotEmpty(self.onSuccess) && typeof self.onSuccess == 'function') {
		                self.onSuccess(data);
		            }
		            $(".block-loading").removeClass('is-loading');
                },
                error: function(err) {
					 $(".block-loading").removeClass('is-loading');
				}
            })
        } else if (self.method.toLowerCase() === 'post') {
            axios
                .post(self.searchUrl, self.params)
                .then(function (res) {
                    self.renderGrid(res);
                    if(self.columns.length > 0){
                    	self.renderGrid(res);
                    }
                                        
                    if (isNotNullAndNotEmpty(self.onSuccess) && typeof self.onSuccess == 'function') {
		                self.onSuccess(res.data);
		            }
		            $(".block-loading").removeClass('is-loading');
                })
                .catch(function(err) {
					$(".block-loading").removeClass('is-loading');
				})
        }
    }

    this.renderGrid = function (res) {
        const data = res.data;

        let htmlPc = '';
        let htmlMoblie = '';

        let item;
		
		let stylePc = '';
		let styleMobile = '';
		
		let classesPc = '';
		let classesMobile = '';
		
		let tmp;
		
        for (let i = 0; i < data.length; i++) {
            item = data[i];

            htmlPc += '<tr id="grid-' + self.resultId + '-pc-row_' + i + '" row="' + i + '">';
            htmlMoblie += '<tbody id="grid-' + self.resultId + '-mobile-row_' + i + '" row="' + i + '">';

            if (rownumbers) {
                const no = ((self.page + 1) > 0 ? parseInt(((self.page + 1) * self.len) - self.len) : 0) + i + 1;
                htmlPc += "<td>" + no + "</td>";

                htmlMoblie += "<tr>";
                htmlMoblie += "<td>NO</td>";
                htmlMoblie += "<td>" + no + "</td>";
                htmlMoblie += "<tr>";
            }

            for (var j = 0; j < self.columns.length; j++) {
				if (isNotNullAndNotEmpty(self.columns[j].hidden) && self.columns[j].hidden === true) continue;
				
				stylePc = 'style="white-space: nowrap;';
				styleMobile = 'style="';
				
				if (self.columns[j].align === 'center') {
					stylePc += 'text-align: center;';
				} else if (self.columns[j].align === 'left') {
					stylePc += 'text-align: left;';
				} if (self.columns[j].align === 'right') {
					stylePc += 'text-align: right;';
				}
				
				
				if (isNotNullAndNotEmpty(self.columns[j].onClickCell) && typeof self.columns[j].onClickCell === 'function') {
					stylePc += 'cursor: pointer;';
				} else if (isNotNullAndNotEmpty(self.onClickRow) && typeof self.onClickRow === 'function') {
					stylePc += 'cursor: pointer;';
				}
				
				if (self.columns[j].stylePc) {
					stylePc += self.columns[j].stylePc;
				}
				if (self.columns[j].styleMobile) {
					styleMobile += self.columns[j].styleMobile;
				}
				
				stylePc += '"';
				styleMobile += '"';
				
				classesPc = 'class="';
				classesMobile = 'class="';
				
				if (self.columns[j].classesPc) {
					classesPc += self.columns[j].classesPc;
				}
				if (self.columns[j].classesMobile) {
					classesMobile += self.columns[j].classesMobile;
				}
				
				classesPc += '"';
				classesMobile += '"';
				
                htmlMoblie += "<tr row='" + i + "' cell='" + j + "'>";
                htmlMoblie += "<td>" + toString(self.columns[j].title) + "</td>";

				htmlPc += "<td " + stylePc + " " + classesPc + " cell='" + j + "' row='" + i + "'>";
				htmlMoblie += "<td " + styleMobile + " " + classesMobile + ">";
				
                if (isNotNullAndNotEmpty(self.columns[j].formatter) && typeof self.columns[j].formatter === 'function') {
                    htmlPc += self.columns[j].formatter(item[self.columns[j].field], i, item);
                    htmlMoblie += self.columns[j].formatter(item[self.columns[j].field], i, item);
                } else {
                    htmlPc += toString(item[self.columns[j].field]);
                    htmlMoblie += toString(item[self.columns[j].field]);
                }
                
                htmlPc += "</td>";
				htmlMoblie += "</td>";

                htmlMoblie += "</tr>";
            }

            htmlPc += '</tr>';
            htmlMoblie += "</tbody>";
        }
        
         if (data.length > 0 && data.length < 5) {
			for (let i = data.length; i < 5; i++) {
				htmlPc += 	'<tr id="grid-' + self.resultId + '-pc-row_' + i + '" row="' + i + '">';
				
				for (var j = 0; j < self.columns.length; j++) {
					htmlPc += "<td cell='" + j + "' row='" + i + "'>&nbsp;</td>";
				}
				
				htmlPc += '</tr>';
			}
		}
        
        if (data.length === 0) {
	
				
			for (let i = 0; i < 5; i++) {
				htmlPc += 	'<tr id="grid-' + self.resultId + 
							'-pc-row_' + i + '" row="' + i + '">';
				
				if (i === 0) {
					htmlMoblie += '<tbody class="empty-tbody" style="width: 100%; margin: 0" id="grid-' + self.resultId + '-mobile-row_' + i + '" row="' + i + '">';
				}
				
				for (var j = 0; j < self.columns.length; j++) {
					if (isNotNullAndNotEmpty(self.columns[j].hidden) && self.columns[j].hidden === true) continue;
					
					/*htmlPc += "<td cell='" + j + "' row='" + i + "'>&nbsp;</td>";*/
					
					if (j===2) {
						if (i===2) {
							htmlPc += "<td cell='" + j + "' row='" + i + "'>&nbsp;<span class='empty-warning h-small'>조회된 데이타가 없습니다.</span></td>";
						} else {
							htmlPc += "<td cell='" + j + "' row='" + i + "'>&nbsp;</td>";
						}
						
					} else {
						htmlPc += "<td cell='" + j + "' row='" + i + "'>&nbsp;</td>";
					}
					
					/*htmlPc += "<td cell='" + j + "' row='" + i + "'>&nbsp;</td>";*/
					
					
					if (i === 0) {
						
						if (j < 5) {
							htmlMoblie += "<tr row='" + i + "' cell='" + j + "'>";
							if (j== 0) {
								htmlMoblie += "<td style='width: 100%;'>&nbsp;<span class='h-small'>조회된 데이타가 없습니다.</span></td>";
							} else {
								htmlMoblie += "<td style='width: 100%;'>&nbsp;</td>";
							}
							
							htmlMoblie += '</tr>';
						}
						
					}
				}
				
				htmlPc += '</tr>';

				
				htmlMoblie += "</tbody>";

				htmlMoblie += "</tbody>";

				
				if (i === 0) {
					
					htmlMoblie += "</tbody>";
				}

			}
		}
        
       	$('#' + self.resultId + ' table.hr-table tbody').html(htmlPc);
       	$('#' + self.resultId + ' table.hr-mobile-table').html(htmlMoblie);

        $('#' + self.resultId + ' table.hr-table tbody tr td').on('click', function () {
            const index = parseInt($(this).attr('row'));
            const cell = parseInt($(this).attr('cell'));

            if (isNotNullAndNotEmpty(self.columns[cell].onClickCell) && typeof self.columns[cell].onClickCell == 'function') {
				self.columns[cell].onClickCell(data[index], index, data);
			} else if (isNotNullAndNotEmpty(self.onClickRow) && typeof self.onClickRow == 'function') {
	            self.onClickRow(data[index], index, data);
			}
        });

        $('#' + self.resultId + ' table.hr-mobile-table tbody tr').on('click', function () {
            const index = parseInt($(this).attr('row'));
            const cell = parseInt($(this).attr('cell'));

            if (isNotNullAndNotEmpty(self.columns[cell].onClickCell) && typeof self.columns[cell].onClickCell == 'function') {
				self.columns[cell].onClickCell(data[index], index, data);
			} else if (isNotNullAndNotEmpty(self.onClickRow) && typeof self.onClickRow == 'function') {
	            self.onClickRow(data[index], index, data);
			}
        });
        
        // remove css cursor pointer
		let temp;
		const tds = $('#' + self.resultId + ' table.hr-table tbody td');
		for (var i = 0; i < tds.length; i++) {
			temp = $(tds[i]);
			if (isNullOrEmpty($(temp).html())) {
				$(temp).css("cursor", "");
			}
		}
    }

    this.loadPagination = function (pageStart, newPage) {
        $('#' + self.resultId + ' .pagination .paging').html('');

        let len = $('#' + self.resultId + ' .pagination .dropdown-select .selected span').text();
        if (isNullOrEmpty(len)) {
            len = $('#' + self.resultId + ' .pagination .dropdown-select .selected span').val();
        }

        if (self.method.toLowerCase() === 'get') {
            $.ajax({
                url: self.countUrl,
                type: "GET",
                data: self.params,
                success: function (data) {
                    var res = { data: data };
                    self.renderPagination(res, pageStart, newPage);
                }
            })
        } else if (self.method.toLowerCase() === 'post') {
            axios
                .post(self.countUrl, self.params)
                .then(function (res) {
                    self.renderPagination(res, pageStart, newPage);
                });
        }
    }

    this.renderPagination = function (res, pageStart, newPage) {
        const total = res.data;

        var totalPage = 1;
        var html = '';

		var _dFirst = {};
		var _dPrev = {};
		var _dNext = {};
		var _dLast = {};

		_dFirst = _mapSvgIcons.get("first");
		_dPrev = _mapSvgIcons.get("prev");
		_dNext = _mapSvgIcons.get("next");
		_dLast = _mapSvgIcons.get("last");
		
		if (isNullOrEmpty(_dFirst)) _dFirst = {};
		if (isNullOrEmpty(_dPrev)) _dPrev = {};
		if (isNullOrEmpty(_dNext)) _dNext = {};
		if (isNullOrEmpty(_dLast)) _dLast = {};

        if (total > 0) {
            totalPage = (total / self.len) | 0;
			pageStart = +pageStart;

            if (total % self.len > 0) {
                totalPage += 1;
            }

            if (totalPage <= 5) {
				html += '<div id="prev" class="col-auto nav-btn">';
                html += '<svg width="34" height="34" viewBox="0 0 34 34">';
                html += '<path class="shape" d="' + toString(_dPrev.soild) + '"/>';
                html += '</svg>';
                html += '</div>';
                html += '<div class="numbers col-auto row" >';

                for (var i = 1; i <= totalPage; i++) {
                    html += '<div page="' + i + '" id="pagination-' + self.resultId + '-page_' + i + '" class="number col-auto';

                    if (i == 1) {
                        html += ' active"';
                    }

                    html += '"><span>' + i + '</span></div>';
                }

                html += '</div>';

                html += '<div id="next" class="col-auto nav-btn">';
                html += '<svg width="34" height="34" viewBox="0 0 34 34">';
                html += '<path class="shape" d="' + toString(_dNext.soild) + '" />';
                html += '</svg>';
                html += '</div>';
            } else {
                html += '<div class="btns-left col-auto row">';
                html += '<div id="first" class="col-auto nav-btn">';
                html += '<svg width="34" height="34" viewBox="0 0 34 34">';
                html += '<path class="shape" d="' + toString(_dFirst.soild) + '" />';
                html += '</svg>';
                html += '</div>';
                html += '<div id="prev" class="col-auto nav-btn">';
                html += '<svg width="34" height="34" viewBox="0 0 34 34">';
                html += '<path class="shape" d="' + toString(_dPrev.soild) + '" />';
                html += '</svg>';
                html += '</div>';
                html += '</div>';
                html += '<div class="numbers col-auto row" >';

                for (var i = 0; i < 5; i++) {
                    html += '<div page="' + (pageStart + i) + '" id="pagination-' + self.resultId + '-page_' + (pageStart + i) + '" class="number col-auto';

                    if (pageStart + i == newPage) {
                        html += ' active"';
                    }

                    html += '"><span>' + (pageStart + i) + '</span></div>';

                    if (pageStart + i == totalPage) {
                        break;
                    }
                }
                
                html += '</div>';
                html += '<div class="btns-right col-auto row">';
                html += '<div id="next" class="col-auto nav-btn">';
                html += '<svg width="34" height="34" viewBox="0 0 34 34">';
                html += '<path class="shape" d="' + toString(_dNext.soild) + '" />';
                html += '</svg>';
                html += '</div>';
                html += '<div id="last" class="col-auto nav-btn">';
                html += '<svg width="34" height="34" viewBox="0 0 34 34">';
				html += '<path class="shape" d="' + toString(_dLast.soild) + '" />';
                html += '</svg>';
                html += '</div>';
                html += '</div>';
            }
        }

        html += '<input type="hidden" id="pagination-' + self.resultId + '-currentPage" value="' + newPage + '" />';
        html += '<input type="hidden" id="pagination-' + self.resultId + '-totalPage" value="' + totalPage + '" />';

        $('#' + self.resultId + ' .pagination .paging').html(html);
        $('#' + self.resultId + ' .pagination .total .value').text(total);

        $('#' + self.resultId + ' .pagination .paging #first').on('click', function () {
            self.handleOnClickPage(1);
        });

        $('#' + self.resultId + ' .pagination .paging #last').on('click', function () {
            self.handleOnClickPage(totalPage);
        });

        $('#' + self.resultId + ' .pagination .paging #prev').on('click', function () {
            self.handleOnClickPage('-');
        });

        $('#' + self.resultId + ' .pagination .paging #next').on('click', function () {
            self.handleOnClickPage('+');
        });

        $('#' + self.resultId + ' .pagination .paging div div.number').on('click', function () {
            var page = $(this).attr('page');
            /*if (totalPage > 5) {
                page++;
            }*/

            self.handleOnClickPage(page);
        });

        $('#' + self.resultId + ' .pagination .dropdown-select .options .option').on('click', function () {
            const len = $(this).text();
            if (isNotNullAndNotEmpty(len)) {
				if (len == self.len) return;
				
                self.page = 0;
                self.len = +len;

                self.loadGrid();
                self.loadPagination(1, 1);
            }
        });
    }

    this.handleOnClickPage = function (page) {
        if (!page) return;

        var oldPage = $('#pagination-' + self.resultId + '-currentPage').val();
        var totalPage = $('#pagination-' + self.resultId + '-totalPage').val();

        var newPage = '';

        if (page == oldPage) return;

        if (page == '+') {
            if (oldPage == totalPage) return;

            newPage = +oldPage + 1;
            if (newPage % 5 == 1) {
                self.loadPagination(newPage, newPage);
            }
        } else if (page == '-') {
            if (oldPage == 1) return;

            newPage = +oldPage - 1;
            if (newPage % 5 == 0) {
                self.loadPagination(newPage - 4, newPage);
            }
        } else {
            newPage = page;

            if (newPage == 1) {
                self.loadPagination(newPage, newPage);
            } else if (newPage == totalPage) {
                if (newPage % 5 == 0) {
                    if (oldPage < newPage - 4) {
                        self.loadPagination(newPage - 4, newPage);
                    }
                } else {
                    if (oldPage < (newPage - (newPage % 5 - 1))) {
                        self.loadPagination(newPage - (newPage % 5 - 1), newPage);
                    }
                }
            }
        }

        let len = $('#' + self.resultId + ' .pagination .dropdown-select .selected span').text();
        if (isNullOrEmpty(len)) {
            len = $('#' + self.resultId + ' .pagination .dropdown-select .selected span').val();
        }

        self.page = newPage - 1;
        self.loadGrid();

        $('#pagination-' + self.resultId + '-currentPage').val(newPage);
        $('#' + self.resultId + ' .pagination .paging div div.number').removeClass('active');
        $('#pagination-' + self.resultId + '-page_' + newPage).addClass('active');
    }

    this.setSearchUrl = function (url) {
        self.searchUrl = url;
    }

    this.setCountUrl = function (url) {
        self.countUrl = url;
    }

    this.setParams = function (param, defaultSort = []) {
		const sort = self.params.sort;
		
        self.params = param;
        if (isNullOrEmpty(param.sort)) {
	        if (isNullOrEmpty(sort)) {
				self.params.sort = defaultSort;		
			} else {
		        self.params.sort = sort;
			}
		} 
    }
    
    this.clearSort = function() {
		$('#' + self.resultId + ' table.hr-table thead th span').html('');
		self.params.sort = [];
		self.page = 0;
		self.len = self.getLen();
	}

    this.getLen = function () {
       	let len = "10";

		const _span = $('#' + self.resultId + ' .pagination .dropdown-select .selected span');
		
		if (_span.length > 1) {
			len = $(_span[0]).text();
		} else {
			len = $(_span).text();
		}
		
        return +len.trim();
    }
    
    this.setPage = function(page) {
		self.page = page;
	}
    
    this.setSumUrl = function (url) {
        self.sumUrl = url;
    }
    
    this.loadFooter = function () {
        $('#' + self.resultId + ' table.hr-table tfoot').html('');

        if (self.method.toLowerCase() === 'get') {
            $.ajax({
                url: self.sumUrl,
                type: "GET",
                data: self.params,
                success: function (data) {
                    var res = { data: data };
                    self.renderFooter(res);
                }
            })
        } else if (self.method.toLowerCase() === 'post') {
            axios
                .post(self.sumUrl, self.params)
                .then(function (res) {
                    self.renderFooter(res);
                });
        }
    }
    
    this.renderFooter = function (res) {
        const data = res.data;

		let classes = '';
		let style = '';
        let htmlPc = '';

        htmlPc += '<tr style=' + style + '>';

        for (var j = 0; j < self.footers.length; j++) {
			classes = 'class="';			
			style = 'style="';
			
			if (self.footers[j].align === 'center') {
				style += 'text-align: center;';
			} else if (self.footers[j].align === 'left') {
				style += 'text-align: left;';
			} if (self.footers[j].align === 'right') {
				style += 'text-align: right;';
			}
			
			if (isNotNullAndNotEmpty(self.footers[j].classes)) {
				classes += self.footers[j].classes;
			}
			
			classes += '"';
			style += '"';
	
        	if (isNotNullAndNotEmpty(self.footers[j].colspan)) {
	            htmlPc += '<td colspan=' + self.footers[j].colspan + ' ' + style + ' ' + classes + '>';
	        } else {
	            htmlPc += '<td ' + style + ' ' + classes + '>';
	        }
	        
            if (isNotNullAndNotEmpty(self.footers[j].formatter) && typeof self.footers[j].formatter === 'function') {
	            htmlPc += self.footers[j].formatter(data[self.footers[j].field], data);
	        } else {
	            htmlPc += toString(data[self.footers[j].field]);
	        }
	        htmlPc += '</td>';
        }

        htmlPc += '</tr>';
        
       	$('#' + self.resultId + ' table.hr-table tfoot').html(htmlPc);
    }
    
    this.renderHeader = function() {
    	$('#' + self.resultId + ' table.hr-table thead').html('');
    	
    	let htmlPc = '';
		let property = '';
		let classes = '';
		
        htmlPc += '<tr>';

		if (self.rownumbers) {
			htmlPc += "<th>NO</th>";
		}
		
        for (var j = 0; j < self.columns.length; j++) {
			if (isNotNullAndNotEmpty(self.columns[j].hidden) && self.columns[j].hidden === true) continue;
			
			property = toString(self.columns[j].sortBy)
			if (isNotNullAndNotEmpty(property)) {
				classes = 'cursor-pointer';
			} else {
				classes = '';
			}
			
            htmlPc += "<th style='white-space: nowrap;' class='" + classes + "' sort-by='" + property + "'>" + toString(self.columns[j].title) + "<span></span></th>";
        }

        htmlPc += '</tr>';
        
       	$('#' + self.resultId + ' table.hr-table thead').html(htmlPc);
       	
       	$('#' + self.resultId + ' table.hr-table thead th[sort-by]').on('click', function() {
			const sortBy = $(this).attr('sort-by');
			if (isNullOrEmpty(sortBy)) return;

			let direction;
			const span = $('#' + self.resultId + ' table.hr-table thead th[sort-by=' + sortBy + '] span');
			const i = $('#' + self.resultId + ' table.hr-table thead th[sort-by=' + sortBy + '] span i');
			if (i.hasClass('fa-sort-desc')) {
				$(span).html(' <i class="cursor-pointer fa fa-sort-asc"></i>');
				direction = self.STR_ASC;
			} else if (i.hasClass('fa-sort-asc')) {
				$(span).html(' <i class="cursor-pointer fa fa-sort-desc"></i>');
				direction = self.STR_DESC;
			} else {
				$(span).html(' <i class="cursor-pointer fa fa-sort-asc"></i>');
				direction = self.STR_ASC;
			}

			const sort = [...self.params.sort];
			if (isNotNullAndNotEmpty(sort)) {
				for (let i = 0; i < sort.length; i++) {
					if (sort[i].property === sortBy) {
						sort[i].direction = direction;
					} else {
						sort.push({property: sortBy, direction: direction});
					}
				}
			} else {
				sort.push({property: sortBy, direction: direction});
			}
			self.params.sort = sort;
			self.loadGrid();
		});
    }
}
