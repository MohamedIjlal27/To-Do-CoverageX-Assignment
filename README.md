# Todo App Frontend

A modern, responsive Todo application built with Next.js, React, and TypeScript.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Git (for cloning the repository)

## Environment Variables

Before running the application, you need to set up your environment variables. Create a `.env` file in the root directory with the following variables:

```env
# Required - API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001  # Replace with your API URL

# Optional - Application Configuration
NODE_ENV=development  # or production
PORT=3000            # Default port for the application
```

Note: Make sure to replace the `NEXT_PUBLIC_API_BASE_URL` with your actual API endpoint URL.

## Running with Docker

### Option 1: Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd to-do
```

2. Create a `.env` file in the root directory:
```bash
# Example .env file content
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

3. Build and run the container:
```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`

### Option 2: Using Docker Directly

1. Build the Docker image:
```bash
docker build -t todo-frontend .
```

2. Run the container with environment variables:
```bash
docker run -p 3000:3000 --env-file .env todo-frontend
```

Or specify the environment variable directly:
```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_API_BASE_URL=http://localhost:3001 todo-frontend
```

## Development

### Running Locally Without Docker

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:3001" > .env
```

3. Run the development server:
```bash
npm run dev
```

4. Run tests:
```bash
npm test
```

For watch mode during development:
```bash
npm run test:watch
```

## Project Structure

```
to-do/
├── src/
│   ├── app/
│   │   ├── components/     # React components
│   │   ├── __tests__/     # Component tests
│   │   └── ...
│   ├── config/            # Configuration files
│   ├── types/             # TypeScript type definitions
│   └── ...
├── public/                # Static files
├── .env                   # Environment variables
├── Dockerfile            
├── docker-compose.yml    
└── ...
```

## Testing

The project uses Jest and React Testing Library for testing. Test files are located next to the components they test in `__tests__` directories.

To run tests:
```bash
npm test
```

## Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| NEXT_PUBLIC_API_BASE_URL | Base URL for the backend API | Yes | http://localhost:3001 |
| NODE_ENV | Environment mode | No | development |
| PORT | Application port | No | 3000 |

## Troubleshooting

1. **API Connection Issues**
   - Verify that your `NEXT_PUBLIC_API_BASE_URL` is correct
   - Ensure the API server is running and accessible
   - Check for any CORS configuration issues

2. **Docker Issues**
   - Make sure Docker daemon is running
   - Try removing existing containers: `docker-compose down`
   - Clear Docker cache: `docker system prune`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
