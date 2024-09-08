const addStaticMethods = (scheme) => {
  scheme.static('findAllData', function () {
    return this.find({});
  });

  scheme.static('findDataById', function (_id) {
    return this.findById(_id);
  });

  scheme.static('findOneData', function (query = {}) {
    return this.findOne(query);
  });

  scheme.static('dataExist', function () {
    return this.exists({});
  });

  scheme.static('updateData', function (_id, body) {
    return this.findOneAndUpdate({ _id }, { $set: body });  
  });

  scheme.static('removeData', function (_id) {
    return this.deleteOne({ _id });
  });

  scheme.static('removeMany', function (query) {
    return this.deleteMany(query);
  });

  scheme.static('createMany', function (data = []) {
    return this.insertMany(data);
  });
};

module.exports = addStaticMethods;
