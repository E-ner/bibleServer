"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      this.hasMany(model.Verses, { sourceKey: "id" });
      this.belongsTo(model.Books, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "bookId",
      });
    }
  }
  Chapters.init(
    {
      bookId: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          is: ["^[^p{P}=<>\^\\+\$]+$", "ui"],
        },
      },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Chapters",
    }
  );
  Chapters.sync({ force: true });
  return Chapters;
};
