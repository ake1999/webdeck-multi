export const kokoroProvider = {
  id: "kokoro",
  label: "Kokoro",
  supportsWordTimings: false,
  async synthesizeSlide() {
    throw new Error("The Kokoro provider is not configured yet. Use --provider ffmpeg_flite for the current Phase 3 pipeline.");
  },
};
