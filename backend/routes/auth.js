const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readUsers, writeUsers } = require('../utils/database');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        console.log('Login attempt:', { username, role });
        
        // Validate input
        if (!username || !password || !role) {
            return res.status(400).json({ 
                message: 'Username, password, and role are required' 
            });
        }
        
        // Simulate API delay
        const delay = parseInt(req.query.delay) || 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Read users with error handling
        let usersData;
        try {
            usersData = await readUsers();
            console.log('Users data loaded successfully');
        } catch (readError) {
            console.error('Error reading users:', readError);
            return res.status(500).json({ 
                message: 'Failed to read user database' 
            });
        }
        
        // Check if users data has the expected structure
        if (!usersData || !usersData.users || !Array.isArray(usersData.users.user)) {
            console.error('Invalid users data structure:', usersData);
            return res.status(500).json({ 
                message: 'Invalid user database structure' 
            });
        }
        
        const users = usersData.users.user;
        console.log('Total users:', users.length);
        
        const user = users.find(u => 
            u.username && u.username[0] === username && 
            u.role && u.role[0] === role
        );
        
        if (!user) {
            console.log('User not found with these credentials');
            return res.status(401).json({ 
                message: 'Invalid username, password, or role' 
            });
        }
        
        console.log('User found:', user.username[0]);
        
        // Check if password field exists and is valid
        if (!user.password || !user.password[0]) {
            console.error('User has no password field:', user);
            return res.status(500).json({ 
                message: 'User data corrupted' 
            });
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password[0]);
        if (!isValidPassword) {
            console.log('Invalid password');
            return res.status(401).json({ 
                message: 'Invalid username, password, or role' 
            });
        }
        
        console.log('Password validated successfully');
        
        // Update last login time
        if (!user.lastLogin) {
            user.lastLogin = [''];
        }
        user.lastLogin[0] = new Date().toISOString();
        
        try {
            await writeUsers(usersData);
            console.log('Last login time updated');
        } catch (writeError) {
            console.error('Error updating last login:', writeError);
            // Continue with login even if write fails
        }
        
        const token = jwt.sign(
            { 
                id: user.id[0], 
                username: user.username[0], 
                role: user.role[0],
                email: user.email[0],
                fullName: user.fullName[0]
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            success: true,
            token,
            user: {
                id: parseInt(user.id[0]),
                username: user.username[0],
                role: user.role[0],
                email: user.email[0],
                fullName: user.fullName[0],
                createdAt: user.createdAt ? user.createdAt[0] : null,
                lastLogin: user.lastLogin[0]
            },
            message: `Welcome back, ${user.fullName[0]}!`
        });
        
    } catch (error) {
        console.error('Login error details:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ 
            message: 'Internal server error during login: ' + error.message 
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password, email, fullName, role } = req.body;
        
        // Validate input
        if (!username || !password || !email || !fullName || !role) {
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }
        
        if (role !== 'Admin' && role !== 'General User') {
            return res.status(400).json({ 
                message: 'Role must be either "Admin" or "General User"' 
            });
        }
        
        const usersData = await readUsers();
        const users = usersData.users.user;
        
        // Check if username already exists
        const existingUser = users.find(u => u.username[0] === username);
        if (existingUser) {
            return res.status(409).json({ 
                message: 'Username already exists' 
            });
        }
        
        // Check if email already exists
        const existingEmail = users.find(u => u.email[0] === email);
        if (existingEmail) {
            return res.status(409).json({ 
                message: 'Email already exists' 
            });
        }
        
        // Create new user
        const newUserId = Math.max(...users.map(u => parseInt(u.id[0]))) + 1;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = {
            id: [newUserId.toString()],
            username: [username],
            password: [hashedPassword],
            role: [role],
            email: [email],
            fullName: [fullName],
            createdAt: [new Date().toISOString()],
            lastLogin: ['']
        };
        
        users.push(newUser);
        await writeUsers(usersData);
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUserId,
                username,
                role,
                email,
                fullName,
                createdAt: newUser.createdAt[0]
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Internal server error during registration' 
        });
    }
});

router.post('/logout', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Logged out successfully' 
    });
});

module.exports = router;