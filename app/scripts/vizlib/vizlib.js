//**************************
// CHECK FOR INTERNET EXPLORER
//**************************
var ie = (function(){
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
    while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',all[0]);
    return v > 4 ? v : undef;
}());

if (ie<=9) {
document.getElementById("loaderContent0").style.display = "block";
throw new Error('Visualisation does not support IE7/8/9');
} else {
document.getElementById("loaderContent1").style.display = "block";
};

// check if mobile
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

	if ($('#svgContainer').width() < 700) {
	    isMobile=true;
	} 
// }

var Vizlib = function(sources, callback){

	// VARIABLE DECLARATION
	var svg;
	var logging = true;
	// counters to handle multiple defs for arrows and patterns
	var arrow = 0;
	var patternId = 0;
	// some default colour ranges
	var color = ['#618784', '#00937F', 'purple'];

	//*****************************
	// LOAD DATA
	//*****************************

	if(arguments.length == 2){

		var data = [];

		var runstr = 'queue()';	

		sources.forEach(function(d,i) {

			var noCache = '?_=' + new Date().getTime();
			var s = "foo";
			if(d.source.indexOf("arcgis/rest/services") > -1){
				noCache = '';
			};

			if(d.source.indexOf("popdata.unhcr.org") > -1){
				noCache = '';
			};

			var method = 'd3.json';

			if(d.source.indexOf(".json") > -1){ method = 'd3.json';};
			if(d.source.indexOf(".csv") > -1){ method = 'd3.csv';};
			if(d.source.indexOf(".svg") > -1){ method = 'd3.xml';};
			if(d.source.indexOf(".xls") > -1){ method = 'xlsReq';};
			if(d.source.indexOf(".xlsx") > -1){ method = 'xlsxReq';};

			if((sources.length-1)!=i){
				runstr += '.defer('+method+', "'+d.source+noCache+'")';
			} else {
				runstr += '.defer('+method+', "'+d.source+noCache+'").await(function(){for (i = 1; i < arguments.length; i++) { data[sources[i-1].name] = arguments[i];}; callback(data); });';
			}
		});

		eval(runstr);
	}



	//*******************************
	// FRAME HANDLING
	//*******************************

	var activeFrame = 1;
	var maxFrames = 4;

	this.maxFrames = function(max){
		maxFrames = max;
	};

	this.gotoFrame = function(frame, duration){
		loadFrame(frame, duration);
	}

	function loadFrame(frame, duration){

		// $('#leftButton').show();
		// $('#rightButton').show();

		activeFrame = frame;

		d3.selectAll('.frame')
		.transition()
		.duration(duration)
		// .style('visibility', 'hidden');
		.style('opacity', 0)
		.style('display', 'none');

		d3.selectAll('.frame'+frame)
		.transition()
		.duration((duration))
		.style('opacity', 1)
		// .style('visibility', 'visible');
		.style('display', 'block');

		if(activeFrame==1){
			$('#framePrev').prop('disabled', true);
			// $('#leftButton').hide();
			// $('#rightButton').show();
		} else {
			$('#framePrev').prop('disabled', false);
		}

		if(activeFrame==maxFrames){
			$('#frameNext').prop('disabled', true);
			// $('#leftButton').show();
			$('#rightButton').hide();
		} else {
			$('#frameNext').prop('disabled', false);
			// $('#leftButton').show();
			// $('#rightButton').show();
		}
	}

	this.nextFrame = function(duration){
		activeFrame++;
		this.gotoFrame(activeFrame, duration);
		return activeFrame;
	}

	this.prevFrame = function(duration){
		activeFrame = activeFrame - 1;
		this.gotoFrame(activeFrame, duration);
		return activeFrame;
	}

	function initFrame(){
		loadFrame(activeFrame, 0);
	}

	function frameHandler(frames, object){
		var frameN = 'frame'+frames;
		var c = {};
		c['frame'] = true;
		if($.isArray(frames)){
			frames.forEach(function(f){
				c['frame'+f] = true;
			});
		} else {
			c['frame'+frames] = true;
		}
		object.classed(c);
		return object;
	}

	this.hide = function(options){

		// defaults
		var fade = 1000,
		delay = 0,
		destroy = false;

		// overwrite defaults if set
		if(options.fade){fade = options.fade};
		if(options.delay){delay = options.delay};
		if(options.destroy){destroy = options.destroy};

		if((options.object == undefined)||(options.object == '')){alert("hide: no object has been set - e.g. 'object': pie1"); return false;};
		var object = options.object;

		object
		.transition()
		.delay(delay)
		.duration(fade)
		.style('opacity', 0);	

		if(options.destroy == true){
			object.remove();
		}
	};

	this.show = function(options){

		// defaults
		var fade = 1000,
		delay = 0,
		opacity = 1;

		// overwrite defaults if set
		if(options.fade){fade = options.fade};
		if(options.delay){delay = options.delay};
		if(options.opacity){opacity = options.opacity};

		if((options.object == undefined)||(options.object == '')){alert("hide: no object has been set - e.g. 'object': pie1"); return false;};
		var object = options.object;

		object
		.transition()
		.delay(delay)
		.duration(fade)
		.style('opacity', opacity);	
	}

	//*******************************
	// USEFUL FUNCTIONS
	//*******************************
	
	// logger
	function log(name, element){if(logging){console.log(name+': '+element);}};

	// rounding function
	var rounder = function(value){
		var v = Math.abs(value);

		if(v<100){
			return Math.ceil(value/10)*10;
		};
		if(v<500){
			return Math.ceil(value/50)*50;
		};
		if(v<1000) {
			return Math.ceil(value/100)*100;
		}
		if(v<10000){
			return Math.ceil(value/1000)*1000;
		}
		if(v<100000){
			return Math.ceil(value/10000)*10000;
		}
		if(v<1000000){
			return Math.ceil(value/100000)*100000;
		}
		if(v<10000000){
			return Math.ceil(value/1000000)*1000000;
		}
		if(v<100000000){
			return Math.ceil(value/10000000)*10000000;
		}
	}

	// traverse a json
	function traverse(o, def, k) {
	    var type = typeof o 
	    if (type == "object") {
	        for (var key in o) {
	            if(key!='appendTo'){
	            	k = key;
		            traverse(o[key], def[key], key)
		        }
	        }
	    } else {

	    }
	}

	function addCommas(nStr){
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}

	function randomInt(){
		// return Math.floor(Math.random()*100000);
		return Math.floor(Date.now() / 1000);
	}

	function deepCopy(src, dest) {
	    var name,
	        value,
	        isArray,
	        toString = Object.prototype.toString;

	    // If no `dest`, create one
	    if (!dest) {
	        isArray = toString.call(src) === "[object Array]";
	        if (isArray) {
	            dest = [];
	            dest.length = src.length;
	        }
	        else { // You could have lots of checks here for other types of objects
	            dest = {};
	        }
	    }

	    // Loop through the props
	    for (name in src) {

	        if (!isArray || src.hasOwnProperty(name)) {
	            value = src[name];
	            if ((typeof value === "object")&&(name!='appendTo')&&(name!='data')) { // set which options to not deep traverse
	                // Recurse
	                value = deepCopy(value);
	            }
	            dest[name] = value;
	        }
	    }

	    return dest;
	}

	function parseOptions(defaults, options){
		var def = defaults; 
		
		// override defaults
		var newOptions = deepCopy(options, def);

		if(newOptions.attachTo){
			var id = '#'+newOptions.attachTo;
			var c = $(id)[0].getBBox();
			// $(id).hide();

			var cont = d3.selectAll(id).attr('opacity',0);

			// d3.select('#mapsvg #mapContainer').attr('opacity', 0);

			newOptions.x = c.x;
			newOptions.y = c.y;
			newOptions.width = c.width;
			newOptions.height = c.height;
		}
		return newOptions;
	}

	function chartHeader(group, title, subtitle, width, font, units){

		// title and sub-title group
		var textHeader = group.append('g')
		.attr("transform", "translate(0,0)");


		// handle unit suffix
		if(units!=''){
			title = title + '§ - in '+units;
		}

		// title
		if(title!=''){
			var titleObj = textHeader
				.append('text')
				.attr('x', 0)
				.attr('y', 0)
				.style('font-family', "'Open Sans', sans-serif")
				.style('font-weight', font.title.weight)
				.style('font-size', font.title.size)
				.call(wrap, width, title) // wrap the text
				.selectAll('tspan')
				.attr('dominant-baseline', 'hanging');
		}
		
		// sub-title
		if(subtitle!=''){
			var subtitleObj = textHeader
			.append('text')
			.attr('id', 'pieTitleSub')
			.attr('x', 0)
			.attr('y', function(){
				if(titleObj){
					return titleObj.node().getBBox().height}
				else {
					return 0;
				}
			})
			.style('font-family', "'Open Sans', sans-serif")
			.style('font-weight', font.subtitle.weight)
			.style('font-size', font.subtitle.size)
			.call(wrap, width, subtitle) // wrap the text
			.selectAll('tspan')
			.attr('dominant-baseline', 'hanging');
		}

		// get bbox of title group
		var headerBBox = textHeader.node().getBBox();

		var yOffset = {};
		yOffset.yOffset = headerBBox.height+4;
		return yOffset;
	}


	function chartLegend(object, width, legend, header, seriesNames, color){
		var position = legend.position;

		var legend = object.append('g')
		.attr('class', 'legend');

		legend.selectAll('.legendItem')
		.data(seriesNames)
		.enter()
		.append('g')
		.attr('class', 'legendItem')
		.attr('transform', function(d,i){
			return 'translate(300,'+25*i+')';
		})
		.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', 20)
		.attr('height', 10)
		.attr('fill', function(d,i){
			return color[i];
		});

		legend.selectAll('.legendItem')
		.append('text')
		.attr('x', 25)
		.attr('y', 0)
		.attr('dominant-baseline', 'hanging')
		.text(function(d,i){
			return d;
		});

	}

	function wrap(text, width, str) {

    text.each(function () {
        var text = d3.select(this),
            words = str.split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.3, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");

        while (word = words.pop()) {

            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];

                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });



	// handle units e.g. in thousands
	var ts = text.selectAll('tspan');
	var qe = 0;	
	ts.each(function(){

		var te = d3.select(this);

		if(qe>0){
			te.style('font-weight', 'normal');
		}

		var t = d3.select(this).text();

		if(t.indexOf("§") > -1){
			var tx = t.split("§")[0];
			te.text(tx);

			var tw = te.node().getComputedTextLength();

			d3.select(this.parentNode).append('tspan')
			.text(t.split("§")[1])
			.style('font-weight', 'normal')
			.attr('dy', te.attr('dy'))
			.attr('x', tw)
			.attr('y', te.attr('y'));

			qe++;;
		}


	})

}


	function wrapLabel(text, width) {
	  text.each(function() {
	    var text = d3.select(this),
	        words = text.text().split(/\s+/).reverse(),
	        word,
	        line = [],
	        lineNumber = 0,
	        lineHeight = 1.1, // ems
	        y = text.attr("y"),
	        dy = parseFloat(text.attr("dy")) || 0,
	        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
	    while (word = words.pop()) {
	      line.push(word);
	      tspan.text(line.join(" "));
	      if (tspan.node().getComputedTextLength() > width) {
	        line.pop();
	        tspan.text(line.join(" "));
	        line = [word];
	        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
	      }
	    }
	  });
	}

	//*********************************
	// CREATE SVG
	//*********************************

	this.createSvg = function(options){

		// defaults
		var width = '100%',
		height = '100%',
		svgClass = 'svg',
		downloadButton = false,
		viewBoxWidth = 1500,
		viewBoxHeight = 1500,
		aspectRatio = 'auto',
		scrollable = false;

		if((options.div == undefined)||(options.div == '')){alert("createSvg: no div has been set - e.g. 'div': '#box1'"); return false;};
		if((options.id == undefined)||(options.id == '')){alert("createSvg: no id has been set for the svg - e.g. 'id': 'svg1'"); return false;};

		// overwrite defaults if set
		// if(options.width){width = options.width};
		// if(options.height){height = options.height};
		if(options.id){id = options.id};
		if(options.class){svgClass = options.class};
		if(options.div){div = options.div};
		if(options.aspectRatio){aspectRatio = options.aspectRatio};
		if(options.viewBoxWidth){viewBoxWidth = options.viewBoxWidth};
		if(options.viewBoxHeight){viewBoxHeight = options.viewBoxHeight};
		if(options.downloadButton != undefined){downloadButton = options.downloadButton};
		if(options.scrollable != undefined){scrollable = options.scrollable};
		// if(options.printBtn != undefined){printBtn = options.printBtn};
		// if(options.unhcrHeader != undefined){unhcrHeader = options.unhcrHeader};

		var divContainer = div;

		var rid = 'divcontainer_'+Math.floor(Math.random()*10000);
		$(divContainer).append('<div id="'+rid+'"></div>');

		div = '#'+rid;
		$(div).css('margin', 'auto');



		// RESPONSIVE SVG/DIV - SET ASPECTRATIO
		// if(aspectRatio!='auto'){

			aspectRatio = viewBoxWidth/viewBoxHeight;

			$(div).addClass('vizlibResponsiveDiv');
			$(div).attr('data-aspectRatio', aspectRatio);
			$(div).css('overflow','hidden');

			var vx = viewBoxWidth;
			var vy = vx*aspectRatio;

			// var w = $(div).width();
			// $(div).height(w/aspectRatio);



		// }

			window.onresize = function(){
				setTimeout(resizeDevice, 10);
			}

			var resizeDevice = function() {

				if($(div).hasClass('vizlibResponsiveDiv')){

					$(div).width('100%');

					var ar = $(div).attr('data-aspectRatio');

					var cWidth = $(div).width();
					var cHeight = $(div).height();

					$(div).height(cWidth/aspectRatio);

					if(scrollable == false){
						$(div).height('100%');
						cWidth = $(div).width();
						cHeight = $(div).height();
						
						if((cWidth/aspectRatio)>cHeight){
							$(div).width($(div).height()*aspectRatio);
						} else {
							$(div).width('100%');
							$(div).height($(div).width()/ar);
						}


					} else {
						$(div).width('100%');
						var cWidth = $(div).width();
						var cHeight = $(div).height();

						if((cWidth/ar)>cHeight){
							$(div).height($(div).width()/ar);
						} 
					}

					if(options.isMobile){
						var cWidth = $(div).width();
						var cHeight = $(div).height();
						$(div).width('100%');
						$(div).height(cWidth/aspectRatio);
					}

					

				// var w = $(div).width();
				// $(div).height(w/ar);

				// } else {

				// 	$(div).width('100%');
				// 	$(div).height('100%');

				}
			};



			$(document).ready(function(){

				$(window).trigger('resize');

			});
			

		// append svg to div
		this.svg = d3.select(div)
		.append('svg')
		.attr('id', id)
		.attr('class', svgClass)
		.attr('height', height)
		.attr('width', width)
		.attr('viewBox', "0 0 "+(viewBoxWidth)+" "+(viewBoxHeight-00))
		.attr('preserveAspectRatio', "xMinYMin slice")
	   .style('-moz-user-select','none')
	   .style('-khtml-user-select','none')
	   .style('-webkit-user-select','none')
	   .style('-ms-user-select','none')
	   .style('user-select','none')
	   .style('cursor','default');


		// .attr('viewbox', '0 0 400 400')
		// .attr('preserveAspectRatio', 'xMinYMin');

		// add frame number class if option is set
		if(options.frame != undefined){
			vector = frameHandler(options.frame, this.svg);
		};

		return this.svg;
	};


	//*********************************
	// CREATE SUB-SVG
	//*********************************

	this.createSubSvg = function(options){

		options = parseOptions(defaultOptions.subsvg, options);

		if((options.id == undefined)||(options.id == '')){alert("createSvg: no id has been set for the svg - e.g. 'id': 'svg1'"); return false;};

		// append svg to div
		this.svg = options.appendTo
		.append('g')
		.attr('transform', 'translate('+options.x+','+options.y+')')
		.append('svg')
		.attr('id', options.id)
		.attr('class', options.classed)
		.attr('height', options.height+'px')
		.attr('width', options.width+'px')
		.attr('viewBox', "0 0 "+options.width+" "+options.height)
		// .attr('preserveAspectRatio', "xMinYMin slice")

		// .attr('viewbox', '0 0 400 400')
		// .attr('preserveAspectRatio', 'xMinYMin');

		// add frame number class if option is set
		if(options.frame != undefined){
			this.svg = frameHandler(options.frame, this.svg);
		};

		return this.svg;
	};

	this.svgImport = function(options){

		// defaults
		var source = './images/MyLayer.svg',
		layerId = 'MyLayer',
		opacity = 1,
		fade = 0,
		delay = 0,
		fontFamily = 'Lato';

		// overwrite defaults if set
		if(options.source){source = options.source};
		if(options.layerId){layerId = options.layerId};
		if(options.opacity){opacity = options.opacity};
		if(options.fade){fade = options.fade};
		if(options.delay){delay = options.delay};

		if((options.appendTo == undefined)||(options.appendTo == '')){alert("svgImport: no appendTo object has been set - e.g. 'appendTo': svg1"); return false;};
		var appendTo = options.appendTo;

		// console.log(source.getElementsByTagName('svg')[0]);
		// console.log(d3.select(source).select('g').node());
		var svgNode = d3.select(source).select('g').attr('transform',null).node();
		var defs = d3.select(source).select('defs').node();

	    appendTo.node().appendChild(svgNode);

	    if(defs){
		    appendTo.node().appendChild(defs);
		}

	    // var svgNode = d3.select(source).select('svg').attr('width','100%').attr('height','100%').node();
	    // appendTo.node().appendChild(svgNode);

	    d3.selectAll('#'+layerId)
	    .attr('transform', 'translate(0,0)scale(1)');
		    
		//**************************
		// replace fonts
		//**************************

		$('tspan').each(function(){
			var font = $(this).attr('font-family');

			if(font==options.fontFamily+'-Bold'){
			$(this).attr('font-family', "'"+options.fontFamily+"', sans-serif;").css('font-weight', '700');
			}
			if(font==options.fontFamily+'-Italic'){
			$(this).attr('font-family', "'"+options.fontFamily+"', sans-serif;").css('font-style', 'italic');
			}
			if(font==options.fontFamily+'-Regular'){
			$(this).attr('font-family', "'"+options.fontFamily+"', sans-serif;");
			}
			if(font==options.fontFamily+'MT'){
			$(this).attr('font-family', "'"+options.fontFamily+"', sans-serif;");
			}
			if(font==options.fontFamily+'-BoldMT'){
			$(this).attr('font-family', "'"+options.fontFamily+"', sans-serif;").css('font-weight', '700');
			}
		});

	}

	//*********************************
	// BASIC SHAPES
	//*********************************

	this.rect = function(options) {

		// defaults
		var fill = 'green',
		width = 50,
		height = 50,
		strokeWidth = 2,
		strokeColor = 'darkgreen',
		thisClass = 'rectangle',
		opacity = 1,
		fade = 0,
		delay = 0,
		x = 0,
		y = 0;

		// overwrite defaults if set
		if(options.fill){fill = options.fill};
		if(options.width){width = options.width};
		if(options.height){height = options.height};
		if(options.strokeWidth){strokeWidth = options.strokeWidth};
		if(options.strokeColor){strokeColor = options.strokeColor};
		if(options.opacity){opacity = options.opacity};
		if(options.thisClass){thisClass = options.thisClass};
		if(options.x){x = options.x};
		if(options.y){y = options.y};
		if(options.fade){fade = options.fade};
		if(options.delay){delay = options.delay};

		if((options.appendTo == undefined)||(options.appendTo == '')){alert("rect: no appendTo object has been set - e.g. 'appendTo': svg1"); return false;};
		var appendTo = options.appendTo;

		var rect = appendTo
		.append('rect')
		.attr('x', x)
		.attr('y', y)
		.attr('width', width)
		.attr('height', height)
		.style('fill', fill)
		.style('stroke', strokeColor)
		.style('stroke-width', strokeWidth)
		.style('opacity', opacity)

		// add frame number class if option is set
		if(options.frame != undefined){
			rect = frameHandler(options.frame, rect);
		};

		return rect;

	};

	//**************************
	// SLIDER
	//**************************

	this.slider = function(options){

		options = parseOptions(defaultOptions.slider, options);

		textYOffset = 12;
		if(options.labelPosition == 'bottom'){
			textYOffset = -20;
			options.y = options.y-24;
		}

		if((options.appendTo == undefined)||(options.appendTo == '')){alert("pie: no appendTo object has been set - e.g. 'appendTo': svg1"); return false;};
		if((options.id == undefined)||(options.id == '')){alert("pie: no id has been set - e.g. 'id': svg1"); return false;};

		if(options.barPadding==true){
			var wP = options.width/options.data.length;
			options.width = options.width - wP;
			options.x = options.x + wP/2;
		}

		options.width = options.width-options.paddingLeft;
		options.x = options.x+options.paddingLeft;

		if(options.scale=='time'){
			var xAxis = d3.time.scale()
			.domain([d3.min(options.data), d3.max(options.data)])
			.range([0, options.width])
			.clamp(true);
		} else {
			var xAxis = d3.scale.linear()
			.domain([d3.min(options.data), d3.max(options.data)])
			.range([0, options.width])
			.clamp(true);			
		}


		var brush = d3.svg.brush()
		.x(xAxis)
		.extent([0, 0])
		.on("brush", brushed);

		var svg = options.appendTo
		.append("g")
		.attr('class', 'slider')
		.style('cursor', 'pointer')
		.attr("transform", "translate(" + options.x + "," + (options.y+options.height) + ")");


		if(options.scale=='time'){
			// minor ticks
			var sliderAxisMinor = svg.append("g")
			.attr("class", "sliderAxisMinor")
			.style('cursor', 'pointer')
			.attr("transform", "translate(0," + -4 + ")")
			.call(d3.svg.axis()
			.tickFormat(function(d) { return ''; })
			.scale(xAxis)
			.orient("bottom")
			.tickPadding(15)
			.tickSize(8)
			.ticks(d3.time.days, 1));
		} else {
			// minor ticks
			var sliderAxisMinor = svg.append("g")
			.attr("class", "sliderAxisMinor")
			.style('cursor', 'pointer')
			.attr("transform", "translate(0," + -4 + ")")
			.call(d3.svg.axis()
			.tickFormat(function(d) { return ''; })
			.scale(xAxis)
			.orient("bottom")
			.tickPadding(15)
			.tickSize(5)
			.ticks(options.data.length));	
		}
		

		// text labels
		if(options.scale=='time'){

			var dateFormat = d3.time.format("%B");

			var sliderText = svg.append("g")
			.attr("class", "sliderText")
			.attr("transform", "translate(0," + 0 + ")")
			.call(d3.svg.axis()
			.scale(xAxis)
			.orient("top")
			.tickFormat(function(d) { return dateFormat(d); })
			.tickPadding(textYOffset)
			.tickSize(0)
			.ticks(d3.time.months, 1));
		} else {
			var sliderText = svg.append("g")
			.attr("class", "sliderText")
			.attr("transform", "translate(0," + 0 + ")")
			.call(d3.svg.axis()
			.scale(xAxis)
			.orient("top")
			.tickFormat(function(d) { return d; })
			.tickPadding(textYOffset)
			.tickSize(0)
			.ticks(10));
		}

		// ticks
		if(options.scale=='time'){
			var sliderAxis = svg.append("g")
			.attr("class", "sliderAxis")
			.style('cursor', 'pointer')
			.attr("transform", "translate(0," + -7 + ")")
			.call(d3.svg.axis()
			.tickFormat(function(d) { return ''; })
			.scale(xAxis)
			.orient("bottom")
			.tickPadding(15)
			.tickSize(14)
			.ticks(d3.time.months, 1));
		} else {
			var sliderAxis = svg.append("g")
			.attr("class", "sliderAxis")
			.style('cursor', 'pointer')
			.attr("transform", "translate(0," + -7 + ")")
			.call(d3.svg.axis()
			.tickFormat(function(d) { return ''; })
			.scale(xAxis)
			.orient("bottom")
			.tickPadding(15)
			.tickSize(15)
			.ticks(10));
		}



		// tick lines
		sliderAxis.selectAll('line')
		.attr('fill', 'none')
		.style('cursor', 'pointer')
		.attr('stroke', options.stroke)
		.style('stroke-width', options.strokeWidth);

		// tick minor lines
		sliderAxisMinor.selectAll('line')
		.attr('fill', 'none')
		.style('cursor', 'pointer')
		.attr('stroke', '#BFBFBF')
		.style('stroke-width', options.minorStrokeWidth);

		// axis horizontal line
		sliderText.selectAll('path')
		.attr('fill', 'none')
		.style('cursor', 'pointer')
		.attr('stroke', options.stroke)
		.style('stroke-width',3);


		// hide horizontal line on text lablel axis
		sliderAxis.selectAll('path')
		.attr('fill', 'none')
		.style('cursor', 'pointer')
		.attr('stroke', options.stroke)
		.style('stroke-width',0);

		// hide horizontal line on text lablel axis
		sliderAxisMinor.selectAll('path')
		.attr('fill', 'none')
		.style('cursor', 'pointer')
		.attr('stroke', options.stroke)
		.style('stroke-width',0);

		// create svg group
		var slider = svg.append("g")
		.attr("class", "slider")
		.call(brush);

		slider.selectAll(".extent,.resize")
		.remove();

		slider.select(".background")
		.attr("height", options.height*1.5)
		.attr('y', -10)
		.style('cursor', 'pointer');

		var handleWidth = 11;
		var handleHeight = 20;
		var handleBorderRadius = 3;

		// handle
		var handle = slider.append("rect")
		.attr('height', handleHeight)
		.attr('width', handleWidth)
		.attr('x', 0)
		.attr('y', (-handleHeight/2)+1)
		.attr('rx', handleBorderRadius)
		.attr('ry', handleBorderRadius)
		.attr("class", "handle")
		.attr("transform", "translate(0," +0+ ")")
		.attr("fill", '#FFF')
		.attr("fill-opacity", 1)
		.style('stroke', options.handleStroke)
		.style('stroke-width', 2)
		.on('mouseover', function(d){
			d3.select(this).attr('fill', '#F4F4F4')
		})
		.on('mouseout', function(d){
			d3.select(this).attr('fill', '#FFF')
		});


		if(options.handleLine==true){
			slider.append('line')
			.attr('id', 'sliderLine')
			.attr('x1',1)
			.attr('x2',1)
			.attr('y1',-9)
			.attr('y2',-126)
			.style('stroke', '#0077C0')
			.style('stroke-width', 1);
		}


		if(options.scale=='time'){
			slider
			.call(brush.event)
			.transition() // gratuitous intro!
			.duration(0)
			.call(brush.extent([d3.max(options.data), d3.max(options.data)]))
			.call(brush.event);
		} else {
			slider
			.call(brush.event)
			.transition() // gratuitous intro!
			.duration(0)
			.call(brush.extent([options.defaultValue, options.defaultValue]))
			.call(brush.event);
		}
		

		var valueOld = 0;

		function brushed() {

			if(options.scale=='time'){

				var value = d3.time.day.round(new Date(brush.extent()[0]));

				if (d3.event.sourceEvent) { // not a programmatic event
					value = d3.time.day.round(new Date(xAxis.invert(d3.mouse(this)[0])));

					if(value.getTime()!=valueOld.getTime()){
						brush.extent([value, value]);
						sliderUpdate(value);

						// highlight text labels
						sliderText.selectAll(".tick")
						.select("text")
						.attr("fill", function(d,i) {return d == value ? '#000' : '#999999'})
					}

				} else {

					// highlight text labels
					sliderText.selectAll(".tick")
					.select("text")
					.attr("fill", function(d,i) {return d == value ? '#000' : '#999999'})
				}

				handle.attr("x", xAxis(d3.time.day.round(new Date(value)))-handleWidth/2);

				d3.select('#sliderLine').attr("x1", xAxis(d3.time.day.round(new Date(value)))).attr("x2", xAxis(d3.time.day.round(new Date(value))));
				valueOld = d3.time.day.round(new Date(value));

			} else {

				var value = brush.extent()[0];

				if (d3.event.sourceEvent) { // not a programmatic event
					value = xAxis.invert(d3.mouse(this)[0]);
					if(options.snap==true){
						value = Math.round(value);
						if(value!=valueOld){
							brush.extent([value, value]);
							sliderUpdate(value);

							// highlight text labels
							sliderText.selectAll(".tick")
							.select("text")
							.attr("fill", function(d,i) {return d == value ? '#000' : '#999999'})
						}
					} else {
						brush.extent([value, value]);
						sliderUpdate(value);
					}

				} else {


					// highlight text labels
					sliderText.selectAll(".tick")
					.select("text")
					.attr("fill", function(d,i) {return d == value ? '#000' : '#999999'})
				}

				handle.attr("x", xAxis(value)-handleWidth/2);
				valueOld = Math.round(value);

			}
			
		}

		function sliderUpdate(value){
			options.action(value);
		}

		if(options.frame != undefined){
			svg = frameHandler(options.frame, svg);
		};

		slider.update = options.action;

		slider.setVal = function(val){
			slider.call(brush.extent([val, val]))
			.call(brush.event);
		};

		return slider;

	}


	//*********************************
	// TABLE BAR
	//*********************************

	this.tableBar = function(options) {

		var thisClass = 'tablebar',
		id = "tableBar1",
		opacity = 1,
		xOffset = 0,
		yOffset = 0,
		limit = 5,
		fade = 0,
		delay = 0,
		fill = 'green',
		fillOpacity = 1,
		padding = 0,
		height = 300,
		width = 300,
		axisWidth = 50,
		title = 'Title',
		rowSpacing = 5;

		// overwrite defaults if set
		// if(options.width){width = options.width};
		// if(options.height){height = options.height};
		if(options.thisClass){thisClass = options.thisClass};
		if(options.opacity){opacity = options.opacity};
		if(options.xOffset){xOffset = options.xOffset};
		if(options.yOffset){yOffset = options.yOffset};
		if(options.fade){fade = options.fade};
		if(options.delay){delay = options.delay};
		if(options.source){data = options.source};
		if(options.innerRadius){innerRadius = options.innerRadius};
		if(options.innerBorder !== undefined){innerBorder = options.innerBorder};
		if(options.enableText !== undefined){enableText = options.enableText};
		if(options.fontSize){fontSize = options.fontSize};
		if(options.padding){padding = options.padding};
		if(options.height){height = options.height};
		if(options.width){width = options.width};
		if(options.title){title = options.title};
		if(options.limit){limit = options.limit};
		if(options.valueField){valueField = options.valueField};
		if(options.nameField){nameField = options.nameField};
		if(options.class){thisClass = options.thisClass};
		if(options.id){id = options.id};
		if(options.fill){fill = options.fill};
		if(options.fillOpacity){fillOpacity = options.fillOpacity};
		if((options.appendTo == undefined)||(options.appendTo == '')){alert("pie: no appendTo object has been set - e.g. 'appendTo': svg1"); return false;};
		var appendTo = options.appendTo;

		data.sort(function(a,b) { return +b.values.total - +a.values.total; })
		var data = data.filter(function(d){ return (d.key !== 'undefined') && (d.key !== 'TBD')})
		var max = d3.max(data, function(d) { var total = d.values.total; return total; });

		var x = d3.scale.linear()
		.range([0, (width-axisWidth)])
		.domain([0, max]);

		var container = appendTo.append('g')
		.attr('id', id)
		.attr('transform', 'translate('+xOffset+','+yOffset+')');

		var rows = container.selectAll('.'+thisClass)
		.data(data.filter(function(d,i){return i<(limit)}))
		.enter()
		.append('g')
		.attr('class', thisClass)
		.attr('transform', function(d,i){
			return 'translate('+0+','+(i*(height/limit)+rowSpacing)+')';
		});

		var color = ['#00669E','#9CBED0'];


		rows.selectAll(".rowBar")
		.data(function(d,i){ return d.values.bars;})
		.enter()
		.append('rect')
		.attr('class', 'rowBar')
		.attr('width', function(d){
			return x(d);
		})
		.style('fill', function(d,i){
			return color[i];
		})
		.style('fill-opacity', fillOpacity)
		.attr('height', ((height/limit)-rowSpacing))
		.attr('y',0)
		.attr("x", function(d,i){
		var v;
			if(i>0){
				v = d3.select(this.parentNode).datum().values.bars[i-1];
			} else {
				v = 0;
			}
			return x(v);
		})
		.style('stroke', '#FFF')
		.style('stroke-opacity', 0.5);

		rows
		.append('text')
		.style('text-anchor', 'end')
		.attr('y',11)
		.attr('x',-5)
		.style('font-size','10px')
		.text(function(d){
			return d[nameField];
		});

		var t1 = rows
		.append('text')
		.attr('y',12)
		.attr('x', function(d){
			return x(d.values.total)+3;
		})
		.style('font-size','11px')
		.attr('fill', function(d,i){ return color[0]})
		.style('font-weight','bold')
		.text(function(d){
			return addCommas(d.values.bars[0]);
		})
		.attr('class', function(d){
			d.bWidth = d3.select(this).node().getBBox().width;
			return 't1';
		});

		t2Divider = rows
		.append('text')
		.attr('y',12)
		.attr('x', function(d){
			return x(d.values.total)+d.bWidth+4;
		})
		.attr('fill', '#B5B5B5')
		.style('font-size','11px')
		.style('font-weight','bold')
		.text(function(d){
			return '|';
		});

		t2 = rows
		.append('text')
		.attr('fill', function(d,i){ return color[1]})
		.attr('y',12)
		.attr('x', function(d){
			return x(d.values.total)+d.bWidth+10;
		})
		.style('font-size','11px')
		.style('font-weight','bold')
		.text(function(d){
			return addCommas(d.values.bars[1]);
		});



		// title

		var bb = container.node().getBBox();

		// container.append('text')
		// .attr('x', bb.x)
		// .attr('y', -7)
		// .style('font-family', "'Open Sans', sans-serif")
		// .style('font-weight', 'bold')
		// .style('font-size', '14px')
		// .text(title);

				// add frame number class if option is set
			if(options.frame != undefined){
				container = frameHandler(options.frame, container);
			};


	}

	//*********************************
	// BAR CHART
	//*********************************

	this.barChart = function(options) {

		options = parseOptions(defaultOptions.barChart, options);
		// if((options.appendTo == undefined)||(options.appendTo == '')){alert("pie: no appendTo object has been set - e.g. 'appendTo': svg1"); return false;};

		options.data.sort(function(a,b) { return +b.values.total - +a.values.total; });

		options.width = options.width+50;
		if(options.customSort){
			// get index of others
			var others;
			options.data.forEach(function(d,i){
				if(d.key=='Others'){
					others = options.data[i];
					options.data.splice(i, 1);
				}
			});

			if(others){
				options.data.push(others);
			}
		}


		var data = options.data.filter(function(d){ return (d.key !== 'undefined') && (d.key !== 'TBD')})
		var max = d3.max(data, function(d) { var total = d.values.total; return total; });

		var x = d3.scale.linear()
		.range([0, (options.width-options.yAxis.axisPadding)])
		.domain([0, max]);

		var container = options.appendTo.append('g')
		.attr('id', id)
		.attr('transform', 'translate('+options.x+','+options.y+')');

		var barHeight = (options.height/options.limit);

		if(data.length<options.limit){
			options.height = barHeight*data.length;
		}

		// axis line
		container
		.append('line')
		.attr('x1',options.yAxis.axisPadding)
		.attr('x2',options.yAxis.axisPadding)
		.attr('y1',0)
		.attr('y2',options.height)
		.style('stroke', 'grey')
		.style('stroke-width', 1);

		var rows = container.selectAll('.'+options.thisClass)
		.data(data.filter(function(d,i){return i<(options.limit)}))
		.enter()
		.append('g')
		.attr('class', options.thisClass)
		.attr('transform', function(d,i){
			return 'translate('+options.yAxis.axisPadding+','+(i*(barHeight))+')';
		});

		var bars = rows
		.append('rect')
		.attr('class', 'rowBar')
		.attr('width', function(d){
			return x(d.values.total);
		})
		.style('fill', function(d,i){
			return options.fill;
		})
		.style('fill-opacity', options.fillOpacity)
		.attr('height', barHeight*(1-options.gutter))
		.attr('y',function(d,i){
			return ((barHeight - barHeight*(1-options.gutter))/2);
		})
		.attr("x", 0)
		.style('stroke', '#FFF')
		.style('stroke-opacity', 0.5)
		.on('mouseover', function(){
			d3.select(this).style('fill-opacity', options.fillOpacity - 0.05)
		})
		.on('mouseout', function(){
			d3.select(this).style('fill-opacity', options.fillOpacity)
		});

		var tickG = rows
		.append('g')
		.attr('transform', function(i){ 
			return 'translate(-5,0)';
		})

		tickG
		.append('text')
		.style('dominant-baseline', 'middle')
		.style('text-anchor', 'end')
		// .attr('y',0)
		.attr('dy',0)
		.attr('x',0)
		.attr('fill', '#6C6C6C')
		.style('font-size','10px')
		.text(function(d){
			return d.key;
		})
		.call(wrapLabel, options.yAxis.axisPadding);

		tickG
		.style('dominant-baseline', 'middle')
		.attr('transform', function(d,i){
			var tb = d3.select(this).node().getBBox();
			var offset = barHeight*(1-options.gutter)-tb.height/2;
			offset = offset + ((barHeight - barHeight*(1-options.gutter))/2)
			return 'translate(-5,'+offset+')';
		})



		var t1 = rows
		.append('text')
		.style('dominant-baseline', 'middle')
		.attr('y',barHeight/2+1)
		.attr('x', function(d){
			return x(d.values.total)+3;
		})
		.style('font-size','11px')
		.attr('fill', '#424242')
		.style('font-weight','normal')
		.text(function(d){
			return addCommas(d.values.total)+'%';
		})
		.attr('class', function(d){
			d.bWidth = d3.select(this).node().getBBox().width;
			return 't1';
		});

		var bb = container.node().getBBox();

		// container.append('text')
		// .attr('x', bb.x)
		// .attr('y', -7)
		// .style('font-family', "'Open Sans', sans-serif")
		// .style('font-weight', 'bold')
		// .style('font-size', '14px')
		// .text(title);

		// add frame number class if option is set
		if(options.frame != undefined){
			container = frameHandler(options.frame, container);
		};

		return bars;

	}

	//*********************************
	// PIE CHART
	//*********************************

	this.pie = function(options) {

		options = parseOptions(defaultOptions.pie, options);

		if((options.appendTo == undefined)||(options.appendTo == '')){alert("pie: no appendTo object has been set - e.g. 'appendTo': svg1"); return false;};
		if((options.id == undefined)||(options.id == '')){alert("pie: no id has been set - e.g. 'id': svg1"); return false;};

		var piedata = options.data;

		var arc = d3.svg.arc()
		.outerRadius(options.radius - 0)
		.innerRadius(options.radius - (options.radius * options.innerRadius));

		var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) { return d; });

		// main group object
		var pieObject = options.appendTo
		.append("g")
		.attr('id', options.id)
		.style('opacity', options.opacity)
		.attr("transform", "translate("+parseInt(options.x)+","+parseInt(options.y)+")");

		// add titles
		var header = chartHeader(pieObject, options.title, options.subtitle, options.width, options.font, options.units);

		// add legend
		if((options.legend)&&(options.legend.enabled)){
			chartLegend(pieObject, options.width, options.legend, header, options.seriesNames, options.color)
		};

		// create groups for each slice
		var slices = pieObject.selectAll(".arc")
		.data(pie(piedata))
		.enter().append("g")
		.attr("class", "arc");	

		// draw slices
		var slices = pieObject.selectAll("path")
		.data(pie(piedata))
		.enter().append("path")
		.attr("d", arc)
		.attr('transform',function(){var tx = options.radius, ty = options.radius+header.yOffset; return 'translate('+tx+','+ty+')'})
		.style('stroke', '#FFF')
		.style('stroke-width', 1)
		.style('stroke-opacity', 0.3)
		.style("fill", function(d, i) { return options.color[i]; })
		.each(function(d) { this._current = d; }); // store the initial values

		if(options.enableText == true){
			var textContainer = pieObject
			.append('g')

			var text = textContainer
			.append("text")
			.attr('class','piePercent')
			.style('font-size', options.font.piePercent.size)
			.style('font-weight', options.font.piePercent.weight)
			.style('font-family', options.font.piePercent.family)
			.style("text-anchor", "middle")
			.attr('dominant-baseline', 'middle')
			.text(function(d) { var percent = (piedata[0]/(piedata[0]+piedata[1]))*100; return Math.round(percent) + '%' })   
			.attr('y', function(){
				return options.radius+header.yOffset;
			})
			.attr('x', function(){
				return options.radius;
			})
			.style('opacity', 1);

		}  


		if(this.innerRing){
			pieObject.append("circle")
			.attr('r', function(){ return options.radius - (options.radius * options.innerRadius) -2;})
			.attr('cx', 0)
			.attr('cy', 0)
			.style('fill', 'transparent')
			.style('stroke', '#bfbfbf')
			.style('stroke-width', 1)
		}

