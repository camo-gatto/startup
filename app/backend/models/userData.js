function User(user, socketid) {
  this.userid=user._id;
  this.name = user.name;
  this.surname = user.surname;
  this.born_date=user.born_date;
  this.socket = socketid;
}
module.exports = User;
