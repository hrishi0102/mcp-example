import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

//Normal Tool (can be an API call or a function)
async function getWeatherDetails(city) {
    if (city === "Mumbai") {
        return {
            temperature: 20,
            weather: "sunny",
        };
    } else if (city === "Delhi") {
        return {
            temperature: 25,
            weather: "cloudy",
        };
    } else if (city === "Chicago") {
        return {
            temperature: 15,
            weather: "rainy",
        };
    }
}

//MCP Server creation
const server = new McpServer({
    name: "getWeatherDetails",
    description: "Get weather details for a given city",
    version: "1.0.0",
});

//MCP Server tool creation. Return should be in MCP format (content array of objects with type and text)
server.tool("getWeatherDetails", {city: z.string()}, 
    async ({city}) => {
        return {
            content: [{ type: "text", text: JSON.stringify(await getWeatherDetails(city)) }]
        }
});

//MCP Server connection. Can be stdio or SSE
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main();
