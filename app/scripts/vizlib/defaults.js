var defaultOptions = {};
var defaultColors = ['#618784', '#00937F', 'purple'];

var globalDefaults = {};

globalDefaults.font = {
	family: "'Open Sans', sans-serif"
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

