
function capitalize(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

function unCapalize(word: string) {
  if (!word) return word;
  return word[0].toLowerCase() + word.substr(1).toLowerCase();
}
function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

//Regex to Remove special Characters 
//.replace(/[^\w\s]/gi, '');



// Unique Id for React "child elements should have unique ids check render method" bull shit 
import {v4 as uuidv4} from 'uuid';
<Component key={uuidv4()}/>

// Array Method removes duplicate entries                
temp2 = [...new Set(temp2)]


// Removes Empty Lines from Multiline String

        const lines = (text: string)=>{
            let ots: string[]
            ots = text
                .split(/\r\n|\n\r|\n|\r/)
                .map((x:string)=> x.trim())
                .filter((x:string) => x !== "")
            
            return ots
        }
        
const average = (list:number[])=>{
    let sum = list.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    });
    return sum/list.length
}
        

