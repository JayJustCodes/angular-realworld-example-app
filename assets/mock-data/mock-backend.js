const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

function serveJsonFile(filePath, res, delay = 0) {
    setTimeout(() => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Failed to read file" }));
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(data);
            }
        });
    }, delay);
}

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "GET") {
        if (req.url === "/items") {
            serveJsonFile(path.join(__dirname, "items.json"), res);
        } else if (req.url === "/discounts") {
            serveJsonFile(path.join(__dirname, "discounts.json"), res, 500);
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Not found" }));
        }
    } else {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Method not allowed" }));
    }
});

server.listen(PORT, () => {
    console.log(`Mock backend is running at http://localhost:${PORT}`);
});
