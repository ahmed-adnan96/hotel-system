export const environment = {
  ServerUrl: 'https://upskilling-egypt.com:3000/api/v0/',
  userId: typeof window !== 'undefined' ? localStorage.getItem('id') : null,
};
