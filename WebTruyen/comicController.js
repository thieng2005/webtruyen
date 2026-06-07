const db = require("../config/db");

// Lấy toàn bộ truyện
exports.getAllComics = async (req, res) => {
    try {

        const [rows] = await db.query(
            "SELECT * FROM comics"
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Thêm truyện mới
exports.createComic = async (req, res) => {

    try {

        const {
            title,
            description,
            cover_image,
            author_id
        } = req.body;

        await db.query(
            `INSERT INTO comics
            (title,description,cover_image,author_id)
            VALUES (?,?,?,?)`,
            [
                title,
                description,
                cover_image,
                author_id
            ]
        );

        res.json({
            message: "Comic created"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};