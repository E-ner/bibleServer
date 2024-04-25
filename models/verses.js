"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Verses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(model) {
      this.belongsTo(model.Chapters, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "chapterId",
      });
      this.belongsTo(model.Books, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "bookId",
      });
    }
  }
  Verses.init(
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
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      chapterId: {
        type:DataTypes.INTEGER,
        validate:{
          isInt:true
        }
      },
      content: {
        type: DataTypes.STRING,
        validate: {
          is: ["^[^p{P}=<>\^\\+\$]+$", "ui"],
        },
        allowNull:false
      },
    },
    {
      sequelize,
      modelName: "Verses",
    }
  );

  Verses.sync({ force: true });
  return Verses;
};
