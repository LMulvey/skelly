import { app } from "./app";

const port = Number.parseInt(process.env.PORT ?? "3001", 10);

app.listen(port, () => {
	console.log(`API server running on http://localhost:${port}`);
});
