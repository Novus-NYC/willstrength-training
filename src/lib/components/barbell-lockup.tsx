/**
 * The hero lockup: WILL in outline, STRENGTH loaded on the bar between red
 * and blue plates, TRAINING on a ruled line. Purely visual (aria-hidden):
 * the heading that wraps it carries the real name in screen reader text.
 * Sized in container query units (see .lockup in globals.css), so it fits
 * its column at every width. The plates load once on page load.
 */
export function BarbellLockup() {
  return (
    <span className="lockup block" aria-hidden="true">
      <span className="lockup-will display block">Will</span>
      <span className="lockup-bar">
        <span className="plates plates-left">
          <span className="collar" />
          <span className="plate plate-red" />
          <span className="plate plate-blue" />
        </span>
        <span className="lockup-strength display">Strength</span>
        <span className="plates plates-right">
          <span className="collar" />
          <span className="plate plate-red" />
          <span className="plate plate-blue" />
        </span>
      </span>
      <span className="lockup-training font-mono font-medium uppercase">Training</span>
    </span>
  );
}
