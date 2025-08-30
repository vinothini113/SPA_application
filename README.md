# SPA Application - Angular 12+ with Node.js Backend

A modern Single Page Application (SPA) built with Angular 12+ and Node.js backend, featuring user authentication, role-based access control, and XML-based data storage.

## Features

### 🔐 Authentication & Authorization
- **Login System**: Username, password, and role-based authentication
- **Role-Based Access**: Admin and General User roles with different permissions
- **JWT Token Management**: Secure token-based authentication
- **Session Management**: Automatic session handling and logout

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with beautiful gradients
- **Material Design**: Clean, modern interface with smooth animations
- **Loading States**: Elegant loading spinners and progress indicators
- **Error Handling**: User-friendly error messages and validation

### 📊 Dashboard Features
- **User Dashboard**: Personalized view with user statistics
- **Admin Panel**: User management for administrators
- **Data Visualization**: Card-based layout for records and user data
- **Real-time Updates**: Dynamic data loading with configurable delays

### 🔧 Technical Features
- **XML Database**: Local XML file storage for user data
- **API Delay Simulation**: Configurable delays to demonstrate async processing
- **Modular Architecture**: Clean separation of concerns
- **TypeScript**: Full type safety throughout the application

## Demo Credentials

### Admin Users
- **Username**: `admin` | **Password**: `admin123` | **Role**: Admin


### General Users
- **Username**: `Vinothini` | **Password**: `user123` | **Role**: General User
- **Username**: `Yukesh` | **Password**: `user123` | **Role**: General User
- **Username**: `Kumar` | **Password**: `user123` | **Role**: General User
- **Username**: `Suji` | **Password**: `user123` | **Role**: General User



## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Angular CLI** (v16 or higher)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd spa-application
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Start the Backend Server
```bash
cd ../backend
npm start
```

The backend server will start on `http://localhost:3000`

### 5. Start the Frontend Application
```bash
cd ../frontend
ng serve
```

The frontend application will start on `http://localhost:4200`

## Project Structure

```
spa-application/
├── backend/
│   ├── data/              # XML database files
│   ├── routes/            # API route handlers
│   ├── Server.js          # Main server file
│   └── Package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/     # Login component
│   │   │   ├── dashboard-component/  # Dashboard component
│   │   │   ├── services/  # API services
│   │   │   ├── models/    # TypeScript interfaces
│   │   │   ├── guards/    # Route guards
│   │   │   └── admin/     # Admin components
│   │   └── ...
│   └── package.json       # Frontend dependencies
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/records` - Get user records
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Health Check
- `GET /api/health` - Server health status

## Key Features Explained

### 1. XML Database Storage
The application uses XML files to store user data locally. This provides:
- **Persistence**: Data survives server restarts
- **Simplicity**: No external database required
- **Portability**: Easy to backup and migrate

### 2. Role-Based Access Control
- **Admin Role**: Full access to user management and all records
- **General User Role**: Limited access to personal records only
- **Dynamic UI**: Interface adapts based on user role

### 3. Async Processing Demonstration
- **Configurable Delays**: API endpoints support delay parameters
- **Loading States**: Visual feedback during data loading
- **Error Handling**: Graceful error handling and user feedback

### 4. Modern Angular Architecture
- **Standalone Components**: Modern Angular 12+ architecture
- **Reactive Forms**: Form validation and error handling
- **Observables**: Reactive programming with RxJS
- **TypeScript**: Full type safety and IntelliSense

## Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for development
```

### Frontend Development
```bash
cd frontend
ng serve --open  # Start with auto-reload
```

### Building for Production
```bash
# Build frontend
cd frontend
ng build --configuration production

# Start backend in production mode
cd ../backend
NODE_ENV=production npm start
```

## Customization

### Adding New Users
Users are stored in `backend/data/users.xml`. You can manually add users or use the registration endpoint.

### Modifying API Delays
API delays can be configured in the frontend by changing the delay value in the dashboard controls.

### Styling Customization
The application uses SCSS for styling. Main styles are in:
- `frontend/src/app/login/login.scss`
- `frontend/src/app/dashboard-component/dashboard-component.scss`

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   
   # Kill process on port 4200
   npx kill-port 4200
   ```

2. **CORS Issues**
   - Ensure backend is running on port 3000
   - Check that frontend is making requests to `http://localhost:3000`

3. **XML Database Issues**
   - Check that `backend/data/` directory exists
   - Verify file permissions for XML files

### Logs
- Backend logs are displayed in the terminal
- Frontend errors are shown in browser console
- Network requests can be monitored in browser DevTools

## Security Considerations

- **JWT Tokens**: Tokens expire after 24 hours
- **Password Hashing**: Passwords are hashed using bcrypt
- **Input Validation**: All inputs are validated on both frontend and backend
- **CORS Configuration**: Proper CORS setup for development

## Performance Features

- **Lazy Loading**: Components are loaded on demand
- **Optimized Bundles**: Angular CLI optimizations enabled
- **Efficient API Calls**: Minimal API requests with proper caching
- **Responsive Images**: Optimized for different screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
"# SPA Application" 
