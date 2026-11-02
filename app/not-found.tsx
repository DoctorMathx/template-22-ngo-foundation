import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="container-x py-28 md:py-36 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <p className="eyebrow mb-5">Error 404 · Page not found</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light leading-[1.02]">This page has <em>run dry.</em></h1>
          <p className="lede mt-6 max-w-xl">The page you were looking for has moved or no longer exists. Our projects, results and reports are all still here.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">Back to the homepage</Link>
            <Link href="/projects" className="btn btn-outline">Browse projects</Link>
          </div>
        </div>
        <ul className="md:col-span-4 md:col-start-9 border-t border-ink self-end">
          {[
            ["/funders", "Funders hub"],
            ["/results", "Results framework"],
            ["/transparency", "Transparency & financials"],
            ["/contact", "Contact us"],
          ].map(([href, label]) => (
            <li key={href} className="border-b border-rule"><Link href={href} className="flex items-center min-h-[52px] font-serif text-lg hover:text-forest">{label}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
