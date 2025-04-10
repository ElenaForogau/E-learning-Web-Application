const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");

class UserService {
  static async registerUser(firstName, lastName, email, password, role) {
    if (!["student", "profesor"].includes(role)) {
      throw new Error("Invalid role. Allowed roles: 'student', 'profesor'");
    }

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await UserRepository.createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
      role
    );

    return { message: "User registered successfully!", userId };
  }

  static async loginUser(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
      },
    };
  }

  static async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }
}

module.exports = UserService;
