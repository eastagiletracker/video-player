import { html, fixture, expect } from "@open-wc/testing";
import type { VideoControls } from "./Video-controls.component";

describe("video-controls", () => {
  it("with default parameters", async () => {
    const el: VideoControls = await fixture(
      html`<video-controls></video-controls>`,
    );
    expect(el.disabled).equal(undefined);
  });

  describe("when", () => {
    it("applies a linked property when its dependency changes alone", async () => {
      const el: VideoControls = await fixture(
        html`<video-controls
          when="fullscreen=true->custom=true"
        ></video-controls>`,
      );
      el.fullscreen = true;
      await el.updateComplete;
      expect(el.custom).equal(true);

      el.fullscreen = false;
      await el.updateComplete;
      expect(el.custom).equal(false);
    });

    it("applies a linked property when an unrelated property changes in the same update", async () => {
      const el: VideoControls = await fixture(
        html`<video-controls
          when="fullscreen=true->custom=true"
        ></video-controls>`,
      );
      el.idle = true;
      el.fullscreen = true;
      await el.updateComplete;
      expect(el.custom).equal(true);

      el.idle = false;
      el.fullscreen = false;
      await el.updateComplete;
      expect(el.custom).equal(false);
    });

    it("applies every rule whose dependency changed in the same update", async () => {
      const el: VideoControls = await fixture(
        html`<video-controls
          when="playing=true->idle=true;fullscreen=true->custom=true"
        ></video-controls>`,
      );
      el.playing = true;
      el.fullscreen = true;
      await el.updateComplete;
      expect(el.idle).equal(true);
      expect(el.custom).equal(true);
    });

    it("leaves linked properties alone when only unrelated properties change", async () => {
      const el: VideoControls = await fixture(
        html`<video-controls
          when="fullscreen=true->custom=true"
        ></video-controls>`,
      );
      el.custom = true;
      el.idle = true;
      await el.updateComplete;
      expect(el.custom).equal(true);
    });
  });
});
