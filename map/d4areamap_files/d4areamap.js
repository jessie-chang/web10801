function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}

$(document).ready(function () {

    //    Computing county population and density
    var density;
    d3.json("density.json", function (ddata) {
        ddata.shift();
        ddata.splice(-2, 2);
        //        console.log(ddata);
        density = d3.nest()
            .key(function (d) {
                return d.site_id.substr(0, 3);
            })
            .rollup(function (d) {
                var p = d3.sum(d, function (g) {
                    return type(g.people_total);
                });
                var a = d3.sum(d, function (g) {
                    return type(g.area);
                });
                return {
                    count: d.length,
                    area: a,
                    population: p,
                    density: p / a
                };
            })
            .map(ddata);
        console.log(density);
    });


    //  Mapping the population density
    d3.json("county_moi.json", function (topodata) {

        // get topodata to features
        var features = topojson.feature(topodata, topodata.objects.COUNTY_MOI_1081121).features;

        // map project: cannot be modified
        var prj = function (v) {
            var ret = d3.geo.mercator().center([122, 23.25]).scale(6000)(v);
            return [ret[0], ret[1]];
        };
        var path = d3.geo.path().projection(prj);

        // Mapping color
        var color = d3.scale.sqrt().domain([0, 10000]).range(["#090", "#f00"]);

        // Mapping county density to map
        for (idx = 0; idx < features.length; idx++) {
            features[idx].density = density[features[idx].properties.COUNTYNAME].density;
        }

        // Drawing path
        d3.select("#map_container svg")
            .selectAll("path")
            .data(features)
            .enter()
            .append("path")
            .attr({
                "d": path,
                "id": function (d) {
                    return d.properties.COUNTYNAME;
                },
                "fill": function (d) {
                    return color(d.density);
                }
            });

        d3.select("#town svg").attr("width", 300).selectAll("g").data(features).enter()

    });


    $('.story').waypoint(function () {
        $('#map_container svg path').css({
            "opacity": 0.5,
            "transition": "filter 1s"
        });
        var selected = '#map_container svg path#' + $(this.element).attr("id");
        $(selected).css({
            "opacity": 1.0,
            "transition": "filter 1s"
        });
    }, {
        offset: '30%', // middle of the page
        triggerOnce: true // just my preference...
    });

});
