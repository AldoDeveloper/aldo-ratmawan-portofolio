
export function slicingText(number: number, string : string){
    if(string.length >= number) return string.substring(0, number) + '...'
    return string;
}

export function slugh(str : string ) {
    str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();
    str = str.replace(/^\s+|\s+$/gm,'');
    str = str.replace(/\s+/g, '-');   
    return str;
  }