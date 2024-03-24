"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "https://ai-code-generator-free.vercel.app",
        "http://localhost:5173",
    ],
}));
app.post("/", async (req, res) => {
    const { prompt } = req.body;
    const response = await fetch("https://www.blackbox.ai/api/chat", {
        headers: {
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/json",
            "Sec-GPC": "1",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
        },
        referrer: "https://www.blackbox.ai/",
        body: JSON.stringify({
            messages: [
                {
                    id: "qQywqrL",
                    content: prompt,
                    role: "user",
                },
            ],
            id: "qQywqrL",
            previewToken: null,
            userId: "351697b9-8257-45aa-a163-02a441d6ad84",
            codeModelMode: true,
            agentMode: {},
            trendingAgentMode: {},
            isMicMode: false,
            isChromeExt: false,
            githubToken: null,
        }),
        method: "POST",
        mode: "cors",
    });
    const responseJSON = await response.text();
    res.status(200).send({ response: responseJSON });
});
app.post("/continue", async (req, res) => {
    const { prompt, content } = req.body;
    const continueResponse = await fetch("https://www.blackbox.ai/api/chat", {
        headers: {
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "text/plain;charset=UTF-8",
            "Sec-GPC": "1",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
        },
        referrer: "https://www.blackbox.ai/",
        body: JSON.stringify({
            messages: [
                {
                    id: "V82XJl7",
                    content: prompt,
                    role: "user",
                },
                {
                    id: "t5Lz0Qr",
                    createdAt: "2024-03-24T08:26:14.503Z",
                    content: content,
                    role: "assistant",
                },
            ],
            id: "V82XJl7",
            mode: "continue",
            userId: "1956a1ef-2cfe-4a12-8868-d1b2a954f374",
            agentMode: {},
            trendingAgentMode: {},
        }),
        method: "POST",
        mode: "cors",
    });
    const continueResponseJson = await continueResponse.text();
    return res.status(200).send({ response: continueResponseJson });
});
app.listen(4000, () => {
    console.log("http://localhost:4000");
});
