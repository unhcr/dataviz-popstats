var populationTypes = [
	{'Refugees, including persons in a refugee-like situation':'ref+roc'},
	{'Asylum-seekers (pending cases)':'asy'},
	{'IDPs protected/assisted by UNHCR, including persons in an IDP-like situation':'idp+ioc'},
	{'Returned refugees, returned IDPs':'ret+rdp'},
	{'Persons under UNHCR’s statelessness mandate':'sta'},
	{'Others of concern to UNHCR':'ooc'},
];

var popTypeColors = [
'#ff9191',
'#3c5a7d',
'#64CFBC',
'#acacac',
'#769a8f',
'#ad7e7a'];

var popTypeColors2 =  [
'#ffc8c8',
'#697f9b',
'#A7E8E0',
'#cccccc',
'#adc2bc',
'#ceb2af'];


var popTypeColorKey = {
	'REF':['#ff9191','#ffc8c8'],
	'ASY':['#3c5a7d','#697f9b'],
	'IDP':['#64CFBC','#A7E8E0'],
	'RET':['#acacac','#cccccc'],
	'STA':['#769a8f','#adc2bc'],
	'OTH':['#ad7e7a','#ceb2af']
};

var popTypes = ['REF','ASY','IDP','RET','STA','OTH'];

var popSelected = ['REF','ASY','IDP','RET','STA','OTH'];

var selectedCountry = null;

// whether to show values or percentages
var totalToggle = true;

// pie hover opacities
var pieOpacity = {};
pieOpacity.normal = 0.7;
pieOpacity.normalHover = 0.9;
pieOpacity.selected = 1;
pieOpacity.selectedHover = 1;
pieOpacity.unselected = 0.2;
pieOpacity.unselectedHover = 0.4;

// country hover states
var country = {}
country.normal = '#DDDDDD';
country.normalHover = '#D3D3D3';
country.selected = '#C1C1C1';

//**************************
// DEFINE DATA SOURCES
//**************************
var dataSources = [
{'name': 'world', 'source': 'scripts/geo/topojson/worldhistory.json'},
{'name': 'centroid', 'source': 'scripts/geo/topojson/centroid.csv'},
{'name': 'disputed_boundaries', 'source': 'scripts/geo/topojson/disputed_boundaries.json'},
{'name': 'disputed_boundaries_polygons', 'source': 'scripts/geo/topojson/disputed_boundaries_polygons.json'},
// {'name': 'poc', 'source': 'scripts/geo/data/poc.json'},
{'name': 'poc', 'source': 'http://popdata.unhcr.org/api/stats/persons_of_concern_all_countries_total.json'},
{'name': 'layout', 'source': 'images/layout.svg'},
];

