/*
Paprawin Boonyakida
GUI Programming 1
Assignment 5: Implementing multiplication table using html,css,js
paprawin_boonyakida@student.uml.edu

Note: Uses event listener to validate input and generate table
*/

//Define variables to hold user input
var colMax = 0;
var colMin = 0;
var rowMax = 0;
var rowMin = 0;
tabID = "table"; // Change table id here

//use event listener to handle user input, which will then validate and generate table
document.getElementById("generate_btn").addEventListener("click", handleUserClick);

//validates user input and also parse input to integer
function handleUserClick(){
	colMin = parseInt(document.getElementById("colMin").value);
	colMax = parseInt(document.getElementById("colMax").value);
	rowMin = parseInt(document.getElementById("rowMin").value);
	rowMax = parseInt(document.getElementById("rowMax").value);
	
	//always remove old table just to be safe
	removeOldTab(tabID); 
	
	// determine which error occurred
	var error_code = validateInput(colMin,colMax,rowMin,rowMax);
	
	
	// will be used to explain the error message to user
	var errMsg = document.getElementById("errMessage"); //Will be used to define error message
	
	// explain the correct error message and suggestion to user
	switch(error_code){
		case 0: // no error, so generate table by calling generatetTable() function
			removeOldTab(tabID);  // remove previous table
			errMsg.innerHTML = ""; // delete previous error message
			// DEBUG: uncomment later
			generateTable(colMin, colMax, rowMin, rowMax, tabID); // generates the table using correctly validated input
			break;
		case 1: // minCol > maxCol error
			errMsg.innerHTML = "Min(col) must be less than max(col). Try again:";
			break;
		case 2: // minRow > maxRow error
			errMsg.innerHTML = "Min(row) must be less than max(row). Try again:";
			break;
		case 3: // column values not within range
		case 4: // row values not within range
			errMsg.innerHTML = "Allowed range is -50 to 50. Try again:";
			break;
		case 5: // empty/blank space detected
			errMsg.innerHTML = "Please fill in all fields. Try again:";
			break;
		default:
			break;
	}
}

/*Input Validation procedure:
 Column minimum must always be less than maximum.
 The values must be between -50 and 50
 Returns error code from 0 ~ 5 where code 0 indicates no error.
*/
function validateInput(colMin,colMax,rowMin,rowMax){
	
	//Determine one of the five error codes
	if (colMin > colMax){ // min should be less than max
		return 1;
	}else if(rowMin > rowMax){
		return 2;
	}else if (colMin < -50 || colMin > 50 || colMax < -50 || colMax > 50){ // out of range -50 ~ 50
		return 3;
	}else if(rowMin < -50 || rowMin > 50 || rowMax < -50 || rowMax > 50){ // out of range -50 ~ 50
		return 4;
	}else if (isNaN(colMin) || isNaN(colMax) || isNaN(rowMin) || isNaN(rowMax)){ // blank/unfilled space
		return 5;
	}else { // No error detected
		return 0;
	}
}

/*Generates table:
  Only correctly validated values are accepted,
  so this function should get called if validateInput() returns error code 0.
  Generates table according to user input
*/
function generateTable(cmin, cmax, rmin, rmax, table_id) {
  var table = document.getElementById(table_id);
  
  // Count total rows and columns
  var totalRows = rmax - rmin + 1;
  var totalCols = cmax - cmin + 1;
  
  /* To-do:
  	1. Generate Column headers (x-axis)
    2. Generate Row headers (y-axis)
    3. Populate data inside the table using row and column headers as multipliers
  */
  
  //first row holds the column headers
  var firstRow = table.insertRow(0);
  firstRow.insertCell(0).innerHTML = "*"; // the top-left box indicate mathematic operation
  
  //Generate column headers (x-axis)
  for(var i = 0; i < totalCols; i++){
  	firstRow.insertCell(i+1).innerHTML = cmin + i;
  }
  
  // Generate Row headers(y-axis) and Populate data
  for (var i = 0; i < totalRows ; i++){
    var row = table.insertRow(i+1);
    // first column cell is a header (y-axis)
    row.insertCell(0).innerHTML = rmin;
    
    // following cells are calculated data
    // populate/calculate data here
    for (var j = 0; j < totalCols; j++){
    	//insert at cell j+1 because first cell is occupied by header
        row.insertCell(j+1).innerHTML = rmin * (cmin+j);
    }
    rmin++; // increment numbers on the row to be used in the next row
  }
}

// Removes old table so the new table can be set
function removeOldTab(tabID){
	var oldTab = document.getElementById(tabID);
	while(oldTab.hasChildNodes()){
		oldTab.removeChild(oldTab.firstChild); // remove all children of old table
	}
}


