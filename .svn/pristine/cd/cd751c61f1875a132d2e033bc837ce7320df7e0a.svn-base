function Popup(
	popupElementId = '', 
	tablePCElementId = '', 
	tableMobileElementId = '', 
	pagingElementId = '', 
	lengthElementId = '', 
	totalElementId = '', 
	urlGird = '', 
	urlCount = '', 
	columns = [], 
	pagination = true, 
	rownumbers = false, 
	onLoadSuccess, 
	onClickRow, 
	onClose
) {
	this.popupElementId = popupElementId;
	this.tableElementId = tablePCElementId;
	this.tableMobileElementId = tableMobileElementId;
	this.pagingElementId = pagingElementId;
	this.lengthElementId = lengthElementId;
	this.totalElementId = totalElementId;
		
	this.urlGird = urlGird;
	this.urlCount = urlCount;
	
	this.columns = columns;
	
	this.pagination = pagination;
	this.rownumbers = rownumbers;
	
	this.onLoadSuccess = onLoadSuccess;
	this.onClickRow = onClickRow;
	this.onClose = onClose;
	
	this.page = 0;
	this.len = 10;
	
	this.method = 'POST';
	
	this.queryData = {};
	
	var self = this;
	
	this.loadGird = function() {
		if (isNotNullAndNotEmpty(self.popupElementId)) {
			this.loadData();
			
			if (self.pagination) {
				this.loadPageNumber();
			}
		}
	}
	
	this.loadData = function() {
		setIsLoading(true);
		
		$('#' + self.tableElementId).html('');
		$('#' + self.tableMobileElementId).html('');

		if (self.pagination) {
			this.queryData.page = this.page;
			this.queryData.len = this.len;
		}
		
		if (this.method.toLowerCase() === 'get') {
			$.ajax({
				url: this.urlGird,
				type: "GET",
				data : this.queryData,
				success: function(data){
					var res = {data: data};
					self.renderGrid(res);
					
					setIsLoading(false);
				},
				error: function() {
					setIsLoading(false);
				}
			})
		} else {
			axios
				.post(self.urlGird, this.queryData)
				.then(function(res) {
					self.renderGrid(res);
					
					setIsLoading(false);
				})
				.catch(function(err) {
					setIsLoading(false);
				})
		}
		
	}
	
	this.renderGrid = function(res) {
		const data = res.data;

		var htmlPc = '';
		var htmlMoblie = '';
		
		var item;
		let stylePc = '';
		
			
		for (var i = 0; i < data.length; i++) {
			item = data[i];
			
			htmlPc += "<tr id='pc-row-" + self.popupElementId + '_' + i + "' row='" + i + "'>";
			htmlMoblie += "<tbody id='mobile-row-"  + self.popupElementId + '_' + i + "'>";
			
			if (rownumbers) {
				const no = ((self.page + 1) > 0 ? parseInt(((self.page + 1) * self.len) - self.len) : 0) + i + 1;
				htmlPc += "<td>" + no + "</td>";
				
				htmlMoblie += "<tr>";	
				htmlMoblie += "<td>순번</td>";
				htmlMoblie += "<td>" + no + "</td>";
				htmlMoblie += "<tr>";	
			}
			
			for (var j = 0; j < self.columns.length; j++) {
			
				stylePc = 'style="';
				
				if (self.columns[j].align === 'center') {
					stylePc += 'text-align: center;';
				} else if (self.columns[j].align === 'left') {
					stylePc += 'text-align: left;';
				} if (self.columns[j].align === 'right') {
					stylePc += 'text-align: right;';
				}
				
				stylePc += '"';
				
				htmlMoblie += "<tr>";						
				htmlMoblie += "<td>" + toString(self.columns[j].title) + "</td>";
				
				htmlPc += "<td " + stylePc + "'>";
				
				if (isNotNullAndNotEmpty(self.columns[j].formatter) && typeof self.columns[j].formatter === 'function') {
					htmlPc += self.columns[j].formatter(item[self.columns[j].field], i, item)
					htmlMoblie += "<td>" + self.columns[j].formatter(item[self.columns[j].field], i, item) + "</td>";
				} else {
					htmlPc += toString(item[self.columns[j].field]);
					htmlMoblie += "<td>" + toString(item[self.columns[j].field]) + "</td>";
				}
				
				htmlMoblie += "</tr>";
			}
			
			htmlPc += "</td>";
			htmlPc += "</tr>";
			htmlMoblie += "</tbody>";
		}
		
		if (data.length > 0 && data.length < 5) {
			for (let i = data.length; i < 5; i++) {
				htmlPc += 	'<tr>';
				
				if (rownumbers) {
					htmlPc += "<td>&nbsp;</td>";
				}
				
				for (var j = 0; j < self.columns.length; j++) {
					htmlPc += "<td>&nbsp;</td>";
				}
				
				htmlPc += '</tr>';
			}
		}
		
		 if (data.length === 0) {
			for (let i = 0; i < 5; i++) {
				htmlPc += 	'<tr>';
				
				if (i === 0) {
					htmlMoblie += '<tbody class="empty-tbody" style="width: 100%; margin: 0">';
				}
				
				if (rownumbers) {
					htmlPc += "<td>&nbsp;</td>";
				}
				
				for (var j = 0; j < self.columns.length; j++) {
					if (isNotNullAndNotEmpty(self.columns[j].hidden) && self.columns[j].hidden === true) continue;
					
					if (rownumbers) {
						if (j===1) {
							if (i===2) {
								htmlPc += "<td>&nbsp;<span class='empty-warning h-small'>조회된 데이타가 없습니다.</td>";
							} else {
								htmlPc += "<td>&nbsp;</td>";
							}
						} else {
							htmlPc += "<td>&nbsp;</td>";
						}
					} else {
						if (j===2) {
							if (i===2) {
								htmlPc += "<td>&nbsp;<span class='empty-warning h-small'>조회된 데이타가 없습니다.</td>";
							} else {
								htmlPc += "<td>&nbsp;</td>";
							}
						} else {
							htmlPc += "<td>&nbsp;</td>";
						}
					}
					
					if (i === 0) {
						if (j < 5) {
							htmlMoblie += "<tr>";
							
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
				htmlMoblie += "</tbody></tbody>";

				if (i === 0) {
					htmlMoblie += "</tbody>";
				}
			}
		}
		
		$('#' + self.tableElementId).html(htmlPc);
		$('#' + self.tableMobileElementId).html(htmlMoblie);
		
		if (isNotNullAndNotEmpty(self.onLoadSuccess) && typeof self.onLoadSuccess == 'function') {
			self.onLoadSuccess(data);
		}
		
		if (isNotNullAndNotEmpty(self.onClickRow) && typeof self.onClickRow == 'function') {
			$('#' + self.popupElementId + ' #' + self.tableElementId + ' tr').on('click', function(e) {
				const index = parseInt($(this).attr('row'));

				var popup = this.closest(".popup");
				popup.classList.remove("opened");
				
				self.onClickRow(data[index], index, data);
				
				if (isNotNullAndNotEmpty(self.onClose) && typeof self.onClose == 'function') {
					self.onClose(data[index], index, data);
				}
			});		
			
			$('#' + self.popupElementId + ' #' + self.tableMobileElementId + ' tbody').on('click', function(e) {
				const index = parseInt($(this).attr('row'));

				var popup = this.closest(".popup");
				popup.classList.remove("opened");
				
				self.onClickRow(data[index], index, data);
				
				if (isNotNullAndNotEmpty(self.onClose) && typeof self.onClose == 'function') {
					self.onClose(data[index], index, data);
				}
			});		
		}
	}
	
	this.setQueryData = function(queryData) {
		if (self.pagination) {
			if (isNullOrEmpty(queryData.page)) {
				queryData.page = this.page;
			} else {
				this.page = queryData.page;
			}
			
			if (isNullOrEmpty(queryData.len)) {
				queryData.len = this.len;
			} else {
				this.len = queryData.len;
			}
		}
		
		this.queryData = queryData;
	}
	
	this.loadPageNumber = function(pageStart, newPage) {
		$('#' + self.pagingElementId).html('');
		
		var len = $('#' + self.lengthElementId).text();
		if (isNullOrEmpty(len)) {
			len = $('#' + self.lengthElementId).val();
		}

		if (this.method.toLowerCase() === 'get') {
			$.ajax({
				url: this.urlCount,
				type: "GET",
				data : this.queryData,
				success: function(data){
					var res = {data: data};
					self.renderPageNumber(res, pageStart, newPage);
				}
			})
		} else {
			axios
				.post(self.urlCount, this.queryData)
				.then(function(res) {
					self.renderPageNumber(res, pageStart, newPage);
				});
		}
	}
	
	this.renderPageNumber = function(res, pageStart = 1, newPage = 1) {
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
			totalPage = (total / this.len) | 0;
			pageStart = +pageStart;
			
			if(total % this.len > 0){
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
					html += '<div page="' + i + '" id="pagination-' + self.popupElementId + '-page_' + i + '" class="number col-auto';
					
					if(i == 1){
						html += ' active"';
					}
					
					html += '"><span>' + i + '</span></div>';
				}
				
				html += '</div>';
				
				html += '<div id="next" class="col-auto nav-btn">';
				html += '<svg width="34" height="34" viewBox="0 0 34 34">';
				html += '<path class="shape" d="' + toString(_dNext.soild) + '"/>';
				html += '</svg>';
				html += '</div>';
			} else {
				html += '<div class="btns-left col-auto row">';
                html += '<div id="first" class="col-auto nav-btn">';
                html += '<svg width="48" height="34" viewBox="0 0 48 34">';
                html += '<path class="shape" d="' + toString(_dFirst.soild) + '"/>';
                html += '</svg>';
                html += '</div>';
                html += '<div id="prev" class="col-auto nav-btn">';
                html += '<svg width="48" height="34" viewBox="0 0 48 34">';
                html += '<path class="shape" d="' + toString(_dPrev.soild) + '"/>';
                html += '</svg>';
                html += '</div>';
                html += '</div>';
                html += '<div class="numbers col-auto row" >';

                for (var i = 0; i < 5; i++) {
                    html += '<div page="' + (pageStart + i) + '" id="pagination-' + self.popupElementId + '-page_' + (pageStart + i) + '" class="number col-auto';

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
                html += '<svg width="48" height="34" viewBox="0 0 48 34">';
                html += '<path class="shape" d="' + toString(_dNext.soild) + '"/>';
                html += '</svg>';
                html += '</div>';
                html += '<div id="last" class="col-auto nav-btn">';
                html += '<svg width="48" height="34" viewBox="0 0 48 34">';
                html += '<path class="shape" d="' + toString(_dLast.soild) + '"/>';
                html += '</svg>';
                html += '</div>';
                html += '</div>';
			}
		}
		html += '<input type="hidden" id="popup-' + self.popupElementId + '-currentPage" value="' + newPage + '" />';
		html += '<input type="hidden" id="popup-' + self.popupElementId + '-totalPage" value="' + totalPage + '" />';
				
		$('#' + self.pagingElementId).html(html);
		$('#' + self.totalElementId).text(total);

		$('#' + self.pagingElementId + ' #first').on('click', function() {
			self.handleOnClickPopupPage(1);
		});
		
		$('#' + self.pagingElementId + ' #last').on('click', function() {
			self.handleOnClickPopupPage(totalPage);
		});
		
		$('#' + self.pagingElementId + ' #prev').on('click', function() {
			self.handleOnClickPopupPage('-');
		});
		
		$('#' + self.pagingElementId + ' #next').on('click', function() {
			self.handleOnClickPopupPage('+');
		});
		
		$('#' + self.pagingElementId + ' div div.number').on('click', function() {
			var page = $(this).attr('page');
			/*if (totalPage > 5) {
				page++;
			}*/
			self.handleOnClickPopupPage(page);
		});
	}
	
	this.handleOnClickPopupPage = function(page) {
		if (!page) return;

		var oldPage = $('#popup-' + self.popupElementId + '-currentPage').val();
		var totalPage = $('#popup-' + self.popupElementId + '-totalPage').val();
		
		var newPage = '';
		
		if(page == oldPage) return;

		if (page == '+') {
			if (oldPage == totalPage) {
				return;
			} else {
				newPage = +oldPage + 1;
				if(newPage % 5 == 1){
					this.loadPageNumber(newPage, newPage);
				}
			}
		} else if (page == '-') {
			if (oldPage == 1) {
				return;
			} else {
				newPage = +oldPage - 1;
				if (newPage % 5 == 0) {
					this.loadPageNumber(newPage - 4, newPage);
				}
			}
		} else {
			newPage = page;
			
			if (newPage == 1) {
				this.loadPageNumber(newPage, newPage);
			} else if (newPage == totalPage) {
			    if (newPage % 5 == 0) {
			    	if (oldPage < newPage - 4) {
			    		this.loadPageNumber(newPage - 4, newPage);
			    	}
			    } else {
			    	if (oldPage < (newPage - (newPage % 5 - 1))) {
			    		this.loadPageNumber(newPage - (newPage % 5 - 1), newPage);
			    	}
			    }                                                                         
			} 				
		}
		
		var len = $('#' + self.lengthElementId).text();
		if (isNullOrEmpty(len)) {
			len = $('#' + self.lengthElementId).val();
		}
		self.page = newPage - 1;
		this.loadData();

		$('#popup-' + self.popupElementId + '-currentPage').val(newPage);
		$('#' + self.pagingElementId + ' div div').removeClass('active');
		$('#pagination-' + self.popupElementId + '-page_' + newPage).addClass('active');
	}
	
	this.setUrlGird = function(urlGird) {
		this.urlGird = urlGird;
	}
	
	this.concatUrlGird = function(param) {
		this.urlGird += param;
	}
	
	this.setUrlCount = function(urlCount) {
		this.urlCount = urlCount;
	}
	
	this.concatUrlCount = function(param) {
		this.urlCount += param;
	}
	
	this.setMethod = function(method) {
		if (isNotNullAndNotEmpty(method) && typeof method === 'string') {
			if (method.toLowerCase() == 'post' || method.toLowerCase() == 'get') {
				this.method = method;
			}
		}
	}
}