//***********************
// INITIALIZE THE LIBRARY
//***********************
var viz = new Vizlib(dataSources, function(data){


	var myGlow = glow("myGlow").rgb("#FFF").stdDeviation(4);

	var svg = viz.createSvg({
		div: "#svgContainer", 
		id:'mapsvg', 
		// 'frame': [1,2,3],
		'viewBoxWidth': 1500,
		'viewBoxHeight': 1060,
		'scrollable': false,
		'downloadButton': false
	});

	svg.call(myGlow);

	//**************************
	// LOAD SVG LAYOUT
	//**************************
	var layout = viz.svgImport({
    'appendTo': svg,
    'source': data.layout,
    'id': 'layout',
    'layerId': 'Layout',
	});


	var subsvg = viz.createSubSvg({
		'appendTo': svg, 
		'attachTo': 'mapcontainer',
		'id':'subsvg',
		'x': 20,
		'y': 200, 
		'width': 1460,
		'height': 525
		// 'frame': [1,2,3]
	});


	//**************************
	// TAB NAVIGATION
	//**************************

	d3.select('#frame2').style('opacity', 0).style('display', 'none');

	d3.select('#frame0')
	.style('opacity', 1)
	.style('cursor', 'pointer')
	.on('click', function(){
		d3.select(this)
		.transition()
		.duration(1000)
		.style('opacity', 0)
		.each("end", function(){
			d3.select('#frame0').style('display', 'none')
		})
	});

	// help icon
	d3.select('#help')
	.style('cursor', 'pointer')
	.attr('opacity', 0.6)
	.on('mouseover', function(){
		d3.select(this).style('opacity', 1)
	})
	.on('mouseout', function(){
		d3.select(this).style('opacity', 0.6)
	})
	.on('click', function(){
		d3.select('#frame0').style('display', 'block')
		.transition()
		.duration(1000)
		.style('opacity', 1);
	});

	d3.selectAll('#reftab,#poctab,#asytab')
	.style('cursor', 'pointer');

	d3.selectAll('#poctext tspan').attr('fill', '#000');

	d3.select('#poctab').on('click', function(){

		d3.selectAll('#poctext tspan').transition().duration(1000).attr('fill', '#000');
		d3.selectAll('#reftext tspan,#asytext tspan').attr('fill', '#666666');

		d3.selectAll('#asytabline,#reftabline')
		.transition()
		.duration(250)
		.style('opacity',0.25);

		d3.select('#poctabline')
		.transition()
		.delay(250)
		.duration(250)
		.style('opacity', 1);

		d3.selectAll('#frame2')
		.transition()
		.duration(700)
		.style('opacity', 0)
		.each("end", function(){
			d3.selectAll('#frame2').style('display', 'none')
		});

		d3.selectAll('#frame1,.frame1')
		.style('display', 'block')
		.transition()
		.delay(700)
		.duration(700)
		.style('opacity', 1)
	});


	d3.select('#reftab').on('click', function(){

		d3.selectAll('#reftext tspan').attr('fill', '#000');
		d3.selectAll('#poctext tspan,#asytext tspan').attr('fill', '#666666');

		d3.selectAll('#asytabline,#poctabline')
		.transition()
		.duration(250)
		.style('opacity',0.25);

		d3.select('#reftabline')
		.transition()
		.delay(250)
		.duration(250)
		.style('opacity', 1);

		d3.selectAll('#frame1,.frame1')
		.transition()
		.duration(700)
		.style('opacity', 0)
		.each("end", function(){
			d3.selectAll('#frame1,.frame1').style('display', 'none')
		});

		d3.select('#frame2')
		.style('display', 'block')
		.transition()
		.delay(700)
		.duration(700)
		.style('opacity', 1)
	});

	d3.select('#asytab').on('click', function(){


		d3.selectAll('#asytext tspan').attr('fill', '#000');
		d3.selectAll('#poctext tspan,#reftext tspan').attr('fill', '#666666');

		d3.selectAll('#reftabline,#poctabline')
		.transition()
		.duration(250)
		.style('opacity',0.25);

		d3.select('#asytabline')
		.transition()
		.delay(250)
		.duration(250)
		.style('opacity', 1);

		d3.selectAll('#frame1,.frame1')
		.transition()
		.duration(700)
		.style('opacity', 0)
		.each("end", function(){
			d3.selectAll('#frame1,.frame1').style('display', 'none')
		});

		d3.select('#frame2')
		.style('display', 'block')
		.transition()
		.delay(700)
		.duration(700)
		.style('opacity', 1)
	});

	//**************************
	// ORGANIZE THE DATA
	//**************************

	// remove redacted (*) and replace with 0
	$(data.poc).each(function(i,d){
		for (var key in this) {
			if(this[key]=='*'){
				this[key]=null;
			}
		}

				d.ref = d.ref+d.roc;
		d.idp = d.idp+d.ioc;
		d.ret = d.ret+d.rdp;
		delete d.ioc;
		delete d.rdp;
		delete d.roc;

	});


	// totals by year
	var totalDataNest = d3.nest()
	.key(function(d) { return d.year; })
	.rollup(function(leaves) { return {
		'piedata':[
			d3.sum(leaves, function(d) { return d.ref }),
			d3.sum(leaves, function(d) { return d.asy }),
			d3.sum(leaves, function(d) { return d.idp }),
			d3.sum(leaves, function(d) { return d.ret }),
			d3.sum(leaves, function(d) { return d.sta }),
			d3.sum(leaves, function(d) { return d.ooc }),
			],
		'totals': d3.sum(leaves, function(d) { return d.total; })

		}
	})
	.entries(data.poc);


	var years = [];
	var totalData = {};
	var totalDataArr = [];
	totalDataNest.forEach(function(d,i){
		totalData[d.key] = [];
		totalData[d.key].piedata = d.values.piedata;
		totalData[d.key].totals = d.values.totals;
		totalData[d.key].barValues = [0, d.values.totals];

		totalDataArr[i] = {
			'year': parseInt(d.key),
			'series': parseInt(d.key),
			'piedata': d.values.piedata,
			'totals': d.values.totals
		}

		years.push(d.key);

	});

	// totals by country and year
	var countryTotalData = d3.nest()
	.key(function(d) { return d.country_iso; })
	.key(function(d) { return d.year; })
	.rollup(function(leaves) { return {
		'piedata':[
			d3.sum(leaves, function(d) { return d.ref }),
			d3.sum(leaves, function(d) { return d.asy }),
			d3.sum(leaves, function(d) { return d.idp }),
			d3.sum(leaves, function(d) { return d.ret }),
			d3.sum(leaves, function(d) { return d.sta }),
			d3.sum(leaves, function(d) { return d.ooc }),
			],
		'totals': d3.sum(leaves, function(d) { return d.total; })

		}
	})
	.entries(data.poc);

	var countryData = {};
	var countryDataArr = {};
	countryTotalData.forEach(function(d,i){
		countryData[d.key] = [];
		countryDataArr[d.key] = [];

		d.values.forEach(function(dd,ii){
			countryData[d.key][dd.key] = [];
			countryData[d.key][dd.key].piedata = dd.values.piedata;
			countryData[d.key][dd.key].totals = dd.values.totals;

			countryDataArr[d.key][ii] = {
				'year': parseInt(dd.key),
				'series': parseInt(dd.key),
				'piedata': dd.values.piedata,
				'totals': dd.values.totals,
				'barValues': [0,dd.values.totals]
			}

		});

	});

	// // version using stacked chart
	// var timeData = d3.nest()
	// .key(function(d) { return d.year; })
	// .rollup(function(leaves) { return [
	// 	d3.sum(leaves, function(d) {return d.ref+d.roc;}),
	// 	d3.sum(leaves, function(d) {return d.asy;}),
	// 	d3.sum(leaves, function(d) {return d.idp+d.ioc;}),
	// 	d3.sum(leaves, function(d) {return d.ret+d.rdp;}),
	// 	d3.sum(leaves, function(d) {return d.sta;}),
	// 	d3.sum(leaves, function(d) {return d.ooc;}),
	// 	] })
	// .entries(data.poc);

	// world year/start/iso simplified
	var worldSimplified = data.world.objects.cshapes2.geometries;

	function getTotals(){
		// filter by selected country
	    if(selectedCountry){
		    return countryData[selectedCountry][selectedYear];	
	    } else {
	    	// OR filter by selected year
			return totalData[selectedYear];
	    }
	}

	function sliderData(){

	    if(selectedCountry){

		    	countryDataArr[selectedCountry].forEach(function(d,i){
	    		var t = 0;

	    		if($.inArray( 'REF', popSelected)!== -1) { t = t + d.piedata[0]; };
	    		if($.inArray( 'ASY', popSelected)!== -1) { t = t + d.piedata[1]; };
	    		if($.inArray( 'IDP', popSelected)!== -1) { t = t + d.piedata[2]; };
	    		if($.inArray( 'RET', popSelected)!== -1) { t = t + d.piedata[3]; };
	    		if($.inArray( 'STA', popSelected)!== -1) { t = t + d.piedata[4]; };
	    		if($.inArray( 'OTH', popSelected)!== -1) { t = t + d.piedata[5]; };
	    	
	    		d.barValues = [];
	    		d.barValues[0] = 0;
	    		d.barValues[1] = t;
	    		d.totals = t;

	    	});

	    	return countryDataArr[selectedCountry];

	    } else {

	    	totalDataArr.forEach(function(d,i){
	    		var t = 0;

	    		if($.inArray( 'REF', popSelected)!== -1) { t = t + d.piedata[0]; };
	    		if($.inArray( 'ASY', popSelected)!== -1) { t = t + d.piedata[1]; };
	    		if($.inArray( 'IDP', popSelected)!== -1) { t = t + d.piedata[2]; };
	    		if($.inArray( 'RET', popSelected)!== -1) { t = t + d.piedata[3]; };
	    		if($.inArray( 'STA', popSelected)!== -1) { t = t + d.piedata[4]; };
	    		if($.inArray( 'OTH', popSelected)!== -1) { t = t + d.piedata[5]; };
	    	
	    		d.barValues = [];
	    		d.barValues[0] = 0;
	    		d.barValues[1] = t;
	    		d.totals = t;
	    	});

	    	return totalDataArr;
	    }

	}
	// non-stacked data



	// var i = 1900;
	// var randomData = [];

	// while (i <= 2015) {
	// 	var r = Math.floor(Math.random() * 60000000) + 1000000  
	//     randomData.push({'series': i, values: [r]});
	//     i++;
	// };

	// timeData = randomData;


	//**************************
	// GET COUNTRY DATA BY YEAR (MAP)
	//**************************

	// filter out the small figures!
	var threshold = 2000;

	// group by country and get the maximum value througout all years
	var mapData = data.poc;
	var mapCountryMax = [];
	mapData.forEach(function(d,i){

		if((mapCountryMax[d.country_iso]<d.total)||(!mapCountryMax[d.country_iso])){
			mapCountryMax[d.country_iso]=d.total;
		}
	});

	var mapCountries = [];

	for (var key in mapCountryMax) {
		if(mapCountryMax[key]>threshold){
			mapCountries.push(key);
		}
	};

	var mapDataBase = data.poc.filter(function(d,i){
		return mapCountries.indexOf(d.country_iso) > -1;
	});

	// get maximum country circle. 
	var countryMax = d3.max(data.poc, function(d){
		return d.total;
	});

	function getMapDataInit(){

		var yearData = mapDataBase;

		// var yearData = allData.filter(function (d,i){
	 //        return d.country_iso!='STA';
	 //    });
		
		// var yearData = yearData.filter(function (d,i){
	 //        return d.country_iso!='KOS';
	 //    });

	 //    var yearData = yearData.filter(function (d,i){
	 //        return d.country_iso!='';
	 //    });

		var mapData = d3.nest()
			.key(function(d) { return d.country_iso; })
			.rollup(function(leaves) { return {
				'total': 6,
				'piedata':[1,1,1,1,1,1]
			} 
		})
		.entries(yearData);

		mapData.forEach(function(d){
			data.centroid.forEach(function(d1){
				if(d.key==d1.iso3){
					d.lat = parseFloat(d1.centroid_lat);
					d.lon = parseFloat(d1.centroid_lon);
				}
			})
		});

		return mapData;

	}


	function getMapData(year){

		var allData = mapDataBase;

		var yearData = allData.filter(function (d,i){
	        return d.year===year;
	    });

		var mapData = d3.nest()
			.key(function(d) { return d.country_iso; })
			.rollup(function(leaves) { return {
				'piedata':[
				d3.sum(leaves, function(d) { if($.inArray( 'REF', popSelected)!== -1) { return 1+d.ref } else { return 1;}}),
				d3.sum(leaves, function(d) { if($.inArray( 'ASY', popSelected)!== -1) { return 1+d.asy } else { return 1;}}),
				d3.sum(leaves, function(d) { if($.inArray( 'IDP', popSelected)!== -1) { return 1+d.idp } else { return 1;}}),
				d3.sum(leaves, function(d) { if($.inArray( 'RET', popSelected)!== -1) { return 1+d.ret } else { return 1;}}),
				d3.sum(leaves, function(d) { if($.inArray( 'STA', popSelected)!== -1) { return 1+d.sta } else { return 1;}}),
				d3.sum(leaves, function(d) { if($.inArray( 'OTH', popSelected)!== -1) { return 1+d.ooc } else { return 1;}}),
				]
			} 
			})
			.entries(yearData);

			mapData.sort(function(a, b){ return d3.descending(d3.sum(a.values.piedata), d3.sum(b.values.piedata)); });
			mapData.forEach(function(d){
				d.values.total = d3.sum(d.values.piedata);	
				data.centroid.forEach(function(d1){
					if(d.key===d1.iso3){
						d.lat = parseFloat(d1.centroid_lat);
						d.lon = parseFloat(d1.centroid_lon);
					}
				})
			});

		return mapData;
	}

	// // version using stacked chart
	// var timeData = d3.nest()
	// .key(function(d) { return d.year; })
	// .rollup(function(leaves) { return [
	// 	d3.sum(leaves, function(d) {return d.ref+d.roc;}),
	// 	d3.sum(leaves, function(d) {return d.asy;}),
	// 	d3.sum(leaves, function(d) {return d.idp+d.ioc;}),
	// 	d3.sum(leaves, function(d) {return d.ret+d.rdp;}),
	// 	d3.sum(leaves, function(d) {return d.sta;}),
	// 	d3.sum(leaves, function(d) {return d.ooc;}),
	// 	] })
	// .entries(data.poc);

	//*************************
	// MAP
	//*************************

	var map = viz.map({
		'appendTo': subsvg, // svg or g d3 object
		'enableRaster': false,
		'center': [15,38],
		'xOffset': 33, 
		'yOffset': -110, 
		'zoomInit': 11,
		'mapbox': 'matthewsmawfield.31370f48',
		'enableZoomButtons': true,
		'zoomBtnPos': 'topright',
		'enableZoomMouseScroll': false,
		'enablePan': true,
		'zoomButtonsHtml': '<div class="zoomBox"><div class="zoom zoomIn"></div><div class="zoom zoomOut"></div></div>',
		'zoomInSteps': 1,
		'zoomOutSteps': -0.1,
		'zoomFactor': 2,
		'zoomTweak': 0.75,
		'coordinatesTooltip': false,
		'coordinatesToClipboard': false,
		'frame': [1] // if double clicking anywhere on the map, show a popup with the coordinates
	});

	subsvg.on('mousemove', function(){
		var py = d3.event.pageY;
		var px = d3.event.pageX;

		var coordinates = d3.mouse(this);
		var px = coordinates[0]+50;
		var py = coordinates[1]+35;


		var bw = tooltipText.node().getBBox().width+13;
		tooltipArrowR.attr('transform', 'translate('+bw+',0)')
		tooltipArrowRectR.attr('x', bw-16)

		// when mousing right, show tooltip on left
		if(px>=1280){
			px = px - bw-70;
			tooltipArrowL.attr('opacity', 0);
			tooltipArrowRectL.attr('opacity', 0);	
			tooltipArrowR.attr('opacity', 1);
			tooltipArrowRectR.attr('opacity', 1);			
		} else {
			tooltipArrowL.attr('opacity', 1);
			tooltipArrowRectL.attr('opacity', 1);
			tooltipArrowR.attr('opacity', 0);
			tooltipArrowRectR.attr('opacity', 0);	
		}
		d3.select('#tooltip')
		.attr('transform',function(){
			return 'translate('+px+','+py+')';
		})
		// .attr('x', 200);
	});

	var worldLayerBg = map.addVectorPolygon({
	    'source': data.world, 
	    'class': "countryBg",
	    'fillOpacity': 1,
	    'fill': '#EEEEEE',
	    'strokeOpacity': 1,
	    'strokeWidth': 1,
	    'strokeColor': 'none'
	});


	var worldLayer = map.addVectorPolygon({
	    'source': data.world, 
	    'class': "country",
	    'fillOpacity': 1,
	    'fill': country.normal,
	    'strokeOpacity': 1,
	    'strokeWidth': 1,
	    'strokeColor': '#F3F3F3'
	});

	worldLayer
	.style('cursor', 'pointer')
	.on('mouseover', function(d){
		countryHover(d.id);
	})
	.on('mouseout', function(){
		countryHoverOff();
	})
	.on('click', function(d){
		countrySelect(d.id);
		countryHover(d.id);
	})

	//**************************
	// DISPUTED BOUNDARIES
	//**************************
	var disputedBoundaries1 = map.addVectorPolygon({
	    'source': data.disputed_boundaries, 
	    'class': "boundary1",
	    'fillOpacity': 0,
	    'fill': country.normal,
	    'strokeOpacity': 1,
	    'strokeWidth': 2,
	    'strokeColor': '#DDDDDD',
	    'strokeDotted': false
	});

	var disputedBoundaries2 = map.addVectorPolygon({
	    'source': data.disputed_boundaries, 
	    'class': "boundary2",
	    'fillOpacity': 0,
	    'fill': country.normal,
	    'strokeOpacity': 1,
	    'strokeWidth': 1,
	    'strokeColor': '#FFFFFF',
	    'strokeDotted': true
	});

	var disputedBoundariesPolygons = map.addVectorPolygon({
	    'source': data.disputed_boundaries_polygons, 
	    'class': "boundarypolygons",
	    'fillOpacity': 1,
	    'fill': country.normal,
	    'strokeOpacity': 1,
	    'strokeWidth': 1,
	    'strokeColor': '#FFFFFF',
	    'strokeDotted': true
	});

	//**************************
	// MAP PIE CHARTS
	//**************************

	var pies = map.addPies({
		'data': getMapDataInit(),
		'max': 10000000,
		'maxRadius': 50,
		'color': popTypeColors,
		'opacity': pieOpacity.normal,
		'frame': 1,
		mouseover: function(val){
			countryHover(val.key);
		},
		mouseout: function(){	
			countryHoverOff();
		},
		click: function(val){
			countrySelect(val.key);
			countryHover(val.key);
		}
	});

	pies.style('cursor', 'pointer');

	//**************************
	// COUNTRY HOVER
	//**************************
	function countryHover(iso){

		// some common functions
		setCountryName(iso);
		setTooltipTotal(iso);

		// shade pies on mouseover
		pies.attr('opacity', function(d,i){
			if(selectedCountry){
				// if country selected
				if(d.key==selectedCountry){
					return pieOpacity.selectedHover;
				} else if (d.key == iso){
					return 0.4;
				} else {
					return pieOpacity.unselected;
				}
			} else {
				// if no country selected
				if(iso==d.key){
					return pieOpacity.normalHover;
				} else {
					return pieOpacity.normal;
				}
			}
		});

		// shade world polygons
		worldLayer.style('fill', function(d){
			// if country selected
			if(selectedCountry){
				if(d.id==selectedCountry){
					return country.selected;
				} else if (d.id == iso){
					return country.normalHover;
				} else {
					return country.normal
				}
			} else {
			// if no country selected
				if(d.id==iso){
					return country.normalHover;
				} else {
					return country.normal;
				}
			}
		});

	}

	function countryHoverOff(){
		unsetCountryName();
		// shade pies
		pies.attr('opacity', function(d,i){
			if(d.key==selectedCountry){
					return pieOpacity.selected;
				} else if(selectedCountry){
					return pieOpacity.unselected;
				} else {
					return pieOpacity.normal;
			}
		});

		// shade countries
		worldLayer.style('fill', function(d){
			// if country selected
			if(d.id==selectedCountry){
				return country.selected;
			} else {
				return country.normal;
			}
			
		});
	}

	//**************************
	// MAP TOOLTIP
	//**************************

	var tooltip = map
	.append('g')
	.attr('id', 'tooltip')
	.attr('transform', 'translate(300,300)')
	.style('display','block');


	var tooltipBody = tooltip
	.append('rect')
	.attr('x', 0)
	.attr('y', 0)
	.attr('width', 180)
	.attr('height', 45)
	.attr('rx', 5)
	.attr('ry', 5)
	.style('fill', '#FFF')
	.style('stroke', '#ACACAC')
	.style('stroke-width', 2.5)

	var tooltipArrowL = tooltip
	.append('path')
	.attr('d', " M 3 12  L -15 22.5  L 3 33 L 3 12")
	.style('fill', '#FFF')
	.style('stroke', '#ACACAC')
	.style('stroke-width', 2.5)
	.attr('transform', 'translate(0,0)')

	var tooltipArrowRectL = tooltip
	.append('rect')
	.attr('x', 3)
	.attr('y', 10)
	.attr('width', 20)
	.attr('height', 25)
	.style('fill', '#FFF')
	.style('stroke', '#FFF')
	.style('stroke-width', 3);

	var tooltipArrowR = tooltip
	.append('path')
	.attr('d', " M 3 12  L 18 22.5  L 3 33 L 3 12")
	.style('fill', '#FFF')
	.style('stroke', '#ACACAC')
	.style('stroke-width', 2.5)
	.attr('transform', 'translate(195,0)')

	var tooltipArrowRectR = tooltip
	.append('rect')
	.attr('x', 185)
	.attr('y', 10)
	.attr('width', 20)
	.attr('height', 25)
	.style('fill', '#FFF')
	.style('stroke', '#FFF')
	.style('stroke-width', 3);

	var tooltipText =
	tooltip.append('g');

	var tooltipName = tooltipText
	.append('text')
	.attr('id', 'tooltipName')
	.attr('x', 8)
	.attr('y', 17)
	.style('font-famly', 'Lato')
	.style('font-size', '12px')
	.style('font-weight', 'bold')
	.text('Country Name');

	var tooltipVal = tooltipText
	.append('text')
	.attr('id', 'tooltipVal')
	.attr('x', 8)
	.attr('y', 36)
	.style('font-famly', 'Lato')
	.style('font-weight', 'bold')
	.style('font-size', '14px')
	.style('fill', '#0077C0')
	.text('12,000,000');

	var tooltipPoC = tooltipText
	.append('text')
	.attr('id', 'tooltipPoC')
	.attr('x', 85)
	.attr('y', 35)
	.style('font-famly', 'Lato')
	.style('font-weight', 'normal')
	.style('font-size', '12px')
	.style('fill', 'grey')
	.text('persons of concern');

	// get the widths of the tooltip text elements -- use to position the poc descriptive label after the value
	var tw = tooltipVal.node().getBBox().width;
	var tx = tooltipPoC.attr('x');
	var tz = tooltip.node().getBBox().width;

	tooltip.style('display', 'none');

	function setTooltipTotal(iso){

		t = 0;

		// filter by selected year
		var totals = data.poc.filter(function (d,i){
	        return d.year==selectedYear;
	    }).filter(function(d,i){
	    	return d.country_iso == iso
	    });


		if(totals[0]){
	    		var t = totals[0].total;
	    	} else {
	    		var t = 0;
	    	}

		d3.select('#tooltipVal').text(addCommas(t));

		// adjust total box poc x
		var tw2 = d3.select("#tooltipVal").node().getBBox().width;
		var twnew = tw-tw2;
		if(!isNaN(twnew)){
				d3.select("#tooltipPoc").attr('x', function(d,i){
			return tx - twnew;
		});	
		}

		// get the country name text width
		var nameWidth = d3.select('#tooltipName').node().getBBox().width;
		var valWidth = d3.selectAll('#tooltipVal,#tooltipPoc').node().getBBox().width;
		var bw = tooltipText.node().getBBox().width+20;

		tooltipBody.attr('width', function(){
			return bw;
		});

	}


	//**************************
	// COLUMN CHART
	//**************************
	var columnChart = viz.columnChart({
		appendTo: svg,
		id: 'columnChart1',
		attachTo: 'timelinecontainer',
		opacity: 1,
		gutter: 0.05,
		x: 40,
		y: 735,
		width: 1460,
		height: 120,
		color: ['#0B63AF'],
		maxValue: 'round', // integerValue (force define the maximum), 'auto' (find the maximum value in the data), 'round' (pretty rounding based on maximum value in the data)
		paddingLeft: 63,
		paddingTop: 2,
		dataLabels: {
			enabled: false,
			font: {
				size: '12px',
				weight: 'normal',
				family: 'Lato',
				padding: 6
			}
		},
		yAxis: {
			enabled: true,
			label: '',
			gridlines: {
				enabled: true,
				stroke: '#A7A7A7',
				strokeWidth: 1,
				opacity: 1,
				dotted: true
			},
			font: {
				values: {
					size: '11px',
					weight: 'bold',
					family: 'Lato',
					padding: 0
				},
				label: {
					size: '14px',
					weight: 'bold',
					family: 'Lato',
					padding: 10
				}
			}
		},
		xAxis: {
			enabled: false,
			label: 'Years',
			gridlines: {
				enabled: true,
				stroke: 'grey',
				strokeWidth: 1,
				opacity: 1
			},
			font: {
				values: {
					size: '14px',
					weight: 'bold',
					family: 'Lato'
				},
				label: {
					size: '14px',
					weight: 'bold',
					family: 'Lato'
				}
			}
		},
		font: {
			title: {
				size: '20px',
				weight: 'bold'
			},
			subtitle: {
				size: '12px',
				weight: 'normal'
			},
		},
		legend: {
			enabled: true,
			position: 'top'
		},
		data: sliderData(),
		dataValues: 'totals',
		dataKey: 'year',
		frame: [1]
	});

	d3.selectAll('#columnChart1').style('background-color', '#FFF !important');

	// console.log(sliderData());


	// var yearButtons = viz.yearButtons({
	// appendTo: svg,
	// id: 'yearButtons',
	// attachTo: 'yearButtonContainer',
	// opacity: 1,
	// gutter: 0.3,
	// x: 20,
	// y: 735,
	// width: 1460,
	// height: 120,
	// fill: '#FAFAFA',
	// fillSelected: '#535353',
	// fontColor: '#000',
	// fontColorSelected: '#FFF',
	// font: {
	// 	size: '16px',
	// 	weight: 'bold',
	// 	family: 'Lato',
	// },
	// data: years,
	// defaultSelected: 2009
	// });

	columnChart
	.style('cursor', 'pointer')
	.on('mouseover', function(d){
		d3.select(this).attr('opacity', 0.9);
	}).on('mouseout', function(d){
		d3.select(this).attr('opacity', 1);
	}).on('click', function(d){
		slider.update(d.year);
		slider.setVal(d.year);
	});

	//**************************
	// SLIDER
	//**************************
	var selectedYear = 2014;

	var slider = viz.slider({
		appendTo: svg,
		id: 'yearButtons',
		attachTo: 'yearbuttoncontainer',
		thisClass: 'slider',
		opacity: 1,
		labelPosition: 'bottom',
		barPadding: true,
		paddingLeft: 60,
		frame: 1,
		x: 50,
		y: 0,
		fade: 0,
		delay: 0,
		height: 50,
		width: 500,
		data: years,
		stroke: '#444444',
		handleStroke: '#999999',
		defaultValue: selectedYear,
		snap: true,
		action: function(val){

			selectedYear = val;
			d3.select('#columnChart1').selectAll('.bar')
			.style('fill', function(d,i){
				var year = d3.select(this.parentNode).datum().series;

				// color bars if only one selected
				if(popSelected.length==1){
					if(year==val){
						return popTypeColorKey[popSelected[0]][0];
					} else {
						return popTypeColorKey[popSelected[0]][1];
					}		
				} else {
					if(year==val){
						return '#0B63AF';
					} else {
						return '#84B1D7';
					}
				}

			});

			// update pies
			pies.update({
				'data': getMapData(val)
			});

			// update total figures
			updateTotals();

			if(selectedCountry){
				// change pie opacity when country selected 
				pies.attr('opacity', function(d,i){
					if(d.key==selectedCountry){
						return pieOpacity.selected;
					} else {
						return pieOpacity.unselected;
					}
				});
			}

			// world history
			var yr = val;
			if(val>2012){yr=2012;};
			d3.selectAll(".country")    
		    .style("display","block")                                  
		        .filter(function(d) { return (d.properties.startyear > yr)||(d.properties.endyear + 1 <= yr)})
	            .style("display", "none");   

	        // world history disputed borders
	        d3.selectAll('.boundary1')
	        .style('display','block')
	        .filter(function(d){ return parseInt(d.properties.startyear-1)>=yr})
	        .style("display", "none");  

	        d3.selectAll('.boundary2')
	        .style('display','block')
	        .filter(function(d){ return parseInt(d.properties.startyear-1)>=yr})
	        .style("display", "none");  

	        d3.selectAll('.boundarypolygons')
	        .style('display','block')
	        .filter(function(d){ return parseInt(d.properties.startyear-1)>=yr})
	        .style("display", "none"); 

		}
	});


	// initialize
	slider.update(selectedYear);


	//**************************
	// toggle
	//**************************

	d3.select('#togglehelper')
	.attr('opacity', 0);

	d3.select('#togglemask')
	.on('mouseover', function(){

		console.log('toggle hover');
		d3.select('#togglebg #oval')
		.style('fill', '#F3F3F3');

		d3.select('#togglehelper')
		.transition()
		.delay(500)
		.duration(1500)
		.attr('opacity', 1);
	}).on('mouseout', function(){
		d3.select('#togglehelper')
		.transition()
		.duration(300)
		.attr('opacity', 0);

		d3.select('#togglebg #oval')
		.style('fill', '#FFF');
	})

	d3.select('#toggle').style('cursor', 'pointer')
	.classed({
		'frame1': true
	})
	.on('click',function(){
		if(totalToggle==true){
			d3.select('#pertoggle').style('fill', '#FFF');
			d3.select('#indtoggle').style('fill', '#666666');
			d3.select('#circletoggle').transition().duration(50).attr('transform','translate(22,0)');

			totalToggle=false;
		} else {
			d3.select('#pertoggle').style('fill', '#666666');
			d3.select('#indtoggle').style('fill', '#FFF');
			d3.select('#circletoggle').transition().duration(50).attr('transform','translate(0,0)');

			totalToggle=true;
		}

		updateTotals();

	});


	d3.selectAll('#toggle').moveToFront();
	d3.selectAll('#selectall').moveToFront();
	d3.selectAll('#total').moveToFront();
	d3.selectAll('#totaltext').moveToFront();
	d3.selectAll('#disclaimer').moveToFront();
	d3.selectAll('#filtertitle').moveToFront();
	d3.selectAll('#tooltip').moveToFront();
	d3.selectAll('#maplegend').moveToFront();
	d3.selectAll('#embedframe').moveToFront();

	d3.selectAll('#poptooltip').moveToFront();

	d3.selectAll('#colchartbg').moveToFront();
	d3.selectAll('#poptypefilters').moveToFront();




	d3.selectAll('#columnChart1').moveToFront();
	d3.selectAll('#frame0').moveToFront();

	// set up some frames

	d3.select('#total')
	.classed({
		'frame1': true
	});

	d3.select('#disclaimer')
	.classed({
		'frame1': true
	});

	// d3.selectAll('#tooltip').moveToSvg(subsvg);


	//**************************
	// update total figures
	//**************************
	var bw = document.getElementById("totaltop").getBBox().width;
	var bx = -97;


	// add the total bg box manually
	var totalBg = d3.select('#total').insert('rect', ':first-child')
	.attr('id', '#totalBg')
	.attr('x', 35)
	.attr('y', 75)
	.attr('rx', 8)
	.attr('ry', 8)
	.attr('width', 351)
	.attr('height', 78)
	.attr('fill', '#FFF')
	.attr('opacity', 0.8)
	// .style('stroke', '#EBEBEB')

	function updateTotals(){

		var t = getTotals();

		if(t){
			var values = t.piedata;
			var totals = t.totals;
		} else {
			// return false;
			var values = [0,0,0,0,0,0];
			var totals = 0;
		}

		if(totalToggle==true){
			d3.select('#refval text').attr('text-anchor','end').text(addCommas(values[0]));
			d3.select('#asyval text').attr('text-anchor','end').text(addCommas(values[1]));
			d3.select('#idpval text').attr('text-anchor','end').text(addCommas(values[2]));
			d3.select('#retval text').attr('text-anchor','end').text(addCommas(values[3]));
			d3.select('#staval text').attr('text-anchor','end').text(addCommas(values[4]));
			d3.select('#othval text').attr('text-anchor','end').text(addCommas(values[5]));
		} else {
			d3.select('#refval text').attr('text-anchor','end').text(toPercent(values[0]/t.totals));
			d3.select('#asyval text').attr('text-anchor','end').text(toPercent(values[1]/t.totals));
			d3.select('#idpval text').attr('text-anchor','end').text(toPercent(values[2]/t.totals));
			d3.select('#retval text').attr('text-anchor','end').text(toPercent(values[3]/t.totals));
			d3.select('#staval text').attr('text-anchor','end').text(toPercent(values[4]/t.totals));
			d3.select('#othval text').attr('text-anchor','end').text(toPercent(values[5]/t.totals));
		}

		d3.select('#totaltop text').text(totalRound(totals));
		if(selectedCountry){

	    	d3.select('#total').style('opacity', 1);

			// get country name for selected year
			var ws = worldSimplified.filter(function (d,i){
		        return d.id == selectedCountry;
		    });

		    var yr = 2012;
		    if(selectedYear>2012){yr=2012;} else {
		    	yr = selectedYear;
		    };

		    ws = ws.filter(function(d) { return ((yr>=d.properties.startyear)&&(yr <=d.properties.endyear))});

		    if(ws.length == 0){

		    	d3.select('#total').style('opacity', 0.3);
				d3.select('#totalsub text').text('end of '+selectedYear);

		    	return false;
		    }
		    var name = ws[0].properties.name;

			d3.select('#totalsub text').text('in '+name+' - end of '+selectedYear);
		} else {
			d3.select('#totalsub text').text('globally - end of '+selectedYear);
		}

		// adjust total box poc x
		var bw2 = document.getElementById("totaltop").getBBox().width;

		var bwnew = bw-bw2-7;
		// if(!isNaN(bwnew)){
		d3.select("#totaltoppoc text:last-child").attr('x', function(d,i){
			return bw2 -160;
		});	
		// }

		// adjust totaltop bg size
		var totalsubWidth = document.getElementById("totalsub").getBBox().width;
		// var totalBgWidth = d3.select('#totalBg').node().getBBox().width;

		var textWidth = document.getElementById("totaltext").getBBox().width;

		if(totalBg){
			totalBg.attr('width',textWidth+23)
		}

	}

	// init poc text placement
	var bw2 = document.getElementById("totaltop").getBBox().width;
	d3.select("#totaltoppoc text:last-child").attr('x', function(d,i){
			return bw2 -160;
	});	

	//**************************
	// COUNTRY SELECT
	//**************************

	function countrySelect(iso){

		d3.select('#mapbg').style('cursor', 'pointer');

		if(zooming==false){

		if(selectedCountry==iso){
			countryDeselect();
			return false;
		} else {
			selectedCountry = iso;
		}

		// update data
		slider.update(selectedYear);
		columnChart.update({
			data: sliderData()
		});
		}

	};


	//**************************
	// COUNTRY DESELECT
	//**************************
	d3.select('#mapbg').on('click', function(d,i) {
		countryDeselect();
	});

	function countryDeselect(){

		d3.select('#mapbg').style('cursor', 'default');
		d3.select('#total').style('opacity', 1);
		if(zooming==false){
		selectedCountry = null;

		// update data
		slider.update(selectedYear);
		columnChart.update({
			data: sliderData()
		});

		countryHoverOff();
		}
	}


	//**************************
	// get country name by iso and year
	//**************************
	function setCountryName(iso){
		if(iso!=''){
		var ws = worldSimplified.filter(function (d,i){
	        return d.id == iso;
	    });

	    var yr = selectedYear;
		if(selectedYear>2012){yr=2012;};
		var ws = ws.filter(function(d) { 

			return ((yr>=d.properties.startyear)&&(yr <=d.properties.endyear))});

		var countryName = ws[0].properties.name;
			d3.select('#tooltipName').text(countryName)
		} else {

		}
		d3.select('#tooltip').style('display','block');
	}

	function unsetCountryName(){
		d3.select('#tooltip').style('display','none');
		worldLayer.style('fill', country.normal);
	}

	//**************************
	// FILTER BUTTONS
	//**************************

	// hide tooltips


	$(popTypes).each(function(i,d){
		var p = '#'+d.toLowerCase()+'_tooltip';
		var pt = d3.select(p).attr('opacity', 0).attr('filter', "url(#myGlow)");
		d3.select('#poptooltip').attr('transform','translate(0,140)')
	});




	d3.select('#selectall').style('display','none').style('cursor', 'pointer')
	.on('mouseover', function(){
		d3.selectAll('#selectallbg path:first-child')
		.style('fill', '#f3f3f3');
	})
	.on('mouseout', function(){
		d3.selectAll('#selectallbg path:first-child')
		.style('fill', '#FFF');
	})
	.on('click', function(){
		d3.select('#selectall').style('display','none');
		popSelected = ['REF','ASY','IDP','RET','STA','OTH'];
		slider.update(selectedYear);
		columnChart.update({
			data: sliderData()
		});
		d3.selectAll('.filterBtn').transition().duration(500).attr('opacity',0);
	})


	d3.selectAll('#ref,#asy,#idp,#ret,#sta,#oth')
	.attr('class','filterBtn')
	.style('fill-opacity', 1)
	.attr('opacity', 0)
	.style('cursor','pointer');

	d3.selectAll('#ref,#asy,#idp,#ret,#sta,#oth')
	.on('click',function(){

		d3.select('#selectall').style('display','none');

		var id = this.id.toUpperCase();
		// when all are selected
		if(popSelected.length==6){
			d3.selectAll('.filterBtn:not(#'+id+')').transition().duration(500).attr('opacity',0.6);
			d3.select('#'+id).attr('opacity',0);
			// remove selections from array
			popSelected = [id];
			slider.update(selectedYear);
		} else {

			if($.inArray( id, popSelected)== -1){
				// select additional
				popSelected.push(id);
				d3.select('#'+id).attr('opacity',0);
				slider.update(selectedYear);
			} else {
				// unselect additional
				var index = popSelected.indexOf(id);
				if (index > -1) {
				    popSelected.splice(index, 1);
				}
				d3.select('#'+id).transition().duration(500).attr('opacity',0.6);

				if(popSelected.length==0){
					popSelected = ['REF','ASY','IDP','RET','STA','OTH'];
					d3.selectAll('.filterBtn').transition().duration(500).attr('opacity',0);
				}
				slider.update(selectedYear);
			}		
		}

		if(popSelected.length<6){
			d3.select('#selectall').style('display','block');
		}

		columnChart.update({
			data: sliderData()
		});



	}).on('mouseover', function(){
		d3.select('#'+this.id+'hover path').style('stroke','#C0C0C0').style('stroke-width',1);
		d3.select('#'+this.id+'group path:first-child').style('stroke-width',2);
		// show tooltip group
		d3.select('#poptooltip')
		.transition()
		.delay(200)
		.duration(1100).attr('transform','translate(0,-2)');	
		
		// show individual tooltip
		d3.select('#'+this.id.toLowerCase()+'_tooltip')
		.transition()
		.delay(200)
		.duration(400)
		.attr('opacity',1);


	}).on('mouseout', function(){
		d3.select('#'+this.id+'hover path').style('stroke','#E0E0E0');
		d3.select('#'+this.id+'group path:first-child').style('stroke-width',1);
		// hide tooltip
		
		d3.select('#'+this.id.toLowerCase()+'_tooltip')
		.transition()
		.delay(0)
		.duration(400)
		.attr('opacity',0);

		d3.select('#poptooltip').transition().delay(1).duration(1).attr('transform','translate(0,140)');	

	});

var filter = svg.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 0)
    .attr("dy", 0)
    .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");



//**************************
// SOCIAL MEDIA
//**************************

var url = "http://bit.ly/1Pp7NTw";

d3.selectAll('#socialmedia > g')
.style('cursor', 'pointer')
.on('mouseover', function(){
	d3.select(this).select('g:first-child path').style('fill', '#414141')
})
.on('mouseout', function(){
	d3.select(this).select('g:first-child path').style('fill', 'rgb(150, 150, 150)')
});

d3.select('#socialmedia #facebook')
.on('click', function(){
	window.open("https://www.facebook.com/dialog/feed?app_id=694165360698061&link=http%3A%2F%2Fpopstats.unhcr.org&picture=http%3A%2F%2Fpopstats.unhcr.org%2Fdataviz%2Fimages%2Fthumbnail.jpg&name=UNHCR%20Statistics%20-%20The%20World%20in%20Numbers&caption=%20&description=Interactive%20data%20visualisation&redirect_uri=http%3A%2F%2Fwww.facebook.com%2F", "_blank");
});

d3.select('#socialmedia #twitter')
.on('click', function(){
	window.open("https://twitter.com/intent/tweet?url="+url+"&text=UNHCR%20Statistics%20-%20The%20World%20in%20Numbers%20@Refugees%20%23dataviz", "_blank");
});

d3.select('#socialmedia #pinterest')
.on('click', function(){
	window.open("http://pinterest.com/pin/create/button/?url="+url+"&media=http://popstats.unhcr.org/dataviz/images/thumbnail.jpg", "_blank");
});

d3.select('#socialmedia #googleplus')
.on('click', function(){
	window.open("https://plus.google.com/share?&hl=en&url="+url, "_blank");
});

d3.select('#socialmedia #embed')
.on('click', function(){
	console.log('click');
	d3.select('#embedframe').attr('transform', 'translate(0,200)');
});

d3.select('#embedclose')
.style('cursor', 'pointer')
.on('click', function(){
	d3.select('#embedframe').attr('transform', 'translate(0,-600)');
});

d3.select('#embedframe').attr('transform', 'translate(0,-600)');

	//********************
	// FRAME HANDLER
	//********************
	$('#framePrev, #leftButton').click(function(){
		var f = viz.prevFrame(1000);
		$('#lContent').scrollTop(0);
		updateSelect(f);
		$('#activeFrame').text(f);
	});
	
	$('#frameNext, #rightButton').click(function(){
		var f = viz.nextFrame(1000);
		$('#lContent').scrollTop(0);
		updateSelect(f);
		$('#activeFrame').text(f);
	});

    $('.selectFrame').on('click', function(){
        var id = $(this).attr('id');
        var text = $(this).text();
        viz.gotoFrame(id, 1000);
        $('#selectFrame .textlabel').text(text);
		$('#activeFrame').text(id);
    })

    function updateSelect(frame){
    	var text = $('#selectFrameDiv li:nth-child('+(frame)+')').text();
    	$('#selectFrame .textlabel').text(text);
    }

	viz.maxFrames(5);
	viz.gotoFrame(1,1);



	$(document).ready(function(){
		$("#loader").hide();

		var yearNow = new Date().getFullYear();
		d3.select("#copyrightYear tspan").text(yearNow);

		$(window).trigger('resize');
	});

});

	function toPercent(va){
		if(va==0){return '-'};
		return (va*100).toFixed(1)+'%'

	}

	function totalRound(v){

		if(v>1000000){
			v=(v/1000000).toFixed(2);
			if(v % 1 === 0){
				v = Math.round(v);
			}
			v = v+' million';
		} else {
			v = addCommas(v);
		}
		return v;
	}

	function addCommas(nStr){
		if(nStr==0){
			return '-';
		}
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