import React, { Component } from 'react';

import {connect} from 'react-redux';

class Dashboard extends Component {

  displayRunningWorkers() {
    if (this.props.isFetchingWorkers) {
      return <i className="fa fa-spin fa-spinner" />;
    }
    if (this.props.workers.Workers) {
      return this.props.workers.Workers.filter(a => a.run_state === 'Running').length;
    } else {
      return null;
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
          <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                Workers and Stuff
              </div>
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-12 col-lg-4">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="callout callout-info">
                          <small className="text-muted">Running Workers</small><br/>
                          <strong className="h4">{
                            this.displayRunningWorkers()
                          }</strong>
                          <div className="chart-wrapper">
                            <canvas id="sparkline-chart-1" width="100" height="30"></canvas>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

/**
 * This function maps the state to a
 * prop called `state`.
 *
 * In larger apps it is often good
 * to be more selective and only
 * map the part of the state tree
 * that is necessary.
 */
const mapStateToProps = (state) => {
  return {
    workers: state.workers,
    isFetchingWorkers: state.isFetchingWorkers
  }
};

export default connect(
    mapStateToProps
)(Dashboard);
