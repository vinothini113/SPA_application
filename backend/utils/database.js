const fs = require('fs');
const xml2js = require('xml2js');
const bcrypt = require('bcryptjs');

// XML database file path
const USERS_FILE = './data/users.xml';

// Initialize XML database with more sample users
const initializeDatabase = () => {
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }
    
    if (!fs.existsSync(USERS_FILE)) {
        const initialData = {
            users: {
                user: [
                    {
                        id: ['1'],
                        username: ['admin'],
                        password: [bcrypt.hashSync('admin123', 10)],
                        role: ['Admin'],
                        email: ['admin@example.com'],
                        fullName: ['System Administrator'],
                        createdAt: [new Date().toISOString()],
                        lastLogin: ['']
                    },
                    {
                        id: ['2'],
                        username: ['Vinothini'],
                        password: [bcrypt.hashSync('user123', 10)],
                        role: ['General User'],
                        email: ['Vino@gmail.com'],
                        fullName: ['Vinothini Dayalan'],
                        createdAt: [new Date().toISOString()],
                        lastLogin: ['']
                    },
                    {
                        id: ['3'],
                        username: ['Yukesh'],
                        password: [bcrypt.hashSync('user123', 10)],
                        role: ['General User'],
                        email: ['Yukesh@gmail.com'],
                        fullName: ['Jane Smith'],
                        createdAt: [new Date().toISOString()],
                        lastLogin: ['']
                    },
                    {
                        id: ['4'],
                        username: ['manager'],
                        password: [bcrypt.hashSync('manager123', 10)],
                        role: ['General User'],
                        email: ['manager@example.com'],
                        fullName: ['Manager User'],
                        createdAt: [new Date().toISOString()],
                        lastLogin: ['']
                    }
                ]
            }
        };

        const builder = new xml2js.Builder();
        const xml = builder.buildObject(initialData);
        fs.writeFileSync(USERS_FILE, xml);
        console.log('Database initialized with sample users');
    }
};

// Read XML data
const readUsers = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(USERS_FILE, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading users file:', err);
                reject(err);
                return;
            }
            xml2js.parseString(data, (err, result) => {
                if (err) {
                    console.error('Error parsing XML:', err);
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    });
};

// Write XML data
const writeUsers = (data) => {
    return new Promise((resolve, reject) => {
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(data);
        fs.writeFile(USERS_FILE, xml, (err) => {
            if (err) {
                console.error('Error writing users file:', err);
                reject(err);
                return;
            }
            resolve();
        });
    });
};

module.exports = {
    initializeDatabase,
    readUsers,
    writeUsers
};
