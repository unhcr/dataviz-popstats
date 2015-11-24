var defaultOptions = {};
var defaultColors = ['#618784', '#00937F', 'purple'];

var globalDefaults = {};

globalDefaults.font = {
	family: "'Open Sans', sans-serif"
}


defaultOptions.subsvg = {
	'appendTo': 'svg', 
	'id':'subsvg',
	'x': 20,
	'y': 170, 
	'width': 1460,
	'height': 525,
	'frame': 1
};

defaultOptions.slider = {
	thisClass: 'slider',
	id: "slider1",
	opacity: 1,
	x: 50,
	y: 0,
	fade: 0,
	delay: 0,
	height: 50,
	width: 500,
	labelPosition: 'top',
	defaultValue: 2004,	
	data: ['2001','2002','2003','2004','2005'],
	stroke: '#888888',
	handleStroke: '#999999',
	snap: false
}

defaultOptions.pie = {
	id: "pie1",
	opacity: 1,
	x: 0,
	y: 0,
	fade: 0,
	delay: 0,
	data: [5, 3],
	innerRadius: 0.4,
	innerBorder: true,
	enableText: false,
	fontSize: '30px',
	titleFontSize: '30px',
	subtitleFontSize: '13px',
	radius: 150,
	color: defaultColors,
	width: 300,
	legend: {
		enabled: true,
		position: 'top'
	},
	seriesNames: ['series 1', 'series 2'],
	units: '',	
	title: '',
	subtitle: '',
	font: {
		title: {
			size: '20px',
			weight: 'bold',
			family: globalDefaults.font.family
		},
		subtitle: {
			size: '12px',
			weight: 'normal',
			family: globalDefaults.font.family
		},
		piePercent: {
			size: '20px',
			weight: 'bold',
			family: globalDefaults.font.family
		}
	}
};

defaultOptions.map = {};

defaultOptions.map.addPies = {
	color: defaultColors

};

defaultOptions.columnChart = {
	appendTo: 'svg',
	id: 'columnChart1',
	opacity: 1,
	gutter: 0.3,
	x: 20,
	y: 735,
	width: 1460,
	height: 120,
	color: defaultColors,
	maxValue: 'auto', // integerValue (force define the maximum), 'auto' (find the maximum value in the data), 'rounder' (pretty rounding based on maximum value in the data)
	paddingLeft: 0,
	dataLabels: {
		enabled: true,
		font: {
			size: '12px',
			weight: 'normal',
			family: 'Lato',
			padding: 6
		}
	},
	yAxis: {
		enabled: false,
		label: '',
		gridlines: {
			enabled: true,
			stroke: 'grey',
			strokeWidth: 1,
			opacity: 0.1
		},
		font: {
			values: {
				size: '12px',
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
		enabled: true,
		label: 'Years',
		gridlines: {
			enabled: true,
			color: 'grey',
			opacity: 1
		},
		gridlines: {
			enabled: true,
			stroke: '#000',
			strokeWidth: 1,
			opacity: 0.3
		},
		font: {
			values: {
				size: '16px',
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
	data: [
			{"series": "Cats", "values": [150,50,50]}, 
			{"series": "Dogs", "values": [1000,50]},
			{"series": "Mice", "values": [50,50]},
			{"series": "Lions", "values": [20,150]},			
			{"series": "Dogs2", "values": [100,50]},
			{"series": "Mice3", "values": [50,50]},
			{"series": "Lions4", "values": [20,150,40]},			
			{"series": "Dogs5", "values": [100,50]},
			{"series": "Mice6", "values": [50,50]},
			{"series": "Lions7", "values": [20,150]},
			{"series": "Dogs11", "values": [100,50]},
			{"series": "Mice12", "values": [50,50]},
			{"series": "Lions13", "values": [20,150,40]},			
			{"series": "Dogs14", "values": [100,50]},
			{"series": "Mice15", "values": [50,50]},
			{"series": "Lions16", "values": [20,150]},
	],
	frame: [1]
};