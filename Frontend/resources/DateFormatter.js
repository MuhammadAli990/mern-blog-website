export function formatDate(isoString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const date = new Date(isoString);
    return date.toLocaleString('en-US', options).replace(',', ' at');
}