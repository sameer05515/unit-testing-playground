# Target: 
create one `buildTree` method, which takes a string input
 - for given text, validate and return response containing fields data, isValid, errorCode, message. 
 - data should contain an array having objects with field name, level and children.
 - Please maintain messages in ErrorCodes object. 

## get line array - using `parseLines` method.
1.1 ignore or filter lines having zero length post trim
1.2 create one line array and check if indentation level (IL) of any line in line array less than IL of first line. 
1.3 i.e. if IL of first line is 4, then IL of all subsequent line should be more than or equal to 4.

##  check consistency- using `validate` method
2.1 if lineArray is null or empty, return success reponse with data, an empty array.
2.2 if lineArray has size 1, return success response with data, an array containing single object with name, level 0 and empty children array
2.3 if IL of all lines are equal, return success response with data, an array containing objects with name, level 0 and empty children array
2.4 IL of any line should be greater than or equal to IL of first line of lineArray returned from parseLines method,
2.5 If IL have different values, but no IL is less than IL of first line, then **validate consistency**
2.5.1 find first difference, and store in some constant. 
2.5.2 iterate line array, and check if next lines' IL is increasing by same first difference. however if decresing, then IL of sub sequent lines can decrease in the multiple of first difference.
2.6 finally share data, if all conditions met.
