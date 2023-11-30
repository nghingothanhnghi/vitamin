function wowChart(opts){
    var data = opts.data;
    var nodes = {};
    this.rootNodes = [];
    this.opts = opts;
    var self = this;

    this.draw = function($container){
        $container.empty().append(self.rootNodes[0].render(opts));       
    }

    // constructor
    for(var i in data){
        var node = new Node(data[i]);
        nodes[data[i].userid] = node;
    }
    
    var min = Number.MAX_SAFE_INTEGER;
    for(var i in nodes){
        if(nodes[i].lv < min){
            min = nodes[i].lv;
        }
    }
    

    // generate parent child tree
    for(var i in nodes){
        if(nodes[i].lv == min){
            self.rootNodes.push(nodes[i]);
        }
        else{
        	if(nodes[nodes[i].userid1]) {
        		nodes[nodes[i].userid1].addChild(nodes[i]);
        	}            
        }
    }
}

function Node(data){
    this.userid = data.userid;
    this.userid1 = data.userid1;
    this.username = data.username;
    this.status = data.status;
    this.statusName = data.statusName;
    this.kindName = data.kindName;
    this.rankMaxName = data.rankMaxName;
    this.cntName = data.cntName;
    this.ctrName = data.ctrName;
    this.pname = data.pname;
    this.rname = data.rname;
    this.gender = data.gender;
	this.lv = data.lv;
    this.abPos = data.abPos;
    this.children = [];
    var self = this;

    this.addChild = function(childNode){
        this.children.push(childNode);
    }

    this.render = function(opts){
        var childLength = self.children.length,
            mainTable;

        mainTable = "<table cellpadding='0' cellspacing='0' border='0'>";
        var nodeColspan = childLength>0?2*childLength:2;
        mainTable += "<tr><td colspan='"+nodeColspan+"'>"+self.formatNode(opts)+"</td></tr>";

        if(childLength > 0){
            var downLineTable = "<table cellpadding='0' cellspacing='0' border='0' style='zoom: 80%'><tr class='lines x'><td class='line left half'></td><td class='line right half'></td></table>";
            mainTable += "<tr class='lines'><td colspan='"+childLength*2+"'>"+downLineTable+'</td></tr>';

            var linesCols = '';
            for(var i=0;i<childLength;i++){ 
            	var style = 'style="width:' + 100/(childLength * 2) + '%;"';               	
                if(i==0){
                    linesCols += "<td class='line left'" + style + "></td>";
                }
                else{
                    linesCols += "<td class='line left top' " + style + "></td>";
                }

                if(i==childLength-1){
                    linesCols += "<td class='line right' " + style + "></td>";
                }
                else{
                    linesCols += "<td class='line right top' " + style + "></td>";
                }
            }
            mainTable += "<tr class='lines v'>"+linesCols+"</tr>";

            mainTable += "<tr>";
            for(var i in self.children.sort(self.compare)){
                mainTable += "<td colspan='2'>"+self.children[i].render(opts)+"</td>";
            }
            mainTable += "</tr>";
        }
        mainTable += '</table>';
        return mainTable;
    }

    this.formatNode = function(opts){
    	var nameString = '<p>'+self.username+'</p>';
        var descString = '<p>'+self.userid+'</p>';
    	if(self.statusName !== null){
        	descString += '<p>'+self.statusName+'</p>';
        }
    	if(self.kindName !== null){
        	descString += '<p>'+self.kindName+'</p>';
        }
        return "<div class='node nodeMobile' node-id='"+self.userid+"'>"+nameString+descString+"</div>";
    }


    this.compare = function( a, b ) {
        if ( a.abPos < b.abPos ){
          return -1;
        }
        if ( a.abPos > b.abPos ){
          return 1;
        }
        return 0;
      }
}

