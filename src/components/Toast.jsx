export default function Toast({ message, type }) {
  let classes = 'toast';
  type === 'success' && (classes += ' toast-success');
  type === 'error' && (classes += ' toast-error');

  return (
    <div className={classes}>
      {message}
    </div>
  );
}