const puppeteer = require('puppeteer')
export async function BarChart(data: any[]): Promise<string | Buffer> {
	var _html = `<!-- Styles -->
	<style>
	#chartdiv {
	  width: 100%;
	  height: 500px;
	}
	</style>
	
	<!-- Resources -->
	<script src="https://cdn.amcharts.com/lib/4/core.js"></script>
	<script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
 
	
	<!-- Chart code -->
	<script>
	am4core.ready(function() {
	
	// Add data
	chart.data = ${JSON.stringify(data)}
	
	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "status_perkawinan";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.minGridDistance = 30;
	categoryAxis.renderer.labels.template.horizontalCenter = "right";
	categoryAxis.renderer.labels.template.verticalCenter = "middle";
	categoryAxis.renderer.labels.template.rotation = 270;
	categoryAxis.tooltip.disabled = true;
	categoryAxis.renderer.minHeight = 110;
	
	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.minWidth = 50;
	
	// Create series
	var series = chart.series.push(new am4charts.ColumnSeries());
	series.sequencedInterpolation = true;
	series.dataFields.valueY = "jumlah";
	series.dataFields.categoryX = "status_perkawinan";
	series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
	series.columns.template.strokeWidth = 0;
	
	series.tooltip.pointerOrientation = "vertical";
	
	series.columns.template.column.cornerRadiusTopLeft = 10;
	series.columns.template.column.cornerRadiusTopRight = 10;
	series.columns.template.column.fillOpacity = 0.8;
	
	// on hover, make corner radiuses bigger
	var hoverState = series.columns.template.column.states.create("hover");
	hoverState.properties.cornerRadiusTopLeft = 0;
	hoverState.properties.cornerRadiusTopRight = 0;
	hoverState.properties.fillOpacity = 1;
	
	series.columns.template.adapter.add("fill", function(fill, target) {
	  return chart.colors.getIndex(target.dataItem.index);
	});
	
 
	
	}); // end am4core.ready()
	</script>
	
	<!-- HTML -->
	<div id="chartdiv"></div>	
	`
	 
	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()
	await page.setDefaultNavigationTimeout(0)
	await page.setContent(_html, { waitUntil: 'load' })
	const element = await page.$('div')
	var x = await element.screenshot({ omitBackground: true, encoding: "base64" })
	//await browser.close()

	return x

}