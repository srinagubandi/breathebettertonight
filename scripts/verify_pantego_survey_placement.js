const baseUrl = process.argv[2] || 'http://127.0.0.1:8094';
const target = `${baseUrl}/go/pantego-dental/sleep-symptom-check`;

(async () => {
  const response = await fetch(target);
  if (!response.ok) throw new Error(`Expected HTTP 200; received ${response.status}`);
  const html = await response.text();
  const heroEnd = html.indexOf('</section>');
  const consultation = html.indexOf('consultation-section-hero-adjacent');
  const recognition = html.indexOf('recognition-section');
  const surveyId = '75op3Tl4LTjPkaXI1zhb';

  if (consultation <= heroEnd || consultation >= recognition) {
    throw new Error('The consultation survey is not directly below the hero and before recognition content.');
  }
  if ((html.match(new RegExp(`survey/${surveyId}`, 'g')) || []).length !== 1) {
    throw new Error('Expected exactly one Pantego survey iframe.');
  }
  if (!html.includes('dentist-photo-approved') || !html.includes('First and foremost, Dr. Lay is a follower of Our Lord and Savior Jesus Christ.')) {
    throw new Error('Approved Dr. Lay profile content is missing.');
  }
  console.log('PASS: Pantego survey follows the hero exactly once and the Dr. Lay profile is present.');
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
