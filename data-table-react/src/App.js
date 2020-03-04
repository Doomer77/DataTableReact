import React, {Component} from 'react';
import Loader from './loader/Loader';
import DataTable from './data-table/DataTable';
import DetailRowWindow from './detail-row-window/DetailRowWindow';
import ModeSelector from './mode-selector/ModeSelector';
import _ from 'lodash';

import './app.css';

class App extends Component{ 

  state = {
    isModeSelected : false,
    isLoading : false,
    data : [],
    sort : 'asc',//направление сортировки
    sortField : 'id',
    row : null
  }

  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    
    this.setState ({
      isLoading : false,
      data : _.orderBy(data, this.state.sortField, this.state.sort)
    })
  }

  onSort = (sortField) => {
    /* Клонируем массив */
    const cloneData = this.state.data.concat();
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
    const data = _.orderBy(cloneData, sortField, sort);

    this.setState({
      data : data,
      sort : sort,
      sortField : sortField
    })   
  }

  onRowSelect = (row) => {
    this.setState({ row })
  }

  modeSelectHandler = (url) => {
    this.setState({
      isModeSelected : true,
      isLoading : true
    });

    this.fetchData(url)
  }

  render() {

    if(!this.state.isModeSelected) {
      return (
        <div className="mod-window">
          <ModeSelector onSelect={this.modeSelectHandler}/>
        </div>
      )
    }

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
