import { ETLPipeline, ETLPipelineStep } from "./ETLPipeline.pojo.mjs";

export const ChatGPTETLPipeline = ETLPipeline.fromData({
  title: "🔍 ChatGPT Data Processing Steps",
  steps: [
    ETLPipelineStep.fromData({
      name: "Step 1: Raw Data Processing (POC)",
      description: "Extracts raw data details from the chat-renderer project.",
    }),
    ETLPipelineStep.fromData({
      name: "Step 2: Save Processed Data (Step 1)",
      description: `Stores first level processed data in the <code class="bg-gray-200 px-1 rounded">smart-backup/step1</code> folder.`,
    }),
    ETLPipelineStep.fromData({
      name: "Step 3: Save Processed Data (Step 2)",
      description: `Stores the final processed data in <code class="bg-gray-200 px-1 rounded">smart-backup/step2</code> folder.`,
    }),
  ],
  completionMessage:"✅ Data Processing Completed Successfully!"
});
