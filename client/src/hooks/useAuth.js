
const useAuth = () => {
  const token = localStorage.getItem('token');
  return !!token; // returns true or false
};

export default useAuth;
