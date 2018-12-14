// load data from file
var crimes = seasons;
var stats = scores;

function getScore(year) {
	return scores[year][0].FINAL;
}

function getMonthlyScore(month, year) {
	return scores[year][0][month];
}

function crime_rate_in(year, month) {
	return crimes[year][month]["AGG. ASSAULT"]
		+ crimes[year][month]["ASSAULT BY THREAT"]
		+ crimes[year][month]["COMMON ASSAULT"]
		+ crimes[year][month]["HOMICIDE"]
		+ crimes[year][month]["RAPE"];
}

function per_crime_rate_in(year, month, crime) {
	return crimes[year][month][crime];
}

// Compute average # of violent crimes per month for a given start month/year
// and end month/year
// Note : start and end year must be consecutive years! This works because a
// football season can occur in no more than two calendar years.
function avg_crime_per_month_in(start_year, start_month, end_year, end_month) {
	var crimes_per_month = [];
	for (var i = start_month; i < 12; i++) {
		var sum = crime_rate_in(start_year, i);
		crimes_per_month.push(sum);
  }
	if (start_year != end_year) {
		for (var i = 0; i <= end_month; i++) {
			var sum = crime_rate_in(end_year, i);
			crimes_per_month.push(sum);
		}
	}
	return average(crimes_per_month);
}

function average(arr) {
	var total = 0;
	for (var i = 0; i < arr.length; i++) {
			total += arr[i];
	}
	return total / arr.length;
}

// Calculate "crime rate" for each football Season
// where "crime rate" is defined by average number of
// violent crimes reported per month
var avg_crime_rate_by_year = {};
avg_crime_rate_by_year[2012] = avg_crime_per_month_in(2012, 8, 2013, 1);
avg_crime_rate_by_year[2013] = avg_crime_per_month_in(2013, 8, 2013, 11);
avg_crime_rate_by_year[2014] = avg_crime_per_month_in(2014, 8, 2015, 0);
avg_crime_rate_by_year[2015] = avg_crime_per_month_in(2015, 8, 2016, 0);
avg_crime_rate_by_year[2016] = avg_crime_per_month_in(2016, 8, 2017, 0);
avg_crime_rate_by_year[2017] = avg_crime_per_month_in(2017, 8, 2017, 11);

var all_years = [2012, 2013, 2014, 2015, 2016, 2017];

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//var color = Chart.helpers.color;

var yearlyOverview = {
	labels: ['2012', '2013', '2014', '2015', '2016', '2017'],
	datasets: [
		{
			label: 'Ravens season: % of games won',
			borderWidth: 2,
			fill: false,
			yAxisID: "season",
			data: [
				getScore(2012),
				getScore(2013),
				getScore(2014),
				getScore(2015),
				getScore(2016),
				getScore(2017)
			],
			borderWidth: 6,
			borderColor: "#ffcc00",
			pointBackgroundColor: "#ff9900",
			pointBorderColor: "#ffcc00",
			pointRadius: 7,
			pointBorderRadius: 6,
			pointHitRadius: 10,
			type: 'line',
			lineTension: 0
		},
		{
		label: 'Average crimes per month during NFL season',
		borderWidth: 1,
		yAxisID: "crimes",
		data: [
			avg_crime_rate_by_year[2012],
			avg_crime_rate_by_year[2013],
			avg_crime_rate_by_year[2014],
			avg_crime_rate_by_year[2015],
			avg_crime_rate_by_year[2016],
			avg_crime_rate_by_year[2017],
		],
		backgroundColor: "#282d91"
	}]
};

