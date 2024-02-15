import React from "react";

function HomePage() {
  function test() {
    for (var i = 0; i < 10; i++) {
      console.log(i);
    }
  }
  
  return (
    <main className="center" id="main">
      <script>test();</script>
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

          <figure>
            <canvas id="myChart" width="400" height="400"></canvas>
            <figcaption>Pie chart showing budget savings</figcaption>
          </figure>
        </article>
      </section>
    </main>
  );
}

export default HomePage;