// 		var timeout = setTimeout(function() {
//   d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
// }, 2000);

slices.update = function(updateOptions){

			// defaults
			var transition = 1000;

			// set variables
			if(updateOptions.transition){transition = updateOptions.transition};

			if((updateOptions.data == undefined)||(updateOptions.data == '')){alert("pie.update: no data has been set - e.g. 'data': [1,2,3]"); return false;};			
			var piedata = updateOptions.data;

			if((updateOptions.id == undefined)||(updateOptions.id == '')){alert("pie.update: no id has been set - e.g. 'id': '#pie1'"); return false;};			
			var id = updateOptions.id;

			var enterAntiClockwise = {
				startAngle: Math.PI * 2,
				endAngle: Math.PI * 2
			};

			var pieTotal = d3.sum(piedata);

			var pieObject = d3.select(id);

			var path = pieObject.selectAll("path")
			.data(pie(piedata));
			
			path.enter().append("path")
			.style("fill", function (d, i) {
				return color[i];
			})
			.attr("d", arc(enterAntiClockwise))
			.each(function (d) {
				this._current = {
					data: d.data,
					value: d.value,
					startAngle: enterAntiClockwise.startAngle,
					endAngle: enterAntiClockwise.endAngle
				};
			}); // store the initial values

			path.exit()
			.transition()
			.duration(transition)
			.attrTween('d', arcTweenOut)
			.remove() // now remove the exiting arcs

			path.transition().duration(transition).attrTween("d", arcTween); // redraw the arcs
			
			function arcTween(a) {
				var i = d3.interpolate(this._current, a);
				this._current = i(0);
				return function(t) {
					return arc(i(t));
				};
			}

			function arcTweenOut(a) {
				var i = d3.interpolate(this._current, {startAngle: Math.PI * 2, endAngle: Math.PI * 2, value: 0});
				this._current = i(0);
				return function (t) {
					return arc(i(t));
				};
			}

			// update text
			pieObject.select('.piePercent')
			.text(function(d) { var percent = (piedata[0]/(piedata[0]+piedata[1]))*100; return Math.round(percent) + '%' }); 

			var slices = pieObject.selectAll("path")
			.on('mouseover', function(d,i){
				var percent = (d.value/pieTotal)*100;
				d3.select('.piePercent')
				.text(Math.round(percent) + '%')
				.transition()
				.duration(250)
				.style('opacity',1);

			})
			.on('mouseout', function(d){
				d3.select('.piePercent')
				.transition()
				.duration(250)
				.style('opacity',0);
			})

			
			return slices;

		};

		// add frame number class if option is set
			if(options.frame != undefined){
				pieObject = frameHandler(options.frame, pieObject);
			};

		return slices;
	};

	//*********************************
	// LINE/AREA CHART
	//*********************************	

	this.lineChart = function(options){

		// handle options
		options = parseOptions(defaultOptions.lineChart, options);

		if((options.appendTo == undefined)||(options.appendTo == '')){alert("columnChart: no appendTo object has been set - e.g. 'appendTo': svg1"); return false;};
		if((options.id == undefined)||(options.id == '')){alert("pie: no id has been set - e.g. 'id': svg1"); return false;};

		var margin = {top: 38, right: 15, bottom: 25, left: 40};

		if(this.yAxisEnabled == false){
			margin.left = margin.right;
		}

		var chartdata = options.data;

		var lineColor = options.color;
		// var parseDate = d3.time.format(options.parseDateFormat).parse;

		var v = 0;

		chartdata.forEach(function(d) {
			// d.key = parseDate(d[options.dataKey]);
			if(options.cumulative == true){
				v = v+d[options.dataValues];
			    d.value = v; // cumulative
			} else {
				d.value = +d.value;
			}
		});

		var colWidth = options.width/chartdata.length;

		if(options.xAxis.ticks>0){
			var xTicks = options.xAxis.ticks;
		} else {
			var xTicks = chartdata.length;
		}

		var minDate = (chartdata[0]).series,
	    maxDate = (chartdata[chartdata.length-1]).series;

		// var x = d3.time.scale()
		var x = d3.time.scale()
		.range([0, options.width-(colWidth)])
		.domain([minDate, maxDate])
		.nice(2008);

		var maxValue = d3.max(chartdata, function(d) { return d[options.dataValues]; });

		var y = d3.scale.linear()
		.range([options.height, 0])
		.domain([0, rounder(maxValue)]);

		var xAxis = d3.svg.axis()
		.scale(x)
		.tickSize(0, 5, 0)
		.tickFormat(options.xAxis.format)
		.orient("bottom")
		.ticks(xTicks)
		.tickPadding(7);

		var yAxis = d3.svg.axis()
		.scale(y)
		.orient(options.yAxis.orient)
		.ticks(options.yAxis.ticks)
		.tickPadding(options.width);

		if(options.area == false){
			var line = d3.svg.line()
			.x(function(d) { return x(d[options.dataKey])+(colWidth/2); })
			.y(function(d) { return y(d[options.dataValues]); });
		} else {
			var line = d3.svg.area()
			.x(function(d) { return x(d[options.dataKey])+(colWidth/2); })
			.y0(options.height)
			.y1(function(d) { return y(d[options.dataValues]); });
		}

		if(options.spline == true){
			line.interpolate("monotone");
		}

		var svgContainer = options.appendTo
		.append("g")
		.attr('id', options.id)
		.attr('class', 'lineChart')
		.attr("transform", "translate(" + options.x + "," + options.y + ")");

		var svg = svgContainer.append('g');

		var svgChart = svgContainer.append("g");

		var bg = svgChart.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', options.width)
		.attr('height', options.height)
		.attr('opacity', 0);

		if(options.yAxis.enabled==true){
			svg.append("g")
			.attr("class", "yAxis axis")
			.call(yAxis)
			.append("text")
			.attr('class','axisLabel')
			.attr("transform", "rotate(-90)")
			.attr("y", -36)
			.attr("dy", ".71em")
			.attr("x", ((-options.height/2)+25))
			.style("text-anchor", "end")
			// .text("Frequency");
		}

		if(options.yAxis.gridlines.enabled == true){
			var yAxisGrid = yAxis
			.tickSize(options.width, 0)
			.tickFormat("")
			.orient("right");

			svg.append("g")
			.classed('y', true)
			.classed('grid', true)
			.call(yAxisGrid)
		}

		// place label in between month ticks
		var xAxisOffset = 0;

		svg.append("g")
		.attr("class", "xAxis axis")
		.attr("transform", "translate(0," + options.height + ")")
		.call(xAxis)
		.selectAll(".lineChart .tick text")
		.style("text-anchor", "middle")
		.style('fill', options.xAxis.font.values.color)
		.style('font-size', options.xAxis.font.values.size)
		.style('font-family', options.xAxis.font.values.family)
		.style('font-weight', options.xAxis.font.values.weight)
		.attr("x", colWidth/2)
		.attr("y", 8);

		// hide vertical axis line
		svg.select('.xAxis path')
		.style('display','none');

		var line = svgChart.append("path")
		.datum(chartdata)
		.attr("class", "line")
		.attr("d", line)
		.style('stroke', options.color)
		.style('fill', 'none')
		.style('stroke-width', options.strokeWidth);

		if(this.area == true){
			line.style('fill', color[0]);
		}

		if(options.tooltip.enabled){

			var hoverLine = svgChart.append('g')
			.attr('class', 'hoverLine')
			.attr('opacity',1)
			.attr('transform','translate(0,0)');

			hoverLine.append('line')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',0)
			.attr('y2', options.height)
			.style('stroke-width', 1)
			.style('stroke', '#D8D8D8')
			.style('fill', 'none')
			.style('fill-opacity', 0);
		}

		if(options.symbolPoints.enabled == true){
			var symbolPoints = svgChart.append('g').attr('class', 'sp')
			.selectAll(options.class+' .symbolPoints')
			.data(chartdata)
			.enter()
			.append('rect')
			.attr('width', options.symbolPoints.size)
			.attr('height', options.symbolPoints.size)
			.attr('x', function(d,i){
				return (i)*colWidth+colWidth/2-options.symbolPoints.size/2;
			})
			.attr('y', function(d,i){
				return y(d[options.dataValues])-options.symbolPoints.size/2;
			})
			.attr('fill', lineColor)
			.style('stroke',lineColor)
			.style('stroke-width',2);
		}

		if(options.tooltip.enabled){
			var hoverTooltip = svgChart.append('g')
			.attr('class', 'hoverTooltip')
			.attr('opacity',1)
			.attr('transform','translate(0,0)');

			var hoverTooltipBg = hoverTooltip.append('rect')
			.attr('x',5)
			.attr('y',-9)
			.attr('width',50)
			.attr('height',40)
			.style('opacity',1)
			.style('fill','#FFF')
			// .style('stroke','#D9D9D9')
			// .style('stroke-width',1);

			var hoverTooltipText = hoverTooltip.append('g');

			var hoverTooltipYear = hoverTooltipText.append('text')
			.attr('x',12)
			.attr('y',7)
			.style('font-size',10)
			.style('font-weight', 'bold')
			.text(2014);

			var hoverTooltipVal = hoverTooltipText.append('text')
			.attr('x',12)
			.attr('y',22)
			.style('font-size',13)
			.style('font-weight', 'normal')
			.style('fill', lineColor)
			.text('200,000');

			hoverLine.style('display','none');
			hoverTooltip.style('display','none');

			svgChart
			.on('mouseover', function(){
				hoverLine.style('display','block');
				hoverTooltip.style('display','block');
			})
			.on('mousemove', function(){
				var mouse = d3.mouse(this);
				var mx = mouse[0];
				var my = mouse[1];
				var x0 = x.invert(mx);
				var y0 = my-25;
				var hoverYear = x0.getFullYear();
				var thisd = new Date(hoverYear, 6, 1);

				hoverLine.attr('opacity',1)
				.attr('transform', function(){
					return 'translate('+x(thisd)+',0)';
				});

				hoverTooltip.attr('opacity',1)
				.attr('transform', function(){
					return 'translate('+x(thisd)+','+y0+')';
				});

				var val = 0;
				var yr = 0;

				symbolPoints.attr('fill', function(d,i){
					if(d.series.getFullYear()==hoverYear){
						val = d.values;
						yr = d.series.getFullYear();
						return '#FFF';
					} else {
						return lineColor;
					}
				});

				// get text width and adjust bg
				var textW = hoverTooltipText.node().getBBox().width;
				hoverTooltipBg.attr('width',textW+15);

				hoverTooltipVal.text(addCommas(val));
				hoverTooltipYear.text(yr);

			})
			.on('mouseout', function(){
				hoverLine.style('display','none');
				hoverTooltip.style('display','none');
				symbolPoints.attr('fill', lineColor);
			});
		}

		// add frame number class if option is set
		if(options.frame != undefined){
			svg = frameHandler(options.frame, svg);
		};

		svgContainer.update = function(updateOptions){

			var chartdata = updateOptions.data;

			if(updateOptions.duration){
				var duration = updateOptions.duration;
			} else {
				var duration = 0;
			}

			var v = 0;

			chartdata.forEach(function(d) {
				// d.key = parseDate(d[options.dataKey]);
				if(options.cumulative == true){
					v = v+d[options.dataValues];
				    d.value = v; // cumulative
				} else {
					d.value = +d.value;
				}
			});

			var colWidth = options.width/chartdata.length;

			if(options.xAxis.ticks>0){
				var xTicks = options.xAxis.ticks;
			} else {
				var xTicks = chartdata.length;
			}

			// var x = d3.time.scale()
			var x = d3.time.scale()
			.range([0, options.width-(colWidth)])
			.domain(d3.extent(chartdata, function(d) { return d[options.dataKey]; }))
		
			var maxValue = d3.max(chartdata, function(d) { return d[options.dataValues]; });

			if(updateOptions.maxValue){
				maxValue = updateOptions.maxValue;
			}

			var y = d3.scale.linear()
			.range([options.height, 0])
			.domain([0, rounder(maxValue)]);

			var xAxis = d3.svg.axis()
			.scale(x)
			.tickSize(0, 5, 0)
			.tickFormat(options.xAxis.format)
			.orient("bottom")
			.ticks(xTicks)
			.tickPadding(7);

			svgContainer.selectAll(".xAxis.axis")
			.transition()
			.delay(0)
			.duration(duration)
			.call(xAxis)
			.selectAll(".lineChart .tick text")
			.style("text-anchor", "middle")
			.style('fill', options.xAxis.font.values.color)
			.style('font-size', options.xAxis.font.values.size)
			.style('font-family', options.xAxis.font.values.family)
			.style('font-weight', options.xAxis.font.values.weight)
			.attr("x", colWidth/2)
			.attr("y", 8);

			var yAxis = d3.svg.axis()
			.scale(y)
			.orient(options.yAxis.orient)
			.ticks(options.yAxis.ticks)
			.tickPadding(options.width);

			svg.selectAll(".yAxis.axis")
			.transition()
			.delay(0)
			.duration(duration)
			.call(yAxis);

			if(options.yAxis.gridlines.enabled == true){
				var yAxisGrid = yAxis
				.tickSize(options.width, 0)
				.tickFormat("")
				.orient("right");

				svg.selectAll(".grid")
				.transition()
				.delay(0)
				.duration(duration)
				.call(yAxisGrid);

			}

			if(options.area == false){
				var line = d3.svg.line()
				.x(function(d) { return x(d[options.dataKey])+(colWidth/2); })
				.y(function(d) { return y(d[options.dataValues]); });
			} else {
				var line = d3.svg.area()
				.x(function(d) { return x(d[options.dataKey])+(colWidth/2); })
				.y0(options.height)
				.y1(function(d) { return y(d[options.dataValues]); });
			}

			if(options.spline == true){
				line.interpolate("monotone");
			}

			var ln = svgChart.select('.line')
			.datum(chartdata)
			.transition()
			.duration(duration)
			.attr("d", line)

			if(options.area == true){
				ln.style('fill', options.color)
				.style('fill-opacity', 0.1);
			}

			if(options.symbolPoints.enabled == true){

				symbolPoints.remove();

				symbolPoints = svgChart.append('g').attr('class', 'sp')
				.selectAll(options.class+' .symbolPoints')
				.data(chartdata)
				.enter()
				.append('rect')
				.attr('width', options.symbolPoints.size)
				.attr('height', options.symbolPoints.size)
				.attr('x', function(d,i){
					return (i)*colWidth+colWidth/2-options.symbolPoints.size/2;
				})
				.attr('y', function(d,i){
					return y(d[options.dataValues])-options.symbolPoints.size/2;
				})
				.attr('fill', options.color)
			}

		}


		svgContainer.removeMarkers = function(){
			svgContainer.selectAll('.timeline_marker').remove();
		};

		svgContainer.addMarkers = function(markerOptions){

			var dateFormat = d3.time.format("%d %b %Y");

			var marker = svgContainer.selectAll('.timeline_marker')
			.data(markerOptions.data)
			.enter()
			.append('g')
			.attr('opacity', 0)
			.attr('class', 'timeline_marker')
			.attr('transform', function(d){
				var xPos = x(d3.time.day.round(new Date(d.date))) + colWidth/2;
				return 'translate('+xPos+',0)';
			});

			marker
			.append('line')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1', 3)
			.attr('y2', options.height+15)
			.style('stroke', '#7F7F7F')
			.style('stroke-width', 1);

			marker
			.append('circle')
			.attr('r', 5)
			.attr('cx', 0)
			.attr('cy', 0)
			.style('fill', '#0077c0')
			.style('stroke', '#FFF')
			.style('stroke-width', 1);

			marker
			.append('rect')
			.attr('class', 'lineTooltipHandle')
			.attr('x', -4)
			.attr('y', 0)
			.attr('width', 8)
			.attr('height',options.height)
			.style('fill', 'transparent')
			.style('cursor', 'pointer');
			
			// .style('stroke', '#7F7F7F')
			// .style('stroke-width', 1);

			var tooltip = marker
			.append('g')
			.attr('class', 'lineTooltip')
			.attr('opacity', 0)
			.attr('transform', 'translate(9,9)');

			tooltip
			.append('rect')
			.attr('class', 'lineTooltipBg')
			.attr('x', 4)
			.attr('y', 0)
			.attr('width', 185)
			.attr('height',50)
			.style('fill', '#FFF')
			.style('stroke', '#F6F6F6')
			.style('stroke-width', 1);

			tooltip
			.append('text')
			.attr('x', 9)
			.attr('y', 15)
			.text(function(d){
				return dateFormat(d.date);
			})
			.style('font-weight', 'bold')
			.style('font-size', '12px');


			var tooltipText = 
			tooltip.append('g')
			.attr('transform', 'translate(9,4)');

			tooltipText
			.append('text')
			.attr('class', 'lineTooltipText')
			.attr('x', 0)
			.attr('y', 25)
			.text(function(d){ return d.text; })
			.style('font-weight', 'normal')
			.style('font-size', '12px');

			tooltip.selectAll('.lineTooltipText')
		    .call(wrapLabel, 170);

			marker.selectAll('.lineTooltipHandle')
			.on('mouseover', function(d){
				var e = d3.select(this.parentNode);

				var bbox = e.select('.lineTooltipText').node().getBBox();
				e.select('.lineTooltipBg')
				.attr('height', bbox.height+25)
				.attr('width', bbox.width+14);
				e.selectAll('line').style('stroke', '#000');
				e.selectAll('circle').style('fill', '#004B87');

				e.select('.lineTooltip').transition().duration(500).attr('opacity', 1);

			})
			.on('mouseout', function(d){
				var e = d3.select(this.parentNode);

				e.selectAll('line').style('stroke', '#7F7F7F');
				e.selectAll('circle').style('fill', '#0077c0');

				e.select('.lineTooltip').transition().duration(500).attr('opacity', 0);

			});

			marker.transition().delay(300).duration(1000).attr('opacity',1);





		};

		return svgContainer;


	}

	//*********************************
	// COLUMN CHART
	//*********************************	

	this.columnChart = function(options){

		// handle options
		options = parseOptions(defaultOptions.columnChart, options);

		if((options.appendTo == undefined)||(options.appendTo == '')){alert("columnChart: no appendTo object has been set - e.g. 'appendTo': svg1"); return false;};
		if((options.id == undefined)||(options.id == '')){alert("pie: no id has been set - e.g. 'id': svg1"); return false;};
		var appendTo = options.appendTo;

		// margins
		var margin = {top: 0, right: 15, bottom: 0, left: 0};
		
		options.height = options.height-5; 

		options.height = options.height - options.paddingTop;

		var chartdata = options.data;

		// container g, and
		var svg = appendTo
		.append("svg")
		.attr('id', options.id)
		.attr('class', 'columnChart')
		.style('opacity', options.opacity)
		.attr('x',options.x)
		.attr('y',options.y)
		.attr('width',options.width+90)
		.attr('height', options.height+30)
		.append('g')
		.attr("transform", "translate(" + options.paddingLeft + "," + (parseInt(4)+parseInt(options.paddingTop)) + ")");

		var svgBg = svg.append('g');

		svgBg.append('rect')
		.attr('x',0)
		.attr('y',0)
		.attr('width',options.width-options.paddingLeft)
		.attr('height',options.height)
		.attr('opacity',0);

		var svgChart = svg.append('g').attr('class', 'chartarea');

		var svgTooltip = svg.append('g').attr('class', 'svgtooltip');

		options.width = options.width - options.paddingLeft;

		// if(options.paddingLeft!=0){
		// 	width = width - options.paddingLeft;
		// 	options.x = options.x + options.paddingLeft;
		// }
		var color = options.color;


		// reorganize data
		chartdata.forEach(function(d, i) {
			d.barValues = [];
		});

		chartdata.forEach(function(d, i) {
			var barValue = d.barValues;
			// barValue[0]=0;
			// if totals is an array, loop through each value to make a stack

			if(d[options.dataValues].length>1){
				d[options.dataValues].forEach(function(d2, i2){
					var v = 0;
					if(i2>=1){
						v = barValue[i2-1];
					}
					if(!options.grouped){
						barValue[i2] = d2 + v;
					} else {
						barValue[i2] = d2;
					}
				})
			// if totals is jsut one value, set it to index 1
			} else {
				barValue[0] = d[options.dataValues];
			}
		});

	
		// define maximum value
		var maxValue = d3.max(chartdata, function(d) {
			if(d.barValues.length>1){
			  return d3.sum(d[options.dataValues]);
			} else {
				return d[options.dataValues];
			}
		});

		if(options.maxValue){
			if(options.maxValue!='auto'){
				// maxValue = options.maxValue;
			}
		}

		var x = d3.scale.ordinal()
	    .rangeBands([0, options.width], 0)
        .domain(chartdata.map(function(d) { return d[options.dataKey]; }));

		var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.tickSize(0)
		.tickPadding(7);

		// define y-axis
		var y = d3.scale.linear()
		.range([options.height, 0])
		.domain([0, (maxValue)]);


		if(options.maxValue=='round'){
			var y = d3.scale.linear()
			.range([options.height, 0])
			.domain([0, rounder(maxValue)]);
		}

		var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(5)
		.tickPadding(0);


		// y-axis
		if(options.yAxis.enabled==true){
			
			var yAxisText = svgBg.append("g")
			.attr("class", "yAxis axis colchart")
			.call(yAxis)
			.style('font-size', options.yAxis.font.values.size);

			if((options.yAxis.label)&&(options.yAxis.label != '')){
				yAxisText
				.append("text")
				.attr('class','axisLabel')
				.attr("transform", "rotate(-90)")
				.attr("y", -30-options.yAxis.font.label.padding)
				.attr("dy", ".71em")
				.attr("x", ((-height/2)+25))
				.style("text-anchor", "end")
				.style('font-weight', options.yAxis.font.label.weight)
				.style('font-size', options.yAxis.font.label.size)
				.text(options.yAxis.label)
			}
		}

		// y-axis gridlines
		if(options.yAxis.gridlines.enabled == true){
			var yAxisGrid = yAxis
			.tickSize(options.width, 0)
			.tickFormat("")
			.orient("right");

			var rid = 'grid'+Math.floor(Math.random()*10000);
			svgBg.append("g")
			.classed({
				rid: true,
				'colChartGrid': true
			})
			.call(yAxisGrid);

			d3.selectAll('.colChartGrid line')
			.style('stroke', options.yAxis.gridlines.stroke)
			.style('stroke-opacity', options.yAxis.gridlines.opacity)
			.style('stroke-width', options.yAxis.gridlines.strokeWidth)
			.style('stroke-dasharray', '2,2');


		}

		// x-axis 
		if(options.xAxis.enabled == true){
			var xAxisObj = svgBg.append("g")
			.attr("class", "xAxis axis")
			.attr("transform", "translate(0," + options.height + ")")
			.call(xAxis)
			.style('font-size', options.xAxis.font.values.size)
			.style('font-family', options.xAxis.font.values.family)
			.style('font-weight', options.xAxis.font.values.weight)
			.style('fill', options.xAxis.font.values.color)

			xAxisObj
			.selectAll('path, line')
			.style('opacity', options.xAxis.gridlines.opacity )
			.style('stroke', options.xAxis.gridlines.stroke )
			.style('stroke-width', options.xAxis.gridlines.strokeWidth )
		}

		if(options.xAxis.gridlines.enabled == true){
			svgBg.append('line')
			.attr('class', 'xAxisHorizontalLine')
			.attr('x1', 0)
			.attr('x2', options.width)
			.attr('y1', options.height)
			.attr('y2', options.height)
			.style('opacity', options.xAxis.gridlines.opacity )
			.style('stroke', options.xAxis.gridlines.stroke )
			.style('stroke-width', options.xAxis.gridlines.strokeWidth );
		}

		// bar groups
		var bars = svgChart.selectAll(".barGroup")
		.data(chartdata)
		.enter()
		.append('g')
		.attr("class", "barGroup")
	    .attr("transform", function(d) { return "translate(" + x(d[options.dataKey]) + ",0)"; });

		// individual bars
		var individualBars = bars.selectAll('.bar')
		.data(function(d,i){ return d.barValues;})
		.enter()
		.append("rect")
		.attr('class', 'bar')
		.attr("x", function(d,i) { 
			if(!options.grouped){
				return x.rangeBand()*options.gutter/2; 			
			} else {
				if(i==0){
					return x.rangeBand()/2*options.gutter; 							
				} else {
					return x.rangeBand()/2*i+1;
				}
			}
		})
		.attr("width", function(d,i) { 
			if(!options.grouped){
				return x.rangeBand()-(x.rangeBand()*options.gutter); 
			} else {
				return (x.rangeBand()-(x.rangeBand()*options.gutter))/2;
			}
		})
		.attr("y", function(d,i) { 
			if(i>=0){
				var v = d; 
			} else {
				var v = d[i];
			}

			return y(v); 
		})
		.attr("height", function(d,i) { 
			var vs = 0;
			if(i>0){
				if(!options.grouped){
					vs = d3.select(this.parentNode).datum().barValues[i-1];
				} 				
			}
			return options.height-y(d-vs); 

			// return y(d);
		})
		.style('fill', function(d,i){ if(color.length > 1){return color[i]} else {return color[0];}})
		.on('mouseover', function(){
			d3.select(this).style('fill-opacity', options.fillOpacity - 0.05)
		})
		.on('mouseout', function(){
			d3.select(this).style('fill-opacity', options.fillOpacity)
		});

		// // bar mouse over events
		// individualBars
		// .on('mouseover', function(d,i){
		// 	d3.select(this)
		// 	.style('fill', function(d,i){if(color.length > 1){return color[i]} else {return d3.rgb(color[0]).brighter(0.4);}})
		// })
		// .on('mouseout', function(d,i){
		// 	d3.select(this)
		// 	.style('fill', function(d,i){if(color.length > 1){return color[i]} else {return color[0];}})
		// })

		// data labels				
		if(options.dataLabels.enabled==true){
			bars
			.append("svg:text")
			.attr('class','dataLabel')
			.attr("x", function(d) { return  (x.rangeBand()/2); })
			.attr("y", function(d) { return y(d.total)-options.dataLabels.font.padding; })
			.style("text-anchor", "middle") // text-align: right
			.style('font-size', options.dataLabels.font.size)
			.style('font-weight', options.dataLabels.font.weight)
			.style('font-family', options.dataLabels.font.family)
			.text(function(d){return addCommas(d.total)});
		}

		function type(d) {
			d.value = +d.value;
			return d;
		}

		// add frame number class if option is set
		if(options.frame != undefined){
			svg = frameHandler(options.frame, svg);
		};


		if((options.tooltip)&&(options.tooltip.enabled)){

			var hoverLine = svgBg.append('g')
			.attr('class', 'hoverLine')
			.attr('opacity',1)
			.attr('transform','translate(0,0)');

			hoverLine.append('line')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',25)
			.attr('y2', options.height)
			.style('stroke-width', 1)
			.style('stroke', '#D8D8D8');

			hoverLine.append('line')
			.attr('x1',x.rangeBand())
			.attr('x2',x.rangeBand())
			.attr('y1',25)
			.attr('y2', options.height)
			.style('stroke-width', 1)
			.style('stroke', '#D8D8D8');


			var hoverTooltip = svgTooltip.append('g')
			.attr('class', 'hoverTooltip')
			.attr('opacity',1)
			.attr('transform','translate(0,0)');

			var hoverTooltipBg = hoverTooltip.append('rect')
			.attr('x',3)
			.attr('y',-9)
			.attr('width',59)
			.attr('height',76)
			.style('opacity',1)
			.style('fill','#FFF')
			// .style('stroke','#D9D9D9')
			// .style('stroke-width',1);

			var hoverTooltipText = hoverTooltip.append('g');

			var hoverTooltipYear0 = hoverTooltipText.append('text')
			.attr('x',10)
			.attr('y',7)
			.style('font-size',10)
			.style('font-weight', 'bold')
			.text('Jan 2014');

			var hoverTooltipVal0 = hoverTooltipText.append('text')
			.attr('x',10)
			.attr('y',24)
			.style('font-size',14)
			.style('font-weight', 'normal')
			.style('fill', 'grey')
			.text('200,000');

			var hoverTooltipYear1 = hoverTooltipText.append('text')
			.attr('x',10)
			.attr('y',42)
			.style('font-size',10)
			.style('font-weight', 'bold')
			.text('Jan 2015');

			var hoverTooltipVal1 = hoverTooltipText.append('text')
			.attr('x',10)
			.attr('y',59)
			.style('font-size',14)
			.style('font-weight', 'normal')
			.style('fill', color[1])
			.text('200,000');

			hoverLine.style('display','none');
			hoverTooltip.style('display','none');

			svgTooltip.append('rect')
			.attr('x',0)
			.attr('y',50)
			.attr('width',options.width)
			.attr('height',options.height-50)
			.attr('opacity',0);

			var mouseOn = false;

			svgTooltip
			.on('mouseover', function(){
				mouseOn = true;
				// hoverLine.style('display','block');
				hoverTooltip.style('display','block');
			})
			svgTooltip
			.on('mousemove', function(){
				
				if(mouseOn==true){
				var leftEdges = x.range();
		        var width = x.rangeBand();
		        var mouse = d3.mouse(this);
				var mx = mouse[0];
				var my = mouse[1];
				var j;

		        for(j=0; mx > (leftEdges[j] + width); j++) {}
	            //do nothing, just increment j until case fails
				var x0Line = x(x.domain()[j]);
				var x0 = mx+15;

				if(chartdata[j]){
				var vals = chartdata[j].values;
				hoverTooltipYear0.text(chartdata[j].series + ' ' +chartdata[j].years[0]);
				hoverTooltipYear1.text(chartdata[j].series + ' ' +chartdata[j].years[1]);

				var y0 = my-25;
				// var hoverYear = x0.getFullYear();
				// var thisd = new Date(hoverYear, 6, 1);

				hoverLine.attr('opacity',1)
				.attr('transform', function(){
					return 'translate('+x0Line+',0)';
				});

				hoverTooltip.attr('opacity',1)
				.attr('transform', function(){
					return 'translate('+x0+','+y0+')';
				});

				var val = 0;
				var yr = 0;

				// get text width and adjust bg
				var textW = hoverTooltipText.node().getBBox().width;
				hoverTooltipBg.attr('width',textW+17);

				if(vals[0]==0){vals[0]='-';};
				if(vals[1]==0){vals[1]='-';};

				hoverTooltipVal0.text(addCommas(vals[0]));
				hoverTooltipVal1.text(addCommas(vals[1]));

				bars.attr('opacity', function(d,i){
					if(i==j){
						return 1;
					} else {
						return 0.4;
					}

				})
				}
				} else {

				}

			});
			svgTooltip
			.on('mouseout', function(){
				mouseOn = false;
				bars.attr('opacity',1);
				hoverLine.style('display','none');
				hoverTooltip.style('display','none');
			});
		}





		bars.update = function(updateOptions){

			var delay = 100;
			var duration = updateOptions.duration;

			// reorganize data
			updateOptions.data.forEach(function(d, i) {
				d.barValues = [];
			});

			updateOptions.data.forEach(function(d, i) {
				var barValue = d.barValues;
				// barValue[0]=0;
				// if totals is an array, loop through each value to make a stack
				if(d[options.dataValues].length>1){
					d[options.dataValues].forEach(function(d2, i2){
						var v = 0;
						if(i2>=1){
							v = barValue[i2-1];
						}
						if(!options.grouped){
							barValue[i2] = d2 + v;
						} else {
							barValue[i2] = d2;
						}
					})
				// if totals is jsut one value, set it to index 1
				} else {
					barValue[0] = d[options.dataValues];
				}
			});

			// find maximum value
			var maxValue = d3.max(updateOptions.data, function(d) {
			  return d[options.dataValues];
			});

			if(updateOptions.maxValue){
				maxValue = updateOptions.maxValue;
			}

			if(updateOptions.minValue){
				var minValue = updateOptions.minValue;
			} else {
				var minValue = 0;
			}

		
			// redefine scale
			var y = d3.scale.linear()
			.range([options.height, 0])
			.domain([minValue, rounder(maxValue)]);

			var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(5)
			.tickPadding(0);

			d3.selectAll(".yAxis.axis.colchart")
			.transition()
			.delay(delay)
			.duration(500)
			.call(yAxis);

			var yAxisGrid = yAxis
			.tickSize(options.width, 0)
			.tickFormat("")
			.orient("right");

			d3.selectAll('.colChartGrid')
			.transition()
			.delay(delay)
			.duration(500)
			.call(yAxisGrid);

			d3.selectAll('.colChartGrid line')
			.style('stroke', options.yAxis.gridlines.stroke)
			.style('stroke-opacity', options.yAxis.gridlines.opacity)
			.style('stroke-width', options.yAxis.gridlines.strokeWidth)
			.style('stroke-dasharray', '2,2');

			bars.data(updateOptions.data).selectAll('.bar')
			.data(function(d,i){ return d.barValues;})
			.transition()
			.delay(delay)
			.duration(500)
			.attr("y", function(d,i) { 
				if(i>=0){
					var v = d;
				} else {
					var v = 0;
				}
				return y(v); 
			})
			.attr("height", function(d) { return options.height-y(d); });
			// .style('fill', function(d,i){ if(color.length > 1){return color[i]} else {return color[0];}});
		}
		// // return object
		return bars;

	}


	//**************************
	// YEAR BUTTONS
	//**************************

	this.yearButtons = function(options){

		// handle options
		options = parseOptions(defaultOptions.yearButtons, options);
		if((options.appendTo == undefined)||(options.appendTo == '')){alert("columnChart: no appendTo object has been set - e.g. 'appendTo': svg1"); return false;};
		if((options.id == undefined)||(options.id == '')){alert("pie: no id has been set - e.g. 'id': svg1"); return false;};
		var appendTo = options.appendTo;
		
		var width = options.width;
		var height = options.height; 
		var data = options.data;

		var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width], 0)
        .domain(data.map(function(d) { return d; }));

		var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.tickSize(0)
		.tickPadding(7);

		// container g, and
		var svg = appendTo
		.append("g")
		.attr('class', 'yearButtons')
		.style('opacity', options.opacity)
		.attr("transform", "translate(" + (options.x) + "," + (options.y) + ")");

		// bar groups
		var buttons = svg.selectAll(".yearButton")
		.data(data)
		.enter()
		.append('g')
		.attr("class", "yearButton")
	    .attr("transform", function(d) { return "translate(" + x(d) + ",0)"; })
	    .style('cursor', 'pointer')
	    .on('click', function(d){
	    	d3.selectAll('.yearButton')
	    	.selectAll('rect')
	    	.attr('fill', options.fill);

	    	d3.selectAll('.yearButton')
	    	.selectAll('text')
	    	.attr('fill', options.fontColor);

	    	d3.select(this)
	    	.selectAll('rect')
	    	.attr('fill', options.fillSelected);

	    	d3.select(this)
	    	.selectAll('text')
	    	.attr('fill', options.fontColorSelected);

	    	action(d);

	    })

	    buttons
	    .append('rect')
	    .attr('x', 0)
	    .attr('y', 0)
	    .attr("width", function(d,i) { return x.rangeBand(); })
	    .attr('height', options.height)
	    .attr('fill', function(d){ 
	    	if(d==options.defaultSelected)
	    		{return options.fillSelected} else {return options.fill}
	    })
	    .style('stroke', '#D8D8D8');

	    buttons
	    .append('text')
		.attr('class','yearButtonTextLabel')
		.attr("x", function(d) { return  (x.rangeBand()/2); })
		.attr("y", function(d) { return height/2; })
		.style("text-anchor", "middle") // text-align: right
		.style('font-size', options.font.size)
		.style('font-weight', options.font.weight)
		.style('font-family', options.font.family)
		.style('alignment-baseline', 'central')
	    .attr('fill', function(d){ 
	    	if(d==options.defaultSelected)
	    		{return options.fontColorSelected} else {return options.fontColor}
	    })
		.text(function(d){return d;});


		function action(year){

		}

	    return buttons;

	}

	//*********************************
	// BUBBLE CHART
	//*********************************	

	this.bubbleChart = function(options) {

		// defaults
		var fill = 'green',
		strokeWidth = 2,
		strokeColor = 'darkgreen',
		thisClass = 'rectangle',
		opacity = 1,
		fade = 0,
		delay = 0,
		xOffset = 0,
		yOffset = 0,
		color = 'darkred';

		// overwrite defaults if set
		if(options.fill){fill = options.fill};
		if(options.width){width = options.width};
		if(options.height){height = options.height};
		if(options.strokeWidth){strokeWidth = options.strokeWidth};
		if(options.strokeColor){strokeColor = options.strokeColor};
		if(options.opacity){opacity = options.opacity};
		if(options.thisClass){thisClass = options.thisClass};
		if(options.xOffset){xOffset = options.xOffset};
		if(options.yOffset){yOffset = options.yOffset};
		if(options.fade){fade = options.fade};
		if(options.delay){delay = options.delay};
		if(options.source){source = options.source};

		if((options.appendTo == undefined)||(options.appendTo == '')){alert("rect: no appendTo object has been set - e.g. 'appendTo': svg1"); return false;};
		var appendTo = options.appendTo;

		// configurable options
		this.barSpace = 0.43; // percentage
		this.yAxisEnabled = true;
		this.dataLabelsEnabled = true;
		this.yAxisGrid = true;

		var margin = {top: 28, right: 25, bottom: 25, left: 35};

		if(this.yAxisEnabled == false){
			margin.left = margin.right;
		}

		// var width = $('#'+appendTo.attr('id')).width() - margin.left - margin.right;
		// var height = $('#'+appendTo.attr('id')).height() - margin.top - margin.bottom;

		var chartdata = options.source.features;

		var x = d3.time.scale()
		.range([0, width])
		.domain(d3.extent(chartdata, function(d) { return d.properties.time; }));

		var start = x.domain()[0];

		start.setDate(start.getDate()-1);
		start.setHours(23);
		start.setMinutes(59);
		start.setSeconds(0);

		x.domain([start, x.domain()[1]])[0];

		var maxValue = d3.max(chartdata, function(d) { return d.properties.mag; });
		var min = d3.min(chartdata, function(d) { return d.properties.mag; });

		var y = d3.scale.linear()
		.range([height, 0])
		.domain([min, Math.ceil(maxValue)]);

		var radiusScale = d3.scale.linear()
		.domain([min, maxValue])
		.range([0, 30]);  

		var opacityScale = d3.scale.sqrt()
		.domain([min, maxValue])
		.range([0.1, 0.5]); 

		var strokeScale = d3.scale.linear()
		.domain([min, maxValue])
		.range([0.1, 3]);  


		var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.tickSize(0)
		.ticks(4)
		.tickPadding(5)
		.tickFormat(d3.time.format("%d April"));

		var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(4)
		.tickPadding(0);

		var svg = appendTo
		.append("g")
		.attr('class', 'bubbleChart')
		.attr("transform", "translate(" + xOffset + "," + yOffset + ")");

		svg.append('text')
		.attr('x', -30)
		.attr('y', -45)
		.style('font-family', "'Open Sans', sans-serif")
		.style('font-weight', 'bold')
		.style('font-size', '16px')
		.text('Earthquakes and aftershocks');

		svg.append('text')
		.attr('x', -29)
		.attr('y', -25)
		.style('font-family', "Arial")
		.style('font-weight', 'bold')
		.style('font-size', '12px')
		.text('Source:');

		svg.append('text')
		.attr('x', 18)
		.attr('y', -25)
		.style('font-family', "arial")
		.style('font-weight', 'normal')
		.style('font-size', '12px')
		.text('USGS');

		if(this.yAxisEnabled==true){
			svg.append("g")
			.attr("class", "yAxis axis")
			.call(yAxis)
			.append("text")
			.attr('class','axisLabel')
			.attr("transform", "rotate(-90)")
			.attr("y", -28)
			.attr("dy", ".71em")
			.attr("x", ((-height/2)+25))
			.style("text-anchor", "end")
			.style("font-weight", "bold")
			.text("Magnitude");
		}

		if(this.yAxisGrid == true){
			var yAxisGrid = yAxis
			.tickSize(width, 0)
			.tickFormat("")
			.tickPadding(30)

			.orient("right");

			svg.append("g")
			.classed('y', true)
			.classed('grid', true)
			.call(yAxisGrid);
		}

		svg.append("g")
		.attr("class", "xAxis axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

		var xAxisGrid = xAxis
		.tickSize(height, 0)
		.tickFormat("")
		.tickPadding(0)
		.orient("bottom");

		svg.append("g")
		.classed('x', true)
		.classed('xgrid', true)
		.call(xAxisGrid);

		var bubbles = svg.selectAll(".bubble")
		.data(chartdata)
		.enter()
		.append('g')
		.attr("class", "bubble");

		bubbles
		.append("circle")
		.attr("cx", function(d,i){
			var date = new Date(d.properties.time);
			var day = date.getDate();
		    var monthIndex = date.getMonth();
		    var year = date.getFullYear();

		    var dateFormatted = day + ' ' + monthNames[monthIndex] + ' ' + year;

			return x(d.properties.time);
		})
		.attr("cy", function(d){return y(d.properties.mag)})
		.attr("r", function(d){ return radiusScale(d.properties.mag)})
		.style('fill-opacity', function(d){
			return opacityScale(d.properties.mag);
		})
		.style('stroke-opacity', function(d){
			return opacityScale(d.properties.mag);
		})
		.attr('id', function(d){
				return 'chart'+d.id;
		})
		.attr('class', 'chartbubble')
		.style('stroke', '#570809')
		.style('stroke-width', function(d){
			return strokeScale(d.properties.mag);
		})
		.style("fill", color)
		.on('mouseover', function(d,i){
			d3.select(this)
			.style('stroke-opacity', 1);

				var dt = new Date(d.properties.time);
				var t = dt.toTimeString().substring(0, 5);
				var dt = dt.getDate() + ' ' + monthNames[dt.getMonth()] + ' ' + dt.getFullYear() + ' - ' + t;

				d3.select('.mTitle').text('M'+d.properties.mag);
				d3.select('.mSubTitle1').text(dt);
				d3.select('#dM2').style('opacity', 1);


			var thisid = d.id;
			var mapbubbles = d3.selectAll('.mapbubble')
			.style('opacity', function(d){
				if(d.id == thisid){
					return 1
				} else {
					return 0.2;
				}
			})
			.style('stroke-opacity', function(d){
				if(d.id == thisid){
					return 1
				} else {
					return 0.2;
				}
			});
		})
		.on('mouseout', function(d,i){
			var mapbubbles = d3.selectAll('.mapbubble')
			.style('opacity',1)
			// .selectAll('circle')
			.style('stroke-opacity', function(d){
				return opacityScale(d.properties.mag);
			})

			d3.select(this)
			.style('stroke-opacity', function(d){
				return opacityScale(d.properties.mag);
			});
			d3.select('#dM2').style('opacity', 0)
			.attr('transform', 'translate(-100,-100)');

		})
		.on('mousemove', function(d,i){

			var t = d3.transform(d3.select(this).attr("transform")),
		    xt = t.translate[0],
		    yt = t.translate[1];

			coordinates = d3.mouse(this);
			var x = coordinates[0]+xt+xOffset;
			var y = coordinates[1]+yt+yOffset;

			d3.select('#dM2')
			.attr('transform', 'translate('+(x+13)+','+(y+5)+')');


		});

		// add frame number class if option is set
		if(options.frame != undefined){
			svg = frameHandler(options.frame, svg);
		};


		function type(d) {
		d.value = +d.value;
		return d;
		}

		return svg;


}


	//*********************************
	// MAPS - BASIC
	//*********************************	

	this.map = function(options) {

		// defaults
		var center = [44,33],
		mapbox = 'matthewsmawfield.31370f48',
		enableRaster = true,
		enableZoomButtons = true,
		zoomBtnPos = 'topright',
		enableZoomMouseScroll = true,
		enablePan = true,
		zoomTweak = 1,	
		zoomInit = 14,	
		zoomInSteps = 3,
		zoomOutSteps = 3,
		zoomFactor = 1.5,
		coordinatesTooltip = true,
		coordinatesToClipboard = true,
		enableDownload = false,
		xOffset = 0,
		yOffset = 0,
		mapBg = true;

		// overwrite defaults if set
		if(options.center){center = options.center};
		if(options.xOffset){xOffset = options.xOffset};
		if(options.yOffset){yOffset = options.yOffset};
		if(options.zoomInit){zoomInit = options.zoomInit};
		if(options.mapbox){mapbox = options.mapbox};
		if(options.enableRaster != undefined){enableRaster = options.enableRaster};
		if(options.enablePan != undefined){enablePan = options.enablePan};
		if(options.enableZoomButtons != undefined){enableZoomButtons = options.enableZoomButtons};
		if(options.enableZoomMouseScroll != undefined){enableZoomMouseScroll = options.enableZoomMouseScroll};
		if(options.zoomInSteps){zoomInSteps = options.zoomInSteps};
		if(options.zoomOutSteps){zoomOutSteps = options.zoomOutSteps};
		if(options.zoomFactor){zoomFactor = options.zoomFactor};
		if(options.zoomBtnPos){zoomBtnPos = options.zoomBtnPos};
		if(options.zoomTweak){zoomTweak = options.zoomTweak};

		if(options.coordinatesTooltip != undefined){coordinatesTooltip = options.coordinatesTooltip};
		if(options.coordinatesToClipboard != undefined){coordinatesToClipboard = options.coordinatesToClipboard};
		if(options.enableDownload != undefined){enableDownload = options.enableDownload};
		if(options.mapBg != undefined){mapBg = options.mapBg};

		var svg = options.appendTo;

		var zoomInitScale = null;

		// set width and height in relation to viewbox
		var vb = svg.attr('viewBox').split(" ");
		var vx = vb[2];
		var vy = vb[3];

		var width = vx;
		var hr = vy/vx;
		var height = vx*hr;

		// create container and mask 
		var map = svg.append('g').attr('id','mapsvgcontainer')
		// .attr('mask', 'url(#mask)');

		if(mapBg==true){
			map.append('rect')
			.attr('x',0)
			.attr('y',0)
			.attr('id', 'mapbg')
			.attr('width', width)
			.attr('height', height)
			.style('fill', '#FFF')
			.attr('opacity', 0);
		}

		// raster
		if(enableRaster == true){
			var tile = d3.geo.tile()
			.size([width, height]);
		};

		// define projection
		var projection = d3.geo.mercator()
		.scale((1 << zoomInit) / 2 / Math.PI)
		.translate([0,0]);

		// define center point on load
		var centerP = projection([center[0], center[1]]);

		// define path
		var path = d3.geo.path()
		.projection(projection);

		// create layers
		var rasterLayer = map.append("g").attr('id','raster');
		var vectorLayer = map.append("g").attr('id','vector');
		var maskLayer = map.append("g").attr('id','maskLayer');
		var customLayer = svg.append("g").attr('id','customLayer');


		// create an anchor point - fixed center
		var anchorPoint = [
		{lat: center[1], lon: center[0]},
		];

		var centerAnchor = customLayer.selectAll('#centerAnchor')
		.data(anchorPoint)
		.enter()
		.append('g')
		.attr('id', 'centerAnchor')
		.attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; })
		.style('opacity', 0);

		centerAnchor
		.append("circle")
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('r', 0)
		.attr('id', 'anchor')
		.style('fill-opacity', 0)
		.style('stroke-opacity', 0)
		.style('stroke', 'blue');

		// global variable to listen if zooming is happening - check for clicks when dragging on map
		zooming = false;

		// create zoom behavior - by default zoom on center point
		var zoom = d3.behavior.zoom()
		.scale(projection.scale() * 2 * Math.PI)
		.translate([(width/2 - centerP[0]+xOffset), (height/2 - centerP[1]+yOffset)])
		.on("zoom", function(){
			zooming = true;
			zoomed();
		})
		.on('zoomend', function(){
			setTimeout(function(){ zooming = false; }, 100);
		});

		var zs = zoom.scale();
		var t = zoom.translate();
		var c = [width / 2, height / 2];
		zoom
		.scale(zs*zoomTweak)
		.translate(
		[c[0] + (t[0] - c[0]) / zs * zs*zoomTweak,
		c[1] + (t[1] - c[1]) / zs * zs*zoomTweak
		]);

		// initiate zoom
		map.call(zoom);
		var translateInit = zoom.translate();
		var scaleInit = zoom.scale();
		zoomed();

		// create coordinates tooltip hover
		var tooltipId = svg.attr('id')+'coordinatesTooltip';

		map
		.on('mousemove', function(){
			if(coordinatesTooltip == true){
				var coords = projection.invert(d3.mouse(this));
				$('#'+tooltipId+' #lon').text(coords[0].toFixed(6));
				$('#'+tooltipId+' #lat').text(coords[1].toFixed(6));
			}
		})
		.on('dblclick', function(){
			if(coordinatesToClipboard==true){
				var coords = projection.invert(d3.mouse(this));
				var str = "{name: 'name', lat: "+coords[1].toFixed(6) + ", lon: "+ coords[0].toFixed(6) + "},";
				window.prompt("Copy to clipboard: Ctrl+C, Enter", str);
			}
		})

		// show a tooltip showing the coordinates on hover
		if(coordinatesTooltip == true){
			var div = $(map[0]).parent('svg').parent('div');
			var svg = $(map[0]).parent('svg');

			var mapClasses = svg.attr('class');

			var c = $(div).append('<div id="'+tooltipId+'" class="coordinatesTooltip '+mapClasses+'"><i class="fa fa-crosshairs"></i>&nbsp;Latitude: <span id="lat">34.123</span> | Longitude: <span id="lon">43.12</span></div>');
		}

		// zoom/translate fuction
		function zoomed(){

			projection
			.scale(zoom.scale() / 2 / Math.PI)
			.translate(zoom.translate());


			// vector polygons
			vectorLayer.selectAll('.geopoly path')
			.attr("d", path);

			// vector layer
			vectorLayer.selectAll('.vector')
			.attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; });

			// mapPie
			vectorLayer.selectAll('.mapPie')
			.attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")scale("+d.scale+")"; });

			// var translateZoom = projection([0,0]);
			// var translateNew = [translateZoom[0]-translateInit[0], translateZoom[1]-translateInit[1]];
			
			// move center reference anchor (used when importing svg layers)
			centerAnchor
			.attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; });

			if(d3.selectAll('#centerAnchor').node()){

				// make the center anchor visible for reference
				// centerAnchor.style('opacity', 1);

				// get centor anchor offset
				var centerAnchorTranslate = d3.transform(centerAnchor.attr("transform")).translate;

					// make the import anchor visible for reference
					d3.selectAll('.import').each(function(d) {

						var anchor = d3.select(this).select('#anchor');

						// anchor.style('opacity', 1);

						if(anchor.node()){

							// get import anchor bounding box
							var importAnchor = anchor.node().getBBox();

							// get x/y offset to translate the import layer
							var xOffset = centerAnchorTranslate[0] - (importAnchor.x+(importAnchor.width/2));
							var yOffset = centerAnchorTranslate[1] - (importAnchor.y+(importAnchor.height/2));

							// translate the import layer
							d3.select(this).attr('transform', 'translate('+xOffset+','+yOffset+')');
						}
					});
			};

			// symbol points
			vectorLayer.selectAll('.symbolPoint')
			.attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; });

			// text labels
			vectorLayer.selectAll('.textLabel')
			.attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; });

			vectorLayer.selectAll('.districtLabels')
			.attr("transform", function(d) { return "translate(" + projection([d.centroid_x,d.centroid_y]) + ")"; });

			// styled labels
			vectorLayer.selectAll('.styledLabel')
			.attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; });

			// arrows
			var arrowFn = d3.svg.line()
			.x(function (d) {
				e = projection([d.lon, d.lat]);
				return e[0];
			})
			.y(function (d) {
				e = projection([d.lon, d.lat]);
				return e[1];
			})
			.interpolate('basis');

			var arrows = vectorLayer.selectAll('.arrow').attr('d', arrowFn);


			// raster tiles
			if(enableRaster == true){

				var i = 1;
				var tiles = tile
				.scale(zoom.scale())
				.translate(zoom.translate())();

				var image = rasterLayer
				.attr("transform", "scale(" + tiles.scale + ")translate(" + tiles.translate + ")")
				.selectAll("image")
				.data(tiles, function(d) { return d; });

				image.exit()
				.remove();

				image.enter().append("image")
				.attr("xlink:href", function(d) { return "http://" + ["a", "b", "c", "d"][Math.random() * 4 | 0] + ".tiles.mapbox.com/v3/"+mapbox+"/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })				
				.attr("width", 1)
				.attr("height", 1)
				.style("opacity", 1)
				.attr("class", "imgtile")
				.attr("x", function(d) { return d[0]; })
				.attr("y", function(d) { return d[1]; });
			}

		} // end of zoomed() 

		// disable zoom with mouse wheel
		if(enableZoomMouseScroll == false){
			map
			.on("mousewheel.zoom", null)
			.on("dblclick.zoom", null)
			.on("DOMMouseScroll.zoom", null) // disables older versions of Firefox
			.on("wheel.zoom", null) // disables newer versions of Firefox
		}


		// disable pan
		if(enablePan == false){
			map
			.on("mousedown.zoom", null)
			.on("touchstart.zoom", null)
			.on("touchmove.zoom", null)
			.on("touchend.zoom", null);
		}


		// zoom buttons
		if(enableZoomButtons == true){


		var zoomBtnPosArr = {};

		zoomBtnPosArr['topright'] = [(width-93),0];
		zoomBtnPosArr['bottomright'] = [(width-93),(height-55)];
		zoomBtnPosArr['bottomleft'] = [0,(height-55)];
		zoomBtnPosArr['topleft'] = [0,0];

		var zoomBtnPos = zoomBtnPosArr[zoomBtnPos];

			d3.xml('./images/zoom.svg', function(error, extSvg) {

				var s = $(map[0]).parent('svg').attr('id');

				var svgNode = extSvg.getElementById('zoombtnsvg');
			    // var svgNode = extSvg.getElementsByTagName("svg")[0];

			    customLayer.node().appendChild(svgNode);

			    var importSvg = customLayer.select('#zoombtnsvg')
			    .style('opacity', 1)
			    .attr('class', 'import')
			    .attr('transform', 'translate('+zoomBtnPos[0]+','+zoomBtnPos[1]+')');

			    var opacityInit = $('#zoominbg').attr('opacity');

			    var opacityHover = 0.1;

			    $('#zoomin').css('cursor', 'pointer');
			    $('#zoomout').css('cursor', 'pointer');

			    var zoomIn = $('#zoomin').hover(function(){
			    	$('#zoominbg').attr('opacity', opacityHover);
			    },
			    function(){
			    	$('#zoominbg').attr('opacity', opacityInit);
			    });

			    var zoomOut = $('#zoomout').hover(function(){
			    	$('#zoomoutbg').attr('opacity', opacityHover);
			    }, function(){
			    	$('#zoomoutbg').attr('opacity', opacityInit);
			    });

			    if(zoomOutSteps<=0){
			    	zoomOut.select('#zoomouticon').attr('opacity', 0.3);
			    }

				zoomIn.on('click', function(){

				    if(zoom.scale()<((1 << zoomInit)*(Math.pow(zoomFactor, zoomInSteps)))){

						var scale = zoom.scale();
						var extent = zoom.scaleExtent();
						var newScale = scale * zoomFactor;
						//  if (extent[0] <= newScale && newScale <= extent[1]) {
						var t = zoom.translate();
						var c = [width / 2, height / 2];
						zoom
						.scale(newScale)
						.translate(
							[c[0] + (t[0] - c[0]) / scale * newScale,
							c[1] + (t[1] - c[1]) / scale * newScale
							]);

						zoomed();

						if(zoom.scale()<((1 << zoomInit)*(Math.pow(zoomFactor, zoomInSteps)))){
							// $('#'+div.attr('id') + ' .zoomIn').removeClass('disabled');
							// $('#'+div.attr('id') + ' .zoomOut').removeClass('disabled');
							zoomOut.select('#zoomouticon').attr('opacity', 1);
							zoomIn.select('#zoominicon').attr('opacity', 1);
						} else {
							zoomIn.select('#zoominicon').attr('opacity', 0.3);
							zoomOut.select('#zoomouticon').attr('opacity', 1);
						}
					}

			    });

				zoomOut.on('click', function(){

					if(zoom.scale()>((1 << zoomInit)/(Math.pow(zoomFactor, zoomOutSteps)))){

						var scale = zoom.scale();
						var extent = zoom.scaleExtent();
						var newScale = scale / zoomFactor;
						//  if (extent[0] <= newScale && newScale <= extent[1]) {
						var t = zoom.translate();
						var c = [width / 2, height / 2];
						zoom
						.scale(newScale)
						.translate(
							[c[0] + (t[0] - c[0]) / scale * newScale,
							c[1] + (t[1] - c[1]) / scale * newScale
							]);

						zoomed();

						if(zoom.scale()>((1 << zoomInit)/(Math.pow(zoomFactor, zoomOutSteps)))){
							zoomOut.select('#zoomouticon').attr('opacity', 1);
							zoomIn.select('#zoominicon').attr('opacity', 1);

						} else {
							zoomIn.select('#zoominicon').attr('opacity', 1);
							zoomOut.select('#zoomouticon').attr('opacity', 0.3);
						}
					}

			});


			});

		}


		map.downloader = function(){

			var s = $(map[0]).parent('svg').attr('id');

			var div = $(map[0]).parent('svg').parent('div');
			var el = document.getElementById( id );

			d3.select('#'+div.attr('id'))
			.append('a')
			.attr('href', '#')
			.text('download')
			.style({
				'position': 'absolute',
				'top': '20px',
				'left': '10px'
			})
			.attr('download', 'download.svg')
			.on('click', function(){

				// var z = zoom.translate();

				var w = svg.attr('width');
				var h = svg.attr('height');

				svg
				.attr('height', 1000)
				.attr('width', 1000);

				// zoom
				// .translate([0,0]);

				// zoomed();

				// var coordinates = [0,0]
				// map.attr("transform", "translate(" + (-coordinates[0]) + "," + (-coordinates[1]) + ")");

				var serializer = new XMLSerializer();
				var s = serializer.serializeToString(el);

				d3.select(this)
				.attr('href', 'data:Application/octet-stream;filename=download.svg,' + encodeURIComponent(s));

				// map
				// .attr('height', height)
				// .attr('width', width);

				// zoom
				// .translate(z);

				// zoomed();

				svg
				.attr('height', h)
				.attr('width', w);


			});
		}

		map.addVectorPolygon = function(options){

			var vector;

			// defaults
			var polygonClass = 'polygon',
			strokeWidth = 2,
			strokeColor = 'blue',
			strokeOpacity = 0.1,
			fill = 'cyan',
			fillOpacity = 1,
			polygonClass = 'polygonPatternFill',
			opacity = 1,
			fade = 0,
			delay = 0,
			strokeDotted = false;

			// overwrite defaults if set
			if(options.strokeWidth){strokeWidth = options.strokeWidth};
			if(options.strokeColor){strokeColor = options.strokeColor};
			if(options.strokeOpacity != undefined){strokeOpacity = options.strokeOpacity};
			if(options.strokeDotted != undefined){strokeDotted = options.strokeDotted};
			if(options.fill){fill = options.fill};
			if(options.fillOpacity != undefined){fillOpacity = options.fillOpacity};
			if(options.opacity){opacity = options.opacity};
			if(options.class){polygonClass = options.class};
			if(options.fade){fade = options.fade};
			if(options.delay){delay = options.delay};

			var data;
			if(options.source.type=='Topology'){
				// get the first object in the topojson (e.g. un_world)
				data = topojson.feature(options.source, options.source.objects[Object.keys(options.source.objects)[0]]).features;
			}

			if(options.source.hasOwnProperty('geometryType')){
				data = esriConverter().toGeoJson(options.source);
				data = data.features;
			}

			vector = vectorLayer.selectAll('.'+polygonClass)
			.data(data)
			.enter()
			.append('g')
			.attr('class', 'geopoly');

			// add frame number class if option is set
			if(options.frame != undefined){
				vector = frameHandler(options.frame, vector);
			};

			vector = vector 
			.append("path")
			.attr("class", polygonClass)
			.attr("d", path)
			.attr("id", function(d) {return d.id;})
			.style('fill', function(d){ return fill;})
			.style('fill-opacity', fillOpacity)
			.style('stroke', strokeColor)
			.style('stroke-width', strokeWidth)
			.style('stroke-opacity', strokeOpacity)
						.on("mouseover", function(d) {

			})
			.on("mouseout", function(d) {

			});

			if(strokeDotted){
				vector.style('stroke-dasharray', '2,2')
			}



			return vector;

		};

		map.addVectorPolygonPatternFill = function(options){

			// defaults
			var lineSpace = 1,
			strokeWidth = 2,
			strokeColor = 'blue',
			polygonClass = 'polygonPatternFill',
			opacity = 1,
			fade = 0,
			delay = 0;

			// overwrite defaults if set
			if(options.lineSpace){lineSpace = options.lineSpace};
			if(options.strokeWidth){strokeWidth = options.strokeWidth};
			if(options.strokeColor){strokeColor = options.strokeColor};
			if(options.opacity){opacity = options.opacity};
			if(options.class){polygonClass = options.class};
			if(options.source){source = options.source};
			if(options.fade){fade = options.fade};
			if(options.delay){delay = options.delay};

			// get the first object in the topojson (e.g. un_world)
			var data = topojson.feature(options.source, options.source.objects[Object.keys(options.source.objects)[0]]).features;

			// define the fill pattern

			patternId = patternId + 1;

			var def = map
			.append("defs")
			.append('pattern')
			.attr('id', 'pattern'+patternId)
			.attr('patternUnits', 'userSpaceOnUse')
			.attr('width', 4+lineSpace)
			.attr('height', 4+lineSpace)
			.append('path')
			.attr('d', 'M-1,1 l'+(2+lineSpace)+',-'+(2+lineSpace)+' M0,'+(4+lineSpace)+' l'+(4+lineSpace)+',-'+(4+lineSpace)+' M'+(3+lineSpace)+','+(5+lineSpace)+' l'+(2+lineSpace)+',-'+(2+lineSpace)+'')
			.style('stroke', strokeColor)
			.style('stroke-width', strokeWidth);

			var vector = vectorLayer.selectAll('.'+polygonClass)
			.data(data)
			.enter()
			.append('g')
			.attr('class', 'geopoly')
			.style('opacity', 1);

			var vectorShape = vector
			.append("path")
			.attr("class", polygonClass)
			.attr("d", path)
			.attr("id", function(d) {return d.id;})
			.style('fill', "url(#pattern"+patternId+")")
			.style('opacity', 0)
			// .style('fill-opacity', 0.4)
			// .style('stroke', '#bdbfbe')
			// .style('stroke-width', 1)
			.on("mouseover", function(d) {

			})
			.on("mouseout", function(d) {

			});

			vectorShape
			.transition()
			.delay(delay)
			.duration(fade)
			.style('opacity', opacity);	

			// add frame number class if option is set
			if(options.frame != undefined){
				vector = frameHandler(options.frame, vector);
			};

			return vector;

		};

		map.addVectorPoints = function(options){

			var vector;

			var data = options.source;

			var max = d3.max(data, function(d) { return +d.idps; });

			var radiusScale = d3.scale.sqrt()
			.domain([0, max])
			.range([0, 40]);  

			var fontNameScale = d3.scale.sqrt()
			.domain([0, max])
			.range([0.6, 0.75]);  

			var fontScale = d3.scale.sqrt()
			.domain([0, max])
			.range([0.7, 1.6]);  

			vectorGroup = vectorLayer.selectAll('.'+options.class)
			.data(data)
			.enter()
			.append('g')
			.attr('class', 'vector')
			.style('opacity', 1)
			.attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; });

			var vector = vectorGroup
			.append("circle")
			.attr("class", options.class)
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", "2px")
			.style('stroke', 'black')
			.style('stroke-width', 1)
			.style("fill", 'red');

			var textName = vectorGroup
			.append('text')
			.attr('y', -5)		
			.style('text-anchor', 'middle')
			.style('fill', '#575757')
			.style('opacity', 0)
			.style('font-family', "'Open Sans', sans-serif")
			.style('font-size', function(d){ return fontNameScale(d.idps).toFixed(2)+'em'; })
			.style('font-weight', 'normal')
			.text(function(d){return d.name;})
			.transition()
			.duration(2500)
			.delay(1000)
			.style('opacity', 1);


			var textFigure = vectorGroup
			.append('text')
			.style('text-anchor', 'middle')
			.style('fill', '#0a4623')
			.style('fill-opacity', 0)
			.style('font-family', "'Open Sans', sans-serif")
			.style('font-size', function(d){ return fontScale(d.idps).toFixed(2)+'em'; })
			.style('font-weight', 'bold')
			.text(function(d){return addCommas(d.idps);})
			.attr('y', function(){
				var bbox = d3.select(this).node().getBBox();
				return bbox.height/2;
			})
			.transition()
			.duration(2500)
			.delay(1000)
			.style('fill-opacity', 0.7);

			// vizlib.map.zoomed();				

			if(options.frame != undefined){
				vectorGroup = frameHandler(options.frame, vectorGroup);
			};

			return vectorGroup;

		};

		map.addEarthquake = function(options){

			var vector;
			var color = 'darkred';

			var data = options.source.features;
			var size = options.size;
			var max = 9;
			var opacity = 0.3;

			data.sort(function(a,b) { return +b.properties.mag - +a.properties.mag; })

			var max = d3.max(data, function(d) { return d.properties.mag; });
			var min = d3.min(data, function(d) { return d.properties.mag; });

			var radiusScale = d3.scale.linear()
			.domain([min, max])
			.range([0, 30]);  

			var opacityScale = d3.scale.sqrt()
			.domain([min, max])
			.range([0.1, 0.5]); 

			var strokeScale = d3.scale.linear()
			.domain([min, max])
			.range([0.1, 2]);  

			var fontNameScale = d3.scale.sqrt()
			.domain([min, max])
			.range([0.6, 0.85]);  

			var fontScale = d3.scale.linear()
			.domain([min, max])
			.range([0, 2.5]);  

			vectorGroup = vectorLayer.selectAll('.'+options.class)
			.data(data)
			.enter()
			.append('g')
			.attr('class', 'vector')
			.attr("transform", function(d) { return "translate(" + projection([d.geometry.coordinates[0],d.geometry.coordinates[1]]) + ")"; })
			.on('mousemove', function(d,i){

				var t = d3.transform(d3.select(this).attr("transform")),
			    xt = t.translate[0],
			    yt = t.translate[1];

				coordinates = d3.mouse(this);
				var x = coordinates[0]+xt;
				var y = coordinates[1]+yt;

				d3.select('#dM2')
				.attr('transform', 'translate('+(x+13)+','+(y+5)+')');


			})
			.on('mouseout', function(d,i){
				d3.select('#dM2')
				.attr('transform', 'translate(-100,-100)');

			})


			vectorGroup
			.append("circle")
			.attr("class", options.class)
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", function(d){ return radiusScale(d.properties.mag)})
			.style('fill-opacity', function(d){
				return opacityScale(d.properties.mag);
			})
			.style('stroke-opacity', function(d){
				return opacityScale(d.properties.mag);
			})
			.attr('id', function(d){
				return 'map'+d.id;
			})
			.attr('class', 'mapbubble')
			.style('stroke', '#570809')
			.style('stroke-width', function(d){
				return strokeScale(d.properties.mag);
			})
			.style("fill", color)
			.on('mouseover', function(d,i){

				var dt = new Date(d.properties.time);
				var t = dt.toTimeString().substring(0, 5);
				var dt = dt.getDate() + ' ' + monthNames[dt.getMonth()] + ' ' + dt.getFullYear() + ' - ' + t;

				d3.select('.mTitle').text('M'+d.properties.mag);
				d3.select('.mSubTitle1').text(dt);
				d3.select('#dM2').style('opacity', 1);

				d3.select(this)
				.style('stroke-opacity', 1);

				var thisid = d.id;
				var mapbubbles = d3.selectAll('.chartbubble')
				.style('opacity', function(d){
					if(d.id == thisid){
						return 1
					} else {
						return 0.2
					}
				})
				.style('stroke-opacity', function(d){
					if(d.id == thisid){
						return 1
					} else {
						return 0.2
					}
				});
		})
		.on('mouseout', function(d,i){

			d3.select('#dM2').style('opacity', 0);
			var mapbubbles = d3.selectAll('.chartbubble')
			.style('opacity',1)
			.style('stroke-opacity', function(d){
				return opacityScale(d.properties.mag);
			})

			d3.select(this)
			.style('stroke-opacity', function(d){
				return opacityScale(d.properties.mag);
			})

		})


			if(options.frame != undefined){
				vectorGroup = frameHandler(options.frame, vectorGroup);
			};

			return vectorGroup;

		};

		map.addProportionalCircles = function(options){

			options = parseOptions(defaultOptions.map.addProportionalCircles, options);

			var vector;
			var data = options.source;
			var max = d3.max(data, function(d) { return +d[options.dataVariable]; });

			var radiusScale = d3.scale.sqrt()
			.domain([0, max])
			.range([0, options.maxRadius]);  

			var fontNameScale = d3.scale.sqrt()
			.domain([0, max])
			.range([1, 1.1]);  

			var fontScale = d3.scale.sqrt()
			.domain([0, max])
			.range([1.2, 1.6]);  

			vectorGroup = vectorLayer.selectAll('.'+options.class)
			.data(data)
			.enter()
			.append('g')
			.classed({
				'vector': true
			})
			.style('opacity', options.opacity)
			.attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; });

			var vector = vectorGroup
			.append("circle")
			.attr("class", options.class)
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", 0)
			.style('stroke', options.color)
			.style('stroke-width', options.strokeWidth)
			.style('stroke-opacity', 1)
			.style("fill", options.color)
			.style("fill-opacity", 0.5)
			.style('opacity', 0);

			vector.transition().duration(options.fade).delay(options.delay/2)
			.attr('r', function(d,i){ return radiusScale(d[options.dataVariable]);})
			.style('opacity', options.circleOpacity);

			if(options.showTextLabel == true){

				var textName = vectorGroup
				.append('text')
				.attr('class', 'textName')		
				.attr('y', -5)		
				.style('text-anchor', 'middle')
				.style('fill', '#000')
				.style('opacity', 0)
				.style('font-family', "'Open Sans', sans-serif")
				.style('font-size', function(d){ return fontNameScale(d[options.dataVariable]).toFixed(2)+'em'; })
				.style('font-weight', 'normal')
				.text(function(d){ 
					if(options.labelCaps==true){ 
						return d[options.textVariable].toUpperCase();
					} else {
						return d[options.textVariable];
					}  

				})
				.transition()
				.duration(options.fade)
				.delay(options.delay)
				.style('opacity', 1);


				var textFigure = vectorGroup
				.append('text')
				.attr('class', 'textFigure')		
				.style('text-anchor', 'middle')
				.style('fill', '#17395E')
				.style('fill-opacity', 0)
				.style('font-family', "'Open Sans', sans-serif")
				.style('font-size', function(d){ return fontScale(d[options.dataVariable]).toFixed(2)+'em'; })
				.style('font-weight', 'bold')
				.text(function(d){return addCommas(d[options.dataVariable]);})
				.attr('y', function(){
					var bbox = d3.select(this).node().getBBox();
					return bbox.height/2+2;
				})
				.transition()
				.duration(options.fade)
				.delay(options.delay)
				.style('fill-opacity', 1);
			}

			// vizlib.map.zoomed();				

			vectorGroup.update = function(updateOptions){
				var dataVariable = updateOptions.dataVariable;
				var duration = updateOptions.duration;
				var color = updateOptions.color;

				this.selectAll('circle')
				.transition()
				.duration(duration)
				.style('fill', color)
				.style('stroke', color)
				.attr('r', function(d,i){ return radiusScale(d[dataVariable]);});

				this.selectAll('.textName')
				.transition()
				.duration(duration)
				.style('font-size', function(d){ return fontNameScale(d[dataVariable]).toFixed(2)+'em'; })
				.text(function(d){ return d[textVariable];});


				this.selectAll('.textFigure')
				.transition()
				.duration(duration)
				.style('fill', color)
				.style('font-size', function(d){ return fontScale(d[dataVariable]).toFixed(2)+'em'; })
				.attr('y', function(d){
					return fontScale(d[dataVariable])*6+3;
				})
				.tween("text", function(d) {
					var i = d3.interpolate(this.textContent.replace(/\,/g,''), d[dataVariable]),
					prec = (d[dataVariable] + "").split("."),
					round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

					return function(t) {
						this.textContent = addCommas(Math.round(i(t) * round) / round);
					};
				});
			};

			if(options.frame != undefined){
				vectorGroup = frameHandler(options.frame, vectorGroup);
			};

			return vectorGroup;

		};

		map.addSymbolPoints = function(options){

			// defaults
			var fontSize = 12,
			fontWeight = 'normal',
			fontColor = '#000',
			fontFamily = "'Open Sans', sans-serif",
			fontStyle = 'normal',
			opacity = 1,
			symbolClass = 'symbol',
			width = 12,
			height = 12,
			icon = './images/mapicons/Admin1Capital.svg',
			xOffset = 0,
			yOffset = 0,
			source = [{name: 'Zero1', lat: 2, lon: 0}],
			fade = 0,
			delay = 0,
			frame = 0,
			orientation = 'right';

			// options which can't be overwritten by the template (still defind as options)
			if(options.frame != undefined){var frame = options.frame};
			if(options.source){source = options.source};
			if(options.fade){fade = options.fade};
			if(options.delay){delay = options.delay};
			if(options.class){symbolClass = options.class};
			if(options.orientation){orientation = options.orientation};

			if(options.hasOwnProperty('template')) {
				options = symbolTemplate[options.template];
			};

			// overwrite defaults if set
			if(options.fontSize){fontSize = options.fontSize};
			if(options.fontWeight){fontWeight = options.fontWeight};
			if(options.fontFamily){fontFamily = options.fontFamily};
			if(options.fontStyle){fontStyle = options.fontStyle};
			if(options.icon){icon = options.icon};
			if(options.opacity){opacity = options.opacity};
			if(options.fontColor){fontColor = options.fontColor};
			if(options.textAnchor){textAnchor = options.textAnchor};
			if(options.width){width = options.width};
			if(options.height){height = options.height};
			if(options.xOffset){xOffset = options.xOffset};
			if(options.yOffset){yOffset = options.yOffset};
			

			var vector = vectorLayer;

			var svg = vectorLayer;		

			var symbol = svg.selectAll('.symbolPoint .'+symbolClass)
			.data(source)
			.enter()
			.append('g')
			.style('opacity',1)
			.attr('class','symbolPoint '+symbolClass)
			.attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; });

			var text = symbol.append('text')
			.text(function(d){return d.name;})
			.style('font-family', fontFamily)
			.style('font-style', fontStyle)
			.style('fill', fontColor)
			.style('font-size', fontSize)
			.style('font-weight', fontWeight)
			.attr('y', 4);

			if(orientation == 'right'){
				text
				.attr('x', 8)
			};

			if(orientation == 'left'){
				text
				.attr('x', function(){
					return -this.getBBox().width-7;
				});
			}

			symbol
			.append("svg:image")
			.attr("xlink:href", icon)
			.attr("width", width)
			.attr("height", height)
			.attr("x", -(height/2)-xOffset)
			.attr("y", -(width/2)-yOffset)
			.append('text')
			.text(function(d){return d.name;});

			symbol
			.transition()
			.delay(delay)
			.duration(fade)
			.style('opacity', opacity);	

			// add frame number class if option is set
			if(frame != 0){
				symbol = frameHandler(frame, symbol);
			};	

			return symbol;

		};

		map.addPies = function(options){

			customLayer.append('canvas')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', 300)
			.attr('height', 500)
			.style('background-color', 'green');

			options = parseOptions(defaultOptions.map.addPies, options);
	        var svg = vectorLayer;	

	        var pie = d3.layout.pie();
	        pie.sort(null);
	        var arc = d3.svg.arc().innerRadius(20);

			var radiusScale = d3.scale.sqrt()
			.domain([0, options.max])
			.range([0, 1]);  

	        var pies_container = svg.append("g").attr("id", "pies_container");

	        var pieGroups = pies_container.selectAll(".pies")
                .data(options.data)
                .enter()
                .append("g")
    			.classed({
					'mapPie': true
				})
                // .attr("class", function (d, i) {
                //     return "CountryId" + d.CountryId;
                // })
				.attr('opacity',options.opacity)
                .attr("transform", function (d) {
                	d.scale = radiusScale(d.values.total);
                    return "translate(" + projection([d.lon, d.lat]) + ")scale("+radiusScale(d.values.total)+")";
                }).on('mouseover', options.mouseover)
                .on('mouseout', options.mouseout)
                .on('click', options.click);

                pieGroups
                .append("circle")
                .attr('fill', 'none')
                .attr('class', 'pieborder')
                .attr('stroke', '#FFF')
                .attr('stroke-width', 5)
                .attr('r', options.maxRadius)
                .on("mouseover", function (d) {
                    // $('#pointer #name').text(this.parentNode.__data__.CountryName);

                    // d3.select('#' + this.parentNode.__data__.CountryCode)
                    //         .style('fill', function (d, i) {
                    //             return countryfill_hover;
                    //         })
                })
                .on("mouseout", function (d) {
                    // d3.select('#' + this.parentNode.__data__.CountryCode)
                    //         .style('fill', function (d, i) {
                    //             $('#tooltip .figure').html('&nbsp;')
                    //             $('#pointer #name').html('&nbsp;');

                    //             return countryfill;
                    //         })
                });



    		var arc = d3.svg.arc()
			.outerRadius(options.maxRadius)
			.innerRadius(0);

			var pie = d3.layout.pie()
			.sort(null)
			.value(function(d) { return d; });

			// create groups for each slice
			var slices = pieGroups.selectAll(".arc")
			.data(function(d,i){
				var dpie = d.values.piedata;
				return pie(dpie);
			})
			.enter()
			.append("g")
			.attr("class", "arc")
			.append("path")
			.attr("d", arc)
			// .attr('transform',function(){var tx = options.radius, ty = options.radius+header.yOffset; return 'translate('+tx+','+ty+')'})
			.style('stroke', '#FFF')
			.style('stroke-width', 1)
			.style('stroke-opacity', 0)
			.style("fill", function(d, i) { return options.color[i]; })
			.each(function(d) { this._current = d; }); // store the initial values


		    //     var pieChart = pieGroups.selectAll("path")
	     //            .data(function(d,i){ return d.values.piedata;})
	     //            .enter().append("path")
	     //            // .filter(function (d, i) {
	     //            //     init = 'done';
	     //            //     return d.value > threshold
	     //            // })
	     //            .attr("class", function (d, i) {
	     //                return "pie index" + i
	     //            })
	     //            .attr("d", function(d){

	     // //            	var rS = d3.select(this.parentNode).datum();
	     //            	return d3.svg.arc()
	     //                    .innerRadius(0)
	     //                    .outerRadius(radiusScale(1000000))

	     //            })


	     //            .attr("fill", function (d, i) {
	     //                return color[this.parentNode.__data__.colorindex[i]];
	     //            })
	     //            .each(function (d) {
	     //                this._current = d;
	     //            })
	     //            .on("mouseover", function (d) {
	     //                // $('#pointer #name').text(this.parentNode.__data__.CountryName);
	     //                // d3.select('#' + this.parentNode.__data__.CountryCode)
	     //                //         .style('fill', function (d, i) {
	     //                //             return countryfill_hover;
	     //                //         })
	     //            })
	     //            .on("mouseout", function (d) {
	     //                // d3.select('#' + this.parentNode.__data__.CountryCode)
	     //                //         .style('fill', function (d, i) {
	     //                //             $('#tooltip .figure').html('&nbsp;');
	     //                //             $('#pointer #name').html('&nbsp;');

	     //                //             return countryfill;
	     //                //         })
	     //            })

        // function to remove from array by value

        	pieGroups.update = function(updateOptions){

	    		var arc = d3.svg.arc()
				.outerRadius(options.maxRadius)
				.innerRadius(0);

        		var pObj = this.data(updateOptions.data)
        		.attr("transform", function (d) {
        			d.scale = radiusScale(d.values.total);
                    return "translate(" + projection([d.lon, d.lat]) + ")scale("+radiusScale(d.values.total)+")";
                });

        		pObj.selectAll("path")
				.data(function(d,i){
					var dpie = d.values.piedata;
					return pie(dpie);
				})
				.attr("d", arc)
				.exit()
				.remove();


        	}

        	return pieGroups;

		};

		map.addStyledLabels = function(options){

			// defaults
			var color = '#000',
			opacity = 1,
			labelClass = 'styledLabel1',
			size = 25,
			labelSource = './images/labels/label1.svg',
			xOffset = 0,
			yOffset = 0,
			source = [{name: 'Zero1', lat: 2, lon: 0}],
			fade = 0,
			delay = 0;

			// overwrite defaults if set
			if(options.source){source = options.source};
			if(options.fade){fade = options.fade};
			if(options.delay){delay = options.delay};
			if(options.class){symbolClass = options.class};
			if(options.fontStyle){fontStyle = options.fontStyle};
			if(options.labelSource){labelSource = options.labelSource};
			if(options.opacity){opacity = options.opacity};
			if(options.color){color = options.color};
			if(options.textAnchor){textAnchor = options.textAnchor};
			if(options.size){size = options.size};
			if(options.xOffset){xOffset = options.xOffset};
			if(options.yOffset){yOffset = options.yOffset};

			var vector = vectorLayer;
			var styledLabel;
			//Import the SVG

			d3.xml(labelSource, "image/svg+xml", function(xml) {
				var importedNode = document.importNode(xml.documentElement, true);

				styledLabel = map.selectAll(".styledLabel")
				.data(source)
				.enter()
				.append("g")
				.style('opacity',1)
			    // .attr('width', width)
			    // .attr('height', 3)
			    .attr('class','styledLabel '+labelClass)
			    .attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; })
			    .each(function(d, i){ 

			    	var labelText = d.name;
			    	var label = this.appendChild(importedNode.cloneNode(true)); 
			    	var label = d3.select(label);

			    	var text = label
			    	.attr('height', size)
			    	.select('text');

			    	var wt = 0;
			        // set the text 
			        var textSpan = text
			        .select('tspan')
			        .text(labelText);

			        var t = d3.select('body')
			        .append('svg');

			        var tt = t
			        .append('text')
			        .text(labelText)
			        .style('font-size', function(){
			        	return text.style('font-size');
			        });

			        var bbox = t.node().getBBox();

			        t.remove();
			        tt.remove();

			        // adjust width to fit text
			        label
			        .style('opacity', 0)
			        .select('rect')
			        .attr('width', (parseInt(bbox.width)+27))
			        .style('fill', color);

			        label
			        .select('path')
			        .style('fill', color);

			        label
			        .attr('width', (parseInt(bbox.width)+66));

			        label
			        .attr('preserveAspectRatio', 'xMinYMin')
			        .attr('y', -(size/2))

			        label
			        .transition()
			        .delay(delay)
			        .duration(fade)
			        .style('opacity', opacity);	

			    }); 

				if(options.frame != undefined){
					styledLabel = frameHandler(options.frame, styledLabel);
				};

				initFrame();
			});
		};

		map.addCustomLabels = function(data){

			var textLabels = vectorLayer.selectAll('.labelPoint .districtLabels')
			.data(data.filter(function(d){ return d.key !== 'undefined'}))
			.enter()
			.append('g')
			.style('opacity',0.8)
			.attr('class','districtLabels frame frame1')
			.attr("transform", function(d) { return "translate(" + projection([d.centroid_x,d.centroid_y]) + ")"; });

			textLabels.append('text')
			.text(function(d){return d.name;})
			.attr('x', 0)
			.attr('y', -1)
			.style('font-family', "'Open Sans', sans-serif")
			.style('font-size', 8)
			.style('font-weight', 'bold')
			.style('font-style', 'normal')
			.style('fill', '#000')
			.style('fill-opacity', 0.8)
			.style('text-anchor', 'middle')
			.style('letter-spacing', 0.6)
			.style('paint-order', 'stroke')
			.style('stroke-linecap', 'butt')
			.style('stroke-linejoin', 'miter')
			.style('stroke', '#fff')
			.style('stroke-opacity', 0.5)
			.style('stroke-width', 1);

			textLabels.append('text')
			.text(function(d){return addCommas(d.values.total);})
			.attr('x', 0)
			.attr('y', 11)
			.style('font-family', "'Open Sans', sans-serif")
			.style('font-size', 11)
			.style('font-weight', 'bold')
			.style('font-style', 'normal')
			.style('fill', '#003857')
			.style('text-anchor', 'middle')
			.style('letter-spacing', 0.6)
			.style('paint-order', 'stroke')
			.style('stroke-linecap', 'butt')
			.style('stroke-linejoin', 'miter')
			.style('stroke', '#fff')
			.style('stroke-opacity', 0.5)
			.style('stroke-width', 1);


		};

		map.addTextLabels = function(options){

			// defaults
			var fontSize = 12,
			fontWeight = 'normal',
			fontColor = '#000',
			fontFamily = "'Open Sans', sans-serif",
			fontStyle = 'normal',
			opacity = 1,
			textAnchor = 'middle',
			labelClass = 'label',
			xOffset = 8,
			yOffset = 4,
			source = [{name: 'Zero', lat: 0, lon: 0}],
			fade = 0,
			delay = 0;

			// overwrite defaults if set
			if(options.fontSize){fontSize = options.fontSize};
			if(options.fontWeight){fontWeight = options.fontWeight};
			if(options.fontFamily){fontFamily = options.fontFamily};
			if(options.fontStyle){fontStyle = options.fontStyle};
			if(options.opacity){opacity = options.opacity};
			if(options.fontColor){fontColor = options.fontColor};
			if(options.textAnchor){textAnchor = options.textAnchor};
			if(options.class){labelClass = options.class};
			if(options.xOffset){xOffset = options.xOffset};
			if(options.yOffset){yOffset = options.yOffset};
			if(options.source){source = options.source};
			if(options.fade){fade = options.fade};
			if(options.delay){delay = options.delay};

			var vector = vectorLayer;

			var svg = vectorLayer;		
			
			var textLabels = svg.selectAll('.labelPoint .'+labelClass)
			.data(source)
			.enter()
			.append('g')
			.style('opacity',1)
			.attr('class','textLabel '+ labelClass)
			.attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; });

			textLabels.append('text')
			.text(function(d){return d.name;})
			.attr('x', xOffset)
			.attr('y', yOffset)
			.style('font-family', fontFamily)
			.style('font-size', fontSize)
			.style('font-weight', fontWeight)
			.style('font-style', fontStyle)
			.style('fill', fontColor)
			.style('text-anchor', textAnchor)
			.style('letter-spacing', 0.6);

			textLabels
			.transition()
			.delay(delay)
			.duration(fade)
			.style('opacity', opacity);		

			// add frame number class if option is set
			if(options.frame != undefined){
				textLabels = frameHandler(options.frame, textLabels);
			};

			return textLabels;

		};

		map.zoomToBounds = function(bounds){

			dx = bounds[1][0] - bounds[0][0],
			dy = bounds[1][1] - bounds[0][1],
			x = (bounds[0][0] + bounds[1][0]) / 2,
			y = (bounds[0][1] + bounds[1][1]) / 2,
			scale = .9 / Math.max(dx / width, dy / height),
			translate = [width / 2 - scale * x, height / 2 - scale * y];

			zoomed();

			// not working - translate and transform??

		};

		map.addMask = function(options){

			var maskPath = [
			{name: 'name', lat: 3.024, lon: 3.022},
			{name: 'name', lat: 5.916, lon: 1.505},
			{name: 'name', lat: 10.006, lon: 1.132},
			{name: 'name', lat: 15.532, lon: 2.890},
			{name: 'name', lat: 16.714, lon: 6.493},
			{name: 'name', lat: 16.187, lon: 16.161},
			{name: 'name', lat: 2.673, lon: 14.733},
			{name: 'name', lat: 1.773, lon: 8.207},
			];

			// defaults
			var outline = false;
			var maskClass = 'mask';

			// overwrite defaults if set
			if(options.outline){outline = options.outline};
			if(options.class){maskClass = options.class};
			if(options.path){maskPath = options.path};

			var lineFn = d3.svg.line()
			.x(function (d) {
				e = projection([d.lon, d.lat]);
				return e[0];
			})
			.y(function (d) {
				e = projection([d.lon, d.lat]);
				return e[1];
			})
			.interpolate('cardinal-closed');

			var svgFiltersTmp = $('body').append('<span id="svgFiltersTmp"></span>');

			$('#svgFiltersTmp').load('./images/filters.svg', null, function() { 
				
				var svgFilters = $('#svgFiltersTmp svg defs');
				
				$(svg).append(svgFilters);

				var maskOutline = maskLayer
				.append('g')
				.attr('class', maskClass)
				.attr('fill-rule', 'evenodd')
				.attr('x', 0)
				.attr('y', 0)
				.attr('transform', function(d){
		        	// ENLARGE THE MASK AROUND THE CENTER
					// return 'scale(1.3), translate(-100,-50)';
				});

				var maskOutline = maskOutline
				.selectAll('#maskOutline')
				.data([maskPath])
				.enter()
				.append('path')
				.attr('id', 'maskOutline')
				.attr('d', function(d){return lineFn(d);})
				.style("stroke", 'black')
				.style('fill-opacity', 0)
				.style('fill', 'white')

				if(outline==false){
					maskOutline
					.style('fill-opacity', 1)
					.style('stroke', '#FFF')
					.style('filter','url(#blur111)');
				};

				var p = maskOutline.attr('d');

				p = "M-500,-500 L2000,0 L2000,2000 L0,2000 L-500,-500 Z " + p + " Z ";
				maskOutline.attr('d', p);

				// add frame number class if option is set
				if(options.frame != undefined){
					maskOutline = frameHandler(options.frame, maskOutline);
				};

			});
		};


		map.addLine = function(points){

			var arrow = vectorLayer.append("path")
			.datum({type: "LineString", coordinates: [points[0], points[1]]})
			.attr("class", "route")
			.attr("d", path)
			.style('stroke', 'red')
			.style('stroke-width', 2);

			return arrow;

		}


		map.addArrow = function(options){

			// defaults
			var color = '#FFF',
			strokeWidth = 2,
			source = [
			{"lat": 44.42, "lon": 33.32},
			{"lat": 43, "lon": 29},
			{"lat": 43, "lon": 28}
			],
			opacity = 1,
			fade = 0,
			delay = 0;

			// overwrite defaults if set
			if(options.color){color = options.color};
			if(options.strokeWidth){strokeWidth = options.strokeWidth};
			if(options.source){source = options.source};
			if(options.opacity){opacity = options.opacity};
			if(options.fade){fade = options.fade};
			if(options.delay){delay = options.delay};

			arrow = arrow + 1;

			map.append("defs").append("marker")
			.attr("id", "arrowhead"+arrow)
			.attr("refX", 1) /*must be smarter way to calculate shift*/
			.attr("refY", 2)
			.attr("markerWidth", strokeWidth*3)
			.attr("markerHeight", strokeWidth*2)
			.attr("orient", "auto")
			.append("path")
	        .attr("d", "M 0,0 V 4 L6,2 Z") //this is actual shape for arrowhead
	        .style('fill', color);


	        var lineFn = d3.svg.line()
	        .x(function (d) {
	        	e = projection([d.lon, d.lat]);
	        	return e[0];
	        })
	        .y(function (d) {
	        	e = projection([d.lon, d.lat]);
	        	return e[1];
	        })
	        .interpolate('basis');

	        var line = vectorLayer.selectAll('.path').data([source]);
	        line.enter().append('path')
	        line.attr('class', 'arrow')
	        .attr('d', function(d){return lineFn(d);})
	        .style("stroke", color)
	        .style("stroke-width", strokeWidth)
	        .style('opacity', 0)
	        .style('fill', 'none')
	        .attr("marker-end", "url(#arrowhead"+arrow+")")
	        .style('stroke-linecap', 'round');

	        line
	        .transition()
	        .delay(delay)
	        .duration(fade)
	        .style('opacity', opacity);	

	        // add frame number class if option is set
	        if(options.frame != undefined){
	        	line = frameHandler(options.frame, line);
	        };

	        return line;

	    }

	    map.svgImport = function(options){

			// defaults
			var source = './images/MyLayer.svg',
			layerId = 'MyLayer',
			opacity = 1,
			fade = 0,
			delay = 0;

			// overwrite defaults if set
			if(options.source){source = options.source};
			if(options.layerId){layerId = options.layerId};
			if(options.opacity){opacity = options.opacity};
			if(options.fade){fade = options.fade};
			if(options.delay){delay = options.delay};


			d3.xml(source, function(error, extSvg) {

				var s = $(map[0]).parent('svg').attr('id');

				var svgNode = extSvg.getElementById(layerId);
			    // var svgNode = extSvg.getElementsByTagName("svg")[0];

			    vectorLayer.node().appendChild(svgNode);

			    var importSvg = d3.select('#'+layerId)
			    .style('opacity', 0)
			    .attr('class', 'import');


				if(d3.selectAll('#centerAnchor').node()){

					// make the center anchor visible for reference
					// centerAnchor.style('opacity', 0.1);

					// get centor anchor offset
					var centerAnchorTranslate = d3.transform(centerAnchor.attr("transform")).translate;

					// make the import anchor visible for reference
					d3.selectAll('.import').each(function(d) {

						var anchor = d3.select(this).select('#anchor');

						// anchor.style('opacity', 1);

						if(anchor.node()){

							// get import anchor bounding box
							var importAnchor = anchor.node().getBBox();

							// get x/y offset to translate the import layer
							var xOffset = centerAnchorTranslate[0] - (importAnchor.x+(importAnchor.width/2));
							var yOffset = centerAnchorTranslate[1] - (importAnchor.y+(importAnchor.height/2));

							// translate the import layer
							d3.select(this).attr('transform', 'translate('+xOffset+','+yOffset+')');
						}
					});
					

				};

				d3.selectAll('#anchor').style('stroke-opacity', 0);

			
			    // add frame number classes if option is set
			    if(options.frame != undefined){
			    	importSvg = frameHandler(options.frame, importSvg);
			    };

			    importSvg.transition().delay(delay).duration(fade)
			    .style('opacity', opacity);

			    initFrame();

			    // d3.selectAll('#centerAnchor').remove();
			    // d3.selectAll('#anchor').remove();

			});

		}

		map.hexbin = function(options){

			// defaults
			var source = './images/MyLayer.svg',
			layerId = 'hex',
			opacity = 1,
			meshStrokeOpacity = 0.5,
			meshStrokeColor = '#bbbbbb',
			hexStrokeOpacity = 0.5,
			hexStrokeColor = 'red',
			fade = 0,
			delay = 0,
			radius = 15,
			colorRange = ['#F0B800', '#DD0000'],
			max = 'auto';

			// overwrite defaults if set
			if(options.source){source = options.source};
			if(options.layerId){layerId = options.layerId};
			if(options.opacity != undefined){opacity = options.opacity};
			if(options.hexStrokeOpacity != undefined){hexStrokeOpacity = options.hexStrokeOpacity};
			if(options.meshStrokeOpacity != undefined){meshStrokeOpacity = options.meshStrokeOpacity};
			if(options.meshStrokeColor){meshStrokeColor = options.meshStrokeColor};
			if(options.hexStrokeColor){hexStrokeColor = options.hexStrokeColor};
			if(options.fade){fade = options.fade};
			if(options.radius){radius = options.radius};
			if(options.delay){delay = options.delay};
			if(options.colorRange){colorRange = options.colorRange};
			if(options.max){max = options.max};


				var hexbin = d3.hexbin()
				.size([width, height])
				.radius(radius)
				.x(function(d) {return projection([d.lon, d.lat])[0];})
				.y(function(d) {return projection([d.lon, d.lat])[1];});

				var mesh = vectorLayer.append("g")
				.attr('id', layerId+'_mesh')
				.attr("d", path)
				;

				mesh.append("clipPath")
				.attr("id", "clip")
				.append("rect")
				.attr("d", path)
				.attr("class", layerId+"_mesh")
				.attr("width", width)
				.attr("height", height)

				mesh.append("svg:path")
				.attr("clip-path", "url(#clip)")
				.attr("d",hexbin.mesh())
				.style("stroke-width", .5)
				.style("stroke", meshStrokeColor)
				.style("stroke-opacity", meshStrokeOpacity)
				.style("fill", "none");


				// hex the data
			    var hexData = hexbin(source); 


				// color hexagons
				var hex = vectorLayer.append("g")
			    .attr("d", path)
			    .attr('id',layerId);

			    var hexMax = 0; 

				if(max != 'auto'){hexMax = options.max} else {
					$(hexData).each(function(){
				        if(this.length>hexMax){hexMax = this.length;};
				    });	
				};

			    d3.select('#maxIntensity')
			        .text(hexMax);

			    var opac = d3.scale.sqrt()
			        .domain([1, hexMax])
			        .range([0.2, 1]);

    			var hexColor = d3.scale.linear()
					.domain([1, hexMax])
					.range([colorRange[0], colorRange[1]])
					.interpolate(d3.interpolateLab);

			    var hexagons = hex.selectAll(".hexagon")
			    .data(hexData)
			    .enter()
			    .append("path")
			    .attr("class", "hexagon")
			    .attr("d", function(d){return hexbin.hexagon();})
			    .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; })
			        //.style("fill", "#0000FF")
			        .style("fill", function(d) { return hexColor(d.length); })
			        .style("fill-opacity", function(d) { return opac(d.length); })
			        .style("stroke-width", .5)
			        .style("stroke", hexStrokeColor)
			        .style("stroke-opacity", hexStrokeOpacity);

				// zoomed();

				// add frame number classes if option is set
			    if(options.frame != undefined){
			    	hex = frameHandler(options.frame, hex);
			    	mesh = frameHandler(options.frame, mesh);

			    };

				var zoomHex = function(){
					mesh.remove();
					d3.selectAll('#'+layerId).remove();

					mesh = vectorLayer.append("g")
					.attr('id',layerId+'_mesh')
					.attr("d", path)
					;

					mesh.append("clipPath")
					.attr("id", "clip")
					.append("rect")
					.attr("d", path)
					.attr("class", layerId+"_mesh")
					.attr("width", width)
					.attr("height", height)

					mesh.append("svg:path")
					.attr("clip-path", "url(#clip)")
					.attr("d",hexbin.mesh())
					.style("stroke-width", .5)
					.style("stroke", meshStrokeColor)
					.style("stroke-opacity", meshStrokeOpacity)
					.style("fill", "none");


					// hex the data
				    hexData = hexbin(source); 

					// color hexagons
					hex = vectorLayer.append("g")
				    .attr("d", path)
				    .attr('id',layerId);

					hexData = hexbin(source); 

					hexMax = 0; 

					if(max != 'auto'){hexMax = options.max} else {
						$(hexData).each(function(){
					        if(this.length>hexMax){hexMax = this.length;};
					    });	
					};

					hexColor = d3.scale.linear()
					.domain([1, hexMax])
					.range([colorRange[0], colorRange[1]])
					.interpolate(d3.interpolateLab);

					hexagons = hex.selectAll(".hexagon")
				    .data(hexData)
				    .enter()
				    .append("path")
				    .attr("class", "hexagon")
				    .attr("d", function(d){return hexbin.hexagon();})
				    .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; })
				        //.style("fill", "#0000FF")
				        .style("fill", function(d) { return hexColor(d.length); })
				        .style("fill-opacity", function(d) { return opac(d.length); })
				        .style("stroke-width", .5)
				        .style("stroke", hexStrokeColor)
				        .style("stroke-opacity", hexStrokeOpacity);

			    if(options.frame != undefined){
			    	hex = frameHandler(options.frame, hex);
			    	mesh = frameHandler(options.frame, mesh);

			    };

				}

				zoom.on('zoom', function(){

					zoomed();


				    hexData = hexbin(source); 

			    var hexMax = 0; 

			    $(hexData).each(function(){
			        if(this.length>hexMax){hexMax = this.length;};
			    });

			        			var hexColor = d3.scale.linear()
					.domain([1, hexMax])
					.range(['#F0B800', '#DD3728'])
					.interpolate(d3.interpolateLab);

					hex.selectAll(".hexagon")
			    .data(hexData)
			    .attr("d", function(d){return hexbin.hexagon();})
			    .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; })
			        //.style("fill", "#0000FF")
			        .style("fill", function(d) { return hexColor(d.length); })
			        // .style("fill-opacity", function(d) { return opac(d.length); })
			        .style("stroke-width", .5)
			        .style("stroke", "#FFF")
			        .style("stroke-opacity", 0.6);

					// zoomed();


				});

				$('#zoomin, #zoomout').on('click', function(){
					zoomHex();
				});

				// add frame number classes if option is set
			    if(options.frame != undefined){
			    	hex = frameHandler(options.frame, hex);
			    	mesh = frameHandler(options.frame, mesh);

			    };


		}

	return map;
	}

}