var monthly_datasets = {};
monthly_datasets[2012] = {
	labels: ['September', 'October', 'November', 'December', 'January', 'February'],
	datasets: [	{
		label: 'Ravens win/loss record during 2012 NFL season',
		borderWidth: 2,
		fill: false,
		yAxisID: "season",
		data: [
			getMonthlyScore("SEPTEMBER", 2012),
			getMonthlyScore("OCTOBER", 2012),
			getMonthlyScore("NOVEMBER", 2012),
			getMonthlyScore("DECEMBER", 2012),
			getMonthlyScore("JANUARY", 2012),
			getMonthlyScore("FEBRUARY", 2012),
		],
		borderWidth: 6,
		borderColor: "#ffcc00",
		pointBackgroundColor: "#ff9900",
		pointBorderColor: "#ffcc00",
		pointRadius: 7,
		pointBorderRadius: 6,
		pointHitRadius: 10,
		type: 'line',
		lineTension: 0
	},{
		label: '2012',
		backgroundColor: "#282d91",
		borderWidth: 1,
		fill: false,
		data: [
			crime_rate_in(2012, 8),
			crime_rate_in(2012, 9),
			crime_rate_in(2012, 10),
			crime_rate_in(2012, 11),
			crime_rate_in(2013, 0),
			crime_rate_in(2013, 1),
		],
	}]
};
monthly_datasets[2013] = {
	labels: ['September', 'October', 'November', 'December'],
	backgroundColor: "#282d91",
	datasets: [
	  {label: 'Ravens win/loss record during 2013 NFL season',
		borderWidth: 2,
		fill: false,
		yAxisID: "season",
		data: [
			getMonthlyScore("SEPTEMBER", 2013),
			getMonthlyScore("OCTOBER", 2013),
			getMonthlyScore("NOVEMBER", 2013),
			getMonthlyScore("DECEMBER", 2013),
		],
		borderWidth: 6,
		borderColor: "#ffcc00",
		pointBackgroundColor: "#ff9900",
		pointBorderColor: "#ffcc00",
		pointRadius: 7,
		pointBorderRadius: 6,
		pointHitRadius: 10,
		type: 'line',
		lineTension: 0
	},{
		label: '2013',
		borderWidth: 1,
		fill: false,
		backgroundColor: "#282d91",
		data: [
			crime_rate_in(2013, 8),
			crime_rate_in(2013, 9),
			crime_rate_in(2013, 10),
			crime_rate_in(2013, 11),
		],
	}]
}
monthly_datasets[2014] = {
	labels: ['September', 'October', 'November', 'December', 'January'],
	datasets: [
	  {label: 'Ravens win/loss record during 2014 NFL season',
		borderWidth: 2,
		fill: false,
		yAxisID: "season",
		data: [
			getMonthlyScore("SEPTEMBER", 2014),
			getMonthlyScore("OCTOBER", 2014),
			getMonthlyScore("NOVEMBER", 2014),
			getMonthlyScore("DECEMBER", 2014),
			getMonthlyScore("JANUARY", 2014)
		],
		borderWidth: 6,
		borderColor: "#ffcc00",
		pointBackgroundColor: "#ff9900",
		pointBorderColor: "#ffcc00",
		pointRadius: 7,
		pointBorderRadius: 6,
		pointHitRadius: 10,
		type: 'line',
		lineTension: 0
	},{
		label: '2014',
		borderWidth: 1,
		backgroundColor: "#282d91",
		fill: false,
		data: [
			crime_rate_in(2014, 8),
			crime_rate_in(2014, 9),
			crime_rate_in(2014, 10),
			crime_rate_in(2014, 11),
			crime_rate_in(2015, 0),
		],
	}]
}
monthly_datasets[2015] = {
	labels: ['September', 'October', 'November', 'December', 'January'],
	datasets: [{label: 'Ravens win/loss record during 2015 NFL season',
		borderWidth: 2,
		fill: false,
		yAxisID: "season",
		data: [
			getMonthlyScore("SEPTEMBER", 2015),
			getMonthlyScore("OCTOBER", 2015),
			getMonthlyScore("NOVEMBER", 2015),
			getMonthlyScore("DECEMBER", 2015),
			getMonthlyScore("JANUARY", 2015)
		],
		borderWidth: 6,
		borderColor: "#ffcc00",
		pointBackgroundColor: "#ff9900",
		pointBorderColor: "#ffcc00",
		pointRadius: 7,
		pointBorderRadius: 6,
		pointHitRadius: 10,
		type: 'line',
		lineTension: 0
	},{
		label: '2015',
		borderWidth: 1,
		backgroundColor: "#282d91",
		fill: false,
		data: [
			crime_rate_in(2015, 8),
			crime_rate_in(2015, 9),
			crime_rate_in(2015, 10),
			crime_rate_in(2015, 11),
			crime_rate_in(2016, 0),
		],
	}]
}
monthly_datasets[2016] = {
	labels: ['September', 'October', 'November', 'December', 'January'],
	datasets: [{label: 'Ravens win/loss record during 2016 NFL season',
		borderWidth: 2,
		fill: false,
		yAxisID: "season",
		data: [
			getMonthlyScore("SEPTEMBER", 2016),
			getMonthlyScore("OCTOBER", 2016),
			getMonthlyScore("NOVEMBER", 2016),
			getMonthlyScore("DECEMBER", 2016),
			getMonthlyScore("JANUARY", 2016)
		],
		borderWidth: 6,
		borderColor: "#ffcc00",
		pointBackgroundColor: "#ff9900",
		pointBorderColor: "#ffcc00",
		pointRadius: 7,
		pointBorderRadius: 6,
		pointHitRadius: 10,
		type: 'line',
		lineTension: 0
	},{
		label: '2016',
		borderWidth: 1,
		fill: false,
		backgroundColor: "#282d91",
		data: [
			crime_rate_in(2016, 8),
			crime_rate_in(2016, 9),
			crime_rate_in(2016, 10),
			crime_rate_in(2016, 11),
			crime_rate_in(2017, 0),
		],
	}]
}
monthly_datasets[2017] = {
	labels: ['September', 'October', 'November', 'December'],
	datasets: [{label: 'Ravens win/loss record during 2017 NFL season',
		borderWidth: 2,
		fill: false,
		yAxisID: "season",
		data: [
			getMonthlyScore("SEPTEMBER", 2017),
			getMonthlyScore("OCTOBER", 2017),
			getMonthlyScore("NOVEMBER", 2017),
			getMonthlyScore("DECEMBER", 2017),
			getMonthlyScore("JANUARY", 2017)
		],
		borderWidth: 6,
		borderColor: "#ffcc00",
		pointBackgroundColor: "#ff9900",
		pointBorderColor: "#ffcc00",
		pointRadius: 7,
		pointBorderRadius: 6,
		pointHitRadius: 10,
		type: 'line',
		lineTension: 0
	},{
		label: '2017',
		backgroundColor: "#282d91",
		borderWidth: 1,
		fill: false,
		data: [
			crime_rate_in(2017, 8),
			crime_rate_in(2017, 9),
			crime_rate_in(2017, 10),
			crime_rate_in(2017, 11),
		],
	}]
}


