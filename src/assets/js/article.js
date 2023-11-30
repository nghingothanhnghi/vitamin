const Article = function(
	resultId = '',
	method = 'GET',
    searchUrl = '',
    countUrl = '',
    pagination = false,
    onSuccess,
    onClick,
) {
	this.Y = 'Y';
	this.N = 'N';
	
	this.resultId = resultId;
	
	this.method = method;
    this.searchUrl = searchUrl;
    this.countUrl = countUrl;
    
    this.pagination = pagination;
    
    this.onSuccess = onSuccess;
    this.onClick = onClick;
    
    this.page = 0;
    this.len = 12;
    this.params = {};
    
    this.type = 1;
    this.urlPhoto = '';
    
    this.notices = [];
    this.tempData = [];
    this.haveAuthor = false;
    
    let self = this;
    
    this.load = function () {
        if (isNotNullAndNotEmpty(self.resultId)) {
			const currentPage = getParamValue("page");
			if (isNotNullAndNotEmpty(currentPage)) {
				self.page = +currentPage - 1;
			}
			
			if (self.type === 1 || self.type === 5) {
	            self.loadArticle(self.Y);
				self.loadArticle(self.N);
			} else {
				self.loadArticle();
			}

            if (self.pagination) {
				if (isNotNullAndNotEmpty(currentPage)) {
					let pageStart = 1;
					if (currentPage > 5) {
						let temp = currentPage;
						for (let i = 0; i < 5; i++) {
							if ((temp - 1) % 5 === 0) {
								pageStart = temp;
								break;
							}
							temp--;
						}
					} 
					self.loadPagination(pageStart, currentPage, currentPage);
				} else {
	                self.loadPagination(1, 1);
				}
            }
        }
    }
    
    this.loadArticle = function (topYn) {
    	$(".block-loading").addClass('is-loading');

		if (self.type === 1) {
	    	if (topYn === self.Y) {
				$('#' + self.resultId + ' ul.articles-wrapper.articles-2-cols.top-article').html('');
				const obj = {...self.params, topYn: self.Y, page: null, len: null};
				self.params = obj;
			} else {
		        $('#' + self.resultId + ' ul.articles-wrapper.articles-2-cols.article').html('');
		        const obj = {...self.params, topYn: self.N};
		        self.params = obj;
			}
		} else if (self.type === 2 || self.type === 3) {
			$('#' + self.resultId + ' ul.articles-wrapper.style-2.articles-4-cols').html('');
		} else if (self.type === 4) {
			$('#' + self.resultId + ' ul.articles-wrapper.style-1.articles-3-cols').html('');
			$('#' + self.resultId + ' ul.articles-wrapper.style-1.articles-4-cols').html('');
		} else if (self.type === 5) {
			if (topYn === self.Y) {
				this.notices = [];
				const obj = {...self.params, topYn: self.Y, page: null, len: null};
				self.params = obj;
			} else {
				self.tempData = [];
				
				$('#' + self.resultId + ' table.hr-mobile-table').html('');	
				$('#' + self.resultId + ' table.hr-table tbody').html('');
				
				const obj = {...self.params, topYn: self.N};
		        self.params = obj;
			}
		} else if (self.type === 6) {
			$('#' + self.resultId + ' table.hr-mobile-table').html('');	
			$('#' + self.resultId + ' table.hr-table tbody').html('');
		}

        if (self.pagination) {
			self.len = self.getLen();
	
            self.params.page = self.page;
            self.params.len = self.len;
        }
		const callLoad = function() {
			if (self.method.toLowerCase() === 'get') {
	            $.ajax({
	                url: self.searchUrl,
	                type: "GET",
	                data: self.params,
	                success: function (data) {
	                    var res = { data: data };
	                    self.renderArticle(res, topYn);
	                    
	                    if (isNotNullAndNotEmpty(self.onSuccess) && typeof self.onSuccess == 'function') {
			                self.onSuccess(data);
			            }
			            $(".block-loading").removeClass('is-loading');
	                }
	            })
	        } else if (self.method.toLowerCase() === 'post') {
	            axios
	                .post(self.searchUrl, self.params)
	                .then(function (res) {
	                    self.renderArticle(res, topYn);
	                                        
	                    if (isNotNullAndNotEmpty(self.onSuccess) && typeof self.onSuccess == 'function') {
			                self.onSuccess(res.data);
			            }
			            $(".block-loading").removeClass('is-loading');
	                });
	        }
		}
		if (self.type === 5) {
			callLoad();
		} else {
			getWownetUrl(callLoad);
		}
    }
    
	this.renderArticle = function(res, topYn) {
		const data = res.data;

		let item;
		let html = '';
		let mb = '';

		if (self.type === 1) {
			 for (let i = 0; i < data.length; i++) {
				item = data[i];
				
				html += '<li class="col-sm-6 column" style="position: relative;">';
				html += '	<article>';
				if (topYn === self.Y) {
					html += '<div style="position: absolute; right: 10px; top: 10px;">';
					html += '<span style="color: #ffffff; font-size: 12px; border-radius: 2.5px; padding: 7px 10px; background-color:#EF4C37;">Notice</span>'
					html += '</div>';
				}
				html += '   	<a class="thumbnail" board-no="' + item.boardNo + '" index="' + i + '"><h4 class="h-medium">' + item.title + '</h4></a>';
				html += '		<div class="meta">';
				html += '			<div class="info date">';
				html += '				<img src="/img/icons/post-date.svg">';
				html += '				<span>' + item.insDate + '</span>';
				html += '			</div>';
				html += '			<div class="info author">';
				html += '				<img src="/img/icons/post-author.svg">';
				html += '				<span>' + item.insUser + '</span>';
				html += '			</div>';
				html += '			<div class="info view">';
				html += '				<img src="/img/icons/post-view.svg">';
				html += '				<span>' + item.readCnt + '</span>';
				html += '			</div>';
				html += '		</div>';
				html += '	</article>';
				html += '</li">';
			}
			
			if (topYn === self.Y) {
				$('#' + self.resultId + ' ul.articles-wrapper.articles-2-cols.top-article').html(html);
			} else {
			    $('#' + self.resultId + ' ul.articles-wrapper.articles-2-cols.article').html(html);
			}
			
			if (isNotNullAndNotEmpty(self.onClick) && typeof self.onClick === 'function') {
				if (topYn === self.Y) {
					$('#' + self.resultId + ' ul.articles-wrapper.articles-2-cols.top-article li a.thumbnail').on('click', function() {
						const index = $(this).attr('index');
						self.onClick(data[index]);
					});
				} else {
				    $('#' + self.resultId + ' ul.articles-wrapper.articles-2-cols.article li a.thumbnail').on('click', function() {
						const index = $(this).attr('index');
						self.onClick(data[index]);
					});
				}
			}
		} else if (self.type === 2) {
			for (let i = 0; i < data.length; i++) {
				item = data[i];
				
				html += '<li class="col-lg-3 col-md-4 col-6 column">';
				html += '	<article>';
				html += '		<a class="thumbnail" style="cursor: pointer;" board-no="' + item.boardNo + '" index="' + i + '">'
				
				if (isNotNullAndNotEmpty(item.filePath) && isNotNullAndNotEmpty(item.fileName)) {
					html += '		<img src="' + WOWNET_URL + '/' + item.filePath + '/' + item.fileName + '" alt="' + item.fileName + '">';
				} else {
					html += '		<img src="/img/noImage.jpg">';
				}
			
				html += '		</a>';
				html += '		<div class="info">';
				html += '			<h4 class="h-small">' + item.title + '</h4>';
				html += '			<p>' + item.insUser + ', ' + item.insDate + '</p>';
				html += '			<div class="meta">';
				html += '				<div class="view">';
				html += '					<img src="/img/icons/view-green.svg">';
				html += '					<span>' + item.readCnt + '</span>';
				html += '				</div>';
				html += '				<div class="share">';
				html += '					<img src="/img/icons/share-orange.svg">';
				html += '					<span>0</span>';
				html += '				</div>';
				html += '		</div>';
				html += '	</article>';
				html += '</li>';
			}
			
			$('#' + self.resultId + ' ul.articles-wrapper.style-2.articles-4-cols').html(html);
			
			if (isNotNullAndNotEmpty(self.onClick) && typeof self.onClick === 'function') {
				$('#' + self.resultId + ' ul.articles-wrapper.style-2.articles-4-cols li a.thumbnail').on('click', function() {
					const index = $(this).attr('index');
					self.onClick(data[index]);
				});
			}
		} else if (self.type == 3) {
			if (isNotNullAndNotEmpty(data)) {
				for (let i = 0; i < data.length; i++) {
					item = data[i];
					
					html += '<li class="col-lg-3 col-md-4 col-6 column">';
					html += '	<article>';
					html += '		<a class="thumbnail" style="cursor: pointer;" reg-no="' + item.regNo + '" index="' + i + '">'
					html += '			<img class="icon" src="/img/icons/video-play.svg">';
					
					if (isNotNullAndNotEmpty(item.filePathImg) && isNotNullAndNotEmpty(item.fileNameImg)) {
						if (item.filePathImg.endsWith('/')) {
							html += '	<img src="' + WOWNET_URL + '/' + item.filePathImg + item.fileNameImg + '" alt="' + item.fileNameImg + '">';
						} else {
							html += '	<img src="' + WOWNET_URL + '/' + item.filePathImg + '/' + item.fileNameImg + '" alt="' + item.fileNameImg + '">';
						}
					} else {
						html += '		<img src="/img/noImage.jpg">';
					}
				
					html += '		</a>';
					html += '		<div class="info">';
					html += '			<h4 class="h-small">' + item.title + '</h4>';
					html += '			<p>' + item.insUser + ', ' + item.insDate + '</p>';
					html += '			<div class="meta">';
					html += '				<div class="view">';
					html += '					<img src="/img/icons/view-green.svg">';
					html += '					<span>' + item.readCnt + '</span>';
					html += '				</div>';
					html += '				<div class="share">';
					html += '					<img src="/img/icons/share-orange.svg">';
					html += '					<span>' + item.shareCnt + '</span>';
					html += '				</div>';
					html += '		</div>';
					html += '	</article>';
					html += '</li>';
				}
			}
			
			if (isNullOrEmpty(data)) {
				html += '<li class="col-lg-3 col-md-4 col-6 column">';
				html += '	<article>';
				html += '		<a class="thumbnail" style="cursor: pointer;">'
				html += '			<img class="icon" src="/img/icons/video-play.svg">';
				html += '			<img src="/img/noImage.jpg">';
				html += '		</a>';
				html += '		<div class="info">';
				html += '			<h4 class="h-small">NOT FOUND</h4>';
				html += '			<p>cellra, 2022-01-01</p>';
				html += '			<div class="meta">';
				html += '				<div class="view">';
				html += '					<img src="/img/icons/view-green.svg">';
				html += '					<span>0</span>';
				html += '				</div>';
				html += '				<div class="share">';
				html += '					<img src="/img/icons/share-orange.svg">';
				html += '					<span>0</span>';
				html += '				</div>';
				html += '		</div>';
				html += '	</article>';
				html += '</li>';
			}
			
			$('#' + self.resultId + ' ul.articles-wrapper.style-2.articles-4-cols').html(html);
			
			if (isNotNullAndNotEmpty(self.onClick) && typeof self.onClick === 'function') {
				$('#' + self.resultId + ' ul.articles-wrapper.style-2.articles-4-cols li a.thumbnail').on('click', function() {
					const index = $(this).attr('index');
					self.onClick(data[index]);
				});
			}
		} else if (self.type === 4) {
			if (isNotNullAndNotEmpty(data)) {
				for (let i = 0; i < data.length; i++) {
					item = data[i];
					
					html += '<li class="col-md-4 col-6 column">';
					html += '	<article>';
					html += '		<a class="thumbnail file" index="' + i + '" style="cursor: pointer;">';
					if (isNotNullAndNotEmpty(item.filePath) && isNotNullAndNotEmpty(item.fileName)) {
						html += '		<img class="icon" src="' + WOWNET_URL + '/' + item.filePath + '/' + item.fileName + '" alt="' + item.fileName + '">';
					} else {
						if (isNotNullAndNotEmpty(self.urlPhoto)) {
							html += '	<img class="icon" src="' + self.urlPhoto + '">';
						} else {
							html += '	<img class="icon" src="/img/icons/image.svg">';
						}
					}
					html += '		</a>';
					html += '		<div class="info">';
					html += '			<h4>' + item.title + '</h4>';
					html += '			<div class="meta">';
					html += '				<span>등록: ' + item.insDate + '</span>';
					html += '				<span>조회: ' + item.readCnt + '</span>';
					html += '			</div>';
					html += '		</div>';
					html += '	</article>';
					html += '</li>';
				}
			}
			
			if (isNullOrEmpty(data)) {
				html += '<li class="col-md-4 col-6 column">';
				html += '	<article>';
				html += '		<a class="thumbnail file" style="cursor: pointer;">';
				if (isNotNullAndNotEmpty(self.urlPhoto)) {
					html += '		<img class="icon" src="' + self.urlPhoto + '">';
				} else {
					html += '		<img class="icon" src="/img/icons/image.svg">';
				}
				html += '		</a>';
				html += '		<div class="info">';
				html += '			<h4>NOT FOUND</h4>';
				html += '			<div class="meta">';
				html += '				<span>등록: cellra</span>';
				html += '				<span>조회: 2022-01-01</span>';
				html += '			</div>';
				html += '		</div>';
				html += '	</article>';
				html += '</li>';
			}
			
			$('#' + self.resultId + ' ul.articles-wrapper.style-1.articles-3-cols').html(html);
			$('#' + self.resultId + ' ul.articles-wrapper.style-1.articles-4-cols').html(html);
			
			if (isNotNullAndNotEmpty(self.onClick) && typeof self.onClick === 'function') {
				$('#' + self.resultId + ' ul.articles-wrapper.style-1 li a.thumbnail').on('click', function() {
					const index = $(this).attr('index');
					self.onClick(data[index]);
				});
			}
		} else if (self.type === 5) {
			if (topYn === self.Y) {
				self.notices = data;
			} else {
				self.tempData = data;
			}
			
			if (isNotNullAndNotEmpty(self.notices)) {
				for (let i = 0; i < self.notices.length; i++) {
					item = self.notices[i];
					
					let cursor = '';
					
					if (isNotNullAndNotEmpty(self.onClick) && typeof self.onClick === 'function') {
						cursor = 'cursor: pointer;';
					}
					
					html += '<tr>';
					html += '	<td style="text-align: center;">';
					html += '		<span style="color: #ffffff; font-size: 12px; border-radius: 2.5px; padding: 7px 10px; background-color:#EF4C37;">Notice</span>';
					html +=	'	</td>';
					html += '	<td type="notice" index="' + i + '" style="' + cursor + '">' + item.title + '</td>';
					if (self.haveAuthor) {
						html += '<td style="text-align: center;">' + item.insUser + '</td>';
					}
					html += '	<td style="text-align: center;">' + item.insDate + '</td>';
					html += '	<td style="text-align: center;">' + item.readCnt + '</td>';
					html += '</tr>';
					
					mb += '<tbody>';
					mb += '    <tr>';
					mb += '        <td>번호</td>';
					mb += '        <td style="text-align: center;" >';
					mb += '    		   <span style="color: #ffffff; font-size: 12px; border-radius: 2.5px; padding: 7px 10px; background-color:#EF4C37;">Notice</span>';
					mb += '        </td>';
					mb += '    </tr>';
					mb += '    <tr>';
					mb += '        <td>제목</td>';
					mb += '        <td type="notice" index="' + i + '">' + item.title + '</td>';
					mb += '    </tr>';
					if (self.haveAuthor) {
						mb += '<tr>';
						mb += '    <td>작성자</td>';
						mb += '    <td>' + item.insUser + '</td>';
						mb += '</tr>';
					}
					mb += '    <tr>';
					mb += '        <td>등록일자</td>';
					mb += '        <td>' + item.insDate + '</td>';
					mb += '    </tr>';
					mb += '    <tr>';
					mb += '        <td>조회</td>';
					mb += '        <td>' + item.readCnt + '</td>';
					mb += '    </tr>';
					mb += '</tbody>';
				}
			}
			
			if (isNotNullAndNotEmpty(self.tempData)) {
				for (let i = 0; i < self.tempData.length; i++) {
					item = self.tempData[i];
					
					const no = ((self.page + 1) > 0 ? parseInt(((self.page + 1) * self.len) - self.len) : 0) + i + 1;
					let cursor = '';
					
					if (isNotNullAndNotEmpty(self.onClick) && typeof self.onClick === 'function') {
						cursor = 'cursor: pointer;';
					}
					
					html += '<tr>';
					html += '	<td style="text-align: center;">' + no + '</td>';
					html += '	<td type="normal" index="' + i + '" style="' + cursor + '">' + item.title + '</td>';
					if (self.haveAuthor) {
						html += '<td style="text-align: center;">' + item.insUser + '</td>';
					}
					html += '	<td style="text-align: center;">' + item.insDate + '</td>';
					html += '	<td style="text-align: center;">' + item.readCnt + '</td>';
					html += '</tr>';
					
					mb += '<tbody>';
					mb += '    <tr>';
					mb += '        <td>번호</td>';
					mb += '        <td style="text-align: center;" >' + no + '</td>';
					mb += '    </tr>';
					mb += '    <tr>';
					mb += '        <td>제목</td>';
					mb += '        <td type="normal" index="' + i + '">' + item.title + '</td>';
					mb += '    </tr>';
					if (self.haveAuthor) {
						mb += '<tr>';
						mb += '    <td>작성자</td>';
						mb += '    <td>' + item.insUser + '</td>';
						mb += '</tr>';
					}
					mb += '    <tr>';
					mb += '        <td>등록일자</td>';
					mb += '        <td>' + item.insDate + '</td>';
					mb += '    </tr>';
					mb += '    <tr>';
					mb += '        <td>조회</td>';
					mb += '        <td>' + item.readCnt + '</td>';
					mb += '    </tr>';
					mb += '</tbody>';
				}
			} 
			
			let totalItems = self.notices.length + self.tempData.length;
			if (totalItems < 5 && totalItems > 0) {
				for (let i = totalItems; i < 5; i++) {
					html += '<tr>';
					html += '	<td style="text-align: center;">&nbsp;</td>';
					html += '	<td>&nbsp;</td>';
					if (self.haveAuthor) {
						html += '<td style="text-align: center;">&nbsp;</td>';
					}
					html += '	<td style="text-align: center;">&nbsp;</td>';
					html += '	<td style="text-align: center;">&nbsp;</td>';
					html += '</tr>';
				}
			}
			
			if (isNullOrEmpty(self.notices) && isNullOrEmpty(self.notices)) {
				for (let i = 0; i < 5; i++) {
					html += '<tr>';
					html += '	<td style="text-align: center;">&nbsp;</td>';
					if (i == 2) {
						html += '<td><span class="h-small">조회된 데이타가 없습니다.</span></td>';
					} else {
						html += '<td>&nbsp;</td>';
					}
					if (self.haveAuthor) {
						html += '<td style="text-align: center;">&nbsp;</td>';
					}
					html += '	<td style="text-align: center;">&nbsp;</td>';
					html += '	<td style="text-align: center;">&nbsp;</td>';
					html += '</tr>';
					
					if (i == 0) {
						mb += '<tbody>';
						mb += '    <tr>';
						mb += '        <td>번호</td>';
						mb += '        <td>&nbsp;</td>';
						mb += '    </tr>';
						mb += '    <tr>';
						mb += '        <td>제목</td>';
						mb += '        <td><span class="h-small">조회된 데이타가 없습니다.</span></td>';
						mb += '    </tr>';
						if (self.haveAuthor) {
							mb += '<tr>';
							mb += '    <td>작성자</td>';
							mb += '    <td>&nbsp;</td>';
							mb += '</tr>';
						}
						mb += '    <tr>';
						mb += '        <td>등록일자</td>';
						mb += '        <td>&nbsp;</td>';
						mb += '    </tr>';
						mb += '    <tr>';
						mb += '        <td>조회</td>';
						mb += '        <td>&nbsp;</td>';
						mb += '    </tr>';
						mb += '</tbody>';
					}
				}
			} 
			
			$('#' + self.resultId + ' table.hr-mobile-table').html(mb);
			$('#' + self.resultId + ' table.hr-table tbody').html(html);
			
			if (isNotNullAndNotEmpty(self.onClick) && typeof self.onClick === 'function') {
				$('#' + self.resultId + ' table tbody td[type]').on('click', function() {
					const type = $(this).attr('type');
					const index = $(this).attr('index');
					
					if (type === 'notice') {
						self.onClick(self.notices[index]);
					} else if (type === 'normal') {
						self.onClick(self.tempData[index]);
					}
				});
			}
		} else if (self.type === 6) {
			for (let i = 0; i < data.length; i++) {
				item = data[i];
				
				const no = ((self.page + 1) > 0 ? parseInt(((self.page + 1) * self.len) - self.len) : 0) + i + 1;
				let cursor = '';
				
				if (isNotNullAndNotEmpty(self.onClick) && typeof self.onClick === 'function') {
					cursor = 'cursor: pointer;';
				}
				
				html += '<tr>';
				html += '	<td style="text-align: center;">' + no + '</td>';
				html += '	<td type="normal" index="' + i + '" style="' + cursor + '">' + item.title + '</td>';
				html += '	<td style="text-align:center;">'
				if (item.totalFile > 0) {
					html += '	<a href="javascript:;" board-no="' + item.boardNo + '">';
					html += '		<i class="fa fa-download" aria-hidden="true"></i>';
					html += '	</a>';
				}
				html += '	</td>'
				if (self.haveAuthor) {
					html += '<td style="text-align: center;">' + item.insUser + '</td>';
				}
				html += '	<td style="text-align: center;">' + item.insDate + '</td>';
				html += '	<td style="text-align: center;">' + item.readCnt + '</td>';
				html += '</tr>';
				
				mb += '<tbody>';
				mb += '    <tr>';
				mb += '        <td>번호</td>';
				mb += '        <td style="text-align: center;" >' + no + '</td>';
				mb += '    </tr>';
				mb += '    <tr>';
				mb += '        <td>제목</td>';
				mb += '        <td>' + item.title + '</td>';
				mb += '    </tr>';
				mb += '    <tr>';
				mb += '        <td>첨부파일</td>';
				mb += '        <td>';
				if (item.totalFile > 0) {
					mb += '		<a href="javascript:;" board-no="' + item.boardNo + '">';
					mb += '			<i class="fa fa-download" aria-hidden="true"></i>';
					mb += '		</a>';
				}
				mb += '        </td>';
				mb += '    </tr>';
				if (self.haveAuthor) {
					mb += '<tr>';
					mb += '    <td>작성자</td>';
					mb += '    <td>' + item.insUser + '</td>';
					mb += '</tr>';
				}
				mb += '    <tr>';
				mb += '        <td>등록일자</td>';
				mb += '        <td>' + item.insDate + '</td>';
				mb += '    </tr>';
				mb += '    <tr>';
				mb += '        <td>조회</td>';
				mb += '        <td>' + item.readCnt + '</td>';
				mb += '    </tr>';
				mb += '</tbody>';
			}
			
			$('#' + self.resultId + ' table.hr-mobile-table').html(mb);
			$('#' + self.resultId + ' table.hr-table tbody').html(html);
			
			if (isNotNullAndNotEmpty(self.onClick) && typeof self.onClick === 'function') {
				$('#' + self.resultId + ' table.hr-table tbody td[type]').on('click', function() {
					const index = $(this).attr('index');
					
					self.onClick(data[index]);
				});
			}
			
			$('#' + self.resultId + ' table tbody td a').on('click', function() {
				const boardNo = $(this).attr('board-no');
				if (isNullOrEmpty(boardNo)) return;
				downAttachment(boardNo);
			});
		} else if (self.type === 7) {
			if (isNotNullAndNotEmpty(data)) {
				for (let i = 0; i < data.length; i++) {
					item = data[i];
					
					html += '<li class="col-md-4 col-6 column">';
					html += '	<article>';
					html += '		<a class="thumbnail img" index="' + i + '" style="cursor: pointer;">';
					if (isNotNullAndNotEmpty(item.filePath) && isNotNullAndNotEmpty(item.fileName)) {
						html += '		<img class="icon" src="' + WOWNET_URL + '/' + item.filePath + '/' + item.fileName + '" alt="' + item.fileName + '">';
					} 
					html += '		</a>';
					html += '		<div class="info">';
					html += '			<div class="meta">';
					html += '				<div>';
					html += '					<h4>' + item.title + '</h4>';
					html += '					<span>등록: ' + item.insDate + '</span>';
					html += '				</div>';
					html += '				<div class="icon">'
					if (item.totalFile > 0) {
						html += '				<span><a href="javascript:;" board-no="'  + item.boardNo + '"><img class="icon" src="/img/icons/download-.svg"></a></span>';
					}
					html += '				</div>'
					html += '			</div>';
					html += '		</div>';
					html += '	</article>';
					html += '</li>';
				}
			}
			
			$('#' + self.resultId + ' ul.articles-wrapper.style-1.articles-3-cols').html(html);
			$('#' + self.resultId + ' ul.articles-wrapper.style-1.articles-4-cols').html(html);
			
			if (isNotNullAndNotEmpty(self.onClick) && typeof self.onClick === 'function') {
				$('#' + self.resultId + ' ul.articles-wrapper.style-1 li a.thumbnail').on('click', function() {
					const index = $(this).attr('index');
					self.onClick(data[index]);
				});
			}
			
			$('#' + self.resultId + ' ul.articles-wrapper.style-1 li .info a').on('click', function() {
				const boardNo = $(this).attr('board-no');
				if (isNullOrEmpty(boardNo)) return;
				downAttachment(boardNo);
			});
		}
	}
	
	this.loadPagination = function(pageStart, newPage, currentPage) {
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
                    self.renderPagination(res, pageStart, newPage, currentPage);
                }
            })
        } else if (self.method.toLowerCase() === 'post') {
            axios
                .post(self.countUrl, self.params)
                .then(function (res) {
                    self.renderPagination(res, pageStart, newPage, currentPage);
                });
        }
	}
	
	this.renderPagination = function (res, pageStart, newPage, currentPage) {
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
			if (isNotNullAndNotEmpty(pageStart) && typeof pageStart !== 'number') {
				pageStart = +pageStart;
			}
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
					
					if (isNotNullAndNotEmpty(currentPage)) {
						if (i == +currentPage) {
							html += ' active"';
						}
					} else {
	                    if (i == 1) {
	                        html += ' active"';
	                    }
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

					if (isNotNullAndNotEmpty(currentPage)) {
						if (pageStart + i == +currentPage) {
							html += ' active"';
						}
					} else {
	                    if (pageStart + i == newPage) {
	                        html += ' active"';
	                    }
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
                page;
            }*/

            self.handleOnClickPage(page);
        });

        $('#' + self.resultId + ' .pagination .dropdown-select .options .option').on('click', function () {
            const len = $(this).text();
            if (isNotNullAndNotEmpty(len)) {
				if (len == self.len) return;
				
                self.page = 0;
                self.len = +len;

                self.loadArticle();
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
        self.loadArticle();

        $('#pagination-' + self.resultId + '-currentPage').val(newPage);
        $('#' + self.resultId + ' .pagination .paging div div.number').removeClass('active');
        $('#pagination-' + self.resultId + '-page_' + newPage).addClass('active');
        
        insertParams("page", newPage);
    }
	
	this.setSearchUrl = function (url) {
        self.searchUrl = url;
    }

    this.setCountUrl = function (url) {
        self.countUrl = url;
    }

    this.setParams = function (param) {
        self.params = param;
    }
    
    this.getLen = function () {
        let len = $('#' + self.resultId + ' .pagination .dropdown-select .selected span').text();
        if (isNullOrEmpty(len)) {
            len = $('#' + self.resultId + ' .pagination .dropdown-select .selected span').val();
        }
        return +len.trim();
    }
    
    this.setType = function(type) {
		self.type = type;
	}
	
	this.setUrlPhoto = function(url) {
		self.urlPhoto = url;
	}
	
	this.setHaveAuthor = function(haveAuthor) {
		self.haveAuthor = haveAuthor;
	}
};