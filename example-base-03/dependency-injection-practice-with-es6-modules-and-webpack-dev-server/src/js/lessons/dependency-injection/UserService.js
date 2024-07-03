// UserService.js
class UserService {
    constructor(logger) {
        this.logger = logger;
    }

    getUser() {
        this.logger.log('Getting user');
        // Simulated user fetch
        return { id: 1, name: 'John Doe' };
    }
}

export default UserService;
