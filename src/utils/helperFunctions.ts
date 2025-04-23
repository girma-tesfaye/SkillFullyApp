

export const formatDate = (dateString: any) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
  


export const truncateString = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
}



export const durationString = (duration: number) => {
  let hr;
  let min;

  if (duration > 60){
    hr = Math.floor(duration/60)
    min = duration % 60;
    return `${hr} hr ${min} mins`
  }

  return `${duration} mins`
  
}