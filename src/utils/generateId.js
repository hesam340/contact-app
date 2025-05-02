const generateId = () => {
  return Math.round(Math.random() * Math.random() * Math.pow(10, 15));
};

export default generateId;
