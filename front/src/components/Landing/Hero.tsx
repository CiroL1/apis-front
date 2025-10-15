export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[480px] flex items-center justify-center text-center text-white bg-gray-900">
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3yNbwdBX4Fycu_v_kOJQ9xs8eCjOdfK74E-0Gz4WJGvlKQGWl5emIw9zMMaaQeScsyt1haI0PG5nZkxqFzOkAKVXQLVQ15xD7QLTgSx5SaDUoPUelXl7a68YllBBLaBG1HtRCg7RKIbCyLUhOEiIqSMQvcBgpGeFacaPfiAhKycQX87TN5tSYIdcqnHjd7lmAWijV-feZR0hynfVOKhlhahboRX2SMmfDYJZfvNQ56sol0JkGFgamojYFsv-Pr-iO7G3vMPnW1PQ")'}}></div>
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">Innovación en tus manos</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-200">Descubre la última tecnología que redefine tu experiencia digital.</p>
        <div className="mt-8">
          <a href="/products" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-transform transform hover:scale-105">Explorar productos</a>
        </div>
      </div>
    </section>
  );
}
