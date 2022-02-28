export default request = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    alert(error.message);
  }
};
