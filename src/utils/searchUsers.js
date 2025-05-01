const searchUsers = (search, users) => {
  if (!search) return users;
  const trimmedSearch = search.toLowerCase().trim();
  return users.filter(
    (user) =>
      user.fullName.includes(trimmedSearch) ||
      user.email.includes(trimmedSearch)
  );
};

export default searchUsers;
