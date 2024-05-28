export default function Title({ text }: { text: string }) {
  return (
    <h2 className="absolute -top-2 left-0 px-2 bg-black text-white">{text}</h2>
  );
}
