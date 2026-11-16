# Focused codec fade review

Candidate SHA256 `aca84131ae9c4f534fb6a08678b37920a20cceb86f9675f779b7f7fa952d0018`: **no findings in the small delta from reviewedabb19bb**.

The tolerance is scoped to terminal2490–2492; all earlier uniform frames still fail. The supplied CRF18→14 probe supports relaxing the old exact-black/uniform-final assumption: measured final gray mean2.933, std0.442, max3. New max6/mean4 bounds, minimum10-level drop across the last8frames and upward-step≤3 accommodate measured quantization without allowing arbitrary white/uniform endings.

Independently ran7 supplied fade/incident fixtures plus3 boundary negatives (max7, mean4.1, inadequate fade drop); all behaved as expected. An in-memory mutation removing the pre-terminal uniform-frame guard makes the1937incident incorrectly pass, confirming that negative detects the regression. Machine report: `work/reports/codec-fade-review.json`.

Code-policy approval only. The probe uses half-scale reviewed JPEGs upscaled through codecs, not the actual1080final. Final2493-frame decode and media review remain required. No active tool, source, timestamps, or media changed during this review.
