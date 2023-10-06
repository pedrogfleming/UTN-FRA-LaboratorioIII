export default function Arr_Update(arr, objectToUpdate, updatedObject) {
    const index = arr.findIndex(obj => obj.id === objectToUpdate.id);
  
    if (index !== -1) {
      arr[index] = updatedObject;
    }
  }