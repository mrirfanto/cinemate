import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
const movieLikes = {};
const sessionDecisions = {};
io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    const userName = socket.handshake.query.userName;
    // Join a room
    socket.on('joinRoom', (room, userName) => {
        socket.join(room);
        console.log(`User ${userName} joined room ${room}`);
        // Initialize movie likes for this room and user if not exists
        if (!movieLikes[room]) {
            movieLikes[room] = {};
        }
        if (!movieLikes[room][socket.id]) {
            movieLikes[room][socket.id] = [];
        }
        // Initialize session decisions for this room and user if not exists
        if (!sessionDecisions[room]) {
            sessionDecisions[room] = {};
        }
        // Update active users
        const activeUsers = Array.from(io.sockets.adapter.rooms.get(room) || []).map((socketId) => { var _a; return (_a = io.sockets.sockets.get(socketId)) === null || _a === void 0 ? void 0 : _a.handshake.query.userName; });
        io.to(room).emit('updateActiveUsers', activeUsers);
    });
    // Leave a room
    socket.on('leaveRoom', (room, userName) => {
        socket.leave(room);
        console.log(`User ${userName} left room ${room}`);
        // Clean up user data when leaving
        if (movieLikes[room] && movieLikes[room][socket.id]) {
            delete movieLikes[room][socket.id];
        }
        if (sessionDecisions[room] && sessionDecisions[room][socket.id]) {
            delete sessionDecisions[room][socket.id];
        }
        // Update active users
        const activeUsers = Array.from(io.sockets.adapter.rooms.get(room) || []).map((socketId) => { var _a; return (_a = io.sockets.sockets.get(socketId)) === null || _a === void 0 ? void 0 : _a.handshake.query.userName; });
        io.to(room).emit('updateActiveUsers', activeUsers);
    });
    // Handle movie likes
    socket.on('movieLike', (room, movieId) => {
        console.log(`User ${socket.id} liked movie ${movieId} in room ${room}`);
        // Store the like
        if (!movieLikes[room]) {
            movieLikes[room] = {};
        }
        if (!movieLikes[room][socket.id]) {
            movieLikes[room][socket.id] = [];
        }
        // Add movie to liked list if not already there
        if (!movieLikes[room][socket.id].includes(movieId)) {
            movieLikes[room][socket.id].push(movieId);
        }
        // Check if this is a match (both users liked the same movie)
        const roomUsers = Array.from(io.sockets.adapter.rooms.get(room) || []);
        // Only proceed if there are exactly 2 users in the room
        if (roomUsers.length === 2) {
            const otherUserId = roomUsers.find((id) => id !== socket.id);
            if (otherUserId &&
                movieLikes[room][otherUserId] &&
                movieLikes[room][otherUserId].includes(movieId)) {
                // It's a match! Notify both users
                console.log(`Match found for movie ${movieId} in room ${room}`);
                io.to(room).emit('movieMatch', movieId);
                // Request session decision from both users
                io.to(room).emit('sessionDecisionRequest', movieId);
            }
        }
    });
    // Handle session decisions
    socket.on('sessionDecision', (room, decision) => {
        console.log(`User ${socket.id} decided to ${decision} in room ${room}`);
        // Store the decision
        if (!sessionDecisions[room]) {
            sessionDecisions[room] = {};
        }
        sessionDecisions[room][socket.id] = decision;
        // Check if all users have made a decision
        const roomUsers = Array.from(io.sockets.adapter.rooms.get(room) || []);
        // Only proceed if there are exactly 2 users in the room
        if (roomUsers.length === 2) {
            const allDecided = roomUsers.every((userId) => sessionDecisions[room][userId] !== undefined);
            if (allDecided) {
                // Check if both users want to conclude
                const allConclude = roomUsers.every((userId) => sessionDecisions[room][userId] === 'conclude');
                if (allConclude) {
                    // Find all matched movies
                    const matchedMovies = findMatchedMovies(room);
                    // Conclude the session
                    io.to(room).emit('sessionConclusion', matchedMovies);
                    // Reset decisions
                    sessionDecisions[room] = {};
                }
                else {
                    // At least one user wants to continue
                    io.to(room).emit('sessionContinue');
                    // Reset decisions
                    sessionDecisions[room] = {};
                }
            }
        }
    });
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        // Clean up user data from all rooms
        for (const room in movieLikes) {
            if (movieLikes[room][socket.id]) {
                delete movieLikes[room][socket.id];
            }
        }
        for (const room in sessionDecisions) {
            if (sessionDecisions[room][socket.id]) {
                delete sessionDecisions[room][socket.id];
            }
        }
    });
});
// Helper function to find all matched movies in a room
function findMatchedMovies(room) {
    if (!movieLikes[room])
        return [];
    const users = Object.keys(movieLikes[room]);
    if (users.length < 2)
        return [];
    // Find movies that all users have liked
    const firstUserLikes = movieLikes[room][users[0]];
    return firstUserLikes.filter((movieId) => users.slice(1).every((userId) => movieLikes[room][userId].includes(movieId)));
}
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