function arcGisCountries(countries){
	var countryStr = '';
	$(countries).each(function(i,d){
		countryStr = countryStr + 'iso3%3D%27'+d+'%27+OR+';
	});

	countryStr = countryStr.slice(0, -4);
	var precision = 3; 
	var maxOffset = 0.015; 

	var src = 'https://geoservice.unhcr.org/arcgis/rest/services/wrl_services/wrl_polbnd_a_int_1m_unhcr/MapServer/0/query?where='+countryStr+'&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset='+maxOffset+'&geometryPrecision='+precision+'&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=json';
	return src; 
}

  d3.selection.prototype.moveToFront = function() { 
    return this.each(function() { 
     d3.select('svg').node().appendChild(this); 
    }); 
  }; 

  d3.selection.prototype.moveToSvg = function(svg){
    return this.each(function() { 
     svg.node().appendChild(this); 
    }); 
  }; 

	function xlsReq(url, callback) {
		var req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.responseType = "arraybuffer";
		req.onreadystatechange = function() {
		if (req.readyState === 4) {
		  if (req.status < 300) {

		  	var ex = req.response;

			var data = new Uint8Array(ex);
			var arr = new Array();
			for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");

			var workbook = XLS.read(bstr, {type:"binary", cellDates: false});

		  	callback(null, workbook);}

		  else { callback(req.status); }
			}
		};
		req.send(null);
  	}

	function xlsxReq(url, callback) {
		var req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.responseType = "arraybuffer";
		req.onreadystatechange = function() {
		if (req.readyState === 4) {
		  if (req.status < 300) {

		  	var ex = req.response;

			var data = new Uint8Array(ex);
			var arr = new Array();
			for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");

			var workbook = XLSX.read(bstr, {cellDates: false, type:"binary"});

		  	callback(null, workbook);}

		  else { callback(req.status); }
			}
		};
		req.send(null);
  	}

	function getRange(range, worksheet){

		var ex = worksheet;
		var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		// split the string into a arrays
		range = range.split(":");
		var range0 = range[0].match(/[a-zA-Z]+|[0-9]+/g);
		var range1 = range[1].match(/[a-zA-Z]+|[0-9]+/g);

		// get column start/end
		if(range0[0].length>1){
			var rng = range0[0].split('');
			var colStart0 = alpha.indexOf(rng[0])+1*alpha.length; 	
			var colStart1 = alpha.indexOf(rng[1]);
			var colStart = colStart0+colStart1; 
		} else {
			var colStart = alpha.indexOf(range0[0]);
		}
		if(range1[0].length>1){		
			var rng = range1[0].split('');
			var colEnd0 = (alpha.indexOf(rng[0])+1)*26; 	
			var colEnd1 = alpha.indexOf(rng[1]);
			var colEnd = colEnd0+colEnd1;
		} else {
			var colEnd = alpha.indexOf(range1[0]); 		
		}

		// get row start/end
		var rowStart = parseInt(range0[1]);
		var rowEnd = parseInt(range1[1]);

		var array = [];
		var ac = 0;
		// loop through each column
		for(k = rowStart; k<=rowEnd; k++){
			var row = k; 
			
			array[ac] = [];

			for(i = colStart; i<=colEnd; i++){

				// get column letters
				if(i<26){
					var col = alpha[i];
				} else {
					var col0Floor = Math.floor((i)/26);
					var col0A = alpha[col0Floor-1];
					var col1A = alpha[i-(col0Floor*26)];
					var col = col0A + col1A;
				}

				var cell = ex[col+row];

				if(cell){
					array[ac].push(cell.v);
				} else {
					array[ac].push(null);	
				}
			}
			ac++;
		}

		return array;
	}

	function getRangeStr(range, worksheet){

		var ex = worksheet;
		var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		// split the string into a arrays
		range = range.split(":");
		var range0 = range[0].match(/[a-zA-Z]+|[0-9]+/g);
		var range1 = range[1].match(/[a-zA-Z]+|[0-9]+/g);

		// get column start/end
		if(range0[0].length>1){
			var rng = range0[0].split('');
			var colStart0 = alpha.indexOf(rng[0])+1*alpha.length; 	
			var colStart1 = alpha.indexOf(rng[1]);
			var colStart = colStart0+colStart1; 
		} else {
			var colStart = alpha.indexOf(range0[0]);
		}
		if(range1[0].length>1){		
			var rng = range1[0].split('');
			var colEnd0 = (alpha.indexOf(rng[0])+1)*26; 	
			var colEnd1 = alpha.indexOf(rng[1]);
			var colEnd = colEnd0+colEnd1;
		} else {
			var colEnd = alpha.indexOf(range1[0]); 		
		}

		var rowStart = parseInt(range0[1]);
		var rowEnd = parseInt(range1[1]);

		var array = [];
		var ac = 0;
		// loop through each column
		for(k = rowStart; k<=rowEnd; k++){
			var row = k; 
			
			array[ac] = [];

			for(i = colStart; i<=colEnd; i++){
				// get column letters
				if(i<26){
					var col = alpha[i];
				} else {
					var col0Floor = Math.floor((i)/26);
					var col0A = alpha[col0Floor-1];
					var col1A = alpha[i-(col0Floor*26)];
					var col = col0A + col1A;
				}
				var cell = ex[col+row];

				if(cell){
					array[ac].push(cell.w);
				} else {
					array[ac].push(null);	
				}
			}
			ac++;
		}

		return array;
	}

