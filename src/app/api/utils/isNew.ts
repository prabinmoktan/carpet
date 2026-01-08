export function isProductNew(createdAt: Date){
    const NEW_DAYS = 15;
  const now = Date.now();
//   if (!this.createdAt) return false;
  const difference = now - new Date(createdAt).getTime();
  return difference <= NEW_DAYS * 24 * 60* 60 * 1000;
}