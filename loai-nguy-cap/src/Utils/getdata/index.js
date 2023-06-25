
async function fn_getData(str) {
    try {
      const response = await fetch(str); // fetch API từ link API
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await response.json();
      return data;
      
    } catch (error) {
      console.error("Error:", error);
    }
  
}

export default fn_getData