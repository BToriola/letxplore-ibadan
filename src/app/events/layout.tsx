export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="events-layout">
      {children}
    </div>
  );
}
