module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 22],
                isAlphanumeric: true,
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2],
                isAlpha: true
            }
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,

        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2],
                isAlpha: true
            }
        },
    });

    Item.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Item.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };


    return Item;
};