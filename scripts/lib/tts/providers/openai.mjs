export const openAiTtsProvider = {
  id: "openai",
  label: "OpenAI TTS",
  supportsWordTimings: false,
  async synthesizeSlide() {
    throw new Error("The OpenAI TTS provider is not configured in this repo yet. Use --provider ffmpeg_flite for the local deterministic Phase 3 pipeline.");
  },
};
