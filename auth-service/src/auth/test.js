const request = require("supertest");
const app = require("../app");

describe("Auth Service", () => {
    describe("POST /register", () => {
        it("should register a new user", async () => {
            const res = await request(app)
                .post("/auth/register") // Add the '/auth' base path here
                .send({
                    email: "testuser@example.com",
                    password: "testpassword",
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty(
                "message",
                "User registered successfully"
            );
        });
    });
    describe("POST /login", () => {
        it("should login an existing user", async () => {
            // First, register a user to ensure it exists
            await request(app).post("/auth/register").send({
                email: "testuser@example.com",
                password: "password123",
            });

            // Now, attempt to log in
            const res = await request(app).post("/auth/login").send({
                email: "testuser@example.com",
                password: "password123",
            });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("message", "Login successful");
        });

        it("should return error for invalid email", async () => {
            const res = await request(app).post("/auth/login").send({
                email: "nonexistent@example.com",
                password: "password123",
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty(
                "message",
                "Invalid email or password"
            );
        });

        it("should return error for incorrect password", async () => {
            // First, register a user to ensure it exists
            await request(app).post("/auth/register").send({
                email: "testuser@example.com",
                password: "password123",
            });

            // Now, attempt to log in with incorrect password
            const res = await request(app).post("/auth/login").send({
                email: "testuser@example.com",
                password: "wrongpassword",
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty(
                "message",
                "Invalid email or password"
            );
        });
    });
});
