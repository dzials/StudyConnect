import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'

import './GroupList.css'

export default class GroupList extends Component {
  constructor(props) {
    super(props)

    this.showList = this.showList.bind(this)
  }

  showList() {
    if(this.props.groups.length > 0) {
      return(
        <React.Fragment>
          {
            this.props.groups.map((item) => {
              return(
                <tr>
                  <td>
                    <Button
                      bsStyle="success"
                      onClick={()=>{this.props.onJoin(item.pk)}}
                    >
                      Join Group
                    </Button>
                  </td>
                  <td>{item.pk}</td>
                  <td>{item.fields.day}</td>
                  <td>{item.fields.time}</td>
                </tr>
              )
            })
          }
        </React.Fragment>
      )
    }
  }

  render() {
    let options = this.props.options
    let onChange = this.props.onChange
    console.log(this.props.groups)
    return (
      <div>
        <Table striped bordered condensed hover className="Selection-Table">
          <thead>
            <tr>
              <th>Click To Join Group</th>
              <th>ID</th>
              <th>Day</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {this.showList()}
          </tbody>
        </Table>
      </div>
    )
  }
}
