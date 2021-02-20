const mongoose = require('../db');
const auth = require('../auth');

const UserSchema = new mongoose.Schema({ });


UserSchema.methods.update = async (property, options) => {
  try {
    await auth.updateUser(this._id, options);
  } catch (e) {
    console.error('could not set', property, 'in firebase.');
  };
};

UserSchema.methods.getProp = async (property) => {
  try {
    const record = await auth.getUser(this._id);
    return record['property'];
  } catch (e) {
    console.error('could not retrieve', property, 'from firebase.');
    return undefined;
  };
};

getUsername = async () => {
  try {
    return record.displayName;
  } catch (e) {
    console.error('failed getting username', e);
  }
};

setUsername = async (name) => {
  try {
    auth.updateUser(this._id, {
      displayName: name,
    });
  } catch (e) {
    console.error('failed setting username', e);
  }
};

UserSchema.statics.create = (options) => {
  const doc = new User();
  return auth.createUser({
    uid: doc._id.toString(),
    ...options,
  }).then(() => {
    doc.save();
    return doc;
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
