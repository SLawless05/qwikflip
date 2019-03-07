module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 22],
                
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        sold: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2],
                
            }
        },
        imageUrl: {
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
                len: [2]
                
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