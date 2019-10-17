import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';
import 'ag-grid-enterprise';
import NumericCellEditor from './NumericCellEditor';
import DateCellEditor from './DateCellEditor';
import ExternalFilter from './ExternalFilter';


class App extends Component {
 
 
    state = {

     

      selectedRows:[],

      rowEdited :[],
      rowSelection:'multiple',
        
      columnDefs: [
        {
          headerName: "ID",
          // width: 50,
          filter: "agNumberColumnFilter",
          valueGetter: "node.id",
          pinned:'',
          hide:null,
         


        },
        {
          //header name content
          headerName: "Athlete",
          //field content label
          field: "athlete",
          // column Width by width:"150 "
          width: null,

          //filter Params is {applyButton:true/false , clearButton:true/false , debounce:number of ms , filterOptions:[
          // "equals", "contains" etc  
          //]}

          filterParams:{
            applyButton:true , 
            clearButton:false, 
            filterOptions:['contains' ,'equals']
          },

          //Show filter on menue True/False
          // filter:true,

          //type of filter (agTextColumnFilter / agNumberColumnFilter /agDateColumnFilter )
          filter: "agTextColumnFilter", 
         
          //column Pinned {left / right}
          pinned:'',
          //column Hide { true / false}
          hide:null,

          //movable column {true / false}
          suppressMovable: true, 
          // lock position {true / false}
          lockPosition: false,
          // MenueTabs of column head ['generalMenuTab {pinned / autoResize }', 'filterMenuTab' {filter} ,'columnsMenuTab' {show/hide column}]
          menuTabs: ['generalMenuTab', 'filterMenuTab' ,'columnsMenuTab'], 


          //Sortable column {true/false}
          sortable: true,

          //Apply editable option of the Columns cell by  editable:{true/false}
          editable:false,

          //applay a custom component for edited cell
          // cellEditorFramework:DateCellEditor

          // applay checkbox for all rows in that col by checkboxSelection:true/false ,
          checkboxSelection:false, 

          //define if the column resizable by resizable: true/false,
          resizable: false,


     

          
          
        
         
        
         
         
        },
        {
          headerName: "Age",
          field: "age",
          // width: 90,
          pinned:'',
          hide:null,
          filter: "agNumberColumnFilter",
          cellEditorFramework:NumericCellEditor, 
          suppressMovable: true,
        },
        {
          headerName: "Country",
          field: "country",
          // width: 120,
          pinned:'',
          hide:null,
          // filter:"agTextColumnFilter",
          // filter: "agSetColumnFilter",
          // filterParams: {
          //   cellHeight: 20,
          //   values: irishAthletes(),
          //   debounceMs: 1000
          // }, 

      

        },
        {
          headerName: "Year",
          field: "year",
          // width: 90,
          pinned:'',
          hide:null,
          filter: "agNumberColumnFilter",
          cellEditorFramework:NumericCellEditor
          
        },
        {
          headerName: "Date",
          field: "date",
          // width: 110,
          pinned:'',
          hide:null,
          filter: "agDateColumnFilter",
          cellEditorFramework:DateCellEditor
          
        },
        {
          headerName: "Sport",
          field: "sport",
          // width: 100,
          pinned:'',
           hide:null,
          filter:"agTextColumnFilter",
        },
        {
          headerName: "Gold",
          field: "gold",
          // width: 100,
          pinned:'',
          hide:null,
          filter: "agNumberColumnFilter",
          cellEditorFramework:NumericCellEditor
          
        },
        {
          headerName: "Silver",
          field: "silver",
          // width: 100,
          pinned:'',
          hide:null,
          filter: "agNumberColumnFilter",
          cellEditorFramework:NumericCellEditor
          
        },
        {
          headerName: "Bronze",
          field: "bronze",
          // width: 100,
          pinned:'',
          hide:null,
          filter: "agNumberColumnFilter",
          cellEditorFramework:NumericCellEditor
          
        },
        {
          headerName: "Total",
          field: "total",
          // width: 100,
          pinned:'',
          hide:null,
          filter: "agNumberColumnFilter",
          
          
          
        }
      ],

      

      
      defaultColDef: { 
        width:115,
        // filterParams:{ 
        //   filterOptions:['equals','contains','inRange']
        // },
        // suppressMenuHide:true,
       
        
        // editable:true,
        
        
        // checkboxSelection:true,

        // menuTabs: ['generalMenuTab', 'filterMenuTab' ,'columnsMenuTab'],
                        sortable: true ,
                        
                        filter: true ,
                        // resizable: true,
                        
                        // filterParams: {
            
                        //   applyButton: true,
                        //   clearButton: true, 
                       
                        // }
                       
                         
                      },
                      // sideBar: {
                      //   toolPanels: [
                      //     {
                      //       id: "columns",
                      //       labelDefault: "Columns",
                      //       labelKey: "columns",
                      //       iconKey: "columns",
                      //       toolPanel: "agColumnsToolPanel",
                      //       toolPanelParams: {
                      //         suppressPivots: true,
                      //         suppressPivotMode: true,
                      //         suppressValues: true
                      //       }
                      //     }
                      //   ]
                      // },

                      
                      
      
      // rowSelection: "multiple",
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
    // this.gridApi = params.api;
    this.p = params;
  
   
    const datasource = {
       
        getRows: (params) => {
          
            console.log('params of getRows', params) ; 
           const {exFilter}=this.state;
            
          axios.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json',{
          params:[params.request ,{exFilter}]
           
    })
      .then(((res) => res.data))
      .then(data => params.successCallback(data))

      .catch (err=>console.log(err))
        }
    };
    params.api.setServerSideDatasource(datasource);
    
}




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

  handleOnClick=()=>{
   this.exFilterSearch()
  console.log(this.props)
  }
 

  exFilterSearch=(filterKey , filterValue)=> {
    // let instance = this.gridApi.getFilterInstance(this.props.filterKey);
  //   const {filterKey , value}=this.props
  //   console.log('value',value)
  //   var filterModel = {
  //     [filterKey]: {"filterType":"text","type":"co","filter":"ss","filterTo":null}
  // };
  // console.log('filterModel' ,filterModel)
  //   // instance.selectValue(`${this.props.value}`);
  //   this.gridApi.setFilterModel(filterModel)
  //   // instance.applyModel();
  //   // this.gridApi.onFilterChanged();

    // var instance = this.gridApi.getFilterInstance('athlete');
    var filterModel = {
      [filterKey]: {"filterType":"text","type":"co","filter":filterValue,"filterTo":null}
      };

    // Set filter properties
  
    this.setState({
      exFilter:filterModel
    }, ()=>(console.log('filterModel' , this.state.exFilter) ))
    
    this.onGridReady(this.p)
    this.setState({
      exFilter:filterModel
    }) 
    console.log('AFTER' , this.state.exFilter) 
    // instance.getFilterInstance('value')
    // instance.selectNothing();
    // instance.selectValue('John Joe Nevin');
    // instance.selectValue('Kenny Egan');

    // Apply the model.
    // instance.setFilter(filterModel);
  }

 
 
  
  render() {
    
    

  
    return (
      <div 
        className="ag-theme-balham qu-ag-grid"
        style={{ 
        height: '1500px', 
         }} 
      >
        <ExternalFilter submitFilter={this.exFilterSearch}/>
       
        
        
        
      

        {/* <ExtternalFilter/> */}
      
         {/* <button onClick={()=>this.handleSelectRowsBtn()}>
           Show Selected rows 
         </button> 

         <button onClick={()=>this.handleEditRowsBtn()}>
           Show edited rows 
         </button> 

         <button onClick={()=>this.handlePostEditedRow()} >
           Post edited Row 
         </button> */}


        <AgGridReact
                    
            rowModelType={this.state.rowModelType}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
            sideBar={this.state.sideBar}
            onColumnResized={this.onColumnResized}
            pagination={true}
            paginationAutoPageSize={true}
            //darg and move column true or false
            // suppressMovableColumns={true}
            frameworkComponents={this.state.frameworkComponents}      
            onColumnMoved= {this.onColumnMoved}
            //pin filter menu
            suppressMenuHide = {true}
            // floatingFilter={true}
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

             enableOldSetFilterModel={true}
             

            

          
          >
        </AgGridReact>
      </div>
    );
  }
}

export default App;


