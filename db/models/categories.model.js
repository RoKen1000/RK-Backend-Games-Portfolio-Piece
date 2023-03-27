const db = require("../connection")

exports.fetchCategories = () => {
    return db.query('SELECT * FROM categories;')
    .then((categories) => {
        return {categories: categories.rows}
    })
}