/// MONTHLY CHART: STACKED VERSION
var crime_colors = {
	"RAPE": "#98C926", 
	"HOMICIDE":  "#03B5AA", 
	"AGG. ASSAULT": "#7A306C", 
	"COMMON ASSAULT": "#0C1B33", 
	"ASSAULT BY THREAT": "#B2AA8E"
}


monthly_stacked = {};
monthly_stacked["2012"] = {
	labels: ['September', 'October', 'November', 'December', 'January', 'February'],
	datasets: [{label: 'Ravens win/loss record during 2012 NFL season',
		borderWidth: 2,
		fill: false,
		yAxisID: "season",
		data: [
			getMonthlyScore("SEPTEMBER", 2012),
			getMonthlyScore("OCTOBER", 2012),
			getMonthlyScore("NOVEMBER", 2012),
			getMonthlyScore("DECEMBER", 2012),
			getMonthlyScore("JANUARY", 2012),
			getMonthlyScore("FEBRUARY", 2012)
		],
		borderWidth: 6,
		borderColor: "#ffcc00",
		pointHoverBackgroundColor: "#ff9900",
		pointHoverBorderColor: "#ffcc00",
		pointHoverBorderWidth: 6,
		pointHoverRadius: 7,
		pointBackgroundColor: "#ff9900",
		pointBorderColor: "#ffcc00",
		pointRadius: 7,
		pointBorderRadius: 6,
		pointHitRadius: 10,
		type: 'line',
		lineTension: 0
	},{
		label: 'Murder',
		backgroundColor: crime_colors["HOMICIDE"],
		borderWidth: 1,
		stack: "murder",
		fill: false,
		data: [
			per_crime_rate_in(2012, 8, "HOMICIDE"),
			per_crime_rate_in(2012, 9, "HOMICIDE"),
			per_crime_rate_in(2012, 10, "HOMICIDE"),
			per_crime_rate_in(2012, 11, "HOMICIDE"),
			per_crime_rate_in(2013, 0, "HOMICIDE"),
			per_crime_rate_in(2013, 1, "HOMICIDE"),
		],
	},
	{
		label: 'Aggravated Assault',
		backgroundColor: crime_colors["AGG. ASSAULT"],
		borderWidth: 1,
		stack: "aggravated assault",
		fill: false,
		data: [
			per_crime_rate_in(2012, 8, "AGG. ASSAULT"),
			per_crime_rate_in(2012, 9, "AGG. ASSAULT"),
			per_crime_rate_in(2012, 10, "AGG. ASSAULT"),
			per_crime_rate_in(2012, 11, "AGG. ASSAULT"),
			per_crime_rate_in(2013, 0, "AGG. ASSAULT"),
			per_crime_rate_in(2013, 1, "AGG. ASSAULT"),
		],
	},
	{
		label: 'Common Assault',
		backgroundColor: crime_colors["COMMON ASSAULT"],
		borderWidth: 1,
		stack: "common assault",
		fill: false,
		data: [
			per_crime_rate_in(2012, 8, "COMMON ASSAULT"),
			per_crime_rate_in(2012, 9, "COMMON ASSAULT"),
			per_crime_rate_in(2012, 10, "COMMON ASSAULT"),
			per_crime_rate_in(2012, 11, "COMMON ASSAULT"),
			per_crime_rate_in(2013, 0, "COMMON ASSAULT"),
			per_crime_rate_in(2013, 1, "COMMON ASSAULT"),
		],
	},
	{
		label: 'Assault by Threat',
		backgroundColor: crime_colors["ASSAULT BY THREAT"],
		borderWidth: 1,
		stack: "assault by threat",
		fill: false,
		data: [
			per_crime_rate_in(2012, 8, "ASSAULT BY THREAT"),
			per_crime_rate_in(2012, 9, "ASSAULT BY THREAT"),
			per_crime_rate_in(2012, 10, "ASSAULT BY THREAT"),
			per_crime_rate_in(2012, 11, "ASSAULT BY THREAT"),
			per_crime_rate_in(2013, 0, "ASSAULT BY THREAT"),
			per_crime_rate_in(2013, 1, "ASSAULT BY THREAT"),
		],
	},
	{
		label: 'Rape',
		backgroundColor: crime_colors["RAPE"],
		borderWidth: 1,
		stack: "rape",
		fill: false,
		data: [
			per_crime_rate_in(2012, 8, "RAPE"),
			per_crime_rate_in(2012, 9, "RAPE"),
			per_crime_rate_in(2012, 10, "RAPE"),
			per_crime_rate_in(2012, 11, "RAPE"),
			per_crime_rate_in(2013, 0, "RAPE"),
			per_crime_rate_in(2013, 1, "RAPE"),
		],
	}]

}


