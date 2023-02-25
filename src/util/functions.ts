
function functions() {
  
    const isObjectEmpty = (workSP: object) => {
      return JSON.stringify(workSP) !== '{}' ? false : true
    }
  
    return {
      isObjectEmpty
    }
    
  }
  
  
  export default functions
  