const hasPermission = (reqUser, user) => {
  if (reqUser.isAdmin || reqUser._id.toString() === user._id.toString()) {
    return true
  }
  return false
}

export default hasPermission
