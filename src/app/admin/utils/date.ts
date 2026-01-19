// export const startsAt = (date: string) => {
//   const d = new Date(date);
//   console.log(d.setUTCHours(0, 0, 0, 0));
//   return d.setUTCHours(0, 0, 0, 0);
// };
// export const endsAt = (date: string)=> {
//     const d = new Date(date);
//      d.setUTCHours(d.setUTCHours(0,0,0,0))
//      console.log(d.toISOString())
//      return d.toISOString();
// }

export const startsAt = (date: string) => {
    const d = new Date(`${date}T00:00:00Z`);
    return d.toISOString();
  };
  
  export const endsAt = (date: string) => {
    const d = new Date(`${date}T23:59:59.999Z`);
    return d.toISOString();
  };
  
  export const isoToDateInput = (iso?: string) => {
    if (!iso) return "";
    return iso.split("T")[0]; // yyyy-MM-dd
  };