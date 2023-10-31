export function generateUserID() {
    const timestamp = Date.now().toString(); // Get the current timestamp as a string
    const randomNum = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999

    return `${timestamp}-${randomNum}`;
}

export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month if needed
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero to day if needed
    return `${year}-${month}-${day}`;
  };
  

export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};