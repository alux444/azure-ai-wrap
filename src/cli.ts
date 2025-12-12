import * as readline from "readline";
import { callAgent, callAgentWithImage } from "./agent";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main(): Promise<void> {
  console.log("========================================");
  console.log("Azure AI Agent CLI");
  console.log("========================================\n");

  let running = true;

  while (running) {
    console.log("\nOptions:");
    console.log("1. Call Agent with Text");
    console.log("2. Call Agent with Image");
    console.log("3. Exit");

    const choice = await question("\nSelect an option (1-3): ");

    switch (choice.trim()) {
      case "1": {
        const prompt = await question("Enter agent instructions: ");
        const message = await question("Enter your message: ");

        try {
          console.log("\nProcessing...");
          const response = await callAgent(prompt, message);
          console.log("\n--- Agent Response ---");
          console.log(response);
          console.log("--- End Response ---\n");
        } catch (error) {
          console.error("Error calling agent:", error);
        }
        break;
      }

      case "2": {
        const prompt = await question("Enter agent instructions: ");
        const message = await question("Enter your message: ");
        const imagePath = await question("Enter path to image file: ");

        try {
          console.log("\nProcessing...");
          const response = await callAgentWithImage(prompt, message, imagePath);
          console.log("\n--- Agent Response ---");
          console.log(response);
          console.log("--- End Response ---\n");
        } catch (error) {
          console.error("Error calling agent:", error);
        }
        break;
      }

      case "3": {
        console.log("\nGoodbye!");
        running = false;
        break;
      }

      default: {
        console.log("Invalid option. Please select 1, 2, or 3.");
      }
    }
  }

  rl.close();
}

main().catch((error) => {
  console.error("An error occurred:", error);
  rl.close();
  process.exit(1);
});