monthly_stacked["2013"] = {
	labels: ['September', 'October', 'November', 'December'],
	datasets: [{label: 'Ravens win/loss record during 2017 NFL season',
		borderWidth: 2,
		fill: false,
		yAxisID: "season",
		data: [
			getMonthlyScore("SEPTEMBER", 2013),
			getMonthlyScore("OCTOBER", 2013),
			getMonthlyScore("NOVEMBER", 2013),
			getMonthlyScore("DECEMBER", 2013),
		],
		borderWidth: 6,
		borderColor: "#ffcc00",
		pointHoverBackgroundColor: "#ff9900",
		pointHoverBorderColor: "#ffcc00",
		pointHoverBorderWidth: 6,
		pointHoverRadius: 7,
		pointBackgroundColor: "#ff9900",
		pointBorderColor: "#ffcc00",
		pointRadius: 7,
		pointBorderRadius: 6,
		pointHitRadius: 10,
		type: 'line',
		lineTension: 0
	},{
		label: 'Murder',
		backgroundColor: crime_colors["HOMICIDE"],
		borderWidth: 1,
		stack: "murder",
		fill: false,
		data: [
			per_crime_rate_in(2013, 8, "HOMICIDE"),
			per_crime_rate_in(2013, 9, "HOMICIDE"),
			per_crime_rate_in(2013, 10, "HOMICIDE"),
			per_crime_rate_in(2013, 11, "HOMICIDE"),
		],
	},
	{
		label: 'Aggravated Assault',
		backgroundColor: crime_colors["AGG. ASSAULT"],
		borderWidth: 1,
		stack: "aggravated assault",
		fill: false,
		data: [
			per_crime_rate_in(2013, 8, "AGG. ASSAULT"),
			per_crime_rate_in(2013, 9, "AGG. ASSAULT"),
			per_crime_rate_in(2013, 10, "AGG. ASSAULT"),
			per_crime_rate_in(2013, 11, "AGG. ASSAULT"),
		],
	},
	{
		label: 'Common Assault',
		backgroundColor: crime_colors["COMMON ASSAULT"],
		borderWidth: 1,
		stack: "common assault",
		fill: false,
		data: [
			per_crime_rate_in(2013, 8, "COMMON ASSAULT"),
			per_crime_rate_in(2013, 9, "COMMON ASSAULT"),
			per_crime_rate_in(2013, 10, "COMMON ASSAULT"),
			per_crime_rate_in(2013, 11, "COMMON ASSAULT"),
		],
	},
	{
		label: 'Assault by Threat',
		backgroundColor: crime_colors["ASSAULT BY THREAT"],
		borderWidth: 1,
		stack: "assault by threat",
		fill: false,
		data: [
			per_crime_rate_in(2013, 8, "ASSAULT BY THREAT"),
			per_crime_rate_in(2013, 9, "ASSAULT BY THREAT"),
			per_crime_rate_in(2013, 10, "ASSAULT BY THREAT"),
			per_crime_rate_in(2013, 11, "ASSAULT BY THREAT"),
		],
	},
	{
		label: 'Rape',
		backgroundColor: crime_colors["RAPE"],
		borderWidth: 1,
		stack: "rape",
		fill: false,
		data: [
			per_crime_rate_in(2013, 8, "RAPE"),
			per_crime_rate_in(2013, 9, "RAPE"),
			per_crime_rate_in(2013, 10, "RAPE"),
			per_crime_rate_in(2013, 11, "RAPE"),
		],
	}]

}


