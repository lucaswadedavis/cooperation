import React, { Component } from 'react';
import {
  FormControl,
  Table,
  } from 'react-bootstrap';
import './DataTable.css';


class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      inverseSort: false,
      sortedColumn: null
    };
  }

  componentWillReceiveProps(nextProps) {
    let filters = this.state.filters;
    for (let i = 0; i < nextProps.schema.length; i++) {
      let key = nextProps.schema[i].key;
      if (!filters[key]) {
        filters[key] = '';
      }
    }
  }

  sortByColumn(key) {
    this.setState({
      inverseSort: !this.state.inverseSort,
      sortedColumn: key
    });
  }

  handleChange(e) {
    e.preventDefault();
    const value = e.target.value;
    const key = e.target.name;
    let filters = this.state.filters;
    filters[key] = value;
    this.setState(filters);
  }

  renderFilterInput(key) {
    return <FormControl
      type="text"
      value={ this.state.filters[key] }
      name={ key }
      onChange={ e => this.handleChange(e) }
    />
  }

  renderHeader(schema) {
    return <thead>
      <tr>
        { schema.map(category => <th className="Clickable" key={ category.key } onClick={ () => this.sortByColumn(category.key) }>{ category.label }</th>) }
      </tr>
      <tr>
        { schema.map(category => <th key={ category.key }>{ this.renderFilterInput(category.key) }</th>) }
      </tr>
    </thead>
  }

  renderBody(data) {
    return <tbody>
      { data.map(rowData => this.renderRow(rowData)) }
    </tbody>
  }

  renderRow(rowData) {
    // This is the logic for filtering the data table.

    const filters = this.state.filters;
    for (let key in filters) {
      if (rowData[key] && filters[key] && !(new RegExp(filters[key]).test(rowData[key]))) {
        return;
      }
    }

    return <tr key={ rowData.id }>
      { this.props.schema.map(category => <td key={ category.key }>{ rowData[category.key] }</td>) }
    </tr>
  }

  render() {
    const {data, schema} = this.props;
    let sortedData;
    if (this.state.sortedColumn !== null) {
      const {sortedColumn} = this.state;
      if (this.props.schema[sortedColumn] && this.props.schema[sortedColumn].type === 'number') {
        if (this.state.inverseSort) {
          sortedData = data.sort((a, b) => b[sortedColumn] - a[sortedColumn]);
        } else {
          sortedData = data.sort((a, b) => a[sortedColumn] - b[sortedColumn]);
        }
      } else {
        if (this.state.inverseSort) {
          sortedData = data.sort((a, b) => b[sortedColumn] < a[sortedColumn]);
        } else {
          sortedData = data.sort((a, b) => a[sortedColumn] < b[sortedColumn]);
        }
      }
    } else {
      sortedData = data;
    }
    return (
        <Table>
          { this.renderHeader(schema) }
          { this.renderBody(sortedData) }
        </Table>
    );
  }
}

export default DataTable;
