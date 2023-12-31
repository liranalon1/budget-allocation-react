import dayjs from 'dayjs';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const monthNames = Array.from({ length: 12 }, (_, index) =>
    dayjs().month(index).format('MMM')
);

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

export { checkIfArray, addCommas, removeCommas, monthNames, currentYear };