function wowChart3110(opts){
    var data = opts.data;
    var nodes = {};
    this.rootNodes = [];
    this.opts = opts;
    var self = this;

    this.draw = function($container){
		$container.innerHTML = "";
        //$container.html('').append(self.rootNodes[0].render(opts));  
		
		if(self.rootNodes.length > 0) {
			var html = self.rootNodes[0].render(opts);
        	$container.innerHTML= html;
		}

		var searching_result = document.querySelector(".searching-result");
     	var col_data = searching_result.querySelector(".col_data");
      	var table = col_data.querySelector("table");
		if(table){
			col_data.scrollTo(table.offsetWidth * 0.43, 0);
		}

		const width = document.getElementById('lineage-chart').offsetWidth;
		//const height = document.getElementById('lineage-chart').offsetHeight;

		$('#lineage-chart').scrollLeft(width / 2);

		self.resize(false);
		
        const id = $($container).attr("id");
        if (!id) return;
        
        $("#" + id + ".wowChart a[user-id]").on("click", function() {
			const userid = $(this).attr("user-id");
			if (!userid) return;
			window.open("/my-office/member-management/member-infor-inquiry?userid=" + userid,"_blank")
		});
    }

	this.resize = function (plus) {
		const zoom = $('#lineage-chart>table').css('zoom');
		var cnt = zoom * 100;
	
		if (plus) {
			cnt += 10;
		} else {
			cnt -= 10;
		}
	
		var set = 100 - cnt;
		var change = Math.ceil(set / 10);
	
		setTimeout(function () {
			$("#lineage-chart>table").css("zoom", cnt + "%");
			$("#lineage-chart>table .x").css("width", change * 1.5 + "px");
			$("#lineage-chart>table .v").css("height", change * 1.5 + "px");
		}, 100);
	}

    // constructor
    for(var i in data){
        var node = new Node3110(data[i]);
        nodes[data[i].userid] = node;
    }
    
    var min = Number.MAX_SAFE_INTEGER;
    for(var i in nodes){
        if(nodes[i].lv < min){
            min = nodes[i].lv;
        }
    }
    

    // generate parent child tree
    for(var i in nodes){
        if(nodes[i].lv == min){
            self.rootNodes.push(nodes[i]);
        }
        else{
        	if(nodes[nodes[i].userid1]) {
        		nodes[nodes[i].userid1].addChild(nodes[i]);
        	}            
        }
    }
}

