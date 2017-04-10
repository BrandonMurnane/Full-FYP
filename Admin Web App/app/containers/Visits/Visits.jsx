import React from 'react';
import fusioncharts from 'fusioncharts';
// Load the charts module
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import _ from 'lodash';
import humanizeDuration from 'humanize-duration';
import './Visits.css';

// Pass fusioncharts as a dependency of charts
charts(fusioncharts);

export default class Visits extends React.Component {
  static propTypes = {
    requests: React.PropTypes.object
  };

  // set state for selecting a bar and changing from booth to event
  constructor(){
    super();
    this.state = {
      selectedBar: null,
      event: false
    };
    this.selectBar = this.selectBar.bind(this);
    this.clicked = this.clicked.bind(this);
  }

  clicked(){
    this.setState({ event: !this.state.event });
    // this is to rehide the usergroups piechart and average visit time
    this.setState({ selectedBar: null });
  }

  selectBar(bar){
    this.setState({ selectedBar: bar });
  }

  render() {
    const { visits } = this.props.requests;
    // keep this reference to use selectbar inside dataplotclick
    const that = this;

    // If visit request is pending and not refreshing, so loader icon
    if ((!visits.isCompleted && !visits.isRefreshing)) {
      return (
        <div className='slds-spinner--large'>
          <img src='/images/spinners/slds_spinner_brand.gif' alt='Loading...' />
        </div>
      );
    }
    let barData;
    // Seperating out data from visit

    const userGroups = _.uniq(visits.value.map((visit) => visit.UserGroupKey));

    const booths = _.uniq(visits.value.map((visit) => visit.booth));

    const events = _.uniq(visits.value.map((visit) => visit.event));

    // Checks if event or booth selected and shows whichever is chosen
    if (this.state.event){
      // reset after button clicked
      barData = [];

      events.map((event)=> {
        // check if event is both the same and not null and put in the data
        const visitsPerEvent = visits.value.filter((visit) => visit.event === event && visit.event !== null).length;
        barData.push({ label: event, value: visitsPerEvent });
      });
    } else {
      // reset after button clicked
      barData = [];

      booths.map((booth)=> {
        // check if booth is both the same and not null and put in the data
        const visitsPerBooth = visits.value.filter((visit) => visit.booth === booth).length;
        barData.push({ label: booth, value: visitsPerBooth });
      });
    }

    // set the dataname based on which is selected
    const dataName = this.state.event ? 'Event':'Booth';
    // setup bar chart
    const barDataSource = {
      chart: {
        caption: dataName+'Visits',
        subCaption: 'Click a Bar for a breakdown of specific data on that bar',
        'showBorder': '0',
        'bgAlpha': '0',
        'paletteColors': '#008ee4',
        'useplotgradientcolor': '0'
      },
      data: barData
    };

    const barChartConfigs = {
      id: dataName+'-chart',
      renderAt: 'Bar-chart-container',
      type: 'column2d',
      width: '100%',
      height: 400,
      dataFormat: 'json',
      dataSource: barDataSource,
      events: {
        // onclick for opening piechart
        dataplotclick(ev, props) {
          that.selectBar(props.categoryLabel);
        }
      }
    };

  // initialize
    let userGroupDataSource;
    let userGroupChartConfigs;
    let avgTime = 0;
    const userGroupData = [];
    // if a bar is selected
    if (this.state.selectedBar) {
      const selectedBarVisits = visits.value.filter((visit) =>
       this.state.event? visit.event === this.state.selectedBar :visit.booth === this.state.selectedBar);

      // Count usergroups by bar chosen
      userGroups.map((userGroup) => {
        const visitsPerUserGroup = selectedBarVisits.filter((visit) => visit.UserGroupKey === userGroup).length;
        userGroupData.push({ label: userGroup, value: visitsPerUserGroup });
      });
      // get avg time
      avgTime = selectedBarVisits.reduce((duration, visit) => {
        return duration + visit.endTime.diff(visit.startTime);
      }, 0);

      avgTime /= selectedBarVisits.length;


      // pie chart setup
      userGroupDataSource = {
        chart: {
          caption: 'User Groups',
          'showBorder': '0',
          'showPercentInTooltip': '0',
          'useDataPlotColorForLabels': '1',
          'showLegend': '1',
          'bgAlpha': '0'
        },
        data: userGroupData
      };

      userGroupChartConfigs = {
        id: 'UserGroup-chart',
        renderAt: 'UserGroup-chart-container',
        type: 'pie2d',
        width: '50%',
        height: 400,
        dataFormat: 'json',
        dataSource: userGroupDataSource,
      };
    }

    return (
      <div>
      <div className = 'slds-align--absolute-center slds-m-vertical--x-large'>
      <span>
        <button className='slds-button--neutral' onClick={ this.clicked }>
          Click to Display {this.state.event ? 'Booths':'Events'}
        </button>
      </span>
      </div>
        <div className='slds-m-bottom--x-small'>
          <ReactFC{...barChartConfigs} />,
          <div id='Bar-chart-container'></div>
        </div>
        <div>
          {this.state.selectedBar &&
            <div className = 'slds-align--absolute-center slds-media slds-media--responsive'>
            <div className = 'slds-box--small extraData'>
              <div>Average time spent per visit</div>
            {/* humanize the avg time rounding it off while only showing the largest two units of times*/}
             <div> { humanizeDuration(avgTime, { largest: 2, round: true, }) }</div>
             </div>
              <ReactFC{...userGroupChartConfigs} />,
              <div id='UserGroup-chart-container'></div>
            </div>
          }
        </div>
      </div>
    );
  }
}

