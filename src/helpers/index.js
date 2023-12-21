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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export { checkIfArray, numberWithCommas, months };
