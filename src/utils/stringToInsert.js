// Credit is given to 
// https://stackoverflow.com/questions/18199762/insert-before-the-last-occurrence-of-a-specific-character-in-a-string

export const insertBeforeLastOccurrence = (strToSearch, strToFind, strToInsert) => {
  const n = strToSearch.lastIndexOf(strToFind);
  if (n < 0) return strToSearch;
  return strToSearch.substring(0, n) + strToInsert + strToSearch.substring(n);    
}