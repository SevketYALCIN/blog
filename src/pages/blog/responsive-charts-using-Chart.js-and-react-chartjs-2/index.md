---
title: "Responsive charts using Chart.js and react-chartjs-2"
date: "2018-10-11"
tags: ["React", "Chart.js", "Responsive"]
---

I have been testing and comparing a few charting libraries lately to use for [a new page featuring charts]("https://sevketyalcin.com/weightlifting/" "Weightlifting | Sevket Yalcin") on this website. 
In the end, I have decided to use [Chart.js]("http://www.chartjs.org/" "Chart.js official website") because the charts are better looking, the animations are smooth, the documentation is really good and my overall experience was pleasant. The [react-chart-js-2]("https://github.com/jerairrest/react-chartjs-2" "react-chartjs-2 Github Page") wrapper even made it easier to build charts.
So I decided to make this quick tutorial where we will build a simple responsive linear chart using `chart.js` and `react-chartjs-2`.

## Installation
First, let's generate a CRA project.
```
npx create-react-app react-chartjs-tutorial
cd react-chartjs-tutorial
```
And then add `Chart.js` and `react-chartjs-2`.
```
yarn add react-chartjs-2 chart.js
```
## Building a linear chart
Cleaning first, let's remove the CSS in the `App.css` file, clear the header HTML content inside the `App.js` file. Then, add a title inside the header tag and an article tag with a `canvas-container` class after the header.
```jsx
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Responsive Linear chart using Chart.js</h1>
        </header>
        <article className="canvas-container">
          
        </article>
      </div>
    );
  }
}

export default App;
```
Now, import the `Line` component from `react-chartjs-2` and add it inside our article tag.
```jsx
import React, { Component } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Responsive Linear chart using Chart.js</h1>
        </header>
        <article className="canvas-container">
          <Line />
        </article>
      </div>
    );
  }
}

export default App;
```
An empty chart should be rendered since we did not specify the `data` props to our `Line` component yet. 

The `data` props contains two arrays:

- `labels`, which is the array containing our labels, X axis values.
- `datasets`, which is an array of `Dataset` objects containing the properties of a line such as the Y axis data, line color, etc. You can find all the `Dataset` properties [here]("http://www.chartjs.org/docs/latest/charts/line.html#dataset-properties" "Chart.js Dataset object documentation").

Let's create fake sample data and give it to our component.
```jsx
import React, { Component } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';

class App extends Component {
  render() {
    const data = {
      labels: [
        '10/04/2018', '10/05/2018', 
        '10/06/2018', '10/07/2018', 
        '10/08/2018', '10/09/2018', 
        '10/10/2018', '10/11/2018', 
        '10/12/2018', '10/13/2018', 
        '10/14/2018', '10/15/2018'
      ],
      datasets: [
        {
          label: 'Temperature',
          data: [22,19,27,23,22,24,17,25,23,24,20,19],
          fill: false,          // Don't fill area under the line
          borderColor: 'green'  // Line color
        }
      ]
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Responsive Linear chart using Chart.js</h1>
        </header>
        <article className="canvas-container">
          <Line data={data}/>
        </article>
      </div>
    );
  }
}

export default App;
```
You should now be able to see a green line.
## Making it responsive
For our chart to be responsive, we need two things:
- It has to be inside a fixed-height container.
- The options have to be changed to disable the `maintainAspectRatio` option set to `true` by default.

First, let's specify a fixed height for our container inside our `App.css` file.
```css
.canvas-container {
  height: 60vh;
}
```
And then, let's specify new options to our `Line` component.
```jsx
import React, { Component } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';

class App extends Component {
  render() {
    const data = {
      labels: [
        '10/04/2018', '10/05/2018', 
        '10/06/2018', '10/07/2018', 
        '10/08/2018', '10/09/2018', 
        '10/10/2018', '10/11/2018', 
        '10/12/2018', '10/13/2018', 
        '10/14/2018', '10/15/2018'
      ],
      datasets: [
        {
          label: 'Temperature',
          data: [22,19,27,23,22,24,17,25,23,24,20,19],
          fill: false,          // Don't fill area under the line
          borderColor: 'green'  // Line color
        }
      ]
    }

    const options = {
      responsive: true,				// Make it responsive
      maintainAspectRatio: false	// Don't maintain w/h ratio
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Responsive Linear chart using Chart.js</h1>
        </header>
        <article className="canvas-container">
          <Line data={data} options={options}/>
        </article>
      </div>
    );
  }
}

export default App;
```
We now have a responsive chart which will adapt itself according to the width.

It is worth noting that the `maintainAspectRatio` and the `responsive` options can be specified globally and be applied to every chart by importing the `defaults` object from `react-chartjs-2` and changing the global values.
```jsx
import React, { Component } from 'react';
import './App.css';
import { Line, defaults } from 'react-chartjs-2';

defaults.global.responsive = true
defaults.global.maintainAspectRatio = false

class App extends Component {
  render() {
    const data = {
      labels: [
        '10/04/2018', '10/05/2018', 
        '10/06/2018', '10/07/2018', 
        '10/08/2018', '10/09/2018', 
        '10/10/2018', '10/11/2018', 
        '10/12/2018', '10/13/2018', 
        '10/14/2018', '10/15/2018'
      ],
      datasets: [
        {
          label: 'Temperature',
          data: [22,19,27,23,22,24,17,25,23,24,20,19],
          fill: false,          // Don't fill area under the line
          borderColor: 'green'  // Line color
        }
      ]
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Responsive Linear chart using Chart.js</h1>
        </header>
        <article className="canvas-container">
          <Line data={data} />
        </article>
      </div>
    );
  }
}

export default App;
```
# Conclusion
That's it, thanks for reading. If you have any question or if something seems off, please leave a comment below.