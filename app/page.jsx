export default function MyApp() {
  return (
    <main className="flex items-center justify-center bg-blue-600 h-[100vh] w-full">
      <div className="h-full flex items-center justify-center border flex-1">
        <img src="/logo.svg" alt="logo" className="h-12 w-12" />
      </div>
      <div className="h-full flex items-center justify-center border flex-1">
        <p className="text-2xl font-bold text-white">Hello World</p>
        <img src="/logo.svg" alt="logo" className="h-12 w-12" />
      </div>
    </main>
  );
}
