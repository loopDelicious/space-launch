import React, { Component } from 'react';
import '../css/calendar.css';
import * as d3 from 'd3';

class Calendar extends Component {

    makeCalendar = (jsonData) => {

        // https://bl.ocks.org/mbostock/4063318

        let width = 960,
        height = 136,
        cellSize = 17;

        let formatPercent = d3.format(".1%");

        let color = d3.scaleQuantize()
            .domain([-0.05, 0.05])
            .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]);

        let svg = d3.select("body")
            .selectAll("svg")
            .data(d3.range(2006, 2017))
            .enter().append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

        svg.append("text")
            .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .text(function(d) { return d; });

        let rect = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#ccc")
            .selectAll("rect")
            .data(function(d) { return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
            .enter().append("rect")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("x", function(d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
            .attr("y", function(d) { return d.getDay() * cellSize; })
            .datum(d3.timeFormat("%Y-%m-%d"));

        svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .selectAll("path")
            .data(function(d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
            .enter().append("path")
            .attr("d", pathMonth);


        let data = d3.nest()
            .key(function(d) { return d.Date; })
            .rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
            .object(jsonData);

        rect.filter(function(d) { return d in data; })
            .attr("fill", function(d) { return color(data[d]); })
            .append("title")
            .text(function(d) { return d + ": " + formatPercent(data[d]); });

        function pathMonth(t0) {
            let t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
                d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
                d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
            return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
                + "H" + w0 * cellSize + "V" + 7 * cellSize
                + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
                + "H" + (w1 + 1) * cellSize + "V" + 0
                + "H" + (w0 + 1) * cellSize + "Z";
        }
    };

    componentDidMount = () => {

        // https://github.com/r-spacex/SpaceX-API

        const myHeaders = new Headers();

        const myInit = { method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default' };

        window.fetch('https://api.spacexdata.com/v1/launches', myInit)
            .then(response => response.json())
            .then(resJson => {
                if(resJson) {
                    console.log('spacex ', resJson);
                    this.makeCalendar(resJson);
                }
            })
            .catch(() => {
                throw new Error('Network response was not ok.');
            });



    };

    render() {
        return (

            <div className="width calendar">
                <div className="section">
                    <h2>Calendar title</h2>
                    <p>Calendar text</p>
                    <svg id="calendar-svg" />
                </div>

            </div>

        );
    }
}

export default Calendar;
