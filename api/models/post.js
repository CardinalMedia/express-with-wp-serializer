module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    wpID: {
      type: DataTypes.INTEGER,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    },
    excerpt: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    raw: {
      type: DataTypes.JSON
    }
  }, {
    instanceMethods: {
      toJSON: function () {
        var values = Object.assign({}, this.get())
        delete values.raw
        return values
      }
    }
  }, 
  { })
  return Post
}
