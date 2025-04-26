const searchUsers = (search, users) => {
  if (!search) return users;
  const trimmedSearch = search.toLowerCase().trim();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(trimmedSearch) ||
      user.email.toLowerCase().includes(trimmedSearch)
  );
};

export default searchUsers;
