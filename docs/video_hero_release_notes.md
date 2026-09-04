# Video-Hero Landing-Page Release Notes

## Improvement loop 1 — message and visual continuity

The supplied couple-in-bed footage was reviewed on the partner-disrupted-sleep and daytime-brain-fog routes. The left side is the more reliable overlay zone; the moving partner remains on the right. The hero treatment therefore keeps the copy left-aligned, applies a strong left-to-right scrim, and describes the moment as a shared sleep disruption rather than assigning blame. The three concepts maintain distinct symptom entry points: partner-disrupted sleep, waking unrefreshed, and daytime brain fog.

The first review also showed that a practice-specific primary CTA became overly long when paired with Call and Text actions. The primary hero CTA is being shortened to the approved action, `Request a consultation`, while the selected practice remains clear in supporting copy when its visible-name setting is enabled.

## Improvement loop 2 — playback efficiency and reduced-motion fallback

Each supplied video is trimmed to ten seconds, reduced to 1280×720 H.264, has no audio stream, and moves MP4 metadata to the head of the file for efficient browser loading. The rendered markup uses a muted, looping, inline, decorative video with `preload="metadata"`; it carries a matching JPG poster at all times. The responsive checks confirmed that all three videos became playable and that `prefers-reduced-motion: reduce` removes motion while retaining the still poster.

Desktop review confirmed clear copy contrast over the dark left-side treatment. On the narrow reduced-motion view, the image needed a little more visual presence beyond the text column, so the mobile framing now favors the moving partner’s side and uses a lighter upper scrim while preserving a darker text-supporting lower gradient.

## Fourth concept brief — nighttime breathing sounds

The newly supplied four-second, square-format video shows a middle-aged couple in a static bed scene. The man remains asleep while the woman is alert and nudges him; the headboard in the upper corners and the lower blanket area provide usable overlay zones. To keep the new page distinct from the existing partner-disrupted-sleep concept, its symptom entry point will be **nighttime breathing sounds**: an observable pattern a partner may notice, not a diagnosis or a judgment of either person. The copy will describe repeated snoring or changes in breathing sounds as information worth bringing to a conversation, and it will avoid framing either partner as at fault.

## Fourth concept — improvement loop 1: symptom message and visual continuity

The new hero was reviewed at desktop scale. The upper-left copy column remains readable over the supplied footage while the couple’s interaction remains visible on the right. The first headline was refined from a general reference to “sounds” to the more specific, symptom-focused phrase “breathing sounds,” and the supporting sentence now leads with “regularly loud snoring or changes in breathing sounds.” This keeps the page differentiated from the existing partner-disrupted-sleep concept, speaks to an observable nighttime pattern, and avoids medical or blame-oriented claims.

## Fourth concept — improvement loop 2: playback and static fallback

The fourth source was preserved as a square composition, repeated to a ten-second muted H.264 web asset, and reduced to approximately 668 KB. Its paired JPG poster is approximately 36 KB. Browser verification confirmed the page loads a single MP4 source with `autoplay`, `muted`, `loop`, `playsinline`, and `preload="metadata"`; the video reached ready state 4 and was playing without sound. The shared reduced-motion rule hides the video and retains the matching poster, so the symptom message does not depend on motion.

## Fourth concept — improvement loop 3: identity and contact states

The fourth concept was tested with all display controls enabled, all three disabled, and a mixed Call-only state. With the practice name hidden, the landing and outcome copy uses “your selected local practice” and “a local conversation, when you are ready,” without exposing the practice or provider name. With Call and Text disabled, the action groups are omitted rather than left empty; the consultation survey and practice policy links remain intact. The fully contact-hidden sticky header now aligns its remaining `Request a consultation` action intentionally at the end of the bar, rather than leaving an unbalanced empty area.

## Production validation

Commit `b950b84` deployed successfully to the designated Railway web service. Live checks confirmed the Nighttime Breathing Sounds landing route for Pantego Dental, PerioDDS, and Dental World, each with its correct practice presentation. Browser inspection of the deployed Pantego route confirmed the hero’s MP4 source, poster, muted loop, inline playback, metadata preload, ready state, and active playback state.