function drawNode(chart, self, opts){	
	let descString = '';
	if(chart == 1){
		if(self.filePath && self.filePath.length > 0){
			descString += '<p class="img">' + '<img src="'+ opts.wowUrl +'/'+ self.filePath +'">' + '</p>';
		}else{
			descString += '<p class="img">' + '<img src="./assets/img/my-office/member-icon.svg">' + '</p>';
		}
		// descString += '<p>'+ self.userid + '<img url="">' + '</p>';

    	descString += '<a user-id="' + self.userid + '">' + self.username + '</a>';
    	if (self.status == "0") {
			descString += ' <i class="fa fa-times warning" style="font-size: 17px;" aria-hidden="true"></i>';
		}
    	descString += '<br>';
	} else if(chart == 2){
		descString += '<p>'+self.userid+'</p>';
	} else if(chart == 3){
		descString += '<p>'+self.regDate+'</p>';
	} else if(chart == 4){
		if(self.kindName !== null){
			descString += '<p>'+self.kindName+'</p>';
		}
	} else if(chart == 5){
		if(self.rankName !== null){
			descString += '<p>'+self.rankName+'</p>';
		}
	} else if(chart == 6){
		if(self.rankMaxName !== null){
			descString += '<p>'+self.rankMaxName+'</p>';
		}
	} else if(chart == 7){
		if(self.cntName !== null){
			descString += '<p>'+self.cntName+'</p>';
		}
	} else if(chart == 8){
		if(self.grpName !== null){
			descString += '<p>'+self.grpName+'</p>';
		}
	} else if(chart == 9){
		descString += '<a href="#" onclick="clickLink3210(this)" nodeUrl="/member/3210?userid=' + self.rid + '">'+self.rid+'</a><br />';
	} else if(chart == 10){
		descString += '<a href="#" onclick="clickLink3210(this)" nodeUrl="/member/3210?userid=' + self.rid + '">'+self.rname+'</a><br />';
	} else if(chart == 11){
		if(self.ordCv !== null){
			descString += '<p>'+self.ordCv+'</p>';
		}
	} else if(chart == 12){
		if(self.abPv !== null){
			descString += '<p>'+self.abPv+'</p>';
		}
	} else if(chart == 13){
		if(self.actYN !== null){
			descString += '<p>'+self.actYN+'</p>';
		}
	} else if(chart == 14){
		if(self.totalAmt !== null){
			descString += '<p>'+self.totalAmt+'</p>';
		}
	} else if(chart == 15){
		if(self.ordAmtPay !== null){
			descString += '<p>'+self.ordAmtPay+'</p>';
		}
	} else if(chart == 16){
		if(self.ordPv1 !== null){
			descString += '<p>'+self.ordPv1+'</p>';
		}
	} else if(chart == 17){
		if(self.ordPv2 !== null){
			descString += '<p>'+self.ordPv2+'</p>';
		}
	} else if(chart == 18){
		if(self.ordPv3 !== null){
			descString += '<p>'+self.ordPv3+'</p>';
		}
	} else if(chart == 19){
		if(self.ordAmtAcc !== null){
			descString += '<p>'+self.ordAmtAcc+'</p>';
		}
	} else if(chart == 20){
		if(self.ordPv1Acc !== null){
			descString += '<p>'+self.ordPv1Acc+'</p>';
		}
	} else if(chart == 21){
		if(self.ordPv2Acc !== null){
			descString += '<p>'+self.ordPv2Acc+'</p>';
		}
	} else if(chart == 22){
		if(self.ordPv3Acc !== null){
			descString += '<p>'+self.ordPv3Acc+'</p>';
		}
	} else if(chart == 23){
		if(self.apvBe !== null){
			descString += '<p>'+self.apvBe+'</p>';
		}
	} else if(chart == 24){
		if(self.apv !== null){
			descString += '<p>'+self.apv+'</p>';
		}
	} else if(chart == 25){
		if(self.apvCalc !== null){
			descString += '<p>'+self.apvCalc+'</p>';
		}
	} else if(chart == 26){
		if(self.apvRe !== null){
			descString += '<p>'+self.apvRe+'</p>';
		}
	} else if(chart == 27){
		if(self.apvAcc !== null){
			descString += '<p>'+self.apvAcc+'</p>';
		}
	} else if(chart == 28){
		if(self.bpvBe !== null){
			descString += '<p>'+self.bpvBe+'</p>';
		}
	} else if(chart == 29){
		if(self.bpv !== null){
			descString += '<p>'+self.bpv+'</p>';
		}
	} else if(chart == 30){
		if(self.bpvCalc !== null){
			descString += '<p>'+self.bpvCalc+'</p>';
		}
	} else if(chart == 31){
		if(self.bpvRe !== null){
			descString += '<p>'+self.bpvRe+'</p>';
		}
	} else if(chart == 32){
		if(self.bpvAcc !== null){
			descString += '<p>'+self.bpvAcc+'</p>';
		}
	} else if(chart == 33){
		if(self.plv1Amt !== null){
			descString += '<p>'+self.plv1Amt+'</p>';
		}
	} else if(chart == 34){
		if(self.plv1Pv !== null){
			descString += '<p>'+self.plv1Pv+'</p>';
		}
	} else if(chart == 35){
		if(self.pdownAmt !== null){
			descString += '<p>'+self.pdownAmt+'</p>';
		}
	} else if(chart == 36){
		if(self.pdownPv !== null){
			descString += '<p>'+self.pdownPv+'</p>';
		}
	} else if(chart == 37){
		if(self.pgrpAmt !== null){
			descString += '<p>'+self.pgrpAmt+'</p>';
		}
	} else if(chart == 38){
		if(self.pgrpPv !== null){
			descString += '<p>'+self.pgrpPv+'</p>';
		}
	} else if(chart == 39){
		if(self.rlv1Amt !== null){
			descString += '<p>'+self.rlv1Amt+'</p>';
		}
	} else if(chart == 40){
		if(self.rlv1Pv !== null){
			descString += '<p>'+self.rlv1Pv+'</p>';
		}
	} else if(chart == 41){
		if(self.rdownAmt !== null){
			descString += '<p>'+self.rdownAmt+'</p>';
		}
	} else if(chart == 42){
		if(self.rdownPv !== null){
			descString += '<p>'+self.rdownPv+'</p>';
		}
	} else if(chart == 43){
		if(self.rgrpAmt !== null){
			descString += '<p>'+self.rgrpAmt+'</p>';
		}
	} else if(chart == 44){
		if(self.rgrpPv !== null){
			descString += '<p>'+self.rgrpPv+'</p>';
		}
	} else if (chart == 45) {
		let pv = '0PV';
		if (self.pv !== null) {
			pv = setComma(self.pv) + 'PV';
		}
		descString += '<p>' + pv + '</p>';
	}
	
	return descString;
}