// get header row and use as object name
function getRangeJsonWithHeaders(range, worksheet, colgroup, colType){

		if(colgroup){
			colgroup = getRangeJsonWithHeaders(colgroup, worksheet);
		}

		var ex = worksheet;
		var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		// split the string into a arrays
		range = range.split(":");
		var range0 = range[0].match(/[a-zA-Z]+|[0-9]+/g);
		var range1 = range[1].match(/[a-zA-Z]+|[0-9]+/g);

		// get column start/end
		if(range0[0].length>1){
			var rng = range0[0].split('');
			var colStart0 = alpha.indexOf(rng[0])+1*alpha.length; 	
			var colStart1 = alpha.indexOf(rng[1]);
			var colStart = colStart0+colStart1; 
		} else {
			var colStart = alpha.indexOf(range0[0]);
		}
		if(range1[0].length>1){		
			var rng = range1[0].split('');
			var colEnd0 = (alpha.indexOf(rng[0])+1)*26; 	
			var colEnd1 = alpha.indexOf(rng[1]);
			var colEnd = colEnd0+colEnd1;
		} else {
			var colEnd = alpha.indexOf(range1[0]); 		
		}

		var rowStart = parseInt(range0[1]);
		var rowEnd = parseInt(range1[1]);

		var array = [];
		var ac = 0;

		// month parser

		if(colType=='month'){
			var parseMonth = d3.time.format("%b-%y").parse
		}

		// get headers
		var headers = {};
		for(i = colStart; i<=colEnd; i++){
			// get column letters
			if(i<26){
				var col = alpha[i];
			} else {
				var col0Floor = Math.floor((i)/26);
				var col0A = alpha[col0Floor-1];
				var col1A = alpha[i-(col0Floor*26)];
				var col = col0A + col1A;
			}

			var h = ex[col+rowStart];
			if(h){
				if(colgroup){
					if(colType=='month'){
						headers[i]=parseMonth(h.w.replace(/\s/g, '').toLowerCase());
					} else {
						headers[i]=h.w.replace(/\s/g, '').toLowerCase();
					}
				} else {
					headers[i]=h.w.replace(/\s/g, '').toLowerCase();
				}
			} else {
				headers[i]= null;
			}
		}


		var k0 = 0;
		// loop through each column
		for(k = rowStart+1; k<=rowEnd; k++){
			var row = k; 
			array[ac] = {};
			
			if(colgroup){
				array[ac].values = [];
				var colgrouparray = colgroup[k0];
				for (var key in colgrouparray) {
				  if (colgrouparray.hasOwnProperty(key)) {
				  	array[ac][key] = colgrouparray[key];
				  }
				}
			}

			for(i = colStart; i<=colEnd; i++){
				// get column letters
				if(i<26){
					var col = alpha[i];
				} else {
					var col0Floor = Math.floor((i)/26);
					var col0A = alpha[col0Floor-1];
					var col1A = alpha[i-(col0Floor*26)];
					var col = col0A + col1A;
				}

				var cell = ex[col+row];

				if(cell){
					if(colgroup){
						if((colType!=='month')&&(headers[i].indexOf("date") > -1)) {
							array[ac].values.push({'key': headers[i], 'value': excelDate(cell.v)});	
						} else {
							array[ac].values.push({'key': headers[i], 'value': cell.v});						
						}
					} else {
						if(headers[i].indexOf("date") > -1) {
							array[ac][headers[i]]= excelDate(cell.v);	
						} else {
							array[ac][headers[i]]= cell.v;					
						}
					}
					
				} else {
					if(colgroup){
						array[ac].values[headers[i]] = null;						
					} else {
						array[ac][headers[i]] = null;						
					}
				}
			}
			ac++; k0++;
		}
		return array;
	}

	function excelDate(date){
		return new Date((date - (25567 + 2))*86400*1000);
	}

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();


