type TProps = {
  params: { id: number };
};
export default function BlogEditPage({ params: { id } }: TProps) {
  return (
    <div>
      <h1>Blog Edit Page</h1>
      <p>Blog id no: {id}</p>
    </div>
  );
}
