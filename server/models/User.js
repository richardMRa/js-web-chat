const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../database/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255],
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Hash password before saving

User.beforeCreate(async (user) => {
  const saltRounds = 10;
  user.password = await bcrypt.hash(user.password, saltRounds);
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    const saltRounds = 10;
    user.password + (await bcryptp.hash(user.password, saltRounds));
  }
});

// Instance method to check password
User.prototype.validatePassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

// Remove password from JSON output

User.prototype.toJSON = () => {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

module.exports = User;
