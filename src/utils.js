//create function to convert array to matrix
export const convertArrayToMatrix = (arr, width) => {
        let rows = []
        for (let index = 0; index < arr.length; ++index) {
            const nextElement = arr[index];
            const isFirstRowElement = (index % width === 0);
            if (isFirstRowElement) {
                 //make a new row from first element
                rows.push([nextElement]);
            } else {
                //push onto current row
                rows[rows.length - 1].push(nextElement);
            }
        }
        return rows;
    };
