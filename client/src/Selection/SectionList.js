import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'

import './SelectionList.css'

export default class SectionList extends Component {
  constructor(props) {
    super(props)

    this.showList = this.showList.bind(this)
  }

  showList() {
    return(
      <React.Fragment>
        {
          this.props.sections.map((item) => {
            return(
              <tr>
                <td>
                  <Button
                    bsStyle="success"
                    onClick={()=>{this.props.onAdd(item.crn)}}
                  >
                    Add Class
                  </Button>
                </td>
                <td>{item.crn}</td>
              </tr>
            )
          })
        }
      </React.Fragment>
    )
  }

  render() {
    let options = this.props.options
    let onChange = this.props.onChange

    return (
      <div>
        <Table striped bordered condensed hover className="Selection-Table">
          <thead>
            <tr>
              <th>Click To Add Class</th>
              <th>CRN</th>
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