function Node3110(data){
    this.userid = data.userid;
    this.userid1 = data.userid1;
    this.username = data.username;
    this.status = data.status;
    this.statusName = data.statusName;
    this.kindName = data.kindName;
    this.rankMaxName = data.rankMaxName;
    this.cntName = data.cntName;
    this.ctrName = data.ctrName;
    this.pname = data.pname;
    this.rname = data.rname;
    this.gender = data.gender;
	this.lv = data.lv;
    this.abPos = data.abPos;
    this.regDate = data.regDate;
    this.rankName = data.rankName;
    this.grpName = data.grpName;
    this.rankColor = data.rankColor;
    this.children = [];
    var self = this;

    this.addChild = function(childNode){
        this.children.push(childNode);
    }

    this.render = function(opts){
        var childLength = self.children.length,
            mainTable;

        mainTable = "<table cellpadding='0' cellspacing='0' border='0'>";
        var nodeColspan = childLength>0?2*childLength:2;
        mainTable += "<tr><td colspan='"+nodeColspan+"'>"+self.formatNode(opts)+"</td></tr>";

        if(childLength > 0){
            var downLineTable = "<table cellpadding='0' cellspacing='0' border='0'><tr class='lines x'><td class='line left half'></td><td class='line right half'></td></table>";
            mainTable += "<tr class='lines'><td colspan='"+childLength*2+"'>"+downLineTable+'</td></tr>';

            var linesCols = '';
            for(var i=0;i<childLength;i++){ 
            	var style = 'style="width:' + 100/(childLength * 2) + '%;"';               	
                if(i==0){
                    linesCols += "<td class='line left'" + style + "></td>";
                }
                else{
                    linesCols += "<td class='line left top' " + style + "></td>";
                }

                if(i==childLength-1){
                    linesCols += "<td class='line right' " + style + "></td>";
                }
                else{
                    linesCols += "<td class='line right top' " + style + "></td>";
                }
            }
            mainTable += "<tr class='lines v'>"+linesCols+"</tr>";

            mainTable += "<tr>";
            for(var i in self.children.sort(self.compare)){
                mainTable += "<td colspan='2'>"+self.children[i].render(opts)+"</td>";
            }
            mainTable += "</tr>";
        }
        mainTable += '</table>';
        return mainTable;
    }
    
    var orgChart = JSON.parse(localStorage.getItem('orgChart'));
    

    this.formatNode = function(opts){		
        var str = '';
        
        if(getContrastYIQ(self.rankColor) == 'black'){
    		if(self.status == 0) {
	    		str = "<div class='node no_use' node-id='"+self.userid+"' style='background :" + self.rankColor + "'>";
	    	} else {
	    		str = "<div class='node node3110' node-id='"+self.userid+"' style='background :" + self.rankColor + "'>";
	    	}
    	} else {
    		if(self.status == 0) {
	    		str = "<div class='node no_use' node-id='"+self.userid+"' style='background :" + self.rankColor + "'>";
	    	} else {
	    		str = "<div class='node node3110' node-id='"+self.userid+"' style='background :" + self.rankColor + "'>";
	    	}
    	}
        
        str = str
        +drawNode(orgChart.orgChart01, data, opts)
        +drawNode(orgChart.orgChart02, data, opts)
        +drawNode(orgChart.orgChart03, data, opts)
        +drawNode(orgChart.orgChart04, data, opts)
        +drawNode(orgChart.orgChart05, data, opts)
        +drawNode(orgChart.orgChart06, data, opts)
        +drawNode(orgChart.orgChart07, data, opts)
        +drawNode(orgChart.orgChart08, data, opts)
        +drawNode(orgChart.orgChart09, data, opts)
        +drawNode(orgChart.orgChart10, data, opts)
        +"</div>";
        
        return str;
    }


    this.compare = function( a, b ) {
        if ( a.abPos < b.abPos ){
          return -1;
        }
        if ( a.abPos > b.abPos ){
          return 1;
        }
        return 0;
      }
                  
     function getContrastYIQ(hexcolor){
    	if(hexcolor){
    		hexcolor = hexcolor.replace("#", "");
		    var r = parseInt(hexcolor.substr(0,2),16);
		    var g = parseInt(hexcolor.substr(2,2),16);
		    var b = parseInt(hexcolor.substr(4,2),16);
		    var yiq = ((r*299)+(g*587)+(b*114))/1000;
		    return (yiq < 186) ? 'black' : 'white';
    	}
	    
	}
}