export function StatsSection() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">15,000+</div>
            <div className="text-xl">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">8,500+</div>
            <div className="text-xl">Hazards Reported</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">25%</div>
            <div className="text-xl">Accident Reduction</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">120+</div>
            <div className="text-xl">Cities Covered</div>
          </div>
        </div>
      </div>
    </section>
  )
}