monthly_stacked["2014"] = {
	labels: ['September', 'October', 'November', 'December', 'January'],
	datasets: [{label: 'Ravens win/loss record during 2014 NFL season',
		borderWidth: 2,
		fill: false,
		yAxisID: "season",
		data: [
			getMonthlyScore("SEPTEMBER", 2014),
			getMonthlyScore("OCTOBER", 2014),
			getMonthlyScore("NOVEMBER", 2014),
			getMonthlyScore("DECEMBER", 2014),
			getMonthlyScore("JANUARY", 2014),
		],
		borderWidth: 6,
		borderColor: "#ffcc00",
		pointHoverBackgroundColor: "#ff9900",
		pointHoverBorderColor: "#ffcc00",
		pointHoverBorderWidth: 6,
		pointHoverRadius: 7,
		pointBackgroundColor: "#ff9900",
		pointBorderColor: "#ffcc00",
		pointRadius: 7,
		pointBorderRadius: 6,
		pointHitRadius: 10,
		type: 'line',
		lineTension: 0
	},{
		label: 'Murder',
		backgroundColor: crime_colors["HOMICIDE"],
		borderWidth: 1,
		stack: "murder",
		fill: false,
		data: [
			per_crime_rate_in(2014, 8, "HOMICIDE"),
			per_crime_rate_in(2014, 9, "HOMICIDE"),
			per_crime_rate_in(2014, 10, "HOMICIDE"),
			per_crime_rate_in(2014, 11, "HOMICIDE"),
			per_crime_rate_in(2015, 0, "HOMICIDE"),
		],
	},
	{
		label: 'Aggravated Assault',
		backgroundColor: crime_colors["AGG. ASSAULT"],
		borderWidth: 1,
		stack: "aggravated assault",
		fill: false,
		data: [
			per_crime_rate_in(2014, 8, "AGG. ASSAULT"),
			per_crime_rate_in(2014, 9, "AGG. ASSAULT"),
			per_crime_rate_in(2014, 10, "AGG. ASSAULT"),
			per_crime_rate_in(2014, 11, "AGG. ASSAULT"),
			per_crime_rate_in(2015, 0, "AGG. ASSAULT"),
		],
	},
	{
		label: 'Common Assault',
		backgroundColor: crime_colors["COMMON ASSAULT"],
		borderWidth: 1,
		stack: "common assault",
		fill: false,
		data: [
			per_crime_rate_in(2014, 8, "COMMON ASSAULT"),
			per_crime_rate_in(2014, 9, "COMMON ASSAULT"),
			per_crime_rate_in(2014, 10, "COMMON ASSAULT"),
			per_crime_rate_in(2014, 11, "COMMON ASSAULT"),
			per_crime_rate_in(2015, 0, "COMMON ASSAULT"),
		],
	},
	{
		label: 'Assault by Threat',
		backgroundColor: crime_colors["ASSAULT BY THREAT"],
		borderWidth: 1,
		stack: "assault by threat",
		fill: false,
		data: [
			per_crime_rate_in(2014, 8, "ASSAULT BY THREAT"),
			per_crime_rate_in(2014, 9, "ASSAULT BY THREAT"),
			per_crime_rate_in(2014, 10, "ASSAULT BY THREAT"),
			per_crime_rate_in(2014, 11, "ASSAULT BY THREAT"),
			per_crime_rate_in(2015, 0, "ASSAULT BY THREAT"),
		],
	},
	{
		label: 'Rape',
		backgroundColor: crime_colors["RAPE"],
		borderWidth: 1,
		stack: "rape",
		fill: false,
		data: [
			per_crime_rate_in(2014, 8, "RAPE"),
			per_crime_rate_in(2014, 9, "RAPE"),
			per_crime_rate_in(2014, 10, "RAPE"),
			per_crime_rate_in(2014, 11, "RAPE"),
			per_crime_rate_in(2015, 0, "RAPE"),
		],
	}]

}


