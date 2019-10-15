import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';
import 'ag-grid-enterprise';
import NumericCellEditor from './NumericCellEditor';


class App extends Component {
 
 
    state = {

      selectedRows:[],

      rowEdited :[],
      rowSelection:'multiple',
        
      columnDefs: [
        // {
        //   headerName: "ID",
        //   width: 50,
        //   filter: "agNumberColumnFilter",
        //   valueGetter: "node.id",
        //   pinned:'',
        //   hide:null,
         


        // },
        {
          headerName: "Athlete",
          field: "athlete",
          width: 150,
          filter: "agTextColumnFilter",
          pinned:'',
          hide:null,
          
         
          filterParams: {
            
            applyButton: true,
            clearButton: true, 
         
          }
         
        },
        {
          headerName: "Age",
          field: "age",
          width: 90,
          pinned:'',
          hide:null,
          filter: "agNumberColumnFilter",
          cellEditorFramework:NumericCellEditor           

        },
        {
          headerName: "Country",
          field: "country",
          width: 120,
          pinned:'',
          hide:null,
          filter:"agTextColumnFilter",
        },
        {
          headerName: "Year",
          field: "year",
          width: 90,
          pinned:'',
          hide:null,
          filter: "agNumberColumnFilter",
          cellEditorFramework:NumericCellEditor
          
        },
        {
          headerName: "Date",
          field: "date",
          width: 110,
          pinned:'',
          hide:null,
          filter: "agDateColumnFilter",
          cellEditor: 'dateCellEditor'
        },
        {
          headerName: "Sport",
          field: "sport",
          width: 100,
          pinned:'',
           hide:null,
          filter:"agTextColumnFilter",
        },
        {
          headerName: "Gold",
          field: "gold",
          width: 100,
          pinned:'',
          hide:null,
          filter: "agNumberColumnFilter",
          cellEditorFramework:NumericCellEditor
          
        },
        {
          headerName: "Silver",
          field: "silver",
          width: 100,
          pinned:'',
          hide:null,
          filter: "agNumberColumnFilter",
          cellEditorFramework:NumericCellEditor
          
        },
        {
          headerName: "Bronze",
          field: "bronze",
          width: 100,
          pinned:'',
          hide:null,
          filter: "agNumberColumnFilter",
          cellEditorFramework:NumericCellEditor
          
        },
        {
          headerName: "Total",
          field: "total",
          width: 100,
          pinned:'',
          hide:null,
          filter: "agNumberColumnFilter",
          
          
          
        }
      ],

      

      
      defaultColDef: { 
        width:110,
        editable:true,
        
        // checkboxSelection:true,

        menuTabs: ['generalMenuTab', 'filterMenuTab' ,'columnsMenuTab'],
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
    console.log("event of column resized",e);
    
    let colsInfo;

    colsInfo=e.columns;
            
          for (let i=0 ; i < colsInfo.length ; i++) {
           this.setState(({
             columnDefs : this.state.columnDefs.map((col)=>(
           (col.field === colsInfo[i].colDef.field)? {
            ...col , width:colsInfo[i].actualWidth
           }:
           {...col}
           ))
          }))
           
          }

    console.log("state",this.state.columnDefs)
    console.log("columns" ,colsInfo)
    
  }
  
onGridReady=(params)=> {
    console.log("onGridReady");    
    console.log("grid" , params) 
   
    const datasource = {
       
        getRows: (params) => {
          
            console.log('params of getRows', params) ; 
          //  const {rowEdited}=this.state;
            
          axios.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json',{
          params:[params.request]
           
    })
      .then(((res) => res.data))
      .then(data => params.successCallback(data))

      .catch (err=>console.log(err))
        }
    };
    params.api.setServerSideDatasource(datasource);
    
}


    // 

    onColumnMoved=(params)=>{
      console.log('colum moved' , params)

      // params.columnApi.moveColumns((params.column.colDef.field), params.toIndex);

      let oldIndex;
      let newIndex;
      
     
           
      oldIndex=(params.column!==null)?(this.state.columnDefs.findIndex((col)=>(col.field===params.column.colDef.field))):""; 
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
    
  // edit Row Table Cell 

  onCellValueChanged= (params)=> {
    const {rowIndex , oldValue , newValue , data  } =params; 
    const {field} = params.column.colDef;
    this.setState((state)=>({
      rowEdited:[...state.rowEdited , {rowIndex , oldValue , newValue , data ,field}  ]
    })
    )
    // console.log(params)
    // console.log(this.state.rowEdited)
    // this.onGridReady(params)
}


onDisplayedColumnsChanged =(params)=>{
  console.log("DisplayedColumnsChanged",params)
}



onColumnPinned =(params)=>{
  console.log("pinned params",params);
  this.setState(
    ({
      columnDefs:this.state.columnDefs.map((col)=>(col.field===params.column.colDef.field)? {...col , pinned:params.pinned} : {...col} )
    }));
    console.log(this.state.columnDefs)
  }
 
  onColumnVisible=(params)=>{
    console.log("col visible",params); 
      this.setState(
      ({
          columnDefs:this.state.columnDefs.map((col)=>(col.field===params.column.colDef.field)? {...col , hide:!params.visible} : {...col} )
        }));

  
      console.log(this.state.columnDefs);
  }

  // onRowSelected=(event)=>{
  //   console.log(event)
  // }

  onSelectionChanged=(event)=>{
    var rowCount  = event.api.getSelectedNodes();
    let rows = rowCount.map((row)=>({data:row.data , id:row.id}));
    this.setState({selectedRows:rows})
    
  }

  handleSelectRowsBtn=()=>{
    console.log("Selected Rows",...this.state.selectedRows)
  }

  handleEditRowsBtn=()=>{
     console.log("Edited Rows",...this.state.rowEdited)
  }

  handlePostEditedRow=()=>{
    axios.post('/row', {
      rowEdited: this.state.rowEdited
    })
    .then((res)=> {
      console.log(res);
    })
    .catch((err)=> {
      console.log(err);
    });

    this.setState({rowEdited:[] })
  }

  render() {
    return (
      <div 
        className="ag-theme-balham qu-ag-grid"
        style={{ 
        height: '1500px', 
         }} 
      >
      
         <button onClick={()=>this.handleSelectRowsBtn()}>
           Show Selected rows 
         </button> 

         <button onClick={()=>this.handleEditRowsBtn()}>
           Show edited rows 
         </button> 

         <button onClick={()=>this.handlePostEditedRow()} >
           Post edited Row 
         </button>


        <AgGridReact
                    
            rowModelType={this.state.rowModelType}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
            sideBar={this.state.sideBar}
            onColumnResized={this.onColumnResized}
            pagination={true}
            paginationAutoPageSize={true}
         
           
            onColumnMoved= {this.onColumnMoved}
            //pin filter menu
            suppressMenuHide = {true}
            //Row Selection
            rowSelection={this.state.rowSelection}
            rowMultiSelectWithClick={true} 

            //Edit cells
            onCellValueChanged={this.onCellValueChanged}

            onColumnPinned ={this.onColumnPinned}

            // onDisplayedColumnsChanged={this.onDisplayedColumnsChanged}
            onDragStopped={this.onDragStopped}
            onColumnVisible={this.onColumnVisible}
             // getMainMenuItems={this.getMainMenuItems}


            //  onRowSelected={this.onRowSelected}
             onSelectionChanged={this.onSelectionChanged}


             

            

          
          >
        </AgGridReact>
      </div>
    );
  }
}

export default App;

// getMainMenuItems=(params)=> {
  //   console.log(params)
  // return [
  //   {
  //     name: "Pin Left",
  //     action: ()=> {
  //       console.log("colId", params.column.colId ,"pinDir" , "left")

  //       this.setState(
  //         (state)=>({
  //           columnDefs:state.columnDefs.map((col)=>(col.field===params.column.colDef.field)? {...col , pinned:"left"} : {...col} )
  //         })
  //       )
  //       console.log('state', this.state)

  //     },
     
  //   },
  //   {
  //     name: "Pin Right",
  //     action: ()=> {
  //       this.setState(
  //         (state)=>({
  //           columnDefs:state.columnDefs.map((col)=>(col.field===params.column.colDef.field)? {...col , pinned:"right"} : {...col} )
  //         })
  //       )

  //     },
     
  //   },

  //   {name: "No Pin" ,
  //   action: ()=> {
  //     this.setState(
  //       (state)=>({
  //         columnDefs:state.columnDefs.map((col)=>(col.field===params.column.colDef.field)? {...col , pinned:""} : {...col} )
  //       })
  //     )

  //   }
  // }
  // ]; ;
  
    
  // }