module.exports = function (sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.REAL
  });
  return Example;
};