monthly_stacked["2015"] = {
	labels: ['September', 'October', 'November', 'December', 'January'],
	datasets: [{label: 'Ravens win/loss record during 2015 NFL season',
		borderWidth: 2,
		fill: false,
		yAxisID: "season",
		data: [
			getMonthlyScore("SEPTEMBER", 2015),
			getMonthlyScore("OCTOBER", 2015),
			getMonthlyScore("NOVEMBER", 2015),
			getMonthlyScore("DECEMBER", 2015),
			getMonthlyScore("JANUARY", 2015),
		],
		borderWidth: 6,
		borderColor: "#ffcc00",
		pointBackgroundColor: "#ff9900",
		pointHoverBackgroundColor: "#ff9900",
		pointHoverBorderColor: "#ffcc00",
		pointHoverBorderWidth: 6,
		pointHoverRadius: 7,
		pointBorderColor: "#ffcc00",
		pointRadius: 7,
		pointBorderRadius: 6,
		pointHitRadius: 10,
		type: 'line',
		lineTension: 0
	},{
		label: 'Murder',
		backgroundColor: crime_colors["HOMICIDE"],
		borderWidth: 1,
		stack: "murder",
		fill: false,
		data: [
			per_crime_rate_in(2015, 8, "HOMICIDE"),
			per_crime_rate_in(2015, 9, "HOMICIDE"),
			per_crime_rate_in(2015, 10, "HOMICIDE"),
			per_crime_rate_in(2015, 11, "HOMICIDE"),
			per_crime_rate_in(2016, 0, "HOMICIDE"),
		],
	},
	{
		label: 'Aggravated Assault',
		backgroundColor: crime_colors["AGG. ASSAULT"],
		borderWidth: 1,
		stack: "aggravated assault",
		fill: false,
		data: [
			per_crime_rate_in(2015, 8, "AGG. ASSAULT"),
			per_crime_rate_in(2015, 9, "AGG. ASSAULT"),
			per_crime_rate_in(2015, 10, "AGG. ASSAULT"),
			per_crime_rate_in(2015, 11, "AGG. ASSAULT"),
			per_crime_rate_in(2016, 0, "AGG. ASSAULT"),
		],
	},
	{
		label: 'Common Assault',
		backgroundColor: crime_colors["COMMON ASSAULT"],
		borderWidth: 1,
		stack: "common assault",
		fill: false,
		data: [
			per_crime_rate_in(2015, 8, "COMMON ASSAULT"),
			per_crime_rate_in(2015, 9, "COMMON ASSAULT"),
			per_crime_rate_in(2015, 10, "COMMON ASSAULT"),
			per_crime_rate_in(2015, 11, "COMMON ASSAULT"),
			per_crime_rate_in(2016, 0, "COMMON ASSAULT"),
		],
	},
	{
		label: 'Assault by Threat',
		backgroundColor: crime_colors["ASSAULT BY THREAT"],
		borderWidth: 1,
		stack: "assault by threat",
		fill: false,
		data: [
			per_crime_rate_in(2015, 8, "ASSAULT BY THREAT"),
			per_crime_rate_in(2015, 9, "ASSAULT BY THREAT"),
			per_crime_rate_in(2015, 10, "ASSAULT BY THREAT"),
			per_crime_rate_in(2015, 11, "ASSAULT BY THREAT"),
			per_crime_rate_in(2016, 0, "ASSAULT BY THREAT"),
		],
	},
	{
		label: 'Rape',
		backgroundColor: crime_colors["RAPE"],
		borderWidth: 1,
		stack: "rape",
		fill: false,
		data: [
			per_crime_rate_in(2015, 8, "RAPE"),
			per_crime_rate_in(2015, 9, "RAPE"),
			per_crime_rate_in(2015, 10, "RAPE"),
			per_crime_rate_in(2015, 11, "RAPE"),
			per_crime_rate_in(2016, 0, "RAPE"),
		],
	}]

}


