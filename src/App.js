import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';
import 'ag-grid-enterprise';

class App extends Component {
 
 
    state = {

      columnSize :{
        colId:'', 
        actualWidth:''
      },

      columnDefs: [
        {
          headerName: "ID",
          // width: 50,
          filter: "agNumberColumnFilter",
          valueGetter: "node.id",
          pinned:""


        },
        {
          headerName: "Athlete",
          field: "athlete",
          // width: 150,
          filter: "agTextColumnFilter",
          pinned:"",
         
          filterParams: {
            
            applyButton: true,
            clearButton: true, 
         
          }
         
        },
        {
          headerName: "Age",
          field: "age",
          // width: 90,
          pinned:'',
          filter: "agNumberColumnFilter",
        },
        {
          headerName: "Country",
          field: "country",
          // width: 120,
          pinned:'',
          filter:"agTextColumnFilter",
        },
        {
          headerName: "Year",
          field: "year",
          // width: 90,
          pinned:'',
          filter: "agNumberColumnFilter",
        },
        {
          headerName: "Date",
          field: "date",
          // width: 110,
          pinned:'',
          filter: "agDateColumnFilter",
        },
        {
          headerName: "Sport",
          field: "sport",
          // width: 100,
          pinned:'',
          filter:"agTextColumnFilter",
        },
        {
          headerName: "Gold",
          field: "gold",
          // width: 100,
          pinned:'',
          filter: "agNumberColumnFilter",
        },
        {
          headerName: "Silver",
          field: "silver",
          // width: 100,
          pinned:'',
          filter: "agNumberColumnFilter",
        },
        {
          headerName: "Bronze",
          field: "bronze",
          // width: 100,
          pinned:'',
          filter: "agNumberColumnFilter",
        },
        {
          headerName: "Total",
          field: "total",
          // width: 100,
          pinned:'',
          filter: "agNumberColumnFilter",
          
        }
      ],

      
      defaultColDef: { 
        width:80,
        checkboxSelection:true,

        menuTabs: ['generalMenuTab', 'filterMenuTab'],
                        sortable: true ,
                        filter: true ,
                        resizable: true,
                        filterParams: {
            
                          applyButton: true,
                          clearButton: true, 
                       
                        }
                       
                         
                      },
                      sideBar: {
                        toolPanels: [
                          {
                            id: "columns",
                            labelDefault: "Columns",
                            labelKey: "columns",
                            iconKey: "columns",
                            toolPanel: "agColumnsToolPanel",
                            toolPanelParams: {
                              suppressPivots: true,
                              suppressPivotMode: true,
                              suppressValues: true
                            }
                          }
                        ]
                      },

                      
                      
      rowBuffer: 0,
      rowSelection: "multiple",
      rowModelType: "serverSide",
     
      paginationPageSize:200,
      cacheOverflowSize: 150,
      maxConcurrentDatasourceRequests: 1,
      infiniteInitialRowCount: 100,
      maxBlocksInCache: 10, 
     
    };
  
  onColumnResized=(e)=> {
    console.log(e);
    
    // this.setState({ columnSize : {colId:e.column.colId , actualWidth:e.column.actualWidth}
    // }); 

    this.setState ((state)=>({
          columnDefs:state.columnDefs.map((col)=>(col.field===e.column.colDef.field)? {...col , width:e.column.actualWidth} : {...col})
    })
    ) 

  


    // this.onGridReady(e)
    console.log("state",this.state.columnDefs)
  
    

    
  }
  
onGridReady=(params)=> {
    console.log("onGridReady");    
    console.log("grid" , params) 
   
    const datasource = {
       

        getRows: (params) => {
          
            console.log('params', params) ; 
           

            const {columnSize} = this.state
            console.log(columnSize)
            
          axios.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json',{
          params:[params.request ,  columnSize ]
           
    })
      .then(((res) => res.data))
      .then(data => params.successCallback(data))

      .catch (err=>console.log(err))
        }
    };
    params.api.setServerSideDatasource(datasource);
    
}


    getMainMenuItems=(params)=> {
      console.log(params)
    return [
      {
        name: "Pin Left",
        action: ()=> {
          console.log("colId", params.column.colId ,"pinDir" , "left")

          this.setState(
            (state)=>({
              columnDefs:state.columnDefs.map((col)=>(col.field===params.column.colDef.field)? {...col , pinned:"left"} : {...col} )
            })
          )
          console.log('state', this.state)

        },
       
      },
      {
        name: "Pin Right",
        action: ()=> {
          this.setState(
            (state)=>({
              columnDefs:state.columnDefs.map((col)=>(col.field===params.column.colDef.field)? {...col , pinned:"right"} : {...col} )
            })
          )

        },
       
      },

      {name: "No Pin" ,
      action: ()=> {
        this.setState(
          (state)=>({
            columnDefs:state.columnDefs.map((col)=>(col.field===params.column.colDef.field)? {...col , pinned:""} : {...col} )
          })
        )

      }
    }
    ]; ;
    
      
    }

    onColumnMoved=(params)=>{
      console.log('colum moved' , params)

      // params.columnApi.moveColumns((params.column.colDef.field), params.toIndex);

      let oldIndex;
      let newIndex;
      
     
           
      oldIndex=(params.column.colDef)?(this.state.columnDefs.findIndex((col)=>(col.field===params.column.colDef.field))):""; 
      newIndex=params.toIndex; 

      console.log(oldIndex , newIndex)
        
      const {columnDefs} = this.state ;

      this.columns_move(columnDefs,oldIndex,newIndex); 

      console.log(this.state.columnDefs)

    }
      
    columns_move=(columns, oldIndex, newIndex)=> {
      
      columns.splice(newIndex, 0, columns.splice(oldIndex, 1)[0]);
      return columns, 
      this.setState({
        columnDefs:columns
      })
;
  };  
    

     




  render() {
    return (
      <div 
        className="ag-theme-balham qu-ag-grid"
        style={{ 
        height: '1500px', 
         }} 
      >


        <AgGridReact
                    
            rowModelType={this.state.rowModelType}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
            sideBar={this.state.sideBar}
            onColumnResized={this.onColumnResized}
            pagination={true}
            paginationAutoPageSize={true}
            getMainMenuItems={this.getMainMenuItems}
            onColumnMoved= {this.onColumnMoved}
            //pin filter menu
            suppressMenuHide = {true}
            //Row Selection
            rowSelection={this.state.rowSelection}
            rowMultiSelectWithClick={true}

            

          
          >
        </AgGridReact>
      </div>
    );
  }
}

export default App;

