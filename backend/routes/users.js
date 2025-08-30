const express = require('express');
const { readUsers, writeUsers } = require('../utils/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const delay = parseInt(req.query.delay) || 0;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        const usersData = await readUsers();
        const users = usersData.users.user.map(user => ({
            id: parseInt(user.id[0]),
            username: user.username[0],
            role: user.role[0],
            email: user.email[0],
            fullName: user.fullName[0],
            createdAt: user.createdAt ? user.createdAt[0] : null,
            lastLogin: user.lastLogin ? user.lastLogin[0] : null
        }));
        
        res.json({
            success: true,
            users,
            total: users.length,
            message: 'Users retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ 
            message: 'Internal server error while fetching users' 
        });
    }
});

// Get user records based on role
router.get('/records', authenticateToken, async (req, res) => {
    try {
        const delay = parseInt(req.query.delay) || 0;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Enhanced dummy records based on user role
        const records = {
            'Admin': [
                { 
                    id: 1, 
                    name: 'All User Data', 
                    access: 'Full', 
                    description: 'Complete system access with user management capabilities',
                    category: 'System',
                    lastModified: new Date().toISOString(),
                    size: '2.5 MB'
                },
                { 
                    id: 2, 
                    name: 'System Logs', 
                    access: 'Read/Write', 
                    description: 'System administration logs and monitoring data',
                    category: 'Logs',
                    lastModified: new Date().toISOString(),
                    size: '15.2 MB'
                },
                { 
                    id: 3, 
                    name: 'User Management', 
                    access: 'Full', 
                    description: 'User account management and permissions',
                    category: 'Administration',
                    lastModified: new Date().toISOString(),
                    size: '8.7 MB'
                },
                { 
                    id: 4, 
                    name: 'Database Backups', 
                    access: 'Full', 
                    description: 'System database backups and recovery',
                    category: 'Backup',
                    lastModified: new Date().toISOString(),
                    size: '45.3 MB'
                },
                { 
                    id: 5, 
                    name: 'Security Reports', 
                    access: 'Full', 
                    description: 'Security audit reports and compliance data',
                    category: 'Security',
                    lastModified: new Date().toISOString(),
                    size: '12.1 MB'
                }
            ],
            'General User': [
                { 
                    id: 1, 
                    name: 'Personal Data', 
                    access: 'Read Only', 
                    description: 'Personal information and profile data',
                    category: 'Personal',
                    lastModified: new Date().toISOString(),
                    size: '0.5 MB'
                },
                { 
                    id: 2, 
                    name: 'Reports', 
                    access: 'Read Only', 
                    description: 'Generated reports and analytics',
                    category: 'Reports',
                    lastModified: new Date().toISOString(),
                    size: '3.2 MB'
                },
                { 
                    id: 3, 
                    name: 'Settings', 
                    access: 'Limited', 
                    description: 'Personal settings and preferences',
                    category: 'Settings',
                    lastModified: new Date().toISOString(),
                    size: '0.1 MB'
                },
                { 
                    id: 4, 
                    name: 'Documents', 
                    access: 'Read/Write', 
                    description: 'Personal documents and files',
                    category: 'Documents',
                    lastModified: new Date().toISOString(),
                    size: '1.8 MB'
                }
            ]
        };
        
        const userRole = req.user.role || 'General User';
        const userRecords = records[userRole] || [];
        
        res.json({
            success: true,
            records: userRecords,
            total: userRecords.length,
            role: userRole,
            message: `Records retrieved for ${userRole}`
        });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ 
            message: 'Internal server error while fetching records' 
        });
    }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const usersData = await readUsers();
        const users = usersData.users.user;
        
        const user = users.find(u => u.id[0] === req.user.id.toString());
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            success: true,
            user: {
                id: parseInt(user.id[0]),
                username: user.username[0],
                role: user.role[0],
                email: user.email[0],
                fullName: user.fullName[0],
                createdAt: user.createdAt ? user.createdAt[0] : null,
                lastLogin: user.lastLogin ? user.lastLogin[0] : null
            }
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ 
            message: 'Internal server error while fetching profile' 
        });
    }
});

// Update user (Admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, fullName, role } = req.body;
        
        const usersData = await readUsers();
        const users = usersData.users.user;
        
        const userIndex = users.findIndex(u => u.id[0] === id);
        
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Update user fields
        if (username) users[userIndex].username[0] = username;
        if (email) users[userIndex].email[0] = email;
        if (fullName) users[userIndex].fullName[0] = fullName;
        if (role) users[userIndex].role[0] = role;
        
        await writeUsers(usersData);
        
        res.json({
            success: true,
            message: 'User updated successfully',
            user: {
                id: parseInt(users[userIndex].id[0]),
                username: users[userIndex].username[0],
                role: users[userIndex].role[0],
                email: users[userIndex].email[0],
                fullName: users[userIndex].fullName[0]
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ 
            message: 'Internal server error while updating user' 
        });
    }
});

// Delete user (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        
        const usersData = await readUsers();
        const users = usersData.users.user;
        
        const userIndex = users.findIndex(u => u.id[0] === id);
        
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Prevent deleting the last admin
        const adminUsers = users.filter(u => u.role[0] === 'Admin');
        if (adminUsers.length === 1 && users[userIndex].role[0] === 'Admin') {
            return res.status(400).json({ 
                message: 'Cannot delete the last admin user' 
            });
        }
        
        users.splice(userIndex, 1);
        await writeUsers(usersData);
        
        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ 
            message: 'Internal server error while deleting user' 
        });
    }
});

module.exports = router;