monthly_stacked["2016"] = {
	labels: ['September', 'October', 'November', 'December', 'January'],
	datasets: [{label: 'Ravens win/loss record during 2016 NFL season',
		borderWidth: 2,
		fill: false,
		yAxisID: "season",
		data: [
			getMonthlyScore("SEPTEMBER", 2016),
			getMonthlyScore("OCTOBER", 2016),
			getMonthlyScore("NOVEMBER", 2016),
			getMonthlyScore("DECEMBER", 2016),
			getMonthlyScore("JANUARY", 2016),
		],
		borderWidth: 6,
		borderColor: "#ffcc00",
		pointBackgroundColor: "#ff9900",
		pointBorderColor: "#ffcc00",
		pointHoverBackgroundColor: "#ff9900",
		pointHoverBorderColor: "#ffcc00",
		pointHoverBorderWidth: 6,
		pointHoverRadius: 7,
		pointRadius: 7,
		pointBorderRadius: 6,
		pointHitRadius: 10,
		type: 'line',
		lineTension: 0
	},{
		label: 'Murder',
		backgroundColor: crime_colors["HOMICIDE"],
		borderWidth: 1,
		stack: "murder",
		fill: false,
		data: [
			per_crime_rate_in(2016, 8, "HOMICIDE"),
			per_crime_rate_in(2016, 9, "HOMICIDE"),
			per_crime_rate_in(2016, 10, "HOMICIDE"),
			per_crime_rate_in(2016, 11, "HOMICIDE"),
			per_crime_rate_in(2017, 0, "HOMICIDE"),
		],
	},
	{
		label: 'Aggravated Assault',
		backgroundColor: crime_colors["AGG. ASSAULT"],
		borderWidth: 1,
		stack: "aggravated assault",
		fill: false,
		data: [
			per_crime_rate_in(2016, 8, "AGG. ASSAULT"),
			per_crime_rate_in(2016, 9, "AGG. ASSAULT"),
			per_crime_rate_in(2016, 10, "AGG. ASSAULT"),
			per_crime_rate_in(2016, 11, "AGG. ASSAULT"),
			per_crime_rate_in(2017, 0, "AGG. ASSAULT"),
		],
	},
	{
		label: 'Common Assault',
		backgroundColor: crime_colors["COMMON ASSAULT"],
		borderWidth: 1,
		stack: "common assault",
		fill: false,
		data: [
			per_crime_rate_in(2016, 8, "COMMON ASSAULT"),
			per_crime_rate_in(2016, 9, "COMMON ASSAULT"),
			per_crime_rate_in(2016, 10, "COMMON ASSAULT"),
			per_crime_rate_in(2016, 11, "COMMON ASSAULT"),
			per_crime_rate_in(2017, 0, "COMMON ASSAULT"),
		],
	},
	{
		label: 'Assault by Threat',
		backgroundColor: crime_colors["ASSAULT BY THREAT"],
		borderWidth: 1,
		stack: "assault by threat",
		fill: false,
		data: [
			per_crime_rate_in(2016, 8, "ASSAULT BY THREAT"),
			per_crime_rate_in(2016, 9, "ASSAULT BY THREAT"),
			per_crime_rate_in(2016, 10, "ASSAULT BY THREAT"),
			per_crime_rate_in(2016, 11, "ASSAULT BY THREAT"),
			per_crime_rate_in(2017, 0, "ASSAULT BY THREAT"),
		],
	},
	{
		label: 'Rape',
		backgroundColor: crime_colors["RAPE"],
		borderWidth: 1,
		stack: "rape",
		fill: false,
		data: [
			per_crime_rate_in(2016, 8, "RAPE"),
			per_crime_rate_in(2016, 9, "RAPE"),
			per_crime_rate_in(2016, 10, "RAPE"),
			per_crime_rate_in(2016, 11, "RAPE"),
			per_crime_rate_in(2017, 0, "RAPE"),
		],
	}]

}


