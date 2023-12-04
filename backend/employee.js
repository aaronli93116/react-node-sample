import express from 'express';
import { v4 as uuidv4 } from 'uuid'; 

const router = express.Router();

let users = [
    {
        id: uuidv4(),
        name: "Mandy",
        age: 3,
        type: "Engineer"
    },
    {
        id: uuidv4(),
        name: "Aaron",
        age: 5,
        type: "Engineer"
    },
    {
        id: uuidv4(),
        name: "Fly",
        age: 6,
        type: "PM"
    },
];

router.get('/employees', (req, res) => {
    res.send(users)
});

router.post('/employees', (req, res) => {
    const user = req.body;
    
    if (user && user.id) {
        const index = users.findIndex(ele => ele.id === user.id);
        console.log(index, 'index');
        users[index] = user;
    } else {
        users.push({...user, id: uuidv4()});
    }
    console.log(user, 'user')

    res.send(user);
})

router.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === id);
    res.send(foundUser);
})

router.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);

    if (users.length === initialLength) {
        return res.send('User not found');
    }
    res.send(`User with id ${id} was deleted`);
})

export default router;