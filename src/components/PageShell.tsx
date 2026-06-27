import Header from "@/components/Header";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      {children}
    </div>
  );
}