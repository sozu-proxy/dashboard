import React, { Component } from 'react';
import {connect} from 'react-redux';

class Workers extends Component {

  renderWorkers() {
    if (this.props.workers.Workers) {
      return this.props.workers.Workers.sort((a,b) => a.id > b.id).map(function(worker) {
        return (
          <tr key={worker.id}>
            <td>Worker {worker.id}</td>
            <td>{worker.pid}</td>
            <td>{worker.run_state}</td>
          </tr>
        )
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> Workers
              </div>
              <div className="card-block">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>PID</th>
                      <th>RUNNING STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.renderWorkers()
                    }
                  </tbody>
                </table>
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
    workers: state.workers
  }
};

export default connect(
    mapStateToProps
)(Workers);