monthly_stacked["2017"] = {
	labels: ['September', 'October', 'November', 'December'],
	datasets: [{label: 'Ravens win/loss record during 2017 NFL season',
		borderWidth: 2,
		fill: false,
		yAxisID: "season",
		data: [
			getMonthlyScore("SEPTEMBER", 2017),
			getMonthlyScore("OCTOBER", 2017),
			getMonthlyScore("NOVEMBER", 2017),
			getMonthlyScore("DECEMBER", 2017),
			getMonthlyScore("JANUARY", 2017)
		],
		borderWidth: 6,
		borderColor: "#ffcc00",
		pointBackgroundColor: "#ff9900",
		pointBorderColor: "#ffcc00",
		pointHoverBackgroundColor: "#ff9900",
		pointHoverBorderColor: "#ffcc00",
		pointHoverBorderWidth: 6,
		pointHoverRadius: 7,
		pointRadius: 7,
		pointBorderRadius: 6,
		pointHitRadius: 10,
		type: 'line',
		lineTension: 0
	},{
		label: 'Murder',
		backgroundColor: crime_colors["HOMICIDE"],
		borderWidth: 1,
		stack: "murder",
		fill: false,
		data: [
			per_crime_rate_in(2017, 8, "HOMICIDE"),
			per_crime_rate_in(2017, 9, "HOMICIDE"),
			per_crime_rate_in(2017, 10, "HOMICIDE"),
			per_crime_rate_in(2017, 11, "HOMICIDE"),
		],
	},
	{
		label: 'Aggravated Assault',
		backgroundColor: crime_colors["AGG. ASSAULT"],
		borderWidth: 1,
		stack: "aggravated assault",
		fill: false,
		data: [
			per_crime_rate_in(2017, 8, "AGG. ASSAULT"),
			per_crime_rate_in(2017, 9, "AGG. ASSAULT"),
			per_crime_rate_in(2017, 10, "AGG. ASSAULT"),
			per_crime_rate_in(2017, 11, "AGG. ASSAULT"),
		],
	},
	{
		label: 'Common Assault',
		backgroundColor: crime_colors["COMMON ASSAULT"],
		borderWidth: 1,
		stack: "common assault",
		fill: false,
		data: [
			per_crime_rate_in(2017, 8, "COMMON ASSAULT"),
			per_crime_rate_in(2017, 9, "COMMON ASSAULT"),
			per_crime_rate_in(2017, 10, "COMMON ASSAULT"),
			per_crime_rate_in(2017, 11, "COMMON ASSAULT"),
		],
	},
	{
		label: 'Assault by Threat',
		backgroundColor: crime_colors["ASSAULT BY THREAT"],
		borderWidth: 1,
		stack: "assault by threat",
		fill: false,
		data: [
			per_crime_rate_in(2017, 8, "ASSAULT BY THREAT"),
			per_crime_rate_in(2017, 9, "ASSAULT BY THREAT"),
			per_crime_rate_in(2017, 10, "ASSAULT BY THREAT"),
			per_crime_rate_in(2017, 11, "ASSAULT BY THREAT"),
		],
	},
	{
		label: 'Rape',
		backgroundColor: "#040000",
		borderWidth: 1,
		stack: "rape",
		fill: false,
		data: [
			per_crime_rate_in(2017, 8, "RAPE"),
			per_crime_rate_in(2017, 9, "RAPE"),
			per_crime_rate_in(2017, 10, "RAPE"),
			per_crime_rate_in(2017, 11, "RAPE"),
		],
	}]
}





