const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("MCP Server Test API is running.");
});

// Test MCP server connection
app.post("/test-mcp", async (req, res) => {
    const { installationCode } = req.body;

    console.log("Received installation code:", installationCode);

    if (!installationCode) {
        return res.status(400).json({ error: "Installation code is required." });
    }

    try {
        const response = await fetch(installationCode);

        const contentType = response.headers.get("content-type");

        let responseBody;

        if (contentType && contentType.includes("application/json")) {
            responseBody = await response.json();
        } else {
            responseBody = await response.text();
        }

        if (response.ok) {
            res.json({
                success: true,
                message: "MCP server is reachable!",
                status: response.status,
                body: responseBody
            });
        } else {
            res.status(400).json({
                success: false,
                error: "Server responded, but not OK.",
                status: response.status,
                body: responseBody
            });
        }

    } catch (error) {
        console.error("Error reaching MCP server:", error);
        res.status(500).json({ error: "Could not reach the MCP server." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
