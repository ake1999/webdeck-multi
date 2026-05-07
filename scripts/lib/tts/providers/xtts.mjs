export const xttsProvider = {
  id: "xtts",
  label: "XTTS",
  supportsWordTimings: false,
  async synthesizeSlide() {
    throw new Error("The XTTS provider is not configured yet. Use --provider ffmpeg_flite for the current Phase 3 pipeline.");
  },
};
