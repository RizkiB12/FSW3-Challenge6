const express = require('express');
const app = express();
const {Superadmin, Admin, User, Mobil } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'secretkey';
const {superadminAuth, adminAuth, auth} = require('./middleware/auth');


app.use(express.json());

app.post('/login/superadmin', async (req, res) => {
    const { email, password } = req.body;
    const user = await Superadmin.findOne({
        where: {
            email: email
        }
    });
    if(!user) {
        return res.status(400).send({
            message: 'Email not found'
        });
    }
    const hashPassword = await bcrypt.compare(password, user.password);
    if(!hashPassword) {
        return res.status(400).send({
            message: 'Password is incorrect'
        });
    }
    const token = jwt.sign({
        user,
        role: 'superadmin'
    }, secretKey )
    res.send({
        token
    });
});

app.post('/create/admin', superadminAuth, async (req, res) => {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await Admin.create({
        email: email,
        password: hashPassword,
    });
    res.send({ 
        message: 'Successfully created',
        user
     });
});

app.post('/login/admin', async (req, res) => {
    const { email, password } = req.body;
    const user = await Admin.findOne({
        where: {
            email: email
        }
    });
    if(!user) {
        return res.status(400).send({
            message: 'Email not found'
        });
    }
    const hashPassword = await bcrypt.compare(password, user.password);
    if(!hashPassword) {
        return res.status(400).send({
            message: 'Password is incorrect'
        });
    }
    const token = jwt.sign({
        user,
        role: 'admin'
    }, secretKey )
    res.send({
        token
    });
});

app.post('/create/user', async (req, res) => {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email: email,
        password: hashPassword,
    });
    res.send({ 
        message: 'Successfully created',
        user
     });
});

app.post('/login/user', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    if(!user) {
        return res.status(400).send({
            message: 'Email not found'
        });
    }
    const hashPassword = await bcrypt.compare(password, user.password);
    if(!hashPassword) {
        return res.status(400).send({
            message: 'Password is incorrect'
        });
    }
    const token = jwt.sign({
        user,
        role: 'user'
    }, secretKey )
    res.send({
        token
    });
});

app.post('/create/mobil', adminAuth, async (req, res) => {
    const { nama, harga, gambar, brand } = req.body;
    const data = await Mobil.create({
        nama: nama,
        harga: harga,
        gambar: gambar,
        brand: brand,
    });
    res.send({ 
        message: 'Successfully created',
        data
     });
});

app.get('/mobil', async (req, res) => {
    const data = await Mobil.findAll();
    res.send(data);
});

app.get('/mobil/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Mobil.findByPk(id);
    res.send(data);  
})

app.delete('/mobil/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
     await Mobil.destroy({
        where: {
            id: id
        }
    });
    res.send({
        message: 'Successfully deleted'
    });
});

app.put('/mobil/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const { nama, harga, gambar, brand } = req.body;
    const data = await Mobil.update({
        nama: nama,
        harga: harga,
        gambar: gambar,
        brand: brand,
    }, {
        where: {
            id: id
        }
    });
    res.send({
        message: 'Successfully updated',
        data
    });
});

app.get("/whoami", auth, (req, res) => {
    res.send(req.user);
})





app.listen(3000, () => {
    console.log('Server is running on port 3000');
});