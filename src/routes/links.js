const express = require('express');
const router = express.Router();

const pool = require('../database');


//controller
const linksshow = require('../controllers/linksshow');



router.get('/add', (req, res)=>{
    res.send('form');
});

router.post('/add',async (req ,res)=>{
    const {title, url , description} = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ? ',[newLink]);
    res.redirect('/');
});

router.get('/',async (req,res) =>{
    const links = await pool.query('SELECT * FROM links');
    res.status(200).json({
        success: true,
        data: links
    });
});

router.get('/linksshow',linksshow);

router.get('/del/:id', async (req, res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    res.status(200).json({
        success: true,
        data:'DEL'+id
    });
});

router.get('/edit/:id',async(req, res)=>{
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.status(200).json({
        success: true,
        data: links
    });
});

router.post('/edit/:id', async(req,res)=>{
    const {id} = req.params;
    const { title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description
    };
   const dbcon =  await pool.query('UPDATE links set ? WHERE id = ?',[newLink, id]);
   console.log(dbcon)
    res.status(200).json({
        success: true,
        data: newLink
    });
});

module.exports = router;