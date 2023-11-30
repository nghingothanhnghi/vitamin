



/* Back to Top */

jQuery(document).ready(function($) {	
	var _convertableTables = document.getElementsByClassName("convertable-table");
	for (var i=0; i<_convertableTables.length; i++) {
		convertTable(_convertableTables[i]);
	}
});


function convertTable (sourceTable) {
	var _container = sourceTable.closest(".table-container");
	
	var cloneTable = document.createElement("table");
	cloneTable.innerHTML = sourceTable.innerHTML;
	var Trs = cloneTable.getElementsByTagName("tr");
	
	
	var _table = createTable(getColsNum(cloneTable));
	var _trs = _table.getElementsByTagName("tr");
	
	var _temp = [];
	var x;
	
	for (var i=0; i<_trs.length; i++) {

		var x = 0;
		
		for (var j=0; j<4; j++) {
			
			var cell = Trs[j].children[i];	
			
			if (cell) {
				var _rowspan = getRowSpan(cell);
				
				if (_rowspan > 1) {
					setLostValue(Trs, j+1, _rowspan);
				}

				x = x + getRowSpan(cell);
				if (x <= Trs.length) {
					var _td = document.createElement("td");			
					mapCell(_td, cell);
					_trs[i].appendChild(_td);
				}
			}
			
		}
		
	}
	
	_container.appendChild(_table);
	
}


function setLostValue (trs, index, x) {
	for (var i=index; i<(index+x);i++) {
		if (i<trs.length) {
			var _datalost;
			if (trs[i].getAttribute("data-lost")) {
				_datalost = parseInt(trs[i].getAttribute("data-lost"));
			} else {
				_datalost = 0;
			}
			
			_datalost = _datalost + 1;
			trs[i].setAttribute("data-lost", _datalost);
		}		
	}	
}





function mapCell (_td, _tdSource) {
	_td.innerHTML = _tdSource.innerHTML;
	var colspan = _tdSource.getAttribute("colspan");
	var rowspan = _tdSource.getAttribute("rowspan");
	
	if (colspan) {
		_td.setAttribute("rowspan", colspan);
	}
	if (rowspan) {
		_td.setAttribute("colspan", rowspan);
	}
}




function createTable (row_num) {
	var _table = document.createElement("table");
	var _tbody = document.createElement("tbody");

	for (var i =0; i<row_num; i++) {
		var tr = document.createElement("tr");
		_tbody.appendChild(tr);
	}

	_table.appendChild(_tbody);
	return _table;
}



function getTotalColSpan(tr) {
	var _cells = tr.children;
	var total = 0;
	for (var i=0; i <_cells.length; i++) {
		var _colspan = _cells[i].getAttribute("colspan");
		if (_colspan) {
			total = total + parseInt(_colspan);
		}
		else {
			total = total + 1;
		}
	}
	return total;
}


function getRowSpan(td) {
	var _rowspan = td.getAttribute("rowspan");
	if (_rowspan) return parseInt(_rowspan);
	else return 1;
}




function getRowsNum (table) {
	var _trs = table.getElementsByTagName("tr");
	return _trs.length;
}


function getColsNum (table) {
	var colsNum = 0;
	var _ths = table.getElementsByTagName("th");
	
	for (var i=0; i <_ths.length; i++) {
		var _colspan = _ths[i].getAttribute("colspan");
		if (_colspan) {
			colsNum = colsNum + parseInt(_colspan);
		}
		else {
			colsNum = colsNum + 1;
		}
	}
	return colsNum;
}










