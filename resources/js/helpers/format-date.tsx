export function formatDate(date: Date | string) {
    // Ensure we have a Date object (backend sends Y-m-d format)
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Format to d-m-Y for display
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
    return `${day}-${month}-${year}`;
}