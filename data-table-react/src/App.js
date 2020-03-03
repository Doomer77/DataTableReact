import React, {Component} from 'react';
import Loader from './loader/Loader';
import DataTable from './data-table/DataTable';
import DetailRowWindow from './detail-row-window/DetailRowWindow';
import _ from 'lodash';

import './app.css';

class App extends Component{ 

  state = {
    isLoading : true,
    data : [],
    sort : 'asc',//направление сортировки
    sortField : 'id',
    row : null
  }

  async componentDidMount() {
    const response = await fetch(`http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`);
    const data = await response.json();
    
    this.setState ({
      isLoading : false,
      data : _.orderBy(data, this.state.sortField, this.state.sort)
    })
  }

  onSort = (sortField) => {
    /* Клонируем массив */
    const cloneData = this.state.data.concat();
    const sortingDirection = this.state.sort === 'asc' ? 'desc' : 'asc';
    const sortableArray = _.orderBy(cloneData, sortField, sortingDirection);

    this.setState({
      data : sortableArray,
      sort : sortingDirection,
      sortField : sortField
    })   
  }

  onRowSelect = (row) => {
    this.setState({ row })
  }

  render() {
    return (
      <div className="app">
        { 
          this.state.isLoading ? <Loader /> 
          : <DataTable 
          data={this.state.data} 
          onSort={this.onSort}
          sort={this.state.sort}
          sortField={this.state.sortField}
          onRowSelect={this.onRowSelect}
          />
        } 

        {
          this.state.row ? <DetailRowWindow person={this.state.row}/> : null
        }
      </div>
    );
  }
}

export default App;
