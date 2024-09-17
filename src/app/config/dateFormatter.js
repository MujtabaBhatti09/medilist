export const formatDateToDisplay = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export const todayDate = _ => {
    return formatDateToDisplay(new Date())
}

export const parseDateToVerify = date => String(date).split("/").reverse().join("/")

export const formatDateWithWeekday = (dateString) => {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Options for DateTimeFormat, including weekday and numeric date parts
    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Karachi' };

    // Format the date using Intl.DateTimeFormat with 'en-GB' locale for English in DD/MM/YYYY format
    return new Intl.DateTimeFormat('en-GB', options).format(date);
}

export const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const getStartOfWeek = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to start on Monday
    const startOfWeek = new Date(now.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0); // Set to start of the day
    return startOfWeek;
};

export const getCurrentMonth = (value) => {
    const date = new Date()
    if (value === 1) {
        // Will Return Current Month Name
        return date.toLocaleString('en-GB', { month: 'long', timeZone: 'Asia/Karachi' }) // 'en-GB' for English in the correct format
    } else {
        // Will Return Current Month Count
        const month = date.getMonth() + 1
        return month < 10 ? "0" + month : month
    }
}