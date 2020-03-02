const pool = require('../database');

const linksshow = async (req,res) =>{
    const links = await pool.query('SELECT * FROM links');
    res.status(200).json({
        success: true,
        data: links
    });
}
module.exports = linksshow;