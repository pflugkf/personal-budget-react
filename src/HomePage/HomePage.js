import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Chart } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import * as d3 from "d3";

function HomePage() {
  const [budgetData, setData] = useState({ datasets: [] });

  let data = [];
  let labels = [];

  useEffect(() => {
    axios
      .get("http://localhost:3000/budget")
      .then((res) => {
        const jsonData = res.data.myBudget;

        for (var i = 0; i < jsonData.length; i++) {
          labels.push(jsonData[i].title);
          data.push(jsonData[i].budget);
        }

        setData({
          datasets: [
            {
              data: data,
              backgroundColor: [
                "#ffcd56",
                "#ff6384",
                "#36a2eb",
                "#fd6b19",
                "#99ff66",
                "#cc33ff",
                "#b3b3b3",
              ],
            },
          ],
          labels: labels,
        });

        makeD3Chart(jsonData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const d3Container = useRef(null);

  function makeD3Chart(chartData) {
    d3.select("svg").remove();
    
    const svg = d3.select("body").append("svg").append("g");
    // const svg = d3.select(d3Container.current).append("g");

    svg.append("g").attr("class", "slices");
    svg.append("g").attr("class", "labels");
    svg.append("g").attr("class", "lines");

    var width = 270, //960
      height = 142.5, //450
      radius = Math.min(width, height) / 2;

    const backgroundColors = [
      "#ffcd56",
      "#ff6384",
      "#36a2eb",
      "#fd6b19",
      "#99ff66",
      "#cc33ff",
      "#b3b3b3",
    ];

    var pie = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return d.budget;
      });

    var arc = d3
      .arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var key = function (d) {
      return d.data.title;
    };

    var color = d3.scaleOrdinal().domain(labels).range(backgroundColors);

    //------- PIE SLICES -------
    var slice = svg
      .select(".slices")
      .selectAll("path.slice")
      .data(pie(chartData), key);

    slice
      .enter()
      .insert("path")
      .style("fill", function (d) {
        return color(d.data.title);
      })
      .attr("class", "slice")
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          return arc(interpolate(t));
        };
      });

    slice.exit().remove();

    //------- TEXT LABELS -------

    var text = svg.select(".labels").selectAll("text").data(pie(chartData), key);

    text
      .enter()
      .append("text")
      .attr("dy", ".35em")
      .text(function (d) {
        return d.data.title;
      })
      .transition()
      .duration(1000)
      .attrTween("transform", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          var d2 = interpolate(t);
          var pos = outerArc.centroid(d2);
          pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return "translate(" + pos + ")";
        };
      })
      .styleTween("text-anchor", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          var d2 = interpolate(t);
          return midAngle(d2) < Math.PI ? "start" : "end";
        };
      });

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text.exit().remove();

    //------- SLICE TO TEXT POLYLINES -------

    var polyline = svg
      .select(".lines")
      .selectAll("polyline")
      .data(pie(chartData), key);

    polyline.enter()
      .append("polyline")
      .transition()
      .duration(1000)
      .attrTween("points", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          var d2 = interpolate(t);
          var pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2), pos];
        };
      });

    polyline.exit().remove();
  }

  return (
    <main className="center" id="main">
      <section className="page-area, center">
        <h2>About the App</h2>

        <article>
          <h3>Stay on track</h3>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h3>Alerts</h3>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h3>Results</h3>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          <h3>Free</h3>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </article>

        <article>
          <h3>Stay on track</h3>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h3>Alerts</h3>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h3>Results</h3>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          <h3>Chart</h3>

          <div>
            {/* <canvas id="myChart" width="400" height="400"></canvas> */}
            <Pie
              // type='pie'
              data={budgetData}
            />
            <figcaption>Pie chart showing budget savings</figcaption>
          </div>
        </article>
      </section>
      {/* <svg className="d3-container" ref={d3Container}></svg> */}
    </main>
  );
}

export default HomePage;
