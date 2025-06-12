export default function AboutPage() {
  return (
    <div style={{ paddingTop: "5rem" }}>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">About Kasikeu Boys High School</h1>
            <p className="section-description">
              Learn about our rich history, values, and commitment to educational excellence
            </p>
          </div>

          <div className="card" style={{ marginBottom: "4rem" }}>
            <div className="card-header">
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Our History</h2>
            </div>
            <div className="card-content">
              <p style={{ color: "#6b7280", lineHeight: "1.7", marginBottom: "1rem" }}>
                Kasikeu Boys High School was established in 1985 with a vision to provide quality secondary education to
                boys in the region. Founded by a group of visionary community leaders and educators, the school began
                with just 120 students and has grown to become one of the leading secondary schools in the area.
              </p>
              <p style={{ color: "#6b7280", lineHeight: "1.7", marginBottom: "1rem" }}>
                Over the years, we have maintained our commitment to academic excellence while adapting to modern
                educational needs. Our graduates have gone on to excel in various fields, including medicine,
                engineering, law, business, and public service, making significant contributions to society.
              </p>
              <p style={{ color: "#6b7280", lineHeight: "1.7" }}>
                Today, Kasikeu Boys High School stands as a beacon of educational excellence, character development, and
                leadership training, continuing to shape young minds for a better tomorrow.
              </p>
            </div>
          </div>

          <div className="section-header">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-description">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-4">
            <div className="card text-center hover-lift">
              <div className="card-content">
                <div className="icon-wrapper icon-wrapper-blue">📚</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Excellence</h3>
                <p style={{ color: "#6b7280" }}>
                  We strive for the highest standards in academics, character, and all endeavors.
                </p>
              </div>
            </div>

            <div className="card text-center hover-lift">
              <div className="card-content">
                <div className="icon-wrapper icon-wrapper-green">🎯</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Integrity</h3>
                <p style={{ color: "#6b7280" }}>
                  We uphold honesty, transparency, and moral uprightness in all our actions.
                </p>
              </div>
            </div>

            <div className="card text-center hover-lift">
              <div className="card-content">
                <div className="icon-wrapper icon-wrapper-purple">👥</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Respect</h3>
                <p style={{ color: "#6b7280" }}>
                  We value diversity, treat everyone with dignity, and foster inclusive community.
                </p>
              </div>
            </div>

            <div className="card text-center hover-lift">
              <div className="card-content">
                <div className="icon-wrapper icon-wrapper-orange">🏆</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Innovation</h3>
                <p style={{ color: "#6b7280" }}>
                  We embrace creativity, critical thinking, and modern approaches to learning.
                </p>
              </div>
            </div>
          </div>

          <div className="section-header">
            <h2 className="section-title">School at a Glance</h2>
            <p className="section-description">Key facts and figures about our institution</p>
          </div>

          <div className="grid grid-cols-4">
            <div className="card text-center">
              <div className="card-content">
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2563eb", marginBottom: "0.5rem" }}>
                  800+
                </div>
                <p style={{ color: "#6b7280" }}>Students Enrolled</p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-content">
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2563eb", marginBottom: "0.5rem" }}>
                  45
                </div>
                <p style={{ color: "#6b7280" }}>Teaching Staff</p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-content">
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2563eb", marginBottom: "0.5rem" }}>
                  38
                </div>
                <p style={{ color: "#6b7280" }}>Years of Excellence</p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-content">
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2563eb", marginBottom: "0.5rem" }}>
                  95%
                </div>
                <p style={{ color: "#6b7280" }}>University Admission Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
