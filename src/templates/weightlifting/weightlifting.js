import React from 'react'
import Layout from '../../components/layout/layout'
import SEO from '../../utils/seo'
import { Scatter, defaults } from 'react-chartjs-2'
import { graphql } from 'gatsby'
import { Button } from 'semantic-ui-react'
import './button.min.css'
import './weightlifting.scss'

class Lifting extends React.Component {
  // Datasets
  squat = {
    label: 'Squat',
    fill: false,
    data: this.props.pageContext.squat,
    showLine: true,
    borderColor: 'darkorange',
  }
  deadlift = {
    label: 'Deadlift',
    fill: false,
    data: this.props.pageContext.deadlift,
    showLine: true,
    borderColor: 'darkmagenta',
  }
  row = {
    label: 'Pendlay Row',
    fill: false,
    data: this.props.pageContext.row,
    showLine: true,
    borderColor: 'darkcyan',
  }
  overhead = {
    label: 'Overhead Press',
    fill: false,
    data: this.props.pageContext.overhead,
    showLine: true,
    borderColor: 'red',
  }
  bench = {
    label: 'Bench Press',
    fill: false,
    data: this.props.pageContext.bench,
    showLine: true,
    borderColor: 'blue',
  }

  state = {
    data: [this.squat, this.deadlift, this.row, this.bench, this.overhead],
    currentlyShown: 0,
  }

  switchDataset = label => {
    switch (label) {
      case 1:
        this.setState({ data: [this.squat], currentlyShown: 1 })
        break
      case 2:
        this.setState({ data: [this.deadlift], currentlyShown: 2 })
        break
      case 3:
        this.setState({ data: [this.bench], currentlyShown: 3 })
        break
      case 4:
        this.setState({ data: [this.overhead], currentlyShown: 4 })
        break
      case 5:
        this.setState({ data: [this.row], currentlyShown: 5 })
        break
      default:
        this.setState({
          data: [
            this.squat,
            this.deadlift,
            this.row,
            this.bench,
            this.overhead,
          ],
          currentlyShown: 0,
        })
        break
    }
  }

  render() {
    defaults.global.defaultFontFamily = `-apple-system,'BlinkMacSystemFont','Segoe UI','Roboto','Helvetica','Arial',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'`
    defaults.global.defaultFontSize = 13
    defaults.global.responsive = true
    defaults.global.maintainAspectRatio = false

    const indexSeo = {
      title: `Weightlifting | ${this.props.data.site.siteMetadata.title}`,
      description: this.props.data.site.siteMetadata.description,
      image: this.props.data.site.siteMetadata.image,
      url: `${this.props.data.site.siteMetadata.siteUrl}/weightlifting/`,
      isBlogpost: false,
      twitter: this.props.data.site.siteMetadata.twitter,
    }

    const data = {
      datasets: this.state.data,
    }

    const options = {
      title: {
        display: true,
        text: 'Stronglifts 5x5',
        fontSize: 18
      },
      tooltips: {
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: function(tooltipItem, data) {
            return tooltipItem.yLabel + 'kg'
          },
          title: function(tooltipItem, data) {
            return data.datasets[tooltipItem[0].datasetIndex].label
          },
        },
        displayColors: false,
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              format: 'MM/DD/YYYY',
              tooltipFormat: 'll',
            },
            scaleLabel: {
              // display: true,
              labelString: 'Time',
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              // display: true,
              labelString: 'Weight',
            },
          },
        ],
      },
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
        },
      },
    }

    return (
      <Layout location={this.props.location}>
        <SEO {...indexSeo} />
        <div className="canvas-container">
          <Scatter data={data} options={options} />
        </div>
        <div className="button-group">
          <Button
            active={this.state.currentlyShown === 0}
            toggle
            onClick={() => this.switchDataset(0)}
          >
            All lifts
          </Button>
          <Button
            active={this.state.currentlyShown === 1}
            toggle
            onClick={() => this.switchDataset(1)}
          >
            Squat
          </Button>
          <Button
            active={this.state.currentlyShown === 2}
            toggle
            onClick={() => this.switchDataset(2)}
          >
            Deadlift
          </Button>
          <Button
            active={this.state.currentlyShown === 3}
            toggle
            onClick={() => this.switchDataset(3)}
          >
            Pendlay Row
          </Button>
          <Button
            active={this.state.currentlyShown === 4}
            toggle
            onClick={() => this.switchDataset(4)}
          >
            OH Press
          </Button>
          <Button
            active={this.state.currentlyShown === 5}
            toggle
            onClick={() => this.switchDataset(5)}
          >
            Bench Press
          </Button>
        </div>
      </Layout>
    )
  }
}

export default Lifting

export const pageQuery = graphql`
  query WeightliftingQuery {
    site {
      siteMetadata {
        title
        description
        image
        siteUrl
        twitter
      }
    }
  }
`
