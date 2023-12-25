const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

function checkIfArray(arr) {
    const result = Array.isArray(arr);
    if (!result) throw new Error('Data is not Array');
    return true;
}

function addCommas(num) {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function removeCommas(num) {
    return Number(num?.toString().replace(/,/g, ''));
}

export { checkIfArray, addCommas, removeCommas, months };
