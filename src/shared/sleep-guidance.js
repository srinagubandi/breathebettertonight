/** Shared symptom-awareness section for patient landing pages; keep it concise and non-diagnostic. */
function renderReasonsAndSymptoms() {
  return `<section class="reasons-section" aria-labelledby="reasons-heading">
    <div class="landing-container reasons-layout">
      <div class="reasons-intro">
        <p class="landing-eyebrow landing-eyebrow-dark">Why discuss a pattern</p>
        <h2 id="reasons-heading">Small details can add up.</h2>
        <p>Changes in breathing, rest, or daytime energy can affect you or a partner. They can have many causes, so an evaluation helps clarify the next step.</p>
      </div>
      <div class="reasons-signal-grid" aria-label="Common sleep-related patterns to discuss">
        <article><span class="reason-number">01</span><h3>During sleep</h3><p>Loud snoring, pauses, gasping, or restless sleep.</p></article>
        <article><span class="reason-number">02</span><h3>In the morning</h3><p>Waking tired, dry mouth, or a morning headache.</p></article>
        <article><span class="reason-number">03</span><h3>Through the day</h3><p>Sleepiness, low energy, or trouble focusing.</p></article>
      </div>
    </div>
  </section>`;
}

function renderOralApplianceContext() {
  return `<section class="oral-appliance-section" aria-labelledby="oral-appliance-heading">
    <div class="landing-container oral-appliance-layout">
      <div class="oral-appliance-intro">
        <p class="landing-eyebrow">From symptoms to a treatment conversation</p>
        <h2 id="oral-appliance-heading">Could an oral appliance be an option?</h2>
        <p>After an appropriate evaluation, some adults may discuss a custom oral appliance. It can help support an open airway during sleep.</p>
      </div>
      <div class="oral-appliance-steps" aria-label="The oral appliance care pathway">
        <article><span>01</span><h3>Start with the pattern</h3><p>A clinician reviews symptoms and decides whether testing or another step is appropriate.</p></article>
        <article><span>02</span><h3>Fit it precisely</h3><p>A qualified dentist can fit a custom appliance for the recommended plan.</p></article>
        <article><span>03</span><h3>Follow up</h3><p>Care teams check comfort, fit, and whether the plan is working for you.</p></article>
      </div>
      <p class="oral-appliance-note">An appliance is not right for everyone and does not replace medical evaluation.</p>
    </div>
  </section>`;
}

module.exports = { renderReasonsAndSymptoms, renderOralApplianceContext };
