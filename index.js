const express = require('express');
const app = express();
const {Superadmin, Admin, User} = require('./models');
const bcrypt = require('bcrypt');

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
    res.send(user);
});

app.post('/create/admin', async (req, res) => {
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
    res.send(user);
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
    res.send(user);
});






app.listen(3000, () => {
    console.log('Server is running on port 3000');
});