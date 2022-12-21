const {
    INT_VALID_MESSAGE,
    STR_VALID_MESSAGE,
    STR_PATTERN,
    NUMBER_PATTERN,
    ADDRESS_PATTERN,
  } = require('../utils/constants');
  
  module.exports = (sequelize, type) => sequelize.define('users', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: type.STRING,
      allowNull: true,
      validate: {
        is: {
          args: STR_PATTERN,
          msg: `CustomerID ${STR_VALID_MESSAGE}`,
        },
      },
    },
    customerId: {
      type: type.STRING,
      allowNull: true,
    },
    name: {
      type: type.STRING,
      allowNull: true,
      validate: {
        is: {
          args: STR_PATTERN,
          msg: `Name ${STR_VALID_MESSAGE}`,
        },
      },
    },
    email: {
      type: type.STRING,
      allowNull: true,
      validate: { isEmail: true }
    },
    balance: {
      type: type.STRING,
      allowNull: true,
    },
    password: {
      type: type.STRING,
      allowNull: false,
    },
    phone: {
      type: type.STRING,
      allowNull: true,
    },
    gender: {
      type: type.STRING,
      allowNull: true,
      validate: {
        is: {
          args: STR_PATTERN,
          msg: `gender ${STR_VALID_MESSAGE}`,
        },
      },
    },
    nationality: {
      type: type.STRING,
      allowNull: true,
      validate: {
        is: {
          args: STR_PATTERN,
          msg: `Nationality ${STR_VALID_MESSAGE}`,
        },
      },
    },
    occupation: {
      type: type.STRING,
      allowNull: true,
      validate: {
        is: {
          args: STR_PATTERN,
          msg: `Occupation ${STR_VALID_MESSAGE}`,
        },
      },
    },
    sourceOfIncome: {
      type: type.STRING,
      allowNull: true,
      validate: {
        is: {
          args: STR_PATTERN,
          msg: `SourceOfIncome ${STR_VALID_MESSAGE}`,
        },
      },
    },
    riskProfile: {
      type: type.STRING,
      allowNull: true,
      validate: {
        is: {
          args: STR_PATTERN,
          msg: `riskProfile ${STR_VALID_MESSAGE}`,
        },
      },
    },
    address: {
      type: type.STRING,
      allowNull: true,
      validate: {
        is: {
          args: ADDRESS_PATTERN,
          msg: `address ${STR_VALID_MESSAGE}`,
        },
      },
    },
    city: {
      type: type.STRING,
      allowNull: true,
      validate: {
        is: {
          args: STR_PATTERN,
          msg: `city ${STR_VALID_MESSAGE}`,
        },
      },
    },
    country: {
      type: type.STRING,
      allowNull: true,
      validate: {
        is: {
          args: STR_PATTERN,
          msg: `Country ${STR_VALID_MESSAGE}`,
        },
      },
    },
    residenceAddress: {
      type: type.STRING,
      allowNull: true,
      validate: {
        is: {
          args: ADDRESS_PATTERN,
          msg: `ResidenceAddress ${STR_VALID_MESSAGE}`,
        },
      },
    },
    officePhone: {
      type: type.STRING,
      allowNull: true,
      validate: {
        is: {
          args: NUMBER_PATTERN,
          msg: `officePhone ${STR_VALID_MESSAGE}`,
        },
      },
    },
    accountType: {
      type: type.STRING,
      allowNull: true,
    },
    createdAt: {
      type: type.DATE,
      allowNull: true,
    },
  });
  