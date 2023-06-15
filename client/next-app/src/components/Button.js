export default function Button({ text, className, onClick, value }) {
  return (
    <button className={className} onClick={onClick} value={value}>
      {text}
    </button>
  );
}