// transition end callback
function endAll (transition, callback) {
    var n;

    if (transition.empty()) {
        callback();
    }
    else {
        n = transition.size();
        transition.each("end", function () {
            n--;
            if (n === 0) {
                callback();
            }
        });
    }
}

// glow filter

function glow(url) {
  var stdDeviation = 2,
      rgb = "#000",
      colorMatrix = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0";

  if (!arguments.length) {
    url = "glow";
  }

  function my() {

    var defs = this.append("defs");

    var filter = defs.append("filter")
        .attr("id", url)
        .attr("x", "-20%")
        .attr("y", "-20%")
        .attr("width", "140%")
        .attr("height", "140%")
      .call(function() {
        this.append("feColorMatrix")
            .attr("type", "matrix")
            .attr("values", colorMatrix);
        this.append("feGaussianBlur")
             // .attr("in", "SourceGraphics")
            .attr("stdDeviation", stdDeviation)
            .attr("result", "coloredBlur");
      });

    filter.append("feMerge")
      .call(function() {
        this.append("feMergeNode")
            .attr("in", "coloredBlur");
        this.append("feMergeNode")
            .attr("in", "SourceGraphic");
      });
  }

  my.rgb = function(value) {
    if (!arguments.length) return color;
    rgb = value;
    color = d3.rgb(value);
    var matrix = "0 0 0 red 0 0 0 0 0 green 0 0 0 0 blue 0 0 0 1 0";
    colorMatrix = matrix
      .replace("red", color.r)
      .replace("green", color.g)
      .replace("blue", color.b);

    return my;
  };

  my.stdDeviation = function(value) {
    if (!arguments.length) return stdDeviation;
    stdDeviation = value;
    return my;
  };

  return my;
}
