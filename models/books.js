"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      this.hasMany(model.Chapters,{ sourceKey:"id" })
      this.hasMany(model.Verses,{ sourceKey:"id" })
    }
  }
  Books.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },
      bookTitle: {
        type: DataTypes.STRING,
        validate: {
          is: ["^[^p{P}=<>\^\\+\$]+$", "ui"],
        },
      },
    },
    {
      sequelize,
      modelName: "Books",
    }
  );
  Books.sync( { force:true })
  return Books;
};
