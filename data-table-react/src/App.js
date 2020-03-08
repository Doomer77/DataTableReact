import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import Loader from './loader/Loader';
import DataTable from './data-table/DataTable';
import DetailRowWindow from './detail-row-window/DetailRowWindow';
import ModeSelector from './mode-selector/ModeSelector';
import SearchTable from "./search-table/SearchTable";
import _ from 'lodash';

import './app.css';

class App extends Component{ 

  state = {
    isModeSelected : false,
    isLoading : false,
    data : [],
    sort : 'asc',//направление сортировки
    sortField : 'id',
    row : null,
    currentPage : 0,
    search: ""
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

  pageChangeHeandler = ({selected}) => {
    this.setState ({
      currentPage : selected
    })
  }

  searchHandler = (search) => {
    this.setState({search, currentPage: 0})
  }

  modeSelectHandler = (url) => {
    this.setState({
      isModeSelected : true,
      isLoading : true
    });

    this.fetchData(url)
  }

  getFilteredData () {
    const {data, search} = this.state;

    if (!search) {
      return data;
    }

    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase()) || 
              item['lastName'].toLowerCase().includes(search.toLowerCase()) ||
              item['email'].toLowerCase().includes(search.toLowerCase())
    });
  }

  render() {

    const pageZice = 50;

    if(!this.state.isModeSelected) {
      return (
        <div className="mod-window">
          <ModeSelector onSelect={this.modeSelectHandler}/>
        </div>
      )
    }

    const filteredData = this.getFilteredData();

    //debugger

    const pageCount = Math.ceil(filteredData.length / pageZice);
    
    const displayData = _.chunk(filteredData, pageZice)[this.state.currentPage];

    return (
      <div className="container">
        <div className="app">
          { 
            this.state.isLoading ? <Loader /> 
            : <React.Fragment>
                <SearchTable onSearch={this.searchHandler}/>
                <DataTable 
                  data={displayData} 
                  onSort={this.onSort}
                  sort={this.state.sort}
                  sortField={this.state.sortField}
                  onRowSelect={this.onRowSelect}
                />
              </React.Fragment>
          }  

          {/*pagination*/}
          {
            this.state.data.length > pageZice 
            ? <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.pageChangeHeandler}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName="list-item"
                pageLinkClassName="list-link"
                previousClassName="list-item"
                nextClassName="list-item"
                previousLinkClassName="list-link"
                nextLinkClassName="list-link"
                forcePage={this.state.currentPage}
              /> : null
          }

          {
            this.state.row ? <DetailRowWindow person={this.state.row}/> : null
          }
        </div>
      </div>
    );
  }
}

export default App;
