export default function NewSpacePage() {
  return (
    <main className="rounded-soft bg-white p-6 shadow-neu">
      <h1 className="mb-6 text-2xl font-bold">Create a new listing</h1>
      <form className="grid gap-4 md:grid-cols-2">
        <input className="neu-input" placeholder="Title" />
        <input className="neu-input" placeholder="Location" />
        <input className="neu-input" placeholder="Capacity seats" type="number" />
        <input className="neu-input" placeholder="Price per minute per seat" type="number" step="0.01" />
        <input className="neu-input md:col-span-2" placeholder="Amenities (comma separated)" />
        <textarea className="neu-input md:col-span-2" placeholder="Describe the space" rows={5} />
        <button type="button" className="neu-button md:col-span-2 md:justify-self-start">Save draft</button>
      </form>
    </main>
  );
}
